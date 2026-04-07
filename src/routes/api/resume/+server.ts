import { error } from '@sveltejs/kit';
import { read } from '$app/server';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import pdf from '$lib/private/Matthew_Ostrowski_Resume.pdf';

export const prerender = false;

const SIGNATURE_TTL_MS = 30_000; // 30 seconds

async function hmacSign(secret: string, data: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
	return Array.from(new Uint8Array(sig))
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');
}

async function hmacVerify(secret: string, data: string, signature: string): Promise<boolean> {
	const key = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['verify']
	);
	const sigBytes = new Uint8Array(signature.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
	return crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data));
}

/** Verify Turnstile token, return a time-limited signed URL. */
export const POST: RequestHandler = async ({ request }) => {
	const { token } = await request.json();

	if (!token) {
		error(400, 'Missing CAPTCHA token');
	}

	const secret = env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		error(500, 'CAPTCHA not configured');
	}

	const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ secret, response: token })
	});

	const result = await verification.json();

	if (!result.success) {
		error(403, 'CAPTCHA verification failed');
	}

	const ts = Date.now().toString();
	const sig = await hmacSign(secret, ts);

	return new Response(JSON.stringify({ url: `/api/resume?ts=${ts}&sig=${sig}` }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

/** Validate signed URL and serve the PDF, or show a Turnstile challenge page. */
export const GET: RequestHandler = async ({ url }) => {
	const ts = url.searchParams.get('ts');
	const sig = url.searchParams.get('sig');

	const secret = env.TURNSTILE_SECRET_KEY;

	// If we have signature params, try to validate and serve the PDF
	if (ts && sig) {
		if (!secret) {
			error(500, 'CAPTCHA not configured');
		}

		const age = Date.now() - parseInt(ts);
		if (age > SIGNATURE_TTL_MS || age < 0) {
			return challengePage('Link expired. Please verify again.');
		}

		const valid = await hmacVerify(secret, ts, sig);
		if (!valid) {
			return challengePage('Invalid link. Please verify again.');
		}

		const file = read(pdf);

		return new Response(file.body, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename="Matthew_Ostrowski_Resume.pdf"',
				'Cache-Control': 'no-store'
			}
		});
	}

	// No signature — show the Turnstile challenge page
	return challengePage();
};

function challengePage(message?: string) {
	const siteKey = publicEnv.PUBLIC_TURNSTILE_SITE_KEY ?? '';

	const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Resume Download</title>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
    background: #16161a;
    color: #e0ddd8;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .card {
    background: #1e1e24;
    border: 1px solid #2a2a32;
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .prompt { color: #00a0e0; font-size: 1rem; }
  .title { font-size: 1rem; font-weight: 600; }
  .description {
    font-size: 0.82rem;
    color: #94929a;
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }
  .turnstile-wrapper {
    display: flex;
    justify-content: center;
    min-height: 65px;
  }
  .status {
    font-size: 0.8rem;
    text-align: center;
    margin-top: 1rem;
  }
  .status.verifying { color: #00a0e0; }
  .status.error { color: #ef4444; }
  .back-link {
    display: block;
    text-align: center;
    margin-top: 1.25rem;
    font-size: 0.78rem;
    color: #94929a;
    text-decoration: none;
  }
  .back-link:hover { color: #00a0e0; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <span class="prompt">&gt;</span>
    <span class="title">verify_human</span>
  </div>
  <p class="description">Complete the challenge below to download the resume.</p>
  <div class="turnstile-wrapper">
    <div class="cf-turnstile"
      data-sitekey="${siteKey}"
      data-theme="dark"
      data-callback="onVerified"
      data-error-callback="onError"
      data-expired-callback="onExpired">
    </div>
  </div>
  ${message ? `<p class="status error" id="status">${message}</p>` : '<p class="status" id="status"></p>'}
  <a href="/" class="back-link">&larr; back to site</a>
</div>
<script>
  var statusEl = document.getElementById('status');
  function onVerified(token) {
    statusEl.className = 'status verifying';
    statusEl.textContent = 'Verifying...';
    fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Verification failed');
      return res.json();
    })
    .then(function(data) {
      window.location.href = data.url;
    })
    .catch(function() {
      statusEl.className = 'status error';
      statusEl.textContent = 'Verification failed. Please try again.';
      if (window.turnstile) turnstile.reset();
    });
  }
  function onError() {
    statusEl.className = 'status error';
    statusEl.textContent = 'CAPTCHA error. Please try again.';
  }
  function onExpired() {
    if (window.turnstile) turnstile.reset();
  }
</script>
</body>
</html>`;

	return new Response(html, {
		status: message ? 403 : 200,
		headers: { 'Content-Type': 'text/html; charset=utf-8' }
	});
}
