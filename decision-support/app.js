/* Borght Huisvestingsregie — Besluitondersteuning (mock-up)
   ===========================================================================
   WAT DIT IS
   Een klikbare nabouw van de besluitreis. Geen productcode, geen database,
   geen netwerkverkeer. Alle inhoud in dit bestand is VERZONNEN.

   WAT HIER IS NAGEBOUWD (en waaruit)
   De rekenregels hieronder zijn met opzet een 1-op-1 nabouw van de gepubliceerde
   regels van het product, zodat de mock-up niet iets anders vertelt dan het
   product doet. Herkomst per blok:

     weegBelangen()   <- src/lib/regie/belangen-afweging.ts
                         (banden 0,67 / 0,34; richting-bewuste min-max-normalisatie;
                          succesDrempel; hard; 'onvoldoende_onderbouwd' bij null;
                          conflictsoorten tegengestelde_richting / geen_gedeeld_scenario;
                          bepaalKantel op de dichtstbijzijnde bandgrens)
     scoorBron()      <- src/lib/kennismodel/bronbetrouwbaarheid.ts
                         (vier assen, LAAGSTE as domineert, geen middeling)
     toetsBesluit()   <- src/lib/regie/besluit-guard.ts
                         + src/lib/claim-governance/policy/default-policy.ts
                         (motivatie >= 20 tekens; verboden claimtermen blokkeren)
     risicoNiveau()   <- src/lib/risico-engine.ts (kans x impact; >=15 hoog, >=6 middel)
     intakeDekking    <- src/lib/intake-schema.ts (acht fundamentblokken)
     scenario-namen   <- src/domain/vlekkenplan/types.ts (STRATEGIE_META)
     criteriumsleutels<- src/domain/belang/types.ts (belangCriteriumEnum)

   NABOUW IS GEEN BEWIJS. Dat deze mock-up zich zo gedraagt, bewijst niet dat het
   product zich zo gedraagt. Zie docs/ARTIFACT_STATUS.md in de productrepository.

   WAT HIER BEWUST ONTBREEKT, OMDAT HET IN HET PRODUCT NIET (ZO) BESTAAT
   Alleen punten die op 31-07-2026 in de code zijn nagekeken; de vindplaats staat
   erbij, zodat elke regel hieronder controleerbaar is.
   - geen live ophaler van externe bronnen; het is een fixture-collector op
     opgeslagen bronresponsen                              (PRODUCT_MAP.md, Fase 5)
   - een geuploade QuickScan is een bijlage; de inhoud wordt NIET geextraheerd
                                 (app/projecten/[id]/quickscan/page.tsx, regel 30)
   - CapEx en OpEx zijn in de Scorekaart hardcoded `null`, dus per definitie
     'onvoldoende onderbouwd'  (app/projecten/[id]/scorekaart/page.tsx, regel 55)
   - de gevoeligheidsberekening wordt wel uitgevoerd en opgeslagen, maar door
     geen enkel scherm getoond   (server/services/businesscase-service.ts:98; in
                                  src/app komt 'gevoeligheid' nergens voor)
   - inhoudelijke disciplinevragenlijsten bestaan niet; het scherm zegt zelf
     'BRON_NODIG voor MVP'
                          (app/projecten/[id]/disciplinechecks/page.tsx, regel 63)
   - een afhankelijkheid/relatie kan op het scherm wel worden GETOOND en
     VERWIJDERD, maar niet TOEGEVOEGD: de service kent `addAfhankelijkheid`,
     de pagina kent alleen `deleteRelatieAction`
              (app/projecten/[id]/afhankelijkheden/page.tsx, regels 25-35, tegen
               server/services/afhankelijkheid-service.ts:131)
   - 'regie', 'onboarding' en 'besluitdossier/export' ontbreken in de
     fasenavigatie; de routes bestaan wel, de navigatie-items niet
                                        (components/fase-nav.tsx, type FaseKey)
   - meertaligheid is niet applicatiebreed: zes productschermen halen hun tekst
     uit de i18n-laag, de rest is enkeltalig. Daarom is deze mock-up eentalig NL.
   - zelfbediening-onboarding van een nieuwe klant, en abonnement/licentie/
     limieten, bestaan niet                          (PRODUCT_MAP.md, SaaS-basis)

   PERSOONSGEGEVENS: geen. Stakeholders staan uitsluitend als ROL in dit bestand.
   =========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
   * 0. HULPFUNCTIES
   * ====================================================================== */

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  /** HTML-escape: alle demodata gaat hier doorheen vóór innerHTML. */
  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function zet(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  }
  function isGetal(v) {
    return typeof v === 'number' && isFinite(v);
  }
  /** Aandeel 0..1 → "72%" ; null → "—" */
  function alsAandeel(v) {
    return isGetal(v) ? Math.round(v * 100) + '%' : '—';
  }
  function alsAantal(v) {
    if (!isGetal(v)) return '—';
    // Nederlandse notatie: hele aantallen zonder decimalen, een berekende
    // tussenwaarde (zoals een bandgrens) met een decimaalkomma.
    return Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',');
  }
  function komma(v, dec) {
    if (!isGetal(v)) return '—';
    return v.toFixed(dec == null ? 2 : dec).replace('.', ',');
  }

  /* ======================================================================
   * 1. DEMODATA — VOLLEDIG SYNTHETISCH
   *    Geen bestaande organisatie, geen persoon, geen adres, geen e-mailadres,
   *    geen klantnaam, geen externe partijnaam.
   * ====================================================================== */

  var ORG = {
    naam: 'Demo Zorggroep Vlierhof (fictief)',
    peildatum: '31-07-2026'
  };

  /* --- Intake: de acht fundamentblokken uit intake-schema.ts ------------- */
  var INTAKE = {
    vraag:
      'De hoofdlocatie is verouderd en groter dan het hybride gebruik vraagt, terwijl ' +
      'twee zorgteams structureel te weinig rustige ruimte hebben voor vertrouwelijk ' +
      'cliëntoverleg. De vraag aan het bestuur: welke zone-indeling van de hoofdlocatie ' +
      'is verdedigbaar, en waarop rust die keuze?',
    scope:
      'Eén hoofdlocatie · zes organisatie-eenheden · ± 220 medewerkers · hybride 2–3 dagen. ' +
      'Buiten scope: nevenlocaties, vastgoedtransactie, meerjarenonderhoud.',
    blokken: [
      { sleutel: 'organisatie', label: 'Organisatie', aanwezig: true, toel: 'Zes eenheden met werkprofiel vastgelegd.' },
      { sleutel: 'locaties', label: 'Locaties', aanwezig: true, toel: 'Hoofdlocatie in scope; nevenlocaties expliciet buiten scope.' },
      { sleutel: 'strategische_doelstellingen', label: 'Strategische doelstellingen', aanwezig: true, toel: 'Drie doelstellingen, elk gekoppeld aan een stakeholder.' },
      { sleutel: 'groei_krimp', label: 'Groei / krimp', aanwezig: true, toel: 'Krimp 5% over drie jaar (gesteld, niet gemeten).' },
      { sleutel: 'hybride_beleid', label: 'Hybride beleid', aanwezig: true, toel: 'Vastgesteld beleid: 2–3 dagen op locatie.' },
      { sleutel: 'plattegronden', label: 'Aanwezige plattegronden', aanwezig: false, toel: 'Beschikbaarheid staat op “onbekend”. Zonder maatvaste plattegrond blijft inpasbaarheid onbeoordeeld.' },
      { sleutel: 'knelpunten', label: 'Huidige knelpunten', aanwezig: true, toel: 'Vier knelpunten vastgelegd, waarvan twee met een meting onderbouwd.' },
      { sleutel: 'eindresultaten', label: 'Gewenste eindresultaten', aanwezig: false, toel: 'Niet ingevuld. Zonder eindresultaat is later niet te evalueren of het besluit heeft gewerkt.' }
    ]
  };

  /* --- Stakeholders: uitsluitend ROLLEN -------------------------------- */
  var STAKEHOLDERS = [
    { id: 'sh-bestuur', rol: 'Raad van bestuur', belang: 'Een verdedigbaar besluit zonder onvervulde harde randvoorwaarden' },
    { id: 'sh-zorg', rol: 'Directie zorg', belang: 'Samenwerkende teams dicht bij elkaar' },
    { id: 'sh-or', rol: 'Ondernemingsraad', belang: 'Rust en vertrouwelijkheid voor teams met cliëntgebonden werk' },
    { id: 'sh-fm', rol: 'Facilitair management', belang: 'Zo min mogelijk aparte zones (beheerlast en schoonmaakregime)' },
    { id: 'sh-fin', rol: 'Financiën / control', belang: 'Investering en exploitatielast binnen de kaderbrief' }
  ];

  /* --- Belangen: criteriumsleutels exact uit belangCriteriumEnum -------- */
  var BELANGEN = [
    {
      id: 'b1', stakeholderId: 'sh-zorg', titel: 'Samenwerkende zorgteams naast elkaar',
      criteriumSleutel: 'samenwerking', richting: 'hoger_is_beter', succesDrempel: null, hard: false,
      doel: 'Overdrachten tussen wijkteams kunnen lopend plaatsvinden.'
    },
    {
      id: 'b2', stakeholderId: 'sh-or', titel: 'Rust voor vertrouwelijk cliëntoverleg',
      criteriumSleutel: 'rust', richting: 'hoger_is_beter', succesDrempel: null, hard: true,
      doel: 'Teams met cliëntgebonden werk hebben een eigen, rustige zone.'
    },
    {
      id: 'b3', stakeholderId: 'sh-fm', titel: 'Beheerlast beperken',
      criteriumSleutel: 'efficientie', richting: 'lager_is_beter', succesDrempel: null, hard: false,
      doel: 'Minder zones betekent minder schoonmaak- en beheerregimes.'
    },
    {
      id: 'b4', stakeholderId: 'sh-bestuur', titel: 'Geen onvervulde harde randvoorwaarde',
      criteriumSleutel: 'onvervulde_harde_eisen', richting: 'lager_is_beter', succesDrempel: 0, hard: true,
      doel: 'Een besluit met een onvervulde harde eis is niet verdedigbaar.'
    },
    {
      id: 'b5', stakeholderId: 'sh-or', titel: 'Eigen zone per team met vertrouwelijk werk',
      criteriumSleutel: 'efficientie', richting: 'hoger_is_beter', succesDrempel: null, hard: false,
      doel: 'Liever meer, kleinere zones dan één grote gedeelde zone.'
    },
    {
      id: 'b6', stakeholderId: 'sh-fin', titel: 'Investering binnen de kaderbrief',
      criteriumSleutel: 'capex', richting: 'lager_is_beter', succesDrempel: null, hard: false,
      doel: 'De eenmalige investering past binnen het vastgestelde kader.'
    },
    {
      id: 'b7', stakeholderId: 'sh-fin', titel: 'Exploitatielast niet hoger dan nu',
      criteriumSleutel: 'opex', richting: 'lager_is_beter', succesDrempel: null, hard: false,
      doel: 'De jaarlast stijgt niet ten opzichte van de huidige situatie.'
    }
  ];

  /* --- Criteria: label, eenheid, weergave ------------------------------ */
  var CRITERIA = {
    samenwerking: { label: 'Samenwerking gehonoreerd', uitleg: 'Aandeel vastgelegde nabijheidswensen dat in deze indeling wordt gehonoreerd.', toon: alsAandeel, stap: 0.05, min: 0, max: 1 },
    rust: { label: 'Rust & concentratie geborgd', uitleg: 'Aandeel scheidingswensen en rustbehoevende teams dat een eigen zone houdt.', toon: alsAandeel, stap: 0.05, min: 0, max: 1 },
    efficientie: { label: 'Aantal zones', uitleg: 'Aantal afzonderlijke zones in de indeling. Meer zones = meer beheerregimes.', toon: alsAantal, stap: 1, min: 1, max: 8 },
    onvervulde_harde_eisen: { label: 'Onvervulde harde randvoorwaarden', uitleg: 'Aantal harde eisen dat deze indeling structureel niet kan vervullen.', toon: alsAantal, stap: 1, min: 0, max: 6 },
    capex: { label: 'Investering (CapEx)', uitleg: 'Niet berekend: de kengetallen waarop dit zou rusten zijn nog concept.', toon: alsAantal, stap: 1, min: 0, max: 1 },
    opex: { label: 'Exploitatielast (OpEx)', uitleg: 'Niet berekend: de kengetallen waarop dit zou rusten zijn nog concept.', toon: alsAantal, stap: 1, min: 0, max: 1 }
  };

  /* --- Scenario's: namen exact uit STRATEGIE_META ----------------------- */
  var SCENARIO_META = [
    {
      id: 'samenwerking', naam: 'A · Maximale samenwerking',
      doel: 'Teams met hoge samenwerkingsintensiteit en gewenste of noodzakelijke nabijheid worden dicht bij elkaar geplaatst — co-locatie weegt het zwaarst.',
      aannames: [
        'Elke vastgelegde nabijheidswens leidt tot bundeling, ongeacht concentratiebehoefte — de bewuste extreme keuze van dit scenario.',
        'Een harde scheidingswens die tegen een nabijheidswens ingaat, wordt hier ondergeschikt gemaakt aan nabijheid en verschijnt als onvervulde harde eis.'
      ]
    },
    {
      id: 'efficientie', naam: 'B · Maximale efficiëntie',
      doel: 'Verdichten in gedeelde zones binnen de harde randvoorwaarden — zo min mogelijk aparte zones; alleen een harde scheidingseis dwingt een splitsing af.',
      aannames: [
        'Alleen een HARDE scheidingseis dwingt een aparte zone af; zachte voorkeuren voor rust worden hier bewust niet gehonoreerd.',
        'Gedeelde zones veronderstellen een deelbaar werkprofiel; teams met hoge focus- of vertrouwelijkheidsbehoefte houden hier een onvervulde zachte behoefte.'
      ]
    },
    {
      id: 'gebalanceerd', naam: 'C · Gebalanceerd',
      doel: 'Sterke samenwerking wordt gehonoreerd, maar teams met een uitgesproken concentratie- of vertrouwelijkheidsbehoefte houden een eigen, rustige zone.',
      aannames: [
        'Bundeling gebeurt alleen bij samenwerkingsintensiteit “hoog”; zwakkere nabijheidswensen leiden hier niet tot verdichting.',
        'Teams met veel focuswerk of vertrouwelijk werk houden een eigen zone, óók als er een samenwerkingswens is.'
      ]
    }
  ];

  /* Uitgangswaarden. CapEx/OpEx staan bewust op null — net als in het product,
     waar `scenarioWaarden()` ze hardcoded op `null` zet. */
  var MATEN_UITGANG = {
    samenwerking: { samenwerking: 1.00, rust: 0.25, efficientie: 3, onvervulde_harde_eisen: 2, capex: null, opex: null },
    efficientie: { samenwerking: 0.50, rust: 0.40, efficientie: 2, onvervulde_harde_eisen: 1, capex: null, opex: null },
    gebalanceerd: { samenwerking: 0.75, rust: 0.80, efficientie: 4, onvervulde_harde_eisen: 0, capex: null, opex: null }
  };
  /** Werkkopie die de kantelpunt-stap wijzigt. */
  var maten = JSON.parse(JSON.stringify(MATEN_UITGANG));

  /* --- Afgevallen en niet-onderzochte alternatieven --------------------- */
  var AFGEVALLEN = [
    { alt: 'Elk team een eigen zone', reden: 'Afgevallen: leidt tot zes beheerregimes; de vastgelegde nabijheidswensen tussen twee wijkteams worden dan geen van alle gehonoreerd.', soort: 'onderzocht' },
    { alt: 'Eén volledig open vloer zonder zonering', reden: 'Afgevallen: botst met de harde scheidingswens van het team met cliëntgebonden werk.', soort: 'onderzocht' },
    { alt: 'Bundelen van de twee wijkteams zonder eigen rustzone', reden: 'Afgevallen in scenario C: dat zou de vastgelegde concentratiebehoefte opofferen.', soort: 'onderzocht' },
    { alt: 'Verhuizen naar een andere locatie', reden: 'Niet onderzocht: valt buiten de vastgestelde scope van dit vraagstuk. Als het bestuur dit wil wegen, is een nieuwe intake nodig.', soort: 'niet onderzocht' },
    { alt: 'Verkleinen van het vloeroppervlak', reden: 'Niet onderzocht: vereist maatvaste plattegronden. Het intakeblok “Aanwezige plattegronden” staat op onbekend.', soort: 'niet onderzocht' }
  ];

  /* --- Metingen: bronbetrouwbaarheid + triangulatie --------------------- */
  var METINGEN = [
    {
      variabele: 'Bezettingsgraad hoofdlocatie (gemiddeld, werkdagen)',
      waarnemingen: [
        { label: 'Toegangsregistratie', waarde: '41%', assen: { dekking: 'hoog', directheid: 'proxy', actualiteit: 'hoog', ruisarm: 'midden' } },
        { label: 'Teamenquête onder leidinggevenden', waarde: '68%', assen: { dekking: 'midden', directheid: 'gesteld', actualiteit: 'midden', ruisarm: 'laag' } },
        { label: 'Fysieke telronde, twee weken', waarde: '47%', assen: { dekking: 'laag', directheid: 'gemeten', actualiteit: 'hoog', ruisarm: 'hoog' } }
      ],
      conflict: true,
      duiding:
        'Drie bronnen, drie waarden. Er wordt géén gemiddelde gemaakt. De enquête (68%) wijkt structureel ' +
        'af van beide observatiebronnen — een bekend patroon bij zelf-rapportage. Welke waarde leidend is, ' +
        'is een menselijk oordeel; het systeem legt alleen vast dat de bronnen elkaar tegenspreken.'
    },
    {
      variabele: 'Aantal gelijktijdige vertrouwelijke gesprekken (piek)',
      waarnemingen: [
        { label: 'Reserveringssysteem overlegruimten', waarde: '5', assen: { dekking: 'hoog', directheid: 'proxy', actualiteit: 'hoog', ruisarm: 'hoog' } }
      ],
      conflict: false,
      duiding:
        'Eén bron, geen tegenspraak — maar ook geen bevestiging. Een reservering is een proxy: hij bewijst ' +
        'dat een ruimte is geboekt, niet dat het gesprek heeft plaatsgevonden.'
    }
  ];

  /* --- Kengetallen: brontype in plaats van bronnaam --------------------- */
  var KENGETALLEN = [
    { sleutel: 'm² per fte (werkplek)', brontype: 'Openbare normbron', status: 'concept', inzetbaar: false, gevolg: 'Niet inzetbaar voor een berekening. Elke uitkomst die hierop zou rusten, blijft leeg.' },
    { sleutel: 'Energietarief per kWh', brontype: 'Marktindicatie', status: 'indicatief', inzetbaar: false, gevolg: 'Mag meewegen in de duiding, maar mag nooit een variant afvoeren.' },
    { sleutel: 'CO₂-factor per kWh', brontype: 'Publieke rekenfactor', status: 'concept', inzetbaar: false, gevolg: 'Niet inzetbaar; CO₂-effect wordt daarom niet becijferd.' },
    { sleutel: 'Energielabel-C-plicht kantoren ≥ 100 m²', brontype: 'Wettelijk bindend', status: 'gevalideerd', inzetbaar: true, gevolg: 'Mag een variant diskwalificeren. Raakt de hoofdlocatie.' },
    { sleutel: 'Energiebesparingsplicht (maatregelen met terugverdientijd ≤ 5 jaar)', brontype: 'Wettelijk bindend', status: 'gevalideerd', inzetbaar: true, gevolg: 'Mag een variant diskwalificeren. Rapportageronde 2027.' },
    { sleutel: 'Herziene Europese richtlijn energieprestatie gebouwen', brontype: 'Officiële publieke bron', status: 'juridisch nog te verifiëren', inzetbaar: false, gevolg: 'Wordt als context getoond, niet als poort gebruikt.' }
  ];

  var SIGNALEN = [
    { niveau: 'aandacht', kop: 'Bronconflict op de bezettingsgraad', tekst: 'Twee observatiebronnen en één zelf-rapportage lopen 27 procentpunt uiteen. Dit verdient nader onderzoek vóór het besluit onherroepelijk wordt.' },
    { niveau: 'aandacht', kop: 'Twee intakeblokken niet ingevuld', tekst: 'Zonder plattegronden blijft inpasbaarheid onbeoordeeld; zonder gewenste eindresultaten is het besluit later niet te evalueren.' },
    { niveau: 'hoog', kop: 'Twee belangen niet beoordeelbaar', tekst: 'CapEx en OpEx zijn per zone-indeling niet onderbouwd. Twee van de zeven belangen krijgen daardoor geen oordeel — geen enkel scenario is financieel gewogen.' },
    { niveau: 'neutraal', kop: 'Kennissignalen komen uit opgeslagen bronresponsen', tekst: 'De kennislaag draait op een fixture-collector. Er wordt geen bron live opgehaald; over netwerkgedrag zegt dit dus niets.' }
  ];

  /* --- Bewijs / audit --------------------------------------------------- */
  var AUDIT = [
    { t: '04-03-2026 09:41', actor: 'Adviseur (rol)', onderdeel: 'Intake', reden: 'Intake vastgelegd', vorig: '—', nieuw: '6 van 8 blokken onderbouwd', ref: 'a1c04f7e' },
    { t: '11-03-2026 14:07', actor: 'Adviseur (rol)', onderdeel: 'Belang b2 (rust)', reden: 'Gemarkeerd als harde randvoorwaarde', vorig: 'zacht', nieuw: 'hard', ref: '5b7d2290' },
    { t: '02-04-2026 11:22', actor: 'Systeem', onderdeel: 'Scorekaart', reden: 'CapEx/OpEx ontbreken in de scenariomaten', vorig: '—', nieuw: 'onvoldoende onderbouwd (2 belangen)', ref: '9e10ab34' },
    { t: '17-06-2026 16:55', actor: 'Adviseur (rol)', onderdeel: 'Meting bezettingsgraad', reden: 'Derde bron toegevoegd; conflict blijft zichtbaar', vorig: '2 bronnen', nieuw: '3 bronnen, conflict', ref: 'c33f0d81' },
    { t: '09-07-2026 08:30', actor: 'Bestuurder (rol)', onderdeel: 'Besluit', reden: 'Motivatie afgekeurd door de claimtoets', vorig: 'concept', nieuw: 'concept (geblokkeerd)', ref: '7fa5e6b2' }
  ];

  var DOSSIER_SECTIES = [
    'Onderzoeksvraag, scope en de dekking van de acht intakeblokken',
    'Stakeholders als rol, met hun belang, criterium en richting',
    'De scenario’s met hun aannames en afgevallen alternatieven',
    'De scorekaart per belang per scenario — zonder totaalscore en zonder winnaar',
    'De zichtbare belangenconflicten, ongemiddeld',
    'De ontbrekende informatie, met de reden van ontbreken',
    'De gebruikte kengetallen met brontype en governance-status',
    'Het besluit, de motivatie en de uitslag van de claimtoets',
    'Het vastleggingsspoor met keten-referentie per gebeurtenis',
    'De opvolgacties en het meetprofiel waarmee later wordt geëvalueerd'
  ];

  var CLAIMGRENZEN = [
    { kop: 'Functionele geschiktheid ≠ bouwkundige geschiktheid', tekst: 'Er wordt getoetst op ruimtetype-dekking, niet op inpasbaarheid of geometrie.' },
    { kop: 'Herleidbaar ≠ onweerlegbaar', tekst: 'Een reproduceerbare hash maakt herkomst herleidbaar. Wie zowel het item als de hash kan herschrijven, laat geen spoor na. Het integriteitsanker is een openstaand ontwerpbesluit.' },
    { kop: 'Testbewijs op de bestandsopslag ≠ databasebewijs', tekst: 'Op de meeste domeinen is het databasepad alleen gecompileerd, niet uitgevoerd.' },
    { kop: 'Beleidsregels in een migratie ≠ afgedwongen isolatie', tekst: 'Isolatieregels die in een migratie staan, zijn ontwerp. Runtime-gedrag is een aparte vraag.' },
    { kop: 'Bestaande tweede-factor-bouwstenen ≠ verificatie vóór een akkoord', tekst: 'Dat de bouwstenen er zijn, betekent niet dat een akkoord op elk pad een geslaagde verificatie vereist.' },
    { kop: 'Een meetprofiel kwalificeert de meting', tekst: 'Het vervangt geen onafhankelijke validatie van de meetketen zelf.' },
    { kop: 'Deze mock-up bewijst niets over het product', tekst: 'De rekenregels hier zijn nagebouwd uit de gepubliceerde regels. Nabouw is geen runtimebewijs.' }
  ];

  /* --- Vervolgstap ------------------------------------------------------ */
  var OPVOLGING = [
    { actie: 'Maatvaste plattegronden opvragen en koppelen', eigenaar: 'Facilitair management (rol)', termijn: '15-09-2026', status: 'open' },
    { actie: 'Gewenste eindresultaten vaststellen met het bestuur', eigenaar: 'Raad van bestuur (rol)', termijn: '30-09-2026', status: 'open' },
    { actie: 'Bezettingsmeting herhalen met één methode over acht weken', eigenaar: 'Adviseur (rol)', termijn: '01-11-2026', status: 'open' },
    { actie: 'CapEx/OpEx per zone-indeling laten ramen', eigenaar: 'Financiën / control (rol)', termijn: '01-11-2026', status: 'niet gestart' },
    { actie: 'Zonering opnieuw voorleggen aan de ondernemingsraad', eigenaar: 'Ondernemingsraad (rol)', termijn: '15-12-2026', status: 'niet gestart' }
  ];

  var RISICOS = [
    { naam: 'Harde scheidingswens blijft onvervuld in de gekozen indeling', kans: 3, impact: 5 },
    { naam: 'Investering valt buiten de kaderbrief doordat CapEx niet is geraamd', kans: 4, impact: 4 },
    { naam: 'Bezettingscijfer blijkt achteraf te hoog ingeschat', kans: 3, impact: 3 },
    { naam: 'Plattegronden blijken niet maatvast', kans: 2, impact: 3 },
    { naam: 'Draagvlak ondernemingsraad valt weg bij verdichting', kans: 2, impact: 4 }
  ];

  var MEETPROFIEL = {
    // Bewust een ZACHTE methode: het product sluit sensor-/realtimemeting als
    // invoer uit (grondwet P9 — observaties, interviews en tellingen zijn de
    // bron). De enum in de code kent 'sensor' wél als harde methode; die keuze
    // is hier niet gevolgd omdat een mock-up geen werkwijze mag suggereren die
    // het product principieel afwijst. Gevolg: 'betrouwbaar' is met deze
    // methode onbereikbaar, en dat is precies het punt.
    meetmethode: 'handmatige telling',
    hardeMethode: false,
    periode: '01-09-2026 t/m 26-10-2026',
    dekkingPct: 62,
    representativiteit: 'midden',
    ontbrekendeMeetmomenten: 4,
    piekwaarde: 78,
    gemetenWaarde: 47
  };

  var SPONSOR = {
    status: 'aangeboden — niet geaccordeerd',
    aangeboden: '09-07-2026 08:34',
    geldigTot: '16-07-2026 08:34',
    kanaal: 'persoonlijke, tijdelijke link (geen account nodig)',
    modus: 'akkoord met één klik'
  };

  /* ======================================================================
   * 2. NABOUW VAN DE PRODUCTREGELS
   * ====================================================================== */

  /* --- 2a. Afwegingsengine (belangen-afweging.ts) ----------------------- */
  var BAND_ONDERSTEUND = 0.67;
  var BAND_GEDEELTELIJK = 0.34;

  function bepaalGrenzen(belangen, scenarios) {
    var grenzen = {};
    var sleutels = {};
    belangen.forEach(function (b) { sleutels[b.criteriumSleutel] = true; });
    Object.keys(sleutels).forEach(function (sleutel) {
      var bekend = scenarios
        .map(function (s) { return s.waarden[sleutel]; })
        .filter(isGetal);
      grenzen[sleutel] = bekend.length > 0
        ? { min: Math.min.apply(null, bekend), max: Math.max.apply(null, bekend) }
        : null;
    });
    return grenzen;
  }

  function normaliseer(ruwe, grens, richting) {
    var range = grens.max - grens.min;
    var basis = range === 0 ? 0.5 : (ruwe - grens.min) / range;
    return richting === 'hoger_is_beter' ? basis : 1 - basis;
  }

  function oordeelUitBand(g) {
    if (g >= BAND_ONDERSTEUND) return 'ondersteund';
    if (g >= BAND_GEDEELTELIJK) return 'gedeeltelijk';
    return 'niet';
  }

  function beoordeelBelangScenario(belang, scenario, grens) {
    var ruwe = scenario.waarden[belang.criteriumSleutel];
    if (!isGetal(ruwe) || grens === null) {
      return {
        scenarioId: scenario.id,
        oordeel: 'onvoldoende_onderbouwd',
        bewijs: { ruwe: isGetal(ruwe) ? ruwe : null, genormaliseerd: null, drempelGehaald: null },
        ontbrekendeInformatie: true
      };
    }
    var g = normaliseer(ruwe, grens, belang.richting);
    if (isGetal(belang.succesDrempel)) {
      var gehaald = belang.richting === 'hoger_is_beter'
        ? ruwe >= belang.succesDrempel
        : ruwe <= belang.succesDrempel;
      return {
        scenarioId: scenario.id,
        oordeel: gehaald ? 'ondersteund' : 'niet',
        bewijs: { ruwe: ruwe, genormaliseerd: g, drempelGehaald: gehaald },
        ontbrekendeInformatie: false
      };
    }
    var band = oordeelUitBand(g);
    var oordeel = (belang.hard && band === 'gedeeltelijk') ? 'niet' : band;
    return {
      scenarioId: scenario.id,
      oordeel: oordeel,
      bewijs: { ruwe: ruwe, genormaliseerd: g, drempelGehaald: null },
      ontbrekendeInformatie: false
    };
  }

  function ruweBijBand(band, grens, richting) {
    var range = grens.max - grens.min;
    var basis = richting === 'hoger_is_beter' ? band : 1 - band;
    return grens.min + basis * range;
  }

  function bepaalKantel(belang, perScenario, grens) {
    var onderbouwd = perScenario.filter(function (p) { return p.bewijs.genormaliseerd !== null; });
    if (onderbouwd.length === 0) return null;
    var lead = onderbouwd.slice().sort(function (a, b) {
      var d = (b.bewijs.genormaliseerd || 0) - (a.bewijs.genormaliseerd || 0);
      return d !== 0 ? d : (a.scenarioId < b.scenarioId ? -1 : a.scenarioId > b.scenarioId ? 1 : 0);
    })[0];
    var huidigeWaarde = lead.bewijs.ruwe;
    var richtingOmhoog = belang.richting === 'hoger_is_beter';
    if (isGetal(belang.succesDrempel)) {
      return { scenarioId: lead.scenarioId, criteriumSleutel: belang.criteriumSleutel, huidigeWaarde: huidigeWaarde, drempel: belang.succesDrempel, richtingOmhoog: richtingOmhoog };
    }
    if (grens === null || grens.max === grens.min) {
      return { scenarioId: lead.scenarioId, criteriumSleutel: belang.criteriumSleutel, huidigeWaarde: huidigeWaarde, drempel: null, richtingOmhoog: richtingOmhoog };
    }
    var norm = lead.bewijs.genormaliseerd;
    var grensband = norm >= BAND_ONDERSTEUND ? BAND_ONDERSTEUND : BAND_GEDEELTELIJK;
    return {
      scenarioId: lead.scenarioId,
      criteriumSleutel: belang.criteriumSleutel,
      huidigeWaarde: huidigeWaarde,
      drempel: ruweBijBand(grensband, grens, belang.richting),
      richtingOmhoog: richtingOmhoog
    };
  }

  function ondersteundeSet(u) {
    var s = {};
    u.perScenario.forEach(function (p) { if (p.oordeel === 'ondersteund') s[p.scenarioId] = true; });
    return s;
  }

  function detecteerConflicten(belangen, uitkomsten) {
    var conflicten = [];
    var byId = {};
    uitkomsten.forEach(function (u) { byId[u.belangId] = u; });
    for (var i = 0; i < belangen.length; i++) {
      for (var j = i + 1; j < belangen.length; j++) {
        var a = belangen[i], b = belangen[j];
        var ua = byId[a.id], ub = byId[b.id];
        if (a.criteriumSleutel === b.criteriumSleutel && a.richting !== b.richting) {
          conflicten.push({
            soort: 'tegengestelde_richting',
            belangA: a.id, belangB: b.id,
            stakeholderA: a.stakeholderId, stakeholderB: b.stakeholderId,
            criteriumA: a.criteriumSleutel, criteriumB: b.criteriumSleutel,
            scenarioIds: []
          });
          continue;
        }
        var setA = ondersteundeSet(ua), setB = ondersteundeSet(ub);
        var kA = Object.keys(setA), kB = Object.keys(setB);
        if (kA.length === 0 || kB.length === 0) continue;
        var gedeeld = kA.some(function (id) { return !!setB[id]; });
        if (!gedeeld) {
          conflicten.push({
            soort: 'geen_gedeeld_scenario',
            belangA: a.id, belangB: b.id,
            stakeholderA: a.stakeholderId, stakeholderB: b.stakeholderId,
            criteriumA: a.criteriumSleutel, criteriumB: b.criteriumSleutel,
            scenarioIds: kA.sort()
          });
        }
      }
    }
    return conflicten;
  }

  function weegBelangen(belangenInput, scenarios) {
    var belangen = belangenInput.slice().sort(function (a, b) {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    var grenzen = bepaalGrenzen(belangen, scenarios);
    var uitkomsten = belangen.map(function (belang) {
      var grens = grenzen[belang.criteriumSleutel] || null;
      var perScenario = scenarios.map(function (s) { return beoordeelBelangScenario(belang, s, grens); });
      return {
        belangId: belang.id,
        stakeholderId: belang.stakeholderId,
        criteriumSleutel: belang.criteriumSleutel,
        richting: belang.richting,
        hard: belang.hard === true,
        heeftDrempel: isGetal(belang.succesDrempel),
        perScenario: perScenario,
        kantel: bepaalKantel(belang, perScenario, grens)
      };
    });
    var onvolledigeData = uitkomsten.some(function (u) {
      return u.perScenario.some(function (p) { return p.ontbrekendeInformatie; });
    });
    return {
      scenarioIds: scenarios.map(function (s) { return s.id; }),
      belangen: uitkomsten,
      conflicten: detecteerConflicten(belangen, uitkomsten),
      onvolledigeData: onvolledigeData
    };
  }

  /* --- 2b. Bronbetrouwbaarheid (bronbetrouwbaarheid.ts) ----------------- */
  var NIVEAU_RANG = { laag: 0, midden: 1, hoog: 2 };
  var DIRECTHEID_NIVEAU = { gemeten: 'hoog', proxy: 'midden', gesteld: 'laag' };
  var DIRECTHEID_TOELICHTING = {
    gemeten: 'gemeten gedrag',
    proxy: 'proxy (toegangsregistratie/reservering), niet het gedrag zelf',
    gesteld: 'zelf-gerapporteerd (interview/enquête), geen gemeten gedrag'
  };
  var AS_REDEN = {
    dekking: 'beperkte dekking (te weinig meetmomenten of tijdvakspreiding)',
    actualiteit: 'beperkte actualiteit (data mogelijk verouderd)',
    ruisarm: 'meetruis (subjectiviteit of definitie-afhankelijkheid)'
  };

  function scoorBron(assen) {
    var lijst = [
      { as: 'dekking', niveau: assen.dekking },
      { as: 'directheid', niveau: DIRECTHEID_NIVEAU[assen.directheid] },
      { as: 'actualiteit', niveau: assen.actualiteit },
      { as: 'ruisarm', niveau: assen.ruisarm }
    ];
    var laagste = lijst[0];
    lijst.forEach(function (a) {
      if (NIVEAU_RANG[a.niveau] < NIVEAU_RANG[laagste.niveau]) laagste = a;
    });
    var label = laagste.as === 'directheid'
      ? laagste.niveau + ' — begrensd door directheid (' + DIRECTHEID_TOELICHTING[assen.directheid] + ')'
      : laagste.niveau + ' — begrensd door ' + AS_REDEN[laagste.as];
    return { niveau: laagste.niveau, bepalendeAs: laagste.as, onzekerheidslabel: label };
  }

  /* --- 2c. Besluit-guard (besluit-guard.ts + default-policy.ts) --------- */
  var MOTIVATIE_MIN_TEKENS = 20;
  var FORBIDDEN_CLAIMS = [
    'volledig compliant', 'auditproof', 'foutloos', 'juridisch geborgd',
    'gegarandeerd correct', 'definitief oordeel', 'geen risico',
    'systeem bewijst naleving', 'veilig', 'tenant-isolatie bewezen',
    'productie-rijp', 'pilot-acceptabel'
  ];

  /** Grensbewuste match, zodat "veiligheid" niet als "veilig" telt. */
  function bevatTerm(tekst, term) {
    var t = tekst.toLowerCase();
    var idx = t.indexOf(term);
    while (idx !== -1) {
      var voor = idx === 0 ? '' : t.charAt(idx - 1);
      var na = t.charAt(idx + term.length);
      var woordVoor = /[a-z0-9]/.test(voor);
      var woordNa = /[a-z0-9]/.test(na);
      if (!woordVoor && !woordNa) return true;
      idx = t.indexOf(term, idx + 1);
    }
    return false;
  }

  function toetsBesluit(invoer) {
    var redenen = [];
    if (!invoer.scenarioId || invoer.geldigeScenarioIds.indexOf(invoer.scenarioId) === -1) {
      redenen.push({ code: 'scenario_ongeldig', boodschap: 'Kies een geldig scenario voor het besluit.' });
    }
    var motivatie = (invoer.motivatie || '').trim();
    if (motivatie.length === 0) {
      redenen.push({ code: 'motivatie_leeg', boodschap: 'Een besluit vereist een motivatie.' });
    } else {
      if (motivatie.length < MOTIVATIE_MIN_TEKENS) {
        redenen.push({
          code: 'motivatie_te_summier',
          boodschap: 'De motivatie is te summier om het besluit later te kunnen reconstrueren. ' +
            'Beschrijf waarop de keuze rust en welke afweging is gemaakt.'
        });
      }
      FORBIDDEN_CLAIMS.forEach(function (term) {
        if (bevatTerm(motivatie, term)) {
          redenen.push({
            code: 'overclaim',
            boodschap: 'Motivatie bevat een niet-onderbouwde claim ("' + term + '"). Herformuleer bewijsgebonden.'
          });
        }
      });
    }
    return { toegestaan: redenen.length === 0, redenen: redenen };
  }

  /* --- 2d. Risico (risico-engine.ts) ------------------------------------ */
  function risicoScore(kans, impact) {
    return Math.max(1, Math.min(25, kans * impact));
  }
  function risicoNiveau(score) {
    if (score >= 15) return 'hoog';
    if (score >= 6) return 'middel';
    return 'laag';
  }

  /* --- 2e. Meetprofiel (meetprofiel.ts) --------------------------------- */
  function beoordeelMeetprofiel(p) {
    var redenen = [];
    var dekkingHoog = isGetal(p.dekkingPct) && p.dekkingPct >= 80;
    var dekkingLaag = isGetal(p.dekkingPct) && p.dekkingPct < 50;
    var repHoog = p.representativiteit === 'hoog' || p.representativiteit === 'midden';
    var veelOntbrekend = isGetal(p.ontbrekendeMeetmomenten) && p.ontbrekendeMeetmomenten > 0;

    if (!isGetal(p.dekkingPct)) redenen.push('Meetdekking niet opgegeven.');
    else if (dekkingLaag) redenen.push('Lage meetdekking (' + p.dekkingPct + '%).');
    if (p.representativiteit === 'onbekend') redenen.push('Representativiteit niet beoordeeld.');
    else if (p.representativiteit === 'laag') redenen.push('Lage representativiteit van de meting.');
    if (veelOntbrekend) redenen.push(p.ontbrekendeMeetmomenten + ' ontbrekende meetmoment(en) in de periode.');
    if (!p.periode) redenen.push('Meetperiode niet opgegeven.');

    var niveau;
    if (p.meetmethode === 'onbekend') { niveau = 'onvoldoende onderbouwd'; redenen.unshift('Geen meetmethode opgegeven — geen herleidbare meetketen.'); }
    else if (p.meetmethode === 'schatting') { niveau = 'zwak'; redenen.unshift('Waarde is een schatting/aanname, geen meting.'); }
    else if (p.hardeMethode && dekkingHoog && repHoog && !veelOntbrekend && p.periode) niveau = 'betrouwbaar';
    else if (dekkingLaag || !repHoog) niveau = 'zwak';
    else niveau = 'redelijk';

    var spreiding = (isGetal(p.piekwaarde) && isGetal(p.gemetenWaarde) && p.gemetenWaarde > 0 && p.piekwaarde > p.gemetenWaarde * 1.5)
      ? 'Piek (' + p.piekwaarde + ') ligt ruim boven het gemiddelde (' + p.gemetenWaarde + '); stuur niet op het gemiddelde alleen.'
      : null;

    return { niveau: niveau, redenen: redenen, spreiding: spreiding };
  }

  /* ======================================================================
   * 3. AFGELEIDE STAAT
   * ====================================================================== */

  var OORDEEL_LABEL = {
    ondersteund: 'Ondersteund',
    gedeeltelijk: 'Gedeeltelijk',
    niet: 'Niet',
    onvoldoende_onderbouwd: 'Onvoldoende onderbouwd'
  };
  var OORDEEL_KLASSE = {
    ondersteund: 'ondersteund',
    gedeeltelijk: 'gedeeltelijk',
    niet: 'niet',
    onvoldoende_onderbouwd: 'onbekend'
  };

  function scenarioInvoer() {
    return SCENARIO_META.map(function (s) {
      return { id: s.id, waarden: maten[s.id] };
    });
  }
  function scenarioNaam(id) {
    for (var i = 0; i < SCENARIO_META.length; i++) if (SCENARIO_META[i].id === id) return SCENARIO_META[i].naam;
    return id;
  }
  function belangById(id) {
    for (var i = 0; i < BELANGEN.length; i++) if (BELANGEN[i].id === id) return BELANGEN[i];
    return null;
  }
  function stakeholderRol(id) {
    for (var i = 0; i < STAKEHOLDERS.length; i++) if (STAKEHOLDERS[i].id === id) return STAKEHOLDERS[i].rol;
    return '—';
  }
  function criteriumLabel(sleutel) {
    return CRITERIA[sleutel] ? CRITERIA[sleutel].label : sleutel;
  }
  function toonWaarde(sleutel, v) {
    return CRITERIA[sleutel] ? CRITERIA[sleutel].toon(v) : alsAantal(v);
  }

  var kaart = null;
  function herbereken() {
    kaart = weegBelangen(BELANGEN, scenarioInvoer());
  }

  /* ======================================================================
   * 4. RENDER
   * ====================================================================== */

  /* --- 4.0 De 1-minuutlaag --------------------------------------------- */
  function renderKern() {
    var ingevuld = INTAKE.blokken.filter(function (b) { return b.aanwezig; }).length;
    var totaal = INTAKE.blokken.length;

    var onbeoordeelbaar = kaart.belangen.filter(function (u) {
      return u.perScenario.every(function (p) { return p.oordeel === 'onvoldoende_onderbouwd'; });
    });

    // Scenario dat de meeste belangen ondersteunt (louter beschrijvend — geen advies).
    var telling = {};
    kaart.scenarioIds.forEach(function (id) { telling[id] = 0; });
    kaart.belangen.forEach(function (u) {
      u.perScenario.forEach(function (p) { if (p.oordeel === 'ondersteund') telling[p.scenarioId]++; });
    });
    var beste = kaart.scenarioIds.slice().sort(function (a, b) {
      return telling[b] - telling[a] || (a < b ? -1 : 1);
    })[0];

    // Scherpste kantelpunt: het belang waarvan de leidende beoordeling het dichtst bij zijn
    // omslagwaarde ligt. Belangen die al exact ÓP de grens staan krijgen een eigen formulering —
    // "kantelt bij 0" zegt een bestuurder niets, "staat al op de grens" wel.
    var scherpste = null;
    var opDeGrens = null;
    kaart.belangen.forEach(function (u) {
      if (!u.kantel || u.kantel.drempel === null) return;
      var afstand = Math.abs(u.kantel.huidigeWaarde - u.kantel.drempel);
      if (afstand === 0) {
        if (opDeGrens === null) opDeGrens = u;
        return;
      }
      var bereik = Math.abs(u.kantel.huidigeWaarde) || 1;
      var rel = afstand / bereik;
      if (scherpste === null || rel < scherpste.rel) scherpste = { u: u, rel: rel };
    });

    var hardeOnvervuld = kaart.belangen.filter(function (u) {
      return u.hard && u.perScenario.some(function (p) { return p.oordeel === 'niet'; });
    }).length;

    zet('kern-antwoord',
      'Dit advies steunt op ' + esc(ingevuld) + ' van ' + esc(totaal) + ' onderbouwde intakeblokken en op ' +
      esc(BELANGEN.length) + ' vastgelegde belangen van ' + esc(STAKEHOLDERS.length) + ' partijen. ' +
      'Het breekt op twee plekken: ' + esc(onbeoordeelbaar.length) + ' belang(en) zijn helemaal niet te ' +
      'beoordelen omdat de onderliggende maat ontbreekt, en ' + esc(kaart.conflicten.length) + ' belangenparen ' +
      'kunnen niet tegelijk worden vervuld. Er is <b>geen scenario dat alle belangen ondersteunt</b>, en ' +
      'het systeem wijst er ook geen aan.'
    );

    var tegels = [
      {
        klasse: 'steun', lbl: 'Waarop het steunt',
        v: ingevuld + ' / ' + totaal,
        toel: 'onderbouwde intakeblokken. Twee blokken staan als “niet ingevuld” gemarkeerd en blijven zichtbaar.'
      },
      {
        klasse: 'breuk', lbl: 'Waar het breekt',
        v: kaart.conflicten.length + ' conflict' + (kaart.conflicten.length === 1 ? '' : 'en'),
        toel: 'belangenparen die niet tegelijk maximaal vervuld kunnen worden. Ze worden getoond, niet weggemiddeld.'
      },
      {
        klasse: 'let-op', lbl: 'Grootste gat',
        v: onbeoordeelbaar.length + ' belang' + (onbeoordeelbaar.length === 1 ? '' : 'en'),
        toel: 'zonder enig oordeel: CapEx en OpEx zijn per zone-indeling niet onderbouwd. Geen scenario is financieel gewogen.'
      },
      {
        klasse: 'bewijs', lbl: 'Meeste belangen ondersteund',
        v: scenarioNaam(beste).split(' · ')[0] + ' — ' + telling[beste] + ' van ' + kaart.belangen.length,
        toel: 'beschrijvend, geen aanbeveling. Er is geen totaalscore en geen “beste scenario”.'
      },
      {
        klasse: hardeOnvervuld > 0 ? 'breuk' : 'steun', lbl: 'Harde randvoorwaarden',
        v: hardeOnvervuld + ' onvervuld',
        toel: hardeOnvervuld > 0
          ? 'minstens één scenario vervult een als hard gemarkeerde randvoorwaarde niet.'
          : 'geen enkele als hard gemarkeerde randvoorwaarde blijft in alle scenario’s onvervuld.'
      },
      opDeGrens
        ? {
            klasse: 'breuk', lbl: 'Meest breekbare oordeel',
            v: 'op de grens',
            toel: '“' + criteriumLabel(opDeGrens.criteriumSleutel) + '” staat in ' +
              scenarioNaam(opDeGrens.kantel.scenarioId).split(' · ')[0] + ' exact op de drempel (' +
              toonWaarde(opDeGrens.criteriumSleutel, opDeGrens.kantel.drempel) +
              '). Eén stap de verkeerde kant op en dat oordeel kantelt.'
          }
        : {
            klasse: 'let-op', lbl: 'Scherpste kantelpunt',
            v: scherpste ? toonWaarde(scherpste.u.criteriumSleutel, scherpste.u.kantel.drempel) : '—',
            toel: scherpste
              ? 'bij deze waarde van “' + criteriumLabel(scherpste.u.criteriumSleutel) + '” kantelt het oordeel over ' +
                scenarioNaam(scherpste.u.kantel.scenarioId).split(' · ')[0] + '.'
              : 'geen bepaalbaar kantelpunt.'
          }
    ];

    zet('kern-tiles', tegels.map(function (t) {
      return '<div class="tile ' + t.klasse + '">' +
        '<span class="lbl">' + esc(t.lbl) + '</span>' +
        '<div class="v num">' + esc(t.v) + '</div>' +
        '<div class="toel">' + esc(t.toel) + '</div></div>';
    }).join(''));
  }

  /* --- 4.1 Intake ------------------------------------------------------- */
  function renderIntake() {
    zet('intake-vraag',
      '<b>Onderzoeksvraag.</b> ' + esc(INTAKE.vraag) +
      '<br><br><b>Scope.</b> ' + esc(INTAKE.scope));

    var ingevuld = INTAKE.blokken.filter(function (b) { return b.aanwezig; }).length;
    zet('intake-dekking',
      esc(ingevuld) + ' van ' + esc(INTAKE.blokken.length) + ' fundamentblokken onderbouwd. ' +
      'De intake is daarmee <b>niet compleet</b>; dat blijft in elke volgende stap zichtbaar.');

    zet('intake-blokken', '<div class="tabelwrap"><table><thead><tr>' +
      '<th>Fundamentblok</th><th>Status</th><th>Toelichting</th></tr></thead><tbody>' +
      INTAKE.blokken.map(function (b) {
        return '<tr><td class="rij">' + esc(b.label) + '</td>' +
          '<td><span class="badge ' + (b.aanwezig ? 'ondersteund' : 'onbekend') + '">' +
          (b.aanwezig ? 'Onderbouwd' : 'Onvoldoende onderbouwing — niet ingevuld') + '</span></td>' +
          '<td>' + esc(b.toel) + '</td></tr>';
      }).join('') + '</tbody></table></div>');

    // #stakeholders IS het <table>-element; alleen thead+tbody invullen.
    zet('stakeholders', '<thead><tr><th>Rol</th><th>Belang</th><th>Criterium</th><th>Voorkeursrichting</th><th>Hard?</th></tr></thead><tbody>' +
      BELANGEN.map(function (b) {
        return '<tr>' +
          '<td class="rij">' + esc(stakeholderRol(b.stakeholderId)) + '</td>' +
          '<td>' + esc(b.titel) + '<div class="fijn">' + esc(b.doel) + '</div></td>' +
          '<td>' + esc(criteriumLabel(b.criteriumSleutel)) + '</td>' +
          '<td>' + (b.richting === 'hoger_is_beter' ? 'hoger is beter' : 'lager is beter') +
          (isGetal(b.succesDrempel) ? '<div class="fijn">harde drempel: ' + esc(b.succesDrempel) + '</div>' : '') + '</td>' +
          '<td>' + (b.hard ? '<span class="badge niet">hard</span>' : '<span class="badge neutraal">zacht</span>') + '</td>' +
          '</tr>';
      }).join('') + '</tbody>');
  }

  /* --- 4.2 Scenario's --------------------------------------------------- */
  function renderScenarios() {
    var sleutels = ['samenwerking', 'rust', 'efficientie', 'onvervulde_harde_eisen', 'capex', 'opex'];
    var html = '<thead><tr><th>Onderdeel</th>' +
      SCENARIO_META.map(function (s) { return '<th>' + esc(s.naam) + '</th>'; }).join('') +
      '</tr></thead><tbody>';

    html += '<tr><td class="rij">Doel van deze variant</td>' +
      SCENARIO_META.map(function (s) { return '<td class="fijn">' + esc(s.doel) + '</td>'; }).join('') + '</tr>';

    sleutels.forEach(function (sleutel) {
      var c = CRITERIA[sleutel];
      var beschikbaar = SCENARIO_META.some(function (s) { return isGetal(maten[s.id][sleutel]); });
      html += '<tr><td class="rij">' + esc(c.label) +
        '<div class="fijn">' + esc(c.uitleg) + '</div></td>' +
        SCENARIO_META.map(function (s) {
          var v = maten[s.id][sleutel];
          if (!isGetal(v)) {
            return '<td class="mid"><span class="badge onbekend">niet berekend</span></td>';
          }
          return '<td class="mid num">' + esc(c.toon(v)) + '</td>';
        }).join('') + '</tr>';
      if (!beschikbaar) {
        html += '<tr><td colspan="' + (SCENARIO_META.length + 1) + '" class="fijn">' +
          'Reden: de kengetallen waarop dit onderdeel zou rusten, zijn nog concept en daarmee niet inzetbaar. ' +
          'Er wordt geen aanname ingevuld om het gat te dichten.</td></tr>';
      }
    });

    html += '<tr><td class="rij">Aannames van deze variant</td>' +
      SCENARIO_META.map(function (s) {
        return '<td class="fijn"><ul style="margin:0;padding-left:16px">' +
          s.aannames.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></td>';
      }).join('') + '</tr>';

    html += '</tbody>';
    var el = document.getElementById('scenariotabel');
    if (el) el.innerHTML = html;

    var nietRankbaar = kaart.belangen.filter(function (u) {
      return u.perScenario.every(function (p) { return p.oordeel === 'onvoldoende_onderbouwd'; });
    }).length;
    zet('rankbaar-melding',
      '<span class="kop">Deze vergelijking is onvolledig — en dat blijft zo staan</span>' +
      esc(nietRankbaar) + ' van de ' + esc(BELANGEN.length) + ' belangen kan op géén enkel scenario worden ' +
      'beoordeeld, omdat CapEx en OpEx per zone-indeling niet zijn onderbouwd. Een rangorde over alle ' +
      'belangen heen bestaat daarom niet, en er wordt er ook geen getoond.');

    zet('mag-wel', [
      'Drie varianten naast elkaar zetten op onderdelen die vergelijkbaar zijn.',
      'Per variant tonen wélke aannames zijn gemaakt en welke alternatieven zijn afgevallen.',
      'Zichtbaar maken welke harde randvoorwaarden een variant structureel niet kan vervullen.',
      'Een gat als gat tonen, met de reden erbij.'
    ].map(function (t) { return '<li>' + esc(t) + '</li>'; }).join(''));

    zet('mag-niet', [
      'Een gat vullen met een aanname of een marktgemiddelde.',
      'De onderdelen optellen tot één eindcijfer per variant.',
      'Een “beste scenario” of aanbeveling aanwijzen.',
      'Een variant afvoeren op grond van een marktindicatie — dat mag alleen op een wettelijke bron.',
      'Een bouwkundige of geometrische inpasbaarheidsuitspraak doen; die is hier niet getoetst.'
    ].map(function (t) { return '<li>' + esc(t) + '</li>'; }).join(''));
  }

  /* --- 4.3 Scorekaart --------------------------------------------------- */
  function renderScorekaart() {
    zet('sk-uitleg',
      'Elke cel is een oordeel van één belang over één scenario — <b>geen cijfer en geen gewicht</b>. ' +
      'Zonder harde drempel volgt het oordeel uit een richting-bewuste normalisatie over de bekende ' +
      'waarden, met bandgrenzen op ' + komma(BAND_ONDERSTEUND) + ' en ' + komma(BAND_GEDEELTELIJK) + '. ' +
      'Een als <b>hard</b> gemarkeerd belang kent geen “gedeeltelijk”: het is ondersteund of niet.');

    var html = '<thead><tr><th>Belang (rol)</th>' +
      kaart.scenarioIds.map(function (id) { return '<th>' + esc(scenarioNaam(id)) + '</th>'; }).join('') +
      '<th>Kantelt bij</th></tr></thead><tbody>';

    kaart.belangen.forEach(function (u) {
      var b = belangById(u.belangId);
      html += '<tr><td class="rij">' + esc(b.titel) +
        '<div class="fijn">' + esc(stakeholderRol(u.stakeholderId)) + ' · ' + esc(criteriumLabel(u.criteriumSleutel)) +
        (u.hard ? ' · <b>hard</b>' : '') + '</div></td>';
      u.perScenario.forEach(function (p) {
        html += '<td class="mid"><span class="badge ' + OORDEEL_KLASSE[p.oordeel] + '">' +
          esc(OORDEEL_LABEL[p.oordeel]) + '</span>' +
          (isGetal(p.bewijs.ruwe) ? '<div class="fijn num">' + esc(toonWaarde(u.criteriumSleutel, p.bewijs.ruwe)) + '</div>' : '') +
          '</td>';
      });
      html += '<td class="fijn">' + (u.kantel && u.kantel.drempel !== null
        ? esc(scenarioNaam(u.kantel.scenarioId).split(' · ')[0]) + ' kantelt bij ' +
          esc(toonWaarde(u.criteriumSleutel, u.kantel.drempel))
        : 'niet bepaalbaar') + '</td></tr>';
    });
    html += '</tbody>';
    var el = document.getElementById('scorekaart');
    if (el) el.innerHTML = html;
  }

  function vulKiezers() {
    var selB = document.getElementById('sel-belang');
    var selS = document.getElementById('sel-scenario');
    if (selB && !selB.options.length) {
      selB.innerHTML = kaart.belangen.map(function (u) {
        var b = belangById(u.belangId);
        return '<option value="' + esc(u.belangId) + '">' + esc(b.titel) + ' — ' + esc(stakeholderRol(u.stakeholderId)) + '</option>';
      }).join('');
    }
    if (selS && !selS.options.length) {
      selS.innerHTML = kaart.scenarioIds.map(function (id) {
        return '<option value="' + esc(id) + '">' + esc(scenarioNaam(id)) + '</option>';
      }).join('');
    }
  }

  function renderBewijs() {
    var selB = document.getElementById('sel-belang');
    var selS = document.getElementById('sel-scenario');
    if (!selB || !selS) return;
    var belangId = selB.value, scenarioId = selS.value;
    var u = null;
    kaart.belangen.forEach(function (x) { if (x.belangId === belangId) u = x; });
    if (!u) return;
    var p = null;
    u.perScenario.forEach(function (x) { if (x.scenarioId === scenarioId) p = x; });
    if (!p) return;

    var b = belangById(belangId);
    var regels = [];
    regels.push(['Belang', b.titel + ' (' + stakeholderRol(u.stakeholderId) + ')']);
    regels.push(['Criterium', criteriumLabel(u.criteriumSleutel)]);
    regels.push(['Voorkeursrichting', u.richting === 'hoger_is_beter' ? 'hoger is beter' : 'lager is beter']);
    regels.push(['Harde randvoorwaarde', u.hard ? 'ja — geen “gedeeltelijk” mogelijk' : 'nee']);
    regels.push(['Ruwe waarde in dit scenario', isGetal(p.bewijs.ruwe) ? toonWaarde(u.criteriumSleutel, p.bewijs.ruwe) : 'ontbreekt']);

    if (p.oordeel === 'onvoldoende_onderbouwd') {
      regels.push(['Genormaliseerd', 'niet berekend']);
      regels.push(['Uitkomst', 'Onvoldoende onderbouwd — de maat ontbreekt voor dit scenario']);
    } else if (u.heeftDrempel) {
      regels.push(['Harde succesdrempel', String(b.succesDrempel)]);
      regels.push(['Drempel gehaald', p.bewijs.drempelGehaald ? 'ja' : 'nee']);
      regels.push(['Uitkomst', OORDEEL_LABEL[p.oordeel] + ' — rechtstreeks uit de drempel, niet uit een band']);
    } else {
      regels.push(['Genormaliseerd (0–1, hoger = beter)', komma(p.bewijs.genormaliseerd)]);
      regels.push(['Bandgrenzen', '≥ ' + komma(BAND_ONDERSTEUND) + ' ondersteund · ≥ ' + komma(BAND_GEDEELTELIJK) + ' gedeeltelijk · daaronder niet']);
      regels.push(['Uitkomst', OORDEEL_LABEL[p.oordeel] +
        (u.hard && oordeelUitBand(p.bewijs.genormaliseerd) === 'gedeeltelijk'
          ? ' — de band gaf “gedeeltelijk”, maar dit belang is hard, dus wordt het “niet”' : '')]);
    }

    zet('sk-bewijs',
      '<div class="tabelwrap"><table><tbody>' +
      regels.map(function (r) {
        return '<tr><td class="rij" style="width:38%">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' +
      '<div class="bron"><span class="lbl">Waar dit vandaan komt</span>' +
      'De normalisatie loopt over de <b>bekende</b> waarden van alle scenario’s op dit criterium. ' +
      'Ontbreekt de waarde, dan wordt er niet geïnterpoleerd — het oordeel wordt dan ' +
      '“onvoldoende onderbouwd”. Er is geen verborgen weging en geen tussenstap.</div>');
  }

  function renderOntbreekt() {
    var items = [];
    kaart.belangen.forEach(function (u) {
      var ontbrekend = u.perScenario.filter(function (p) { return p.ontbrekendeInformatie; });
      if (ontbrekend.length === 0) return;
      var b = belangById(u.belangId);
      items.push({
        kop: b.titel + ' — ' + stakeholderRol(u.stakeholderId),
        tekst: 'Geen oordeel op ' + ontbrekend.length + ' van de ' + u.perScenario.length + ' scenario’s. ' +
          'Ontbrekende maat: ' + criteriumLabel(u.criteriumSleutel) + '. ' + CRITERIA[u.criteriumSleutel].uitleg
      });
    });
    INTAKE.blokken.filter(function (b) { return !b.aanwezig; }).forEach(function (b) {
      items.push({ kop: 'Intakeblok “' + b.label + '” niet ingevuld', tekst: b.toel });
    });

    if (items.length === 0) {
      zet('sk-ontbreekt', '<div class="melding neutraal">Geen ontbrekende informatie gesignaleerd.</div>');
      return;
    }
    zet('sk-ontbreekt', items.map(function (i) {
      return '<div class="melding aandacht"><span class="kop">' + esc(i.kop) + '</span>' + esc(i.tekst) + '</div>';
    }).join('') +
      '<div class="uitleg">Ontbrekende informatie verdwijnt niet uit beeld en wordt niet vervangen door ' +
      'een aanname. Zolang deze regels hier staan, is de onderbouwing incompleet.</div>');
  }

  /* --- 4.4 Conflicten en alternatieven ---------------------------------- */
  function renderConflicten() {
    if (kaart.conflicten.length === 0) {
      zet('conflicten', '<div class="melding neutraal">Geen botsende belangen gedetecteerd bij de huidige waarden.</div>');
      return;
    }
    var uitleg = {
      tegengestelde_richting: 'Structureel conflict: beide belangen hangen aan dezelfde maat, met tegengestelde voorkeur. Elke winst voor de een is per definitie verlies voor de ander. Geen indeling lost dit op.',
      geen_gedeeld_scenario: 'Er is geen enkel scenario dat beide belangen ondersteunt. Kiezen betekent hier: één van beide partijen krijgt zijn belang niet gehonoreerd.'
    };
    zet('conflicten', kaart.conflicten.map(function (c) {
      var a = belangById(c.belangA), b = belangById(c.belangB);
      var klasse = c.soort === 'tegengestelde_richting' ? 'hoog' : 'aandacht';
      return '<div class="melding ' + klasse + '">' +
        '<span class="kop">' + esc(stakeholderRol(c.stakeholderA)) + ' ↔ ' + esc(stakeholderRol(c.stakeholderB)) + '</span>' +
        '<b>' + esc(a.titel) + '</b> tegenover <b>' + esc(b.titel) + '</b>.<br>' +
        esc(uitleg[c.soort]) +
        (c.scenarioIds.length
          ? '<div class="fijn">Ondersteunt alleen het eerste belang: ' +
            esc(c.scenarioIds.map(scenarioNaam).join(', ')) + '</div>'
          : '') +
        '</div>';
    }).join('') +
      '<div class="uitleg">Het systeem kiest niet wie voorgaat. Dit is een bestuurlijke afweging; ' +
      'de vastlegging ervan is stap 7.</div>');
  }

  function renderAfgevallen() {
    var el = document.getElementById('afgevallen');
    if (!el) return;
    el.innerHTML = '<thead><tr><th>Alternatief</th><th>Soort</th><th>Reden</th></tr></thead><tbody>' +
      AFGEVALLEN.map(function (a) {
        return '<tr><td class="rij">' + esc(a.alt) + '</td>' +
          '<td><span class="badge ' + (a.soort === 'onderzocht' ? 'neutraal' : 'onbekend') + '">' + esc(a.soort) + '</span></td>' +
          '<td>' + esc(a.reden) + '</td></tr>';
      }).join('') + '</tbody>';
  }

  /* --- 4.5 Onzekerheden ------------------------------------------------- */
  function renderMetingen() {
    zet('metingen', METINGEN.map(function (m) {
      var rijen = m.waarnemingen.map(function (w) {
        var score = scoorBron(w.assen);
        return '<tr>' +
          '<td class="rij">' + esc(w.label) + '</td>' +
          '<td class="mid num">' + esc(w.waarde) + '</td>' +
          '<td>' + esc(w.assen.dekking) + '</td>' +
          '<td>' + esc(w.assen.directheid) + '</td>' +
          '<td>' + esc(w.assen.actualiteit) + '</td>' +
          '<td>' + esc(w.assen.ruisarm) + '</td>' +
          '<td><span class="badge ' + (score.niveau === 'hoog' ? 'ondersteund' : score.niveau === 'midden' ? 'gedeeltelijk' : 'niet') + '">' +
          esc(score.niveau) + '</span><div class="fijn">bepalende as: ' + esc(score.bepalendeAs) + '</div></td>' +
          '<td class="fijn">' + esc(score.onzekerheidslabel) + '</td>' +
          '</tr>';
      }).join('');
      return '<div style="margin-bottom:20px">' +
        '<div class="lbl">' + esc(m.variabele) + '</div>' +
        '<div class="tabelwrap"><table><thead><tr>' +
        '<th>Bron</th><th>Waarde</th><th>Dekking</th><th>Directheid</th><th>Actualiteit</th><th>Ruisarm</th><th>Betrouwbaarheid</th><th>Waarom begrensd</th>' +
        '</tr></thead><tbody>' + rijen + '</tbody></table></div>' +
        '<div class="melding ' + (m.conflict ? 'aandacht' : 'neutraal') + '" style="margin-top:12px">' +
        '<span class="kop">' + (m.conflict ? 'Bronnen spreken elkaar tegen — geen samengevoegde waarde' : 'Eén bron — geen tegenspraak, ook geen bevestiging') + '</span>' +
        esc(m.duiding) + '</div></div>';
    }).join(''));
  }

  function renderKengetallen() {
    var el = document.getElementById('kengetallen');
    if (!el) return;
    el.innerHTML = '<thead><tr><th>Kengetal</th><th>Brontype</th><th>Status</th><th>Wat dat betekent</th></tr></thead><tbody>' +
      KENGETALLEN.map(function (k) {
        return '<tr><td class="rij">' + esc(k.sleutel) + '</td>' +
          '<td>' + esc(k.brontype) + '</td>' +
          '<td><span class="badge ' + (k.inzetbaar ? 'ondersteund' : 'onbekend') + '">' + esc(k.status) + '</span></td>' +
          '<td class="fijn">' + esc(k.gevolg) + '</td></tr>';
      }).join('') + '</tbody>';
  }

  function renderSignalen() {
    zet('signalen', SIGNALEN.map(function (s) {
      return '<div class="melding ' + esc(s.niveau) + '">' +
        '<span class="kop">' + esc(s.kop) + '</span>' + esc(s.tekst) + '</div>';
    }).join('') +
      '<div class="nietgebouwd"><span class="lbl">Wat de kennislaag hier niet doet</span>' +
      'De collector haalt geen bron live op. Hij leest opgeslagen bronresponsen. Alles wat zich op de ' +
      'netwerkrand afspeelt — naamresolutie, omleidingen, time-outs, responsgrootte — is nooit uitgevoerd ' +
      'en dus onbewezen. De impact-duiding is indicatief op trefwoorden; een mens beslist over relevantie.</div>');
  }

  /* --- 4.6 Kantelpunt --------------------------------------------------- */
  var KNOPPEN = [
    { scenario: 'samenwerking', sleutel: 'samenwerking' },
    { scenario: 'gebalanceerd', sleutel: 'rust' },
    { scenario: 'efficientie', sleutel: 'efficientie' },
    { scenario: 'gebalanceerd', sleutel: 'onvervulde_harde_eisen' }
  ];

  function renderKnoppen() {
    var el = document.getElementById('knoppen-invoer');
    if (!el || el.dataset.gevuld === 'ja') { syncKnoppen(); return; }
    el.innerHTML = KNOPPEN.map(function (k, i) {
      var c = CRITERIA[k.sleutel];
      return '<label class="veld"><span class="lbl">' +
        esc(scenarioNaam(k.scenario).split(' · ')[0]) + ' · ' + esc(c.label) + '</span>' +
        '<input type="number" id="knop-' + i + '" data-i="' + i + '" min="' + c.min + '" max="' + c.max +
        '" step="' + c.stap + '" value="' + maten[k.scenario][k.sleutel] + '"></label>';
    }).join('');
    el.dataset.gevuld = 'ja';
    $$('#knoppen-invoer input').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var k = KNOPPEN[+inp.dataset.i];
        var v = parseFloat(inp.value);
        if (!isGetal(v)) return;
        var c = CRITERIA[k.sleutel];
        if (v < c.min) v = c.min;
        if (v > c.max) v = c.max;
        maten[k.scenario][k.sleutel] = v;
        tekenAlles();
      });
    });
  }

  function syncKnoppen() {
    KNOPPEN.forEach(function (k, i) {
      var inp = document.getElementById('knop-' + i);
      if (inp) inp.value = maten[k.scenario][k.sleutel];
    });
  }

  function renderKantelpunten() {
    var rijen = kaart.belangen.filter(function (u) { return u.kantel !== null; });
    if (rijen.length === 0) {
      zet('kantelpunten', '<div class="melding neutraal">Geen bepaalbaar kantelpunt bij de huidige waarden.</div>');
      return;
    }
    zet('kantelpunten', '<div class="tabelwrap"><table><thead><tr>' +
      '<th>Belang</th><th>Leidend scenario</th><th>Huidige waarde</th><th>Kantelt bij</th><th>Richting</th>' +
      '</tr></thead><tbody>' +
      rijen.map(function (u) {
        var b = belangById(u.belangId);
        return '<tr><td class="rij">' + esc(b.titel) +
          '<div class="fijn">' + esc(criteriumLabel(u.criteriumSleutel)) + '</div></td>' +
          '<td>' + esc(scenarioNaam(u.kantel.scenarioId)) + '</td>' +
          '<td class="num">' + esc(toonWaarde(u.criteriumSleutel, u.kantel.huidigeWaarde)) + '</td>' +
          '<td class="num">' + (u.kantel.drempel === null ? 'niet bepaalbaar' : esc(toonWaarde(u.criteriumSleutel, u.kantel.drempel))) + '</td>' +
          '<td class="fijn">' + (u.kantel.richtingOmhoog ? 'omhoog is beter' : 'omlaag is beter') +
          (u.heeftDrempel ? ' · harde drempel' : ' · bandgrens') + '</td></tr>';
      }).join('') + '</tbody></table></div>');
  }

  /* --- 4.7 Besluit ------------------------------------------------------ */
  function renderBewijsstatus() {
    var ingevuld = INTAKE.blokken.filter(function (b) { return b.aanwezig; }).length;
    var onbeoordeelbaar = kaart.belangen.filter(function (u) {
      return u.perScenario.every(function (p) { return p.oordeel === 'onvoldoende_onderbouwd'; });
    }).length;
    var conflictBronnen = METINGEN.filter(function (m) { return m.conflict; }).length;

    var punten = [
      { ok: false, t: 'Intake: ' + ingevuld + ' van ' + INTAKE.blokken.length + ' fundamentblokken onderbouwd.' },
      { ok: false, t: onbeoordeelbaar + ' belang(en) zonder enig oordeel — CapEx en OpEx zijn niet onderbouwd.' },
      { ok: false, t: kaart.conflicten.length + ' zichtbaar belangenconflict(en); geen scenario ondersteunt alles.' },
      { ok: false, t: conflictBronnen + ' meetvariabele(n) met bronconflict, niet opgelost.' },
      { ok: true, t: 'Alle aannames per scenario zijn expliciet vastgelegd.' },
      { ok: true, t: 'Afgevallen én niet-onderzochte alternatieven zijn vastgelegd met reden.' },
      { ok: true, t: 'Elk oordeel in de scorekaart is herleidbaar tot een ruwe waarde en een bandgrens.' }
    ];
    zet('bewijsstatus', punten.map(function (p) {
      return '<div class="melding ' + (p.ok ? 'neutraal' : 'aandacht') + '">' +
        '<span class="badge ' + (p.ok ? 'ondersteund' : 'gedeeltelijk') + '">' + (p.ok ? 'aanwezig' : 'aandacht') + '</span> ' +
        esc(p.t) + '</div>';
    }).join('') +
      '<div class="uitleg">Deze lijst blokkeert het besluit niet. Een bestuurder mag besluiten met open ' +
      'punten — het systeem zorgt alleen dat die punten in het dossier staan en niet stilzwijgend verdwijnen.</div>');
  }

  function vulBesluitKeuze() {
    var sel = document.getElementById('besluit-scenario');
    if (!sel || sel.options.length) return;
    sel.innerHTML = '<option value="">— kies een scenario —</option>' +
      SCENARIO_META.map(function (s) {
        return '<option value="' + esc(s.id) + '">' + esc(s.naam) + '</option>';
      }).join('');
  }

  function toonGuard(res, scenarioId) {
    var el = document.getElementById('guard-uitslag');
    if (!el) return;
    if (res.toegestaan) {
      el.innerHTML = '<div class="melding neutraal"><span class="kop">Vastlegging toegestaan</span>' +
        'De claimtoets keurt deze motivatie goed voor ' + esc(scenarioNaam(scenarioId)) + '. ' +
        'In het product zou hier een besluitconcept worden weggeschreven met een keten-referentie. ' +
        'In deze mock-up wordt niets opgeslagen.</div>';
      return;
    }
    el.innerHTML = '<div class="melding hoog"><span class="kop">Vastlegging geblokkeerd — ' +
      esc(res.redenen.length) + ' reden(en)</span><ul style="margin:6px 0 0;padding-left:18px">' +
      res.redenen.map(function (r) {
        return '<li><b>' + esc(r.code) + '</b> — ' + esc(r.boodschap) + '</li>';
      }).join('') + '</ul></div>';
  }

  function renderSponsor() {
    zet('sponsor',
      '<div class="tabelwrap"><table><tbody>' +
      [['Status', SPONSOR.status],
       ['Aangeboden op', SPONSOR.aangeboden],
       ['Link geldig tot', SPONSOR.geldigTot],
       ['Kanaal', SPONSOR.kanaal],
       ['Modus', SPONSOR.modus]].map(function (r) {
        return '<tr><td class="rij" style="width:34%">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="melding aandacht" style="margin-top:12px">' +
      '<span class="kop">Er is geen akkoord — en dat is hier het punt</span>' +
      'Zolang de sponsor niet heeft geaccordeerd, staat het besluit als concept. Het dossier toont dat ' +
      'als ontbrekend draagvlak, niet als formaliteit.</div>');
  }

  /* --- 4.8 Bewijs -------------------------------------------------------- */
  function renderAudit() {
    var el = document.getElementById('audit');
    if (!el) return;
    el.innerHTML = '<thead><tr><th>Tijdstip</th><th>Actor (rol)</th><th>Onderdeel</th><th>Reden</th>' +
      '<th>Vorige waarde</th><th>Nieuwe waarde</th><th>Keten-referentie</th></tr></thead><tbody>' +
      AUDIT.map(function (a) {
        return '<tr><td class="num">' + esc(a.t) + '</td><td>' + esc(a.actor) + '</td>' +
          '<td>' + esc(a.onderdeel) + '</td><td>' + esc(a.reden) + '</td>' +
          '<td>' + esc(a.vorig) + '</td><td>' + esc(a.nieuw) + '</td>' +
          '<td class="num fijn">' + esc(a.ref) + '…</td></tr>';
      }).join('') + '</tbody>';
  }

  function renderDossier() {
    zet('dossier-secties', DOSSIER_SECTIES.map(function (s) {
      return '<li>' + esc(s) + '</li>';
    }).join(''));

    zet('claimgrenzen', CLAIMGRENZEN.map(function (c) {
      return '<div class="melding neutraal"><span class="kop">' + esc(c.kop) + '</span>' + esc(c.tekst) + '</div>';
    }).join(''));
  }

  /* --- 4.9 Vervolgstap --------------------------------------------------- */
  function renderOpvolging() {
    var el = document.getElementById('opvolging');
    if (!el) return;
    el.innerHTML = '<thead><tr><th>Actie</th><th>Eigenaar</th><th>Termijn</th><th>Status</th></tr></thead><tbody>' +
      OPVOLGING.map(function (o) {
        return '<tr><td class="rij">' + esc(o.actie) + '</td><td>' + esc(o.eigenaar) + '</td>' +
          '<td class="num">' + esc(o.termijn) + '</td>' +
          '<td><span class="badge ' + (o.status === 'open' ? 'gedeeltelijk' : 'onbekend') + '">' + esc(o.status) + '</span></td></tr>';
      }).join('') + '</tbody>';
  }

  function renderMonitoring() {
    var gesorteerd = RISICOS.map(function (r) {
      var score = risicoScore(r.kans, r.impact);
      return { naam: r.naam, kans: r.kans, impact: r.impact, score: score, niveau: risicoNiveau(score) };
    }).sort(function (a, b) { return b.score - a.score; });

    zet('monitoring', '<div class="tabelwrap"><table><thead><tr>' +
      '<th>Risico</th><th>Kans</th><th>Impact</th><th>Score</th><th>Niveau</th></tr></thead><tbody>' +
      gesorteerd.map(function (r) {
        return '<tr><td class="rij">' + esc(r.naam) + '</td>' +
          '<td class="mid num">' + esc(r.kans) + '</td><td class="mid num">' + esc(r.impact) + '</td>' +
          '<td class="mid num">' + esc(r.score) + '</td>' +
          '<td><span class="badge ' + (r.niveau === 'hoog' ? 'niet' : r.niveau === 'middel' ? 'gedeeltelijk' : 'neutraal') + '">' +
          esc(r.niveau) + '</span></td></tr>';
      }).join('') + '</tbody></table></div>');
  }

  function renderEvaluatie() {
    var oordeel = beoordeelMeetprofiel(MEETPROFIEL);
    var klasse = oordeel.niveau === 'betrouwbaar' ? 'ondersteund'
      : oordeel.niveau === 'redelijk' ? 'gedeeltelijk'
      : oordeel.niveau === 'zwak' ? 'niet' : 'onbekend';

    zet('evaluatie',
      '<div class="tabelwrap"><table><tbody>' +
      [['Meetmethode', MEETPROFIEL.meetmethode],
       ['Meetperiode', MEETPROFIEL.periode],
       ['Meetdekking', MEETPROFIEL.dekkingPct + '%'],
       ['Representativiteit', MEETPROFIEL.representativiteit],
       ['Ontbrekende meetmomenten', String(MEETPROFIEL.ontbrekendeMeetmomenten)],
       ['Gemeten waarde / piek', MEETPROFIEL.gemetenWaarde + ' / ' + MEETPROFIEL.piekwaarde]].map(function (r) {
        return '<tr><td class="rij" style="width:34%">' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="melding ' + (oordeel.niveau === 'betrouwbaar' ? 'neutraal' : 'aandacht') + '" style="margin-top:12px">' +
      '<span class="kop">Betrouwbaarheid van deze meting: <span class="badge ' + klasse + '">' + esc(oordeel.niveau) + '</span></span>' +
      (oordeel.redenen.length
        ? '<ul style="margin:6px 0 0;padding-left:18px">' + oordeel.redenen.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>'
        : 'Geen beperkingen gesignaleerd.') +
      (oordeel.spreiding ? '<div class="fijn" style="margin-top:6px">' + esc(oordeel.spreiding) + '</div>' : '') +
      '</div>');

    zet('herijking',
      '<div class="uitleg"><b>Herijking.</b> Een gemeten resultaat opent een nieuwe cyclus: de meting ' +
      'kwalificeert zichzelf (methode, periode, dekking, representativiteit), en die kwalificatie bepaalt ' +
      'hoe zwaar het resultaat mag wegen bij het herzien van het besluit. Een zwakke meting mag geen ' +
      'besluit omdraaien — hij mag wel een herbeoordeling aanvragen.</div>');
  }

  /* ======================================================================
   * 5. NAVIGATIE, TOAST, INIT
   * ====================================================================== */

  var toastEl, toastTimer;
  function toast(msg) {
    toastEl = toastEl || document.getElementById('toast');
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('zicht');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('zicht'); }, 3200);
  }

  function gaNaarStap(id) {
    $$('.tab').forEach(function (t) {
      t.setAttribute('aria-selected', t.dataset.stap === id ? 'true' : 'false');
    });
    $$('.stap').forEach(function (s) {
      s.classList.toggle('actief', s.id === id);
    });
  }

  /** Alles wat van de scenariomaten afhangt, opnieuw tekenen. */
  function tekenAlles() {
    herbereken();
    renderKern();
    renderScenarios();
    renderScorekaart();
    vulKiezers();
    renderBewijs();
    renderOntbreekt();
    renderConflicten();
    renderKantelpunten();
    renderBewijsstatus();
  }

  function init() {
    herbereken();

    // Statisch (hangt niet van de kantelpunt-invoer af)
    renderIntake();
    renderAfgevallen();
    renderMetingen();
    renderKengetallen();
    renderSignalen();
    renderSponsor();
    renderAudit();
    renderDossier();
    renderOpvolging();
    renderMonitoring();
    renderEvaluatie();
    vulBesluitKeuze();
    renderKnoppen();

    // Dynamisch
    tekenAlles();

    // Navigatie
    $$('.tab').forEach(function (t) {
      t.addEventListener('click', function () { gaNaarStap(t.dataset.stap); });
    });

    // Scorekaart-bewijs
    ['sel-belang', 'sel-scenario'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', renderBewijs);
    });

    // Kantelpunt
    var reset = document.getElementById('reset');
    if (reset) reset.addEventListener('click', function () {
      maten = JSON.parse(JSON.stringify(MATEN_UITGANG));
      syncKnoppen();
      tekenAlles();
      toast('Terug naar de uitgangswaarden.');
    });

    // Besluit
    var knopVast = document.getElementById('vastleggen');
    var mot = document.getElementById('motivatie');
    var selScenario = document.getElementById('besluit-scenario');
    function toets() {
      var res = toetsBesluit({
        scenarioId: selScenario ? selScenario.value : '',
        geldigeScenarioIds: SCENARIO_META.map(function (s) { return s.id; }),
        motivatie: mot ? mot.value : ''
      });
      toonGuard(res, selScenario ? selScenario.value : '');
      toast(res.toegestaan ? 'Claimtoets: geen bezwaar.' : 'Claimtoets blokkeert de vastlegging.');
    }
    if (knopVast) knopVast.addEventListener('click', toets);

    var knopOver = document.getElementById('probeer-overclaim');
    if (knopOver) knopOver.addEventListener('click', function () {
      if (selScenario) selScenario.value = 'gebalanceerd';
      if (mot) mot.value = 'Wij kiezen scenario C. Deze indeling is juridisch geborgd en er is geen risico ' +
        'voor de organisatie; de onderbouwing is foutloos.';
      toets();
    });

    var knopKort = document.getElementById('probeer-summier');
    if (knopKort) knopKort.addEventListener('click', function () {
      if (selScenario) selScenario.value = 'gebalanceerd';
      if (mot) mot.value = 'Akkoord.';
      toets();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
