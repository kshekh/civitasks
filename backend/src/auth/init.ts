import { config } from '@config';
import Session from 'supertokens-node/recipe/session';
import EmailVerification from 'supertokens-node/recipe/emailverification';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import supertokens, { deleteUser } from 'supertokens-node';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { db } from '@database/setup';
import { APIError, AuthorizeError } from '@middlewares/error-handler';
import { sendPasswordResetEmail, sendEmailVerificationEmail } from 'email/emails';
import { ALLOWED_LATE_SUBMITS } from 'project/api/utils';

// Initialize and configure auth provider (SuperTokens)
export function initAuth() {
	// TODO remove dashboard recipe
	Dashboard.init(),
		supertokens.init({
			framework: 'express',
			supertokens: {
				connectionURI: config.SUPERTOKENS_CORE_URI
			},
			appInfo: {
				// learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
				appName: config.SUPERTOKENS_APP_NAME,
				apiDomain: config.SUPERTOKENS_API_DOMAIN,
				websiteDomain: config.SUPERTOKENS_FRONTEND_DOMAIN,
				apiBasePath: '/auth',
				websiteBasePath: '/auth'
			},
			recipeList: [
				EmailVerification.init({
					mode: 'REQUIRED',
					emailDelivery: {
						override: (originalImplementation) => {
							return {
								...originalImplementation,
								sendEmail(input) {
									let { emailVerifyLink, user } = input;
									emailVerifyLink = emailVerifyLink.replace(
										`${config.SUPERTOKENS_FRONTEND_DOMAIN}/auth/verify-email`,
										`${config.SUPERTOKENS_FRONTEND_DOMAIN}/email-confirmation`
									);
									return sendEmailVerificationEmail(user.email, emailVerifyLink);
								}
							};
						}
					}
				}),
				ThirdPartyEmailPassword.init({
					override: {
						functions: (originalImplementation) => {
							return {
								...originalImplementation,

								emailPasswordSignUp: async function (input) {
									if (!ALLOWED_LATE_SUBMITS.has(input.email)) {
										throw new AuthorizeError('Project submission has ended!');
									}

									// Attempt to sign-up through Supertokens first,
									// if this fails we return the auth error and don't
									// even attempt to create a core user model in the DB.
									const response = await originalImplementation.emailPasswordSignUp(input);

									if (response.status !== 'OK') {
										console.log(
											'Signup new user with Supertokens failed, for user:',
											input.email,
											', response status:',
											response.status
										);
									} else {
										// Try to create a user model, storing the Supertokens user id,
										// which will be the primary one stored in the auth session.
										try {
											await db
												.insertInto('users')
												.values({
													email: input.email,
													auth_id: response.user.id
												})
												.executeTakeFirstOrThrow();
										} catch (e) {
											console.error(
												'Failed to create user in database with email:',
												input.email,
												'error:',
												e
											);
											console.error('Attempting to rollback Supertokens user create');

											// If this fails we're in an awkward state where a user exists in Supertokens
											// but we don't have a real user model for them. They can try signing up
											// with a different email, otherwise will have to contact us for a manual fix.
											const deleteResponse = await deleteUser(response.user.id);
											if (deleteResponse.status !== 'OK') {
												console.error(
													'Failed to rollback Supertokens user create for user:',
													input.email
												);
											}

											throw new APIError('Failed to create user during sign-up, please try again.');
										}
									}

									return response;
								},

								emailPasswordSignIn: async function (input) {
									if (!ALLOWED_LATE_SUBMITS.has(input.email)) {
										throw new AuthorizeError('Project submission has ended!');
									}
									return originalImplementation.emailPasswordSignIn(input);
								},

								thirdPartySignInAndUp: async function (input) {
									let response = await originalImplementation.thirdPartySignInUp(input);

									const email = input.rawUserInfoFromProvider.fromUserInfoAPI!.email;

									if (response.status !== 'OK') {
										console.log(
											'Third party signup/sign-in new user with Supertokens failed, for user:',
											email,
											', response status:',
											response.status
										);
									}

									if (!response.createdNewUser) {
										return response;
									} else {
										// Try to create a user model, storing the Supertokens user id,
										// which will be the primary one stored in the auth session.
										try {
											await db
												.insertInto('users')
												.values({
													email: email,
													auth_id: response.user.id
												})
												.executeTakeFirstOrThrow();
										} catch (e) {
											console.error(
												'Failed to create user in database with email:',
												email,
												'error:',
												e
											);
											console.error('Attempting to rollback Supertokens user create');

											// If this fails we're in an awkward state where a user exists in Supertokens
											// but we don't have a real user model for them. They can try signing up
											// with a different email, otherwise will have to contact us for a manual fix.
											const deleteResponse = await deleteUser(response.user.id);
											if (deleteResponse.status !== 'OK') {
												console.error(
													'Failed to rollback Supertokens user create for user:',
													input.email
												);
											}

											throw new APIError('Failed to create user during sign-up, please try again.');
										}
									}

									return response;
								}
							};
						}
					},
					// We have provided you with development keys which you can use for testing.
					// TODO IMPORTANT: Please replace them with your own OAuth keys for production use.
					providers: [
						{
							config: {
								thirdPartyId: 'google',
								clients: [
									{
										clientId:
											'1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
										clientSecret: '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'
									}
								]
							}
						},
						{
							config: {
								thirdPartyId: 'github',
								clients: [
									{
										clientId: '467101b197249757c71f',
										clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd'
									}
								]
							}
						}
					],
					emailDelivery: {
						override: (originalImplementation) => {
							return {
								...originalImplementation,
								sendEmail: async (input) => {
									if (input.type === 'PASSWORD_RESET') {
										let { passwordResetLink, user } = input;
										passwordResetLink = passwordResetLink.replace(
											`${config.SUPERTOKENS_FRONTEND_DOMAIN}/auth/reset-password`,
											`${config.SUPERTOKENS_FRONTEND_DOMAIN}/reset-password/new`
										);
										return sendPasswordResetEmail(user.email, passwordResetLink);
									}
									return originalImplementation.sendEmail(input);
								}
							};
						}
					}
				}),
				Session.init({
					override: {
						functions: (originalImplementation) => {
							return {
								...originalImplementation,
								createNewSession: async function (input) {

									try {
										const internalUser = await db
											.selectFrom('users')
											.select('email')
											.where('auth_id', '=', input.userId)
											.executeTakeFirst();

											// This goes in the access token, and is available to read on the frontend.
											input.accessTokenPayload = {
													...input.accessTokenPayload,
													_email: internalUser?.email,
											};
										return originalImplementation.createNewSession(input);
									} catch (err) {
										console.error("Failed to create new session for user:", input.userId, "error:", err);
										throw err;
									}
								}
							}
						}
					},
					cookieSameSite: 'lax',
					cookieSecure: true,
					cookieDomain: config.SUPERTOKENS_COOKIE_DOMAIN ?? undefined,
				})
			]
		});
}
