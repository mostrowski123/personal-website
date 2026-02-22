<script lang="ts">
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

	let { open = $bindable(false) }: { open: boolean } = $props();

	let turnstileEl: HTMLDivElement = $state(null!);
	let widgetId: string | undefined;
	let status: 'idle' | 'verifying' | 'error' = $state('idle');
	let errorMessage = $state('');

	function loadTurnstile() {
		if (document.querySelector('script[src*="turnstile"]')) {
			renderWidget();
			return;
		}
		const script = document.createElement('script');
		script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
		script.async = true;
		(window as any).onTurnstileLoad = renderWidget;
		document.head.appendChild(script);
	}

	function renderWidget() {
		if (!turnstileEl || widgetId !== undefined) return;
		widgetId = (window as any).turnstile.render(turnstileEl, {
			sitekey: PUBLIC_TURNSTILE_SITE_KEY,
			theme: 'dark',
			callback: onVerified,
			'error-callback': onError,
			'expired-callback': onExpired
		});
	}

	async function onVerified(token: string) {
		status = 'verifying';
		try {
			const res = await fetch('/api/resume', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token })
			});
			if (!res.ok) {
				throw new Error('Verification failed');
			}
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			window.open(url, '_blank');
			close();
		} catch {
			status = 'error';
			errorMessage = 'Verification failed. Please try again.';
			resetWidget();
		}
	}

	function onError() {
		status = 'error';
		errorMessage = 'CAPTCHA error. Please try again.';
	}

	function onExpired() {
		resetWidget();
	}

	function resetWidget() {
		if (widgetId !== undefined) {
			(window as any).turnstile?.reset(widgetId);
		}
	}

	function close() {
		open = false;
		status = 'idle';
		errorMessage = '';
		if (widgetId !== undefined) {
			(window as any).turnstile?.remove(widgetId);
			widgetId = undefined;
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	$effect(() => {
		if (open) {
			// Wait for DOM to render, then load Turnstile
			requestAnimationFrame(() => loadTurnstile());
		}
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div class="overlay" role="dialog" aria-modal="true" aria-label="Resume download verification" tabindex="0" onkeydown={onKeydown}>
		<button class="backdrop" onclick={close} tabindex="-1" aria-label="Close"></button>
		<div class="modal">
			<div class="modal-header">
				<span class="prompt" aria-hidden="true">&gt;</span>
				<span class="title">verify_human</span>
				<button class="close-btn" onclick={close} aria-label="Close dialog">&times;</button>
			</div>

			<p class="description">Complete the challenge below to download the resume.</p>

			<div class="turnstile-wrapper" bind:this={turnstileEl}></div>

			{#if status === 'verifying'}
				<p class="status">Verifying<span class="dots">...</span></p>
			{/if}

			{#if status === 'error'}
				<p class="status error">{errorMessage}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		border: none;
		cursor: default;
	}

	.modal {
		position: relative;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
		max-width: 400px;
		width: 100%;
		animation: fadeUp 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.modal-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.prompt {
		font-family: var(--font-mono);
		color: var(--accent);
		font-size: 1rem;
		user-select: none;
	}

	.title {
		font-family: var(--font-mono);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		flex: 1;
	}

	.close-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		font-size: 1.4rem;
		cursor: pointer;
		padding: 0 0.25rem;
		line-height: 1;
		transition: color var(--transition);
	}

	.close-btn:hover {
		color: var(--text);
	}

	.description {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--text-muted);
		margin-bottom: 1.25rem;
		line-height: 1.5;
	}

	.turnstile-wrapper {
		display: flex;
		justify-content: center;
		min-height: 65px;
	}

	.status {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--accent);
		text-align: center;
		margin-top: 1rem;
	}

	.status.error {
		color: #ef4444;
	}

	.dots {
		animation: blink 1.1s step-end infinite;
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

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 480px) {
		.modal {
			padding: 1.25rem;
		}
	}
</style>
