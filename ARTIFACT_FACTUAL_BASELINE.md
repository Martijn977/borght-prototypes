# ARTIFACT_FACTUAL_BASELINE — beginsituatie vóór de correctieronde

> Vastgesteld **2026-08-01**, uitsluitend lezend, vóór enige wijziging.

## Feitentabel

| Onderdeel | Repo | Branch | Commit | Gepubliceerd | Dirty |
|---|---|---|---|---|---|
| Demonstratie (artefact) | `borght-prototypes` | `main` | `4fd3c12` | **ja** — GitHub Pages | ja: `decision-support/{app.js,index.html,style.css}` |
| Product | `06 - Borght Huisvestingsregie` | `feat/consolidated-decision-journey` | `7ad0f18` | **nee** — geen git-remote | nee |

## Welke repository wordt gepubliceerd

`borght-prototypes`. Vastgesteld, niet aangenomen:

- remote: `https://github.com/Martijn977/borght-prototypes.git`;
- onauthenticated opgevraagd, statuscode `200` op de repository-API → de
  repository is **openbaar**;
- `https://martijn977.github.io/borght-prototypes/` gaf `200` met paginatitel
  `Borght FlexCare — Prototypes`;
- `.../decision-support/` gaf `200` met titel `FlexCare — Decision Support (mock-up)`.

De productrepository heeft **geen remote** en publiceert dus niets.

## Het kernprobleem: drie statussen tegelijk

| Onderdeel | Werkelijke status vóór deze ronde |
|---|---|
| Lokale demonstratie | Huisvestingsregie, technisch werkend, ongecommit |
| Gepubliceerde versie | **FlexCare** — een ander product |
| Productrepo | ongewenst gewijzigd met `docs/ARTIFACT_STATUS.md` |

`HEAD` en `origin/main` van de artefactrepo stonden beide op `4fd3c12`, met drie
gewijzigde bestanden in de werkboom. Daarmee gold: **wat lokaal getest was, was
niet wat online stond.** Een lokale testuitslag kon dus niets zeggen over wat een
ontvanger via de link te zien kreeg.

## FlexCare-vermenging — volledige scan van de artefactrepo

Zeven bestanden doorzocht op `FlexCare`, `Borght FlexCare`, `Wet DBA`, `DBA`,
`zzp`, `ZZP`, `opdrachtgever`, `opdrachtnemer`.

| Vindplaats | Klasse | Oordeel |
|---|---|---|
| `index.html:8` — `<title>Borght FlexCare — Prototypes</title>` | zichtbaar (tab/metadata) | hoort niet bij Huisvestingsregie |
| `index.html:32` — balk `Borght FlexCare · Prototypes` | zichtbaar | idem |
| `index.html:40` — kaartlabel `FlexCare · Decision Support` | zichtbaar | idem |
| `decision-support/style.css:9` — verwijst naar een FlexCare-document als bron van de spacingschaal | commentaar | verboden productkoppeling |
| `decision-support/app.js` (2×), `decision-support/index.html`, `style.css` op `DBA` | vals-positief | de letterreeks zit in het woord "herlei**dba**ar" — geen actie |
| `zzp`, `ZZP`, `opdrachtgever`, `opdrachtnemer`, `Wet DBA` | — | **geen treffers** |

Daarnaast: `shared/assets/tokens.css` en `shared/components/components.css` —
een gedeelde tokenset uit de FlexCare-mock-upfabriek, met navy `#002060`
(volgens ADR-004 niet meer de merkidentiteit) en een eigen instructie "niet
forken; importeren". **Door niets in de repository gebruikt** — geen enkele
`<link>` of `@import` verwijst ernaar.

## Commits in de productrepository die er niet hadden mogen zijn

| Commit | Datum | Inhoud |
|---|---|---|
| `5c9ce79` | — | voegt `docs/ARTIFACT_STATUS.md` toe (423 regels) |
| `7ad0f18` | 2026-08-01 08:12 | breidt datzelfde bestand uit (175 regels) |

Beide raken **uitsluitend** dat ene bestand. Geen broncode, geen ADR, geen
`SECURITY_GATES.md`.

Oorzaak onderzocht: er zijn **geen git-hooks** en **geen Stop-hook** die
automatisch committen. De globale hooks draaien alleen op het Agent-gereedschap.
De commits komen van eerdere, afgebroken pogingen van deze opdracht, waarin
`Bash(git commit *)` in `.claude/settings.local.json` was toegestaan terwijl de
opdracht committen verbood.

**Afhankelijkheid:** `docs/AUTONOMOUS_RUN_STATE.md` (zelf gecommit) verwijst
naar `5c9ce79` én naar de bestandsnaam. Terugdraaien laat daar dus een
verwijzing naar iets dat niet meer bestaat. Zie `ARTIFACT_SHAREABILITY_DECISION.md`
voor wat daarmee moet gebeuren.
