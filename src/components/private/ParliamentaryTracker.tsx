import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Send,
  BookOpen,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { 
  PARLIAMENTARY_INITIATIVES, 
  NATIONAL_TO_TOLEDO_TRANSLATIONS,
  ParliamentaryInitiative,
  PolicyTranslation
} from '../../data/parliamentaryData';
import { COMARCAS_TOLEDO } from '../../data/toledoMunicipalities';

export const ParliamentaryTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traductor' | 'historico'>('traductor');
  const [selectedTranslation, setSelectedTranslation] = useState<PolicyTranslation>(NATIONAL_TO_TOLEDO_TRANSLATIONS[0]);
  const [customPolicy, setCustomPolicy] = useState('');
  const [targetComarca, setTargetComarca] = useState('La Sagra y Torrijos');
  const [loading, setLoading] = useState(false);
  const [customTranslationResult, setCustomTranslationResult] = useState<any | null>(null);

  const handleTranslatePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPolicy.trim()) return;

    setLoading(true);
    setCustomTranslationResult(null);

    try {
      const res = await fetch('/api/gemini/policy-translator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nationalLawOrPolicy: customPolicy,
          targetComarca: targetComarca,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCustomTranslationResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Rastreador Parlamentario y Traductor Territorial
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Traductor de Políticas Nacionales al Impacto en la Provincia de Toledo
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Conecta los grandes debates y leyes de las Cortes Generales con su afección directa sobre La Sagra, Talavera, La Mancha y los Montes de Toledo.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('traductor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'traductor'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Traductor Territorial
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'historico'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iniciativas de Predecesores ({PARLIAMENTARY_INITIATIVES.length})
          </button>
        </div>
      </div>

      {/* TAB 1: TRADUCTOR TERRITORIAL */}
      {activeTab === 'traductor' && (
        <div className="space-y-6">
          {/* Custom Translation Form */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2 font-serif">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Traducir una ley o debate de Madrid a clave toledana:
            </h3>

            <form onSubmit={handleTranslatePolicy} className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-8">
                <input
                  type="text"
                  value={customPolicy}
                  onChange={(e) => setCustomPolicy(e.target.value)}
                  placeholder="Ej: Modificación del Estatuto de los Trabajadores sobre jornada laboral de 37,5 horas..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="md:col-span-4 flex gap-2">
                <select
                  value={targetComarca}
                  onChange={(e) => setTargetComarca(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 flex-1"
                >
                  <option value="La Sagra y Torrijos">La Sagra y Torrijos</option>
                  <option value="Talavera de la Reina">Talavera de la Reina</option>
                  <option value="La Mancha Toledana">La Mancha Toledana</option>
                  <option value="Montes de Toledo">Montes de Toledo</option>
                </select>

                <button
                  type="submit"
                  disabled={loading || !customPolicy.trim()}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Traducir
                </button>
              </div>
            </form>

            {/* Custom AI Result */}
            {customTranslationResult && (
              <div className="mt-5 p-5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <h4 className="text-base font-bold text-white font-serif">
                    {customTranslationResult.title}
                  </h4>
                  <span className="text-xs font-mono text-amber-300">
                    Coste estimado: {customTranslationResult.economicCostOrBenefit}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Impacto Directo en Toledo:</strong>
                  {customTranslationResult.toledoDirectImpact}
                </p>

                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-2 uppercase">
                    Argumentarios y Puntos Fuertes para el Candidato:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {customTranslationResult.winningTalkingPoints?.map((pt: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Pre-translated Policies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">
                Traducciones Predefinidas de Alto Impacto:
              </h3>
              {NATIONAL_TO_TOLEDO_TRANSLATIONS.map((t) => {
                const isSelected = selectedTranslation.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => { setSelectedTranslation(t); setCustomTranslationResult(null); }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-amber-400 shadow-md'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-amber-400 block mb-1">
                      {t.boeReference}
                    </span>
                    <h4 className="text-xs font-bold text-white mb-2 leading-snug">
                      {t.nationalPolicy}
                    </h4>
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                      {t.affectedComarcas.map((c, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              {selectedTranslation && (
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                  <div className="pb-3 border-b border-slate-800">
                    <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1">
                      Referencia BOE: {selectedTranslation.boeReference}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                      {selectedTranslation.nationalPolicy}
                    </h3>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 uppercase font-mono block mb-1">
                      Marco del Debate Nacional en Madrid:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {selectedTranslation.nationalDebate}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-400 uppercase font-mono block mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> Afección Directa y Concreta en Toledo:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedTranslation.toledoDirectImpact}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-white block mb-2 uppercase">
                      Líneas Argumentales para el Candidato en Plaza:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {selectedTranslation.candidateTalkingPoints.map((tp, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{tp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HISTÓRICO PARLAMENTARIO */}
      {activeTab === 'historico' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARLIAMENTARY_INITIATIVES.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    {item.chamber} • {item.legislature}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {item.outcome}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-400 mb-2">
                  Autor: <strong className="text-slate-300">{item.deputyOrSenator}</strong> ({item.group})
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed italic mb-3">
                  "{item.parliamentaryExtract}"
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <strong>Lección Estratégica Extraída:</strong> {item.strategicTakeaway}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Fecha: {item.date}</span>
                <span>Materia: {item.topic}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
