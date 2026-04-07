export const personal = {
	name: 'Matthew Ostrowski',
	title: 'Software Development Engineer',
	location: 'Tokyo, Japan',
	email: 'matthewostrowski@proton.me',
	phone: '+81 090-6693-1909',
	linkedin: 'https://www.linkedin.com/in/matthew-ostrowski',
	github: 'https://github.com/mostrowski123',
	summary:
		'Software Development Engineer with 6 years of experience architecting and delivering scalable cloud-based systems at enterprise scale. Proven track record at Amazon building high-impact services processing thousands of daily requests across 67 countries. Organization-wide hackathon winner leveraging AI to automate workflows. Skilled in AWS infrastructure, full-stack development, and leading cross-functional teams in agile environments, and shipping independent mobile and ML projects. Business-level Japanese proficiency (JLPT N2).'
};

export interface Job {
	company: string;
	location: string;
	role: string;
	period: string;
	bullets: string[];
}

export const experience: Job[] = [
	{
		company: 'Amazon',
		location: 'Boston, MA',
		role: 'Software Development Engineer II',
		period: 'Dec 2021 – Jan 2025',
		bullets: [
			'Led 3 engineers to architect API Gateway and Lambda middleware (Kotlin, Python) bridging new and legacy onboarding systems, enabling phased regional rollout with automatic rollback for ~1–2K new candidates ingested weekly out of ~7K corporate hires',
			'Won first place in an organization-wide hackathon by building an AI-powered ticket triage system that categorized and auto-responded to support requests using AWS Bedrock, Lambda, SNS, SQS, DynamoDB, React, and TypeScript',
			'Led an 8-person cross-functional team as Scrum Master to ship a personal information management portal on AtoZ serving 1.5M employees, ensuring compliance with laws and regulations across 67 countries',
			'Designed a DynamoDB single-table data model with an OpenSearch analytics pipeline for long-term storage, supporting an onboarding system tracking ~15,000 concurrent candidates across 13 contingencies',
			'Developed a notification engine using DynamoDB, Lambda, and SNS that calculated and dispatched 80,000 reminder alerts within 6 months to employees with incomplete life events'
		]
	},
	{
		company: 'The Cape Cod Five Cents Savings Bank',
		location: 'Hyannis, MA',
		role: 'Software Developer I',
		period: 'Apr 2019 – Dec 2021',
		bullets: [
			'Engineered a full CI/CD pipeline from development to production with automated regression testing using GitLab Runner, xUnit, and bUnit, reducing deployment risk and accelerating release cycles',
			'Saved over $2,500 annually by designing multiple C# automation programs to replace licensed software, including a real-time ATM status monitoring tool running at one-minute intervals'
		]
	}
];

export interface Project {
	title: string;
	description: string;
	tags: string[];
	highlight?: string;
}

export const projects: Project[] = [
	{
		title: 'Mekuru — Japanese EPUB & Manga Reader',
		description:
			'Built and published a Japanese reading app with offline dictionary lookup via MeCab tokenization, vocabulary tracking with Anki export, and localization in 4 languages across 40+ releases.',
		tags: ['Flutter', 'Dart', 'Riverpod', 'SQLite'],
		highlight: 'Google Play'
	},
	{
		title: 'Mekuru OCR Server',
		description:
			'Companion OCR server using ML models for manga text detection and recognition, with Docker containerization for GPU-accelerated deployment and Firebase Cloud Functions for service orchestration.',
		tags: ['Python', 'FastAPI', 'Docker', 'Firebase', 'TypeScript'],
		highlight: 'GPU ML'
	},
	{
		title: 'Notification Engine',
		description:
			'Designed and developed a reminder system at Amazon that calculated and dispatched 80,000 alerts to employees with incomplete life events over 6 months.',
		tags: ['DynamoDB', 'Lambda', 'SNS', 'Event-driven'],
		highlight: '80K Alerts'
	},
	{
		title: 'AI Ticket Triage System',
		description:
			'Built an AI-powered system that categorized and auto-responded to support requests. Won first place in an organization-wide hackathon.',
		tags: ['AWS Bedrock', 'Lambda', 'DynamoDB', 'React', 'TypeScript'],
		highlight: '1st Place Hackathon'
	},
	{
		title: 'AtoZ Employee Portal',
		description:
			'Led an 8-person cross-functional team to ship a personal information management portal serving 1.5M employees with compliance across 67 countries.',
		tags: ['Scrum', 'Cross-functional', 'Compliance', 'Full-stack'],
		highlight: '1.5M Users'
	}
];

export interface SkillGroup {
	category: string;
	skills: string[];
}

export const skills: SkillGroup[] = [
	{
		category: 'Cloud & Infrastructure',
		skills: [
			'AWS Bedrock',
			'API Gateway',
			'Lambda',
			'DynamoDB',
			'SNS',
			'SQS',
			'S3',
			'Athena',
			'QuickSight',
			'Glue',
			'OpenSearch',
			'Firebase',
			'Docker',
			'CI/CD Pipelines'
		]
	},
	{
		category: 'Languages',
		skills: [
			'Kotlin',
			'Python',
			'Java',
			'Dart',
			'C#',
			'SQL',
			'TypeScript',
			'JavaScript',
			'HTML',
			'CSS'
		]
	},
	{
		category: 'Frameworks & Tools',
		skills: ['AWS CDK/SDK', 'Flutter', 'React', 'FastAPI', 'Git', 'GitLab', 'GitHub Actions']
	}
];

export interface Education {
	institution: string;
	location: string;
	degree: string;
	period: string;
	details: string[];
}

export const education: Education[] = [
	{
		institution: 'Japanese Language School',
		location: 'Tokyo, Japan',
		degree: 'Intensive Japanese Language Program',
		period: 'Apr 2025 – Present',
		details: ['Full-time study toward advanced Japanese proficiency', 'JLPT N2 certified']
	},
	{
		institution: 'University of California, Davis',
		location: 'Davis, CA',
		degree: 'Bachelor of Science in Computer Science',
		period: 'March 2019',
		details: ['GPA: 3.52', "Dean's List: Spring 2016, Fall 2017"]
	}
];
