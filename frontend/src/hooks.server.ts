import Client from '$lib/api/Client';
import { VERCEL_ENV } from '$env/static/private';
import { VITE_API_BASE_URL } from '$lib/env';
import type { ISubmitProjectParams } from '$utils/interfaces/project';
import { redirect, type Handle } from '@sveltejs/kit';
import JsonWebToken, { type JwtHeader, type SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export const publicRoutes = new Set([
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

const jClient = jwksClient({
	jwksUri: `${VITE_API_BASE_URL}/auth/jwt/jwks.json`
});

const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
	jClient.getSigningKey(header.kid, (err, key) => {
		const signingKey = key?.getPublicKey();
		callback(err, signingKey);
	});
};

export const handle = (async ({ event, resolve }) => {

  if (event.url.pathname !== '/projects/explore' && VERCEL_ENV === 'production') {
    throw redirect(301, '/projects/explore');
  }

	const jwt = event.cookies.get('sAccessToken');
	// If there's no jwt token at all, either the user signed out (or never logged in)
	// OR they've never been to the app in the first place.
	// Since the latter is far more likely right now, we just redirect them to signup rather than signin.
	// This avoids the infinite redirect issue in (https://supertokens.com/docs/thirdparty/common-customizations/sessions/ssr#why-do-we-trigger-the-refresh-session-flow-instead-of-redirecting-the-user-to-the-login-page-directly)
	// because we have separate handling for a present but expired/invalid jwt token below
	if (!jwt && !publicRoutes.has(event.url.pathname)) {
		throw redirect(302, '/signup');
	}

	let redirectTo = '';
	JsonWebToken.verify(jwt, getKey, {}, async (err: any, decoded: any) => {
		// Now if there was a session token, but it was expired or invalid
		// we try the refresh page
		if (err && !publicRoutes.has(event.url.pathname)) {
			const redirectBack =
			event.url.href.replace(event.url.origin, '') != '/'
			? `?redirectBack=${event.url.href.replace(event.url.origin, '')}`
			: '';
			redirectTo = `/refresh-session${redirectBack}`;
		}

		if (decoded !== undefined && typeof decoded !== 'string') {
			const isEmailVerified = (decoded as any)['st-ev'].v;
			if (!isEmailVerified) {
				redirectTo = '/email-confirmation';
			}
		}
	});
	// This has to be thrown outside the callback otherwise
	// it's unhandled in an async context and crashes.
	if (redirectTo) {
		throw redirect(302, redirectTo);
	}

	event.locals.client = new Client(VITE_API_BASE_URL as string, event.fetch);

	// Limit routes to auth, dashboard and /project only
	let project: Partial<ISubmitProjectParams> = {};
	try {
		project = await event.locals.client.hyperdrive.getOne();
	} catch (_) {
		project = {};
	};

	if (Object.keys(project).length === 0) {
		// If the user has no submitted project, they can only see
		// the project submission form and any public routes
		if (event.url.pathname !== '/projects' && !publicRoutes.has(event.url.pathname)) {
			throw redirect(301, '/projects');
		}
		// If we're able to fetch a project, then the
		// user is only allowed to edit it, not submit
		// another one
	} else if (!publicRoutes.has(event.url.pathname) &&
		event.url.pathname != '/' &&
		event.url.pathname != '/projects/success' &&
		!event.url.searchParams.has('edit')) {
			throw redirect(301, '/');
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
  if (request.url.startsWith(VITE_API_BASE_URL)) {
    const cookie = event.request.headers.get('cookie');
    if (cookie) {
      request.headers.set('cookie', cookie);
    }
  }

	return fetch(request);
}
