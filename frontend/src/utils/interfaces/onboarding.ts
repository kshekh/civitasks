export interface IOnboardingParams
	extends IAboutYou,
		IInterestsAndSkillsParams,
		ISourceAndReferralParams {}

export interface IUser extends IAboutYou, IUserInterestsAndSkillsParams {
	userId: string;
	urlSlug: string;
}
export interface IAboutYou {
	email: string;
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
}

export interface IUserInterestsAndSkillsParams {
	interestedTracks: string[];
	yourRoles: string[];
	yourSkills: string[];
	lookingToBuild: string;
	rolesLookingFor: string[];
	hasTeam: boolean;
	lookingForCollab?: boolean;
}
export interface IInterestsAndSkillsParams {
	interestedTracks: { name: string }[];
	yourRoles?: { name: string }[];
	yourSkills?: { name: string }[];
	lookingToBuild: string;
	rolesLookingFor?: { name: string }[];
	hasTeam: boolean;
	lookingForCollab?: boolean;
}
export interface ISourceAndReferralParams {
	// userId: number;
	// hackathonId: number;
	primarySource: { name?: string; other?: string };
	contributingSources?: { name: string }[];
	referralCode?: string;
	agreedToTerms: boolean;
}

export interface IAboutYouErrors {
	firstName: string[];
	lastName: string[];
	city: string[];
	country: string[];
	languages: string[];
	aboutYou: string[];
	currentPosition: string[];
	isUniversityStudent: string[];
	githubHandle: string[];
	discordHandle: string[];
	twitterHandle: string[];
	telegramHandle: string[];
}
export interface IInterestsAndSkillsParamsErrors {
	interestedTracks: string[];
	yourRoles: string[];
	yourSkills: string[];
	lookingToBuild: string[];
	rolesLookingFor: string[];
	hasTeam: string[];
	lookingForCollab: string[];
}

export interface ISourceAndReferralParamsErrors {
	primarySource: string[];
	contributingSources: string[];
	referralCode: string[];
	agreedToTerms: string[];
}
