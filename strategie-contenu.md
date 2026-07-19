# Stratégie de contenu — eric-couvreur.fr

**Contexte :** migration WordPress → Astro. Ce document définit la stratégie de contenu à appliquer pendant la migration, fondée sur les données Google Search Console (indexation + performances 3 mois) et sur la structure réelle des 828 URLs du site.

**Date :** 17 juillet 2026

---

## 1. Le constat en chiffres

Le site publie beaucoup, mais Google en ignore la majorité et n'envoie quasiment aucun trafic.

| Indicateur | Valeur | Lecture |
|---|---|---|
| Pages indexées | ~324 | En baisse (370 → 324 en un mois) |
| Pages **non** indexées | ~513 | En hausse (469 → 513) — soit **~61 % du site** |
| Pages avec ≥1 impression / 3 mois | **224 / 828 (27 %)** | 604 pages totalement invisibles |
| Clics organiques / 3 mois | **45** (France) | CTR 0,42 %, position moyenne 15,7 (page 2) |
| Part de l'accueil | 4 028 impressions | **36 % des impressions** viennent d'une seule page |

Les deux causes d'exclusion dominantes dans GSC sont sans ambiguïté :

- **276 pages « Détectée, actuellement non indexée »** — Google les connaît mais ne dépense même pas de budget d'exploration pour elles.
- **235 pages « Explorée, actuellement non indexée »** — Google les a vues et a *décidé* de ne pas les indexer.

Ces 511 pages sont le signal clair que Google juge une grande partie du site **sans valeur ajoutée suffisante**.

---

## 2. Diagnostic — pourquoi 61 % des pages ne sont pas indexées

### 2.1 Duplication massive (le problème n°1)

Le site applique une logique de « pages tiroir » (doorway pages) : le même service décliné mécaniquement sur chaque commune, avec le nom de ville substitué.

- **176 communes possèdent chacune 4 pages quasi-identiques** : `couvreur-a-{ville}`, `pose-de-velux-a-{ville}`, `isolation-des-rampants-a-{ville}`, `artisan/couvreur-rge-a-{ville}`.
- Cela représente **~704 pages pour seulement 218 communes couvertes**.
- Google considère ce schéma comme du contenu dupliqué à faible valeur → il refuse d'indexer, exactement ce qu'on observe.

### 2.2 Cannibalisation entre silos

Pour une même ville, 4 pages visent des intentions qui se recoupent (« couvreur à Linas » vs « artisan couvreur RGE à Linas » vs « pose velux Linas »). Elles se concurrencent entre elles dans les résultats, diluent les signaux, et aucune ne ressort vraiment. Résultat : positions moyennes en page 2 (15,7) sur des requêtes que le site *devrait* dominer localement.

### 2.3 URLs doublons et héritage

On trouve des paires d'URLs pour le même contenu : suffixes `-2` (`couvreur-a-arpajon-2`, `couvreur-a-leudeville-91630-2`), versions avec et sans code postal (`couvreur-a-la-ville-du-bois` vs `…-91620`), variantes `-cedex`. Autant de duplication interne supplémentaire.

### 2.4 Budget d'exploration gaspillé

Avec 604 pages sans aucune impression, Google explore (ou n'explore plus) une masse de pages inutiles au lieu de concentrer son attention sur les pages qui comptent. Cela pénalise l'ensemble du domaine.

### 2.5 Performance par silo (3 mois)

| Silo | Pages vues par GSC | Clics | Impressions |
|---|---|---|---|
| Accueil | 1 | 17 | 4 028 |
| Artisan RGE (`/artisan/`) | 58 | 10 | 2 411 |
| Couvreur ville (`/couvreur-a-`) | 70 | 8 | 2 237 |
| Pose velux (`/pose-de-velux-a-`) | 36 | 2 | 1 479 |
| Pages de service / institutionnelles | 11 | 7 | 1 033 |
| Isolation rampants (`/isolation/`) | 43 | 1 | 329 |
| Prestations | 5 | 0 | 131 |

Lecture : le silo **isolation** (43 pages vues, 1 clic) est du poids mort quasi total. Le silo **velux** génère de la visibilité mais ne convertit pas (positions faibles). Ce sont les pages **couvreur/ville** et **artisan-RGE** qui portent le peu de trafic — c'est là que se concentre la valeur.

---

## 3. Ce que disent les données de demande

La bonne nouvelle : la demande locale existe réellement. Les requêtes le montrent.

**Requêtes têtes de réseau (fort volume) :** `couvreur 91` (1 257 impr.), `couvreur essonne` (524), `artisan couvreur 91` (209), `couvreur en essonne`, `couvreur rge 91`, `couvreur qualibat`. Le site rank déjà en position 9-11 dessus — proche de la page 1, jamais tout à fait.

**Villes à demande avérée** (impressions réelles) : Linas, Arpajon, Palaiseau, Corbeil-Essonnes, Morsang-sur-Orge, Savigny-sur-Orge, Igny, Saclas, Sainte-Geneviève-des-Bois, Évry, Étréchy, Montgeron, La Ville-du-Bois, Méréville, Milly-la-Forêt, Wissous, Pecqueuse, Gif-sur-Yvette, Champlan, Orsay, Draveil.

**Opportunité RAMONAGE (sous-exploitée) :** forte demande — `ramonage linas` (126), `ramonage draveil` (77), `ramonage montgeron` (70), `ramonage lardy` (68), `ramonage limours` (63), `ramonage igny` (63), `ramonage yerres` (62), `ramonage dourdan` (57), + itteville, breuillet, longjumeau, wissous. Or le site n'a **qu'une seule page ramonage** (`/prestations/ramonage-91/`), qui rank très mal (positions 25-40). Créer un vrai maillage ramonage = gisement immédiat.

**Autres services demandés, peu ou pas couverts :** `nettoyage toiture` (corbeil, linas), `démoussage / décapage de toiture`, `couverture {ville}` (saclas, méréville, étréchy), `charpentier`, `ravalement de façade`, `traitement de charpente`, `isolation toiture`.

**Velux :** `pose velux essonne`, `velux evry`, `installateur velux 91`, `remplacement velux essonne` — demande réelle mais positions faibles (20-40).

**Signaux de confiance recherchés :** `couvreur rge qualibat`, `couvreur qualibat rge`, `eric couvreur`, `eric robert` (marque). Le label RGE/Qualibat est un argument que les gens tapent — il doit être mis en avant.

---

## 4. Stratégie cible : de « pages tiroir » à « hubs + pages locales à valeur »

Principe directeur : **moins de pages, mais chacune mérite d'exister.** On remplace 700 pages jumelles par une architecture hiérarchisée où chaque page a une intention unique et un contenu réellement différencié.

### 4.1 Architecture cible (silos / cocon sémantique)

```
Accueil (couvreur RGE en Essonne)
│
├── HUB Couverture / Toiture 91        (page pilier service)
│     └── pages villes prioritaires : couvreur à {ville}
│
├── HUB Ramonage 91                    (page pilier — À CRÉER)
│     └── pages villes prioritaires : ramonage à {ville}
│
├── HUB Fenêtres de toit / Velux 91
│     └── pages villes prioritaires : pose de velux à {ville}
│
├── HUB Isolation de toiture 91
│     └── pages villes prioritaires (peu, ciblées)
│
├── HUB Nettoyage / démoussage toiture 91   (à créer)
├── HUB Ravalement de façade 91
├── HUB Charpente (traitement / diagnostic)
│
└── Pages de confiance : À propos (RGE Qualibat), Réalisations, Avis, Contact, Zone d'intervention
```

### 4.2 Règle d'or : 1 page = 1 intention = 1 couple (service + ville)

Pour une ville donnée, on ne garde **pas** 4 pages concurrentes. On choisit la déclinaison qui a du sens et de la demande, et on redirige les autres vers le hub de service ou la page ville retenue. Fini la cannibalisation.

### 4.3 Template anti-duplication (obligatoire pour chaque page ville)

Une page ville ne doit **jamais** être un copier-coller avec le nom substitué. Chaque page conservée doit contenir des éléments locaux uniques :

- un paragraphe d'introduction réellement spécifique (type d'habitat local, contraintes de toiture de la commune, quartiers) ;
- 1 à 3 **réalisations/chantiers** réels dans le secteur, avec photos originales ;
- des mentions concrètes : délais d'intervention depuis la base, communes limitrophes desservies, particularités (tuiles plates, ardoise, zinc selon le bâti local) ;
- un avis client localisé si disponible ;
- un maillage interne contextualisé (vers le hub service + 3-4 villes voisines).

Si on ne peut pas produire ce contenu unique pour une ville, **elle ne mérite pas sa propre page** — on la couvre via le hub service et sa page « zone d'intervention ».

---

## 5. Plan d'action par phases

### Phase 0 — Pendant la migration Astro (fondations techniques)

Objectif : ne rien casser et nettoyer la duplication dès le départ.

- **Préserver à l'identique les URLs qui rankent** (accueil, top pages couvreur/artisan/velux qui ont des impressions) — pas de changement de slug.
- **Plan de redirections 301** pour tout ce qu'on consolide ou supprime (voir §7).
- **Canonical propre** sur chaque page (auto-référente), suppression des doublons `-2` / avec-sans code postal.
- **`noindex` temporaire** sur les pages thin qu'on ne traitera pas tout de suite, pour concentrer le budget d'exploration sur les pages à valeur (à lever page par page une fois enrichies).
- **Sitemap propre** ne listant que les pages indexables et à valeur (pas les 700 doublons).
- **Schema `LocalBusiness` / `RoofingContractor`** + `AggregateRating` + NAP cohérent sur tout le site.

### Phase 1 — Renforcer les hubs de service (impact rapide)

Créer/muscler les pages piliers : Couverture 91, **Ramonage 91**, Velux 91, Isolation 91, Nettoyage-démoussage 91, Ravalement 91, Charpente. Chaque hub : contenu approfondi, prix indicatifs, process, FAQ, label RGE Qualibat mis en avant, liens vers les villes prioritaires. Ce sont eux qui capteront `couvreur 91`, `couvreur essonne`, `ramonage essonne`, etc. (les requêtes à plus fort volume).

### Phase 2 — Pages villes prioritaires (data-driven)

On enrichit avec le template §4.3 **uniquement** les villes à demande prouvée (§6). Pour chacune, on choisit UNE page couvreur/ville de référence et on y consolide.

### Phase 3 — Exploiter le gisement ramonage + services manquants

Déployer un maillage ramonage sur les villes où la demande est déjà mesurée (Linas, Draveil, Montgeron, Lardy, Limours, Igny, Yerres, Dourdan…). Idem nettoyage/démoussage. C'est le meilleur rapport effort/gain à court terme.

### Phase 4 — Consolider / désindexer le reste

Les ~500 pages thin sans demande : soit fusionnées vers le hub service (301), soit maintenues en `noindex` tant qu'elles ne sont pas enrichies. Objectif : remonter le taux d'indexation utile bien au-dessus des 39 % actuels en **réduisant** le nombre de pages, pas en l'augmentant.

---

## 6. Priorisation (par où commencer)

### Services (par volume de demande)

1. **Couvreur / couverture 91** — cœur de métier, plus gros volume, déjà en position 9-11.
2. **Ramonage** — forte demande, quasi aucune page, mauvaises positions → gain rapide.
3. **Velux / fenêtres de toit** — demande réelle, à repositionner.
4. **Nettoyage / démoussage de toiture** — demande émergente, à créer.
5. **Isolation, ravalement, charpente** — en soutien.

### Villes prioritaires (demande GSC avérée)

Linas, Arpajon, Palaiseau, Corbeil-Essonnes, Morsang-sur-Orge, Savigny-sur-Orge, Igny, Sainte-Geneviève-des-Bois, Évry, Étréchy, Montgeron, Saclas, Méréville, La Ville-du-Bois, Milly-la-Forêt, Gif-sur-Yvette, Orsay, Draveil, Wissous, Pecqueuse, Champlan.

Ces ~20 communes concentrent l'essentiel des impressions actuelles : elles doivent avoir des pages exemplaires **avant** d'en créer de nouvelles ailleurs.

---

## 7. Redirections (principes)

- Chaque URL supprimée ou fusionnée → **301** vers l'équivalent le plus pertinent (page ville conservée ou hub service), jamais vers l'accueil en masse.
- Doublons `-2`, variantes code postal, `-cedex` → 301 vers la version canonique unique.
- Silos consolidés (ex. 4 pages d'une petite commune → 1) → 301 des 3 supprimées vers celle conservée ou vers le hub.
- Le fichier `urls-wordpress.csv` (828 URLs, typées par silo) sert de base pour construire le tableau de mapping `ancienne URL → nouvelle URL → type`.
- Objectif : zéro 404 sur des URLs qui avaient des impressions, aucune chaîne de redirection.

## 8. Signaux de confiance (E-E-A-T local)

- Mettre en avant **RGE Qualibat** partout (les gens le cherchent) : badge, numéro, page dédiée.
- Page **Réalisations** avec vrais chantiers photographiés (preuve d'expérience).
- **Avis clients** structurés (schema) — la marque « eric couvreur / eric robert » est déjà recherchée.
- NAP (nom, adresse, téléphone) cohérent site + Google Business Profile + annuaires locaux.

## 9. KPIs à suivre

- **Taux d'indexation utile** : pages à valeur indexées / total (viser >80 %, en réduisant le total).
- **Pages avec ≥1 impression** : 27 % aujourd'hui → objectif de progression.
- **Position moyenne** sur les têtes de réseau (`couvreur 91`, `couvreur essonne`) : 9-11 → page 1.
- **Clics organiques** : 45/3 mois → croissance mois par mois.
- **CTR** : 0,42 % → amélioration via titres/metas et rich results (schema, avis).

---

## 10. Synthèse

Le problème n'est pas un manque de pages — c'est un **excès de pages dupliquées**. La migration Astro est le bon moment pour inverser la logique : passer de ~700 pages tiroir que Google ignore à un ensemble resserré de **hubs de service solides + pages locales réellement différenciées**, priorisées par la demande réelle. Moins de pages, mieux traitées, correctement maillées et redirigées : c'est la voie pour sortir de la page 2 et transformer les 10 000 impressions/trimestre actuelles en trafic.
