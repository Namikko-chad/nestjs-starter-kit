import { ConfigModule, ConfigService, } from '@nestjs/config';
import fs from 'fs/promises';
import path from 'path';

import { describe, expect, it,  } from '@jest/globals';

import { AbstractSeed, } from './seed.abstract';

class TestSeed extends AbstractSeed {
  async run (): Promise<void> {
    const seeds = await fs.readdir(path.resolve(process.cwd(), 'store'));
    seeds.forEach(element => {
      this.loadSeeds(element);
    });
  }
}

describe('Check all seeds file', () => {
  ConfigModule.forRoot();
  const configService = new ConfigService();
  const test = new TestSeed(configService);

  it('Should check all csv file', async () => {
    
    await expect(test.run()).resolves.not.toThrow();
  });
});