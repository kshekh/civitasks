import { BaseService } from '$lib/api/services/utils/BaseService';
import type {
	IProjectSearchParams,
	ISubmitProjectParams,
	IListProjectsResponse
} from '$utils/interfaces/project';

export class HyperdriveService extends BaseService {
	uploadProjectFile(data: FormData) {
		return this.client.send(`/api/projects/image`, {
			method: 'POST',
			body: data
		});
	}
	create(body: BodyInit) {
		return this.client.send('/api/projects/hyperdrive_project', {
			method: 'POST',
			body
		});
	}
	update(body: BodyInit) {
		return this.client.send('/api/projects/hyperdrive_project', {
			method: 'PUT',
			body
		});
	}
	getOne(): Promise<ISubmitProjectParams> {
		return this.client.send('/api/projects/hyperdrive_project', {
			method: 'GET'
		});
	}
	list(query?: Partial<IProjectSearchParams>): Promise<IListProjectsResponse> {
		return this.client.send('/api/projects/hyperdrive_projects', {
			method: 'GET',
			query
		});
	}
}
