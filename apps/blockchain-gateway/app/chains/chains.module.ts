import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { Chain, } from './chains.entity';
import { ChainsGenerator, } from './chains.generator';
import { ChainsRepository, } from './chains.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Chain])],
  providers: [ChainsRepository],
  exports: [ChainsGenerator]
  })
export class ChainsModule {}