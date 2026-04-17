<script lang="ts">
	import { projects } from '$lib/data/resume';
</script>

<div class="grid">
	{#each projects as project}
		<article class="card">
			<div class="card-header">
				{#if project.highlight}
					<span class="badge">{project.highlight}</span>
				{/if}
				{#if project.links}
					<div class="card-links">
						{#if project.links.github}
							<a
								href={project.links.github}
								target="_blank"
								rel="noopener noreferrer"
								class="card-link"
								aria-label="{project.title} GitHub repository"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
									/>
								</svg>
							</a>
						{/if}
						{#if project.links.googlePlay}
							<a
								href={project.links.googlePlay}
								target="_blank"
								rel="noopener noreferrer"
								class="card-link"
								aria-label="{project.title} on Google Play"
							>
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658 16.802 8.99l-2.302 2.303-8.636-8.635z"
									/>
								</svg>
							</a>
						{/if}
					</div>
				{/if}
			</div>
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

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 0.85rem;
		min-height: 1.4rem;
	}

	.badge {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		display: inline-block;
		padding: 0.18rem 0.55rem;
		background: var(--accent-glow);
		border-radius: 4px;
		width: fit-content;
	}

	.card-links {
		display: flex;
		gap: 0.4rem;
		margin-left: auto;
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		color: var(--text-dim);
		border: 1px solid var(--border);
		border-radius: 4px;
		transition:
			color var(--transition),
			border-color var(--transition),
			background var(--transition);
	}

	.card-link:hover {
		color: var(--accent);
		border-color: var(--accent);
		background: var(--accent-glow);
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
