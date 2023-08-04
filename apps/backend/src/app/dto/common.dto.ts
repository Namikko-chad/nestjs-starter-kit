import { Request, } from 'express';

import { Session, } from '../auth';

export interface RequestAuth extends Request {
  user: Session;
}
