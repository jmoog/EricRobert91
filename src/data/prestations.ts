// Données partagées : domaines RGE Qualibat + icônes SVG.
// Utilisé par l'accueil et la page « Devis gratuit ».

export const icons: Record<string, string> = {
  roof: '<path d="M3 11 12 4l9 7"/><path d="M5 10v9h14v-9"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/>',
  shield: '<path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6z"/>',
  wall: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 15h18M9 4v5m6 0v6M9 15v5"/>',
  chimney: '<path d="M4 21V9l8-5 8 5v12"/><path d="M16 6V3h3v5"/>',
  window: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 12h16M12 4v16"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>',
};

export const svg = (name: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] ?? ''}</svg>`;

export interface Prestation {
  titre: string;
  desc: string;
  url: string;
  brand: 'velux' | 'icon';
  icon?: string;
  photo?: string;
  accent?: boolean;
  feature?: boolean;
}

// Les 4 mentions RGE Qualibat d'Éric Couvreur (intitulés officiels).
export const prestationsRge: Prestation[] = [
  { titre: 'Fenêtres de toit Velux', desc: 'Pose et remplacement de Velux dans le 91 : plus de lumière naturelle et une meilleure isolation.', url: '/installateur-de-velux-91/', brand: 'velux', accent: true, feature: true, photo: '/photo-velux.webp' },
  { titre: 'Isolation par l’intérieur des murs, rampants de toitures ou plafonds', desc: 'Isolation thermique par l’intérieur, idéale pour les combles aménagés et les rampants de toiture.', url: '/isolation-des-rampants/', brand: 'icon', icon: 'shield', photo: '/photo-isolation-interieur.webp' },
  { titre: 'Isolation des toitures-terrasses ou des toitures par l’extérieur', desc: 'Isolation par l’extérieur (sarking, toiture-terrasse) : performance maximale sans perdre de volume habitable.', url: '/prestations/isolation-de-toiture-91/', brand: 'icon', icon: 'roof', photo: '/photo-sarking.webp' },
  { titre: 'Isolation des combles perdus', desc: 'Isolant posé dans les combles non aménagés : le geste le plus rentable pour réduire vos factures.', url: '/isolation-des-combles/', brand: 'icon', icon: 'layers', photo: '/isolation-combles-perdus.webp' },
];
