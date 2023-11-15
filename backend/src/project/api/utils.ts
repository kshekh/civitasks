import { db } from '@database/setup';
import { Request, Response, NextFunction } from 'express';
import Session from 'supertokens-node/recipe/session';

const submissionEndTime = new Date(Date.UTC(2023, 9, 16, 8, 0, 0));

export const ALLOWED_LATE_SUBMITS = new Set(['none']);

// Middleware for locking down project submission endpoints after the submission deadline
export const projectSubmissionLockout = async (req: Request, res: Response, next: NextFunction) => {
    let session = await Session.getSession(req, res);

    const userData = await db
      .selectFrom('users')
      .select(['email'])
      .where('auth_id', '=', session.getUserId())
      .executeTakeFirst();
    
    if (ALLOWED_LATE_SUBMITS.has(userData?.email || '')) {
      next();
    } else {
      console.error('Received request after submission deadline from non-whitelisted user:', userData?.email);

      const currentTime = new Date();
      if (currentTime >= submissionEndTime) {
          console.log("Received request after submission deadline, blocking");
          res.status(403).send('Project submission has ended!');
      } else {
          next();
      }
    }
};
