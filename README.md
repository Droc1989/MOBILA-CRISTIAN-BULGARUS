# Mobilă Cristian Bulgăruș

Site static responsive pentru prezentarea și solicitarea rapidă a mobilierului, publicat pe Netlify.

## Funcții principale

- pagină separată pentru fiecare ramură: dormitoare și paturi, dulapuri, comode, mese și scaune, living, canapele și alte produse;
- pagină de detalii pentru fiecare produs, cu fotografii, descriere, dimensiuni și materiale;
- pagină „Probează mobila” cu fotografie de cameră și poziționare, redimensionare și rotire direct pe canvas;
- pagină „Montaj la clienți” și secțiune „Părerea clienților” pe pagina principală;
- cerere de detalii pentru fiecare model, trimisă rapid prin WhatsApp;
- panou de administrare propriu la `/admin/`, autentificat prin Netlify Identity și conectat la repository prin Git Gateway;
- compresie automată în browser pentru fotografiile încărcate din panoul de administrare;
- pagini HTML statice pentru produse, cu Open Graph și JSON-LD specifice fiecărui model;
- formular „Ai o dorință de mobilă?”, inclusiv încărcarea unei fotografii de pe telefon;
- bară de contact fixă pe telefon: apel, WhatsApp și cerere de ofertă;
- mesajul „Montaj gratuit” evidențiat în zonele principale;
- pagini GDPR și cookies, sitemap și date structurate SEO local.

## Structură

```text
index.html                         pagina principală simplificată
categorii/                         paginile celor șapte categorii
produs.html                        compatibilitate pentru linkurile vechi de produs
produse/                           paginile statice generate pentru fiecare produs
probeaza-mobila.html               instrumentul de probare a mobilierului în cameră
montaj-clienti.html                fotografii și păreri publicate cu acordul clienților
data/catalog.json                  catalogul central editabil
data/site.json                     conținutul paginii principale și noutățile
admin/index.html + admin/app.js    interfața proprie de administrare
scripts/                           generatoarele paginilor și datelor structurate
assets/product-pages.js            generator comun browser/Node pentru produse
assets/room-planner.js              interacțiunile canvas pentru probarea mobilierului
assets/furniture/                   piesele PNG cu fundal transparent
assets/site.css / assets/site.js   designul și funcționalitatea comună
assets/brand/                      logo-ul oficial
assets/facebook/                   fotografii recente preluate din pagina afacerii
assets/images/                     fotografiile catalogului și elementele legale
politica-confidentialitate.html    politica GDPR
politica-cookies.html              politica de cookies
netlify.toml                       configurarea publicării și antetele de securitate
robots.txt / sitemap.xml           configurarea indexării
```

## Formulare

Formularul `dorinta-mobilier` folosește Netlify Forms. Pentru notificări prin e-mail, acestea se configurează în Netlify la **Forms → Form notifications**.

## Administrare

Administratorul deschide `https://www.mobilacristian.onl/admin/`, se autentifică și poate:

- adăuga, ascunde sau modifica produse;
- încărca fotografia principală și imagini suplimentare;
- modifica descrierile, dimensiunile și materialele;
- schimba imaginea și textele principale ale site-ului;
- publica, modifica sau ascunde noutăți.
- publica lucrări montate cu fotografie, client, localitate și părere, după confirmarea acordului de publicare.

Panoul nu folosește Decap CMS. Este o interfață JavaScript proprie: Netlify Identity autentifică administratorul, iar Git Gateway permite citirea și scrierea fișierelor din repository. Accesul se păstrează pe bază de invitație.

Înainte de încărcare, toate imaginile sunt convertite în JPEG, redimensionate la maximum 1600 px lățime și comprimate în browser. Produsele sunt salvate în `data/catalog.json`, conținutul general și noutățile în `data/site.json`, iar fotografiile în `assets/uploads/`.

La „Publică modificările”, panoul generează sau actualizează și pagina `produse/[id-produs].html`. Astfel, titlul, descrierea și imaginea Open Graph sunt prezente direct în HTML pentru WhatsApp și Facebook. Paginile generate includ și date structurate `Product` și `BreadcrumbList`.

## Generare și verificare locală

Site-ul este static și nu are dependențe npm sau un pas de compilare. Comanda `npm run build` verifică local fișierele esențiale și instrumentul „Probează mobila”. După modificarea manuală a catalogului, paginile și datele structurate se regenerează cu:

```bash
node scripts/generate-static-structured-data.cjs
node scripts/generate-product-pages.cjs
```

În utilizarea normală, paginile produselor sunt generate automat de panoul de administrare la publicare.

## Contact folosit pe site

- Telefon și WhatsApp: `+40 765 065 953` — Lenuța Buzdugan
- Telefon: `+40 768 355 975` — Buzdugan Cristian

## Publicare

Repository-ul este conectat la Netlify. După publicarea pe ramura `main`, Netlify poate porni automat noul deploy.
