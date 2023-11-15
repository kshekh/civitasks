import { NextFunction, Request, Response } from 'express';
import { JSONSchemaType } from 'ajv';
import { db } from '@database/setup';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { SUBMITTED } from './submit-project-method';
import { propToObjKeyOrEmpty } from '@utils';
import { sql } from 'kysely';
import { ValidationError } from '@middlewares/error-handler';

export interface ListProjectsParams {
	track?: string;
	country?: string;
	nameQuery?: string;
	projectIds?: string[];
	randomize?: string;
	limit?: string;
}

export const listProjectsSchema: JSONSchemaType<ListProjectsParams> = {
	type: 'object',
	properties: {
		track: { type: 'string', nullable: true },
		country: { type: 'string', nullable: true },
		nameQuery: { type: 'string', nullable: true },
		projectIds: { type: 'array', items: { type: 'string' }, nullable: true },
		randomize: { type: 'string', nullable: true },
		limit: { type: 'string', nullable: true }
	},
	additionalProperties: false
};

export interface ListProjectsResponse {
	projectIds?: string[];
	pageData: {
		name: string;
		description: string;
		tracks: string[];
		repoLink: string;
		country: string;
		teamDetails: string;
		presentationLink: string;
		twitterHandle?: string;
		additionalInfo?: string;
		images: string[];
	}[];
}

const DEFAULT_PAGE_SIZE = 18;

export async function listProjects(
	req: Request<{}, {}, {}, ListProjectsParams>,
	res: Response<ListProjectsResponse>,
	next: NextFunction
) {
	try {
		let { track, country, nameQuery, projectIds, randomize, limit } =
			req.query as ListProjectsParams;

		const shouldRandomize = randomize?.toLowerCase() === 'true';

		if (projectIds && projectIds.length > 0 && (limit || shouldRandomize)) {
			throw new ValidationError('Cannot pass limit or randomize=true with a projectId list.');
		}

		if (projectIds && projectIds.length > 48) {
			throw new Error('The list of projectIds passed in is more than 48');
		}

		let projectIdsResult;
		let projectPage;

		// This is the first page load if there's no list of projectIds
		// meaning we should return a list of ids for the client to
		// page through on subsequent requests.
		if (!projectIds || projectIds.length === 0) {
			let projectsQuery = db
				.selectFrom('hyperdrive_projects')
				.where('is_junk', '=', false)
				.where('is_reviewed', '=', true)
				.select('id');

			if (nameQuery && nameQuery.length > 0) {
				if (nameQuery.endsWith('.')) {
					projectsQuery = projectsQuery.where('name', 'ilike', nameQuery.slice(0, -1));
				} else {
					projectsQuery = projectsQuery.where('name', 'ilike', `%${nameQuery}%`);
				}
			}
			if (track) {
				projectsQuery = projectsQuery.where('tracks', '@>', JSON.stringify([track]));
			}
			if (country) {
				projectsQuery = projectsQuery.where('country', '=', country);
			}

			// This is counterintuitive, but if we don't randomize
			// we return a stable, default ordering that's slightly
			// different from the true default ordering in that it
			// returns some more presentable projects up top.
			if (!shouldRandomize) {
				projectsQuery = projectsQuery.orderBy(sql`id % 7`).orderBy('id');
			}

			projectIdsResult = (await projectsQuery.execute()).map((project) => project.id);

			if (shouldRandomize) {
				// Fisher-Yates shuffle
				for (let i = projectIdsResult.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[projectIdsResult[i], projectIdsResult[j]] = [projectIdsResult[j], projectIdsResult[i]];
				}
			}

			// Here we're returning the first page of projects to save a network round-trip
			// Since know this is the first page load, and we have to render something
			projectPage = projectIdsResult.slice(0, limit ? Number(limit) : DEFAULT_PAGE_SIZE);
			// Cut those ids off the list, since we don't want the client to request them again.
			projectIdsResult = projectIdsResult.slice(limit ? Number(limit) : DEFAULT_PAGE_SIZE);
		} else {
			// If we have a list of projectIds, then this isn't the first load
			// of the page, so just load exactly the ids that were asked for.
			projectPage = projectIds.map(Number);
		}

		let pageData: any = [];

		if (projectPage.length > 0) {
			let pageDataQuery = db
				.selectFrom('hyperdrive_projects')
				.where('id', 'in', projectPage)
				.select([
					'name',
					'description',
					'tracks',
					'repo_link',
					'country',
					'team_details',
					'presentation_link',
					'twitter_handle',
					'additional_info'
				])
				.select((eb) => [
					jsonArrayFrom(
						eb
							.selectFrom('project_images')
							.select('url')
							.whereRef('project_images.project_id', '=', 'hyperdrive_projects.id')
							.where('project_images.state', '=', SUBMITTED)
					).as('images')
				])
			
			// Without this, search queries returning less than a full page of data
			// are never properly shuffled.
			if (shouldRandomize) pageDataQuery = pageDataQuery.orderBy(sql`RANDOM()`);
	
		 	pageData = await pageDataQuery.execute();
		}

		const response: ListProjectsResponse = {
			pageData: pageData.map((project) => {
				return {
					name: project.name,
					description: project.description,
					tracks: project.tracks as string[],
					repoLink: project.repo_link,
					country: project.country,
					teamDetails: project.team_details,
					presentationLink: project.presentation_link,
					...propToObjKeyOrEmpty(project.twitter_handle, 'twitterHandle'),
					...propToObjKeyOrEmpty(project.additional_info, 'additionalInfo'),
					images: project.images.map((image) => image.url)
				};
			})
		};

		// Again a bit counterintuitive, but if the client passed a list
		// of projectIds, we don't need to return them back again in the response.
		if (!projectIds) {
			response.projectIds = projectIdsResult.map(String);
		}

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
}
