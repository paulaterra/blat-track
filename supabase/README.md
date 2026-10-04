# Notificacions automàtiques · Supabase + Resend + ntfy

Aquesta carpeta és la part que permet que els avisos s'enviïn encara que la PWA estigui tancada.

1. Crea/usa un projecte Supabase i executa `setup.sql` al SQL Editor.
2. Desplega `functions/blat-notifications/index.ts` com a Edge Function `blat-notifications`.
3. A Secrets de Supabase afegeix:
   - `RESEND_API_KEY`
   - `BLAT_FROM_EMAIL` (un remitent verificat a Resend)
   - `CRON_SECRET` (una cadena llarga aleatòria)
   - `NTFY_TOKEN` només si el teu topic/servidor ntfy requereix autenticació.
4. Executa/adapta `cron-example.sql` perquè la funció `dispatch` corri un cop al dia.
5. A `config.js` posa la URL de l'Edge Function i la clau anon del projecte.
6. A l'app → Notificacions: activa email i/o ntfy, posa el correu i el topic, desa i prova els dos canals.

Per ntfy.sh, subscriu-te al mateix topic des de l'app ntfy del mòbil. Fes servir un nom de topic llarg i difícil d'endevinar.
