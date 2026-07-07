(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var LANG="nl";
function L(o){return (o && typeof o==="object" && o.nl!=null) ? (o[LANG]!=null?o[LANG]:o.nl) : o;}

/* ---------- statische UI-teksten ---------- */
var UI={
 nl:{demo:"Mock-up · demodata","opdracht.title":"Opdracht · Wijkverpleging","opdracht.since":"loopt sinds feb 2026",
  perspectief:"Perspectief","persp.og":"Opdrachtgever","persp.on":"Opdrachtnemer","persp.im":"Intermediair","persp.ac":"Accountant","persp.ju":"Jurist",
  "w1.tab":"Scenario","w1.q":"Wat verandert er?","w2.tab":"Regie Navigator","w2.q":"Waar blijkt dit uit?","w3.tab":"Regie","w3.q":"Wat doe ik nu?",
  "w1.params":"Parameters","f.tarief":"Uurtarief (€)","f.uren":"Uren per week","f.loop":"Looptijd (mnd)","f.idx":"Indexatie (%)","f.werktijden":"Werktijden (feitelijk kenmerk)",
  "wt.vrij":"Vrij te bepalen","wt.og":"Door opdrachtgever","scen.save":"Opslaan als scenario","scen.cmp":"Vergelijken","k.maand":"Per maand","k.jaar":"Per jaar",
  "w1.echt":"Wat verandert er écht?","lever.money":"<b>Financiële hefbomen</b> — tarief, uren, looptijd. Bewegen de opdrachtwaarde.",
  "lever.fact":"<b>Feitelijke hefbomen</b> — werktijden, vervanging. Bewegen de <b>onderbouwing</b>, niet het geld.",
  "decouple.default":"Een hoger tarief verandert de opdrachtwaarde — maar <b>niets</b> aan gezag, vervanging of bewijs.",
  "nav.onderbouwd":"onderwerpen onderbouwd","nav.open":"open vragen","nav.missing":"bewijsstukken ontbreken",
  "nav.hint":"Klik een onderwerp voor “Waar blijkt dit uit?” — feit, bron, URL, opgehaald op, bewijs, actie.",
  "th.onderwerp":"Onderwerp","th.feiten":"Feiten bekend","th.bron":"Bron","th.bewijs":"Bewijs","th.aandacht":"Aandacht",
  "nav.noverdict":"Geen oordeel, geen score, geen “groen = veilig”. Alleen: wat is bekend, waaruit blijkt het, en wat ontbreekt.",
  "wet.tab":"Wetgeving","wet.q":"Waar volgt dit uit?","wet.intro":"Waar de beoordeling op steunt — actuele wet, beleid, jurisprudentie, handreikingen en aankomende regelgeving. Elke bevinding volgt uit een aanwijsbare, gemonitorde bron. Geen oordeel, wel herleidbaarheid.","wet.norms":"Toepasselijke regelgeving","wet.onderbouwt":"Onderbouwt","jur.tab":"Jurisprudentie","jur.q":"Welke uitspraken raken dit?","jur.intro":"Deze jurisprudentie ondersteunt het beoordelingskader, maar FlexCare neemt geen rechterlijk oordeel over. Geen overclaim — wel herleidbaarheid naar de gezichtspunten.","jur.cases":"Relevante uitspraken en lijnen","jur.principe":"Juridisch principe","jur.gezicht":"Gezichtspunten","jur.impact":"Impact op beoordeling","jur.relfeit":"Relatie met dossierfeit","jur.relnorm":"Relatie met norm","evi.volgtjur":"Volgt uit (jurisprudentie)","evi.herkomst":"Herkomst feit","evi.betrouw":"Betrouwbaarheid","evi.onzeker":"Onzekerheid","evi.controle":"Aanbevolen menselijke controle",
  "bron.title":"Bronnen","mon.title":"Bronmonitor","mon.demo":"[DEMO] bronmonitoring gesimuleerd — geen echte scraping.","mon.act":"Herbeoordeling aanmaken",
  "w3.intro":"Regie: acties, besluit en vastlegging. Het besluit is een gevolg, geen apart eiland.",
  "acties.title":"Acties","besluit.title":"Besluit — waarop rust mijn keuze?","opt.verlengen":"Verlengen","opt.beeindigen":"Beëindigen","opt.herzien":"Herzien","opt.aanhouden":"Aanhouden",
  "besluit.basis":"Waarop rust deze keuze? — feiten, geen advies","besluit.reason":"Toelichting bij dit besluit (optioneel) — wordt vastgelegd in het auditspoor",
  "besluit.commit":"Vastleggen als beslissing","val.concept":"Conceptconclusie (FlexCare)","val.concept-status":"Concept — nog niet gevalideerd","val.concl":"Onderbouwing onvolledig (8/10). Open vragen op Gezag en Vervanging. FlexCare structureert en onderbouwt; het oordeel is aan de mens.","val.onz":"Onzekerheid: middel — 2 open vragen, 1 bron gewijzigd.","val.kies":"Kies validatorrol…","val.jurist":"Jurist","val.compliance":"Compliance officer","val.btn":"Menselijke validatie vastleggen","val.disc":"FlexCare signaleert, structureert en onderbouwt — het neemt geen juridisch besluit.","audit.title":"Auditspoor",
  "dos.tab":"Dossier","dos.q":"Controleklaar overzicht","dos.title":"Controleklaar dossier — Wijkverpleging · A. Bakker [DEMO]","dos.samenvatting":"Managementsamenvatting: onderbouwing grotendeels compleet, met openstaande punten op gezag en vervanging. FlexCare structureert feiten, normen, bronnen en acties; het oordeel blijft menselijk.","dos.onderbouwd":"Onderbouwd","dos.validatie":"Menselijke validatie","dos.rode":"Rode vlaggen / aandacht","dos.positief":"Positieve signalen","dos.ontbrekend":"Ontbrekende informatie","dos.normen":"Normenkader","dos.bronnen":"Bronlijst","dos.juris":"Jurisprudentie","dos.acties":"Openstaande acties","dos.audit":"Auditspoor","dos.disclaimer":"FlexCare ondersteunt aantoonbare beoordeling en regievoering. FlexCare vervangt geen rechterlijk oordeel, belastingcontrole of juridisch advies.","dos.export":"Exporteren (PDF)","dos.exporttoast":"[DEMO] Dossier-export gegenereerd — auditregel toegevoegd.",
  foot:"Interactieve mock-up met demodata — geen echt dossier, geen juridische informatie. FlexCare · Decision Support.",
  "evi.feit":"Feit","evi.bron":"Bron","evi.url":"Bron-URL","evi.opgehaald":"Opgehaald op","evi.bewijs":"Bewijsstuk","evi.ontbreekt":"Ontbrekende informatie","evi.actie":"Actie","evi.volgtuit":"Volgt uit (regelgeving)",
  "src.opgehaald":"opgehaald op","src.voor":"relevant voor"},
 en:{demo:"Mock-up · demo data","opdracht.title":"Assignment · Community nursing","opdracht.since":"running since Feb 2026",
  perspectief:"Perspective","persp.og":"Client","persp.on":"Contractor","persp.im":"Intermediary","persp.ac":"Accountant","persp.ju":"Lawyer",
  "w1.tab":"Scenario","w1.q":"What changes?","w2.tab":"Governance Navigator","w2.q":"How is this evidenced?","w3.tab":"Governance","w3.q":"What do I do now?",
  "w1.params":"Parameters","f.tarief":"Hourly rate (€)","f.uren":"Hours per week","f.loop":"Duration (months)","f.idx":"Indexation (%)","f.werktijden":"Working hours (factual element)",
  "wt.vrij":"Freely determined","wt.og":"Set by client","scen.save":"Save as scenario","scen.cmp":"Compare","k.maand":"Per month","k.jaar":"Per year",
  "w1.echt":"What actually changes?","lever.money":"<b>Financial levers</b> — rate, hours, duration. Move the contract value.",
  "lever.fact":"<b>Factual levers</b> — working hours, substitution. Move the <b>evidence</b>, not the money.",
  "decouple.default":"A higher rate changes the contract value — but <b>nothing</b> about authority, substitution or evidence.",
  "nav.onderbouwd":"topics evidenced","nav.open":"open questions","nav.missing":"evidence items missing",
  "nav.hint":"Click a topic for “How is this evidenced?” — fact, source, URL, retrieved on, evidence, action.",
  "th.onderwerp":"Topic","th.feiten":"Facts known","th.bron":"Source","th.bewijs":"Evidence","th.aandacht":"Attention",
  "nav.noverdict":"No verdict, no score, no “green = safe”. Only: what is known, how it is evidenced, and what is missing.",
  "wet.tab":"Legislation","wet.q":"What does this follow from?","wet.intro":"What the assessment rests on — current law, policy, case law, guidance and upcoming legislation. Every finding follows from an identifiable, monitored source. No verdict, but traceability.","wet.norms":"Applicable legislation","wet.onderbouwt":"Substantiates","jur.tab":"Case law","jur.q":"Which rulings touch this?","jur.intro":"This case law supports the assessment framework, but FlexCare does not take over a court's judgment. No overclaim — but traceability to the viewpoints.","jur.cases":"Relevant rulings and lines","jur.principe":"Legal principle","jur.gezicht":"Viewpoints","jur.impact":"Impact on assessment","jur.relfeit":"Relation to case fact","jur.relnorm":"Relation to norm","evi.volgtjur":"Follows from (case law)","evi.herkomst":"Fact provenance","evi.betrouw":"Reliability","evi.onzeker":"Uncertainty","evi.controle":"Recommended human check",
  "bron.title":"Sources","mon.title":"Source monitor","mon.demo":"[DEMO] source monitoring simulated — no real scraping.","mon.act":"Create re-assessment",
  "w3.intro":"Governance: actions, decision and recording. The decision is a consequence, not a separate island.",
  "acties.title":"Actions","besluit.title":"Decision — what does my choice rest on?","opt.verlengen":"Extend","opt.beeindigen":"End","opt.herzien":"Revise","opt.aanhouden":"Hold",
  "besluit.basis":"What does this choice rest on? — facts, not advice","besluit.reason":"Note on this decision (optional) — recorded in the audit trail",
  "besluit.commit":"Record as decision","val.concept":"Draft conclusion (FlexCare)","val.concept-status":"Draft — not yet validated","val.concl":"Substantiation incomplete (8/10). Open questions on Authority and Substitution. FlexCare structures and substantiates; the judgment is the human's.","val.onz":"Uncertainty: medium — 2 open questions, 1 source changed.","val.kies":"Choose validator role…","val.jurist":"Lawyer","val.compliance":"Compliance officer","val.btn":"Record human validation","val.disc":"FlexCare signals, structures and substantiates — it does not take a legal decision.","audit.title":"Audit trail",
  "dos.tab":"File","dos.q":"Audit-ready overview","dos.title":"Audit-ready file — Community nursing · A. Bakker [DEMO]","dos.samenvatting":"Management summary: substantiation largely complete, with open points on authority and substitution. FlexCare structures facts, norms, sources and actions; the judgment remains human.","dos.onderbouwd":"Substantiated","dos.validatie":"Human validation","dos.rode":"Red flags / attention","dos.positief":"Positive signals","dos.ontbrekend":"Missing information","dos.normen":"Legal framework","dos.bronnen":"Source list","dos.juris":"Case law","dos.acties":"Open actions","dos.audit":"Audit trail","dos.disclaimer":"FlexCare supports demonstrable assessment and governance. FlexCare does not replace a court judgment, tax audit or legal advice.","dos.export":"Export (PDF)","dos.exporttoast":"[DEMO] File export generated — audit entry added.",
  foot:"Interactive mock-up with demo data — no real file, no legal information. FlexCare · Decision Support.",
  "evi.feit":"Fact","evi.bron":"Source","evi.url":"Source URL","evi.opgehaald":"Retrieved on","evi.bewijs":"Evidence item","evi.ontbreekt":"Missing information","evi.actie":"Action","evi.volgtuit":"Follows from (legislation)",
  "src.opgehaald":"retrieved on","src.voor":"relevant to"}
};

var LABELS={og:{nl:"Totale investering",en:"Total investment"},on:{nl:"Totale omzet",en:"Total revenue"},
 im:{nl:"Totale opdrachtwaarde",en:"Total contract value"},ac:{nl:"Contractwaarde",en:"Contract value"},ju:{nl:"Vergoeding",en:"Remuneration"}};
var TYPE={wet:{nl:"Wet",en:"Law"},beleid:{nl:"Beleid",en:"Policy"},juris:{nl:"Jurisprudentie",en:"Case law"},intern:{nl:"Intern document",en:"Internal document"},none:{nl:"—",en:"—"}};

var TILES=[
 {k:{nl:"Status opdracht",en:"Assignment status"},v:{nl:"Actie nodig",en:"Action needed"},c:"att"},
 {k:{nl:"Onderbouwing",en:"Substantiation"},v:{nl:"Onvolledig · 8/10",en:"Incomplete · 8/10"},c:"att"},
 {k:{nl:"Open acties",en:"Open actions"},v:{nl:"3",en:"3"},c:""},
 {k:{nl:"Bewijs ontbreekt",en:"Evidence missing"},v:{nl:"3 stukken",en:"3 items"},c:"miss"},
 {k:{nl:"Laatste broncheck",en:"Last source check"},v:{nl:"6 jul 2026",en:"6 Jul 2026"},c:""},
 {k:{nl:"Herbeoordeling",en:"Re-assessment"},v:{nl:"Gepland · 48 dgn",en:"Planned · 48 days"},c:""}
];
var CHANGE={vrij:{nl:"Belangrijkste wijziging: bron ‘Handreiking Belastingdienst’ is bijgewerkt sinds de vorige beoordeling.",
  en:"Key change: source ‘Belastingdienst guidance’ was updated since the last assessment."},
 og:{nl:"Belangrijkste wijziging: werktijden gewijzigd → raakt onderwerp ‘Gezag’ (nu een open vraag).",
  en:"Key change: working hours changed → affects ‘Authority’ (now an open question)."}};

var GEZAG={
 vrij:{st:"full",stl:{nl:"Bekend",en:"Known"},bwB:"ok",bw:{nl:"✓ contract art. 4",en:"✓ contract art. 4"},aB:"neutral",aT:{nl:"—",en:"—"},
   feit:{nl:"Werktijden vrij te bepalen door de zelfstandige",en:"Working hours freely set by the contractor"},
   ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"},url:"https://www.rechtspraak.nl",opg:"2 apr 2026",type:"juris",
   herkomst:{nl:"Contract art. 4",en:"Contract art. 4"},betrouw:{nl:"Hoog",en:"High"},onzeker:{nl:"Laag",en:"Low"},controle:{nl:"Nee",en:"No"}},
 og:{st:"part",stl:{nl:"Gewijzigd",en:"Changed"},bwB:"miss",bw:{nl:"✗ nog geen bewijs",en:"✗ no evidence yet"},aB:"open",aT:{nl:"open vraag",en:"open question"},
   feit:{nl:"Werktijden worden door de opdrachtgever bepaald",en:"Working hours are set by the client"},
   ontbr:{nl:"bewijs van vrije invulling",en:"evidence of free discretion"},actie:{nl:"Bewijs vastleggen",en:"Record evidence"},url:"https://www.rechtspraak.nl",opg:"2 apr 2026",type:"juris",
   herkomst:{nl:"Interview — niet vastgelegd",en:"Interview — not recorded"},betrouw:{nl:"Laag",en:"Low"},onzeker:{nl:"Hoog",en:"High"},controle:{nl:"Ja — jurist",en:"Yes — lawyer"}}
};
var EVI={
 "Organisatorische inbedding":{herkomst:{nl:"Werkplekobservatie",en:"Workplace observation"},betrouw:{nl:"Middel",en:"Medium"},onzeker:{nl:"Middel",en:"Medium"},controle:{nl:"Ja — jurist",en:"Yes — lawyer"}},
 "Ondernemerschap":{herkomst:{nl:"KvK-register + facturen",en:"CoC register + invoices"},betrouw:{nl:"Hoog",en:"High"},onzeker:{nl:"Laag",en:"Low"},controle:{nl:"Nee",en:"No"}},
 "Vervanging":{herkomst:{nl:"Onbekend — niet vastgelegd",en:"Unknown — not recorded"},betrouw:{nl:"—",en:"—"},onzeker:{nl:"Hoog",en:"High"},controle:{nl:"Ja — opdrachtgever",en:"Yes — client"}},
 "Ondernemersrisico":{herkomst:{nl:"Polisadministratie",en:"Policy records"},betrouw:{nl:"Middel",en:"Medium"},onzeker:{nl:"Middel",en:"Medium"},controle:{nl:"Ja — dossierbeheer",en:"Yes — records mgmt"}},
 "Meerdere opdrachtgevers":{herkomst:{nl:"Facturen",en:"Invoices"},betrouw:{nl:"Hoog",en:"High"},onzeker:{nl:"Laag",en:"Low"},controle:{nl:"Nee",en:"No"}},
 "Eigen materialen":{herkomst:{nl:"Verklaring zelfstandige",en:"Contractor statement"},betrouw:{nl:"Middel",en:"Medium"},onzeker:{nl:"Middel",en:"Medium"},controle:{nl:"Nee",en:"No"}},
 "Contractvorm":{herkomst:{nl:"Modelovereenkomst",en:"Model agreement"},betrouw:{nl:"Hoog",en:"High"},onzeker:{nl:"Laag",en:"Low"},controle:{nl:"Nee",en:"No"}},
 "Duur":{herkomst:{nl:"Engagement-administratie",en:"Engagement records"},betrouw:{nl:"Hoog",en:"High"},onzeker:{nl:"Laag",en:"Low"},controle:{nl:"Nee",en:"No"}},
 "Exclusiviteit":{herkomst:{nl:"Contract",en:"Contract"},betrouw:{nl:"Hoog",en:"High"},onzeker:{nl:"Laag",en:"Low"},controle:{nl:"Nee",en:"No"}}
};
function navRows(){var g=GEZAG[werktijd];return [
 {o:{nl:"Gezag",en:"Authority"},st:g.st,stl:g.stl,type:g.type,url:g.url,opg:g.opg,bwB:g.bwB,bw:g.bw,aB:g.aB,aT:g.aT,feit:g.feit,ontbr:g.ontbr,actie:g.actie,herkomst:g.herkomst,betrouw:g.betrouw,onzeker:g.onzeker,controle:g.controle},
 {o:{nl:"Organisatorische inbedding",en:"Organisational embedding"},st:"part",stl:{nl:"Deels bekend",en:"Partly known"},type:"wet",url:"https://wetten.overheid.nl",opg:"6 jul 2026",bwB:"miss",bw:{nl:"✗ ontbreekt",en:"✗ missing"},aB:"open",aT:{nl:"open vraag",en:"open question"},feit:{nl:"Werkt in team; eigen kleding/telefoon",en:"Works in a team; own clothing/phone"},ontbr:{nl:"functieomschrijving",en:"job description"},actie:{nl:"Aanvullen inbedding",en:"Complete embedding"}},
 {o:{nl:"Ondernemerschap",en:"Entrepreneurship"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"beleid",url:"https://www.belastingdienst.nl",opg:"6 jul 2026",bwB:"ok",bw:{nl:"✓ KvK + 3 opdrachtgevers",en:"✓ CoC + 3 clients"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"Ingeschreven KvK, factureert 3 opdrachtgevers",en:"Registered, invoices 3 clients"},ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"}},
 {o:{nl:"Vervanging",en:"Substitution"},st:"none",stl:{nl:"Onbekend",en:"Unknown"},type:"none",url:"",opg:"—",bwB:"miss",bw:{nl:"✗ ontbreekt",en:"✗ missing"},aB:"open",aT:{nl:"open vraag",en:"open question"},feit:{nl:"Onbekend of vervanging is toegestaan",en:"Unknown whether substitution is allowed"},ontbr:{nl:"clausule/verklaring",en:"clause/statement"},actie:{nl:"Vraag beantwoorden",en:"Answer question"}},
 {o:{nl:"Ondernemersrisico",en:"Business risk"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"intern",url:"",opg:"6 feb 2026",bwB:"open",bw:{nl:"✓ eigen BAV (verlopen)",en:"✓ own liability ins. (expired)"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"Draagt eigen aansprakelijkheid; polis verlopen",en:"Bears own liability; policy expired"},ontbr:{nl:"actuele polis",en:"current policy"},actie:{nl:"Polis vernieuwen",en:"Renew policy"}},
 {o:{nl:"Meerdere opdrachtgevers",en:"Multiple clients"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"beleid",url:"https://www.belastingdienst.nl",opg:"6 jul 2026",bwB:"ok",bw:{nl:"✓ facturen",en:"✓ invoices"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"3 opdrachtgevers in 12 maanden",en:"3 clients in 12 months"},ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"}},
 {o:{nl:"Eigen materialen",en:"Own equipment"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"intern",url:"",opg:"6 feb 2026",bwB:"ok",bw:{nl:"✓ verklaring",en:"✓ statement"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"Eigen telefoon en vervoer",en:"Own phone and transport"},ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"}},
 {o:{nl:"Contractvorm",en:"Contract form"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"intern",url:"",opg:"6 feb 2026",bwB:"ok",bw:{nl:"✓ modelovereenkomst",en:"✓ model agreement"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"Goedgekeurde modelovereenkomst v1",en:"Approved model agreement v1"},ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"}},
 {o:{nl:"Duur",en:"Duration"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"beleid",url:"https://www.belastingdienst.nl",opg:"6 jul 2026",bwB:"ok",bw:{nl:"✓ engagement",en:"✓ engagement"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"12 maanden, geen verlengingen",en:"12 months, no renewals"},ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"}},
 {o:{nl:"Exclusiviteit",en:"Exclusivity"},st:"full",stl:{nl:"Bekend",en:"Known"},type:"juris",url:"https://www.rechtspraak.nl",opg:"2 apr 2026",bwB:"ok",bw:{nl:"✓ contract",en:"✓ contract"},aB:"neutral",aT:{nl:"—",en:"—"},feit:{nl:"Geen exclusiviteitsbeding",en:"No exclusivity clause"},ontbr:{nl:"geen",en:"none"},actie:{nl:"—",en:"—"}}
];}

var SSTAT={actueel:{nl:"actueel",en:"current"},controleren:{nl:"opnieuw controleren",en:"re-check"},aanwezig:{nl:"aanwezig",en:"present"}};
var SOURCES=[
 {t:{nl:"Handreiking beoordeling arbeidsrelaties",en:"Guidance on assessing employment relationships"},houder:"Belastingdienst",url:"https://www.belastingdienst.nl",opg:"6 jul 2026",voor:{nl:"Gezag, handhaving",en:"Authority, enforcement"},status:"actueel"},
 {t:{nl:"Burgerlijk Wetboek — art. 7:610",en:"Civil Code — art. 7:610"},houder:"wetten.overheid.nl",url:"https://wetten.overheid.nl",opg:"6 jul 2026",voor:{nl:"Organisatorische inbedding",en:"Organisational embedding"},status:"actueel"},
 {t:{nl:"Uitspraak arbeidsrelatie (voorbeeld)",en:"Employment-relationship ruling (example)"},houder:"Rechtspraak.nl",url:"https://www.rechtspraak.nl",opg:"2 apr 2026",voor:{nl:"Gezag (jurisprudentie)",en:"Authority (case law)"},status:"controleren"},
 {t:{nl:"Modelovereenkomst v1",en:"Model agreement v1"},houder:{nl:"Intern bewijsstuk",en:"Internal evidence"},url:"",opg:"6 feb 2026",voor:{nl:"Contractvorm",en:"Contract form"},status:"aanwezig"}
];
var MONITOR=[
 {c:"new",t:{nl:"Nieuwe bron gevonden — handreiking Belastingdienst",en:"New source found — Belastingdienst guidance"},w:{nl:"vandaag",en:"today"}},
 {c:"chg",t:{nl:"Bron gewijzigd sinds vorige beoordeling — Beleidsregels (Belastingdienst)",en:"Source changed since last assessment — Policy rules (Belastingdienst)"},w:{nl:"2 dgn",en:"2 days"},act:true},
 {c:"err",t:{nl:"Bron tijdelijk niet bereikbaar — rechtspraak.nl",en:"Source temporarily unreachable — rechtspraak.nl"},w:{nl:"1 dg",en:"1 day"}},
 {c:"chk",t:{nl:"Hercontrole nodig — jurisprudentie ouder dan 90 dagen",en:"Re-check needed — case law older than 90 days"},w:{nl:"—",en:"—"}}
];
var NTYPE={wet:{nl:"Wet",en:"Law"},beleid:{nl:"Beleid",en:"Policy"},juris:{nl:"Jurisprudentie",en:"Case law"},handreiking:{nl:"Handreiking",en:"Guidance"},aankomend:{nl:"Aankomend",en:"Upcoming"}};
var MSTAT2={actueel:{nl:"actueel",en:"current",b:"ok"},gewijzigd:{nl:"gewijzigd sinds vorige beoordeling",en:"changed since last assessment",b:"open"},controleren:{nl:"opnieuw controleren",en:"re-check",b:"open"},voorbereiding:{nl:"in voorbereiding",en:"in preparation",b:"neutral"}};
var NORMS=[
 {id:"wetdba",t:{nl:"Wet DBA — kader arbeidsrelaties",en:"DBA Act — employment-relationship framework"},type:"wet",url:"https://wetten.overheid.nl",opg:"6 jul 2026",mon:"actueel",ob:{nl:"Kwalificatie arbeidsrelatie",en:"Qualification of the relationship"}},
 {id:"bw610",t:{nl:"BW art. 7:610 — arbeidsovereenkomst",en:"Civil Code art. 7:610 — employment contract"},type:"wet",url:"https://wetten.overheid.nl",opg:"6 jul 2026",mon:"actueel",ob:{nl:"Gezag, inbedding",en:"Authority, embedding"}},
 {id:"beleid",t:{nl:"Beleidsregels beoordeling arbeidsrelaties",en:"Policy rules on assessing employment relationships"},type:"beleid",url:"https://www.belastingdienst.nl",opg:"6 jul 2026",mon:"gewijzigd",ob:{nl:"Handhaving, ondernemerschap",en:"Enforcement, entrepreneurship"}},
 {id:"juris",t:{nl:"Jurisprudentie — holistische weging (o.a. Uber/Deliveroo)",en:"Case law — holistic weighing (e.g. Uber/Deliveroo)"},type:"juris",url:"https://www.rechtspraak.nl",opg:"2 apr 2026",mon:"controleren",ob:{nl:"Gezag, geen rangorde",en:"Authority, no hierarchy"}},
 {id:"handreiking",t:{nl:"Handreiking Belastingdienst",en:"Belastingdienst guidance"},type:"handreiking",url:"https://www.belastingdienst.nl",opg:"6 jul 2026",mon:"actueel",ob:{nl:"Praktijktoetsing",en:"Practical assessment"}},
 {id:"wtta",t:{nl:"WTTA — wet in voorbereiding",en:"WTTA — legislation in preparation"},type:"aankomend",url:"https://www.rijksoverheid.nl",opg:"6 jul 2026",mon:"voorbereiding",ob:{nl:"Toekomstige impact — monitoren",en:"Future impact — monitor"}}
];
// DEMO-mapping bevinding -> norm (welke regelgeving onderbouwt welk onderwerp). Illustratief.
var NAVNORM={"Gezag":"juris","Organisatorische inbedding":"bw610","Ondernemerschap":"beleid","Vervanging":"juris","Ondernemersrisico":"juris","Meerdere opdrachtgevers":"beleid","Eigen materialen":"beleid","Contractvorm":"bw610","Duur":"beleid","Exclusiviteit":"juris"};
function normById(id){for(var i=0;i<NORMS.length;i++){if(NORMS[i].id===id)return NORMS[i];}return null;}
var JSTAT={leidend:{nl:"leidend",en:"leading",b:"ok"},controleren:{nl:"opnieuw controleren",en:"re-check",b:"open"}};
var JURIS=[
 {id:"deliveroo",zaak:{nl:"Deliveroo-lijn (Hoge Raad, 2023)",en:"Deliveroo line (Supreme Court, 2023)"},principe:{nl:"Holistische weging van alle omstandigheden; gezichtspunten zonder vaste rangorde.",en:"Holistic weighing of all circumstances; viewpoints without fixed hierarchy."},gezicht:{nl:"aard werk · beloning · ondernemerschap · organisatorische inbedding",en:"nature of work · pay · entrepreneurship · organisational embedding"},impact:{nl:"Bepaalt hoe gezag en zelfstandigheid worden gewogen.",en:"Determines how authority and independence are weighed."},feit:{nl:"Werktijden, aansturing, inbedding",en:"Working hours, direction, embedding"},norm:"juris",url:"https://www.rechtspraak.nl",datum:"2 apr 2026",status:"leidend"},
 {id:"gezichtspunten",zaak:{nl:"Gezichtspuntenbenadering",en:"Viewpoint approach"},principe:{nl:"Kwalificatie o.b.v. feitelijke gezichtspunten, niet de bedoeling van partijen.",en:"Qualification based on factual viewpoints, not the parties' intention."},gezicht:{nl:"feitelijke uitvoering boven contract",en:"actual performance over contract"},impact:{nl:"Papieren afspraken wegen minder dan de praktijk.",en:"Paper agreements weigh less than practice."},feit:{nl:"Contractvorm vs feitelijke werkwijze",en:"Contract form vs actual practice"},norm:"bw610",url:"https://www.rechtspraak.nl",datum:"2 apr 2026",status:"leidend"},
 {id:"uber",zaak:{nl:"Uber-lijn (Gerechtshof, 2021)",en:"Uber line (Court of Appeal, 2021)"},principe:{nl:"Platformaansturing en inbedding kunnen op gezag wijzen.",en:"Platform direction and embedding may indicate authority."},gezicht:{nl:"algoritmische aansturing · inbedding",en:"algorithmic direction · embedding"},impact:{nl:"Aansturing via systeem telt mee voor gezag.",en:"System-based direction counts toward authority."},feit:{nl:"Aansturing, toezicht",en:"Direction, supervision"},norm:"juris",url:"https://www.rechtspraak.nl",datum:"2 apr 2026",status:"controleren"}
];
var JURLINK={"Gezag":"deliveroo","Organisatorische inbedding":"uber","Ondernemerschap":"deliveroo","Vervanging":"gezichtspunten","Ondernemersrisico":"deliveroo","Contractvorm":"gezichtspunten","Exclusiviteit":"deliveroo"};
function jurById(id){for(var i=0;i<JURIS.length;i++){if(JURIS[i].id===id)return JURIS[i];}return null;}
var WAARDE={hoog:{nl:"Feitelijke risicoreductie",en:"Actual risk reduction",b:"ok"},laag:{nl:"Papieren schijnoplossing",en:"Paper-only measure",b:"miss"},admin:{nl:"Onderbouwing / administratief",en:"Substantiation / administrative",b:"neutral"}};
var ACTIONS=[
 {t:{nl:"Feitelijke werkwijze aanpassen: vrije werktijden & vervanging in de praktijk",en:"Adjust actual practice: free working hours & substitution"},why:{nl:"uit: Gezag / Vervanging",en:"from: Authority / Substitution"},who:{nl:"aan opdrachtgever",en:"to client"},btn:{nl:"Openen",en:"Open"},w:"hoog",uitleg:{nl:"wijzigt de feitelijke aansturing/zelfstandigheid — raakt de kwalificatie echt",en:"changes actual direction/independence — genuinely affects qualification"}},
 {t:{nl:"Modelovereenkomst herzien (alleen tekst)",en:"Revise model agreement (text only)"},why:{nl:"uit: Contractvorm",en:"from: Contract form"},who:{nl:"aan jurist",en:"to lawyer"},btn:{nl:"Openen",en:"Open"},w:"laag",uitleg:{nl:"contract aanpassen zonder de feitelijke werkwijze te wijzigen verlaagt het risico niet",en:"changing the contract without changing practice does not reduce risk"}},
 {t:{nl:"Bewijs opvragen: BAV-polis (verlopen)",en:"Request evidence: liability insurance (expired)"},why:{nl:"uit: Ondernemersrisico",en:"from: Business risk"},who:{nl:"aan zelfstandige",en:"to contractor"},btn:{nl:"Verzoek sturen",en:"Send request"},w:"admin",uitleg:{nl:"verhoogt de herleidbaarheid, verlaagt het feitelijke risico niet",en:"improves traceability, does not reduce actual risk"}},
 {t:{nl:"Open vraag beantwoorden: vervanging toegestaan?",en:"Answer open question: substitution allowed?"},why:{nl:"uit: Vervanging",en:"from: Substitution"},who:{nl:"aan opdrachtgever",en:"to client"},btn:{nl:"Beantwoorden",en:"Answer"},w:"admin",uitleg:{nl:"brengt het feit in beeld; feitelijke wijziging is de echte maatregel",en:"clarifies the fact; the actual change is the real measure"}},
 {t:{nl:"Herbeoordeling inplannen (termijn verlopen)",en:"Schedule re-assessment (term expired)"},why:{nl:"uit: broncheck",en:"from: source check"},who:{nl:"aan jurist",en:"to lawyer"},btn:{nl:"Inplannen",en:"Schedule"},w:"admin",uitleg:{nl:"proces/regie — houdt de beoordeling actueel",en:"process/governance — keeps the assessment current"}}
];
var BASIS=[
 {m:"yes",t:{nl:"Alle relevante feiten bekend",en:"All relevant facts known"}},
 {m:"yes",t:{nl:"Financieel akkoord (scenario vastgelegd)",en:"Financially agreed (scenario recorded)"}},
 {m:"yes",t:{nl:"Contractvoorwaarden akkoord",en:"Contract terms agreed"}},
 {m:"partial",t:{nl:"Onderbouwing: 8/10 onderwerpen — 2 open vragen",en:"Substantiation: 8/10 topics — 2 open questions"}}
];
var AUDIT0=[
 {t:"06-02-2026",a:{nl:"Modelovereenkomst goedgekeurd — P. van Dam",en:"Model agreement approved — P. van Dam"}},
 {t:"28-06-2026",a:{nl:"Herbeoordeling gemarkeerd — Systeem",en:"Re-assessment flagged — System"}}
];
var T={actie:{nl:"Actie gestart: ",en:"Action started: "},saved:{nl:"Scenario opgeslagen",en:"Scenario saved"},
 copied:{nl:"Scenario gekopieerd naar de velden",en:"Scenario copied to the fields"},
 cmp0:{nl:"Sla eerst twee scenario's op om te vergelijken",en:"Save two scenarios first to compare"},
 cmp:{nl:"Vergelijking (mock)",en:"Comparison (mock)"},
 besluit:{nl:"Beslissing vastgelegd in het auditspoor: ",en:"Decision recorded in the audit trail: "},vandaag:{nl:"vandaag",en:"today"},ondanks:{nl:"genomen ondanks 2 open vragen",en:"taken despite 2 open questions"},herb:{nl:"Herbeoordeling aangemaakt — gekoppeld aan bronwijziging",en:"Re-assessment created — linked to source change"},valneed:{nl:"Kies eerst een validatorrol",en:"Choose a validator role first"},valdone:{nl:"Menselijke validatie vastgelegd",en:"Human validation recorded"}};

/* ---------- render ---------- */
function applyStatic(){
 $$("[data-i18n]").forEach(function(el){var v=UI[LANG][el.dataset.i18n]; if(v!=null) el.innerHTML=v;});
 $$("[data-i18n-ph]").forEach(function(el){var v=UI[LANG][el.dataset.i18nPh]; if(v!=null) el.placeholder=v;});
 document.documentElement.setAttribute("lang",LANG);
}
function renderCockpit(){
 $("#cockpit").innerHTML=TILES.map(function(t){return '<div class="tile"><div class="k">'+L(t.k)+'</div><div class="v '+t.c+'">'+L(t.v)+'</div></div>';}).join("");
 $("#change").textContent=L(CHANGE[werktijd]);
}
function renderNav(){
 $("#navbody").innerHTML="";
 navRows().forEach(function(r){
  var tr=document.createElement("tr"); tr.className="head-row"; tr.tabIndex=0; tr.setAttribute("aria-expanded","false");
  tr.innerHTML='<td><b>'+L(r.o)+'</b> <span class="disclose">▸</span></td>'+
   '<td><span class="state"><span class="g '+r.st+'"></span>'+L(r.stl)+'</span></td>'+
   '<td><span class="src">'+L(TYPE[r.type])+'</span></td>'+
   '<td><span class="badge '+r.bwB+'">'+L(r.bw)+'</span></td>'+
   '<td><span class="badge '+r.aB+'">'+L(r.aT)+'</span></td>';
  var det=document.createElement("tr"); det.className="detail";
  var urlHtml = r.url ? '<a href="'+r.url+'" target="_blank" rel="noopener">'+r.url+'</a> <span class="demo">[DEMO]</span>' : '<span class="src">—</span>';
  var nrm = NAVNORM[r.o.nl] ? normById(NAVNORM[r.o.nl]) : null;
  var volgt = nrm ? '<a href="#" class="norm-link" data-norm="'+nrm.id+'">'+L(nrm.t)+' →</a>' : '<span class="src">—</span>';
  var jr = JURLINK[r.o.nl] ? jurById(JURLINK[r.o.nl]) : null;
  var volgtj = jr ? '<a href="#" class="jur-link" data-jur="'+jr.id+'">'+L(jr.zaak)+' →</a>' : '<span class="src">—</span>';
  var ex = EVI[r.o.nl]||{};
  var herk=r.herkomst||ex.herkomst||{nl:"—",en:"—"}, bet=r.betrouw||ex.betrouw||{nl:"—",en:"—"}, onz=r.onzeker||ex.onzeker||{nl:"—",en:"—"}, ctrl=r.controle||ex.controle||{nl:"—",en:"—"};
  det.innerHTML='<td colspan="5"><div class="evi">'+
   '<div class="step"><b>'+UI[LANG]["evi.feit"]+'</b>'+L(r.feit)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.bron"]+'</b>'+L(TYPE[r.type])+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.volgtuit"]+'</b>'+volgt+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.volgtjur"]+'</b>'+volgtj+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.url"]+'</b>'+urlHtml+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.opgehaald"]+'</b>'+r.opg+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.bewijs"]+'</b>'+L(r.bw)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.herkomst"]+'</b>'+L(herk)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.betrouw"]+'</b>'+L(bet)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.onzeker"]+'</b>'+L(onz)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.ontbreekt"]+'</b>'+L(r.ontbr)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.controle"]+'</b>'+L(ctrl)+'</div>'+
   '<div class="step"><b>'+UI[LANG]["evi.actie"]+'</b>'+L(r.actie)+'</div></div></td>';
  function tgl(){var open=det.classList.toggle("show"); tr.setAttribute("aria-expanded",open?"true":"false");}
  tr.addEventListener("click",tgl);
  tr.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tgl();}});
  $("#navbody").appendChild(tr); $("#navbody").appendChild(det);
  var lk=det.querySelector(".norm-link"); if(lk){lk.addEventListener("click",function(e){e.preventDefault();gotoNorm(lk.dataset.norm);});}
  var lj=det.querySelector(".jur-link"); if(lj){lj.addEventListener("click",function(e){e.preventDefault();gotoJuris(lj.dataset.jur);});}
 });
}
function renderSources(){
 $("#sources").innerHTML=SOURCES.map(function(s){
  var url = s.url ? '<a href="'+s.url+'" target="_blank" rel="noopener">'+s.url+'</a>' : '<span class="src">'+L(s.houder)+'</span>';
  return '<div class="srccard"><div class="t">'+L(s.t)+' <span class="demo">[DEMO]</span></div>'+
   '<div class="meta">'+L(s.houder)+' · '+UI[LANG]["src.voor"]+': '+L(s.voor)+'</div>'+
   '<div class="row"><span>'+url+'</span><span class="badge '+(s.status==="controleren"?"open":"ok")+'">'+L(SSTAT[s.status])+'</span></div>'+
   '<div class="meta">'+UI[LANG]["src.opgehaald"]+' '+s.opg+'</div></div>';
 }).join("");
}
function renderMonitor(){
 $("#monitor").innerHTML=MONITOR.map(function(m,i){var b=m.act?' <button class="btn ghost mon-act" data-i="'+i+'">'+UI[LANG]["mon.act"]+'</button>':'';return '<div class="mon '+m.c+'"><span class="ic"></span><span>'+L(m.t)+b+'</span><span class="when">'+L(m.w)+'</span></div>';}).join("");
 $$("#monitor .mon-act").forEach(function(btn){btn.addEventListener("click",createHerbeoordeling);});
}
function createHerbeoordeling(){
 if(!herbCreated){herbCreated=true;
  actExtra.push({t:{nl:"Herbeoordeling nodig — bron ‘Beleidsregels’ gewijzigd",en:"Re-assessment needed — source ‘Policy rules’ changed"},why:{nl:"uit: Bronmonitor → Beleidsregels → Ondernemerschap",en:"from: Source monitor → Policy rules → Entrepreneurship"},who:{nl:"aan jurist",en:"to lawyer"},btn:{nl:"Openen",en:"Open"},w:"admin",uitleg:{nl:"proces — bronwijziging vereist hertoetsing",en:"process — source change requires re-check"}});
  auditExtra.push({t:L(T.vandaag),a:(LANG==="nl"?"Herbeoordeling aangemaakt — bronwijziging Beleidsregels — Systeem":"Re-assessment created — source change Policy rules — System")});
 }
 renderActions(); renderAudit(); gotoWorld("w3"); toast(L(T.herb));
}
function renderNorms(){
 $("#norms").innerHTML=NORMS.map(function(n){
  var url=n.url?'<a href="'+n.url+'" target="_blank" rel="noopener">'+n.url+'</a>':'';
  var ms=MSTAT2[n.mon];
  return '<div class="srccard" id="norm-'+n.id+'"><div class="t">'+L(n.t)+' <span class="badge neutral">'+L(NTYPE[n.type])+'</span> <span class="demo">[DEMO]</span></div>'+
   '<div class="meta">'+UI[LANG]["wet.onderbouwt"]+': '+L(n.ob)+'</div>'+
   '<div class="row"><span>'+url+'</span><span class="badge '+ms.b+'">'+L(ms)+'</span></div>'+
   '<div class="meta">'+UI[LANG]["src.opgehaald"]+' '+n.opg+'</div></div>';
 }).join("");
}
function renderJuris(){
 $("#juris").innerHTML=JURIS.map(function(j){
  var st=JSTAT[j.status];var nrm=normById(j.norm);
  return '<div class="srccard" id="jur-'+j.id+'"><div class="t">'+L(j.zaak)+' <span class="badge '+st.b+'">'+L(st)+'</span> <span class="demo">[DEMO]</span></div>'+
   '<div class="meta"><b>'+UI[LANG]["jur.principe"]+':</b> '+L(j.principe)+'</div>'+
   '<div class="meta"><b>'+UI[LANG]["jur.gezicht"]+':</b> '+L(j.gezicht)+'</div>'+
   '<div class="meta"><b>'+UI[LANG]["jur.impact"]+':</b> '+L(j.impact)+'</div>'+
   '<div class="meta"><b>'+UI[LANG]["jur.relfeit"]+':</b> '+L(j.feit)+' · <b>'+UI[LANG]["jur.relnorm"]+':</b> <a href="#" class="norm-link2" data-norm="'+j.norm+'">'+L(nrm.t)+' →</a></div>'+
   '<div class="row"><span><a href="'+j.url+'" target="_blank" rel="noopener">'+j.url+'</a> <span class="demo">[DEMO]</span></span><span class="src">'+UI[LANG]["src.opgehaald"]+' '+j.datum+'</span></div></div>';
 }).join("");
 $$("#juris .norm-link2").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();gotoNorm(a.dataset.norm);});});
}
function renderActions(){
 $("#actions").innerHTML="";
 ACTIONS.concat(actExtra).forEach(function(a){
  var d=document.createElement("div"); d.className="action";
  var wv=WAARDE[a.w||"admin"];
  d.innerHTML='<div><div>'+L(a.t)+' <span class="badge '+wv.b+'">'+L(wv)+'</span></div><div class="why">'+L(a.why)+(a.uitleg?' · '+L(a.uitleg):'')+'</div></div><span class="who">'+L(a.who)+'</span><button class="btn ghost">'+L(a.btn)+'</button>';
  d.querySelector("button").addEventListener("click",function(){toast(L(T.actie)+L(a.t));});
  $("#actions").appendChild(d);
 });
}
function renderBasis(){
 $("#basis").innerHTML=BASIS.map(function(b){return '<li><span class="mark '+b.m+'">'+(b.m==="yes"?"✓":"◐")+'</span>'+L(b.t)+'</li>';}).join("");
}
var auditExtra=[]; var actExtra=[]; var herbCreated=false; var validatedByKey=null;
function valRoleName(){return UI[LANG][validatedByKey==="jurist"?"val.jurist":"val.compliance"];}
function renderValStatus(){var st=$("#val-status");if(!st||!validatedByKey)return;st.textContent=(LANG==="nl"?"Gevalideerd — ":"Validated — ")+valRoleName()+" — "+L(T.vandaag);st.className="badge ok";}
function renderAudit(){
 $("#audit").innerHTML='<p class="sectiontitle">'+UI[LANG]["audit.title"]+'</p>'+
  AUDIT0.map(function(e){return '<div class="entry"><span class="t num">'+e.t+'</span>'+L(e.a)+'</div>';}).join("")+
  auditExtra.map(function(e){return '<div class="entry"><span class="t num">'+e.t+'</span>'+e.a+'</div>';}).join("");
}
function renderDossier(){
 if(!$("#dossier"))return;
 var rows=navRows();
 var red=rows.filter(function(r){return r.aB==="open";});
 var pos=rows.filter(function(r){return r.st==="full"&&r.bwB==="ok";});
 var miss=rows.filter(function(r){return r.bwB==="miss";});
 var acts=ACTIONS.concat(actExtra);
 var audits=AUDIT0.map(function(e){return {t:e.t,a:L(e.a)};}).concat(auditExtra);
 var val=validatedByKey?((LANG==="nl"?"Gevalideerd door ":"Validated by ")+valRoleName()+" — "+L(T.vandaag)):UI[LANG]["val.concept-status"];
 function li(arr,fn){return arr.length?('<ul class="doslist">'+arr.map(fn).join("")+'</ul>'):'<p class="src">—</p>';}
 var h='<div class="dos-head"><h3>'+UI[LANG]["dos.title"]+'</h3><button class="btn ghost" id="dos-export">'+UI[LANG]["dos.export"]+'</button></div>'+
  '<p class="dos-sum">'+UI[LANG]["dos.samenvatting"]+'</p>'+
  '<div class="dos-kv"><span>'+UI[LANG]["dos.onderbouwd"]+': <b>'+(rows.length-miss.length)+'/'+rows.length+'</b></span><span>'+UI[LANG]["nav.open"]+': <b>'+red.length+'</b></span><span>'+UI[LANG]["dos.validatie"]+': <b>'+val+'</b></span></div>'+
  '<h4>'+UI[LANG]["dos.rode"]+'</h4>'+li(red,function(r){return '<li>'+L(r.o)+' — '+L(r.aT)+'</li>';})+
  '<h4>'+UI[LANG]["dos.positief"]+'</h4>'+li(pos,function(r){return '<li>'+L(r.o)+' — '+L(r.bw)+'</li>';})+
  '<h4>'+UI[LANG]["dos.ontbrekend"]+'</h4>'+li(miss,function(r){return '<li>'+L(r.o)+' — '+L(r.ontbr)+'</li>';})+
  '<h4>'+UI[LANG]["dos.normen"]+'</h4>'+li(NORMS,function(n){return '<li>'+L(n.t)+' ('+L(NTYPE[n.type])+') <span class="demo">[DEMO]</span></li>';})+
  '<h4>'+UI[LANG]["dos.bronnen"]+'</h4>'+li(SOURCES,function(s){return '<li>'+L(s.t)+' — '+(s.url||L(s.houder))+'</li>';})+
  '<h4>'+UI[LANG]["dos.juris"]+'</h4>'+li(JURIS,function(j){return '<li>'+L(j.zaak)+'</li>';})+
  '<h4>'+UI[LANG]["dos.acties"]+'</h4>'+li(acts,function(a){return '<li>'+L(a.t)+' — '+L(a.who)+' <span class="src">('+L(WAARDE[a.w||"admin"])+')</span></li>';})+
  '<h4>'+UI[LANG]["dos.audit"]+'</h4>'+li(audits,function(e){return '<li><span class="src">'+e.t+'</span> '+e.a+'</li>';})+
  '<p class="dos-disc">'+UI[LANG]["dos.disclaimer"]+'</p>';
 $("#dossier").innerHTML=h;
 var ex=$("#dos-export"); if(ex){ex.addEventListener("click",function(){auditExtra.push({t:L(T.vandaag),a:(LANG==="nl"?"Dossier-export gegenereerd — Systeem":"File export generated — System")});renderAudit();renderDossier();toast(UI[LANG]["dos.exporttoast"]);});}
}

/* ---------- scenario ---------- */
var fmt=new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR",maximumFractionDigits:0});
function vals(){return {tarief:+$("#tarief").value||0,uren:+$("#uren").value||0,loop:+$("#loop").value||1,idx:+$("#idx").value||0};}
function calc(v){var w=v.loop*52/12,f=1+(v.idx/100)*(v.loop/24);return {total:v.tarief*v.uren*w*f,jaar:v.tarief*v.uren*52*(1+v.idx/200)};}
function recompute(){var v=vals(),c=calc(v);$("#k-total").textContent=fmt.format(Math.round(c.total));$("#k-maand").textContent=fmt.format(Math.round(c.total/v.loop));$("#k-jaar").textContent=fmt.format(Math.round(c.jaar));}
function pressGroup(sel,btn){$$(sel).forEach(function(b){b.setAttribute("aria-pressed","false");});btn.setAttribute("aria-pressed","true");}

var werktijd="vrij";
function decoupleText(){return werktijd==="og"
  ? (LANG==="nl"?"U wijzigde een <b>feitelijk</b> kenmerk (werktijden). Financieel effect: <b>verwaarloosbaar</b>. In de Regie Navigator is <b>‘Gezag’</b> nu een aandachtspunt.":"You changed a <b>factual</b> element (working hours). Financial effect: <b>negligible</b>. In the Governance Navigator <b>‘Authority’</b> is now an attention point.")
  : UI[LANG]["decouple.default"];}
function setWerktijd(w){werktijd=w; pressGroup("#wt-vrij,#wt-og", w==="vrij"?$("#wt-vrij"):$("#wt-og")); renderNav(); renderCockpit(); $("#decouple").innerHTML=decoupleText();}

/* ---------- taal ---------- */
function gotoWorld(w){$$(".tab").forEach(function(x){x.setAttribute("aria-selected",x.dataset.w===w?"true":"false");});$$(".world").forEach(function(s){s.classList.toggle("active",s.id===w);});}
function gotoNorm(id){gotoWorld("wwet");var el=$("#norm-"+id);if(el){el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("hl");setTimeout(function(){el.classList.remove("hl");},1800);}}
function gotoJuris(id){gotoWorld("wjur");var el=$("#jur-"+id);if(el){el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("hl");setTimeout(function(){el.classList.remove("hl");},1800);}}
function updateKlabel(){$("#k-label").textContent=L(LABELS[$("#persp").value]);}
function setLang(l){
 LANG=l; $("#lang-nl").setAttribute("aria-pressed",l==="nl"?"true":"false"); $("#lang-en").setAttribute("aria-pressed",l==="en"?"true":"false");
 applyStatic(); updateKlabel();
 renderCockpit(); renderNorms(); renderJuris(); renderNav(); renderSources(); renderMonitor(); renderActions(); renderBasis(); renderAudit(); renderValStatus(); renderDossier();
 $("#decouple").innerHTML=decoupleText();
}

/* ---------- toast ---------- */
var tEl,tTimer;
function toast(msg){tEl=tEl||$("#toast");tEl.textContent=msg;tEl.classList.add("show");clearTimeout(tTimer);tTimer=setTimeout(function(){tEl.classList.remove("show");},2600);}

/* ---------- events ---------- */
$("#theme").addEventListener("click",function(){var c=document.documentElement.getAttribute("data-theme");document.documentElement.setAttribute("data-theme",c==="dark"?"light":(c==="light"?"dark":(matchMedia("(prefers-color-scheme:dark)").matches?"light":"dark")));});
$("#lang-nl").addEventListener("click",function(){setLang("nl");});
$("#lang-en").addEventListener("click",function(){setLang("en");});
$$(".tab").forEach(function(t){t.addEventListener("click",function(){$$(".tab").forEach(function(x){x.setAttribute("aria-selected","false");});t.setAttribute("aria-selected","true");$$(".world").forEach(function(w){w.classList.toggle("active",w.id===t.dataset.w);});if(t.dataset.w==="wdos")renderDossier();});});
$("#persp").addEventListener("change",updateKlabel);
["tarief","uren","loop","idx"].forEach(function(id){$("#"+id).addEventListener("input",recompute);});
$("#wt-vrij").addEventListener("click",function(){setWerktijd("vrij");});
$("#wt-og").addEventListener("click",function(){setWerktijd("og");});
$$(".opts .opt").forEach(function(o){o.addEventListener("click",function(){pressGroup(".opts .opt",o);});});
var scenCount=0;
$("#save-scen").addEventListener("click",function(){scenCount++;var name=String.fromCharCode(64+scenCount),v=vals(),c=calc(v);var el=document.createElement("div");el.className="scen";el.innerHTML='<div class="n">Scenario '+name+'</div><div class="t num">'+fmt.format(Math.round(c.total))+' · €'+v.tarief+'/u · '+v.uren+'u · '+v.loop+'m</div><button data-copy>'+(LANG==="nl"?"Kopiëren":"Copy")+'</button>';el.querySelector("[data-copy]").addEventListener("click",function(){$("#tarief").value=v.tarief;$("#uren").value=v.uren;$("#loop").value=v.loop;$("#idx").value=v.idx;recompute();toast(L(T.copied));});$("#saved").appendChild(el);toast(L(T.saved));});
$("#cmp-scen").addEventListener("click",function(){var n=$$("#saved .scen").length;toast(n<2?L(T.cmp0):L(T.cmp)+" ("+n+")");});
$("#commit").addEventListener("click",function(){var keuze=$(".opts .opt[aria-pressed='true']").textContent.trim();var reason=$("#reason").value.trim();var valnote=validatedByKey?((LANG==="nl"?" · gevalideerd door ":" · validated by ")+valRoleName()):(LANG==="nl"?" · nog niet menselijk gevalideerd":" · not yet human-validated");auditExtra.push({t:L(T.vandaag),a:(LANG==="nl"?"Besluit vastgelegd: ":"Decision recorded: ")+"<b>"+keuze+"</b> — "+L(T.ondanks)+valnote+(reason?" · “"+reason+"”":"")});renderAudit();$("#reason").value="";toast(L(T.besluit)+"“"+keuze+"”");});
$("#validate").addEventListener("click",function(){var v=$("#validator").value;if(!v){toast(L(T.valneed));return;}validatedByKey=v;renderValStatus();auditExtra.push({t:L(T.vandaag),a:(LANG==="nl"?"Menselijke validatie vastgelegd — ":"Human validation recorded — ")+valRoleName()});renderAudit();toast(L(T.valdone)+" — "+valRoleName());});

recompute();
setLang("nl");
})();
