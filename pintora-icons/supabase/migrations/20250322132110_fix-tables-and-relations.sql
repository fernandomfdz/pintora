-- Eliminar el trigger y la función que crean organizaciones automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recrear las tablas desde cero para asegurar la consistencia
DROP TABLE IF EXISTS icon_libraries CASCADE;
DROP TABLE IF EXISTS organization_members CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

-- Crear tabla de organizaciones
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear tabla de miembros de organización
CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, user_id)
);

-- Crear tabla de bibliotecas de iconos
CREATE TABLE icon_libraries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES auth.users(id),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    icons JSONB DEFAULT '[]'::jsonb NOT NULL,
    css_settings JSONB DEFAULT '{
        "prefix": "icon",
        "fontFamily": "pintora-icons",
        "baseSelector": ".icon",
        "fontSize": "24px",
        "cssUnit": "px",
        "defaultWidth": "24",
        "defaultHeight": "24"
    }'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en todas las tablas
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE icon_libraries ENABLE ROW LEVEL SECURITY;

-- Políticas para organizations - Simplificadas para usuarios autenticados
DROP POLICY IF EXISTS "Users can view organizations they own or are members of" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Owners can update their organizations" ON organizations;
DROP POLICY IF EXISTS "Owners can delete their organizations" ON organizations;

CREATE POLICY "Allow all operations for authenticated users" ON organizations
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- Políticas para organization_members - Simplificadas para usuarios autenticados
DROP POLICY IF EXISTS "Organization owners can manage members" ON organization_members;
DROP POLICY IF EXISTS "Members can view other members" ON organization_members;

CREATE POLICY "Allow all operations for authenticated users" ON organization_members
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- Políticas para icon_libraries
CREATE POLICY "Users can view their libraries or organization libraries" ON icon_libraries
FOR SELECT USING (
    auth.uid() = owner_id OR
    (
        organization_id IS NOT NULL AND
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_members.organization_id = icon_libraries.organization_id
            AND organization_members.user_id = auth.uid()
        )
    )
);

CREATE POLICY "Users can create libraries" ON icon_libraries
FOR INSERT WITH CHECK (
    auth.uid() = owner_id AND
    (
        organization_id IS NULL OR
        EXISTS (
            SELECT 1 FROM organization_members
            WHERE organization_members.organization_id = organization_id
            AND organization_members.user_id = auth.uid()
        )
    )
);

CREATE POLICY "Users can update their own libraries" ON icon_libraries
FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own libraries" ON icon_libraries
FOR DELETE USING (auth.uid() = owner_id);
