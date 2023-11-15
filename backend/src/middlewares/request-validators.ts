import Ajv from "ajv";
import addFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';

const ajv = new Ajv();
addFormats(ajv);

export function validateBody(schema: object) {
	const validate = ajv.compile(schema);
	return (req: Request, res: Response, next: NextFunction) => {
		if (!validate(req.body)) return res.status(400).json(validate.errors);
		return next();
	};
}

export function validateQuery(schema: object) {
	const validate = ajv.compile(schema);
	return (req: Request, res: Response, next: NextFunction) => {
		if (!validate(req.query)) return res.status(400).json(validate.errors);
		return next();
	};
}
