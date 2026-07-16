-- ============================================================================
-- EPICUS PARQUES - Supabase Database Setup
-- PostgreSQL 13+
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USUARIOS (Users/Clients)
-- ============================================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre_completo VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(50) NOT NULL DEFAULT 'cliente',
  empresa VARCHAR(255),
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios(rol);
CREATE INDEX IF NOT EXISTS idx_usuarios_activo ON usuarios(activo);

-- ============================================================================
-- 2. PARQUES (Industrial Parks)
-- ============================================================================
CREATE TABLE IF NOT EXISTS parques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  ciudad VARCHAR(100) NOT NULL,
  estado VARCHAR(100) NOT NULL,
  direccion VARCHAR(500),
  latitud DECIMAL(10, 8),
  longitud DECIMAL(11, 8),
  total_lotes INTEGER NOT NULL DEFAULT 0,
  area_total_m2 DECIMAL(15, 2),
  tipo_parque VARCHAR(50) NOT NULL DEFAULT 'industrial',
  estado_parque VARCHAR(50) DEFAULT 'activo',
  imagen_principal VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_parques_codigo ON parques(codigo);
CREATE INDEX IF NOT EXISTS idx_parques_ciudad ON parques(ciudad);
CREATE INDEX IF NOT EXISTS idx_parques_estado_parque ON parques(estado_parque);

-- ============================================================================
-- 3. LOTES (Plots/Lots)
-- ============================================================================
CREATE TABLE IF NOT EXISTS lotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parque_id UUID NOT NULL REFERENCES parques(id) ON DELETE CASCADE,
  numero_lote VARCHAR(50) NOT NULL,
  area_m2 DECIMAL(12, 2) NOT NULL,
  precio_unitario DECIMAL(15, 2) NOT NULL,
  precio_total DECIMAL(18, 2) GENERATED ALWAYS AS (area_m2 * precio_unitario) STORED,
  estado_lote VARCHAR(50) NOT NULL DEFAULT 'disponible',
  frente_metros DECIMAL(8, 2),
  fondo_metros DECIMAL(8, 2),
  caracteristicas JSONB DEFAULT '{}',
  imagen_lote VARCHAR(500),
  notas TEXT,
  cliente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  agente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  fecha_disponibilidad DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(parque_id, numero_lote)
);

CREATE INDEX IF NOT EXISTS idx_lotes_parque_id ON lotes(parque_id);
CREATE INDEX IF NOT EXISTS idx_lotes_estado ON lotes(estado_lote);
CREATE INDEX IF NOT EXISTS idx_lotes_cliente_id ON lotes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_lotes_agente_id ON lotes(agente_id);

-- ============================================================================
-- 4. CONSULTAS (Inquiries)
-- ============================================================================
CREATE TABLE IF NOT EXISTS consultas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  estado_consulta VARCHAR(50) NOT NULL DEFAULT 'abierta',
  prioridad VARCHAR(20) DEFAULT 'normal',
  tipo_consulta VARCHAR(50) NOT NULL,
  respuesta TEXT,
  respondido_por UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resuelto_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_consultas_lote_id ON consultas(lote_id);
CREATE INDEX IF NOT EXISTS idx_consultas_usuario_id ON consultas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_consultas_estado ON consultas(estado_consulta);
CREATE INDEX IF NOT EXISTS idx_consultas_prioridad ON consultas(prioridad);

-- ============================================================================
-- 5. HISTORIAL DE CAMBIOS (Audit Log)
-- ============================================================================
CREATE TABLE IF NOT EXISTS historial_cambios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tabla_origen VARCHAR(100) NOT NULL,
  registro_id UUID NOT NULL,
  tipo_cambio VARCHAR(20) NOT NULL,
  datos_anterior JSONB,
  datos_nuevo JSONB,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_historial_tabla ON historial_cambios(tabla_origen);
CREATE INDEX IF NOT EXISTS idx_historial_usuario ON historial_cambios(usuario_id);

-- ============================================================================
-- 6. RESERVAS (Reservations)
-- ============================================================================
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  agente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  fecha_inicio DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  monto_reserva DECIMAL(15, 2),
  estado_reserva VARCHAR(50) DEFAULT 'activa',
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reservas_lote_id ON reservas(lote_id);
CREATE INDEX IF NOT EXISTS idx_reservas_cliente_id ON reservas(cliente_id);

-- ============================================================================
-- 7. CONFIGURACIÓN (Settings)
-- ============================================================================
CREATE TABLE IF NOT EXISTS configuracion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clave VARCHAR(255) UNIQUE NOT NULL,
  valor TEXT NOT NULL,
  tipo VARCHAR(50),
  descripcion TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO configuracion (clave, valor, tipo, descripcion) VALUES
  ('precio_m2_defecto', '4500', 'number', 'Precio por m² por defecto en MXN'),
  ('comision_agente', '5', 'number', 'Porcentaje de comisión para agentes'),
  ('tiempo_reserva_dias', '30', 'number', 'Días que dura una reserva'),
  ('email_soporte', 'soporte@epicusparques.mx', 'string', 'Email de contacto'),
  ('whatsapp_contacto', '528184606294', 'string', 'Número WhatsApp de contacto')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE lotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultas ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

-- Policies (open for now, can be restricted later)
CREATE POLICY "Allow public read lotes" ON lotes FOR SELECT USING (true);
CREATE POLICY "Allow public read parques" ON parques FOR SELECT USING (true);
CREATE POLICY "Allow public read usuarios" ON usuarios FOR SELECT USING (true);
CREATE POLICY "Allow public read consultas" ON consultas FOR SELECT USING (true);
CREATE POLICY "Allow public insert lotes" ON lotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert consultas" ON consultas FOR INSERT WITH CHECK (true);

-- ============================================================================
-- SEED DATA - EPICUS PARQUES (Real Data)
-- ============================================================================

-- Insert Parques
INSERT INTO parques (codigo, nombre, descripcion, ciudad, estado, direccion, total_lotes, area_total_m2, tipo_parque, estado_parque)
VALUES
  (
    'EPICUS-001',
    'EPICUS INDUSTRIAL',
    'Parque industrial premium con infraestructura de clase mundial',
    'Monterrey',
    'NL',
    'Av. Industriales, Monterrey',
    45,
    45000.00,
    'industrial',
    'activo'
  ),
  (
    'TERRA-002',
    'TERRA REGIA',
    'Ubicación estratégica con acceso a carreteras principales',
    'Salinas',
    'NL',
    'Km 45 Carretera Federal, Salinas',
    58,
    58000.00,
    'industrial',
    'activo'
  ),
  (
    'PALMAR-003',
    'PALMAR II',
    'Espacio industrial moderno con servicios completos',
    'Monterrey',
    'NL',
    'Zona Industrial Palmar, Monterrey',
    34,
    34000.00,
    'industrial',
    'activo'
  )
ON CONFLICT (codigo) DO NOTHING;

-- Note: Lotes will be populated via the admin interface
-- This setup ensures the parques are available for the application to function
