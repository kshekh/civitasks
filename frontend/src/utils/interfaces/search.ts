export interface ISearchParams {
	// Unix timestamp in milliseconds
	// ex. 1694641390000
	queryStart: string;
	nameQuery?: string;
	role?: string;
	skills?: string[];
	tracks?: string[];
	languages?: string[];
	country?: string;
	city?: string;
	lookingForCollab?: boolean;
	isUniversityStudent?: boolean;
	limit?: string;
	offset?: string;
}
