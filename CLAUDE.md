# CLAUDE.md

Instrucțiuni pentru Claude Code în acest repository. Site-ul este în limba română.

## Ce este proiectul

Site static pentru Mobilă Cristian Bulgăruș (mobilacristian.onl): prezentarea mobilierului, pagini de produs, cereri prin WhatsApp și formular, panou de administrare propriu la `/admin/`. Publicat pe Netlify din ramura `main`.

## Structură

- `index.html` — pagina principală
- `categorii/*.html` — cele șapte categorii (dormitoare, dulapuri, comode, mese, living, canapele, altele)
- `produse/*.html` — pagini statice generate pentru fiecare produs (nu se editează manual)
- `produs.html` — compatibilitate pentru linkurile vechi
- `probeaza-mobila.html`, `montaj-clienti.html`, `livrare-montaj.html`, `garantie.html`, `politica-*.html`, `termeni-conditii.html`, `privacy.html`, `sal.html`
- `data/catalog.json` — catalogul central de produse (sursa de adevăr)
- `data/site.json` — conținutul paginii principale și noutățile
- `admin/` — panoul de administrare (JavaScript propriu, Netlify Identity + Git Gateway)
- `assets/` — `site.css`, `site.js`, `product-pages.js`, `room-planner.js`, imagini, logo, piese PNG
- `scripts/` — generatoarele: `build.mjs`, `generate-product-pages.cjs`, `generate-static-structured-data.cjs`
- `netlify.toml` — publicare și antete de securitate (CSP strict; nu adăuga surse externe fără motiv)
- `sitemap.xml`, `robots.txt` — indexare

## Comenzi

```bash
npm run build                                  # verifică fișierele esențiale
node scripts/generate-product-pages.cjs        # regenerează produse/*.html din catalog
node scripts/generate-static-structured-data.cjs  # regenerează datele structurate
```

Nu există dependențe npm și nici pas de compilare. Nu există framework de teste.

## Reguli de lucru

- După orice modificare a `data/catalog.json`, rulează cele două generatoare și verifică diff-ul din `produse/`.
- Nu edita manual fișierele din `produse/`; modifică catalogul sau generatorul.
- Păstrează limba română pentru tot conținutul vizibil și pentru meta-tagurile SEO.
- Fiecare pagină nouă trebuie să aibă `<title>`, meta description, canonical, Open Graph și să fie adăugată în `sitemap.xml`.
- Nu modifica antetele din `netlify.toml` fără cerere explicită; CSP-ul este restrictiv intenționat.
- Nu comite fișiere din `assets/uploads/` generate local sau date de test.
- Nu publica direct pe `main` modificări mari fără confirmare; pentru schimbări de amploare folosește un branch separat.

## Contact afișat pe site

Numerele de telefon și WhatsApp sunt cele din `README.md`. Nu le schimba fără confirmare.
