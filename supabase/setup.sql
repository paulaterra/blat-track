-- BLAT AL DIA · notificacions automàtiques
-- Executa aquest SQL al Supabase SQL Editor del projecte.

create table if not exists public.blat_notification_profiles (
  device_id text primary key,
  email_enabled boolean not null default false,
  email text not null default '',
  ntfy_enabled boolean not null default false,
  ntfy_server text not null default 'https://ntfy.sh',
  ntfy_topic text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.blat_notification_reminders (
  id bigint generated always as identity primary key,
  device_id text not null references public.blat_notification_profiles(device_id) on delete cascade,
  tracking_id text not null,
  name text not null default 'Seguiment',
  category text not null default '',
  format text not null default '',
  subtype text not null default '',
  next_date date not null,
  notify_before integer not null default 15,
  notify_same_day boolean not null default true,
  updated_at timestamptz not null default now(),
  unique(device_id, tracking_id)
);

create table if not exists public.blat_notification_log (
  id bigint generated always as identity primary key,
  alert_key text not null unique,
  device_id text not null,
  tracking_id text not null,
  reminder_date date not null,
  alert_type text not null,
  sent_at timestamptz not null default now()
);

create index if not exists blat_notification_reminders_next_date_idx
  on public.blat_notification_reminders(next_date);

-- El frontend no llegeix ni escriu directament aquestes taules.
-- Tot passa per l'Edge Function amb la service role.
alter table public.blat_notification_profiles enable row level security;
alter table public.blat_notification_reminders enable row level security;
alter table public.blat_notification_log enable row level security;
