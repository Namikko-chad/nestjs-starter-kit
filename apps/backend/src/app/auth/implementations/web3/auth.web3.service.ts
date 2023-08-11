import { Inject, Injectable, } from '@nestjs/common';
import { DataSource, } from 'typeorm';

import { Exception, } from '@libs/utils/Exception';
import { Web3Service, } from '@libs/web3';

import { UsersRepository, } from '../../../users';
import { UsersProcessor, } from '../../../users/users.processor';
import { Session, } from '../../session';
import { SessionService, } from '../../session/session.service';
import { JwtResponse, } from '../../strategies/jwt.constants';
import { SignatureDto, } from './auth.web3.dto';
import { AuthWeb3, } from './auth.web3.entity';
import { AuthWeb3Errors, AuthWeb3ErrorsMessages, } from './auth.web3.errors';
import { AuthWeb3Repository, } from './auth.web3.repository';

@Injectable()
export class AuthWeb3Service {
  @Inject()
  private readonly _ds: DataSource;

  @Inject()
  private readonly _repository: AuthWeb3Repository;

  @Inject()
  private readonly _userProcessor: UsersProcessor;

  @Inject()
  private readonly _userRepository: UsersRepository;

  @Inject()
  private readonly _sessionService: SessionService;

  @Inject()
  private readonly _web3Service: Web3Service;

  async signUp(payload: SignatureDto & {
    userAgent?: string;
    ip: string;
  }): Promise<JwtResponse> {
    const queryRunner = this._ds.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      let address: string;
  
      try {
        address = this._web3Service.recover('Authenticate me', payload.signature);
      } catch (error) {
        throw new Exception(AuthWeb3Errors.SignatureBroken, AuthWeb3ErrorsMessages[AuthWeb3Errors.SignatureBroken], {
          signature: payload.signature,
        });
      }

      let web3User = await this._repository.findOne({
        where: {
          address,
        },
      });

      if (!web3User) {
        const user = await this._userProcessor.create({}, queryRunner);
        web3User = this._repository.create({
          address,
          userId: user.id,
        });
        await this._repository.save(web3User, { queryRunner, });
      }
      
      await queryRunner.commitTransaction();
      const tokens = this._sessionService.create({
        userId: web3User.userId,
        userAgent: payload.userAgent,
        ip: payload.ip,
      });

      return tokens;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  
  async signUpAppend(session: Session, payload: SignatureDto): Promise<AuthWeb3> {
    let address: string;

    try {
      address = this._web3Service.recover('Authenticate me', payload.signature);
    } catch (error) {
      throw new Exception(AuthWeb3Errors.SignatureBroken, AuthWeb3ErrorsMessages[AuthWeb3Errors.SignatureBroken], {
        signature: payload.signature,
      });
    }

    let web3User = await this._repository.findOne({
      where: {
        address,
      },
    });
    if (!web3User)
      throw new Exception(AuthWeb3Errors.AlreadyExist, AuthWeb3ErrorsMessages[AuthWeb3Errors.AlreadyExist], {
        address,
      });
    web3User = this._repository.create({
      ...payload,
      userId: session.userId,
    });

    return web3User;
  }
}