import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { Web3Module, Web3Service, } from '@libs/web3';

import { UsersModule, UsersRepository, } from '../../../users';
import { AuthWeb3Controller, } from './auth.web3.controller';
import { AuthWeb3, } from './auth.web3.entity';
import { AuthWeb3Repository, } from './auth.web3.repository';
import { AuthWeb3Service, } from './auth.web3.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthWeb3]), UsersModule, Web3Module.register({
    chainId: 1,
    chain: 'eth',
    provider: 'https://eth-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf',
    name: 'Web3Service'
    })],
  controllers: [AuthWeb3Controller],
  providers: [AuthWeb3Repository, AuthWeb3Service]
  })
export class AuthWeb3Module {}