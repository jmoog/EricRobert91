# Contexte projet — eric-couvreur.fr (mémoire de référence pour le contenu)

Document de référence à garder ouvert pendant la rédaction du contenu. Il résume ce qui a été construit, les décisions prises, les données SEO et les règles à respecter pour que le contenu performe.

_Dernière mise à jour : 17 juillet 2026._

---

## 1. Le projet en bref

Migration du site WordPress **eric-couvreur.fr** vers **Astro 5** (adaptateur Node standalone), déployé via **Coolify** chez Hetzner (Docker, derrière Traefik + Cloudflare). Même stack que le site modèle `fortinmoise78` (Moïse Fortin Couvreur).

**Objectif SEO central :** sortir de la logique « pages tiroir » (700+ pages quasi-dupliquées, dont 61 % non indexées par Google) pour aller vers un ensemble resserré de **hubs services solides + pages villes réellement différenciées**, avec le label **RGE Qualibat** comme fil conducteur.

---

## 2. Identité & positionnement

- **Entreprise :** Eric Couvreur — artisan **couvreur RGE Qualibat** dans l'Essonne (91).
- **Dirigeant :** Eric Robert.
- **Depuis :** 2009.
- **Adresse :** 35 Route d'Orléans, 91310 Linas.
- **Téléphone (unique, NAP) :** 06 60 40 43 12.
- **Email :** robert91310@live.fr.
- **Horaires :** Lun–Sam 08:00–20:00.
- **Fiche Google :** maps.app.goo.gl/FfENFaftWpEN7jDB8.
- Ces données vivent dans `src/data/site.ts` (source unique) → utilisées partout + dans le schema.

**Positionnement à renforcer (stratégie en cours de révision par le client) :** recentrer autour du **RGE et des qualifications d'Eric Robert**. Prévoir : hub « Couvreur RGE Qualibat » mis en avant, page « À propos » axée certifications, bloc de réassurance RGE réutilisable sur chaque page. → _À compléter : numéros/domaines Qualibat exacts, garantie décennale, assurances._

---

## 3. Ce que disent les données Google (à exploiter dans le contenu)

Sur 3 mois : ~45 clics, ~10 800 impressions, position moyenne 15,7 (page 2), CTR 0,42 %. L'accueil concentre 36 % des impressions. Seules 27 % des pages ont eu une impression.

**Requêtes à fort volume (têtes de réseau) — pour les hubs :**
`couvreur 91` (1257 impr.), `couvreur essonne` (524), `artisan couvreur 91` (209), `couvreur en essonne`, `couvreur rge 91`, `couvreur qualibat`, `couvreur rge qualibat`. Le site rank déjà en position 9-11 dessus → contenu à muscler pour passer en page 1.

**GISEMENT RAMONAGE (prioritaire, sous-exploité) :** forte demande mais une seule page et positions 25-40. Villes avec demande mesurée : Linas (126), Draveil (77), Montgeron (70), Lardy (68), Limours (63), Igny (63), Yerres (62), Dourdan (57), + Itteville, Breuillet, Longjumeau, Wissous. → Créer un vrai maillage ramonage.

**Autres services demandés, peu/pas couverts :** `nettoyage / démoussage de toiture`, `décapage de toiture`, `couverture {ville}`, `charpentier`, `isolation toiture {ville}`, `pose velux {ville}`, `installateur velux 91`.

**Marque recherchée :** `eric couvreur`, `eric robert` → soigner l'entité (À propos, avis, schema).

---

## 4. Architecture des URLs & redirections

**Motif d'URL des pages villes :** `/couvreur-{slug}/` — **sans préposition** (le slug = nom officiel de la commune, article inclus). Ex : `/couvreur-arpajon/`, `/couvreur-les-ulis/`, `/couvreur-le-coudray-montceaux/`.

- La grammaire correcte (« à / au / aux / à la ») est portée par le champ `prep` dans `src/data/communes.ts`, **uniquement pour l'affichage** (H1, title, texte) : « Couvreur à Arpajon », « Couvreur aux Ulis ». Jamais dans l'URL.
- Une **seule page par ville** (fini la cannibalisation couvreur/velux/isolation/artisan).

**Hubs services (URLs conservées de l'ancien site, elles rankent) :**
`/travaux-de-couverture/`, `/prestations/renovation-detoiture/`, `/prestations/isolation-de-toiture-91/`, `/prestations/ravalement-de-facade-91/`, `/prestations/ramonage-91/`, `/installateur-de-velux-91/`, `/artisan-couvreur-rge-91/`, `/traitement-de-charpente/`, `/isolation-des-combles/`, `/isolation-des-rampants/`, `/diagnostic-de-charpentes/`.

**Redirections :** 807 × 301 dans `redirects.json`, chargées par `astro.config.mjs` (clé `redirects`). Toutes les anciennes URLs WP (couvreur/velux/artisan/isolation, doublons `-2`, codes postaux) pointent vers la page ville prioritaire ou le hub adéquat. Mapping lisible : `redirections-mapping.csv`. **Ne pas casser ces URLs cibles.**

---

## 5. Règles de contenu (le cœur du SEO)

### Règle d'or anti-duplication
Une page ville ne doit **jamais** être un copier-coller avec le nom de ville substitué. C'est exactement ce qui a fait déclasser l'ancien site. Chaque page conservée doit contenir des **éléments locaux uniques**.

### Éléments obligatoires d'une page ville
1. Introduction **réellement spécifique** (type d'habitat local, contraintes de toiture, quartiers, communes limitrophes).
2. 1 à 3 **réalisations/chantiers réels** du secteur, avec **photos originales** (dispo dans `webp/`, ~130 chantiers).
3. Détails concrets : délais depuis Linas, zone desservie, particularités (tuiles plates, ardoise, zinc selon le bâti local).
4. **Bloc réassurance RGE Qualibat** (certifications, garantie décennale, devis gratuit).
5. Avis client localisé si disponible.
6. **Maillage interne** contextualisé : vers le(s) hub(s) service + 3-4 villes voisines.
7. Un seul **couple service+ville** par page, intention claire (« couvreur à {ville} »).

> Si on ne peut pas produire ce contenu unique pour une ville, elle ne mérite pas sa propre page — elle est couverte par les hubs (c'est le cas des 175 communes non prioritaires, redirigées vers les hubs pour l'instant).

### Éléments d'un hub service
Contenu approfondi, process, prix indicatifs, FAQ, label RGE mis en avant, liens vers les villes prioritaires. Les hubs captent les requêtes à plus fort volume (`couvreur 91`, `ramonage essonne`…).

### E-E-A-T / confiance (à renforcer partout)
RGE Qualibat mis en avant (les gens le cherchent) ; page Réalisations avec vrais chantiers ; avis clients structurés ; NAP cohérent site + Google Business Profile.

---

## 6. Villes prioritaires (phase 1 — à rédiger en premier)

21 communes retenues (demande GSC avérée), dans `src/data/communes.ts`, page générée par `src/pages/couvreur-[ville].astro`. Par ordre d'impressions cumulées sur 3 mois :

| Ville | Impr. 3 mois | Ville | Impr. 3 mois |
|---|---|---|---|
| Saclas | 500 | Étréchy | 154 |
| Arpajon | 413 | Gif-sur-Yvette | 130 |
| Linas | 410 | Méréville | 129 |
| Sainte-Geneviève-des-Bois | 372 | Draveil | 112 |
| Corbeil-Essonnes | 306 | Savigny-sur-Orge | 111 |
| Morsang-sur-Orge | 229 | Champlan | 80 |
| Évry-Courcouronnes | 220 | La Ville-du-Bois | 71 |
| Palaiseau | 206 | Milly-la-Forêt | 68 |
| Igny | 199 | Wissous | 66 |
| Montgeron | 195 | Pecqueuse | 64 |
| | | Orsay | 51 |

_Palier suivant (« INDEX », 63 villes avec trafic mais non prioritaires) : à promouvoir progressivement dans `communes.ts` en les enrichissant. Voir `pages-villes-a-produire.csv`._

---

## 7. Design & assets

**Palette (dérivée du logo) — variables dans `src/styles/global.css` :**
- Bleu principal `#205080` · Bleu foncé `#163A5F` · Bleu nuit `#10273F` (hero/footer)
- Rouge accent/CTA `#E4141B` · Rouge foncé `#B30F14`
- Bleu clair `#EAF1F8` · Gris clair `#F5F7FA` · Encre `#14202E`

**Police :** **Roboto** partout, auto-hébergée via `@fontsource/roboto` (latin, 300/400/500/700/900 ; aucune requête Google au runtime).

**Images :** dossier `webp/` — 153 WebP.
- Logos : `webp/logos/` (logo carré 512×512 déjà converti en `public/eric-couvreur-logo.png`, favicon, Qualibat, Google, fournisseurs).
- Photos services (900×675) : `couverture`, `isolation`, `ravalement`, `traitement`, `gouttieres`, `ramonage-gainage`, `fenetre_de_toit_1`.
- ~130 photos de chantiers numérotées → à répartir sur les pages villes (réalisations).
- ⚠️ Renommer en noms propres (`nom.webp`) en les déplaçant vers `public/` — actuellement double extension `nom.jpg.webp`.

---

## 8. État du projet

**Fait :** scaffold Astro (config, Docker, Layout+head+JSON-LD, Header/Footer, homepage, route villes, 404) ; 21 pages villes ; 807 redirections testées ; logo/favicons dans `public/` ; palette + Roboto ; build vérifié vert et 301 fonctionnels.

**À faire avant mise en ligne :**
1. Rédiger le contenu local unique des 21 pages villes (+ réalisations photos).
2. Muscler les hubs services (surtout **ramonage** = gain rapide).
3. Intégrer les qualifications RGE exactes dans `site.ts` + page « À propos ».
4. Créer le bloc réassurance RGE réutilisable.
5. Déplacer/renommer les photos utiles dans `public/`.
6. Pages contact/mentions légales/à-propos (existent en hub, à recréer en Astro).

---

## 9. Fichiers de travail (à la racine, hors build)

- `strategie-contenu.md` — la stratégie détaillée (diagnostic + plan).
- `redirections-mapping.csv` — mapping lisible des 807 redirections.
- `pages-villes-a-produire.csv` — les 196 villes avec statut (prioritaire / index / noindex).
- `urls-wordpress.csv` — inventaire des 828 URLs d'origine.
- `redirects.json` — table technique des 301 (utilisée par le build).
