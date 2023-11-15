import { Router } from 'express';
import { onboarding, onboardingSchema } from 'user/api/onboarding/onboarding-method';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { search, searchSchema } from 'user/api/search/search-method';
import { retrieveProfileSchema } from 'user/api/user-api-schemas';
import { editProfile, editProfileSchema } from 'user/api/profile/edit-profile-method';
import { retrieveProfile } from 'user/api/profile/retrieve-profile-method';
import { validateBody, validateQuery } from '@middlewares/request-validators';
import { uploadProjectImage, uploadProjectImageSchema } from 'project/api/upload-project-image-method';
import { projectImageHandler } from '@middlewares/multipart';
import { submitProject, submitProjectSchema } from 'project/api/submit-project-method';
import { retrieveProject } from 'project/api/retrieve-project-method';
import { editProject, editProjectSchema } from 'project/api/edit-project-method';
import { projectSubmissionLockout } from 'project/api/utils';
import { listProjects, listProjectsSchema } from 'project/api/list-projects-method';

export const router = Router();

// User onboarding / profile API routes
router
	.route('/api/users/onboarding')
	.post(verifySession(), validateBody(onboardingSchema), onboarding);

router
	.route('/api/users/profile')
	.get(verifySession(), validateQuery(retrieveProfileSchema), retrieveProfile);

router
	.route('/api/users/profile')
	.put(verifySession(), validateBody(editProfileSchema), editProfile);

router
	.route('/api/users/search')
	.get(verifySession(), validateQuery(searchSchema), search);

// Project submission API routes
router
	.route('/api/projects/hyperdrive_project')
	.post(verifySession(), projectSubmissionLockout, validateBody(submitProjectSchema), submitProject);

router
	.route('/api/projects/hyperdrive_project')
	.get(verifySession(), retrieveProject);

router
	.route('/api/projects/hyperdrive_projects')
	.get(validateQuery(listProjectsSchema), listProjects)

router
	.route('/api/projects/hyperdrive_project')
	.put(verifySession(), projectSubmissionLockout, validateBody(editProjectSchema), editProject);

router
	.route('/api/projects/image')
	.post(verifySession(), projectSubmissionLockout, validateBody(uploadProjectImageSchema), projectImageHandler.single('image'), uploadProjectImage);
