import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { base64 } from 'virtual:resume-pdf';

export const prerender = false;

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

	const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

	return new Response(bytes, {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="Matthew_Ostrowski_Resume.pdf"'
		}
	});
};
