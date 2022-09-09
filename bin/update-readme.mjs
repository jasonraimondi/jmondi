import fs from 'fs/promises';
import { globby } from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function packageData(patterns) {
  const result = [];
  const files = await globby(patterns);
  const dirs = files.filter(r => !r.includes('_sample'));
  for (let dir of dirs) {
    const content = await fs.readFile(dir, 'utf8');
    const packageJSON = JSON.parse(content);
    result.push({
      dir,
      name: packageJSON.name,
      version: packageJSON.version,
      description: packageJSON.description,
    });
  }
  return result;
}

void async function () {
  const packages = await packageData([
    path.resolve(__dirname, '../packages/*/package.json'),
  ]);

  const readmePath = path.resolve(__dirname, '../README.md');
  const readme = await fs.readFile(readmePath, 'utf8');

  const template = packages.map(p => `
#### [\`${p.name}\`](https://github.com/jasonraimondi/${p.dir})

* ${p.description}
`).join('\n');

  const regex = /INSERT_START([\s\S]*?)INSERT_END/;
  const result = readme.replace(regex, `INSERT_START)
\n${template}\n
[//]: # (INSERT_END`);

  await fs.writeFile(readmePath, result);
}();
