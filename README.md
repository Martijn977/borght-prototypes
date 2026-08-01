# Borght Huisvestingsregie — demonstratie

Klikbare demonstratie van de besluitreis van **Borght Huisvestingsregie**:
besluitvorming over ruimte, gebruik en scenario's.

Deze repository bevat **uitsluitend** materiaal van Borght Huisvestingsregie.
Andere producten van Borght worden hier niet getoond en zijn er niet aan gekoppeld.

## Wat dit is

Een demonstratie — geen werkende applicatie, geen dossier. Er wordt niets
opgeslagen en er is geen inlog. Alle organisaties, getallen en bronnen zijn
verzonnen. Er staan geen persoonsgegevens in.

Onderdelen die de rekenregels van het product **nabouwen** zijn in de
demonstratie zichtbaar als zodanig gemarkeerd. Een nabouw toont aannemelijk
productgedrag; hij is **geen bewijs** dat de productengine zich zo gedraagt.
Welk onderdeel wat is, staat in `ARTIFACT_ENGINE_BOUNDARY.md`.

Er worden hier geen uitspraken gedaan over beveiliging, privacy of
productiegereedheid.

## Inhoud

| Pad | Wat |
|---|---|
| `index.html` | instappagina |
| `decision-support/` | de demonstratie (negen stappen) |
| `ARTIFACT_ENGINE_BOUNDARY.md` | per onderdeel: echte engine, nabouw of presentatie |
| `ARTIFACT_RUNTIME_EVIDENCE.md` | wat is gemeten, waartegen, en wat niet |
| `ARTIFACT_PUBLICATION_MANIFEST.json` | repository, branch, commit, geteste URL |
| `ARTIFACT_SHAREABILITY_DECISION.md` | deelbaarheidsoordeel en voorwaarden |
| `ARTIFACT_FACTUAL_BASELINE.md` | beginsituatie vóór deze correctieronde |

## Lokaal draaien

```
python -m http.server 8811 --bind 127.0.0.1
```

Daarna: `http://127.0.0.1:8811/`
