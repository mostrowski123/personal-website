import { error } from '@sveltejs/kit';
import { read } from '$app/server';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
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

/** Validate signed URL and serve the PDF. */
export const GET: RequestHandler = async ({ url }) => {
	const ts = url.searchParams.get('ts');
	const sig = url.searchParams.get('sig');

	if (!ts || !sig) {
		error(403, 'Missing signature');
	}

	const secret = env.TURNSTILE_SECRET_KEY;
	if (!secret) {
		error(500, 'CAPTCHA not configured');
	}

	const age = Date.now() - parseInt(ts);
	if (age > SIGNATURE_TTL_MS || age < 0) {
		error(403, 'Link expired');
	}

	const valid = await hmacVerify(secret, ts, sig);
	if (!valid) {
		error(403, 'Invalid signature');
	}

	const file = read(pdf);

	return new Response(file.body, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Matthew_Ostrowski_Resume.pdf"',
			'Cache-Control': 'no-store'
		}
	});
};
