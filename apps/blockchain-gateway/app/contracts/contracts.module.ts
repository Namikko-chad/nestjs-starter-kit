import { Module, } from '@nestjs/common';
import { TypeOrmModule, } from '@nestjs/typeorm';

import { Contract, } from './contracts.entity';
import { ContractsGenerator, } from './contracts.generator';
import { ContractsRepository, } from './contracts.repository';
import { EventsModule, } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), EventsModule],
  providers: [ContractsRepository],
  exports: [ContractsGenerator]
  })
export class ContractsModule {}