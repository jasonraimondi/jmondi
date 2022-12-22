import fs from "fs/promises";
import { globby } from "globby";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../");

async function packageData(patterns) {
  const result = [];
  const files = await globby(patterns);
  const dirs = files.filter(r => !r.includes("_sample"));
  for (let readMePath of dirs) {
    const readMe = await fs
      .readFile(readMePath, "utf8")
      .then(content => {
        return content.replace(/^#/, "##").replace(/\n#/g, "\n##");
      })
      .catch();
    result.push({ readMe });
  }
  return result;
}

void (async function () {
  const packages = (await packageData([path.resolve(__dirname, "../packages/*/README.md")])).sort();

  const readmePath = path.resolve(__dirname, "../README.md");
  const readme = await fs.readFile(readmePath, "utf8");

  const template = packages
    .map(p => {
      if (p.readMe)
        return `${p.readMe}

---
`;
    })
    .join("\n");

  const regex = /INSERT_START([\s\S]*?)INSERT_END/;
  const result = readme.replace(
    regex,
    `INSERT_START)
\n${template}\n
[//]: # (INSERT_END`,
  );

  await fs.writeFile(readmePath, result);
})();
