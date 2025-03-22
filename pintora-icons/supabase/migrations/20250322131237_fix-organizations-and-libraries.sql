-- Modificar la tabla organizations para usar owner_id en lugar de created_by
ALTER TABLE organizations
DROP COLUMN IF EXISTS created_by,
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) NOT NULL;

-- Actualizar las políticas de organizations
DROP POLICY IF EXISTS "Users can view their organizations" ON organizations;
DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Owners can update their organizations" ON organizations;
DROP POLICY IF EXISTS "Owners can delete their organizations" ON organizations;

CREATE POLICY "Users can view their organizations"
ON organizations FOR SELECT
USING (
  auth.uid() = owner_id OR 
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = organizations.id
    AND organization_members.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create organizations"
ON organizations FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their organizations"
ON organizations FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their organizations"
ON organizations FOR DELETE
USING (auth.uid() = owner_id);

-- Actualizar las políticas de organization_members
DROP POLICY IF EXISTS "Organization owners can manage members" ON organization_members;
DROP POLICY IF EXISTS "Members can view organization members" ON organization_members;

CREATE POLICY "Organization owners can manage members"
ON organization_members FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM organizations
    WHERE organizations.id = organization_members.organization_id
    AND organizations.owner_id = auth.uid()
  )
);

CREATE POLICY "Members can view organization members"
ON organization_members FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM organization_members om
    WHERE om.organization_id = organization_members.organization_id
    AND om.user_id = auth.uid()
  )
);

-- Actualizar las políticas de icon_libraries
DROP POLICY IF EXISTS "Users can view their libraries" ON icon_libraries;
DROP POLICY IF EXISTS "Users can create libraries" ON icon_libraries;
DROP POLICY IF EXISTS "Users can update their libraries" ON icon_libraries;
DROP POLICY IF EXISTS "Users can delete their libraries" ON icon_libraries;

CREATE POLICY "Users can view their libraries"
ON icon_libraries FOR SELECT
USING (
  auth.uid() = owner_id OR
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = icon_libraries.organization_id
    AND organization_members.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create libraries"
ON icon_libraries FOR INSERT
WITH CHECK (
  auth.uid() = owner_id OR
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = icon_libraries.organization_id
    AND organization_members.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their libraries"
ON icon_libraries FOR UPDATE
USING (
  auth.uid() = owner_id OR
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = icon_libraries.organization_id
    AND organization_members.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their libraries"
ON icon_libraries FOR DELETE
USING (
  auth.uid() = owner_id OR
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = icon_libraries.organization_id
    AND organization_members.user_id = auth.uid()
  )
);
