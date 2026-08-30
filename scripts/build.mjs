import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const required = [
  'index.html', 'probeaza-mobila.html', 'assets/site.css', 'assets/site.js',
  'assets/room-planner.js', 'assets/furniture/canapea-bej.png',
  'assets/furniture/pat-verde.png', 'assets/furniture/dulap-stejar.png',
  'sitemap.xml', 'netlify.toml'
];

await Promise.all(required.map((file) => access(file)));
for (const file of ['assets/site.js', 'assets/room-planner.js']) {
  const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (check.status !== 0) throw new Error(check.stderr || `JavaScript invalid: ${file}`);
}

const page = await readFile('probeaza-mobila.html', 'utf8');
const expected = [
  'accept="image/*" capture="environment"', 'id="room-canvas"',
  'id="delete-furniture"', 'id="download-room"', 'assets/room-planner.js'
];
for (const marker of expected) {
  if (!page.includes(marker)) throw new Error(`Lipsește marcajul obligatoriu: ${marker}`);
}

console.log(`Build static valid: ${required.length} fișiere esențiale verificate, JavaScript fără erori.`);
