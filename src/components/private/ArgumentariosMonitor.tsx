import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { DAILY_ARGUMENTARIOS_MONITOR, PartyArgument } from '../../data/argumentariosData';

export const ArgumentariosMonitor: React.FC = () => {
  const [selectedParty, setSelectedParty] = useState<string>('all');
  const [activeArg, setActiveArg] = useState<PartyArgument>(DAILY_ARGUMENTARIOS_MONITOR[0]);

  const filtered = DAILY_ARGUMENTARIOS_MONITOR.filter(
    (a) => selectedParty === 'all' || a.party === selectedParty
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Monitor de Argumentarios Diarios y Líneas Discursivas Oficiales
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Seguimiento de Argumentarios de Partidos y Contramedidas Verificadas
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Rastreo sistemático de los lemas del día de los partidos concurrentes en Toledo (PP, PSOE, VOX, Sumar). Detección de flancos vulnerables y generación de contramedidas inmediatas respaldadas por datos oficiales del INE, IGAE y BOE.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          {['all', 'PSOE', 'PP', 'VOX', 'Sumar'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedParty(p)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedParty === p
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p === 'all' ? 'Todos' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Monitored Arguments */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">
            Feed de Argumentarios Ingestados:
          </h3>

          {filtered.map((arg) => {
            const isSelected = activeArg.id === arg.id;
            const partyBadge =
              arg.party === 'PP' ? 'bg-blue-950 text-blue-300 border-blue-800' :
              arg.party === 'PSOE' ? 'bg-red-950 text-red-300 border-red-800' :
              arg.party === 'VOX' ? 'bg-green-950 text-green-300 border-green-800' :
              'bg-pink-950 text-pink-300 border-pink-800';

            return (
              <div
                key={arg.id}
                onClick={() => setActiveArg(arg)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-amber-400 shadow-md'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${partyBadge}`}>
                    {arg.party}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{arg.date}</span>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                  "{arg.headline}"
                </h4>

                <div className="mt-2 text-[11px] text-slate-400">
                  Público diana: <strong className="text-slate-300">{arg.targetAudience}</strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Analysis & Counter-Measure */}
        <div className="lg:col-span-7">
          {activeArg && (
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      Formación: {activeArg.party}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Fecha de emisión: {activeArg.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif leading-snug">
                    "{activeArg.headline}"
                  </h3>
                </div>
              </div>

              {/* Talking Points of Rival */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs uppercase font-mono font-bold text-slate-400 mb-2">
                  Líneas Discursivas Ingestadas del Rival:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeArg.keyTalkingPoints.map((tp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vulnerability Flank */}
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/80">
                <span className="text-xs font-bold text-red-400 uppercase font-mono block mb-1">
                  Flanco Vulnerable Detectado en Toledo:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeArg.vulnerabilityFlank}
                </p>
              </div>

              {/* Suggested Countermeasure */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  Contramedida Argumental Verificada para Portavoces:
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Titular Ganador de Respuesta:</span>
                  <div className="text-sm font-bold text-white bg-slate-900 p-3 rounded-lg border border-slate-800">
                    "{activeArg.suggestedCounterMeasure.winningHeadline}"
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Cortes de Voz / Intervención en 30s:</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    "{activeArg.suggestedCounterMeasure.soundbite30Seconds}"
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-xs text-emerald-200 flex flex-col gap-1">
                  <strong>Dato Fáctico Verificado (No Me Lo Inventes):</strong>
                  <span>{activeArg.suggestedCounterMeasure.factualData}</span>
                  <span className="text-[10px] text-emerald-400/80 font-mono mt-1">
                    Fuente: {activeArg.suggestedCounterMeasure.verifiedSource}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
