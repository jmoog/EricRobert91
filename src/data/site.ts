// Données partagées du site eric-couvreur.fr
// (contact, identité, zone) — source unique pour le SEO local et les composants.

export const company = {
  name: 'Éric Couvreur',
  trade: 'Artisan Couvreur RGE Qualibat',
  founder: 'Éric Robert',
  region: 'Essonne (91)',
  baseline: 'Artisan couvreur RGE Qualibat dans l’Essonne — couverture, isolation, ravalement',
  foundingDate: '2009',

  // Contact — UN SEUL numéro partout (cohérence NAP)
  mobile: '06 60 40 43 12',
  mobileHref: 'tel:0660404312',
  phoneE164: '+33660404312',
  email: 'robert91310@live.fr',

  // Adresse / établissement
  street: '35 Route d’Orléans',
  postalCode: '91310',
  city: 'Linas',
  region_admin: 'Île-de-France',
  geo: { lat: 48.631, lng: 2.271 },

  // Fiches publiques (sameAs). Réseaux sociaux à ajouter plus tard.
  googleUrl: 'https://share.google/b0K3b0RN2g3RkhYaS',
  // Lien direct vers le formulaire de dépôt d'avis Google
  reviewUrl: 'https://g.page/r/CYTlTIwenczHEAE/review',

  // Avis clients Google (fiche Éric Couvreur)
  reviews: { rating: '4,2', count: 11 },

  priceRange: '€€',
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' },
} as const;

// Département + principales communes desservies (SEO local / areaServed)
export const areaServed: string[] = ['Essonne', 'Linas', 'Montlhéry', 'Arpajon', 'Palaiseau', 'Corbeil-Essonnes', 'Évry', 'Massy'];
