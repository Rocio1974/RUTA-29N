import React, { useState, useEffect } from 'react';
import { Landmark, ArrowRight, ShieldCheck, MapPin, Users, Vote, BookOpen, Clock } from 'lucide-react';

interface PublicHeroProps {
  onEnterPrivateApp: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const PublicHero: React.FC<PublicHeroProps> = ({ onEnterPrivateApp, onScrollToSection }) => {
  // Countdown to hypothetical 29N election date
  const [timeLeft, setTimeLeft] = useState({ days: 53, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-10 pb-16 border-b border-slate-800">
      {/* Background subtle decorative pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            PORTAL PÚBLICO INSTITUCIONAL Y DIVULGATIVO DE CONOCIMIENTO ELECTORAL
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">CUENTA ATRÁS 29N:</span>
            <span className="font-bold text-amber-300">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif leading-tight">
              Centro Digital de Preparación, Estrategia y Gestión para Candidaturas al{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                Congreso y al Senado
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              <strong>RUTA 29N</strong> es la infraestructura integral de conocimiento electoral, datos territoriales de los{' '}
              <span className="text-amber-300 font-semibold underline decoration-amber-500/40">204 municipios de la provincia de Toledo</span>,
              inteligencia jurídica rigurosa conforme a la LOREG y simulación estratégica con estricta trazabilidad documental.
            </p>

            {/* Quick Feature Pills */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <Vote className="w-3.5 h-3.5 text-amber-400" /> Sistema D'Hondt 6 Escaños (Congreso)
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-amber-400" /> Listas Abiertas 4 Escaños (Senado)
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> 204 Fichas Municipales de Toledo
              </span>
              <span className="px-3 py-1 rounded-md bg-slate-800/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Principio "No Me Lo Inventes"
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onScrollToSection('dhondt-simulator')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/40 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Vote className="w-4 h-4" /> Simular Reparto de Escaños (Toledo)
              </button>
              <button
                onClick={() => onScrollToSection('toledo-directory')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <MapPin className="w-4 h-4 text-amber-400" /> Explorar los 204 Municipios
              </button>
              <button
                onClick={onEnterPrivateApp}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                Acceso Plataforma Candidato <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Card: Institutional Snapshot */}
          <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Toledo en las Cortes</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Oficial INE / BOE
              </span>
            </div>

            <div className="space-y-4 mt-4 text-sm">
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Diputados al Congreso:</span>
                <span className="font-bold text-amber-300 text-base">6 Escaños</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Senadores en elección:</span>
                <span className="font-bold text-amber-300 text-base">4 Senadores</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Municipios censados:</span>
                <span className="font-bold text-white text-base">204 Municipios</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Censo Electoral (CER):</span>
                <span className="font-bold text-white font-mono">541.285 Electores</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Barrera legal mínima:</span>
                <span className="font-bold text-slate-300 font-mono">3% Votos Válidos</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <strong>Clave Estratégica:</strong> En Toledo, la barrera matemática efectiva para conseguir el 6º escaño suele situarse entre el <strong>13% y el 15%</strong> de los votos debido al tamaño reducido de la circunscripción.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
