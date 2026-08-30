import { access, readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const required = [
  'index.html', 'probeaza-mobila.html', 'montaj-clienti.html', 'assets/site.css', 'assets/site.js',
  'assets/room-planner.js', 'assets/furniture/canapea-bej.png',
  'assets/furniture/pat-verde.png', 'assets/furniture/dulap-stejar.png',
  'sitemap.xml', 'netlify.toml'
];

await Promise.all(required.map((file) => access(file)));
for (const file of ['assets/site.js', 'assets/room-planner.js', 'admin/app.js']) {
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

const testimonialsPage = await readFile('montaj-clienti.html', 'utf8');
for (const marker of ['data-testimonials-page', 'Montaj la clienți', 'assets/site.js']) {
  if (!testimonialsPage.includes(marker)) throw new Error(`Lipsește marcajul clienților: ${marker}`);
}
const adminPage = await readFile('admin/index.html', 'utf8');
for (const marker of ['data-panel="testimonials"', 'data-testimonial-form', 'consentConfirmed']) {
  if (!adminPage.includes(marker)) throw new Error(`Lipsește funcția din administrare: ${marker}`);
}

console.log(`Build static valid: ${required.length} fișiere esențiale verificate, JavaScript fără erori.`);
