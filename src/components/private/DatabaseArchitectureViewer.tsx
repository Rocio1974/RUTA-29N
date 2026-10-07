import React, { useState } from 'react';
import { 
  Database, 
  Code2, 
  Layers, 
  Copy, 
  Check, 
  ShieldCheck, 
  Server, 
  HardDrive,
  FileCode,
  Network
} from 'lucide-react';
import { POSTGRESQL_DDL_SCHEMA, DATABASE_ARCHITECTURE_DOCUMENTATION } from '../../data/dbSchemaSpec';

export const DatabaseArchitectureViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ddl' | 'entidades' | 'apis'>('ddl');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(POSTGRESQL_DDL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Arquitectura Técnica y Esquemas de Base de Datos Relacional
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Especificación de Datos: PostgreSQL + PostGIS + pgvector
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Infraestructura soberana para los 204 municipios de Toledo, series históricas de elecciones, inventario de proyectos y motor documental RAG con embeddings normativos.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('ddl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ddl'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Esquema DDL SQL
          </button>
          <button
            onClick={() => setActiveTab('entidades')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'entidades'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modelo Entidad-Relación
          </button>
          <button
            onClick={() => setActiveTab('apis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'apis'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Especificación de APIs
          </button>
        </div>
      </div>

      {/* Tech Specs Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Motor Relacional</span>
          <span className="text-sm font-bold text-white font-mono">{DATABASE_ARCHITECTURE_DOCUMENTATION.engine}</span>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Capa Geoespacial</span>
          <span className="text-sm font-bold text-amber-300 font-mono">PostGIS (MultiPolygon + Point 4326)</span>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Búsqueda Semántica Vectorial</span>
          <span className="text-sm font-bold text-emerald-400 font-mono">pgvector (1536 dim embeddings)</span>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Seguridad y RLS</span>
          <span className="text-xs font-bold text-blue-300">Row Level Security por Candidatura</span>
        </div>
      </div>

      {/* TAB 1: DDL CODE VIEWER */}
      {activeTab === 'ddl' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                schema.sql — Código DDL Completo para Producción
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado al Portapapeles' : 'Copiar DDL SQL'}
            </button>
          </div>

          <pre className="p-5 font-mono text-xs text-amber-200/90 bg-slate-950/90 overflow-x-auto max-h-[600px] leading-relaxed">
            {POSTGRESQL_DDL_SCHEMA}
          </pre>
        </div>
      )}

      {/* TAB 2: ENTIDAD-RELACIÓN */}
      {activeTab === 'entidades' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-mono">1. comarcas</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                1:N municipios
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Almacena las 9 comarcas de Toledo con densidad demográfica, peso electoral ponderado y perfil socioeconómico.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>• <code>id</code> (UUID, PK)</div>
              <div>• <code>codigo_comarca</code> (VARCHAR)</div>
              <div>• <code>poblacion_total</code> (INT)</div>
              <div>• <code>peso_electoral_pct</code> (NUMERIC)</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-mono">2. municipios</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                PostGIS Core
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Los 204 municipios toledanos con código INE, censo CER/CERA, mesas, prioridad y geometría espacial.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>• <code>id</code> (UUID, PK)</div>
              <div>• <code>codigo_ine</code> (VARCHAR(5), UNIQUE)</div>
              <div>• <code>censo_electoral_cer</code> (INT)</div>
              <div>• <code>coordenadas_centroide</code> (Point, 4326)</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-mono">3. resultados_electorales</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                N:1 municipios
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Series de votación por convocatoria: Generales 2023, 2019N, 2019A, 2016, autonómicas y municipales.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>• <code>participacion_pct</code> (NUMERIC)</div>
              <div>• <code>votos_pp</code>, <code>votos_psoe</code>, <code>votos_vox</code>...</div>
              <div>• <code>margen_victoria_votos</code> (INT)</div>
              <div>• <code>swing_bloques_pct</code> (NUMERIC)</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-mono">4. base_juridica_electoral</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                pgvector RAG
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Artículos de la LOREG, acuerdos JEC y doctrina vinculante con embedding para búsqueda vectorial sin alucinación.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>• <code>nivel_certeza</code> (ENUM)</div>
              <div>• <code>veredicto</code> (PERMITIDO/PROHIBIDO)</div>
              <div>• <code>embedding_legal</code> (vector(1536))</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-mono">5. proyectos_territoriales</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                N:M municipios
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Inversiones públicas en Toledo (AVE, A-42, agua, regadíos) con estados de licitación y argumentarios.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>• <code>presupuesto_euros</code> (NUMERIC)</div>
              <div>• <code>estado</code> (Pendiente/Licitación/Ejecución)</div>
              <div>• <code>argumentario_parlamentario</code> (TEXT)</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white font-mono">6. incidencias_mesas</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                Noche Electoral
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Registro de protestas de apoderados en las 1.050 mesas toledanas conforme a los Arts. 91 a 103 de la LOREG.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>• <code>mesa_codigo</code> (VARCHAR)</div>
              <div>• <code>tipo_incidencia</code> (VARCHAR)</div>
              <div>• <code>gravedad</code> (Baja/Media/Alta/Crítica)</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ESPECIFICACIÓN DE APIS */}
      {activeTab === 'apis' && (
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-serif uppercase tracking-wider font-mono">
            Endpoints RESTful & Microservicios de la Plataforma RUTA 29N:
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold mr-2">POST</span>
                <span className="text-white">/api/gemini/speech-generator</span>
              </div>
              <span className="text-slate-400 text-[11px]">Generador discursivo multi-formato con datos de Toledo</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold mr-2">POST</span>
                <span className="text-white">/api/gemini/quick-response-trainer</span>
              </div>
              <span className="text-slate-400 text-[11px]">Entrenador de respuestas en 30s (Gancho + Dato + Cierre)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold mr-2">POST</span>
                <span className="text-white">/api/gemini/interview-simulator</span>
              </div>
              <span className="text-slate-400 text-[11px]">Simulador interactivo "Repregúntame" con análisis de claridad</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold mr-2">POST</span>
                <span className="text-white">/api/gemini/legal-loreg-advisor</span>
              </div>
              <span className="text-slate-400 text-[11px]">Asistente LOREG/JEC con sistema de certeza y filtro No Me Lo Inventes</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold mr-2">POST</span>
                <span className="text-white">/api/gemini/policy-translator</span>
              </div>
              <span className="text-slate-400 text-[11px]">Traductor de leyes nacionales a afección comarcal en Toledo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
