<script>
	import '../app.css';
	let { children } = $props();

	const siteUrl = 'https://matthewostrowski.com';
	const title = 'Matthew Ostrowski — Software Development Engineer';
	const description =
		'Software Development Engineer based in Tokyo, Japan. 6+ years building scalable cloud systems at Amazon. Skilled in AWS, Kotlin, Python, TypeScript, and React.';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Matthew Ostrowski',
		url: siteUrl,
		jobTitle: 'Software Development Engineer',
		description: description,
		email: 'mailto:matthewostrowski@proton.me',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Tokyo',
			addressCountry: 'JP'
		},
		sameAs: [
			'https://www.linkedin.com/in/matthew-ostrowski',
			'https://github.com/mostrowski123'
		],
		alumniOf: {
			'@type': 'CollegeOrUniversity',
			name: 'University of California, Davis'
		},
		worksFor: {
			'@type': 'Organization',
			name: 'Self-employed'
		},
		knowsAbout: [
			'AWS',
			'Cloud Architecture',
			'Kotlin',
			'Python',
			'TypeScript',
			'React',
			'DynamoDB',
			'Serverless',
			'Full-stack Development'
		]
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Matthew Ostrowski" />
	<meta
		name="keywords"
		content="Matthew Ostrowski, Software Engineer, SDE, AWS, Amazon, Tokyo, Cloud Architecture, Kotlin, Python, TypeScript, React, Full-stack Developer"
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Matthew Ostrowski" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

{@render children()}
