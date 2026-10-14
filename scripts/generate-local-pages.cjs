// Generează pagini locale SEO: mobila-ieftina-[localitate].html
// Rulare: node scripts/generate-local-pages.cjs
// Lista de localități: data/localitati.json (un obiect cu județ -> listă de localități).
// Adaugă localități în JSON și rulează din nou; paginile existente sunt rescrise.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LIST = path.join(ROOT, 'data', 'localitati.json');
const SITE = 'https://www.mobilacristian.onl';

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ș|ş/gi, 's')
    .replace(/ț|ţ/gi, 't')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pageHtml = ({ name, county, slug, type }) => {
  const title = `Mobilă ieftină și de calitate în ${name}, ${county} | Montaj gratuit`;
  const description = `Mobilă ieftină și de calitate pentru ${name}, ${county}: dormitoare, dulapuri, living, mese și canapele. Livrare în localitate și montaj gratuit de la Mobilă Cristian Bulgăruș.`;
  const url = `${SITE}/mobila-ieftina-${slug}.html`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FurnitureStore',
      '@id': `${SITE}/#store`,
      name: 'MOBILA CRISTIAN S.R.L.',
      url: `${SITE}/`,
      telephone: ['+40 765 065 953', '+40 768 355 975'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Strada Principală Nr. 444',
        addressLocality: 'Bulgăruș',
        addressRegion: 'Timiș',
        postalCode: '307241',
        addressCountry: 'RO',
      },
      areaServed: { '@type': 'AdministrativeArea', name: `${name}, ${county}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: `Mobilă în ${name}`, item: url },
      ],
    },
  ];

  return `<!doctype html>
<html lang="ro">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <meta name="theme-color" content="#2f211a">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/site.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body data-local-page="${slug}"><div data-site-header></div><main>
  <header class="legal-hero"><div class="container"><div class="breadcrumbs"><a href="index.html">Acasă</a> / ${esc(name)}</div><p class="eyebrow">Mobilă ieftină · ${esc(county)}</p><h1>Mobilă ieftină și de calitate în ${esc(name)}</h1><p class="lead">Mobilier pentru dormitor, dulap, living, bucătărie și sufragerie, cu montaj gratuit realizat de echipa noastră. Livrăm în ${esc(name)} și în comunele din județul ${esc(county)}.</p></div></header>
  <article class="legal-main">
    <h2>Mobilă ieftină și de calitate în ${esc(name)}</h2>
    <p>Mobilă Cristian Bulgăruș oferă mobilier pentru casă și apartament cu livrare în ${esc(name)} și montaj gratuit. Alegi modelul, confirmăm împreună dimensiunile, disponibilitatea și prețul complet înainte de comandă.</p>
    <h2>Ce poți comanda pentru ${esc(name)}</h2>
    <ul>
      <li><a href="categorii/dormitoare.html">Dormitoare și paturi</a></li>
      <li><a href="categorii/dulapuri.html">Dulapuri</a></li>
      <li><a href="categorii/comode.html">Comode și noptiere</a></li>
      <li><a href="categorii/mese.html">Mese și scaune</a></li>
      <li><a href="categorii/living.html">Living</a></li>
      <li><a href="categorii/canapele.html">Canapele</a></li>
      <li><a href="categorii/altele.html">Alte produse</a></li>
    </ul>
    <h2>Livrare și montaj în ${esc(name)}</h2>
    <p>Livrarea se stabilește în funcție de fiecare comandă. Montajul este gratuit și este realizat direct de echipa noastră. Pentru detalii despre condițiile livrării, vezi <a href="livrare-montaj.html">pagina de livrare și montaj</a>.</p>
    <h2>Încearcă mobila înainte</h2>
    <p>Poți vedea cum arată un model în camera ta cu instrumentul <a href="probeaza-mobila.html">Probează mobila</a>.</p>
    <div class="legal-actions"><a class="btn btn-dark" href="tel:+40765065953">Sună acum</a><a class="btn btn-whatsapp" href="https://wa.me/40765065953" target="_blank" rel="noopener">Scrie pe WhatsApp</a></div>
  </article>
</main><div data-site-footer></div><script src="assets/site.js"></script></body></html>
`;
};

const main = () => {
  const data = JSON.parse(fs.readFileSync(LIST, 'utf8'));
  const written = [];
  for (const [county, places] of Object.entries(data)) {
    for (const name of places) {
      const slug = slugify(name);
      const file = `mobila-ieftina-${slug}.html`;
      fs.writeFileSync(path.join(ROOT, file), pageHtml({ name, county, slug }));
      written.push({ file, name, county });
    }
  }
  console.log(`Generate ${written.length} pagini.`);
  return written;
};

main();
