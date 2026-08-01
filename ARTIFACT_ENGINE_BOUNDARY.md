# ARTIFACT_ENGINE_BOUNDARY — wat is echt, wat is nabouw

> Peildatum **2026-08-01**. Hoort bij de demonstratie in `decision-support/`.

## De regel die hier geldt

Een onderdeel mag alleen **ECHTE ENGINE** heten wanneer de demonstratie
aantoonbaar dezelfde code of dezelfde gepubliceerde interface gebruikt als het
product.

De demonstratie is een losse, statische pagina. Zij bevat **geen import, geen
bundel, geen API-aanroep en geen netwerkverkeer** naar Borght Huisvestingsregie.
Dat is gemeten: bij het laden en tijdens alle interacties is geen enkel
netwerkverzoek waargenomen buiten de twee eigen bestanden.

**Gevolg, zonder omweg: er is in deze demonstratie geen enkel onderdeel dat als
ECHTE ENGINE kwalificeert.** Alles wat rekent is nabouw, alles wat toont is
presentatie. Dat is geen tekortkoming die verborgen moet worden — het is de
reden dat de demonstratie geen bewijs van het product kan zijn.

## Labels

| Label | Betekenis |
|---|---|
| **ECHTE ENGINE** | zelfde code of gepubliceerde interface als het product |
| **NABOUW** | zelfstandig geherimplementeerd uit de gepubliceerde regels van het product |
| **PRESENTATIE** | toont alleen; rekent niet en beslist niet |
| **NIET BESCHIKBAAR** | bestaat in de demonstratie niet |

## Register

| Onderdeel | Label | Nagebouwd uit | Gevalideerd tegen het product |
|---|---|---|---|
| Scenario-score (scorekaart per belang) | **NABOUW** | `src/lib/regie/belangen-afweging.ts` — banden 0,67 / 0,34, richting-bewuste min-max-normalisatie, `succesDrempel`, `hard`, `onvoldoende_onderbouwd` bij ontbrekende waarde | **nee** |
| Belangconflicten | **NABOUW** | idem — `tegengestelde_richting`, `geen_gedeeld_scenario` | **nee** |
| Kantelpunt | **NABOUW** | `src/lib/regie/kantelpunt.ts` + de kantelsignalen uit `belangen-afweging.ts` | **nee** |
| Claimtoets op de motivatie | **NABOUW** | `src/lib/regie/besluit-guard.ts` + de termenlijst uit `src/lib/claim-governance/policy/default-policy.ts` | **nee** |
| Bronbetrouwbaarheid en triangulatie | **NABOUW** | `src/lib/kennismodel/bronbetrouwbaarheid.ts` — vier assen, laagste as domineert | **nee** |
| Meetprofiel-oordeel | **NABOUW** | `src/domain/evaluatie/meetprofiel.ts` | **nee** |
| Risicoscore (kans × impact) | **NABOUW** | `src/lib/risico-engine.ts` | **nee** |
| Intake en bewijsdekking | **PRESENTATIE** | acht fundamentblokken uit `src/lib/intake-schema.ts`; de demonstratie rekent er niets mee | n.v.t. |
| Besluitdossier / rapportage | **PRESENTATIE** | sectie-indeling uit `src/i18n/messages/domains/besluitdossier.ts` | n.v.t. |
| Vastleggingsspoor (audit) | **PRESENTATIE** | vaste voorbeeldregels; geen keten, geen hash, geen append-only-gedrag | n.v.t. |
| Sponsor-akkoord | **PRESENTATIE** | toont status en de openstaande poorten; er is geen akkoordpad | n.v.t. |
| Huisstijl-tokens | **PRESENTATIE** | kleurwaarden letterlijk gelijk aan `src/styles/borght-tokens.css` (ADR-004) | waarden vergelijkbaar, wél gecontroleerd |
| Opslaan en heropenen | **NIET BESCHIKBAAR** | — | — |
| Export / PDF | **NIET BESCHIKBAAR** | er staat een `@media print`-regel in de stylesheet, maar die is **niet beproefd** | — |
| Inloggen, tenants, rollen | **NIET BESCHIKBAAR** | — | — |

## Wat "niet gevalideerd" hier precies betekent

Niemand heeft dezelfde invoer door de nabouw én door de productengine gehaald en
de uitkomsten naast elkaar gelegd. De nabouw kan daarom afwijken door een
verkeerd gelezen regel, een afrondingsverschil of een regel die na 2026-08-01 in
het product is gewijzigd. Er is **geen mechanisme dat zo'n afwijking signaleert**.

Een gelijkwaardigheidstoets zou eruitzien als: een vaste set invoerwaarden door
`weegBelangen`, `vindKantelpunt`, `toetsBesluit` en `beoordeelMeetprofiel` van
het product halen, dezelfde set door de nabouw, en de uitkomsten byte-gelijk
vergelijken. Dat is **niet uitgevoerd**.

## Waar de gebruiker dit ziet

De nabouwgrens staat op twee plaatsen in de demonstratie zelf, waarvan één
permanent in beeld bij het openen:

1. de claimbalk bovenaan, direct onder de titelbalk;
2. de voettekst onder de negen stappen.

Beide zeggen hetzelfde: het rekenwerk is nabouw en geldt niet als bewijs van de
echte engine.
