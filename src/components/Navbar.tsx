import React from 'react';
import { 
  Building2, 
  Landmark, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Compass, 
  MapPin, 
  Scale, 
  MessageSquareText, 
  Database, 
  Calendar, 
  FileText, 
  BarChart3,
  Sun,
  Moon,
  Type
} from 'lucide-react';

interface NavbarProps {
  currentMode: 'public' | 'private';
  onSwitchMode: (mode: 'public' | 'private') => void;
  activePrivateModule?: string;
  onSelectPrivateModule?: (modId: string) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSizeLarge: boolean;
  onToggleFontSize: () => void;
  onOpenLoginModal: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSwitchMode,
  highContrast,
  onToggleHighContrast,
  fontSizeLarge,
  onToggleFontSize,
  onOpenLoginModal,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${
      highContrast 
        ? 'bg-black text-white border-amber-400' 
        : 'bg-slate-950/95 backdrop-blur-md text-slate-100 border-slate-800'
    }`}>
      {/* Top Banner: Institutional identification */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 py-1 text-xs text-slate-400 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            ESPAÑA • CORTES GENERALES
          </span>
          <span className="hidden sm:inline">Circunscripción Provincial de Toledo (6 Congreso • 4 Senado)</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
            <ShieldCheck className="w-3 h-3" /> Cifrado E2EE • RGPD / LOPDGDD Conforme
          </span>
        </div>
        <div className="flex items-center space-x-3 mt-1 sm:mt-0">
          <button 
            onClick={onToggleFontSize}
            className="hover:text-amber-300 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-700 hover:border-amber-400 text-[11px]"
            title="Ajustar tamaño de letra para accesibilidad WCAG AAA"
          >
            <Type className="w-3 h-3" /> {fontSizeLarge ? 'A- Estándar' : 'A+ Accesible'}
          </button>
          <button 
            onClick={onToggleHighContrast}
            className="hover:text-amber-300 flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-700 hover:border-amber-400 text-[11px]"
            title="Modo Alto Contraste WCAG AAA"
          >
            {highContrast ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3" />}
            {highContrast ? 'Contraste Normal' : 'Alto Contraste'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSwitchMode('public')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 via-amber-500 to-red-700 flex items-center justify-center shadow-lg shadow-amber-900/20 border border-amber-400/40">
              <Landmark className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-serif">
                  RUTA <span className="text-amber-400">29N</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-800 text-amber-300 rounded border border-slate-700">
                  Toledo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Centro Digital de Preparación Electoral y Parlamentaria
              </p>
            </div>
          </div>

          {/* Dual Product Mode Switcher */}
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => onSwitchMode('public')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  currentMode === 'public'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Web Pública</span>
                <span className="sm:hidden">Pública</span>
              </button>
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    onSwitchMode('private');
                  } else {
                    onOpenLoginModal();
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  currentMode === 'private'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">App Privada (Campaña)</span>
                <span className="sm:hidden">Privada</span>
                {isAuthenticated && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </button>
            </div>

            {/* Auth Button */}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="text-xs px-3 py-1.5 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-950/40 transition-colors"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-medium transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3" /> Acceso Candidatura
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
