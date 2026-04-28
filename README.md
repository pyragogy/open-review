# Peeragogy Orchestra — Open Review

Migrazione del sito [open-review.pyragogy.org](https://open-review.pyragogy.org) verso "Powered by Obliqo", più gestione versionata dei workflow n8n collegati.

## Struttura

```
.
├── workflows/        # Workflow n8n esportati (JSON, versionati)
├── site/             # Mirror statico open-review.pyragogy.org (baseline migrazione)
├── scripts/          # Utility (diff workflow, deploy, ecc.)
├── .vscode/          # Settings condivisi VSCode
├── .gitignore
└── README.md
```

## Workflow n8n

`workflows/` contiene tre versioni del workflow `Pyragogy Orchestra — open-review`:

- v2.0 — baseline (marzo 2026)
- v2.1 — incrementale
- v2.2 — corrente

### Diff fra versioni

```bash
./scripts/diff-workflows.sh v2.0 v2.1
./scripts/diff-workflows.sh v2.1 v2.2
```

Lo script normalizza i JSON (jq) e mostra solo le differenze semantiche.

## Sito (baseline)

`site/` è il mirror del sito di produzione (vanilla HTML+CSS+JS, deploy Netlify).

| File | Righe | Ruolo |
|------|-------|-------|
| `index.html` | 290 | SPA entry |
| `css/style.css` | 398 | Stile |
| `js/config.js` | 117 | Config (endpoint webhook n8n) |
| `js/orchestra.js` | 157 | Logica core |
| `js/ui-effects.js` | 311 | Animazioni / UX |
| `assets/logo.svg` | — | 93K (candidato ottimizzazione svgo) |
| `assets/favicon.svg` | — | 1.4K |

Stack: nessun build tool. Static deploy.

## Sviluppo locale

Server statico veloce per il sito:

```bash
cd site && python3 -m http.server 8080
# oppure
npx serve site
```

## Migrazione "Powered by Obliqo"

TODO — da definire in fase successiva:

- [ ] Branding (logo, footer, meta)
- [ ] Endpoint webhook (`js/config.js`)
- [ ] Plausible analytics → dominio Obliqo
- [ ] Buy Me a Coffee link
- [ ] Hosting target (Netlify mantiene? Cambia?)

## Riferimenti

- Sito originale: <https://open-review.pyragogy.org>
- Peeragogy: <https://peeragogy.org>
- n8n: <https://n8n.io>
- OpenRouter: <https://openrouter.ai>
