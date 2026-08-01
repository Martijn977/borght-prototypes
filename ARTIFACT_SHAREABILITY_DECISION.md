# ARTIFACT_SHAREABILITY_DECISION

> Besluit **2026-08-01**, op commit `e044186`.

# Oordeel: **BEGELEID DEELBAAR**

Niet NIET DEELBAAR, en niet ZELFSTANDIG DEELBAAR. Het scheelt precies één
criterium, en dat criterium is goedkoop te sluiten.

## Toets aan de acht criteria voor ZELFSTANDIG DEELBAAR

| # | Criterium | Uitkomst | Waaruit blijkt dat |
|---|---|---|---|
| 1 | juiste branding | **voldaan** | poorten 2, 3, 5, 16: instappagina en demonstratie heten Huisvestingsregie; geen enkele FlexCare-treffer in de gepubliceerde tekst |
| 2 | gepubliceerde versie is getest | **voldaan** | 23/23 poorten tegen `publishedUrl`; asset-hashes lokaal identiek aan publiek |
| 3 | geen persoonsgegevens | **voldaan** | poort 19: geen e-mail-, telefoon-, postcode- of BSN-patroon |
| 4 | geen externe partijnamen | **voldaan** | poort 20 |
| 5 | geen onbewezen beveiligingsclaims | **voldaan** | poort 18; de claimbalk doet uitsluitend ontkennende uitspraken |
| 6 | nabouw zichtbaar gemarkeerd | **voldaan** | poort 17: permanent in de claimbalk, direct bij openen |
| 7 | gebruiker begrijpt zónder mondelinge uitleg wat echt en wat simulatie is | **NIET AANGETOOND** | zie hieronder |
| 8 | geen blokkade op de eerste gebruikersreis | **voldaan** | 390/768/1440 px zonder overflow; de gevonden telefoonblokkade is verholpen in `e044186` |

## Waarom criterium 7 niet is aangetoond

Gemeten is dat de tekst **aanwezig**, permanent zichtbaar en in gewone taal
geschreven is. Dat is iets anders dan dat een lezer er de juiste conclusie uit
trekt. **Geen enkele mens heeft deze pagina gelezen en daarna verteld wat hij
denkt dat echt is en wat simulatie.**

Aanwezigheid van uitleg is structuur waarin bewijs kán bestaan; het is niet het
bewijs zelf. Zolang die toets niet is gedaan, mag criterium 7 niet als voldaan
worden geteld, en luidt het oordeel volgens de eigen regel — één criterium niet
voldaan betekent maximaal begeleid — **BEGELEID DEELBAAR**.

**Hoe dit te sluiten, concreet:** laat één persoon die niet bij de bouw betrokken
was de gepubliceerde pagina één minuut bekijken en daarna drie vragen
beantwoorden: (a) waar gaat dit over, (b) wat is hiervan echt en wat is
nagespeeld, (c) wat is volgens deze pagina nog niet bewezen. Komen die
antwoorden overeen met wat de pagina bedoelt, dan is criterium 7 voldaan en gaat
het oordeel naar ZELFSTANDIG DEELBAAR. Dat kost ongeveer tien minuten.

## Restrisico's die geen criterium raken, maar wel benoemd horen

1. **Alleen Chromium getest.** Firefox en WebKit zijn hier niet beschikbaar. Een
   renderfout die alleen op een iPhone optreedt, is niet uitgesloten.
2. **De nabouw is niet vergeleken met de productengine.** De demonstratie kan
   afwijken van wat het product doet. Dit is gemarkeerd, maar niet gekwantificeerd.
3. **Toegankelijkheid is niet geauditeerd.**
4. **CDN-cache.** Wie de pagina eerder opende, kan tijdelijk een oudere
   stylesheet zien. Bij twijfel: verversen met een lege cache.
5. **De demonstratie verbeeldt een product op releasepoort "A — demonstrabel,
   niet pilotwaardig"** met twee openstaande beveiligingspoorten. De pagina zegt
   dit zelf, maar een enthousiaste lezer kan het over het hoofd zien.

## Wat BEGELEID DEELBAAR hier praktisch betekent

**Wel:**
- tonen in een gesprek of via een gedeeld scherm;
- de directe link `https://martijn977.github.io/borght-prototypes/` sturen mét
  één zin erbij: dit is een demonstratie met verzonnen gegevens, het rekenwerk is
  nagebouwd en geldt niet als bewijs van het product;
- gebruiken om de *methodiek* te laten zien en het gesprek te voeren.

**Niet:**
- als bewijs in een offerte, aanbesteding, due diligence of assurance-context;
- als onderbouwing van een uitspraak over beveiliging, privacy, AVG of
  productiegereedheid — in geen enkele richting;
- als aantoning dat de productengine zich zo gedraagt;
- zonder de begeleidende zin doorsturen aan iemand die Borght niet kent.

## Toegestane eindclaim

> De gepubliceerde Huisvestingsregie-demonstratie is technisch gevalideerd als
> demonstratie. Onderdelen die de productengine nabouwen zijn zichtbaar
> gemarkeerd en gelden niet als bewijs van de echte engine.

Verder gaan dan deze zin mag niet. In het bijzonder niet: productwaardig,
engine gevalideerd, pilotwaardig, of enige uitspraak met het woord beveiligd.

## Openstaand punt buiten deze repository

In de productrepository `06 - Borght Huisvestingsregie` staan twee commits die
er volgens de opdracht niet hadden mogen zijn: `5c9ce79` en `7ad0f18`. Beide
raken uitsluitend `docs/ARTIFACT_STATUS.md`.

Dat bestand is inmiddels **inhoudelijk vervangen** door de vijf `ARTIFACT_*`-
documenten in deze artefactrepository, waar het thuishoort.

**Niet teruggedraaid, en waarom.** `docs/AUTONOMOUS_RUN_STATE.md` — zelf
gecommit — verwijst naar `5c9ce79` en naar de bestandsnaam. Er is dus een
afhankelijkheid, en de regel bij een afhankelijkheid is: geen reset, geen
rebase, maar een veilige vervolgcommit voorbereiden. Bovendien verbiedt de
opdracht commits buiten deze artefactrepository, waardoor het terugdraaien zelf
niet door mij mag worden uitgevoerd. Beide overwegingen wijzen dezelfde kant op:
voorbereiden en voorleggen, niet zelf doen.

**Voorbereide vervolgcommit** (één commit, geen historieherschrijving):

1. vervang de inhoud van `docs/ARTIFACT_STATUS.md` door een verwijzing van
   enkele regels naar deze repository en de vijf `ARTIFACT_*`-documenten;
2. werk de twee regels in `docs/AUTONOMOUS_RUN_STATE.md` bij die naar `5c9ce79`
   en naar het bestand verwijzen, zodat er geen verwijzing naar iets
   verdwenens overblijft;
3. leg in de commitboodschap vast dat `5c9ce79` en `7ad0f18` zonder mandaat zijn
   gemaakt en dat dit de correctie is.

Verboden bij die correctie: `git reset --hard`, `git rebase`, `git push --force`.
