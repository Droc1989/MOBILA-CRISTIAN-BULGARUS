# Mobilă Cristian Bulgăruș

Site static responsive pentru prezentarea și solicitarea rapidă a mobilierului, publicat pe Netlify.

## Funcții principale

- navigare pe ramuri: dormitoare și paturi, dulapuri, comode, mese și scaune, living, canapele și alte produse;
- galerie cu fotografii reale, filtrare pe categorii și vizualizare mărită;
- cerere de detalii pentru fiecare model, trimisă rapid prin WhatsApp;
- formular general de contact prin Netlify Forms;
- formular „Ai o dorință de mobilă?”, inclusiv încărcarea unei fotografii de pe telefon;
- bară de contact fixă pe telefon: apel, WhatsApp și cerere de ofertă;
- mesajul „Montaj gratuit” evidențiat în zonele principale;
- pagini GDPR și cookies, sitemap și date structurate SEO local.

## Structură

```text
index.html                         pagina principală, stiluri și interacțiuni
assets/brand/                      logo-ul oficial
assets/facebook/                   fotografii recente preluate din pagina afacerii
assets/images/                     fotografiile catalogului și elementele legale
politica-confidentialitate.html    politica GDPR
politica-cookies.html              politica de cookies
netlify.toml                       configurarea publicării și antetele de securitate
robots.txt / sitemap.xml           configurarea indexării
```

## Formulare

Formularele `solicitare-mobilier` și `dorinta-mobilier` folosesc Netlify Forms. Pentru notificări prin e-mail, acestea se configurează în Netlify la **Forms → Form notifications**.

## Contact folosit pe site

- Telefon și WhatsApp: `+40 765 065 953` — Lenuța Buzdugan
- Telefon: `+40 768 355 975` — Buzdugan Cristian

## Publicare

Repository-ul este conectat la Netlify. După publicarea pe ramura `main`, Netlify poate porni automat noul deploy.
