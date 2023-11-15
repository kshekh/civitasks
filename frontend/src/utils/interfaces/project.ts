export interface ISubmitProjectParams {
	name: string;
	description: string;
	tracks: string[];
	country: string;
	repoLink: string;
	teamDetails: string;
	presentationLink: string;
	twitterHandle?: string;
	lookingToRaise: boolean;
	solanaDeveloperExperience: number;
	howDidYouHear: string[];
	otherSources: string[];
	attendedWorkshop: boolean;
	additionalInfo?: string;
	referralCode?: string;
	imageIds?: number[];
	images: {
		id: number;
		size: number;
		originalName: string;
	}[];
}
export interface ISubmitProjectParamsErrors {
	name?: string[];
	description?: string[];
	tracks?: string[];
	country?: string[];
	repoLink?: string[];
	teamDetails?: string[];
	presentationLink?: string[];
	twitterHandle?: string[];
	lookingToRaise?: string[];
	solanaDeveloperExperience?: string[];
	howDidYouHear?: string[];
	otherSources?: string[];
	attendedWorkshop?: string[];
	additionalInfo?: string[];
	referralCode?: string[];
	imageIds?: string[];
}

export interface ListedProject {
	name: string;
	description: string;
	tracks: string[];
	repoLink: string;
	country: string;
	teamDetails: string;
	presentationLink: string;
	twitterHandle?: string;
	additionalInfo?: string;
	images: string[];
}

export interface IListProjectsResponse {
	projectIds?: string[];
	pageData: {
		name: string;
		description: string;
		tracks: string[];
		repoLink: string;
		country: string;
		teamDetails: string;
		presentationLink: string;
		twitterHandle?: string;
		additionalInfo?: string;
		images: string[];
	}[];
}

export interface IProjectSearchParams {
	track?: string;
	country?: string;
	nameQuery?: string;
	projectIds?: string[];
	limit?: string;
	randomize?: string;
}
