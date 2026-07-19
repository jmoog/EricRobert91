// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import { createRequire } from 'node:module';

// Table des 301 (ancien WordPress -> nouvelle structure), générée depuis
// redirections-mapping.csv. Gérée nativement par Astro + adaptateur Node.
const require = createRequire(import.meta.url);
/** @type {Record<string,string>} */
const redirects = require('./redirects.json');

// https://astro.build/config
export default defineConfig({
  site: 'https://eric-couvreur.fr',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  security: { checkOrigin: false },
  compressHTML: true,
  // 807 redirections 301 (valeur string = 301 par défaut).
  redirects,
  vite: { cacheDir: process.env.VITE_CACHE_DIR || undefined },
});
