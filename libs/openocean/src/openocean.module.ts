import { Module, } from '@nestjs/common';

import { OpenOceanService, } from './openocean.service';

@Module({
  providers: [OpenOceanService],
  exports: [OpenOceanService],
})
export class OpenOceanModule {}
