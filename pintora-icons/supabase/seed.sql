-- Insertar datos de prueba solo si las tablas están vacías
DO $$
BEGIN
    -- Solo insertar si no hay datos
    IF NOT EXISTS (SELECT 1 FROM profiles) THEN
        -- Los usuarios se crearán a través de la interfaz de Supabase Auth
        -- y los perfiles se crearán automáticamente mediante el trigger
        NULL;
    END IF;

    -- Las organizaciones y miembros se crearán a través de la aplicación
    -- cuando los usuarios se registren y creen/unan a organizaciones
END $$; 