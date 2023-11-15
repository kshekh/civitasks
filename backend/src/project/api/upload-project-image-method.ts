import { Request, Response, NextFunction } from 'express';
import { db } from '@database/setup';
import { ValidationError } from '@middlewares/error-handler';
import { nanoid } from 'nanoid';
import { deleteStaticFromS3, uploadStaticToS3 } from '@utils/s3_client';
import { config } from '@config';
import { createHash } from 'crypto';
import { JSONSchemaType } from 'ajv';

export const PENDING = 'PENDING';

export interface UploadProjectImageParams {
	projectId?: number;
}

export const uploadProjectImageSchema: JSONSchemaType<UploadProjectImageParams> = {
	type: 'object',
	properties: {
		projectId: { type: 'number', nullable: true }
	},
	required: [],
	additionalProperties: false
};

export async function uploadProjectImage(
	req: Request<{}, {}, UploadProjectImageParams>,
	res: Response,
	next: NextFunction
) {
	const file = req.file;
	if (!file) return next(new ValidationError('Request must contain an image file.'));
	const uid = nanoid();
	const hash = createHash('sha256').update(file.buffer).digest('hex');

	try {
		if (req.body.projectId) {
			const existingImage = await db
				.selectFrom('project_images')
				.select('id')
				.where('hash', '=', hash)
				.where('project_id', '=', req.body.projectId)
				.executeTakeFirst();

			if (existingImage) {
				await db
					.updateTable('project_images')
					.set({
						original_name: file.originalname,
						updated_at: new Date().toISOString()
					})
					.where('id', '=', existingImage.id)
					.execute();

				res.status(200).json({ id: existingImage.id });
				return;
			}
		}

		await uploadStaticToS3(uid, file.buffer, file.mimetype);

		try {
			const imageRecord = await db
				.insertInto('project_images')
				.values({
					url: `https://${config.AWS_S3_PUBLIC_STATIC_BUCKET_NAME}/${uid}`,
					size: file.size,
					original_name: file.originalname,
					mimetype: file.mimetype,
					state: PENDING,
					hash: hash
				})
				.returning('id')
				.executeTakeFirstOrThrow();

			res.status(200).json({ id: imageRecord.id });
		} catch (e) {
			// Try to rollback S3 upload so we're not left with dangling objects
			console.error('Error inserting image record into DB:', e);
			console.log('Attempting to delete dangling object in S3...');

			if (await deleteStaticFromS3(uid)) {
				console.log('S3 delete was successful.');
			} else {
				console.error('S3 delete failed.');
			}
			next(e);
		}
	} catch (error) {
		next(error);
	}
}
