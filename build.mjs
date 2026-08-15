import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const parts = ['01.html', '02.html', '03.html', '04a.html', '04b.html'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

let index = await readFile(join(root, 'index.html'), 'utf8');
const fragments = (await Promise.all(parts.map((name) => readFile(join(root, 'fragments', name), 'utf8')))).join('\n');
index = index.replace(/<main id="main" tabindex="-1">[\s\S]*?<\/main>/, `<main id="main" tabindex="-1">\n${fragments}\n</main>`);
index = index.replace('<script src="./boot.js" type="module"></script>', '<script defer src="./src/content/offer.js"></script>\n<script defer src="./script.js"></script>');

await writeFile(join(dist, 'index.html'), index);
await writeFile(join(dist, '.nojekyll'), '');
await cp(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
await cp(join(root, 'styles'), join(dist, 'styles'), { recursive: true });
await mkdir(join(dist, 'src', 'content'), { recursive: true });
await cp(join(root, 'src', 'content', 'offer.js'), join(dist, 'src', 'content', 'offer.js'));
await cp(join(root, 'script.js'), join(dist, 'script.js'));

console.log(`Built ${parts.length} fragments into dist/index.html`);
