import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
const result = await build({
  entryPoints: [fileURLToPath(new URL('client/entry.mjs', root))],
  bundle: true,
  platform: 'browser',
  format: 'cjs',
  external: ['react'],
  write: false,
  target: ['es2022'],
  legalComments: 'none',
});
const body = result.outputFiles[0].text;
const output = `window.__ModuleLoader__.load({\n\tid: ${JSON.stringify(packageJson.name)},\n\tfactory: (require) => {\n\t\tvar module = { exports: {} };\n\t\tvar exports = module.exports;\n${body.split('\n').map(line => `\t\t${line}`).join('\n')}\n\t\treturn module.exports;\n\t}\n});\n`;
await writeFile(new URL('lib/client.js', root), output);
console.log(`Built lazy-CJS DSH client bundle -> ${fileURLToPath(new URL('lib/client.js', root))}`);
