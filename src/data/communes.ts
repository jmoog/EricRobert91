// Communes desservies — pilote les routes dynamiques /couvreur-{slug}/
// L'URL n'utilise JAMAIS de préposition (slug = nom officiel de la commune).
// La grammaire (à / au / aux / à la) est portée par `prep`, uniquement pour
// l'affichage (H1, title, texte) : « Couvreur {prep} {nom} ».

export type Commune = {
  /** segment d'URL, ex: "les-ulis" → /couvreur-les-ulis/ */
  slug: string;
  /** nom affiché, accentué */
  nom: string;
  /** préposition d'affichage : à | au | aux | à la */
  prep: string;
  /** code postal principal */
  cp: string;
  /** true = page prioritaire (contenu enrichi à produire en premier) */
  prioritaire?: boolean;
};

// Phase 1 — 21 communes prioritaires (demande GSC avérée).
export const communes: Commune[] = [
  { slug: 'linas', nom: 'Linas', prep: 'à', cp: '91310', prioritaire: true },
  { slug: 'arpajon', nom: 'Arpajon', prep: 'à', cp: '91290', prioritaire: true },
  { slug: 'corbeil-essonnes', nom: 'Corbeil-Essonnes', prep: 'à', cp: '91100', prioritaire: true },
  { slug: 'montgeron', nom: 'Montgeron', prep: 'à', cp: '91230', prioritaire: true },
  { slug: 'etrechy', nom: 'Étréchy', prep: 'à', cp: '91580', prioritaire: true },
  { slug: 'savigny-sur-orge', nom: 'Savigny-sur-Orge', prep: 'à', cp: '91600', prioritaire: true },
  { slug: 'morsang-sur-orge', nom: 'Morsang-sur-Orge', prep: 'à', cp: '91390', prioritaire: true },
  { slug: 'mereville', nom: 'Méréville', prep: 'à', cp: '91660', prioritaire: true },
  { slug: 'milly-la-foret', nom: 'Milly-la-Forêt', prep: 'à', cp: '91490', prioritaire: true },
  { slug: 'palaiseau', nom: 'Palaiseau', prep: 'à', cp: '91120', prioritaire: true },
  { slug: 'sainte-genevieve-des-bois', nom: 'Sainte-Geneviève-des-Bois', prep: 'à', cp: '91700', prioritaire: true },
  { slug: 'igny', nom: 'Igny', prep: 'à', cp: '91430', prioritaire: true },
  { slug: 'orsay', nom: 'Orsay', prep: 'à', cp: '91400', prioritaire: true },
  { slug: 'gif-sur-yvette', nom: 'Gif-sur-Yvette', prep: 'à', cp: '91190', prioritaire: true },
  { slug: 'draveil', nom: 'Draveil', prep: 'à', cp: '91210', prioritaire: true },
  { slug: 'evry', nom: 'Évry-Courcouronnes', prep: 'à', cp: '91000', prioritaire: true },
  { slug: 'saclas', nom: 'Saclas', prep: 'à', cp: '91690', prioritaire: true },
  { slug: 'wissous', nom: 'Wissous', prep: 'à', cp: '91320', prioritaire: true },
  { slug: 'pecqueuse', nom: 'Pecqueuse', prep: 'à', cp: '91470', prioritaire: true },
  { slug: 'champlan', nom: 'Champlan', prep: 'à', cp: '91160', prioritaire: true },
  { slug: 'la-ville-du-bois', nom: 'La Ville-du-Bois', prep: 'à', cp: '91620', prioritaire: true },
];

/** Libellé grammaticalement correct : « Couvreur à Arpajon », « Couvreur aux Ulis »… */
export const libelleVille = (c: Commune) => `Couvreur ${c.prep} ${c.nom}`;

/** URL canonique de la page ville */
export const urlVille = (c: Commune) => `/couvreur-${c.slug}/`;
