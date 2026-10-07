import React, { useState } from 'react';
import { 
  Radio, 
  ShieldAlert, 
  Tv, 
  Newspaper, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Lock, 
  Send, 
  Sparkles, 
  PlusCircle,
  Copy,
  Check,
  UserCheck,
  ShieldCheck,
  PhoneCall,
  Mail
} from 'lucide-react';
import { 
  TOLEDO_MEDIA_OUTLETS, 
  CYBER_SECURITY_ALERTS, 
  MediaOutlet, 
  CyberThreatAlert 
} from '../../data/pressAndCyberData';

export const PressRoomAndCybersecurity: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'medios' | 'ciberseguridad' | 'desmentidos'>('medios');
  
  // Media filters
  const [mediaTypeFilter, setMediaTypeFilter] = useState<string>('all');
  const [mediaSearch, setMediaSearch] = useState<string>('');

  // Fact-checking simulator
  const [hoaxQuery, setHoaxQuery] = useState('');
  const [analyzingHoax, setAnalyzingHoax] = useState(false);
  const [hoaxAnalysisResult, setHoaxAnalysisResult] = useState<any | null>(null);

  const filteredMedia = TOLEDO_MEDIA_OUTLETS.filter(m => {
    const matchType = mediaTypeFilter === 'all' || m.type === mediaTypeFilter;
    const matchSearch = mediaSearch === '' || 
      m.name.toLowerCase().includes(mediaSearch.toLowerCase()) ||
      m.scope.toLowerCase().includes(mediaSearch.toLowerCase()) ||
      m.contactPerson.toLowerCase().includes(mediaSearch.toLowerCase());
    return matchType && matchSearch;
  });

  const handleAnalyzeHoax = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hoaxQuery.trim()) return;

    setAnalyzingHoax(true);
    setHoaxAnalysisResult(null);

    setTimeout(() => {
      setAnalyzingHoax(false);
      setHoaxAnalysisResult({
        verdict: 'BULO DESMENTIDO CON FUENTES OFICIALES',
        severity: 'Alta',
        factualExplanation: 'No existe ninguna iniciativa ni propuesta de nuestra candidatura para fijar peajes en la A-42 ni en accesos a Madrid. Al contrario, el programa oficial de RUTA 29N exige en los Presupuestos Generales del Estado la gratuidad absoluta del eje Toledo-Madrid, la ampliación al tercer carril y el abono transporte unificado con la Comunidad de Madrid.',
        officialSource: 'BOE y Proposiciones No de Ley registradas en el Congreso de los Diputados (Iniciativa núm. 162/000214).',
        recommendedCounterSoundbite: '«Quienes difunden bulos sobre peajes en La Sagra están desesperados por ocultar que han sido ellos los que han dejado a 45.000 trabajadores toledanos sin tercer carril en la A-42. Nuestra postura es firme: ni un solo peaje y cercanías ya para Illescas».',
        immediateActions: [
          'Difundir vídeo de desmentido de 20 segundos del candidato en canales oficiales de WhatsApp de La Sagra.',
          'Remitir nota aclaratoria urgente a las redacciones de La Tribuna de Toledo, Cadena SER y CMMedia.',
          'Notificar la cadena a la Junta Electoral de Zona de Illescas si se constata autoría partidaria coordinada.'
        ]
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Gabinete de Medios & Ciberseguridad Operativa (Módulo E)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Room de Prensa Provincial y Protocolo de Ciberdefensa Electoral
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Gestión de más de 30 medios de comunicación en Toledo y sus 9 comarcas, acreditaciones de periodistas y detección temprana de desinformación y suplantaciones.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1 text-xs">
          <button
            onClick={() => setActiveSubTab('medios')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === 'medios'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Medios y Acreditaciones ({TOLEDO_MEDIA_OUTLETS.length})
          </button>
          <button
            onClick={() => setActiveSubTab('ciberseguridad')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === 'ciberseguridad'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ciberdefensa y Amenazas ({CYBER_SECURITY_ALERTS.length})
          </button>
          <button
            onClick={() => setActiveSubTab('desmentidos')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === 'desmentidos'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Detector de Bulos
          </button>
        </div>
      </div>

      {/* SUBTAB 1: MEDIOS Y ACREDITACIONES */}
      {activeSubTab === 'medios' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar medio, periodista o comarca..."
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
              <span className="text-slate-400">Tipo de Medio:</span>
              <select
                value={mediaTypeFilter}
                onChange={(e) => setMediaTypeFilter(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
              >
                <option value="all">Todos los formatos</option>
                <option value="Prensa Escrita / Digital">Prensa Digital / Escrita</option>
                <option value="Radio Comarcal / Provincial">Radio</option>
                <option value="Televisión">Televisión</option>
              </select>
            </div>
          </div>

          {/* Media Outlets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedia.map((m) => {
              const statusColor =
                m.coverageStatus === 'Acreditado Permanente' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                m.coverageStatus === 'Especial Entrevistas' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                m.coverageStatus === 'Petición Pendiente' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                'bg-slate-800 text-slate-300 border-slate-700';

              return (
                <div
                  key={m.id}
                  className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${statusColor}`}>
                        {m.coverageStatus}
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-semibold">
                        {m.scope}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white leading-snug">{m.name}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{m.type} • {m.audienceEstimate}</p>

                    <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Contacto: <strong>{m.contactPerson}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{m.email}</span>
                        <span className="text-slate-600">|</span>
                        <PhoneCall className="w-3 h-3 text-slate-500" />
                        <span>{m.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-slate-500">Mailing de Prensa Autorizado</span>
                    <button className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg font-medium transition-colors">
                      Enviar Nota de Prensa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: CIBERDEFENSA Y AMENAZAS */}
      {activeSubTab === 'ciberseguridad' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>Protocolo de Ciberdefensa Activo:</strong> Monitorización de dominios clonados, tráfico sospechoso en servidores y ataques de denegación de servicio (DDoS).
              </span>
            </div>
            <span className="font-mono text-emerald-400 font-bold text-[11px]">Sistemas 100% Blindados</span>
          </div>

          <div className="space-y-3">
            {CYBER_SECURITY_ALERTS.map((alert) => {
              const isCrit = alert.severity === 'Crítica';
              const isHigh = alert.severity === 'Alta';

              return (
                <div
                  key={alert.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    alert.status === 'Neutralizado'
                      ? 'bg-slate-900/60 border-slate-800'
                      : isCrit
                      ? 'bg-slate-950 border-red-500/60 shadow-lg shadow-red-950/20'
                      : 'bg-slate-950 border-amber-500/40'
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${
                        isCrit ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                        isHigh ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {alert.type}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        alert.status === 'Neutralizado'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500 text-slate-950'
                      }`}>
                        {alert.status}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      Detectado: {alert.detectedAt}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{alert.description}</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Objetivo atacado: <strong className="text-slate-200">{alert.affectedTarget}</strong>
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-200/90 leading-relaxed">
                    <strong className="text-amber-400 block mb-1 font-mono uppercase text-[11px]">
                      Protocolo de Mitigación y Acción Inmediata:
                    </strong>
                    {alert.mitigationProtocol}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: DETECTOR DE BULOS */}
      {activeSubTab === 'desmentidos' && (
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Detector y Desmontador Rápido de Noticias Falsas sobre Toledo
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pega un texto sospechoso que esté circulando en redes o WhatsApp para contrastarlo contra la base documental oficial y generar una réplica inmediata de 30 segundos.
            </p>
          </div>

          <form onSubmit={handleAnalyzeHoax} className="space-y-3 text-xs">
            <textarea
              rows={3}
              value={hoaxQuery}
              onChange={(e) => setHoaxQuery(e.target.value)}
              placeholder="Ej: «Están diciendo en redes que nuestro candidato va a poner peajes en la A-42 en Illescas y Seseña»..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={analyzingHoax || !hoaxQuery.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-md"
            >
              {analyzingHoax ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldAlert className="w-4 h-4" />
              )}
              Verificar Falsedad y Generar Desmentido Oficial
            </button>
          </form>

          {/* Analysis Result */}
          {hoaxAnalysisResult && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="px-3 py-1 rounded bg-red-500 text-white font-bold font-mono uppercase">
                  {hoaxAnalysisResult.verdict}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Fuente Oficial: {hoaxAnalysisResult.officialSource}
                </span>
              </div>

              <div>
                <strong className="text-white block mb-1 uppercase font-mono text-[11px]">
                  Hechos Verificados (Desarme Fáctico):
                </strong>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  {hoaxAnalysisResult.factualExplanation}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <strong className="text-amber-400 block mb-1 uppercase font-mono text-[11px]">
                  Corte de Voz de Desmentido para el Candidato (30 Segundos):
                </strong>
                <p className="italic text-sm">
                  {hoaxAnalysisResult.recommendedCounterSoundbite}
                </p>
              </div>

              <div>
                <strong className="text-white block mb-1.5 uppercase font-mono text-[11px]">
                  Acciones Operativas Inmediatas de Contención:
                </strong>
                <ul className="space-y-1.5 text-slate-300">
                  {hoaxAnalysisResult.immediateActions.map((act: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
