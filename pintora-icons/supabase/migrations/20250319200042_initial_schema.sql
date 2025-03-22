-- Reset database
drop schema if exists public cascade;
create schema public;

-- Configuración inicial de permisos
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

-- Enable UUID extension
create extension if not exists "uuid-ossp" with schema extensions;

-- Create tables
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text,
    name text,
    nickname text,
    avatar_url text,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.organizations (
    id uuid default extensions.uuid_generate_v4() primary key,
    name text not null,
    owner_id uuid references auth.users not null,
    invite_code uuid default extensions.uuid_generate_v4() not null unique,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

create table public.organization_members (
    organization_id uuid references public.organizations on delete cascade,
    user_id uuid references auth.users on delete cascade,
    role text not null check (role in ('admin', 'member')),
    joined_at timestamptz default timezone('utc'::text, now()) not null,
    primary key (organization_id, user_id)
);

create table public.icon_libraries (
    id uuid default extensions.uuid_generate_v4() primary key,
    name text not null,
    owner_id uuid references auth.users not null,
    organization_id uuid references public.organizations on delete set null,
    is_public boolean default false not null,
    data jsonb default '{}'::jsonb not null,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Asegurar permisos después de crear las tablas
grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;

-- Create functions
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;


-- Create triggers
create trigger handle_profiles_updated_at
    before update on public.profiles
    for each row
    execute function public.handle_updated_at();

create trigger handle_organizations_updated_at
    before update on public.organizations
    for each row
    execute function public.handle_updated_at();

create trigger handle_icon_libraries_updated_at
    before update on public.icon_libraries
    for each row
    execute function public.handle_updated_at();

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.icon_libraries enable row level security;

-- Profiles policies
create policy "Permitir acceso completo al servicio"
    on public.profiles
    to service_role
    using (true)
    with check (true);

create policy "Los perfiles son visibles para todos"
    on public.profiles
    for select
    to authenticated, anon
    using (true);

create policy "Los usuarios pueden actualizar su propio perfil"
    on public.profiles
    for update
    to authenticated
    using (auth.uid() = id)
    with check (auth.uid() = id);

create policy "Los usuarios pueden insertar su propio perfil"
    on public.profiles
    for insert
    to authenticated
    with check ((select auth.uid()) = id);

create policy "Los usuarios pueden eliminar su propio perfil"
    on public.profiles
    for delete
    to authenticated
    using (auth.uid() = id);

-- Organizations policies
create policy "Las organizaciones son visibles para usuarios autenticados"
    on public.organizations
    for select
    to authenticated
    using (
        true
    );

create policy "Cualquier usuario autenticado puede actualizar una organización"
    on public.organizations
    for update
    to authenticated
    using (
        true
    );

create policy "Solo el propietario puede eliminar la organización"
    on public.organizations
    for delete
    to authenticated
    using (auth.uid() = owner_id);

-- Organization members policies
create policy "Los usuarios autenticados pueden ver otros miembros de sus organizaciones"
    on public.organization_members
    for select
    to authenticated
    using (
        true
    );

create policy "Solo los usuarios autenticados pueden eliminar miembros"
    on public.organization_members
    for delete
    to authenticated
    using (
        true
    );

-- Icon libraries policies
create policy "Las bibliotecas son visibles para miembros de la organización"
    on public.icon_libraries
    for select
    to authenticated
    using (
        is_public = true or
        auth.uid() = owner_id or
        exists (
            select 1 from public.organizations o
            inner join public.organization_members om
            on o.id = om.organization_id
            where o.id = organization_id
            and om.user_id = auth.uid()
        )
    );

create policy "Solo el propietario y administradores pueden actualizar bibliotecas"
    on public.icon_libraries
    for update
    to authenticated
    using (
        auth.uid() = owner_id or
        exists (
            select 1 from public.organizations o
            inner join public.organization_members om
            on o.id = om.organization_id
            where o.id = organization_id
            and om.user_id = auth.uid()
            and om.role = 'admin'
        )
    )
    with check (
        auth.uid() = owner_id or
        exists (
            select 1 from public.organizations o
            inner join public.organization_members om
            on o.id = om.organization_id
            where o.id = organization_id
            and om.user_id = auth.uid()
            and om.role = 'admin'
        )
    );

create policy "Los usuarios autenticados pueden crear bibliotecas"
    on public.icon_libraries
    for insert
    to authenticated
    with check (
        auth.uid() = owner_id and
        (
            organization_id is null or
            exists (
                select 1 from public.organizations o
                inner join public.organization_members om
                on o.id = om.organization_id
                where o.id = organization_id
                and om.user_id = auth.uid()
                and om.role = 'admin'
            )
        )
    );

create policy "Solo el propietario y administradores pueden eliminar bibliotecas"
    on public.icon_libraries
    for delete
    to authenticated
    using (
        auth.uid() = owner_id or
        exists (
            select 1 from public.organizations o
            inner join public.organization_members om
            on o.id = om.organization_id
            where o.id = organization_id
            and om.user_id = auth.uid()
            and om.role = 'admin'
        )
    );

-- Asegurar permisos después de crear las políticas
grant usage on schema public to anon;
grant usage on schema public to authenticated;
grant usage on schema public to service_role;

grant all on all tables in schema public to anon;
grant all on all tables in schema public to authenticated;
grant all on all tables in schema public to service_role;

grant all on all functions in schema public to anon;
grant all on all functions in schema public to authenticated;
grant all on all functions in schema public to service_role;

grant all on all sequences in schema public to anon;
grant all on all sequences in schema public to authenticated;
grant all on all sequences in schema public to service_role;

-- Refresh schema cache
notify pgrst, 'reload schema';
