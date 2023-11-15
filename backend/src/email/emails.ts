import { mailClient } from './MailClient';
import { config } from '@config';
import { render } from '@react-email/render';
import EmailConfirmation from 'assets/react-email/EmailConfirmation';
import PasswordReset from 'assets/react-email/PasswordReset';
import ProjectSubmission from 'assets/react-email/ProjectSubmission';

/**
 * Email Verification
 */

export async function sendEmailVerificationEmail(email: string, verifyLink: string) {
  const html = render(EmailConfirmation({ verifyLink }));
  const msg = {
    to: email,
    from: config.TXN_EMAIL_FROM,
    subject: 'Please confirm your email address',
    text: `ACTIVATE YOUR ACCOUNT. Thank you for creating an account. In order to start using it, \
please activate it using the following link: ${verifyLink}`,
		html
	};

	await mailClient.sendEmail(msg);
}

/**
 * Password Reset
 */
export async function sendPasswordResetEmail(email: string, resetLink: string) {
	const html = render(PasswordReset({ email, resetLink }));
	const msg = {
		to: email,
		from: config.TXN_EMAIL_FROM,
		subject: 'Reset your password',
		text: `RESET YOUR PASSWORD. We received a request to reset the password for the \
account associated with ${email}. You can do so by following this link: ${resetLink}. If you did \
not request a password reset, please reach out to us by replying to this email.`,
		html
	};

	await mailClient.sendEmail(msg);
}

/**
 * Project Submission Confirmation
 */

export async function sendProjectSubmissionEmail(email: string) {
  const html = render(ProjectSubmission());
  const msg = {
    to: email,
    from: config.TXN_EMAIL_FROM,
    subject: 'Hackathon Project Received',
    text: "PROJECT SUBMITTED! Thanks for submitting your Hyperdrive Hackathon project! \
After all the submissions are collected, projects will be reviewed by the judges. \
Winners will be announced live at Breakpoint, and online during the week of October 30th. \
In case you need to make any updates, you'll be able to do so until the end of the submission period on October 15th, 2023.",
		html
	};

	await mailClient.sendEmail(msg);
}
