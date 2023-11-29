import { persistLocalStorageForm } from '$utils';
import type { PageLoad } from './$types';
import type { ISubmitProjectParams, ISubmitProjectParamsErrors } from '$utils/interfaces/project';
import { projectFormLocalStorageKey } from '$utils/constants';
import { client } from '$lib/api/Client';
import { toastError } from '$utils/toasts';

export const load = (async ({ url }) => {
	try {
		let project: Partial<ISubmitProjectParams> = {};
		const errors: ISubmitProjectParamsErrors = {};
		// The main difference for the edit project form is that we pre-fill all the fields
		// based on existing project data from the database.
		if (url.searchParams.get('edit') == 'true') {
			project = await client.hyperdrive.getOne();
			project &&
				persistLocalStorageForm(projectFormLocalStorageKey, project as ISubmitProjectParams);
		}
		return { project, errors };
	} catch (error) {
		toastError(error);
	}
}) satisfies PageLoad;
