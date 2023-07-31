import fs from 'fs';
import path from 'path';
import { DataSource, } from 'typeorm';

export default abstract class AbstractSeed {
  abstract run(connection: DataSource): Promise<void>;

  protected loadSeeds<Seeds>(fileName: string): Seeds[] {
    // Reade file csv
    const scv = path.resolve(process.cwd(), 'store', `${fileName}.csv`);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const data = fs.readFileSync(scv, 'utf8');
    // CSV to array
    const sliced = data.trimEnd().replace(/,\s*$/, '').split('\n').map( (v) => v.split(',') );
    const columnNames = <string[]>sliced.shift();

    return sliced.map<Seeds>( slice => {
      const obj = {};
      slice.forEach( (value, index) => {
        if (columnNames.length+1 < index )
          throw new Error('Bad csv file');
          // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/restrict-template-expressions
        Object.assign(obj, { [`${columnNames[index]}`]: value === 'null' ? null : value, });
      });

      return obj as Seeds;
    });
  }
}
