import 'dotenv/config';

export const config = {
	PORT: process.env.PORT,
	ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:5173',

	// Built-in vars from Railway
	RAILWAY_ENVIRONMENT_NAME: process.env.RAILWAY_ENVIRONMENT_NAME,

	// Supertokens config
	SUPERTOKENS_APP_NAME: process.env.SUPERTOKENS_APP_NAME || 'civitas',
	SUPERTOKENS_CORE_URI: process.env.SUPERTOKENS_CORE_URI || 'http://localhost:3567',
	SUPERTOKENS_API_DOMAIN: process.env.SUPERTOKENS_API_DOMAIN || 'http://localhost:8080',
	SUPERTOKENS_FRONTEND_DOMAIN: process.env.SUPERTOKENS_FRONTEND_DOMAIN || 'http://localhost:5173',
	SUPERTOKENS_COOKIE_DOMAIN: process.env.SUPERTOKENS_COOKIE_DOMAIN,

	// Postgres config vars from Railway
	DATABASE_URL: process.env.DATABASE_URL,
	PGDATABASE: process.env.PGDATABASE,
	PGHOST: process.env.PGHOST,
	PGPASSWORD: process.env.PGPASSWORD,
	PGPORT: process.env.PGPORT,
	PGUSER: process.env.PGUSER,

	// Sendgrid
	SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',

	TXN_EMAIL_FROM: process.env.TXN_EMAIL_FROM || 'bots@narrative-violation.com',

	// AWS
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
	AWS_S3_PUBLIC_STATIC_BUCKET_NAME: process.env.AWS_S3_PUBLIC_STATIC_BUCKET_NAME || '',
};
