--
-- Schema para brxan.art (Supabase)
-- Ejecutar en el proyecto de Supabase.
-- Desactivar RLS para que el Worker (service role) pueda operar.
--

create table projects (
  id text primary key,
  title text not null,
  category text,
  description text,
  cover_url text,
  created_at timestamptz default now()
);

create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id text references projects(id) on delete cascade,
  url text not null,
  description text,
  position int
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  project_id text references projects(id) on delete cascade,
  image_index int not null,
  author text,
  text text not null,
  created_at timestamptz default now()
);

alter table projects disable row level security;
alter table project_images disable row level security;
alter table comments disable row level security;
