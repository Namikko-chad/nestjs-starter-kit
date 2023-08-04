import { Inject, Injectable, } from '@nestjs/common';
import { Exception, } from '@libs/utils/Exception';
import { DataSource, } from 'typeorm';

import { UsersErrors, UsersErrorsMessages, UsersRepository, } from '../../../users';
import { UserStatus, } from '../../../users/user.enum';
import { UserProcessor, } from '../../../users/users.processor';
import { Session, } from '../../session';
import { SessionService, } from '../../session/session.service';
import { PasswordRecoveryConfirmDto, PasswordRecoveryDto, SignInDto, SignUpConfirmDto, SignUpDto, SignUpResendDto, } from './auth.native.dto';
import { AuthNative, } from './auth.native.entity';
import { AuthNativeErrors, AuthNativeErrorsMessages, } from './auth.native.errors';
import { AuthNativeRepository, } from './auth.native.repository';

@Injectable()
export class AuthNativeService {
  @Inject()
  private readonly _ds: DataSource;

  @Inject()
  private readonly _repository: AuthNativeRepository;

  @Inject()
  private readonly _userProcessor: UserProcessor;

  @Inject()
  private readonly _userRepository: UsersRepository;
  
  @Inject()
  private readonly _sessionService: SessionService;

  async signUp(payload: SignUpDto): Promise<AuthNative> {
    const queryRunner = this._ds.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const existedUser = await this._repository.findOne({
        where: {
          email: payload.email,
        },
      });
      if (existedUser)
        throw new Exception(AuthNativeErrors.AlreadyExist, AuthNativeErrorsMessages[AuthNativeErrors.AlreadyExist], {
          email: payload.email,
        });

      let user = await this._userRepository.findOneBy({
        email: payload.email,
      });

      if (!user) {
        user = await this._userProcessor.create({
          email: payload.email,
        }, queryRunner);
      }

      const nativeUser = this._repository.create({
        ...payload,
        userId: user.id,
        security: {
          // TODO add confirmation-service
          emailConfirmation: {
            code: 'test',
          },
        },
      });
      await this._repository.save(nativeUser, { queryRunner, });
      await queryRunner.commitTransaction();

      return nativeUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async signUpConfirm(payload: SignUpConfirmDto) {
	  const user = await this._repository.findOneBy({
      email: payload.email,
    });

    if (!user)
      throw new Exception(UsersErrors.UserNotFound, UsersErrorsMessages[UsersErrors.UserNotFound]);

    // TODO add check token

    await this._userProcessor.changeStatus(user.userId, UserStatus.Active);
  }

  async signUpResend(_payload: SignUpResendDto) {
    // const signUp = await this._signUpProcessor.create({ 
    //   user: payload.email.toLowerCase(),
    // });

    // if (!signUp) {
    //   return;
    // }

    // await this._notifications.onSignUp({
    //   email: payload.email.toLowerCase(),
    //   token: signUp.token,
    // });
  }

  async signUpAppend(session: Session, payload: SignUpDto): Promise<AuthNative> {
    const existedUser = await this._repository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (existedUser)
      throw new Exception(AuthNativeErrors.AlreadyExist, AuthNativeErrorsMessages[AuthNativeErrors.AlreadyExist], {
        email: payload.email,
      });
      
    const nativeUser = this._repository.create({
      ...payload,
      userId: session.userId,
      security: {
        // TODO add confirmation-service
        emailConfirmation: {
          code: 'test',
        },
      },
    });

    return nativeUser;
  }

  async signIn(payload: SignInDto & {
    userAgent?: string;
    ip: string;
  }) {
    const userNative = await this._repository.getOne({
      filter: {
        email: payload.login,
      },
      // join: {
      //   inner: ['Users'],
      //   variables: {
      //     username: payload.login,
      //   },
      // },
    });

    if (!userNative || !userNative.passwordCompare(payload.password)) {
      throw new Exception(AuthNativeErrors.PasswordIncorrect, AuthNativeErrorsMessages[AuthNativeErrors.PasswordIncorrect]);
    }

    if ([UserStatus.New, UserStatus.Service, UserStatus.Temporary].includes(userNative.user.status)) {
      throw new Exception(UsersErrors.UserNotACtive, UsersErrorsMessages[UsersErrors.UserNotACtive]);
    }

    const tokens = this._sessionService.create({
      userId: userNative.userId,
      userAgent: payload.userAgent,
      ip: payload.ip,
    });

    return tokens;
  }

  async passwordRecovery(_payload: PasswordRecoveryDto) {
    // const passwordRecovery = await this._passwordRecoveryProcessor.create({
    //   user: payload.email,
    // });

    // if (!passwordRecovery) {
    //   return;
    // }

    // await this._notifications.onPasswordRecovery({
    //   email: payload.email,
    //   token: passwordRecovery.token,
    // });
  }

  async passwordRecoveryConfirm(_payload: PasswordRecoveryConfirmDto) {
    // await this._passwordRecoveryProcessor.apply({
    //   token: query.token,
    //   password: payload.password,
    // });
  }
}