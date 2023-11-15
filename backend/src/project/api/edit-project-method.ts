import { NextFunction, Request, Response } from 'express';
import Session from 'supertokens-node/recipe/session';
import { JSONSchemaType } from 'ajv';
import { db } from '@database/setup';
import { AuthorizeError, ValidationError } from '@middlewares/error-handler';
import { SUBMITTED, SubmitProjectParams, submitProjectSchema } from './submit-project-method';
import { PENDING } from './upload-project-image-method';

interface EditProjectParams extends SubmitProjectParams {}

export const editProjectSchema: JSONSchemaType<EditProjectParams> = {
  type: 'object',
  properties: {
    ...submitProjectSchema.properties,
  },
  required: [
    ...submitProjectSchema.required,
  ],
  additionalProperties: false
};

export async function editProject(
  req: Request<{}, {}, EditProjectParams>,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await Session.getSession(req, res);

		const userData = await db
			.selectFrom('users')
			.select('id')
			.where('auth_id', '=', session.getUserId())
			.executeTakeFirst();

		if (!userData) {
			throw new AuthorizeError('User not found.');
		}

    const {
      name,
      description,
      tracks,
      repoLink,
      country,
      teamDetails,
      presentationLink,
      twitterHandle,
      lookingToRaise,
      solanaDeveloperExperience,
      howDidYouHear,
      otherSources,
      attendedWorkshop,
      referralCode,
      additionalInfo,
      imageIds
    } = req.body;

    const projectData = await db
      .selectFrom('hyperdrive_projects')
      .select('id')
      .where('user_id', '=', userData.id)
      .executeTakeFirst();

    if (!projectData) {
      console.error(`Hyperdrive project for user: ${userData.id} not found!`);
      throw new ValidationError('No existing project was found for this user.');
    }

    await db.transaction().execute(async (trx) => {
      await trx
        .updateTable('hyperdrive_projects')
        .set({
          name: name,
          description: description,
          tracks: JSON.stringify(tracks),
          repo_link: repoLink,
          country: country,
          team_details: teamDetails,
          presentation_link: presentationLink,
          twitter_handle: twitterHandle || null,
          looking_to_raise: lookingToRaise,
          solana_developer_experience: solanaDeveloperExperience,
          how_did_you_hear: JSON.stringify(howDidYouHear),
          other_sources: otherSources ? JSON.stringify(otherSources) : null,
          attended_workshop: attendedWorkshop,
          additional_info: additionalInfo || null,
          referral_code: referralCode || null,
        })
        .where('id', '=', projectData.id)
        .execute();

      if (imageIds) {
        if (imageIds.length > 0) {
          const images = await trx
            .selectFrom('project_images')
            .select(['id', 'project_id'])
            .where('id', 'in', imageIds)
            .execute();

          // If this fails, then user / browser passed in some garbage,
          // or our upload image endpoint barfed. The latter case is bad,
          // but we can't do anything at this point, so just reject the request
          const existingImageIds = images.map(image => image.id);
          const missingImageIds = imageIds.filter(id => !existingImageIds.includes(id));
          if (missingImageIds.length > 0) {
            console.error(`Submitted image ids: ${missingImageIds.join(', ')} do not exist in the db!`);
            throw new ValidationError(`Images with ids: ${missingImageIds.join(', ')} do not exist.`);
          }

          // Just a sanity check, same as in the project submission endpoint
          const wrongProjectImageIds = images.filter(image => image.project_id && image.project_id !== projectData.id).map(image => image.id);
          if (wrongProjectImageIds.length > 0) {
            console.error(`Images with ids: ${wrongProjectImageIds.join(', ')} are already linked to another project in the db!`);
            throw new ValidationError(`Images with ids: ${wrongProjectImageIds.join(', ')} are already linked to another project.`);
          }

          // This may "update" some images that are already
          // linked and marked SUBMITTED, since we don't distinguish
          // here between newly uploaded and previously uploaded images.
          // This should be fine, and there's no real downside though it does
          // refresh the updated_at column
          await trx
            .updateTable('project_images')
            .set({
              state: SUBMITTED,
              project_id: projectData.id,
              updated_at: new Date().toISOString()
            })
            .where('id', 'in', imageIds)
            .execute();
        }
        // Unlink images that have been "deleted" as part
        // of the update on the front-end. The assumption
        // is that we'll come and clean them up async eventually.
        // But more importantly they won't show up as linked to this project.
        let unlinkQuery = trx
          .updateTable('project_images')
          .set({
            state: PENDING,
            project_id: null,
            updated_at: new Date().toISOString()
          })
          .where('project_id', '=', projectData.id)
        
        // This is awkward, but for some reason Kysely
        // barfs if you pass in an empty array to a where clause
        if (imageIds.length > 0) {
          unlinkQuery = unlinkQuery.where('id', 'not in', imageIds);
        }
        await unlinkQuery.execute();
      }
    });

    res.status(200).json({ message: 'Project edited successfully.' });
    return next();
  } catch (error) {
    next(error);
  }
}
