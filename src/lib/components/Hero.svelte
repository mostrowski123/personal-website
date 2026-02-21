<script lang="ts">
	import { personal } from '$lib/data/resume';
</script>

<section id="about" class="hero">
	<div class="hero-inner">
		<div class="intro" aria-label="Name">
			<span class="prompt" aria-hidden="true">&gt;</span>
			<h1 class="name">
				{personal.name}<span class="cursor" aria-hidden="true">_</span>
			</h1>
		</div>

		<p class="subtitle">
			{personal.title}
			<span class="sep" aria-hidden="true">·</span>
			{personal.location}
		</p>

		<p class="summary">{personal.summary}</p>

		<div class="actions">
			<a
				href="/Matthew_Ostrowski_Resume.pdf"
				class="btn btn-primary"
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<polyline points="7 10 12 15 17 10" />
					<line x1="12" y1="15" x2="12" y2="3" />
				</svg>
				Resume
			</a>
			<a
				href={personal.linkedin}
				class="btn btn-ghost"
				target="_blank"
				rel="noopener noreferrer"
			>
				LinkedIn
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M7 17L17 7" />
					<path d="M7 7h10v10" />
				</svg>
			</a>
			<a
				href={personal.github}
				class="btn btn-ghost"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M7 17L17 7" />
					<path d="M7 7h10v10" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		padding: 6rem 1.5rem 4rem;
		position: relative;
	}

	.hero-inner {
		max-width: var(--max-width);
		margin: 0 auto;
		width: 100%;
	}

	.intro {
		display: flex;
		align-items: baseline;
		gap: 0.65rem;
		margin-bottom: 0.6rem;
		animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.prompt {
		font-family: var(--font-mono);
		font-size: clamp(1.6rem, 4vw, 2.2rem);
		color: var(--accent);
		user-select: none;
		line-height: 1;
	}

	.name {
		font-family: var(--font-mono);
		font-size: clamp(2.2rem, 5.5vw, 3.5rem);
		font-weight: 700;
		color: var(--text);
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.cursor {
		color: var(--accent);
		font-weight: 400;
		animation: blink 1.1s step-end infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.subtitle {
		font-family: var(--font-mono);
		font-size: clamp(0.85rem, 2vw, 1rem);
		color: var(--text-muted);
		margin-bottom: 1.75rem;
		animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
	}

	.sep {
		color: var(--text-dim);
		margin: 0 0.35rem;
	}

	.summary {
		font-size: 1rem;
		color: var(--text-muted);
		line-height: 1.75;
		max-width: 580px;
		margin-bottom: 2.25rem;
		animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
	}

	.btn {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		padding: 0.55rem 1.1rem;
		border-radius: 6px;
		text-decoration: none;
		transition:
			background-color var(--transition),
			color var(--transition),
			border-color var(--transition),
			transform var(--transition);
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		line-height: 1;
	}

	.btn:active {
		transform: scale(0.97);
	}

	.btn-primary {
		background: var(--accent);
		color: var(--bg);
		font-weight: 600;
	}

	.btn-primary:hover {
		background: var(--accent-hover);
		color: var(--bg);
	}

	.btn-ghost {
		border: 1px solid var(--border);
		color: var(--text-muted);
		background: transparent;
	}

	.btn-ghost:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 480px) {
		.hero {
			padding-top: 5rem;
		}

		.actions {
			flex-direction: column;
		}

		.btn {
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro,
		.subtitle,
		.summary,
		.actions {
			animation: none;
		}

		.cursor {
			animation: none;
			opacity: 1;
		}
	}
</style>
