<script lang="ts">
	import { projects } from '$lib/data/resume';
</script>

<div class="grid">
	{#each projects as project}
		<article class="card">
			{#if project.highlight}
				<span class="badge">{project.highlight}</span>
			{/if}
			<h3 class="card-title">{project.title}</h3>
			<p class="card-desc">{project.description}</p>
			<div class="tags">
				{#each project.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</article>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.15rem;
	}

	.card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		transition:
			transform var(--transition),
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.card:hover {
		transform: translateY(-3px);
		border-color: var(--accent);
		box-shadow: 0 8px 32px var(--accent-glow);
	}

	.badge {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		display: inline-block;
		margin-bottom: 0.85rem;
		padding: 0.18rem 0.55rem;
		background: var(--accent-glow);
		border-radius: 4px;
		width: fit-content;
	}

	.card-title {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.55rem;
		letter-spacing: -0.01em;
	}

	.card-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.65;
		margin-bottom: 1.15rem;
		flex: 1;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: var(--text-dim);
		padding: 0.18rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: 4px;
		transition:
			border-color var(--transition),
			color var(--transition);
	}

	.card:hover .tag {
		border-color: color-mix(in srgb, var(--border) 60%, var(--accent) 20%);
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
