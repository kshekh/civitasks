import { NextFunction, Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';
import { JSONSchemaType } from 'ajv';
import { db } from '@database/setup';
import { AuthorizeError, ValidationError } from '@middlewares/error-handler';
import { CURRENT_HACKATHON } from 'app-config';
import { propToObjKeyOrEmpty } from '@utils';
import { DatabaseError } from 'pg';
import { sendProjectSubmissionEmail } from 'email/emails';

export const SUBMITTED = 'SUBMITTED';

export interface SubmitProjectParams {
	name: string;
	description: string;
	tracks: string[];
	repoLink: string;
	country: string;
	teamDetails: string;
	presentationLink: string;
	twitterHandle?: string;
	lookingToRaise: boolean;
	solanaDeveloperExperience: number;
	howDidYouHear: string[];
	otherSources?: string[];
	attendedWorkshop: boolean;
	additionalInfo?: string;
	referralCode?: string;
	imageIds?: number[];
}

export const submitProjectSchema: JSONSchemaType<SubmitProjectParams> = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		description: { type: 'string' },
		tracks: { type: 'array', items: { type: 'string' } },
		repoLink: { type: 'string' },
		country: { type: 'string' },
		teamDetails: { type: 'string' },
		presentationLink: { type: 'string' },
		twitterHandle: { type: 'string', nullable: true },
		lookingToRaise: { type: 'boolean' },
		solanaDeveloperExperience: { type: 'number' },
		howDidYouHear: { type: 'array', items: { type: 'string' } },
		otherSources: { type: 'array', items: { type: 'string' }, nullable: true },
		attendedWorkshop: { type: 'boolean' },
		additionalInfo: { type: 'string', nullable: true },
		referralCode: { type: 'string', nullable: true },
		imageIds: { type: 'array', items: { type: 'number' }, nullable: true }
	},
	required: [
		'name',
		'description',
		'tracks',
		'repoLink',
		'country',
		'teamDetails',
		'presentationLink',
		'lookingToRaise',
		'solanaDeveloperExperience',
		'howDidYouHear',
		'attendedWorkshop'
	],
	additionalProperties: false
};

export async function submitProject(
	req: Request<{}, {}, SubmitProjectParams>,
	res: Response,
	next: NextFunction
) {
	try {
		let session = await Session.getSession(req, res);

		if (session === undefined) {
			console.error('No session found in project submission method!');
			throw new AuthorizeError('Session not found.');
		}

		const {
			name,
			description,
			tracks,
			repoLink,
			country,
			teamDetails,
			presentationLink,
			twitterHandle,
			lookingToRaise,
			solanaDeveloperExperience,
			howDidYouHear,
			otherSources,
			attendedWorkshop,
			additionalInfo,
			referralCode,
			imageIds
		} = req.body;

		const userData = await db
			.selectFrom('users')
			.select(['id', 'email'])
			.where('auth_id', '=', session.getUserId())
			.executeTakeFirst();

		if (!userData || !userData.email) {
			throw new AuthorizeError('User not found.');
		}

		try {
			await db.transaction().execute(async (trx) => {
				const proj = await trx
					.insertInto('hyperdrive_projects')
					.values({
						hackathon_id: req.app.get(CURRENT_HACKATHON).id,
						user_id: userData.id,
						name: name,
						description: description,
						// TODO - validate against hackathon tracks...
						tracks: JSON.stringify(tracks),
						repo_link: repoLink,
						country: country,
						team_details: teamDetails,
						presentation_link: presentationLink,
						...propToObjKeyOrEmpty(twitterHandle, 'twitter_handle'),
						looking_to_raise: lookingToRaise,
						solana_developer_experience: solanaDeveloperExperience,
						how_did_you_hear: JSON.stringify(howDidYouHear),
						other_sources: otherSources ? JSON.stringify(otherSources) : null,
						attended_workshop: attendedWorkshop,
						...propToObjKeyOrEmpty(additionalInfo, 'additional_info'),
						...propToObjKeyOrEmpty(referralCode, 'referral_code'),
					})
					.returning('id')
					.executeTakeFirstOrThrow();

				if (imageIds && imageIds.length > 0) {
					const images = await trx
						.selectFrom('project_images')
						.select(['id', 'project_id'])
						.where('id', 'in', imageIds)
						.execute();

					// Check if we're missing records for any of the submitted image ids
					const existingImageIds = images.map((image) => image.id);
					const missingImageIds = imageIds.filter((id) => !existingImageIds.includes(id));
					if (missingImageIds.length > 0) {
						console.error(
							`Submitted image ids: ${missingImageIds.join(', ')} do not exist in the db!`
						);
						throw new ValidationError(
							`Images with ids: ${missingImageIds.join(', ')} do not exist.`
						);
					}

					// Check if any submitted images are already associated with a different project
					// This shouldn't be possible the way submission is currently set up.. but no harm in checking.
					const wrongProjectImageIds = images
						.filter((image) => image.project_id && image.project_id !== proj.id)
						.map((image) => image.id);
					if (wrongProjectImageIds.length > 0) {
						console.error(
							`Images with ids: ${wrongProjectImageIds.join(
								', '
							)} are already linked to another project in the db!`
						);
						throw new ValidationError(
							`Images with ids: ${wrongProjectImageIds.join(
								', '
							)} are already linked to another project.`
						);
					}

					// Images have all been determined valid, so now we link them to
					// the new project submission, and make sure to mark them as SUBMITTED
					// so they won't be cleaned up as dangling records later on.
					await trx
						.updateTable('project_images')
						.set({
							state: SUBMITTED,
							project_id: proj.id,
							updated_at: new Date().toISOString()
						})
						.where('id', 'in', imageIds)
						.execute();
				}
			});
			// This specifically handles the case where a user has already submitted a project
			// which is caught by our unique constraint on user_id.
		} catch (error) {
			if (
				error instanceof DatabaseError &&
				error.constraint === 'hyperdrive_projects_user_id_key'
			) {
				console.error('We already have a project submission record for this user.');
				throw new ValidationError('Only one project submission is allowed per user.');
			} else {
				throw error;
			}
		}

		sendProjectSubmissionEmail(userData.email);

		res.status(200).json({ message: 'Project submitted successfully.' });
		return next();
	} catch (error) {
		next(error);
	}
}
