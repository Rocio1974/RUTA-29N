import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Users, 
  Vote, 
  TrendingUp, 
  Building2, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { TOLEDO_MUNICIPALITIES, COMARCAS_TOLEDO, MunicipalityData } from '../../data/toledoMunicipalities';
import { TERRITORIAL_PROJECTS, TerritorialProject, ProjectStatus } from '../../data/territorialProjects';

export const MunicipalitiesObservatory: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'municipios' | 'mapa' | 'proyectos'>('municipios');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComarca, setSelectedComarca] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedMun, setSelectedMun] = useState<MunicipalityData | null>(TOLEDO_MUNICIPALITIES[0]);
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('all');

  const filteredMunicipalities = useMemo(() => {
    return TOLEDO_MUNICIPALITIES.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.codeINE.includes(searchTerm);
      const matchComarca =
        selectedComarca === 'all' || m.comarca === selectedComarca;
      const matchPriority =
        priorityFilter === 'all' || m.electoralPriority === priorityFilter;
      return matchSearch && matchComarca && matchPriority;
    });
  }, [searchTerm, selectedComarca, priorityFilter]);

  const filteredProjects = useMemo(() => {
    return TERRITORIAL_PROJECTS.filter((p) => {
      const matchStatus =
        projectStatusFilter === 'all' || p.status === projectStatusFilter;
      return matchStatus;
    });
  }, [projectStatusFilter]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Observatorio Territorial y Electoral: 204 Municipios de Toledo
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Fichas técnicas censales, series históricas electorales e inventario de inversiones públicas en la provincia.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveSubTab('municipios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'municipios'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fichas Municipales
          </button>
          <button
            onClick={() => setActiveSubTab('mapa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'mapa'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mapa Comarcal Interactivo
          </button>
          <button
            onClick={() => setActiveSubTab('proyectos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'proyectos'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inversiones y Proyectos ({TERRITORIAL_PROJECTS.length})
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Municipalities List & Detail */}
      {activeSubTab === 'municipios' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: List and Filters */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar municipio o código INE..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <select
                  value={selectedComarca}
                  onChange={(e) => setSelectedComarca(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">Todas comarcas</option>
                  {COMARCAS_TOLEDO.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">Todas prioridades</option>
                  <option value="Prioridad 1 (Clave Escaño)">Prioridad 1 (Clave)</option>
                  <option value="Prioridad 2 (Consolidación)">Prioridad 2 (Consolidación)</option>
                  <option value="Prioridad 3 (Movilización Rural)">Prioridad 3 (Rural)</option>
                </select>
              </div>

              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Mostrando {filteredMunicipalities.length} de {TOLEDO_MUNICIPALITIES.length} municipios</span>
                <span className="font-mono text-amber-400">Total Prov: 204</span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredMunicipalities.map((mun) => {
                const isSelected = selectedMun?.id === mun.id;
                return (
                  <div
                    key={mun.id}
                    onClick={() => setSelectedMun(mun)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 shadow-md'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-white">{mun.name}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {mun.comarca} • INE {mun.codeINE}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                        mun.electoralPriority.includes('1') ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        mun.electoralPriority.includes('2') ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {mun.electoralPriority.includes('1') ? 'Clave' : mun.electoralPriority.includes('2') ? 'Consol.' : 'Rural'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                      <span>Censo: <strong className="font-mono text-amber-300">{mun.census.toLocaleString()}</strong></span>
                      <span>23-J: <strong className="text-emerald-400">{mun.elections2023.winner} ({mun.elections2023.turnout}%)</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Municipality Deep-Dive */}
          <div className="lg:col-span-7">
            {selectedMun ? (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-white font-serif">{selectedMun.name}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                        INE {selectedMun.codeINE}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Comarca de <strong>{selectedMun.comarca}</strong> • Perfil: <strong>{selectedMun.economicSector}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Alcaldía Actual</span>
                    <span className="text-sm font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {selectedMun.currentMayorParty}
                    </span>
                  </div>
                </div>

                {/* Demographic & Logistical Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Población Padronal</span>
                    <span className="text-base font-bold text-white font-mono">{selectedMun.population.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Censo Electoral CER</span>
                    <span className="text-base font-bold text-amber-300 font-mono">{selectedMun.census.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Mesas de Votación</span>
                    <span className="text-base font-bold text-white font-mono">{selectedMun.pollingStations} mesas</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Estatus Estratégico</span>
                    <span className="text-xs font-bold text-emerald-400 block mt-1">{selectedMun.electoralPriority}</span>
                  </div>
                </div>

                {/* Historical Elections Comparison: 2023 vs 2019N */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs uppercase font-mono font-bold text-amber-300 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    Comparativa de Voto Histórico en Elecciones Generales (Congreso):
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 2023 */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">Elecciones 23-J (2023)</span>
                        <span className="text-[11px] font-mono text-slate-400">Part.: {selectedMun.elections2023.turnout}%</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                        <div className="p-1.5 bg-blue-950/60 rounded border border-blue-900">
                          <span className="text-[10px] text-blue-300 block font-bold">PP</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2023.pp}%</span>
                        </div>
                        <div className="p-1.5 bg-red-950/60 rounded border border-red-900">
                          <span className="text-[10px] text-red-300 block font-bold">PSOE</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2023.psoe}%</span>
                        </div>
                        <div className="p-1.5 bg-green-950/60 rounded border border-green-900">
                          <span className="text-[10px] text-green-300 block font-bold">VOX</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2023.vox}%</span>
                        </div>
                        <div className="p-1.5 bg-pink-950/60 rounded border border-pink-900">
                          <span className="text-[10px] text-pink-300 block font-bold">Sumar</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2023.sumar}%</span>
                        </div>
                      </div>
                    </div>

                    {/* 2019N */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">Elecciones 10-N (2019)</span>
                        <span className="text-[11px] font-mono text-slate-400">Part.: {selectedMun.elections2019N.turnout}%</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                        <div className="p-1.5 bg-blue-950/60 rounded border border-blue-900">
                          <span className="text-[10px] text-blue-300 block font-bold">PP</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2019N.pp}%</span>
                        </div>
                        <div className="p-1.5 bg-red-950/60 rounded border border-red-900">
                          <span className="text-[10px] text-red-300 block font-bold">PSOE</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2019N.psoe}%</span>
                        </div>
                        <div className="p-1.5 bg-green-950/60 rounded border border-green-900">
                          <span className="text-[10px] text-green-300 block font-bold">VOX</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2019N.vox}%</span>
                        </div>
                        <div className="p-1.5 bg-purple-950/60 rounded border border-purple-900">
                          <span className="text-[10px] text-purple-300 block font-bold">Podemos</span>
                          <span className="font-mono text-white text-xs">{selectedMun.elections2019N.podemos}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campaign Key Issues & Talking Points */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs uppercase font-mono font-bold text-white mb-2">
                    Ejes Discursivos y Demandas Clave en {selectedMun.name}:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedMun.keyIssues.map((issue, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 rounded-2xl p-12 border border-slate-800 text-center text-slate-400">
                Selecciona un municipio de la lista para inspeccionar sus datos.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 2: Territorial Map of Comarcas */}
      {activeSubTab === 'mapa' && (
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white font-serif">
                División Geográfica y Comarcal de la Provincia de Toledo
              </h3>
              <p className="text-xs text-slate-400">
                Distribución demográfica, peso electoral y prioridades de campaña en las 9 comarcas toledanas.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500"></span> La Sagra (30.5%)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500"></span> Talavera (14.8%)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500"></span> La Mancha (14.0%)</span>
            </div>
          </div>

          {/* Interactive Comarcas Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMARCAS_TOLEDO.map((comarca) => (
              <div
                key={comarca.name}
                className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-amber-400 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base font-bold text-white">{comarca.name}</h4>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {comarca.weightPercentage}% peso prov.
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 my-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Municipios:</span>
                    <span className="font-bold font-mono">{comarca.municipalitiesCount} municipios</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Población total:</span>
                    <span className="font-bold font-mono text-white">{comarca.population.toLocaleString()} hab.</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2.5 leading-relaxed">
                  <strong>Perfil sociopolítico:</strong> {comarca.profile}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 3: Public Territorial Projects & Investments */}
      {activeSubTab === 'proyectos' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Inventario de Inversiones y Proyectos Públicos en Toledo
              </h3>
              <p className="text-xs text-slate-400">
                Seguimiento de infraestructuras clave, presupuestos y argumentarios parlamentarios asociados.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Filtrar por estado:</span>
              <select
                value={projectStatusFilter}
                onChange={(e) => setProjectStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400"
              >
                <option value="all">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Licitación">En Licitación</option>
                <option value="En Ejecución">En Ejecución</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Paralizado">Paralizado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((proj) => {
              const statusColor =
                proj.status === 'En Ejecución' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                proj.status === 'En Licitación' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                proj.status === 'Pendiente' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                proj.status === 'Paralizado' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                'bg-slate-700 text-slate-300 border-slate-600';

              return (
                <div
                  key={proj.id}
                  className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border font-bold uppercase ${statusColor}`}>
                        {proj.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {proj.budgetMillionsEuro.toFixed(1)} M€ ({proj.financingSource})
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 leading-snug">{proj.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{proj.description}</p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-200/90 leading-relaxed">
                      <strong className="text-amber-400 block mb-1">Argumentario Parlamentario Oficial:</strong>
                      "{proj.parliamentaryArgument}"
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-400">
                    <span>Comarca: <strong className="text-white">{proj.comarca}</strong></span>
                    <span>Hito crítico: <strong className="text-amber-300 font-mono">{proj.criticalDate}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
