import { ConfigModule, ConfigService, } from '@nestjs/config';
import { CustomNamingStrategy, } from '@libs/config/database';
import fs from 'fs';
import { GlobSync, } from 'glob';
import path from 'path';
import { exit, } from 'process';
import { DataSource, DataSourceOptions, } from 'typeorm';

import { AbstractSeed, } from './seed.abstract';

async function init(ormConfigPath: string) {
  ConfigModule.forRoot();
  const configService = new ConfigService();

  const _ormConfigPath = path.resolve(process.cwd(), ormConfigPath);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const ormConfig = JSON.parse(fs.readFileSync(_ormConfigPath).toString()) as DataSourceOptions & { seeds: string[]; };

  const seeds = [];

  for (const pattern of ormConfig.seeds) {
    const glob = new GlobSync(pattern);

    const seedsFiles = glob.found;

    for (const seedPath of seedsFiles) {
      const _seedPath = path.resolve(process.cwd(), seedPath);
      // FIXME set correct interface
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const seed = (await import(_seedPath)).default as AbstractSeed;
      seeds.push(seed);
    }
  }

  const connection = new DataSource({
    ...ormConfig,
    namingStrategy: new CustomNamingStrategy(),
  });

  await connection.initialize();

  for (const SeedType of seeds) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const seed: AbstractSeed = new SeedType(configService);

    try {
      await seed.run(connection);
    } catch (err) {
      console.log('err', err);
    }
  }

  await connection.destroy();
}

const [ormConfigPath] = process.argv.slice(2);

if (!ormConfigPath) {
  console.log('ormConfig not found');
  exit(1);
}

init(ormConfigPath).catch((error) => console.log(error));
