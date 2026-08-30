# Mobilă Cristian Bulgăruș

Site static responsive pentru prezentarea și solicitarea rapidă a mobilierului, publicat pe Netlify.

## Funcții principale

- pagină separată pentru fiecare ramură: dormitoare și paturi, dulapuri, comode, mese și scaune, living, canapele și alte produse;
- pagină de detalii pentru fiecare produs, cu fotografii, descriere, dimensiuni și materiale;
- cerere de detalii pentru fiecare model, trimisă rapid prin WhatsApp;
- panou de administrare la `/admin/`, bazat pe Decap CMS, Netlify Identity și Git Gateway;
- formular „Ai o dorință de mobilă?”, inclusiv încărcarea unei fotografii de pe telefon;
- bară de contact fixă pe telefon: apel, WhatsApp și cerere de ofertă;
- mesajul „Montaj gratuit” evidențiat în zonele principale;
- pagini GDPR și cookies, sitemap și date structurate SEO local.

## Structură

```text
index.html                         pagina principală simplificată
categorii/                         paginile celor șapte categorii
produs.html                        pagina dinamică de detalii a produsului
data/catalog.json                  catalogul central editabil
admin/                             loginul și panoul administratorului
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
- schimba imaginile și descrierile categoriilor.

Accesul se păstrează pe bază de invitație. Modificările sunt salvate în `data/catalog.json` și în `assets/uploads/`.

## Contact folosit pe site

- Telefon și WhatsApp: `+40 765 065 953` — Lenuța Buzdugan
- Telefon: `+40 768 355 975` — Buzdugan Cristian

## Publicare

Repository-ul este conectat la Netlify. După publicarea pe ramura `main`, Netlify poate porni automat noul deploy.
