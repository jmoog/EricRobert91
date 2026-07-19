// Les redirections 301 (ancien WordPress -> nouvelle structure) sont désormais
// gérées nativement dans astro.config.mjs via la clé `redirects` (table
// redirects.json), qui produit de vrais 301 côté adaptateur Node.
// Ce middleware est conservé comme point d'extension (ex : en-têtes de sécurité)
// mais reste un simple passe-plat.
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((_context, next) => next());
