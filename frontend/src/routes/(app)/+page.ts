import { toastError } from '$utils/toasts';
import type { PageLoad } from './$types';
import type { ISearchParams } from '$utils/interfaces/search';
import { client } from '$lib/api/Client';
import type { IUser } from '$utils/interfaces/onboarding';

export const load = (async ({ url }) => {
	try {
		let searchParams: ISearchParams = { queryStart: Date.now().toString() };
		if (url.searchParams.has('nameQuery'))
			searchParams['nameQuery'] = url.searchParams.get('nameQuery')!;
		if (url.searchParams.has('role')) searchParams['role'] = url.searchParams.get('role')!;
		if (url.searchParams.has('skills'))
			searchParams['skills'] = url.searchParams.get('skills')?.split(',');
		if (url.searchParams.has('languages'))
			searchParams['languages'] = url.searchParams.get('languages')?.split(',');
		if (url.searchParams.has('country')) searchParams['country'] = url.searchParams.get('country')!;
		if (url.searchParams.has('city')) searchParams['city'] = url.searchParams.get('city')!;
		if (url.searchParams.has('lookingForCollab'))
			searchParams['lookingForCollab'] =
				url.searchParams.get('lookingForCollab') == 'true' ? true : false;
		if (url.searchParams.has('isUniversityStudent'))
			searchParams['isUniversityStudent'] =
				url.searchParams.get('isUniversityStudent') == 'true' ? true : false;
		let profiles: IUser[] = [];
		// const profiles = await client.users.getAll(searchParams);
		return {
			profiles
		};
	} catch (error) {
		toastError(error);
	}
}) satisfies PageLoad;
