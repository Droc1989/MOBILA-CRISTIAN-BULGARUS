# Mobilă Cristian Bulgăruș — site

Site static (HTML, CSS, JavaScript), pregătit pentru publicare pe **Netlify**.

## 1. Cum publici pe Netlify (fără cod)

1. Intră pe [app.netlify.com](https://app.netlify.com) și fă cont (gratuit).
2. Apasă **„Add new site” → „Deploy manually”**.
3. Trage tot folderul `mobila-cristian-bulgarus` (sau arhiva `.zip` dezarhivată) în zona de upload.
4. În câteva secunde site-ul este live, pe o adresă gen `nume-random.netlify.app`.
5. Din **Site settings → Domain management** poți lega domeniul tău propriu (ex. `mobilacristianbulgarus.ro`).

## 2. Formularul de contact — cum primești e-mail

Formularul folosește **Netlify Forms** (`data-netlify="true"`), deci funcționează automat, fără server suplimentar.

Ca să primești un **e-mail de fiecare dată când cineva completează formularul**:
1. După publicare, în Netlify intră la site-ul tău → **Site configuration → Forms → Notifications**.
2. Apasă **„Add notification” → „Email notification”**.
3. Alege formularul „contact” și introdu adresa de e-mail unde vrei să primești mesajele.
4. Salvează — de acum, fiecare solicitare trimisă de pe site îți ajunge automat pe e-mail.

*Notă:* trimiterea fotografiei (câmpul opțional din formular) este gândită ca ajutor suplimentar pentru client; dacă la testare observi că fișierul nu se vede în notificarea pe e-mail, cea mai sigură variantă este ca clientul să trimită fotografia direct pe WhatsApp — link-ul de WhatsApp este deja afișat peste tot pe site.

## 3. Butonul de WhatsApp

Numărul **+40 765 065 953** este deja legat de:
- butonul flotant verde, vizibil pe toate paginile;
- linkurile „WhatsApp” de la fiecare produs;
- secțiunea de Contact și footer.

Dacă schimbați numărul, căutați `40765065953` în `index.html` și `privacy.html` și înlocuiți-l (fără „+”, fără spații).

## 4. Cum înlocuiești fotografiile

Toate imaginile sunt în folderul `images/`. Momentan sunt fotografii-substitut (marcate „FOTO — înlocuiește”), pentru ca structura site-ului să fie completă până primiți pozele reale.

Pentru a le înlocui, salvați poza reală **cu exact același nume de fișier** (ex. `hero.jpg` peste `hero.svg` — dar rețineți să actualizați și extensia în `index.html` dacă folosiți `.jpg` sau `.png` în loc de `.svg`), sau editați direct atributul `src="images/..."` din `index.html`.

Fișiere de imagine folosite:
- `hero.svg` — fotografia mare din secțiunea principală
- `despre.svg` — fotografia din secțiunea „Despre noi”
- `cat-mese-scaune.svg`, `cat-dulapuri.svg`, `cat-dormitoare.svg`, `cat-bucatarii.svg`, `cat-living.svg`, `cat-canapele.svg` — fotografiile categoriilor
- `galerie-1.svg` … `galerie-12.svg` — fotografiile din galerie (puteți adăuga mai multe, copiind un `<div class="gallery-item">` din `index.html`)
- `produs-1.svg` … `produs-6.svg` — fotografiile produselor recomandate

## 5. Cum editezi textele, prețurile și produsele

Tot conținutul este text simplu în `index.html`, organizat pe secțiuni comentate (`<!-- ... -->`). Căutați secțiunea dorită și editați direct textul dintre tag-uri. Produsele recomandate și recenziile sunt marcate clar cu `[text de înlocuit]` — căutați parantezele drepte `[ ]` pentru a găsi rapid toate locurile care așteaptă informații reale.

## 6. Structura fișierelor

```
mobila-cristian-bulgarus/
├── index.html          → pagina principală
├── privacy.html        → politica de confidențialitate
├── netlify.toml         → configurare Netlify
├── robots.txt / sitemap.xml → SEO
├── css/style.css        → tot stilul vizual al site-ului
├── js/script.js         → meniu, galerie, formular
└── images/              → toate fotografiile (substitut, de înlocuit)
```

## 7. SEO local

Site-ul este optimizat pentru expresiile: „mobilă Bulgăruș”, „mobilă nouă Timiș”, „dormitoare Timiș”, „bucătării Timiș”, „montaj mobilă gratuit” — în titlu, descriere și în textele secțiunilor. După publicare, recomandăm și crearea unui profil Google Business pentru afacere, pentru vizibilitate locală suplimentară.
