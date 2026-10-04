-- BLAT AL DIA · cron diari per als avisos automàtics.
-- Substitueix PROJECT_REF, PUBLISHABLE_KEY i CRON_SECRET.
-- 10:30 UTC = 12:30 a Catalunya en horari d'estiu / 11:30 a l'hivern.

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'blat-daily-notifications',
  '30 10 * * *',
  $$
  select net.http_post(
    url := 'https://PROJECT_REF.supabase.co/functions/v1/blat-notifications',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'Authorization','Bearer PUBLISHABLE_KEY',
      'apikey','PUBLISHABLE_KEY',
      'x-cron-secret','CRON_SECRET'
    ),
    body := '{"action":"dispatch"}'::jsonb
  );
  $$
);
