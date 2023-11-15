import Session from 'supertokens-web-js/recipe/session';
import type { PageLoad } from './$types';
import { client } from '$lib/api/Client';
import { browser } from '$app/environment';
import type { ISubmitProjectParams } from '$utils/interfaces/project';

export const load = (async () => {
	let project: Partial<ISubmitProjectParams> = {};
	if (browser) {
		if (await Session.doesSessionExist()) {
			try {
				project = await client.hyperdrive.getOne();
				return { project };
			} catch (error) {
				return { error };
			}
		}
	}
}) satisfies PageLoad;
