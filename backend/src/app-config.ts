import { errorHandler } from '@middlewares/error-handler';
import { config } from '@config';
import express from 'express';
import cors from 'cors';
import { router } from 'router';
import { getCurrentHackathon } from '@config/base-app-data';
import supertokens from 'supertokens-node';
import {
	middleware as authMiddleware,
	errorHandler as authErrorHandler
} from 'supertokens-node/framework/express';
import { initAuth } from 'auth/init';

export const CURRENT_HACKATHON = 'CURRENT_HACKATHON';
const app = express();

// init supertokens
initAuth();

// Basic app config
app.set('trust proxy', 1);

// Middleware and routing
app.use(
	express.json(),
	express.urlencoded({ extended: false }),
	cors({
		origin: config.ALLOWED_ORIGINS.split(','),
		allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
		credentials: true
	}),
	authMiddleware(),
	router,
	authErrorHandler(),
	errorHandler
);

// Force loading current hackathon data on start-up
// There's probably a better way to do this.
(async () => {
	app.set(CURRENT_HACKATHON, await getCurrentHackathon());
})();

export default app;
