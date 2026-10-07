import React from 'react';
import { 
  BarChart3, 
  MapPin, 
  Users, 
  Vote, 
  Scale, 
  Sparkles, 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  FileText,
  Target,
  MessageSquare
} from 'lucide-react';
import { TOLEDO_MUNICIPALITIES, COMARCAS_TOLEDO, TOTAL_TOLEDO_SUMMARY } from '../../data/toledoMunicipalities';
import { TERRITORIAL_PROJECTS } from '../../data/territorialProjects';
import { DAILY_ARGUMENTARIOS_MONITOR } from '../../data/argumentariosData';
import { DashboardNotificationsAlerts } from './DashboardNotificationsAlerts';

interface CampaignDashboardProps {
  onSelectModule: (moduleId: string) => void;
  userRole: string;
}

export const CampaignDashboard: React.FC<CampaignDashboardProps> = ({ onSelectModule, userRole }) => {
  const priority1Mun = TOLEDO_MUNICIPALITIES.filter(m => m.electoralPriority === 'Prioridad 1 (Clave Escaño)');
  const pendingProjects = TERRITORIAL_PROJECTS.filter(p => p.status === 'Pendiente' || p.status === 'Paralizado');

  return (
    <div className="space-y-8">
      {/* Top Welcome / Strategy Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">
              Centro de Mando Activo • Circunscripción Provincial de Toledo
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Estrategia General y Despliegue de Campaña 29N
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Credencial en uso: <strong className="text-amber-300 capitalize">{userRole.replace('-', ' ')}</strong> • Supervisando los 204 municipios toledanos.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectModule('discursos')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Laboratorio Discursivo
          </button>
          <button
            onClick={() => onSelectModule('legal')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" /> Consulta LOREG / JEC
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 uppercase font-mono">Objetivo Congreso</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-serif">3 / 6 Escaños</div>
            <p className="text-[11px] text-amber-300/90 mt-1">
              Último escaño en disputa por ~4.100 votos
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 uppercase font-mono">Objetivo Senado</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-serif">3 / 4 Senadores</div>
            <p className="text-[11px] text-slate-300 mt-1">
              Esquema de victoria 3-1 mayoritario
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 uppercase font-mono">Censo Electoral CER</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">541.285</div>
            <p className="text-[11px] text-emerald-400 mt-1">
              Participación estimada: 74% - 76%
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-slate-400 uppercase font-mono">Municipios Prioritarios</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-serif">
              {priority1Mun.length} Clave Escaño
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Concentran el 62% del censo total
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row: Strategic Radar & Argument Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Strategic Territorial Focus */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-serif">Frentes Electorales Críticos (Toledo)</h3>
              <p className="text-xs text-slate-400">Distribución de esfuerzo y presencia de los candidatos</p>
            </div>
            <button
              onClick={() => onSelectModule('observatorio')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              Ver los 204 Municipios <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-sm font-bold text-white">Corredor de La Sagra (Illescas, Seseña, Yuncos, Bargas)</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Población joven, alta tasa de nuevos empadronados, saturación de la A-42 y necesidad de Cercanías.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                Prioridad 1
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-sm font-bold text-white">Área Urbana de Talavera de la Reina y comarca</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Batalla por el soterramiento del AVE, suelo logístico y modernización de regadíos del Alberche.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                Prioridad 1
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-bold text-white">La Mancha Toledana (Quintanar, Madridejos, Consuegra, Mora)</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Voto agrario conservador, Acuífero 23, costes de gasóleo y simplificación de la PAC.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                Consolidación
              </span>
            </div>
          </div>
        </div>

        {/* Right: Daily Opposing Argument Alert */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white font-serif">Alerta de Argumentario Diario</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                Última Hora
              </span>
            </div>

            {DAILY_ARGUMENTARIOS_MONITOR[0] && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-red-400">Rival: {DAILY_ARGUMENTARIOS_MONITOR[0].party}</span>
                  <span className="text-[11px] font-mono text-slate-500">{DAILY_ARGUMENTARIOS_MONITOR[0].date}</span>
                </div>
                <p className="text-xs font-semibold text-white">
                  "{DAILY_ARGUMENTARIOS_MONITOR[0].headline}"
                </p>
                <div className="text-[11px] text-amber-200/90 pt-2 border-t border-slate-800">
                  <strong>Contramedida sugerida:</strong> {DAILY_ARGUMENTARIOS_MONITOR[0].suggestedCounterMeasure.winningHeadline}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onSelectModule('argumentarios')}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            Abrir Monitor de Argumentarios Completo <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real-time Notifications & Alert Configuration Center */}
      <DashboardNotificationsAlerts
        onGoToDiscursos={() => onSelectModule('discursos')}
      />

      {/* Quick Navigation to System Core Modules */}
      <div>
        <h3 className="text-base font-bold text-white font-serif mb-4">
          Módulos Operativos de la Plataforma RUTA 29N
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onSelectModule('observatorio')}
            className="bg-slate-900/60 hover:bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all group"
          >
            <MapPin className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Observatorio 204 Municipios</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fichas INE, histórico 2016-2023, mapas comarcales e inventario de proyectos públicos.
            </p>
          </div>

          <div
            onClick={() => onSelectModule('legal')}
            className="bg-slate-900/60 hover:bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all group"
          >
            <Scale className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Asistente Jurídico LOREG / JEC</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Módulo "¿Puedo hacer esto?" con sistema de certeza jurídica estricta y "No me lo inventes".
            </p>
          </div>

          <div
            onClick={() => onSelectModule('discursos')}
            className="bg-slate-900/60 hover:bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all group"
          >
            <MessageSquare className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Laboratorio de Discursos & LM</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generador de mítines, entrenador de 30 segundos y simulador interactivo "Repregúntame".
            </p>
          </div>

          <div
            onClick={() => onSelectModule('parlamentario')}
            className="bg-slate-900/60 hover:bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all group"
          >
            <BarChart3 className="w-6 h-6 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-sm font-bold text-white mb-1">Traductor Nacional a Toledo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Histórico de iniciativas parlamentarias y traducción directa de leyes al impacto en comarcas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
