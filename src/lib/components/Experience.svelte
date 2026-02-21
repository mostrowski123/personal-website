<script lang="ts">
	import { experience } from '$lib/data/resume';
</script>

<div class="timeline">
	{#each experience as job}
		<div class="timeline-item">
			<div class="timeline-track" aria-hidden="true">
				<div class="dot"></div>
				<div class="line"></div>
			</div>
			<div class="timeline-content">
				<div class="header">
					<div class="header-left">
						<h3 class="company">{job.company}</h3>
						<p class="role">{job.role}</p>
						<p class="location">{job.location}</p>
					</div>
					<span class="period">{job.period}</span>
				</div>
				<ul class="bullets">
					{#each job.bullets as bullet}
						<li>{bullet}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		display: flex;
		gap: 1.5rem;
	}

	.timeline-track {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		padding-top: 6px;
	}

	.dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		border: 2px solid var(--accent);
		background: var(--bg);
		flex-shrink: 0;
		position: relative;
		z-index: 1;
	}

	.line {
		width: 1px;
		flex: 1;
		background: var(--border);
		min-height: 24px;
	}

	.timeline-item:last-child .line {
		background: linear-gradient(to bottom, var(--border), transparent);
	}

	.timeline-content {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		flex: 1;
		transition: border-color var(--transition);
	}

	.timeline-content:hover {
		border-color: color-mix(in srgb, var(--border) 50%, var(--accent) 30%);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.15rem;
	}

	.company {
		font-family: var(--font-mono);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text);
		letter-spacing: -0.01em;
	}

	.role {
		font-size: 0.875rem;
		color: var(--accent);
		margin-top: 0.2rem;
	}

	.location {
		font-size: 0.78rem;
		color: var(--text-dim);
		margin-top: 0.15rem;
	}

	.period {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-muted);
		white-space: nowrap;
		padding: 0.2rem 0.55rem;
		background: var(--bg-alt);
		border: 1px solid var(--border);
		border-radius: 4px;
		flex-shrink: 0;
		line-height: 1.4;
	}

	.bullets {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.bullets li {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.65;
		padding-left: 1.1rem;
		position: relative;
	}

	.bullets li::before {
		content: '▹';
		position: absolute;
		left: 0;
		color: var(--accent);
		font-size: 0.8rem;
	}

	@media (max-width: 600px) {
		.timeline-track {
			display: none;
		}

		.timeline-item {
			gap: 0;
		}

		.timeline-content {
			margin-bottom: 1rem;
		}

		.header {
			flex-direction: column;
			gap: 0.4rem;
		}

		.period {
			align-self: flex-start;
		}
	}
</style>
