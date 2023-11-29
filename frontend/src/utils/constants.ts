export const ALLOWED_LATE_SUBMITS = new Set(['none']);

export const HYPERDRIVE = {
	name: 'Hyperdrive',
	description: 'The Solana Hyperdrive hackathon',
	start_date: new Date('2023-09-06T00:00:00.000Z'),
	end_date: new Date('2023-10-15T00:00:00.000Z')
};

export const ENGINEERING_ROLES = new Set([
	'AI / ML Engineer',
	'Backend Developer',
	'Data Scientist',
	'Frontend Developer',
	'Full-stack Developer',
	'Game Developer',
	'Mobile Developer',
	'Network Engineer',
	'Software Engineer'
]);

export const ROLES = [
	'Business Development',
	'Community Manager',
	'Content Creator',
	'Finance',
	'Hardware Engineer',
	'Legal Support',
	'Marketing',
	'Operations',
	'Product Design',
	'Product Manager',
	'Sales',
	'Technical Writer',
	'Graphic Design',
	'Visual Design',
	...ENGINEERING_ROLES
];

export const SKILLS = [
	'.NET',
	'Anchor',
	'AngularJS',
	'API Development',
	'Assembly',
	'AWS',
	'Azure',
	'Bash/Shell Scripting',
	'BigQuery',
	'Bootstrap',
	'C',
	'C#',
	'C++',
	'Cassandra',
	'CI/CD',
	'Clojure',
	'Cloudflare',
	'Cryptography',
	'Deno',
	'Docker',
	'Django',
	'DynamoDB',
	'Elasticsearch',
	'Electron',
	'Elixir',
	'Elm',
	'Embedded C',
	'Express.js',
	'Fastify',
	'Firebase',
	'Flask',
	'FPGA',
	'GCP',
	'Git',
	'Golang',
	'GraphQL',
	'Hadoop',
	'Haskell',
	'Heroku',
	'Hetzner',
	'HTML/CSS',
	'Java',
	'JavaScript',
	'Jenkins',
	'Apache Kafka',
	'Kotlin',
	'Kubernetes',
	'Lisp',
	'LUA',
	'MATLAB',
	'MongoDB',
	'MySQL',
	'Neo4J',
	'Netlify',
	'NestJS',
	'Next.js',
	'Node.js',
	'Nuxt.js',
	'NoSQL',
	'OCaml',
	'Oracle',
	'Phoenix',
	'PHP',
	'PostgreSQL',
	'Python',
	'PyTorch',
	'R',
	'Railway',
	'React',
	'React Native',
	'Redshift',
	'Redux',
	'Ruby',
	'Ruby on Rails',
	'Rust',
	'Sass/SCSS',
	'Smart Contracts',
	'Snowflake',
	'Solidity',
	'Scala',
	'Scikit-Learn',
	'Spark',
	'Spring Boot',
	'Supabase',
	'SQL',
	'SQLite',
	'Svelte / SvelteKit',
	'Swift',
	'Tailwind CSS',
	'TensorFlow',
	'TypeScript',
	'Unity',
	'Vercel',
	'Vue.js',
	'Webflow',
	'Webpack',
	'WebSockets'
];

export const TRACKS = [
	'Physical Infrastructure Networks',
	'Artificial Intelligence',
	'Finance & Payments',
	'Games & Entertainment',
	'Mobile Consumer Apps',
	'Crypto Infrastructure',
	'DAOs & Network States'
];

// taken from https://gist.githubusercontent.com/matthlavacka/de1e71ff9c67c114e2146c08def0581b/raw/aa35dd5f202c0d477c0fe6b65e4c3c9b3ee223a5/languages.json
export const LANGUAGES = {
	af: {
		name: 'Afrikaans',
		speakers: 15200000
	},
	am: {
		name: 'Amharic',
		speakers: 25800000
	},
	sq: {
		name: 'Albanian',
		speakers: 7500000
	},
	ar: {
		name: 'Arabic',
		speakers: 425000000
	},
	hy: {
		name: 'Armenian',
		speakers: 6400000
	},
	az: {
		name: 'Azerbaijani',
		speakers: 28000000
	},
	eu: {
		name: 'Basque',
		speakers: 720000
	},
	be: {
		name: 'Belarusian',
		speakers: 8600000
	},
	bn: {
		name: 'Bengali',
		speakers: 250000000
	},
	bs: {
		name: 'Bosnian',
		speakers: 3500000
	},
	bg: {
		name: 'Bulgarian',
		speakers: 9100000
	},
	ca: {
		name: 'Catalan',
		speakers: 11500000
	},
	ceb: {
		name: 'Cebuano',
		speakers: 21000000
	},
	ny: {
		name: 'Chichewa',
		speakers: 12000000
	},
	zh: {
		name: 'Chinese',
		speakers: 1026000000
	},
	co: {
		name: 'Corsican',
		speakers: 200000
	},
	hr: {
		name: 'Croatian',
		speakers: 16000000
	},
	cs: {
		name: 'Czech',
		speakers: 9500000
	},
	da: {
		name: 'Danish',
		speakers: 5600000
	},
	nl: {
		name: 'Dutch',
		speakers: 22000000
	},
	sjn: {
		name: 'Elvish',
		speakers: 1200000
	},
	en: {
		name: 'English',
		speakers: 765000000
	},
	eo: {
		name: 'Esperanto',
		speakers: 2000000
	},
	et: {
		name: 'Estonian',
		speakers: 1200000
	},
	tl: {
		name: 'Filipino',
		speakers: 25000000
	},
	fo: {
		name: 'Faroese',
		speakers: null
	},
	fj: {
		name: 'Fijian',
		speakers: 5000000
	},
	fi: {
		name: 'Finnish',
		speakers: 5000000
	},
	fr: {
		name: 'French',
		speakers: 68500000
	},
	fy: {
		name: 'Frisian',
		speakers: 470000
	},
	gl: {
		name: 'Galician',
		speakers: 2400000
	},
	ka: {
		name: 'Georgian',
		speakers: 4300000
	},
	de: {
		name: 'German',
		speakers: 111800000
	},
	el: {
		name: 'Greek',
		speakers: 13000000
	},
	gu: {
		name: 'Gujarati',
		speakers: 46600000
	},
	haw: {
		name: 'Hawaiian',
		speakers: 2000
	},
	ht: {
		name: 'Haitian Creole',
		speakers: 7700000
	},
	ha: {
		name: 'Hausa',
		speakers: 40000000
	},
	he: {
		name: 'Hebrew',
		speakers: 5300000
	},
	hi: {
		name: 'Hindi',
		speakers: 12500000
	},
	hmn: {
		name: 'Hmong',
		speakers: 4000000
	},
	hu: {
		name: 'Hungarian',
		speakers: 12500000
	},
	is: {
		name: 'Icelandic',
		speakers: 330000
	},
	ig: {
		name: 'Igbo',
		speakers: 18000000
	},
	id: {
		name: 'Indonesian',
		speakers: 23000000
	},
	iu: {
		name: 'Inuktitut',
		speakers: 34000
	},
	iku: {
		name: 'Inuinnaqtun',
		speakers: 410
	},
	ga: {
		name: 'Irish',
		speakers: 1000000
	},
	it: {
		name: 'Italian',
		speakers: 61100000
	},
	ja: {
		name: 'Japanese',
		speakers: 123000000
	},
	jw: {
		name: 'Javanese',
		speakers: 84300000
	},
	kk: {
		name: 'qazaq tili',
		speakers: 11000000
	},
	kn: {
		name: 'Kannada',
		speakers: 46700000
	},
	km: {
		name: 'Khmer',
		speakers: 16000000
	},
	ko: {
		name: 'Korean',
		speakers: 66400000
	},
	kok: {
		name: 'Konkani',
		speakers: 7400000
	},
	ky: {
		name: 'Кyrgyz',
		speakers: 4300000
	},
	ku: {
		name: 'Kurdish',
		speakers: 30000000
	},
	ckb: {
		name: 'Central Kurdish',
		speakers: 7250000
	},
	sdh: {
		name: 'Southern Kurdish',
		speakers: 5390000
	},
	lo: {
		name: 'Lao',
		speakers: 20000000
	},
	lv: {
		name: 'Latvian',
		speakers: 1700000
	},
	lt: {
		name: 'Lithuanian',
		speakers: 3000000
	},
	lb: {
		name: 'Luxembourgish',
		speakers: 390000
	},
	mk: {
		name: 'Macedonian',
		speakers: 2500000
	},
	mg: {
		name: 'Malagasy',
		speakers: 18000000
	},
	ms: {
		name: 'Malay',
		speakers: 59400000
	},
	ml: {
		name: 'Malayalam',
		speakers: 38000000
	},
	mt: {
		name: 'Maltese',
		speakers: 520000
	},
	mr: {
		name: 'Marathi',
		speakers: 71800000
	},
	mn: {
		name: 'Mongolian',
		speakers: 5700000
	},
	mi: {
		name: 'Māori',
		speakers: 60000
	},
	my: {
		name: 'Burmese',
		speakers: 42900000
	},
	ne: {
		name: 'Nepali',
		speakers: 14000000
	},
	no: {
		name: 'Norwegian',
		speakers: 5000000
	},
	pap: {
		name: 'Papiamento',
		speakers: 260000
	},
	fa: {
		name: 'Persian',
		speakers: 56600000
	},
	pl: {
		name: 'Polish',
		speakers: 39000000
	},
	pt: {
		name: 'Portuguese',
		speakers: 217000000
	},
	pa: {
		name: 'Punjabi',
		speakers: 29500000
	},
	ps: {
		name: 'Pashto',
		speakers: 60000000
	},
	otq: {
		name: 'Hñohño',
		speakers: 260000
	},
	ro: {
		name: 'Romanian',
		speakers: 23000000
	},
	ru: {
		name: 'Russian',
		speakers: 272000000
	},
	sm: {
		name: 'Samoan',
		speakers: 510000
	},
	gd: {
		name: 'Scottish Gaelic',
		speakers: 87000
	},
	sr: {
		name: 'Serbian',
		speakers: 16000000
	},
	'sr-LA': {
		name: 'Serbian',
		speakers: 16000000
	},
	sd: {
		name: 'Sindhi',
		speakers: 75000000
	},
	si: {
		name: 'Sinhalese',
		speakers: 16000000
	},
	sk: {
		name: 'Slovak',
		speakers: 5000000
	},
	sl: {
		name: 'Slovenian',
		speakers: 2500000
	},
	sn: {
		name: 'Slovenian',
		speakers: 2500000
	},
	st: {
		name: 'Sotho',
		speakers: 5600000
	},
	so: {
		name: 'Somali',
		speakers: 14000000
	},
	es: {
		name: 'Spanish',
		speakers: 466000000
	},
	su: {
		name: 'Sundanese',
		speakers: 38000000
	},
	sw: {
		name: 'Swahili',
		speakers: 140000000
	},
	sv: {
		name: 'Swedish',
		speakers: 8300000
	},
	ty: {
		name: 'Tahitian',
		speakers: 68000
	},
	ta: {
		name: 'Tamil',
		speakers: 76800000
	},
	tg: {
		name: 'Tajik',
		speakers: 8400000
	},
	te: {
		name: 'Telugu',
		speakers: 79000000
	},
	th: {
		name: 'Thai',
		speakers: 60000000
	},
	bo: {
		name: 'Tibetan',
		speakers: 1200000
	},
	to: {
		name: 'Tongan',
		speakers: 96000
	},
	tr: {
		name: 'Turkish',
		speakers: 50700000
	},
	uk: {
		name: 'Ukrainian',
		speakers: 36000000
	},
	ur: {
		name: 'Urdu',
		speakers: 63400000
	},
	uz: {
		name: 'Uzbek',
		speakers: 27000000
	},
	vi: {
		name: 'Vietnamese',
		speakers: 67800000
	},
	cy: {
		name: 'Welsh',
		speakers: 740000
	},
	xh: {
		name: 'Xhosa',
		speakers: 8200000
	},
	yi: {
		name: 'Yiddish',
		speakers: 1500000
	},
	yo: {
		name: 'Yoruba',
		speakers: 21000000
	},
	yua: {
		name: 'Yucatec Maya',
		speakers: 790000
	},
	yue: {
		name: 'Yueh',
		speakers: 60000000
	},
	zu: {
		name: 'Zulu',
		speakers: 26000000
	}
};

// taken from https://gist.github.com/kalinchernev/486393efcca01623b18d
export const COUNTRIES = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'Andorra',
	'Angola',
	'Antigua & Deps',
	'Argentina',
	'Armenia',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bhutan',
	'Bolivia',
	'Bosnia Herzegovina',
	'Botswana',
	'Brazil',
	'Brunei',
	'Bulgaria',
	'Burkina',
	'Burundi',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Cape Verde',
	'Central African Rep',
	'Chad',
	'Chile',
	'China',
	'Colombia',
	'Comoros',
	'Congo',
	'Congo {Democratic Rep}',
	'Costa Rica',
	'Croatia',
	'Cuba',
	'Cyprus',
	'Czech Republic',
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic',
	'East Timor',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Eritrea',
	'Estonia',
	'Ethiopia',
	'Fiji',
	'Finland',
	'France',
	'Gabon',
	'Gambia',
	'Georgia',
	'Germany',
	'Ghana',
	'Greece',
	'Grenada',
	'Guatemala',
	'Guinea',
	'Guinea-Bissau',
	'Guyana',
	'Haiti',
	'Honduras',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran',
	'Iraq',
	'Ireland {Republic}',
	'Israel',
	'Italy',
	'Ivory Coast',
	'Jamaica',
	'Japan',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kiribati',
	'Korea North',
	'Korea South',
	'Kosovo',
	'Kuwait',
	'Kyrgyzstan',
	'Laos',
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Macedonia',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Marshall Islands',
	'Mauritania',
	'Mauritius',
	'Mexico',
	'Micronesia',
	'Moldova',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Morocco',
	'Mozambique',
	'Myanmar, {Burma}',
	'Namibia',
	'Nauru',
	'Nepal',
	'Netherlands',
	'New Zealand',
	'Nicaragua',
	'Niger',
	'Nigeria',
	'Norway',
	'Oman',
	'Pakistan',
	'Palau',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines',
	'Poland',
	'Portugal',
	'Qatar',
	'Romania',
	'Russian Federation',
	'Rwanda',
	'St Kitts & Nevis',
	'St Lucia',
	'Saint Vincent & the Grenadines',
	'Samoa',
	'San Marino',
	'Sao Tome & Principe',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Slovakia',
	'Slovenia',
	'Solomon Islands',
	'Somalia',
	'South Africa',
	'South Sudan',
	'Spain',
	'Sri Lanka',
	'Sudan',
	'Suriname',
	'Swaziland',
	'Sweden',
	'Switzerland',
	'Syria',
	'Taiwan',
	'Tajikistan',
	'Tanzania',
	'Thailand',
	'Togo',
	'Tonga',
	'Trinidad & Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Tuvalu',
	'Uganda',
	'Ukraine',
	'United Arab Emirates',
	'United Kingdom',
	'United States',
	'Uruguay',
	'Uzbekistan',
	'Vanuatu',
	'Vatican City',
	'Venezuela',
	'Vietnam',
	'Yemen',
	'Zambia',
	'Zimbabwe'
];

export const HYPERDRIVE_SUBMISSION_COUNTRIES = [
	'Afghanistan',
	'Algeria',
	'Andorra',
	'Argentina',
	'Armenia',
	'Australia',
	'Azerbaijan',
	'Bangladesh',
	'Brazil',
	'Bulgaria',
	'Canada',
	'Central African Rep',
	'China',
	'Colombia',
	'Dominican Republic',
	'Egypt',
	'Finland',
	'France',
	'Georgia',
	'Germany',
	'Hungary',
	'India',
	'Indonesia',
	'Iraq',
	'Ireland {Republic}',
	'Israel',
	'Italy',
	'Ivory Coast',
	'Japan',
	'Kenya',
	'Korea South',
	'Latvia',
	'Malaysia',
	'Malta',
	'Mauritius',
	'Mexico',
	'Netherlands',
	'New Zealand',
	'Nigeria',
	'Norway',
	'Peru',
	'Philippines',
	'Poland',
	'Portugal',
	'Qatar',
	'Romania',
	'Russian Federation',
	'Serbia',
	'Sierra Leone',
	'Singapore',
	'South Africa',
	'Spain',
	'Sri Lanka',
	'Sweden',
	'Switzerland',
	'Taiwan',
	'Thailand',
	'Turkey',
	'Ukraine',
	'United Arab Emirates',
	'United Kingdom',
	'United States',
	'Venezuela',
	'Vietnam',
];

export const SOLANA_INITIATIVES = [
	'SolanaU',
	'Solana Collective',
	'Superteam',
	'Solana Hacker Houses',
	'Community Hacker Houses (mtnDAO, etc.)',
	'None of the above'
];
export const HYPERDRIVE_MARKETING_CHANNELS = [
	'Solana Foundation social media (Twitter, LinkedIn, etc.)',
	'Ecosystem project social media (Magic Eden, Phantom, etc.)',
	'Solana Foundation marketing campaigns (OPOS, etc.)',
	'Word of mouth',
	'Influencers (Tanmay Bhat, NasDaily, etc.)',
	'Solana Hacker Houses',
	'None of the above'
];

export const MARKETING_CHANNELS = [
	'Word of mouth (Coworker, friend, etc.)',
	'Twitter',
	'YouTube',
	'Solana.com',
	'Hacker House',
	'Other'
];

export const hyperdriveDeadline = new Date(Date.UTC(2023, 9, 16, 8, 0, 0));
export const projectFilesLocalStorageKey = 'project-media-files';
export const projectFormLocalStorageKey = 'project-submission-form';
