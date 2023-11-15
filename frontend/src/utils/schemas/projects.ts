import { z } from 'zod';
const urlRegex = new RegExp(
	/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{1,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{1,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{1,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
);
export const projectSchema = z.object({
	name: z.string().trim().min(1, 'Required'),
	description: z.string().trim().min(1, 'Required'),
	tracks: z
		.string()
		.array()
		.nonempty({ message: 'Please select at least one track.' })
		.max(2, 'You can choose up to two tracks.'),
	repoLink: z.string().regex(urlRegex, 'Please enter a valid repository link.').trim(),
	teamDetails: z.string().trim().min(1, 'Required'),
	imageIds: z.number().array().nonempty({ message: 'Please select at least one image.' }),
	presentationLink: z
		.string({ required_error: 'Required.' })
		.regex(urlRegex, 'Please enter a valid URL.')
		.trim(),
	twitterHandle: z
		.string()
		.regex(urlRegex, 'Please enter a valid URL.')
		.trim()
		.optional()
		.or(z.literal('')),
	lookingToRaise: z.boolean({ required_error: 'Response required.' }),
	solanaDeveloperExperience: z.number(),
	howDidYouHear: z.string().array().nonempty({ message: 'Please select at least one source.' }),
	otherSources: z.string().array().optional(),
	attendedWorkshop: z.boolean({ required_error: 'Response required.' }),
	additionalInfo: z.string().trim().optional(),
	referralCode: z.string().trim().optional()
});
