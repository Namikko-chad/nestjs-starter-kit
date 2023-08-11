import { Module, } from '@nestjs/common';

import { TransitService, } from './transit.service';

@Module({
  providers: [TransitService],
  exports: [TransitService],
})
export class TransitModule {}
