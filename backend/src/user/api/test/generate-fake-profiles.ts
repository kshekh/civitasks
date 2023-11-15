import { generateUrlSlug } from '@utils';
import { initKyselyConnection } from '../../../database/setup'
import { testData } from './test-data'

async function generateFakeProfiles() {
  const db = initKyselyConnection();
	let successes = 0;
	let errors = 0;

	for (const userData of testData) {
		const urlSlug = generateUrlSlug(userData.firstName, userData.lastName);
		
		try {
			const user = await db
				.insertInto('users')
				.values({
					email: userData.email,
					auth_id: Math.random().toString(36).substring(2, 12),
					first_name: userData.firstName,
					last_name: userData.lastName,
					url_slug: urlSlug,
					country: userData.country,
					city: userData.city,
					languages: JSON.stringify(userData.languages),
					about: userData.aboutYou,
					current_position: userData.currentPosition,
					is_university_student: userData.isUniversityStudent,
					github_handle: userData.githubHandle,
					discord_handle: userData.discordHandle,
					twitter_handle: userData.twitterHandle,
					telegram_handle: userData.telegramHandle,
					looking_to_build: userData.lookingToBuild,
					looking_for_collab: userData.lookingForCollab,
					onboarding_complete: true
				})
				.returning('id')
				.executeTakeFirstOrThrow();
				
			const mapForDbInsertion = (data, key) =>
				data.map((item) => ({
					user_id: user.id,
					[key]: item
				}));

			if (userData.interestedTracks.length > 0) {
				const tracksData = mapForDbInsertion(userData.interestedTracks, 'track_name');

				await db
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
					.execute();
			}

			if (userData.yourRoles && userData.yourRoles.length > 0) {
				const rolesData = mapForDbInsertion(userData.yourRoles, 'role_name');

				await db
					.insertInto('users_roles')
					.values(({ selectFrom }) =>
						rolesData.map((roleEntry) => ({
							user_id: roleEntry.user_id,
							role_id: selectFrom('roles')
								.select('roles.id')
								.where('roles.name', '=', roleEntry.role_name),
							role_name: roleEntry.role_name
						}))
					)
					.execute();
			}

			if (userData.yourSkills && userData.yourSkills.length > 0) {
				const skillsData = mapForDbInsertion(userData.yourSkills, 'skill_name');

				await db
					.insertInto('users_skills')
					.values(({ selectFrom }) =>
						skillsData.map((skillEntry) => ({
							user_id: skillEntry.user_id,
							skill_id: selectFrom('skills')
								.select('skills.id')
								.where('skills.name', '=', skillEntry.skill_name),
							skill_name: skillEntry.skill_name
						}))
					)
					.execute();
			}

			if (userData.rolesLookingFor && userData.rolesLookingFor.length > 0) {
				const rolesData = mapForDbInsertion(userData.rolesLookingFor, 'role_name');

				await db
					.insertInto('users_looking_for_roles')
					.values(({ selectFrom }) =>
						rolesData.map((roleEntry) => ({
							user_id: roleEntry.user_id,
							role_id: selectFrom('roles')
								.select('roles.id')
								.where('roles.name', '=', roleEntry.role_name),
							role_name: roleEntry.role_name
						}))
					)
					.execute();
			}

			successes++;
		} catch (e) {
			errors++;
			console.log(`Encountered error while inserting user data for ${userData.email}, ${userData.firstName}, ${userData.lastName}: `, e);
			console.log("Continuing...");
		}
	}
	console.log("Profile generation is complete.");
	console.log("Number of successful inserts:", successes);
	console.log("Number of errors:", errors);
}

generateFakeProfiles();