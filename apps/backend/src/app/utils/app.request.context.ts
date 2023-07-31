/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Utils, } from '@libs/utils/utils';
import * as cls from 'cls-hooked';
import { Response, } from 'express';
import { IncomingMessage, } from 'http';

import { Session, } from '../auth/session/session.entity';


export default class RequestContext {
  static namespace = Utils.getUUID();

  private readonly _request: IncomingMessage;

  constructor(request: IncomingMessage, _response: Response) {
    this._request = request;
  }

  public static currentRequestContext(): RequestContext | null {
    const session = cls.getNamespace(RequestContext.namespace);

    if (session && session.active) {
      return session.get(RequestContext.name);
    }

    return null;
  }

  public static currentAuthSession(): Session {
    const requestContext = RequestContext.currentRequestContext();

    if (requestContext) {
      // @ts-ignore
      const user = requestContext._request['user'];

      return user;
    }

    // @ts-ignore
    return null;
  }
}
