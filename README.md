# Eric Couvreur — site Astro

Site vitrine d'Eric Couvreur, artisan couvreur RGE Qualibat dans l'Essonne (91).
Migration depuis WordPress vers **Astro 5** (adaptateur Node standalone), déployé via **Coolify** (Docker, derrière Traefik + Cloudflare).

## Développement

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build de production -> dist/
node ./dist/server/entry.mjs   # lancer le serveur de prod localement
```

## Architecture

- `src/data/site.ts` — identité de l'entreprise (NAP, horaires, géo). **Source unique.**
- `src/data/communes.ts` — communes desservies (slug / nom / préposition). Pilote la route `/couvreur-{slug}/`.
- `src/layouts/Layout.astro` — `<head>` + données structurées (`WebSite` + `RoofingContractor`, logo de marque SERP).
- `src/pages/couvreur-[ville].astro` — génère les pages villes prioritaires.
- `src/pages/index.astro`, `404.astro`, composants `Header`/`Footer`.

## Redirections (SEO)

Les **807 redirections 301** de l'ancien WordPress sont dans `redirects.json`, chargé
par `astro.config.mjs` (clé `redirects`). L'adaptateur Node renvoie de vrais 301.
Le mapping complet et lisible est dans `redirections-mapping.csv`.

## À faire avant mise en ligne

- Déposer dans `public/` : `eric-couvreur-logo.png` (carré ≥ 512×512, fond clair),
  `favicon.png` (48×48), `apple-touch-icon.png`.
- Enrichir le contenu des 21 pages villes prioritaires (contenu local unique).
- Ajouter progressivement les communes du palier « INDEX » dans `communes.ts`.

## Déploiement Coolify

Build via le `Dockerfile` (multi-stage, Node 22 alpine). Le conteneur écoute sur
`127.0.0.1:4321` ; Traefik gère le routage et le HTTPS.

## Fichiers de travail (hors site)

`urls-wordpress.csv`, `urls-uniques.txt`, `redirections-mapping.csv`,
`pages-villes-a-produire.csv`, `strategie-contenu.md` — documents de migration
(exclus du build via `.dockerignore`).
