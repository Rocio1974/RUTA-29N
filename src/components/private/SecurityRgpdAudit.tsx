import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Server, 
  CheckCircle2, 
  AlertOctagon, 
  FileCheck,
  KeyRound,
  FileSpreadsheet
} from 'lucide-react';

export const SecurityRgpdAudit: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Auditoría de Seguridad, Ciberdefensa y Privacidad RGPD / LOPDGDD
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Cumplimiento Normativo y Blindaje Criptográfico de la Candidatura
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Prohibición taxativa de perfilado ideológico personal (STC 76/2019), cifrado TLS 1.3 en tránsito y AES-256 en reposo, y soberanía de datos estricta en centros de cálculo de la Unión Europea.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-right">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Nivel de Seguridad</span>
          <span className="text-xs font-bold text-emerald-400 font-mono">ENS Nivel Alto / WCAG 2.1 AAA</span>
        </div>
      </div>

      {/* 4 Pillars of Campaign Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Prohibición de Perfilado */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Prohibición de Perfilado Ideológico Individual
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Sentencia del Tribunal Constitucional 76/2019
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            La plataforma RUTA 29N <strong>prohíbe expresamente</strong> el almacenamiento o tratamiento de opiniones políticas individuales de electores, el raspado de redes sociales para etiquetar ideología personal o la microsegmentación publicitaria basada en datos sensibles. Toda la analítica se realiza sobre datos agregados censales del INE por secciones censales y municipios.
          </p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Art. 58 bis LOREG anulado por el TC: Blindaje legal garantizado.</span>
          </div>
        </div>

        {/* Pillar 2: Cifrado y MFA */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Autenticación MFA y Cifrado E2EE
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Tokens TOTP / FIDO2 / WebAuthn
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Todos los accesos al centro de mando requieren doble factor de autenticación obligatorio. Las comunicaciones entre el equipo directivo, letrados electorales y coordinadores comarcales están protegidas mediante canales cifrados de extremo a extremo, impidiendo interceptaciones o filtraciones no autorizadas de material de campaña.
          </p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Cifrado TLS 1.3 / AES-256 en reposo verificado.</span>
          </div>
        </div>

        {/* Pillar 3: Soberanía de Datos en la Unión Europea */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Soberanía Digital y Alojamiento en la UE
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Reglamento General de Protección de Datos (RGPD)
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Las bases de datos relacionales y vectoriales residen en servidores de centros de datos dentro del territorio de la Unión Europea. No existe transferencia internacional de datos a jurisdicciones sin nivel adecuado de protección según los estándares de la AEPD (Agencia Española de Protección de Datos).
          </p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Servidores conformes al Esquema Nacional de Seguridad (ENS).</span>
          </div>
        </div>

        {/* Pillar 4: Accesibilidad Universal WCAG 2.1 AAA */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Accesibilidad Universal (WCAG 2.1 AAA)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Inclusión y Lectura Fácil para Ciudadanos
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Diseño adaptado para personas con discapacidad visual o cognitiva: selector de alto contraste en tiempo real, escalado de fuentes tipográficas, estructura semántica HTML5 estricta para lectores de pantalla y navegación asistida por teclado sin barreras.
          </p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Ratio de contraste de texto superior a 7:1 en modo alto contraste.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
