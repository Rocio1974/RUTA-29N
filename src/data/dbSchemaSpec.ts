/**
 * ESPECIFICACIÓN DE ARQUITECTURA DE DATOS RELACIONAL Y ESPACIAL (POSTGRESQL + POSTGIS + PGVECTOR)
 * PLATAFORMA RUTA 29N - CENTRO DIGITAL DE PREPARACIÓN ELECTORAL Y PARLAMENTARIA
 */

export const DATABASE_ARCHITECTURE_DOCUMENTATION = {
  engine: 'PostgreSQL 16 Enterprise / Cloud SQL',
  extensions: [
    'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    'CREATE EXTENSION IF NOT EXISTS "postgis";',
    'CREATE EXTENSION IF NOT EXISTS "vector";',
    'CREATE EXTENSION IF NOT EXISTS "pg_trgm";'
  ],
  securityModel: 'Row Level Security (RLS) habilitado por candidatura, cifrado TLS 1.3 en tránsito y AES-256 en reposo.',
  privacyCompliance: 'Cumplimiento estricto RGPD / LOPDGDD. Prohibición expresa de perfiles ideológicos individuales (Art. 58 bis LOREG anulado por Sentencia del Tribunal Constitucional 76/2019).'
};

export const POSTGRESQL_DDL_SCHEMA = `
-- =========================================================================
-- ESQUEMA RELACIONAL Y VECTORIAL: RUTA 29N (PROVINCIA DE TOLEDO)
-- =========================================================================

-- 1. EXTENSIONES BÁSICAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. TABLA DE COMARCAS Y ORGANIZACIÓN TERRITORIAL
CREATE TABLE IF NOT EXISTS comarcas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_comarca VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    densidad_poblacional NUMERIC(8, 2),
    poblacion_total INT NOT NULL,
    peso_electoral_pct NUMERIC(5, 2) NOT NULL,
    perfil_socioeconomico TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA DE LOS 204 MUNICIPIOS DE TOLEDO (CON GEOMETRÍA POSTGIS)
CREATE TABLE IF NOT EXISTS municipios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_ine VARCHAR(5) UNIQUE NOT NULL, -- Ej: '45168' para Toledo capital
    nombre VARCHAR(150) NOT NULL,
    comarca_id UUID REFERENCES comarcas(id) ON DELETE RESTRICT,
    poblacion_padron INT NOT NULL,
    censo_electoral_cer INT NOT NULL, -- Censo Electoral Residentes
    censo_cera INT DEFAULT 0,         -- Censo Electoral Residentes Ausentes
    mesas_electorales INT NOT NULL DEFAULT 1,
    colegios_electorales INT NOT NULL DEFAULT 1,
    partido_alcaldia VARCHAR(50) NOT NULL,
    prioridad_estrategica VARCHAR(30) CHECK (prioridad_estrategica IN ('Prioridad 1 (Clave Escaño)', 'Prioridad 2 (Consolidación)', 'Prioridad 3 (Movilización Rural)')),
    sector_economico_predominante VARCHAR(80),
    geom_poligono GEOMETRY(MultiPolygon, 4326), -- Límite municipal PostGIS
    coordenadas_centroide GEOMETRY(Point, 4326), -- Punto central geolocalizado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. HISTÓRICO DE RESULTADOS ELECTORALES POR MUNICIPIO
CREATE TABLE IF NOT EXISTS resultados_electorales_municipio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_id UUID NOT NULL REFERENCES municipios(id) ON DELETE CASCADE,
    proceso_electoral VARCHAR(50) NOT NULL, -- 'Generales 2023', 'Generales 2019N', 'Municipales 2023', etc.
    fecha_eleccion DATE NOT NULL,
    censo_total INT NOT NULL,
    votantes_total INT NOT NULL,
    abstencion_total INT NOT NULL,
    votos_validos INT NOT NULL,
    votos_nulos INT NOT NULL,
    votos_en_blanco INT NOT NULL,
    participacion_pct NUMERIC(5, 2) NOT NULL,
    votos_pp INT DEFAULT 0,
    votos_psoe INT DEFAULT 0,
    votos_vox INT DEFAULT 0,
    votos_sumar_up INT DEFAULT 0,
    votos_otros INT DEFAULT 0,
    partido_ganador VARCHAR(50) NOT NULL,
    margen_victoria_votos INT NOT NULL,
    swing_bloques_pct NUMERIC(5, 2), -- Variación respecto a la elección anterior
    CONSTRAINT uq_municipio_proceso UNIQUE (municipio_id, proceso_electoral)
);

-- 5. PROYECTOS TERRITORIALES E INVERSIONES PÚBLICAS
CREATE TABLE IF NOT EXISTS proyectos_territoriales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_proyecto VARCHAR(50) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    estado VARCHAR(30) NOT NULL CHECK (estado IN ('Pendiente', 'En Licitación', 'En Ejecución', 'Finalizado', 'Paralizado')),
    presupuesto_euros NUMERIC(14, 2) NOT NULL,
    fuente_financiacion VARCHAR(80) NOT NULL,
    argumentario_parlamentario TEXT NOT NULL,
    fecha_hito_critico DATE,
    impacto_territorial VARCHAR(40) CHECK (impacto_territorial IN ('Estratégico Provincial', 'Comarcal Clave', 'Local Decisivo')),
    geom_trazado GEOMETRY(Geometry, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. ASOCIACIÓN N:M DE PROYECTOS CON MUNICIPIOS
CREATE TABLE IF NOT EXISTS proyectos_municipios (
    proyecto_id UUID NOT NULL REFERENCES proyectos_territoriales(id) ON DELETE CASCADE,
    municipio_id UUID NOT NULL REFERENCES municipios(id) ON DELETE CASCADE,
    PRIMARY KEY (proyecto_id, municipio_id)
);

-- 7. BASE DE DATOS JURÍDICO-ELECTORAL (LOREG, JEC Y JURISPRUDENCIA)
CREATE TABLE IF NOT EXISTS base_juridica_electoral (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    consulta_tipo VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    nivel_certeza VARCHAR(80) NOT NULL CHECK (nivel_certeza IN (
        '100% Legal (Amparado expresamente por la LOREG)',
        'Doctrina Consolidada JEC (Criterio Vinculante)',
        'Prohibición Expresa (Infracción Electoral o Delito)',
        'Riesgo Sancionador Alto (Criterio Restrictivo)',
        'Requiere Autorización Previa de Junta Electoral Provincial'
    )),
    articulo_loreg VARCHAR(150) NOT NULL,
    resolucion_jec_boe VARCHAR(200) NOT NULL,
    veredicto VARCHAR(20) CHECK (veredicto IN ('PERMITIDO', 'PROHIBIDO', 'CONDICIONADO', 'NO APLICABLE')),
    resumen_ejecutivo TEXT NOT NULL,
    analisis_doctrinal TEXT NOT NULL,
    directrices_practicas JSONB NOT NULL, -- Array de directrices obligatorias
    embedding_legal vector(1536), -- Vector semántico para RAG estricto
    fecha_actualizacion DATE DEFAULT CURRENT_DATE
);

-- 8. MONITOR DE ARGUMENTARIOS Y CONTRAMEDIDAS DIARIAS
CREATE TABLE IF NOT EXISTS monitor_argumentarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    partido VARCHAR(50) NOT NULL,
    fecha_emision DATE NOT NULL,
    titular_lema VARCHAR(255) NOT NULL,
    puntos_clave JSONB NOT NULL,
    publico_objetivo VARCHAR(150),
    flanco_vulnerable TEXT NOT NULL,
    contramedida_titular VARCHAR(255) NOT NULL,
    contramedida_30s TEXT NOT NULL,
    dato_verificado_fuente TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. HISTÓRICO PARLAMENTARIO Y TRADUCCIÓN TERRITORIAL
CREATE TABLE IF NOT EXISTS iniciativas_parlamentarias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    camara VARCHAR(30) CHECK (camara IN ('Congreso de los Diputados', 'Senado de España')),
    legislatura VARCHAR(20) NOT NULL,
    tipo_iniciativa VARCHAR(60) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    parlamentario_autor VARCHAR(150),
    grupo_parlamentario VARCHAR(100),
    fecha_presentacion DATE NOT NULL,
    estado_tramitacion VARCHAR(50) NOT NULL,
    extracto_diario_sesiones TEXT NOT NULL,
    impacto_toledo_traduccion TEXT NOT NULL,
    vector_contenido vector(1536),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. INCIDENCIAS DE MESA ELECTORAL (NOCHE ELECTORAL 29N)
CREATE TABLE IF NOT EXISTS incidencias_mesas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    municipio_id UUID NOT NULL REFERENCES municipios(id),
    mesa_codigo VARCHAR(20) NOT NULL, -- Ej: '01-002-A'
    hora_incidencia TIME NOT NULL,
    tipo_incidencia VARCHAR(80) NOT NULL CHECK (tipo_incidencia IN (
        'Falta de papeletas oficiales',
        'Vocal o Presidente no presentado',
        'Propaganda ilegal / Apoderado infractor',
        'Discrepancia en censo o DNI',
        'Impugnación de voto nulo',
        'Acta de escrutinio ilegible / descuadre'
    )),
    gravedad VARCHAR(20) CHECK (gravedad IN ('Baja', 'Media', 'Alta', 'Crítica (Paraliza votación)')),
    descripcion TEXT NOT NULL,
    interventor_notificante VARCHAR(150),
    telefono_contacto VARCHAR(30),
    estado_resolucion VARCHAR(30) DEFAULT 'Abierta' CHECK (estado_resolucion IN ('Abierta', 'En Gestión Jurídica', 'Resuelta por JEC de Zona', 'Desestimada')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ÍNDICES ESPACIALES Y DE BÚSQUEDA
CREATE INDEX IF NOT EXISTS idx_municipios_geom ON municipios USING GIST (coordenadas_centroide);
CREATE INDEX IF NOT EXISTS idx_proyectos_geom ON proyectos_territoriales USING GIST (geom_trazado);
CREATE INDEX IF NOT EXISTS idx_municipios_nombre_trgm ON municipios USING GIN (nombre gin_trgm_ops);
`;
