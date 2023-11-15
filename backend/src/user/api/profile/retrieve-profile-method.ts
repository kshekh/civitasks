import { db } from '@database/setup';
import { APIError } from '@middlewares/error-handler';
import { NextFunction, Request, Response } from 'express';
import { sql } from 'kysely';
import Session from 'supertokens-node/recipe/session';
import { RetrieveProfileParams, RetrieveProfileResponse } from '../user-api-schemas';
import { propToObjKeyOrEmpty } from '@utils';

export async function retrieveProfile(
	req: Request<{}, {}, {}, RetrieveProfileParams>,
	res: Response<RetrieveProfileResponse>,
	next: NextFunction
) {
	try {
		const { urlSlug, userId } = req.query;

		// Default to the current user's
		// profile if no urlSlug is provided
		let profileQuery = db.selectFrom('users');

		if (userId) {
			profileQuery = profileQuery.where('users.id', '=', Number(userId));
		} else if (urlSlug) {
			profileQuery = profileQuery.where('url_slug', '=', urlSlug);
		} else {
			profileQuery = profileQuery.where(
				'users.auth_id',
				'=',
				(await Session.getSession(req, res)).getUserId()
			);
		}

		const profileData = await profileQuery
			.leftJoin('users_roles as uro', 'users.id', 'uro.user_id')
			.leftJoin('users_skills as usk', 'users.id', 'usk.user_id')
			.leftJoin('users_interested_tracks as uit', 'users.id', 'uit.user_id')
			.leftJoin('users_looking_for_roles as ulfr', 'users.id', 'ulfr.user_id')
			.select([
				'users.id',
				'users.url_slug',
				'users.first_name',
				'users.last_name',
				'users.email',
				'users.country',
				'users.city',
				'users.languages',
				'users.about',
				'users.current_position',
				'users.is_university_student',
				'users.github_handle',
				'users.discord_handle',
				'users.twitter_handle',
				'users.telegram_handle',
				'users.looking_for_collab',
				'users.looking_to_build',
				sql`ARRAY_AGG(DISTINCT uro.role_name) AS roles` as any,
				sql`ARRAY_AGG(DISTINCT usk.skill_name) AS skills` as any,
				sql`ARRAY_AGG(DISTINCT uit.track_name) AS interested_tracks` as any,
				sql`ARRAY_AGG(DISTINCT ulfr.role_name) AS roles_looking_for` as any
			])
			.groupBy('users.id')
			.executeTakeFirst();

		if (!profileData) {
			throw new APIError('User data not found!');
		}

		const response: RetrieveProfileResponse = {
			userId: profileData.id,
			urlSlug: profileData.url_slug,
			firstName: profileData.first_name,
			lastName: profileData.last_name,
			email: profileData.email,
			country: profileData.country,
			city: profileData.city,
			languages: profileData.languages,
			aboutYou: profileData.about,
			currentPosition: profileData.current_position,
			isUniversityStudent: profileData.is_university_student,
			lookingForCollab: profileData.looking_for_collab,
			lookingToBuild: profileData.looking_to_build,
			yourRoles: profileData.roles as string[],
			yourSkills: profileData.skills as string[],
			interestedTracks: profileData.interested_tracks as string[],
			// the ARRAY_AGG from the sql query returns an array with a null element if no entries were found
			// let's strip that out here so we don't return a pointless array for rolesLookingFor
			...propToObjKeyOrEmpty(profileData.roles_looking_for.every(role => role === null) ? null : profileData.roles_looking_for, 'rolesLookingFor'),
			...propToObjKeyOrEmpty(profileData.github_handle, 'githubHandle'),
			...propToObjKeyOrEmpty(profileData.discord_handle, 'discordHandle'),
			...propToObjKeyOrEmpty(profileData.twitter_handle, 'twitterHandle'),
			...propToObjKeyOrEmpty(profileData.telegram_handle, 'telegramHandle')
		};

		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
}
