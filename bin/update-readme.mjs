import fs from 'fs/promises';
import { globby } from 'globby';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../");

async function packageData(patterns) {
  const result = [];
  const files = await globby(patterns);
  const dirs = files.filter(r => !r.includes('_sample'));
  for (let dir of dirs) {
    const content = await fs.readFile(dir, 'utf8');
    dir = dir.replace(rootPath, "");
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
  const packages = (await packageData([
    path.resolve(__dirname, '../packages/*/package.json'),
  ])).sort();

  const readmePath = path.resolve(__dirname, '../README.md');
  const readme = await fs.readFile(readmePath, 'utf8');

  const template = packages.map(p => `### [📁](https://github.com/jasonraimondi/jmondi/tree/main${p.dir}) ${p.name}

[![NPM Downloads](https://img.shields.io/npm/dt/${p.name}?label=npm+downloads&style=flat-square)](https://www.npmjs.com/package/${p.name})

${p.description}`).join('\n');

  const regex = /INSERT_START([\s\S]*?)INSERT_END/;
  const result = readme.replace(regex, `INSERT_START)
\n${template}\n
[//]: # (INSERT_END`);

  await fs.writeFile(readmePath, result);
}();
