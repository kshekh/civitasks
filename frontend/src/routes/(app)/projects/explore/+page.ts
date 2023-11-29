import { browser } from '$app/environment';
import { client } from '$lib/api/Client';
import type { IProjectSearchParams, IListProjectsResponse } from '$utils/interfaces/project';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	let projects: IListProjectsResponse = { pageData: [], projectIds: [] };
	const projectSearchParams: IProjectSearchParams = {};

	let projectsLoading = true;
	if (browser) {
		try {
			for (const [key, value] of url.searchParams.entries()) {
				// projectIds is the only non-string search param (it's an array).
				// It should never show up in the query string in normal
				// usage, but just in case, we don't want it added
				// to projectSearchParams here.
				if (key !== 'projectIds') {
					projectSearchParams[key as keyof IProjectSearchParams] = value;
				}
			}
			projects = await client.hyperdrive.list(projectSearchParams);
			projectsLoading = false;

			// These are just used for the first page load
			// and we don't want them showing up in the url bar
			delete projectSearchParams['randomize'];
			delete projectSearchParams['limit'];
			url.searchParams.delete('randomize');
			url.searchParams.delete('limit');


			return { projects, projectsLoading, projectSearchParams };
		} catch (error) {
			projectsLoading = false;
			return { error, projectsLoading, projectSearchParams };
		}
	}
}) satisfies PageLoad;
