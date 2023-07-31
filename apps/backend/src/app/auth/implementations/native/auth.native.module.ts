import { Module, } from '@nestjs/common';

import { AuthNativeController, } from './auth.native.controller';
import { AuthNativeService, } from './auth.native.service';

@Module({
  controllers: [AuthNativeController],
  providers: [AuthNativeService]
  })
export class AuthNativeModule {}