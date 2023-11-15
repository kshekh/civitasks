import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';
import Session from 'supertokens-web-js/recipe/session';
import { EmailVerificationClaim } from 'supertokens-web-js/recipe/emailverification';
import { redirect } from '@sveltejs/kit';
import { client } from '$lib/api/Client';
import { ALLOWED_LATE_SUBMITS } from '$utils/constants';

const publicRoutes = new Set([
	'/signin',
	'/signup',
	'/email-confirmation',
	'/email-confirmation/request-verification',
	'/email-confirmation/failed',
	'/email-confirmation',
	'/email-confirmed',
	'/oauth-callback/google',
	'/reset-password',
	'/reset-password/link-expired',
	'/reset-password/link-sent',
	'/reset-password/new',
	'/reset-password/success',
	'/refresh-session',
	'/projects/ended',
	'/projects/explore',
]);

export const load = (async () => {
	// let urlSlug = '';
	// if (browser) {

	// 	if (url.pathname !== '/projects/explore') {
	// 		throw redirect(301, '/projects/explore');
	// 	}

		// if (await Session.doesSessionExist()) {
		// 	const validationErrors = await Session.validateClaims();
		// 	const accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
		// 	urlSlug = accessTokenPayload._url_slug!;

		// 	const email = accessTokenPayload._email!;
		// 	if (!email || !ALLOWED_LATE_SUBMITS.has(email)) {
		// 		if (publicRoutes.has(url.pathname)) return {};
		// 		throw redirect(301, '/projects/explore');
		// 	}

		// 	if (validationErrors.length > 0) {
		// 		for (const err of validationErrors) {
		// 			if (err.validatorId === EmailVerificationClaim.id) {
		// 				throw redirect(301, '/email-confirmation/request-verification');
		// 			}
		// 		}
		// 	} else {
		// 		let project;
		// 		try {
		// 			project = await client.hyperdrive.getOne();
		// 		} catch (_) {
		// 			project = {};
		// 		};
		// 		// User has session, but no project submitted yet, so always send them to projects
		// 		if (Object.keys(project).length === 0)  {
		// 			if (url.pathname !== '/projects' && !publicRoutes.has(url.pathname)) {
		// 				throw redirect(301, '/projects');
		// 			}
		// 		} else {
		// 			// User has a project, so let them see public routes or edit or dashboard
		// 			if (
		// 				!publicRoutes.has(url.pathname) &&
		// 				url.pathname !== '/' &&
		// 				url.pathname !== '/projects/success' &&
		// 				url.pathname !== '/projects/ended' &&
		// 				url.pathname !== '/projects/explore' &&
		// 				!url.searchParams.has('edit')
		// 			) {
		// 				throw redirect(301, '/');
		// 			}
		// 		}
		// 	}
		// } else {
		// 	if (publicRoutes.has(url.pathname)) return {};
		// 	throw redirect(301, '/projects/explore');
		// }
	// }
	// return { urlSlug };
}) satisfies LayoutLoad;
