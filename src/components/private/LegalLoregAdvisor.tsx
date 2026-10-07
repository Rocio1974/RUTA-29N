import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Send, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { LOREG_KNOWLEDGE_BASE, LegalEntry, CertaintyLevel } from '../../data/legalLoregDatabase';
import { CAMPAIGN_BUDGET_LIMITS_TOLEDO } from '../../data/pressAndCyberData';

export const LegalLoregAdvisor: React.FC = () => {
  const [legalSubTab, setLegalSubTab] = useState<'consultas' | 'gastos'>('consultas');
  const [selectedEntry, setSelectedEntry] = useState<LegalEntry | null>(LOREG_KNOWLEDGE_BASE[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [customResult, setCustomResult] = useState<any | null>(null);

  // Spend control simulation
  const [providerInvoice, setProviderInvoice] = useState({ concept: '', amount: '', providerNif: '', type: 'ordinario' });
  const [invoices, setInvoices] = useState([
    { id: 'inv-1', concept: 'Impresión de cartelería y banderolas para La Sagra', provider: 'Artes Gráficas Toledo S.L. (B45821902)', amount: 14200.00, type: 'ordinario', status: 'Verificada conforme Art. 130 LOREG' },
    { id: 'inv-2', concept: 'Distribución postal de papeletas y sobres (Mailing provincial)', provider: 'Operador Postal Homologado (A28000124)', amount: 45830.00, type: 'mailing', status: 'Subvención justificada con albarán Correos' },
    { id: 'inv-3', concept: 'Alquiler de equipos de sonido e iluminación para mitin en Talavera', provider: 'Sonido y Eventos Tajo S.L. (B45119023)', amount: 4850.00, type: 'ordinario', status: 'Transferencia bancaria desde cuenta electoral' }
  ]);

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    setLoading(true);
    setCustomResult(null);

    try {
      const response = await fetch('/api/gemini/legal-loreg-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legalQuery: customQuery }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setCustomResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (level: CertaintyLevel | string) => {
    if (level.includes('100% Legal')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (level.includes('Doctrina Consolidada')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    if (level.includes('Prohibición Expresa')) return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (level.includes('Riesgo Sancionador')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  };

  const getVerdictStyle = (verdict: string) => {
    if (verdict === 'PERMITIDO') return 'bg-emerald-500 text-slate-950 font-black';
    if (verdict === 'PROHIBIDO') return 'bg-red-500 text-white font-black';
    if (verdict === 'CONDICIONADO') return 'bg-amber-500 text-slate-950 font-black';
    return 'bg-slate-700 text-white';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Módulo de Inteligencia Jurídico-Electoral ("¿Puedo hacer esto?")
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Asistente Experto en LOREG y Doctrina de la Junta Electoral Central
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Sistema estricto de Certeza Jurídica con trazabilidad documental (BOE / JEC). Principio inquebrantable de <strong>"No Me Lo Inventes"</strong>: si no hay base normativa verificada, el sistema emite <em>"No hay información verificada suficiente"</em>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex gap-1 text-xs">
            <button
              onClick={() => setLegalSubTab('consultas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                legalSubTab === 'consultas'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Consultas LOREG y JEC
            </button>
            <button
              onClick={() => setLegalSubTab('gastos')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                legalSubTab === 'gastos'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Control de Gasto y Cuentas
            </button>
          </div>
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block font-mono">Marco Jurídico</span>
            <span className="text-xs font-bold text-amber-300 font-mono">L.O. 5/1985 & L.O. 8/2007</span>
          </div>
        </div>
      </div>

      {legalSubTab === 'consultas' && (
        <>
          {/* Interactive AI Query Box */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-md">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2 font-serif">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Formula una consulta jurídica de campaña en lenguaje natural:
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Ejemplos: "¿Podemos repartir merchandising en un mercadillo?", "¿Puede el alcalde inaugurar una plaza tras el Real Decreto?", "¿Qué distintivo puede llevar un apoderado en la mesa?"
        </p>

        <form onSubmit={handleAskAI} className="flex gap-2">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Escribe tu consulta jurídica sobre actos, propaganda, fondos o día de votación..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={loading || !customQuery.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Consultar Dictamen
          </button>
        </form>

        {/* AI Result Presentation */}
        {customResult && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono text-slate-400">RESPUESTA DIRECTA:</span>
                <span className={`px-3 py-1 rounded text-xs uppercase font-mono font-bold ${
                  customResult.respuestaDirecta === 'Sí' ? 'bg-emerald-500 text-slate-950' :
                  customResult.respuestaDirecta === 'No' ? 'bg-red-500 text-white' :
                  customResult.respuestaDirecta === 'NO HAY INFORMACIÓN VERIFICADA SUFICIENTE' ? 'bg-slate-700 text-amber-300' :
                  'bg-amber-500 text-slate-950'
                }`}>
                  {customResult.respuestaDirecta || customResult.verdict}
                </span>
              </div>
              <div className="text-xs font-mono font-bold">
                <span className="text-slate-400">NIVEL DE CERTEZA: </span>
                <span className="text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  {customResult.nivelCerteza || customResult.certaintyLevel || '[ALTA - Jurisprudencia/Ley consolidada]'}
                </span>
              </div>
            </div>

            {/* ARTÍCULO / NORMA & FECHA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block uppercase">ARTÍCULO / NORMA:</span>
                <div className="text-xs font-bold text-white font-mono mt-0.5">
                  {customResult.articuloNorma || customResult.primaryArticle}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block uppercase">FECHA DE VIGENCIA / ÚLTIMA ACTUALIZACIÓN:</span>
                <div className="text-xs font-bold text-amber-300 font-mono mt-0.5">
                  {customResult.fechaVigencia || 'Doctrina unificada LOREG / JEC vigente'}
                </div>
              </div>
            </div>

            {/* FUNDAMENTO JURÍDICO */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-white uppercase font-mono">FUNDAMENTO JURÍDICO:</span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                {customResult.fundamentoJuridico || customResult.legalSummary}
              </p>
            </div>

            {/* CLÁUSULA DE PRUDENCIA */}
            {customResult.clausulaPrudencia && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Cláusula de Prudencia:</strong> {customResult.clausulaPrudencia}
                </span>
              </div>
            )}

            {/* DIRECTRICES PRÁCTICAS */}
            {customResult.directricesPracticas && customResult.directricesPracticas.length > 0 && (
              <div>
                <span className="text-xs uppercase font-mono font-bold text-amber-300 block mb-2">
                  Directrices Prácticas Obligatorias para el Equipo:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {customResult.directricesPracticas.map((dir: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Knowledge Base Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pre-vetted high-risk questions */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase font-mono mb-2">
            Doctrina Consolidada y Consultas Recurrentes:
          </h3>
          {LOREG_KNOWLEDGE_BASE.map((item) => {
            const isSelected = selectedEntry?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => { setSelectedEntry(item); setCustomResult(null); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-amber-400 shadow-md'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${getVerdictStyle(item.verdict)}`}>
                    {item.verdict}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{item.question}</h4>
                <div className="mt-2 text-[11px] font-mono text-slate-400">
                  {item.primaryArticle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Pre-vetted Details */}
        <div className="lg:col-span-7">
          {selectedEntry && (
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="flex flex-wrap justify-between items-start gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded text-xs uppercase font-mono ${getVerdictStyle(selectedEntry.verdict)}`}>
                      {selectedEntry.verdict}
                    </span>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${getBadgeStyle(selectedEntry.certaintyLevel)}`}>
                      {selectedEntry.certaintyLevel}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif">{selectedEntry.question}</h3>
                </div>
              </div>

              {/* Legal Foundations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Artículo Legal</span>
                  <span className="text-xs font-bold text-white font-mono">{selectedEntry.primaryArticle}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Doctrina JEC / BOE</span>
                  <span className="text-xs font-bold text-amber-300 font-mono">{selectedEntry.jecRulingOrBoe}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono font-bold text-slate-300">Resumen Jurídico Ejecutivo:</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  {selectedEntry.summary}
                </p>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono font-bold text-slate-300">Análisis Doctrinal Extenso:</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                  {selectedEntry.detailedAnalysis}
                </p>
              </div>

              {/* Practical Guidelines */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-mono font-bold text-amber-300">
                  Instrucciones Prácticas para Interventores y Candidatos:
                </h4>
                <ul className="space-y-2 text-xs text-slate-200">
                  {selectedEntry.practicalGuidelines.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
        </>
      )}

      {/* SUBTAB 2: CONTROL DE GASTO ELECTORAL Y TRIBUNAL DE CUENTAS */}
      {legalSubTab === 'gastos' && (
        <div className="space-y-6">
          {/* Statutory Spend Limits Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Límite Ordinario Máximo (Toledo)</span>
              <div className="text-2xl font-bold text-white font-mono">
                {CAMPAIGN_BUDGET_LIMITS_TOLEDO.maxOrdinaryExpenditure.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
              </div>
              <span className="text-[11px] text-amber-300 font-mono block">
                Art. 175 LOREG (541.285 electores × 0,37 €)
              </span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Límite Subvención Mailing (Papeletas)</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {CAMPAIGN_BUDGET_LIMITS_TOLEDO.maxMailingExpenditure.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                Envío postal directo justificado (0,18 € / elector)
              </span>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Presupuesto Comprometido</span>
              <div className="text-2xl font-bold text-amber-400 font-mono">
                {CAMPAIGN_BUDGET_LIMITS_TOLEDO.currentCommittedBudget.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
              </div>
              <span className="text-[11px] text-slate-400 font-mono block">
                57,0% del límite legal consumido
              </span>
            </div>
          </div>

          {/* Account Verification & Anti-Fraud Notice */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase font-mono">
              <ShieldCheck className="w-4 h-4" />
              Cuentas Electorales Exclusivas Acreditadas ante la Junta de Toledo (Art. 124 LOREG):
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono">
              <div>
                <span className="text-white font-bold">{CAMPAIGN_BUDGET_LIMITS_TOLEDO.authorizedBankAccounts[0].bank}</span>
                <span className="text-slate-400 block text-[11px]">Titular: {CAMPAIGN_BUDGET_LIMITS_TOLEDO.authorizedBankAccounts[0].holder}</span>
              </div>
              <span className="text-amber-300 font-bold bg-slate-900 px-3 py-1 rounded border border-slate-700">
                {CAMPAIGN_BUDGET_LIMITS_TOLEDO.authorizedBankAccounts[0].iban}
              </span>
            </div>
          </div>

          {/* Invoices and Provider Pre-Clearance Table */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white font-serif">
                Control Previo de Proveedores y Facturación Auditada:
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Fiscalización Tribunal de Cuentas (L.O. 8/2007)
              </span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 hover:bg-slate-850/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <div>
                    <h4 className="font-bold text-white">{inv.concept}</h4>
                    <span className="text-slate-400 font-mono text-[11px] block mt-0.5">
                      Proveedor: {inv.provider}
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px] block mt-1">
                      ✓ {inv.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white font-mono block">
                      {inv.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      Gasto {inv.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
