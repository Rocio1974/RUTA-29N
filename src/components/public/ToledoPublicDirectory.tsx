import React, { useState, useMemo } from 'react';
import { MapPin, Search, Filter, Users, Vote, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TOLEDO_MUNICIPALITIES, COMARCAS_TOLEDO, MunicipalityData } from '../../data/toledoMunicipalities';

interface ToledoPublicDirectoryProps {
  onSelectMunicipality?: (m: MunicipalityData) => void;
}

export const ToledoPublicDirectory: React.FC<ToledoPublicDirectoryProps> = ({ onSelectMunicipality }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComarca, setSelectedComarca] = useState<string>('all');
  const [selectedMun, setSelectedMun] = useState<MunicipalityData | null>(null);

  const filtered = useMemo(() => {
    return TOLEDO_MUNICIPALITIES.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.codeINE.includes(searchTerm);
      const matchesComarca =
        selectedComarca === 'all' || m.comarca === selectedComarca;
      return matchesSearch && matchesComarca;
    });
  }, [searchTerm, selectedComarca]);

  return (
    <section id="toledo-directory" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase mb-2">
              <MapPin className="w-3.5 h-3.5" /> Núcleo Territorial de Toledo
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              Observatorio Municipal: Los 204 Municipios de Toledo
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Fichas demográficas, comarcales y de comportamiento electoral. Desde grandes motores urbanos e industriales hasta municipios en reto demográfico.
            </p>
          </div>

          {/* Comarcas Stats Summary */}
          <div className="text-right hidden lg:block">
            <span className="text-xs font-mono text-slate-400">9 Comarcas Naturales e Históricas</span>
            <div className="text-sm font-bold text-amber-400 font-mono">
              713.498 hab. • 541.285 censados
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por municipio o código INE (ej: 45168)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <select
              value={selectedComarca}
              onChange={(e) => setSelectedComarca(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              <option value="all">Todas las comarcas ({COMARCAS_TOLEDO.length})</option>
              {COMARCAS_TOLEDO.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.municipalitiesCount} mun.)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Municipalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((mun) => (
            <div
              key={mun.id}
              onClick={() => setSelectedMun(mun)}
              className="bg-slate-900/60 hover:bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {mun.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      INE: {mun.codeINE} • Comarca: {mun.comarca}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    mun.currentMayorParty === 'PP' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                    mun.currentMayorParty === 'PSOE' ? 'bg-red-950 text-red-300 border-red-800' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    Alcaldía: {mun.currentMayorParty}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Población</div>
                    <div className="text-xs font-bold text-white font-mono">{mun.population.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Censo (CER)</div>
                    <div className="text-xs font-bold text-amber-300 font-mono">{mun.census.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">23-J Ganó</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono">{mun.elections2023.winner} ({mun.elections2023.turnout}%)</div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 line-clamp-2">
                  <span className="text-slate-300 font-semibold">Temas clave:</span> {mun.keyIssues.join(', ')}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 group-hover:text-amber-300 font-semibold">
                <span>Ver ficha electoral completa</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Municipality Detail */}
        {selectedMun && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-serif">{selectedMun.name}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      INE {selectedMun.codeINE}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Comarca: <strong className="text-slate-200">{selectedMun.comarca}</strong> • Sector económico: <strong className="text-slate-200">{selectedMun.economicSector}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMun(null)}
                  className="text-slate-400 hover:text-white text-lg font-mono p-1 rounded hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 my-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Población INE</span>
                    <span className="text-base font-bold text-white font-mono">{selectedMun.population.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Censo Electoral</span>
                    <span className="text-base font-bold text-amber-300 font-mono">{selectedMun.census.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Mesas Electorales</span>
                    <span className="text-base font-bold text-white font-mono">{selectedMun.pollingStations} mesas</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Prioridad Electoral</span>
                    <span className="text-xs font-bold text-emerald-400">{selectedMun.electoralPriority}</span>
                  </div>
                </div>

                {/* Elections 2023 */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs uppercase font-mono font-bold text-amber-300 mb-2">
                    Resultados Elecciones Generales 2023 (Congreso de los Diputados):
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-blue-950/40 border border-blue-900 p-2 rounded-lg">
                      <span className="text-blue-300 font-bold block">PP</span>
                      <span className="text-white font-mono">{selectedMun.elections2023.pp}%</span>
                    </div>
                    <div className="bg-red-950/40 border border-red-900 p-2 rounded-lg">
                      <span className="text-red-300 font-bold block">PSOE</span>
                      <span className="text-white font-mono">{selectedMun.elections2023.psoe}%</span>
                    </div>
                    <div className="bg-green-950/40 border border-green-900 p-2 rounded-lg">
                      <span className="text-green-300 font-bold block">VOX</span>
                      <span className="text-white font-mono">{selectedMun.elections2023.vox}%</span>
                    </div>
                    <div className="bg-pink-950/40 border border-pink-900 p-2 rounded-lg">
                      <span className="text-pink-300 font-bold block">Sumar</span>
                      <span className="text-white font-mono">{selectedMun.elections2023.sumar}%</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 text-right">
                    Participación: <strong className="text-slate-200">{selectedMun.elections2023.turnout}%</strong>
                  </div>
                </div>

                {/* Key Local Demands */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs uppercase font-mono font-bold text-white mb-2">
                    Demandas y Problemáticas Municipales para la Campaña:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedMun.keyIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedMun(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl"
                >
                  Cerrar Ficha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
