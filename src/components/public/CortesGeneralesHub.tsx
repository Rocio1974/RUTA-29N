import React, { useState } from 'react';
import { Landmark, Vote, CheckCircle2, AlertCircle, HelpCircle, Layers, FileSpreadsheet } from 'lucide-react';

export const CortesGeneralesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'congreso' | 'senado' | 'comparativa'>('congreso');

  return (
    <section className="py-14 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold uppercase mb-3">
            <Landmark className="w-3.5 h-3.5" /> Formación y Conocimiento Electoral
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
            Las Cortes Generales: Congreso de los Diputados vs. Senado
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Diferencias normativas, sistemas de votación y repercusión directa en la circunscripción electoral de Toledo.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-2">
            <button
              onClick={() => setActiveTab('congreso')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'congreso'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Vote className="w-4 h-4" /> Congreso de los Diputados
            </button>
            <button
              onClick={() => setActiveTab('senado')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'senado'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-4 h-4" /> Senado de España
            </button>
            <button
              onClick={() => setActiveTab('comparativa')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'comparativa'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" /> Tabla Comparativa Rápida
            </button>
          </div>
        </div>

        {/* Tab 1: Congreso */}
        {activeTab === 'congreso' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Composición y Escaños</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                El Congreso se compone de <strong>350 diputados</strong> elegidos por sufragio universal directo. Cada provincia tiene asignado un mínimo inicial de 2 escaños (más 1 en Ceuta y Melilla), repartiéndose los restantes 248 en función proporcional a la población empadronada.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300 font-mono">
                Toledo elige 6 Diputados al Congreso
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Fórmula D'Hondt y Listas</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Se vota con <strong>papeleta blanca</strong> mediante <strong>listas cerradas y bloqueadas</strong>. La asignación de escaños se rige por el sistema de cocientes decrecientes D'Hondt (división sucesiva de votos entre 1, 2, 3, 4, 5 y 6).
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong>Umbral legal LOREG Art. 163.1.a:</strong> Se descartan candidaturas con menos del 3% de los votos válidos.
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">El "Último Escaño" Toledano</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                En circunscripciones medianas como Toledo con 6 escaños, la barrera real para conseguir el sexto diputado no es el 3%, sino aproximadamente el <strong>14% de los votos</strong>. Los partidos minoritarios corren riesgo de voto residual sin escaño.
              </p>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                Histórico: Reparto 3-2-1 (PP-PSOE-VOX) en 2023; 2-2-2 en 2019N; 2-2-1-1 en 2019A.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Senado */}
        {activeTab === 'senado' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Cámara Territorial</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                El Senado es la <strong>cámara de representación territorial</strong> conforme al artículo 69 de la Constitución Española. En cada provincia peninsular se eligen <strong>4 senadores</strong> de forma fija, con independencia de la población.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300 font-mono">
                Toledo elige 4 Senadores por elección directa
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">Papeleta Sepia y Voto Limitado</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Se vota con <strong>papeleta sepia única</strong> con <strong>listas abiertas</strong>. Cada elector puede marcar un <strong>máximo de 3 cruces</strong> entre todos los candidatos proclamados, pudiendo combinar candidatos de formaciones distintas.
              </p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <strong>Sistema mayoritario corregido:</strong> Resultan electos los 4 candidatos con mayor número individual de votos.
              </div>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">El Efecto "3 a 1" en Toledo</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Como los votantes suelen marcar en bloque a los 3 candidatos de su partido preferido, casi siempre el partido ganador en la provincia obtiene <strong>3 senadores</strong> y el segundo partido obtiene <strong>1 senador</strong> (formato 3-1).
              </p>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                En 2023 el PP obtuvo 3 senadores y el PSOE 1 senador en la provincia de Toledo.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Comparativa */}
        {activeTab === 'comparativa' && (
          <div className="overflow-x-auto bg-slate-950 rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-900 text-amber-300 font-serif border-b border-slate-800">
                <tr>
                  <th className="p-4 font-bold">Parámetro Normativo</th>
                  <th className="p-4 font-bold">Congreso de los Diputados</th>
                  <th className="p-4 font-bold">Senado de España</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-900/30">
                  <td className="p-4 font-semibold text-white">Escaños en juego en Toledo</td>
                  <td className="p-4 text-amber-400 font-bold font-mono">6 Diputados</td>
                  <td className="p-4 text-amber-400 font-bold font-mono">4 Senadores</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-4 font-semibold text-white">Color de Papeleta Oficial</td>
                  <td className="p-4">Blanca (con sobre blanco)</td>
                  <td className="p-4">Sepia claro (con sobre sepia)</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-4 font-semibold text-white">Tipo de Lista</td>
                  <td className="p-4">Cerrada y bloqueada (se vota a la lista del partido)</td>
                  <td className="p-4">Abierta (se marcan con cruz hasta 3 personas)</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-4 font-semibold text-white">Fórmula Electoral</td>
                  <td className="p-4">Proporcional D'Hondt</td>
                  <td className="p-4">Mayoritario corregido (los 4 más votados)</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-4 font-semibold text-white">Barrera Electoral Mínima</td>
                  <td className="p-4">3% legal (efectiva ~14% en Toledo)</td>
                  <td className="p-4">Sin umbral mínimo porcentual</td>
                </tr>
                <tr className="hover:bg-slate-900/30">
                  <td className="p-4 font-semibold text-white">Función Constitucional Principal</td>
                  <td className="p-4">Investidura del Presidente, aprobación de leyes y presupuestos</td>
                  <td className="p-4">Cámara de segunda lectura y territorial (Art. 155 CE, tratados)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
