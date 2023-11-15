import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import ThirdPartyEmailPassword, {
	emailPasswordSignIn,
	sendPasswordResetEmail,
	submitNewPassword
} from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import {
	thirdPartySignInAndUp,
	emailPasswordSignUp
} from 'supertokens-web-js/recipe/thirdpartyemailpassword';
import { goto, invalidateAll } from '$app/navigation';
import EmailVerification, {
	sendVerificationEmail,
	verifyEmail
} from 'supertokens-web-js/recipe/emailverification';
import { toastError } from '$utils/toasts';
import { emailAddress } from '$stores';
import {
	SUPERTOKENS_COOKIE_DOMAIN,
	VITE_API_BASE_URL,
	VITE_APP_BASE_URL,
	VITE_SUPERTOKENS_APP_NAME
} from '$lib/env';
export const supertokensInit = () => {
	SuperTokens.init({
		appInfo: {
			apiDomain: VITE_API_BASE_URL as string,
			apiBasePath: '/auth',
			appName: VITE_SUPERTOKENS_APP_NAME as string
		},
		recipeList: [
			EmailVerification.init(),
			Session.init({
				autoAddCredentials: true,
				sessionTokenBackendDomain: SUPERTOKENS_COOKIE_DOMAIN as string ?? undefined,
			}),
			ThirdPartyEmailPassword.init()
		]
	});
};

export const signupWithEmailAndPassword = async (email: string, password: string) => {
	let emailErrors: string[] = [];
	let passwordErrors: string[] = [];

	try {
		const response = await emailPasswordSignUp({
			formFields: [
				{
					id: 'email',
					value: email
				},
				{
					id: 'password',
					value: password
				}
			]
		});

		if (response.status === 'FIELD_ERROR') {
			response.formFields?.forEach((field) => {
				if (field.id == 'email') {
					emailErrors = emailErrors.concat(field.error);
				}
				if (field.id == 'password') {
					passwordErrors = passwordErrors.concat(field.error);
				}
			});
			return { emailErrors, passwordErrors };
		} else {
			await invalidateAll();
			emailAddress.set(email);
			await sendEmailVerificationLink();
		}
	} catch (err: any) {
		toastError(err);
	}

	return { emailErrors, passwordErrors };
};

export const signinWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const response = await emailPasswordSignIn({
			formFields: [
				{
					id: 'email',
					value: email
				},
				{
					id: 'password',
					value: password
				}
			]
		});

		let emailErrors: string[] = [];
		let passwordErrors: string[] = [];
		if (response.status === 'FIELD_ERROR') {
			response.formFields?.forEach((field) => {
				if (field.id == 'email') {
					emailErrors = emailErrors.concat(field.error);
				}
				if (field.id == 'password') {
					passwordErrors = passwordErrors.concat(field.error);
				}
			});
		} else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
			// TODO display error
			passwordErrors = passwordErrors.concat('Email password combination is incorrect.');
		} else {
			goto('/');
		}
		return { emailErrors, passwordErrors };
	} catch (err: any) {
		toastError(err);
	}
};

export const googleLogin = async () => {
	try {
		const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
			thirdPartyId: 'google',
			frontendRedirectURI: `${VITE_APP_BASE_URL}/oauth-callback/google`
		});
		goto(authUrl);
	} catch (err: any) {
		toastError(err);
	}
};

export const handleGoogleCallback = async () => {
	try {
		const response = await thirdPartySignInAndUp();

		if (response.status === 'OK') {
			if (response.createdNewUser) {
				// Add user to DB
				goto('/email-confirmed');
			} else {
				// Go to onboarding if not onboarded, otherwise go to home page
				// goto('onboarding');
				goto('/');
			}
		} else {
			// SuperTokens requires that the third party provider
			// gives an email for the user. If that's not the case, sign up / in
			// will fail.

			// As a hack to solve this, you can override the backend functions to create a fake email for the user.
			console.log('No email provided by social login. Please use another form of login');
			goto('/signin');
		}
	} catch (err: any) {
		toastError(err);
	}
};

export const logout = async () => {
	await Session.signOut();
	goto('/signin');
};
export const sendEmailVerificationLink = async () => {
	try {
		let response = await sendVerificationEmail();
		if (response.status === 'EMAIL_ALREADY_VERIFIED_ERROR') {
			goto('/');
		} else {
			goto('/email-confirmation');
		}
	} catch (err: any) {
		toastError(err);
	}
};

export const consumeVerificationCode = async () => {
	try {
		let response = await verifyEmail();
		if (response.status === 'EMAIL_VERIFICATION_INVALID_TOKEN_ERROR') {
			toastError('The verification link is expired or invalid. Please try again.');
			goto('/email-confirmation/failed');
		} else {
			goto('/email-confirmed');
		}
	} catch (err: any) {
		toastError(err);
	}
};

export const sendResetPasswordLink = async (email: string) => {
	try {
		const response = await sendPasswordResetEmail({
			formFields: [
				{
					id: 'email',
					value: email
				}
			]
		});
		let emailErrors: string[] = [];
		if (response.status === 'FIELD_ERROR') {
			response.formFields?.forEach((field) => {
				if (field.id == 'email') {
					emailErrors = emailErrors.concat(field.error);
				}
			});
			return emailErrors;
		} else {
			goto('/reset-password/link-sent');
		}
	} catch (err: any) {
		toastError(err);
	}
};

export const newPasswordEntered = async (newPassword: string) => {
	try {
		const response = await submitNewPassword({
			formFields: [
				{
					id: 'password',
					value: newPassword
				}
			]
		});

		let passwordErrors: string[] = [];
		if (response.status === 'FIELD_ERROR') {
			response.formFields?.forEach((field) => {
				if (field.id == 'password') {
					passwordErrors = passwordErrors.concat(field.error);
				}
			});
			return passwordErrors;
		} else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
			// TODO display invalid token error
			console.log('Invalid token');
			goto('/signin');
		} else {
			goto('/reset-password/success');
		}
	} catch (err: any) {
		toastError(err);
	}
};
