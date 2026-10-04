create table if not exists public.blat_app_state (
  app_id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.blat_app_state enable row level security;

insert into storage.buckets (id, name, public, file_size_limit)
values ('blat-files', 'blat-files', false, 52428800)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;
