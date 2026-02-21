<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		title,
		children
	}: { id: string; title: string; children: Snippet } = $props();

	let el: HTMLElement | undefined = $state();
	let visible = $state(false);

	$effect(() => {
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<section {id} bind:this={el} class="section" class:visible>
	<div class="section-inner">
		<div class="section-heading">
			<span class="section-marker" aria-hidden="true">//</span>
			<h2 class="section-title">{title}</h2>
		</div>
		{@render children()}
	</div>
</section>

<style>
	.section {
		padding: 5rem 1.5rem;
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-inner {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.section-heading {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		margin-bottom: 2.5rem;
		position: relative;
		padding-bottom: 1rem;
	}

	.section-heading::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 36px;
		height: 2px;
		background: var(--accent);
		border-radius: 1px;
	}

	.section-marker {
		font-family: var(--font-mono);
		font-size: 1rem;
		color: var(--text-dim);
		font-weight: 400;
		user-select: none;
		flex-shrink: 0;
	}

	.section-title {
		font-family: var(--font-mono);
		font-size: 1.4rem;
		font-weight: 600;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	@media (prefers-reduced-motion: reduce) {
		.section {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
