import { JSONSchemaType } from "ajv";

/**
 * TS schemas, used for typing the request body in API handlers.
*/
export interface AboutYouParams {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  languages: string[];
  aboutYou: string;
  currentPosition: string;
  isUniversityStudent: boolean;
  githubHandle?: string;
  discordHandle?: string;
  twitterHandle?: string;
  telegramHandle?: string;
};

export interface InterestsAndSkillsParams {
  interestedTracks: { name: string }[];
  yourRoles?: { name: string }[];
  yourSkills?: { name: string }[];
  lookingToBuild: string;
  rolesLookingFor?: { name: string }[];
  hasTeam: boolean;
  lookingForCollab?: boolean;
};

export interface SourceAndReferralParams {
  primarySource: { name: string, other?: string };
  contributingSources?: { name: string }[];
  referralCode: string | undefined;
  agreedToTerms: boolean;
};

export interface RetrieveProfileParams {
	urlSlug?: string;
  userId?: string;
};

export interface RetrieveProfileResponse {
	userId: number;
  urlSlug: string;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	country: string | null;
	city: string | null;
	languages: string[] | null;
	aboutYou: string | null;
	currentPosition: string | null;
	isUniversityStudent: boolean | null;
	githubHandle?: string;
	discordHandle?: string;
	twitterHandle?: string;
	telegramHandle?: string;
	lookingForCollab: boolean;
	lookingToBuild: string | null;
	yourRoles: string[];
	yourSkills: string[];
	interestedTracks: string[];
	rolesLookingFor?: string[];
};

export interface EditProfileParams extends AboutYouParams {
  interestedTracks: { name: string }[];
  yourRoles?: { name: string }[];
  yourSkills?: { name: string }[];
  lookingToBuild: string;
  rolesLookingFor?: { name: string }[];
  lookingForCollab?: boolean;
};

/**
 * JSON Schemas, used for validating request params with Ajv.
 * The JSONSchemaType generic keeps these in sync with the TS schemas above.
*/
export const aboutYouFormSchema: JSONSchemaType<AboutYouParams> = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    country: { type: "string" },
    city: { type: "string" },
    languages: { type: "array", items: { type: "string" } },
    aboutYou: { type: "string" },
    currentPosition: { type: "string" },
    isUniversityStudent: { type: "boolean" },
    githubHandle: { type: "string", nullable: true },
    discordHandle: { type: "string", nullable: true },
    twitterHandle: { type: "string", nullable: true },
    telegramHandle: { type: "string", nullable: true },
  },
  required: ["firstName", "lastName", "country", "city", "languages", "aboutYou", "currentPosition", "isUniversityStudent"],
  additionalProperties: false,
};

export const interestsAndSkillsSchema: JSONSchemaType<InterestsAndSkillsParams> = {
  type: 'object',
  properties: {
    interestedTracks: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      } 
    },
    yourRoles: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      }, 
      nullable: true 
    },
    yourSkills: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      }, 
      nullable: true 
    },
    rolesLookingFor: { 
      type: 'array', 
      items: { 
        type: "object", 
        properties: { 
          name: { type: 'string' }
        },
        required: ['name'],
        additionalProperties: false,
      }, 
      nullable: true 
    },
    lookingToBuild: { type: 'string' },
    hasTeam: { type: 'boolean' },
    lookingForCollab: { type: 'boolean', nullable: true },
  },
  required: ['interestedTracks', 'lookingToBuild', 'hasTeam'],
  additionalProperties: false,
};

export const sourceAndReferralSchema: JSONSchemaType<SourceAndReferralParams> = {
  type: "object",
  properties: {
    primarySource: { 
      type: "object",
      properties: { 
        name: { type: "string" },
        other: { type: "string", nullable: true }
      },
      required: ["name"],
      additionalProperties: false,
    },
    contributingSources: { 
      type: "array", 
      items: { 
        type: "object", 
        properties: { 
          name: { type: "string" }
        },
        required: ["name"],
        additionalProperties: false
      },
      nullable: true 
    },
    referralCode: { type: "string", nullable: true },
    agreedToTerms: { type: "boolean" },
  },
  required: ["primarySource", "agreedToTerms"],
  additionalProperties: false,
};

export const retrieveProfileSchema: JSONSchemaType<RetrieveProfileParams> = {
  type: 'object',
  properties: {
    urlSlug: { type: 'string', nullable: true },
    userId: { type: 'string', nullable: true }
  }
};
