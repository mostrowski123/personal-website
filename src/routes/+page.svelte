<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Section from '$lib/components/Section.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Education from '$lib/components/Education.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<Nav />

<main>
	<Hero />

	<Section id="experience" title="Experience">
		<Experience />
	</Section>

	<Section id="projects" title="Projects">
		<Projects />
	</Section>

	<Section id="skills" title="Skills">
		<Skills />
	</Section>

	<Section id="education" title="Education">
		<Education />
	</Section>
</main>

<Contact />

<style>
	main {
		position: relative;
	}

	main::before {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1;
		background-image: radial-gradient(
			circle at 1px 1px,
			rgba(255, 255, 255, 0.018) 1px,
			transparent 0
		);
		background-size: 28px 28px;
	}
</style>
