<script lang="ts">
	import { skills } from '$lib/data/resume';
</script>

<div class="skill-groups">
	{#each skills as group}
		<div class="group">
			<h3 class="group-label">{group.category}</h3>
			<div class="pills">
				{#each group.skills as skill}
					<span class="pill">{skill}</span>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.skill-groups {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.group-label {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.85rem;
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.pill {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-muted);
		padding: 0.35rem 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 6px;
		transition:
			transform var(--transition),
			border-color var(--transition),
			color var(--transition),
			background-color var(--transition);
		cursor: default;
	}

	.pill:hover {
		transform: translateY(-1px);
		border-color: var(--accent);
		color: var(--text);
		background: var(--surface-hover);
	}
</style>
