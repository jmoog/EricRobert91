import type { APIRoute } from 'astro';

// Route rendue à la demande (pas de prérendu statique).
export const prerender = false;

// ────────────────────────────────────────────────────────────────────────
// Variables d'environnement (à configurer dans Coolify) :
//   BREVO_API_KEY        → Clé API Brevo (commence par xkeysib-...)
//   ADMIN_EMAILS          → emails destinataires séparés par virgule (notification)
//   FROM_EMAIL             → expéditeur vérifié dans Brevo (ex : contact@eric-couvreur.fr)
//   FROM_NAME              → nom de l'expéditeur (optionnel)
//   TURNSTILE_SECRET_KEY → secret Cloudflare Turnstile (optionnel)
//
// Pourquoi Brevo et pas SMTP direct : beaucoup d'hébergeurs (Hetzner…) bloquent
// les ports SMTP sortants (25/465/587). L'API HTTPS de Brevo (port 443) contourne
// cette restriction. On évite aussi "noreply" qui dégrade la délivrabilité.
//
// Système identique à celui déployé sur moise-fortin.fr (Brevo + Turnstile +
// honeypot + scoring anti-spam) — voir fortinmoise78/src/pages/api/devis.ts.
// ────────────────────────────────────────────────────────────────────────

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const PRESTATION_LABELS: Record<string, string> = {
  couverture: 'Travaux de couverture',
  renovation: 'Rénovation de toiture',
  reparation: 'Réparation & recherche de fuites',
  'nettoyage-demoussage': 'Nettoyage & démoussage',
  gouttieres: 'Gouttières, noues & chéneaux',
  velux: 'Fenêtres de toit Velux',
  isolation: 'Isolation de toiture (RGE)',
  ravalement: 'Ravalement de façade',
  ramonage: 'Ramonage',
  charpente: 'Traitement de charpente',
  autre: 'Autre / à préciser',
};

// Charte Éric Couvreur (bleu du coq + rouge du toit)
const COLOR_DARK = '#163a5f';
const COLOR_DARKER = '#10273f';
const COLOR_RED = '#e4141b';
const COLOR_LIGHT = '#f5f7fa';
const COLOR_TEXT = '#14202e';
const COLOR_MUTED = '#4a5568';
const COLOR_BORDER = '#e2e8f0';

const SITE_URL = 'https://eric-couvreur.fr';
const LOGO_URL = `${SITE_URL}/eric-couvreur-logo.png`;
const TEL = '06 60 40 43 12';
const TEL_HREF = 'tel:0660404312';
const ENTREPRISE = 'Éric Couvreur';
const ADRESSE = "35 Route d'Orléans, 91310 Linas";

// ────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────

function escapeHtml(s: unknown): string {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nl2br(s: unknown): string {
  return escapeHtml(s).replace(/\r?\n/g, '<br>');
}

interface DevisData {
  nom: string;
  tel: string;
  email: string;
  ville: string;
  prestation: string;
  message?: string;
}

// ────────────────────────────────────────────────────────────────────────
// Brevo API client (fetch direct sur l'API HTTPS, pas de SDK)
// ────────────────────────────────────────────────────────────────────────

interface BrevoSendArgs {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  to: Array<{ email: string; name?: string }>;
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
}

async function brevoSend(args: BrevoSendArgs): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  const body: Record<string, unknown> = {
    sender: { email: args.fromEmail, name: args.fromName },
    to: args.to,
    subject: args.subject,
    htmlContent: args.htmlContent,
  };
  if (args.replyTo) body.replyTo = args.replyTo;

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': args.apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let detail = `HTTP ${res.status}`;
      try {
        const err = await res.json();
        if (err?.message) detail = String(err.message);
        else if (err?.code) detail = String(err.code);
      } catch {}
      return { ok: false, error: detail };
    }

    const json = await res.json().catch(() => ({}) as any);
    return { ok: true, messageId: json?.messageId };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur inconnue';
    return { ok: false, error: msg };
  }
}

// ────────────────────────────────────────────────────────────────────────
// Template — Notification (Éric Couvreur)
// ────────────────────────────────────────────────────────────────────────

function notifTemplate(d: DevisData) {
  const presta = PRESTATION_LABELS[d.prestation] || d.prestation || 'Non précisé';
  const telClean = (d.tel || '').replace(/[^0-9+]/g, '');
  const subject = `Nouvelle demande — ${presta} à ${d.ville}`;
  const prenom = (d.nom || '').split(' ')[0] || 'le client';

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${COLOR_LIGHT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${COLOR_TEXT};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${COLOR_LIGHT};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <tr><td style="background:${COLOR_DARKER};padding:24px 32px;color:#fff;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td valign="middle" width="64" style="padding-right:16px;">
                <img src="${LOGO_URL}" width="56" height="56" alt="${ENTREPRISE}" style="display:block;border-radius:12px;background:#fff;padding:6px;box-sizing:border-box;">
              </td>
              <td valign="middle">
                <div style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;opacity:.7;font-weight:700;">Nouvelle demande de devis</div>
                <div style="font-size:22px;font-weight:800;margin-top:6px;line-height:1.2;">${escapeHtml(presta)}</div>
                <div style="font-size:14px;opacity:.85;margin-top:4px;">à ${escapeHtml(d.ville)}</div>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px 8px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;margin-bottom:8px;">Client</div>
          <div style="font-size:18px;font-weight:700;color:${COLOR_DARKER};">${escapeHtml(d.nom)}</div>
        </td></tr>
        <tr><td style="padding:8px 32px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="50%" valign="top" style="padding:12px 12px 12px 0;">
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;">Téléphone</div>
                <a href="tel:${escapeHtml(telClean)}" style="display:inline-block;margin-top:4px;color:${COLOR_DARK};font-size:16px;font-weight:700;text-decoration:none;">${escapeHtml(d.tel)}</a>
              </td>
              <td width="50%" valign="top" style="padding:12px 0 12px 12px;border-left:1px solid ${COLOR_BORDER};">
                <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;">Email</div>
                <a href="mailto:${escapeHtml(d.email)}" style="display:inline-block;margin-top:4px;color:${COLOR_DARK};font-size:14px;font-weight:600;text-decoration:none;word-break:break-all;">${escapeHtml(d.email)}</a>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:8px 32px 24px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td align="center" style="padding:8px;" width="50%">
                <a href="tel:${escapeHtml(telClean)}" style="display:block;background:${COLOR_RED};color:#fff;text-decoration:none;padding:14px 16px;border-radius:8px;font-weight:700;font-size:14px;">Appeler ${escapeHtml(prenom)}</a>
              </td>
              <td align="center" style="padding:8px;" width="50%">
                <a href="mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent('Re: votre demande de devis — Éric Couvreur')}" style="display:block;background:${COLOR_DARK};color:#fff;text-decoration:none;padding:14px 16px;border-radius:8px;font-weight:700;font-size:14px;">Répondre par email</a>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 32px 24px;">
          <div style="background:${COLOR_LIGHT};border-radius:8px;padding:18px 20px;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;margin-bottom:10px;">Description de la demande</div>
            <div style="font-size:14px;line-height:1.65;color:${COLOR_TEXT};">
              ${d.message ? nl2br(d.message) : '<em style="color:' + COLOR_MUTED + ';">Aucune description fournie.</em>'}
            </div>
          </div>
        </td></tr>
        <tr><td style="background:${COLOR_LIGHT};padding:16px 32px;border-top:1px solid ${COLOR_BORDER};font-size:12px;color:${COLOR_MUTED};text-align:center;">
          Demande reçue le ${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Paris' })}<br>
          via <a href="${SITE_URL}/devis-gratuit/" style="color:${COLOR_DARK};text-decoration:none;">eric-couvreur.fr/devis-gratuit/</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { subject, html };
}

// ────────────────────────────────────────────────────────────────────────
// Template — Accusé de réception client
// ────────────────────────────────────────────────────────────────────────

function ackTemplate(d: DevisData) {
  const presta = PRESTATION_LABELS[d.prestation] || d.prestation || 'votre demande';
  const subject = `Nous avons bien reçu votre demande — ${ENTREPRISE}`;
  const prenom = (d.nom || '').split(' ')[0];

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${COLOR_LIGHT};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${COLOR_TEXT};">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:${COLOR_LIGHT};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
        <tr><td style="background:${COLOR_DARKER};padding:32px 32px 28px;color:#fff;text-align:center;">
          <img src="${LOGO_URL}" width="72" height="72" alt="${ENTREPRISE}" style="display:block;margin:0 auto 14px;border-radius:14px;background:#fff;padding:8px;box-sizing:border-box;">
          <div style="font-size:20px;font-weight:800;">${ENTREPRISE}</div>
          <div style="font-size:13px;opacity:.85;margin-top:2px;">Artisan couvreur RGE Qualibat dans l’Essonne (91)</div>
        </td></tr>
        <tr><td style="padding:32px 32px 12px;">
          <h1 style="margin:0 0 16px;font-size:22px;font-weight:800;color:${COLOR_DARKER};line-height:1.3;">Bonjour ${escapeHtml(prenom)},</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${COLOR_TEXT};">
            J'ai bien reçu votre demande de devis pour <strong>${escapeHtml(presta.toLowerCase())}</strong> à <strong>${escapeHtml(d.ville)}</strong>. Merci de votre confiance.
          </p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${COLOR_TEXT};">
            Je vous recontacte rapidement pour convenir d'une visite et évaluer vos besoins sur place, puis je vous remets un devis détaillé et adapté, sans engagement.
          </p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:${COLOR_TEXT};">
            Pour toute question, vous pouvez aussi m'appeler directement.
          </p>
        </td></tr>
        <tr><td style="padding:0 32px 24px;" align="center">
          <a href="${TEL_HREF}" style="display:inline-block;background:${COLOR_RED};color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px;">Appeler le ${TEL}</a>
        </td></tr>
        <tr><td style="padding:0 32px 28px;">
          <div style="background:${COLOR_LIGHT};border-radius:8px;padding:18px 20px;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:${COLOR_MUTED};font-weight:700;margin-bottom:12px;">Récapitulatif de votre demande</div>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="font-size:14px;">
              <tr><td style="padding:4px 0;color:${COLOR_MUTED};width:120px;">Prestation</td>
                  <td style="padding:4px 0;color:${COLOR_TEXT};font-weight:600;">${escapeHtml(presta)}</td></tr>
              <tr><td style="padding:4px 0;color:${COLOR_MUTED};">Commune</td>
                  <td style="padding:4px 0;color:${COLOR_TEXT};font-weight:600;">${escapeHtml(d.ville)}</td></tr>
              <tr><td style="padding:4px 0;color:${COLOR_MUTED};">Téléphone</td>
                  <td style="padding:4px 0;color:${COLOR_TEXT};font-weight:600;">${escapeHtml(d.tel)}</td></tr>
            </table>
          </div>
        </td></tr>
        <tr><td style="padding:0 32px 28px;">
          <p style="margin:0;font-size:15px;line-height:1.5;color:${COLOR_TEXT};">
            À très vite,<br>
            <strong style="color:${COLOR_DARKER};">Éric Robert</strong><br>
            <span style="color:${COLOR_MUTED};font-size:13px;">Artisan couvreur RGE Qualibat — Essonne (91)</span>
          </p>
        </td></tr>
        <tr><td style="background:${COLOR_DARKER};padding:20px 32px;color:#fff;text-align:center;font-size:12px;line-height:1.6;">
          <strong style="font-size:14px;">${ENTREPRISE}</strong><br>
          ${ADRESSE}<br>
          <a href="${SITE_URL}" style="color:#fff;text-decoration:underline;opacity:.85;">eric-couvreur.fr</a> &nbsp;·&nbsp; <a href="${TEL_HREF}" style="color:#fff;text-decoration:underline;opacity:.85;">${TEL}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { subject, html };
}

// ────────────────────────────────────────────────────────────────────────
// Anti-spam — scoring de contenu
//
// Ce spam-là remplit correctement les champs (le honeypot ne suffit pas). On
// le reconnaît à son CONTENU : pitch SEO/marketing, liens, numéros étrangers,
// rafales d'emojis. On additionne des points par signal ; au-delà du seuil on
// rejette EN SILENCE (réponse 200 ok:true → le spammeur ne sait pas qu'il est
// filtré et n'adapte pas son envoi). 5 = bon compromis de départ.
// ────────────────────────────────────────────────────────────────────────

const SPAM_THRESHOLD = 5;

const SPAM_KEYWORDS: Array<{ re: RegExp; pts: number; label: string }> = [
  { re: /\bavis\s+(google|positif|5\s*etoile)/i, pts: 4, label: 'avis google' },
  { re: /\b(google\s+maps|trustpilot|tripadvisor|thumbtack|yelp)\b/i, pts: 3, label: 'plateformes avis' },
  { re: /\b(seo|referencement)\s+(all\s+)?service/i, pts: 3, label: 'seo service' },
  { re: /marketing\s+digital/i, pts: 3, label: 'marketing digital' },
  { re: /\b(premiere|1ere)\s+page\s+(de\s+)?google/i, pts: 3, label: '1ère page google' },
  { re: /\bfreelance\b/i, pts: 2, label: 'freelance' },
  { re: /\b(rank|ranking|classement)\b.*\bgoogle\b/i, pts: 2, label: 'ranking google' },
  { re: /\b(boost|propuls|promo(tion|uvoir))\b.*\b(entreprise|business|vente)/i, pts: 2, label: 'boost business' },
  { re: /\b(backlink|backlinks|guest\s*post)\b/i, pts: 3, label: 'backlinks' },
  { re: /\b(whatsapp|telegram|skype)\b/i, pts: 2, label: 'messagerie démarchage' },
];

// Indicatifs internationaux quasi exclusivement spam pour un couvreur 91.
const SPAM_PHONE_PREFIXES = ['+880', '+234', '+92', '+91', '+233', '+212255'];

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

interface SpamVerdict {
  score: number;
  reasons: string[];
}

function spamScore(d: DevisData): SpamVerdict {
  const reasons: string[] = [];
  let score = 0;
  const haystackRaw = `${d.message || ''} ${d.nom} ${d.ville}`;
  const haystack = normalize(haystackRaw);

  for (const { re, pts, label } of SPAM_KEYWORDS) {
    if (re.test(haystack)) {
      score += pts;
      reasons.push(`kw:${label}(+${pts})`);
    }
  }

  const urlMatches = haystackRaw.match(/https?:\/\/|wa\.me|t\.me|bit\.ly|\b\w+\.(ru|cn|top|xyz)\b/gi);
  if (urlMatches) {
    const pts = Math.min(urlMatches.length * 2, 6);
    score += pts;
    reasons.push(`liens×${urlMatches.length}(+${pts})`);
  }

  const telClean = (d.tel || '').replace(/[\s.\-()]/g, '');
  for (const prefix of SPAM_PHONE_PREFIXES) {
    if (telClean.startsWith(prefix)) {
      score += 4;
      reasons.push(`tel:${prefix}(+4)`);
      break;
    }
  }

  const emojiCount = (haystackRaw.match(
    /[\u2600-\u27BF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2705\u2B50\u260E\uFE0F]/g
  ) || []).length;
  if (emojiCount >= 4) {
    const pts = Math.min(Math.floor(emojiCount / 2), 5);
    score += pts;
    reasons.push(`emojis×${emojiCount}(+${pts})`);
  }

  const msg = normalize(d.message || '');
  const enHits = (msg.match(/\b(your|business|service|please|will|contact|provide|expert|verified|review)\b/g) || []).length;
  if (enHits >= 4) {
    score += 2;
    reasons.push(`anglais×${enHits}(+2)`);
  }

  return { score, reasons };
}

// ────────────────────────────────────────────────────────────────────────
// Handler POST /api/devis
// ────────────────────────────────────────────────────────────────────────

const jsonResponse = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('[devis] BREVO_API_KEY missing');
    return jsonResponse(500, { ok: false, error: 'Configuration serveur incomplète.' });
  }

  let raw: any;
  try {
    raw = await request.json();
  } catch {
    return jsonResponse(400, { ok: false, error: 'Invalid JSON' });
  }

  // Anti-spam #1 : champ honeypot "website" doit rester vide.
  if (raw?.website && String(raw.website).trim() !== '') {
    console.warn('[devis] spam bloqué (honeypot)');
    return jsonResponse(200, { ok: true });
  }

  // Anti-spam #2 : time-trap optionnel — si le front envoie "ts" (timestamp de
  // chargement du formulaire), on rejette en silence les envois trop rapides
  // (< 3 s = bot). Absent ⇒ ignoré (rétrocompatible).
  if (raw?.ts) {
    const elapsed = Date.now() - Number(raw.ts);
    if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 3000) {
      console.warn(`[devis] spam bloqué (time-trap, ${elapsed}ms)`);
      return jsonResponse(200, { ok: true });
    }
  }

  // Cloudflare Turnstile — actif uniquement si le secret est configuré.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = raw?.['cf-turnstile-response'];
    if (!token) {
      return jsonResponse(400, { ok: false, error: 'Validation anti-robot manquante. Merci de réessayer.' });
    }
    try {
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: turnstileSecret, response: String(token) }),
      });
      const result: any = await verify.json().catch(() => ({}));
      if (!result?.success) {
        return jsonResponse(403, { ok: false, error: 'Échec de la validation anti-robot. Merci de réessayer.' });
      }
    } catch {
      return jsonResponse(502, { ok: false, error: 'Validation anti-robot indisponible, merci de réessayer.' });
    }
  }

  const required = ['nom', 'tel', 'email', 'ville'] as const;
  for (const f of required) {
    if (!raw?.[f] || String(raw[f]).trim() === '') {
      return jsonResponse(400, { ok: false, error: `Champ manquant : ${f}` });
    }
  }

  const data: DevisData = {
    nom: String(raw.nom).trim().slice(0, 100),
    tel: String(raw.tel).trim().slice(0, 30),
    email: String(raw.email).trim().slice(0, 200),
    ville: String(raw.ville).trim().slice(0, 100),
    prestation: String(raw.prestation || '').trim().slice(0, 80),
    message: String(raw.message || '').trim().slice(0, 4000),
  };

  // Anti-spam #3 : scoring de contenu (le vrai filtre contre le démarchage SEO
  // qui remplit correctement les champs). Au-delà du seuil, rejet EN SILENCE.
  const verdict = spamScore(data);
  if (verdict.score >= SPAM_THRESHOLD) {
    console.warn(
      `[devis] spam bloqué (score ${verdict.score}/${SPAM_THRESHOLD}) — ${verdict.reasons.join(', ')}`
    );
    return jsonResponse(200, { ok: true });
  }

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (adminEmails.length === 0) {
    console.error('[devis] ADMIN_EMAILS missing');
    return jsonResponse(500, { ok: false, error: 'Configuration serveur incomplète.' });
  }

  const fromEmail = process.env.FROM_EMAIL || 'contact@eric-couvreur.fr';
  const fromName = process.env.FROM_NAME || ENTREPRISE;

  // 1) Notification (bloquante)
  const notif = notifTemplate(data);
  const r1 = await brevoSend({
    apiKey,
    fromEmail,
    fromName,
    to: adminEmails.map((email) => ({ email })),
    replyTo: { email: data.email, name: data.nom },
    subject: notif.subject,
    htmlContent: notif.html,
  });

  if (!r1.ok) {
    console.error('[devis] Erreur envoi notification (Brevo):', r1.error);
    return jsonResponse(502, {
      ok: false,
      error: `Envoi impossible pour le moment, merci de m'appeler au ${TEL}.`,
    });
  }

  // 2) Accusé client (best effort)
  const ack = ackTemplate(data);
  const r2 = await brevoSend({
    apiKey,
    fromEmail,
    fromName: ENTREPRISE,
    to: [{ email: data.email, name: data.nom }],
    replyTo: { email: fromEmail, name: fromName },
    subject: ack.subject,
    htmlContent: ack.html,
  });
  if (!r2.ok) {
    console.error('[devis] Échec accusé client (non bloquant):', r2.error);
  }

  return jsonResponse(200, { ok: true });
};

export const GET: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
