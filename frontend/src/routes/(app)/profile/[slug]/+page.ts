import { client } from '$lib/api/Client';
import type { IUser } from '$utils/interfaces/onboarding';
import type { PageLoad } from '../$types';

export const load = (async ({ params }) => {
	const { slug } = params;
	return { profile: await client.users.getOne(slug) };
}) satisfies PageLoad;
