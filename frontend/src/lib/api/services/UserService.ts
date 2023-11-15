import { BaseService } from '$lib/api/services/utils/BaseService';
import type { IOnboardingParams, IUser } from '$utils/interfaces/onboarding';
import type { ISearchParams } from '$utils/interfaces/search';

export class UserService extends BaseService {
	create(body: BodyInit): Promise<IOnboardingParams> {
		return this.client.send('/api/users/onboarding', {
			method: 'POST',
			body
		});
	}
	update(body: BodyInit) {
		return this.client.send('/api/users/profile', {
			method: 'PUT',
			body
		});
	}
	getOne(slug?: string): Promise<IUser> {
		return this.client.send(`/api/users/profile${slug ? `?urlSlug=${slug}` : ''}`, {
			method: 'GET'
		});
	}

	getAll(params: ISearchParams): Promise<IUser[]> {
		return this.client.send(`/api/users/search`, {
			method: 'GET',
			query: params
		});
	}
}
