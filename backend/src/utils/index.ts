import { nanoid } from "nanoid";
import slugify from "slugify";

export const propToObjKeyOrEmpty = (prop: any, keyName: string) => prop ? { [keyName]: prop } : {};

/**
 * This generates a unique URL slug for each profile from the first
 * and last name entered by the user.
 *
 * It also appends a 5 character random string to the end of the slug,
 * which gives a ~1% chance of collision after 4000 generations, which means
 * 4000 people would need to enter the same name.
 *
 * TODO - probably should handle this collision case eventually,
 * but it should be fine for now.
 *
 * @param firstName
 * @param lastName
 * @returns
 */
export function generateUrlSlug(firstName: string, lastName: string): string {
	const fullName = `${firstName} ${lastName}`;

	let slug = slugify(fullName, {
		replacement: '-',
		remove: undefined,
		lower: true,
		strict: true,
		locale: 'en',
		trim: true
	});

	if (slug.length > 40) {
		slug = slug.substring(0, 40);
	}

	return `${slug}-${nanoid(5)}`;
}