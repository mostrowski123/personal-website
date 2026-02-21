<script lang="ts">
	import { education } from '$lib/data/resume';
</script>

<div class="edu-grid">
	{#each education as edu}
		<div class="edu-card">
			<span class="edu-period">{edu.period}</span>
			<h3 class="edu-institution">{edu.institution}</h3>
			<p class="edu-degree">{edu.degree}</p>
			<p class="edu-location">{edu.location}</p>
			{#if edu.details.length > 0}
				<ul class="edu-details">
					{#each edu.details as detail}
						<li>{detail}</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>

<style>
	.edu-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.15rem;
	}

	.edu-card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		transition: border-color var(--transition);
	}

	.edu-card:hover {
		border-color: color-mix(in srgb, var(--border) 50%, var(--accent) 30%);
	}

	.edu-period {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-muted);
		display: inline-block;
		padding: 0.18rem 0.5rem;
		background: var(--bg-alt);
		border: 1px solid var(--border);
		border-radius: 4px;
		margin-bottom: 0.85rem;
		line-height: 1.4;
	}

	.edu-institution {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 0.2rem;
		letter-spacing: -0.01em;
	}

	.edu-degree {
		font-size: 0.85rem;
		color: var(--accent);
		margin-bottom: 0.15rem;
	}

	.edu-location {
		font-size: 0.78rem;
		color: var(--text-dim);
		margin-bottom: 0.85rem;
	}

	.edu-details {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.edu-details li {
		font-size: 0.82rem;
		color: var(--text-muted);
		padding-left: 1rem;
		position: relative;
		line-height: 1.5;
	}

	.edu-details li::before {
		content: '▹';
		position: absolute;
		left: 0;
		color: var(--accent);
		font-size: 0.75rem;
	}

	@media (max-width: 600px) {
		.edu-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
