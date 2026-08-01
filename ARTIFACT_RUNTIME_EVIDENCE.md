# ARTIFACT_RUNTIME_EVIDENCE — wat is gemeten, waartegen, en wat niet

> Meting **2026-08-01**. Gebonden aan commit `e044186178fd46566b4f9798928b6d8ef93d16b6`.

## De bewijsketen, volledig

Elke uitspraak hieronder hangt aan deze keten. Ontbreekt één schakel, dan is het
geen volledig bewijs.

| Schakel | Waarde |
|---|---|
| claim | de demonstratie werkt en toont geen FlexCare, geen persoonsgegevens en geen onbewezen claim |
| test | `verifieer.js` — 23 poorten, ongewijzigd gedraaid tegen lokaal én publiek |
| geteste URL | `https://martijn977.github.io/borght-prototypes/` |
| commit | `e044186178fd46566b4f9798928b6d8ef93d16b6` |
| build | GitHub Pages, gepubliceerd vanaf `main` |
| publicatie | bevestigd live; `origin/main` == lokale `HEAD`; werkboom schoon |

**Het sluitstuk — identieke bytes.** De bestanden die ik lokaal heb getest zijn
byte-identiek aan wat de gepubliceerde URL uitlevert. Onafhankelijk gemeten:

| Bestand | SHA-256 (eerste 16) lokaal | SHA-256 (eerste 16) van de gepubliceerde URL |
|---|---|---|
| `decision-support/style.css` | `172b0a99809e73a6` | `172b0a99809e73a6` |
| `decision-support/app.js` | `e28a364c56849da7` | `e28a364c56849da7` |

Daarmee geldt het runtimebewijs voor de **gepubliceerde** versie, niet slechts
voor een lokale kopie.

## Opzet

Echte headless Chromium (Playwright 1.60.0). De Chrome-extensie voor
browserbediening was in deze sessie niet beschikbaar; dit is een echte browser,
geen statische controle. Lokale server voor de tussenmeting:
`python -m http.server 8811 --bind 127.0.0.1`.

**Cache-omzeiling.** Bij de eerste meting tegen de gepubliceerde URL leverde het
CDN nog de vorige stylesheet uit: de hash was ongewijzigd en een reeds herstelde
fout leek terug. In de meting worden `css`- en `js`-verzoeken daarom voorzien van
een unieke query, zodat de bron wordt gemeten en niet de cache. Dit is een
meetartefact, maar met een praktisch gevolg: **een bezoeker die de pagina eerder
opende, kan tot de cache verloopt nog een oudere stylesheet zien.**

## Uitslag — 23 van 23 poorten groen, tegen de gepubliceerde URL

| # | Poort | Uitkomst |
|---|---|---|
| 1 | instappagina bereikbaar | HTTP 200 |
| 2 | instappagina heet Huisvestingsregie | `Borght Huisvestingsregie — demonstratie` |
| 3 | instappagina noemt geen FlexCare | geen treffer |
| 4 | instappagina benoemt het onderwerp | "ruimte, gebruik en scenario's" |
| 5 | demonstratie opent vanaf de instappagina | `Borght Huisvestingsregie — Besluitondersteuning (mock-up)` |
| 6 | alle assets laden | 2 van 2 |
| 7 | negen stappen aanwezig | 9 |
| 8 | elke stap toont inhoud | alle ≥ 500 tekens |
| 9 | kantelpunt verandert de scorekaart | ja |
| 10 | kantelpunt verandert de tegels | ja |
| 11 | kantelpunt verandert de toelichting | ja |
| 12 | reset herstelt exact | ja, alle drie de blokken |
| 13 | claimtoets blokkeert overclaim | ja |
| 14 | claimtoets blokkeert te korte motivatie | ja |
| 15 | onderbouwde motivatie passeert | ja |
| 16 | geen FlexCare-term in de demonstratie | geen treffer |
| 17 | permanente nabouw-markering zichtbaar | aanwezig in de claimbalk |
| 18 | geen onbewezen claimterm in de zichtbare tekst | geen; `veilig` grensbewust getoetst zodat "beveiliging" niet meetelt |
| 19 | geen persoonsgegevens-patroon | e-mail, telefoon, postcode, BSN: geen |
| 20 | geen externe partijnaam | geen |
| 21 | geen JavaScript-fouten | geen |
| 22 | geen console-fouten | geen |
| 23 | geen netwerk-/HTTP-fouten (dode links) | geen |

## Schermformaten

| Formaat | Horizontale overflow | Stappen | JS-fouten |
|---|---|---|---|
| 390 × 844 (telefoon) | nee | 9 bereikbaar | geen |
| 768 × 1024 (tablet) | nee | 9 bereikbaar | geen |
| 1440 × 1000 (desktop) | nee | 9 bereikbaar | geen |

**Gevonden en verholpen tijdens deze ronde:** op 390 px schoof de hele pagina
zijwaarts weg — een blokkade op de eerste gebruikersreis voor een
telefoongebruiker. Oorzaak: de claimbalk was een flexrij die niet afbrak, met een
lange onbreekbare bestandsnaam erin. Verholpen in commit `e044186`.

## Bestuurdersminuut

Gemeten op de gepubliceerde versie: wat is zichtbaar in het **eerste scherm**,
zonder te klikken en zonder te scrollen (1440 × 900).

| Vraag | Beantwoord in het eerste scherm |
|---|---|
| welk vraagstuk wordt beoordeeld | ja |
| welke scenario's worden vergeleken | ja |
| waarom de uitkomst kan kantelen | ja |
| waarop het advies steunt | ja |
| wat nog niet bewezen is | ja |

Er is daarom **niets toegevoegd** aan tekst of navigatie.

## Screenshots

Gemaakt in de sessiegebonden scratchpad: negen stappen, de claimtoets, het
eerste scherm, de instappagina en beide smalle schermformaten. Ik heb er **twee**
zelf bekeken — de instappagina en de scorekaart. De rest is foutloos gerenderd
maar niet visueel door mij beoordeeld. De map is tijdelijk en hoort niet bij het
bewijs dat hierboven aan de commit hangt.

## Wat NIET is vastgesteld

- **Alleen Chromium.** Firefox en WebKit zijn niet geïnstalleerd in deze omgeving
  en dus niet getest. Renderfouten die alleen in Safari of Firefox optreden zijn
  niet uitgesloten.
- **Geen toegankelijkheidsaudit.** Geen contrastmeting, geen schermlezer, geen
  volledige toetsenbordnavigatie. Focusstijlen en ARIA-rollen zijn aanwezig;
  aanwezigheid is geen werking.
- **Print/PDF niet beproefd.** Er staat een `@media print`-regel in de stylesheet;
  die is nooit uitgevoerd. In `ARTIFACT_ENGINE_BOUNDARY.md` staat export daarom
  als NIET BESCHIKBAAR.
- **De nabouw is niet vergeleken met de productengine.** Niemand heeft dezelfde
  invoer door beide gehaald. Zie `ARTIFACT_ENGINE_BOUNDARY.md`.
- **Geen menselijke lezer getoetst.** Dat de tekst aanwezig en leesbaar is, is
  gemeten; dat een bestuurder er de juiste conclusie uit trekt, niet.
- **Geen producttests gedraaid.** Uitspraken over de stand van het product komen
  uit de projectdocumentatie, niet uit een testrun van mij.
- **Geen uitspraak over wie de repository kan benaderen.** Gemeten is dat de
  inhoud publiek opvraagbaar is, niet wie er schrijfrechten heeft.

## Reproduceren

```
git clone https://github.com/Martijn977/borght-prototypes.git
cd borght-prototypes && git checkout e044186
python -m http.server 8811 --bind 127.0.0.1
```

Vergelijk daarna de SHA-256 van `decision-support/app.js` en
`decision-support/style.css` met de tabel bovenaan.
