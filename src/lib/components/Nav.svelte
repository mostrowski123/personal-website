<script lang="ts">
	const links = [
		{ id: 'about', label: 'About' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'education', label: 'Education' },
		{ id: 'contact', label: 'Contact' }
	];

	let activeSection = $state('about');
	let mobileOpen = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 20;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		const ids = links.map((l) => l.id);
		const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ rootMargin: '-35% 0px -65% 0px' }
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	function navigate() {
		mobileOpen = false;
	}
</script>

<nav class:scrolled>
	<div class="nav-inner">
		<a href="#about" class="logo" onclick={navigate}>
			<span class="logo-bracket" aria-hidden="true">{'{'}</span>MO<span
				class="logo-bracket"
				aria-hidden="true">{'}'}</span
			>
		</a>

		<button
			class="hamburger"
			class:open={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle navigation"
			aria-expanded={mobileOpen}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>

		<ul class:open={mobileOpen}>
			{#each links as link}
				<li>
					<a href="#{link.id}" class:active={activeSection === link.id} onclick={navigate}>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 0 1.5rem;
		transition:
			background-color 0.35s ease,
			border-color 0.35s ease;
		border-bottom: 1px solid transparent;
	}

	nav.scrolled {
		background-color: rgba(22, 22, 26, 0.92);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom-color: var(--border);
	}

	.nav-inner {
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
	}

	.logo {
		font-family: var(--font-mono);
		font-size: 1.05rem;
		font-weight: 700;
		color: var(--text);
		text-decoration: none;
		transition: color var(--transition);
		letter-spacing: -0.02em;
	}

	.logo:hover {
		color: var(--accent);
	}

	.logo-bracket {
		color: var(--accent);
		font-weight: 400;
	}

	ul {
		display: flex;
		gap: 0.125rem;
		list-style: none;
	}

	ul a {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-muted);
		text-decoration: none;
		padding: 0.45rem 0.7rem;
		border-radius: 6px;
		transition: color var(--transition);
		position: relative;
		isolation: isolate;
		overflow: hidden;
	}

	ul a::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--surface);
		border-radius: inherit;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
		z-index: -1;
	}

	ul a:hover::before {
		transform: scaleX(1);
	}

	ul a:hover {
		color: var(--text);
	}

	ul a.active {
		color: var(--accent);
	}

	ul a.active::after {
		content: '';
		position: absolute;
		bottom: 0px;
		left: 0.7rem;
		right: 0.7rem;
		height: 2px;
		background: var(--accent);
		border-radius: 1px;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		z-index: 101;
	}

	.hamburger span {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--text);
		border-radius: 1px;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
		transform-origin: center;
	}

	.hamburger.open span:nth-child(1) {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	@media (max-width: 768px) {
		.hamburger {
			display: flex;
		}

		ul {
			display: none;
			flex-direction: column;
			position: absolute;
			top: 60px;
			left: 0;
			right: 0;
			background: var(--bg);
			border-bottom: 1px solid var(--border);
			padding: 0.75rem 1.5rem 1rem;
			gap: 0;
		}

		ul.open {
			display: flex;
		}

		ul a {
			padding: 0.6rem 0.75rem;
			font-size: 0.85rem;
		}

		ul a.active::after {
			display: none;
		}

		ul a.active {
			background-color: var(--surface);
		}
	}
</style>
