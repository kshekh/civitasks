import { db } from "@database/setup";

export const HYPERDRIVE = {
  name: 'Hyperdrive',
  description: 'The Solana Hyperdrive hackathon',
  start_date: new Date('2023-09-06T00:00:00.000Z'),
  end_date: new Date('2023-10-15T00:00:00.000Z'),
}

export const ENGINEERING_ROLES = new Set([
	'AI / ML Engineer',
	'Backend Developer',
	'Data Scientist',
	'Frontend Developer',
	'Full-stack Developer',
	'Game Developer',
	'Mobile Developer',
	'Network Engineer',
	'Software Engineer',
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
  'DAOs & Network States',
];

export const SOURCES = [
  'Word of mouth (Coworker, friend, etc.)',
  'Twitter',
  'YouTube',
  'Solana.com',
  'Hacker House',
  'Other',
  'Superteam',
  'Solana Collective',
  'SolanaU',
  'Solana Bootcamps',
  'Community Hacker House (e.g. mtnDAO)',
  'Community Hackathon (e.g. OPOS hackathon)',
  'None of the above',
];

export const getCurrentHackathon = async function() {
  try {
    const currentHackathon = await db
        .selectFrom('hackathons')
        .selectAll()
        .where('name', '=', HYPERDRIVE.name)
        .executeTakeFirst();

    if (!currentHackathon) {
      console.error("Unable to find current hackathon record from DB on start-up, exiting.");
      process.exit(1);
    }
    return currentHackathon;

  } catch (error) {
    console.error("Error fetching current hackathon record from DB on start-up, exiting.", error);
    process.exit(1);
  }
};
