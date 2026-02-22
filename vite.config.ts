import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const VIRTUAL_ID = 'virtual:resume-pdf';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

/** Reads the PDF at build time and embeds it as a base64 string. */
function privatePdf() {
	return {
		name: 'private-pdf',
		resolveId(id: string) {
			if (id === VIRTUAL_ID) return RESOLVED_ID;
		},
		load(id: string) {
			if (id === RESOLVED_ID) {
				const pdf = readFileSync(resolve('src/lib/private/Matthew_Ostrowski_Resume.pdf'));
				const b64 = pdf.toString('base64');
				return `export const base64 = "${b64}";`;
			}
		}
	};
}

export default defineConfig({
	plugins: [privatePdf(), sveltekit()]
});
