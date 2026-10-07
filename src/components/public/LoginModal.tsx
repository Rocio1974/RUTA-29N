import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, Smartphone, Check, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userRole: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [role, setRole] = useState('candidato-congreso');
  const [mfaCode, setMfaCode] = useState('294516');
  const [loading, setLoading] = useState(false);
  const [mfaSuccess, setMfaSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMfaSuccess(true);
      setTimeout(() => {
        onLoginSuccess(role);
        onClose();
      }, 700);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-7 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-red-600" />

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Acceso Espacio Privado</h3>
              <p className="text-xs text-slate-400">Autenticación Multifactor MFA Obligatoria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              Rol de Campaña / Credencial
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 font-medium"
            >
              <option value="candidato-congreso">Candidato/a nº 1 al Congreso de los Diputados</option>
              <option value="candidato-senado">Candidato/a al Senado de España (Circ. Toledo)</option>
              <option value="director-campana">Director/a de Campaña Provincial</option>
              <option value="letrado-loreg">Asesor/a Jurídico LOREG y JEC</option>
              <option value="dircom">Director/a de Comunicación y Medios</option>
              <option value="coordinador-territorial">Coordinador/a Territorial de los 204 Municipios</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex justify-between">
              <span>Token de Seguridad MFA (Google Auth / FIDO2)</span>
              <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                <Smartphone className="w-3 h-3" /> Token Simulado
              </span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="6 dígitos (ej: 294516)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono text-amber-300 tracking-widest focus:outline-none focus:border-amber-400"
                maxLength={6}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Sesión Cifrada de Extremo a Extremo (E2EE)
            </div>
            <p>
              Acceso restringido a miembros acreditados de la candidatura. Auditoría en tiempo real y cumplimiento estricto del RGPD / LOPDGDD.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || mfaSuccess}
            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              mfaSuccess
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Verificando Claves Criptográficas...
              </span>
            ) : mfaSuccess ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Autenticado con Éxito. Iniciando...
              </span>
            ) : (
              <span>Entrar al Centro de Operaciones 29N</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
