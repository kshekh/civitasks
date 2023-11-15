import {
	AboutYouParams,
	aboutYouFormSchema,
	InterestsAndSkillsParams,
	interestsAndSkillsSchema,
	SourceAndReferralParams,
	sourceAndReferralSchema
} from '../user-api-schemas';
import { NextFunction, Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';
import { JSONSchemaType } from 'ajv';
import { db } from '@database/setup';
import { AuthorizeError, NotFoundError } from '@middlewares/error-handler';
import { CURRENT_HACKATHON } from 'app-config';
import { generateUrlSlug } from '@utils';

export interface OnboardingParams
	extends AboutYouParams,
		InterestsAndSkillsParams,
		SourceAndReferralParams {}

export const onboardingSchema: JSONSchemaType<OnboardingParams> = {
	type: 'object',
	properties: {
		...aboutYouFormSchema.properties,
		...interestsAndSkillsSchema.properties,
		...sourceAndReferralSchema.properties
	},
	required: [
		...aboutYouFormSchema.required,
		...interestsAndSkillsSchema.required,
		...sourceAndReferralSchema.required
	],
	additionalProperties: false
};

export async function onboarding(
	req: Request<{}, {}, OnboardingParams>,
	res: Response,
	next: NextFunction
) {
	try {
		let session = await Session.getSession(req, res);

		if (session === undefined) {
			// This should never happen because we're using the verifySession() middleware
			console.error('No session found in onboarding method!');
			throw new AuthorizeError('Session not found.');
		}

		const {
			firstName,
			lastName,
			country,
			city,
			languages,
			aboutYou,
			currentPosition,
			isUniversityStudent,
			githubHandle,
			discordHandle,
			twitterHandle,
			telegramHandle,
			interestedTracks,
			yourRoles,
			yourSkills,
			lookingToBuild,
			rolesLookingFor,
			hasTeam,
			lookingForCollab,
			primarySource,
			contributingSources,
			referralCode,
			agreedToTerms
		} = req.body;

		const userData = await db
			.selectFrom('users')
			.select(['id', 'email'])
			.where('auth_id', '=', session.getUserId())
			.executeTakeFirst();

		if (!userData) {
			throw new NotFoundError('User not found.');
		}

		// Tiny helper function to format data obj array data
		// for the Db inserts below
		const mapForDbInsertion = (data, key) =>
			data.map((item) => ({
				user_id: userData.id,
				[key]: item.name
			}));

		const urlSlug = generateUrlSlug(firstName, lastName);

		await db.transaction().execute(async (trx) => {
			await trx
				.updateTable('users')
				.set({
					first_name: firstName,
					last_name: lastName,
					url_slug: urlSlug,
					country: country,
					city: city,
					languages: JSON.stringify(languages),
					about: aboutYou,
					current_position: currentPosition,
					is_university_student: isUniversityStudent,
					github_handle: githubHandle,
					discord_handle: discordHandle,
					twitter_handle: twitterHandle,
					telegram_handle: telegramHandle,
					looking_to_build: lookingToBuild,
					looking_for_collab: lookingForCollab,
					onboarding_complete: true
				})
				.where('id', '=', userData.id)
				.execute();

			if (interestedTracks.length > 0) {
				// Preparing user's interested tracks for DB insertion
				const tracksData = mapForDbInsertion(interestedTracks, 'track_name');

				await trx
					.insertInto('users_interested_tracks')
					.values(({ selectFrom }) =>
						tracksData.map((trackEntry) => ({
							user_id: trackEntry.user_id,
							track_id: selectFrom('tracks')
								.select('tracks.id')
								.where('tracks.name', '=', trackEntry.track_name),
							track_name: trackEntry.track_name
						}))
					)
					.onConflict((oc) => oc.constraint('users_interested_tracks_uniq').doNothing())
					.onConflict((oc) => oc.constraint('users_interested_tracks_name_uniq').doNothing())
					.execute();
			}

			if (yourRoles && yourRoles?.length > 0) {
				// Preparing user's roles for DB insertion, if they exist
				const rolesData = mapForDbInsertion(yourRoles, 'role_name');

				await trx
					.insertInto('users_roles')
					.values(({ selectFrom }) =>
						rolesData.map((roleEntry) => ({
							user_id: roleEntry.user_id,
							role_name: roleEntry.role_name,
							role_id: selectFrom('roles')
								.select('roles.id')
								.where('roles.name', '=', roleEntry.role_name)
						}))
					)
					.onConflict((oc) => oc.constraint('users_roles_uniq').doNothing())
					.onConflict((oc) => oc.constraint('users_roles_name_uniq').doNothing())
					.execute();
			}

			if (yourSkills && yourSkills?.length > 0) {
				// Preparing user's skills for DB insertion, if they exist
				const skillsData = mapForDbInsertion(yourSkills, 'skill_name');

				await trx
					.insertInto('users_skills')
					.values(({ selectFrom }) =>
						skillsData.map((skillEntry) => ({
							user_id: skillEntry.user_id,
							skill_name: skillEntry.skill_name,
							skill_id: selectFrom('skills')
								.select('skills.id')
								.where('skills.name', '=', skillEntry.skill_name)
						}))
					)
					.onConflict((oc) => oc.constraint('users_skills_uniq').doNothing())
					.onConflict((oc) => oc.constraint('users_skills_name_uniq').doNothing())
					.execute();
			}

			if (rolesLookingFor && rolesLookingFor?.length > 0) {
				// Preparing the roles user is seeking for DB insertion, if they exist
				const lookingForRolesData = mapForDbInsertion(rolesLookingFor, 'role_name');

				await trx
					.insertInto('users_looking_for_roles')
					.values(({ selectFrom }) =>
						lookingForRolesData.map((lookingForRolesEntry) => ({
							user_id: lookingForRolesEntry.user_id,
							role_name: lookingForRolesEntry.role_name,
							role_id: selectFrom('roles')
								.select('roles.id')
								.where('roles.name', '=', lookingForRolesEntry.role_name)
						}))
					)
					.onConflict((oc) => oc.constraint('users_looking_for_roles_uniq').doNothing())
					.onConflict((oc) => oc.constraint('users_looking_for_roles_name_uniq').doNothing())
					.execute();
			}

			const registrationId = await trx
				.insertInto('hackathon_registrations')
				.values({
					hackathon_id: req.app.get(CURRENT_HACKATHON).id,
					user_id: userData.id,
					first_name: firstName,
					last_name: lastName,
					email: userData.email,
					country: country,
					city: city,
					languages: JSON.stringify(languages),
					about: aboutYou,
					current_position: currentPosition,
					github_handle: githubHandle,
					discord_handle: discordHandle,
					twitter_handle: twitterHandle,
					telegram_handle: telegramHandle,
					interested_tracks: JSON.stringify(interestedTracks),
					your_roles: JSON.stringify(yourRoles),
					your_skills: JSON.stringify(yourSkills),
					roles_looking_for: JSON.stringify(rolesLookingFor),
					looking_to_build: lookingToBuild,
					has_team: hasTeam,
					looking_for_collab: lookingForCollab,
					is_university_student: isUniversityStudent,
					agreed_to_terms: agreedToTerms,
					referral_code: referralCode
				})
				// No-op update here just to guarantee getting an id back
				.onConflict((oc) =>
					oc.constraint('users_hackathons_uniq').doUpdateSet({ user_id: userData.id })
				)
				.returning('id')
				.executeTakeFirstOrThrow();

			// Record sources
			const sourcesData = (contributingSources || []).map((source) => ({
				registration_id: registrationId.id,
				source_name: source.name
			}));

			// Mark primary source as primary, and ensure
			// record "other" if necessary
			const primarySourceData = {
				registration_id: registrationId.id,
				source_name: primarySource.name,
				is_initial_source: true,
				other: primarySource.name.toUpperCase() === 'OTHER' ? primarySource.other : undefined
			};

			sourcesData.push(primarySourceData);

			await trx
				.insertInto('registrations_sources')
				.values(({ selectFrom }) =>
					sourcesData.map((sourcesEntry) => ({
						registration_id: sourcesEntry.registration_id,
						source_id: selectFrom('sources')
							.select('sources.id')
							.where('sources.name', '=', sourcesEntry.source_name)
					}))
				)
				.onConflict((oc) => oc.constraint('registrations_sources_uniq').doNothing())
				.execute();
		});

		// We return urlSlug in the response anyway, but setting it here makes it
		// persistent in the session cookie, so we can pull it out in other contexts too.
		await session.mergeIntoAccessTokenPayload({
			_url_slug: urlSlug,
			_internal_user_id: userData.id
		});

		res.status(200).json({ urlSlug: urlSlug });
		return next();
	} catch (error) {
		next(error);
	}
}
