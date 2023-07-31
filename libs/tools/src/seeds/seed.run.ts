import fs from 'fs';
import { GlobSync, } from 'glob';
import path from 'path';
import { DataSource, DataSourceOptions, } from 'typeorm';

import AbstractSeed from './seed.abstract';

async function main(ormConfigPath: string) {
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

  const connection = new DataSource(ormConfig);

  await connection.initialize();

  for (const SeedType of seeds) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const seed: AbstractSeed = new SeedType();

    try {
      await seed.run(connection);
    } catch (err) {
      console.log('err', err);
    }
  }

  await connection.destroy();
}

const [ormConfigPath] = process.argv.slice(2);

void main(ormConfigPath as string);
