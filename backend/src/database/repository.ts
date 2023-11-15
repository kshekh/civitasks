// import { Model, SortOrder } from 'mongoose';

class CivitasRepository {
// 	async create<T>(model: Model<any>, data: T) {
// 		return await model.create(data);
// 	}
// 	async readOne(model: Model<any>, id: string) {
// 		return await model.findById(id);
// 	}
// 	async read(
// 		model: Model<any>,
// 		page: number,
// 		perPage: number,
// 		sort?: { [key: string]: SortOrder },
// 		filter?: { [key: string]: string },
// 		fields?: { [key: string]: string }
// 	) {
// 		return await model
// 			.find(filter, fields)
// 			.sort(sort)
// 			.skip((page - 1) * perPage)
// 			.limit(perPage);
// 	}
// 	// TODO add update
// 	// TODO add delete
// 	async count(model: Model<any>, filter?: { [key: string]: string }) {
// 		return await model.count(filter);
// 	}
}

export const civitasRepository = new CivitasRepository();
