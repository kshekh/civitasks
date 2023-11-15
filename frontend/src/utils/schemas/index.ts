import { z } from 'zod';

export const aboutYouSchema = z.object({
	firstName: z.string().trim().min(1, { message: 'First name is required' }),
	lastName: z.string().trim().min(1, { message: 'Last name is required' }),
	city: z.string().trim().min(1, { message: 'City is required' }),
	country: z.string().trim().min(1, { message: 'Country is required' }),
	languages: z.string().array().nonempty({ message: 'Select at least one language' }),
	aboutYou: z.string().trim().min(1, { message: 'About you is required' }),
	currentPosition: z.string().trim().min(1, { message: 'Current position is required' })
});
export const interestsAndSkillsSchema = z.object({
	interestedTracks: z
		.object({ name: z.string() })
		.array()
		.nonempty({ message: 'Please at least one track' }),
	yourRoles: z.object({ name: z.string() }).array().optional(),
	yourSkills: z.object({ name: z.string() }).array().optional(),
	lookingToBuild: z.string().trim().min(1, { message: 'This field is required' }),
	rolesLookingFor: z.object({ name: z.string() }).array().optional()
});
export const sourceAndReferralsSchema = z.object({
	primarySource: z.object({
		name: z.string().trim().min(1, { message: 'Please select one option.' })
	}),
	contributingSources: z.object({ name: z.string() }).array().optional(),
	referralCode: z.string().optional(),
	agreedToTerms: z.boolean()
});

export const validateData = async <T>(formData: T, schema: z.ZodObject<any>) => {
	try {
		const data = schema.parse(formData);
		return {
			data,
			errors: null
		};
	} catch (err: any) {
		const errors = err.flatten();
		return {
			data: formData,
			errors
		};
	}
};
