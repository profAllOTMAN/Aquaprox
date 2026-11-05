-- Run in the existing aquaprox-leads project. Browser roles have no table or RPC access.
create table public.aquaprox_leads (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  name text not null check (char_length(btrim(name)) between 2 and 160),
  email text not null check (char_length(email) <= 254 and email = lower(btrim(email)) and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  phone text not null check (char_length(phone) <= 32 and phone ~ '^\+?[0-9 ().-]+$' and char_length(regexp_replace(phone, '[^0-9]', '', 'g')) between 8 and 15),
  zone text not null check (zone in ('chaufferie', 'logements', 'gaines', 'toiture', 'general')),
  source text not null default 'Salon AquaProx' check (source = 'Salon AquaProx'),
  consent boolean not null check (consent is true),
  consent_version text not null default 'contact-project-v1',
  created_at timestamptz not null default now()
);

create index aquaprox_leads_email_created_at_idx on public.aquaprox_leads (email, created_at desc);
alter table public.aquaprox_leads enable row level security;
create policy deny_browser_access on public.aquaprox_leads for all to anon, authenticated using (false) with check (false);
revoke all on table public.aquaprox_leads from public, anon, authenticated;
revoke all on table public.aquaprox_leads from service_role;
grant select, insert on table public.aquaprox_leads to service_role;

-- Retries of the same submission are safe. A durable per-email limit spans server instances.
create function public.submit_aquaprox_lead(
  p_submission_id uuid, p_name text, p_email text, p_phone text, p_zone text, p_consent boolean
) returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  existing public.aquaprox_leads%rowtype;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_submission_id::text, 0));
  select * into existing from public.aquaprox_leads where submission_id = p_submission_id;
  if found then
    if existing.name = p_name and existing.email = p_email and existing.phone = p_phone
      and existing.zone = p_zone and p_consent is true then
      return true;
    end if;
    raise exception 'submission_conflict';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_email, 1));
  if (select count(*) from public.aquaprox_leads where email = p_email and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'lead_rate_limited';
  end if;

  insert into public.aquaprox_leads (submission_id, name, email, phone, zone, consent)
  values (p_submission_id, p_name, p_email, p_phone, p_zone, p_consent);
  return true;
end;
$$;

revoke all on function public.submit_aquaprox_lead(uuid, text, text, text, text, boolean) from public, anon, authenticated;
grant execute on function public.submit_aquaprox_lead(uuid, text, text, text, text, boolean) to service_role;
