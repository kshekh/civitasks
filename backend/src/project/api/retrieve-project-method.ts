import { NextFunction, Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';
import { db } from '@database/setup';
import { APIError, AuthorizeError, NotFoundError } from '@middlewares/error-handler';
import { propToObjKeyOrEmpty } from '@utils';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { SUBMITTED } from './submit-project-method';

export interface RetrieveProjectResponse {
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
  images: {
    id: number;
    size: number;
    originalName: string;
  }[];
}

export async function retrieveProject(
	req: Request,
	res: Response<RetrieveProjectResponse>,
	next: NextFunction
) {
	try {
		const session = await Session.getSession(req, res);

		if (session === undefined) {
			console.error('No session found in retrieve project method!');
			throw new AuthorizeError('Session not found.');
		}

		const projectData = await db
			.selectFrom('hyperdrive_projects')
			.innerJoin('users', (join) =>
				join
					.onRef('hyperdrive_projects.user_id', '=', 'users.id')
					.on('users.auth_id', '=', session.getUserId())
			)
			.selectAll('hyperdrive_projects')
			.select((eb) => [
				jsonArrayFrom(
					eb
						.selectFrom('project_images')
						.select(['project_images.id', 'project_images.size', 'project_images.original_name'])
						.whereRef('project_images.project_id', '=', 'hyperdrive_projects.id')
						.where('project_images.state', '=', SUBMITTED)
				).as('images')
			])
			.execute();

		if (projectData.length > 1) {
			console.error('More than one project record found for user.');
			throw new APIError('More than one project record found for user.');
		}

		if (projectData.length === 0) {
			throw new NotFoundError('No project found for this user.');
		}

		const project = projectData[0];

    const response: RetrieveProjectResponse = {
      name: project.name,
      description: project.description,
      tracks: project.tracks as string[],
      repoLink: project.repo_link,
      country: project.country,
      teamDetails: project.team_details,
      presentationLink: project.presentation_link,
      lookingToRaise: project.looking_to_raise,
      solanaDeveloperExperience: Number(project.solana_developer_experience),
      howDidYouHear: project.how_did_you_hear as string[],
      ...propToObjKeyOrEmpty(project.twitter_handle, 'twitterHandle'),
      ...propToObjKeyOrEmpty(project.other_sources, 'otherSources'),
      attendedWorkshop: project.attended_workshop,
      ...propToObjKeyOrEmpty(project.additional_info, 'additionalInfo'),
      ...propToObjKeyOrEmpty(project.referral_code, 'referralCode'),
      images: project.images.map(image => ({
        id: image.id,
        size: image.size,
        originalName: image.original_name
      })),
    };

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
}
