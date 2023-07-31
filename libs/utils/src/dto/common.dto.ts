import { Request, } from 'express';

export interface RequestAuth extends Request {
  user: {
    id: string;
  };
}
