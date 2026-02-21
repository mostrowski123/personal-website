<script lang="ts">
	import { personal } from '$lib/data/resume';
</script>

<section id="contact" class="contact">
	<div class="contact-inner">
		<div class="contact-heading">
			<span class="marker" aria-hidden="true">//</span>
			<h2 class="title">Get in Touch</h2>
		</div>
		<p class="blurb">
			Currently studying Japanese in Tokyo and open to new opportunities. Feel free to reach out.
		</p>

		<div class="links">
			<a href="mailto:{personal.email}" class="link-item">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<rect x="2" y="4" width="20" height="16" rx="2" />
					<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
				</svg>
				<span>{personal.email}</span>
			</a>

			<a href={personal.linkedin} class="link-item" target="_blank" rel="noopener noreferrer">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path
						d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
					/>
					<rect x="2" y="9" width="4" height="12" />
					<circle cx="4" cy="4" r="2" />
				</svg>
				<span>LinkedIn</span>
			</a>

			<a href={personal.github} class="link-item" target="_blank" rel="noopener noreferrer">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
				<span>GitHub</span>
			</a>
		</div>

		<div class="divider" aria-hidden="true"></div>

		<p class="copy">&copy; {new Date().getFullYear()} {personal.name}</p>
	</div>
</section>

<style>
	.contact {
		padding: 5rem 1.5rem 3rem;
		border-top: 1px solid var(--border);
	}

	.contact-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		text-align: center;
	}

	.contact-heading {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.6rem;
		margin-bottom: 1rem;
	}

	.marker {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--text-dim);
		font-weight: 400;
		user-select: none;
	}

	.title {
		font-family: var(--font-mono);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	.blurb {
		font-size: 0.95rem;
		color: var(--text-muted);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.links {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
		margin-bottom: 3rem;
	}

	.link-item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--text-muted);
		text-decoration: none;
		padding: 0.55rem 1rem;
		border: 1px solid var(--border);
		border-radius: 6px;
		transition:
			border-color var(--transition),
			color var(--transition),
			background-color var(--transition);
	}

	.link-item:hover {
		border-color: var(--accent);
		color: var(--accent);
		background: var(--accent-glow);
	}

	.divider {
		width: 40px;
		height: 1px;
		background: var(--border);
		margin: 0 auto 1.5rem;
	}

	.copy {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-dim);
	}

	@media (max-width: 480px) {
		.links {
			flex-direction: column;
			align-items: center;
		}

		.link-item {
			width: 100%;
			max-width: 260px;
			justify-content: center;
		}
	}
</style>
