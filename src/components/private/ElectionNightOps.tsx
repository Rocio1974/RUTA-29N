import React, { useState } from 'react';
import { 
  Vote, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  FileCheck, 
  PlusCircle,
  Search,
  Filter
} from 'lucide-react';
import { TOLEDO_MUNICIPALITIES } from '../../data/toledoMunicipalities';

interface Incident {
  id: string;
  municipality: string;
  pollingStation: string;
  time: string;
  type: string;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  description: string;
  status: 'Abierta' | 'En Gestión Jurídica' | 'Resuelta por JEZ';
  interventor: string;
}

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-01',
    municipality: 'Talavera de la Reina',
    pollingStation: 'Colegio Público San Ildefonso (Mesa 02-004-A)',
    time: '09:18',
    type: 'Falta de papeletas oficiales en cabina',
    severity: 'Alta',
    description: 'Se constata la desaparición de los fajos de papeletas al Senado para nuestra candidatura en dos cabinas contiguas. Reclamado al Presidente de Mesa de inmediato.',
    status: 'Resuelta por JEZ',
    interventor: 'Carlos Moreno (Apoderado acreditado)'
  },
  {
    id: 'inc-02',
    municipality: 'Illescas',
    pollingStation: 'IES Juan de Padilla (Mesa 01-002-B)',
    time: '11:45',
    type: 'Apoderado rival portando lemas ilegales',
    severity: 'Media',
    description: 'Apoderado de formación rival exhibiendo chapa con lema electoral expreso ("Vota futuro") contraviniendo el Art. 93 LOREG e Instrucción JEC 6/2011. Exigida su retirada por el Presidente.',
    status: 'Resuelta por JEZ',
    interventor: 'Lucía Santos (Interventora de Mesa)'
  },
  {
    id: 'inc-03',
    municipality: 'Seseña',
    pollingStation: 'Centro Cívico El Quiñón (Mesa 03-001-U)',
    time: '14:20',
    type: 'Discrepancia en censo electoral (CER)',
    severity: 'Media',
    description: 'Tres electores empadronados no figuran en las listas definitivas de la mesa por error censal tras cambio de domicilio. Se les asiste con volante de empadronamiento de la Oficina del Censo.',
    status: 'En Gestión Jurídica',
    interventor: 'Manuel Díaz (Coordinador de Zona)'
  }
];

export const ElectionNightOps: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [newMun, setNewMun] = useState('Toledo (Capital)');
  const [newStation, setNewStation] = useState('');
  const [newType, setNewType] = useState('Falta de papeletas oficiales en cabina');
  const [newDesc, setNewDesc] = useState('');
  const [newSeverity, setNewSeverity] = useState<'Crítica' | 'Alta' | 'Media' | 'Baja'>('Media');
  const [newInterventor, setNewInterventor] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Scrutiny Progress Simulation
  const [countedPercentage, setCountedPercentage] = useState(87.4);

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim()) return;

    const newInc: Incident = {
      id: `inc-${Date.now()}`,
      municipality: newMun,
      pollingStation: newStation || 'Mesa central de votación',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: newType,
      severity: newSeverity,
      description: newDesc,
      status: 'Abierta',
      interventor: newInterventor || 'Interventor de Guardia'
    };

    setIncidents([newInc, ...incidents]);
    setNewDesc('');
    setNewStation('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-red-400 uppercase">
              Operativa de Noche Electoral 29N • Monitor de Mesas e Incidencias LOREG
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Gestión Centralizada de Interventores, Actas e Incidencias Electorales
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Red de más de 1.050 mesas electorales en los 204 municipios de Toledo. Registro instantáneo de protestas para anexar al acta de escrutinio general.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
        >
          <PlusCircle className="w-4 h-4" /> Registrar Nueva Incidencia
        </button>
      </div>

      {/* Live Scrutiny Simulation Bar */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-white uppercase font-mono">
            Escrutinio Provisional en Vivo (Congreso Toledo):
          </span>
          <span className="font-mono text-amber-300 font-bold">
            {countedPercentage}% Escrutado (918 / 1.050 Mesas)
          </span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
          <div className="bg-blue-600 h-full" style={{ width: '41%' }} title="PP: 3 Escaños (41%)" />
          <div className="bg-red-600 h-full" style={{ width: '33%' }} title="PSOE: 2 Escaños (33%)" />
          <div className="bg-green-600 h-full" style={{ width: '16%' }} title="VOX: 1 Escaño (16%)" />
          <div className="bg-pink-600 h-full" style={{ width: '7%' }} title="Sumar: 0 Escaños (7%)" />
        </div>

        <div className="flex flex-wrap justify-between text-xs text-slate-400 font-mono pt-1">
          <span>PP: <strong>3 escaños</strong> (138.410 votos)</span>
          <span>PSOE: <strong>2 escaños</strong> (112.590 votos)</span>
          <span>VOX: <strong>1 escaño</strong> (54.320 votos)</span>
          <span>Sumar: <strong>0 escaños</strong> (24.180 votos)</span>
          <span className="text-amber-300">6º Escaño: <strong>PP</strong> (+3.840 cociente)</span>
        </div>
      </div>

      {/* New Incident Drawer/Form */}
      {showForm && (
        <form onSubmit={handleAddIncident} className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Formulario Oficial de Incidencia de Mesa (LOREG Art. 91 a 103)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Municipio</label>
              <select
                value={newMun}
                onChange={(e) => setNewMun(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              >
                {TOLEDO_MUNICIPALITIES.map((m) => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Colegio y Sección/Mesa</label>
              <input
                type="text"
                value={newStation}
                onChange={(e) => setNewStation(e.target.value)}
                placeholder="Ej: Colegio San José (Mesa 01-002-U)"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tipología de Incidencia</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              >
                <option value="Falta de papeletas oficiales en cabina">Falta de papeletas oficiales en cabina</option>
                <option value="Apoderado rival portando lemas ilegales">Apoderado rival portando lemas ilegales</option>
                <option value="Discrepancia en censo electoral (CER)">Discrepancia en censo electoral (CER)</option>
                <option value="Impugnación formal de voto nulo">Impugnación formal de voto nulo</option>
                <option value="Descuadre en acta de escrutinio">Descuadre en acta de escrutinio</option>
                <option value="Intromisión o altercado de orden público">Intromisión o altercado de orden público</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Gravedad Operativa</label>
              <select
                value={newSeverity}
                onChange={(e: any) => setNewSeverity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Crítica">Crítica (Paraliza votación)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Interventor / Notificante</label>
              <input
                type="text"
                value={newInterventor}
                onChange={(e) => setNewInterventor(e.target.value)}
                placeholder="Nombre del apoderado o interventor"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold text-xs mb-1">
              Descripción Fáctica Detallada (Hechos, testificales y requerimiento al Presidente de Mesa)
            </label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              placeholder="Describe con precisión qué ha ocurrido para facilitar la reclamación formal ante la Junta Electoral de Zona..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
            >
              Guardar y Notificar al Asesor Jurídico
            </button>
          </div>
        </form>
      )}

      {/* Incidents Table / List */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-white font-serif">
            Registro Activo de Incidencias en la Jornada de Votación:
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {incidents.length} incidencias registradas
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {incidents.map((inc) => (
            <div key={inc.id} className="p-5 hover:bg-slate-850/50 transition-colors space-y-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${
                    inc.severity === 'Crítica' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                    inc.severity === 'Alta' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-xs font-bold text-white">{inc.type}</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-slate-400">{inc.time} h</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    {inc.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 font-mono">
                {inc.municipality} • <em>{inc.pollingStation}</em>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {inc.description}
              </p>

              <div className="text-[11px] text-slate-400 flex justify-between items-center pt-1">
                <span>Notificado por: <strong>{inc.interventor}</strong></span>
                <span className="text-amber-400 font-mono">Anexo al Acta de Sesión (LOREG Art. 99)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
