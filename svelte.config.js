import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError({ path, message }) {
				if (path === '/Matthew_Ostrowski_Resume.pdf') {
					console.warn(`Warning: ${message} — add your resume PDF to static/`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
