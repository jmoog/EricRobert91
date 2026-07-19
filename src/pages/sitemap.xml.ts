// Sitemap XML — https://eric-couvreur.fr/sitemap.xml
// Généré au build : pages statiques + les pages villes depuis communes.ts.
// (merci, 404 et les routes API sont volontairement exclues.)
import type { APIRoute } from 'astro';
import { communes, urlVille } from '../data/communes';

export const prerender = true;

const SITE = 'https://eric-couvreur.fr';

const pages = [
  '/',
  '/travaux-de-couverture/',
  '/prestations/renovation-detoiture/',
  '/reparation-toiture-fuite-91/',
  '/nettoyage-demoussage-toiture-91/',
  '/traitement-anti-mousse-toiture-91/',
  '/traitement-hydrofuge-toiture-91/',
  '/installateur-de-velux-91/',
  '/isolation-des-combles/',
  '/isolation-des-rampants/',
  '/prestations/isolation-de-toiture-91/',
  '/traitement-de-charpente/',
  '/prestations/ramonage-91/',
  '/prestations/ravalement-de-facade-91/',
  '/devis-gratuit/',
  '/mentions-legales/',
];

export const GET: APIRoute = () => {
  const urls = [...pages, ...communes.map((c) => urlVille(c))];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
