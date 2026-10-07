import React, { useState } from 'react';
import { 
  Building2, 
  Landmark, 
  Lock, 
  MapPin, 
  Scale, 
  MessageSquare, 
  ShieldAlert, 
  BarChart3, 
  Vote, 
  Award, 
  Database, 
  ShieldCheck, 
  Compass, 
  Menu, 
  X,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { PublicHero } from './components/public/PublicHero';
import { CortesGeneralesHub } from './components/public/CortesGeneralesHub';
import { DhondtSimulator } from './components/public/DhondtSimulator';
import { ElectoralCalendarGuide } from './components/public/ElectoralCalendarGuide';
import { ToledoPublicDirectory } from './components/public/ToledoPublicDirectory';
import { LoginModal } from './components/public/LoginModal';

import { CampaignDashboard } from './components/private/CampaignDashboard';
import { MunicipalitiesObservatory } from './components/private/MunicipalitiesObservatory';
import { LegalLoregAdvisor } from './components/private/LegalLoregAdvisor';
import { LMLinguisticLab } from './components/private/LMLinguisticLab';
import { ArgumentariosMonitor } from './components/private/ArgumentariosMonitor';
import { ParliamentaryTracker } from './components/private/ParliamentaryTracker';
import { ElectionNightOps } from './components/private/ElectionNightOps';
import { PostElectionParliamentaryRoute } from './components/private/PostElectionParliamentaryRoute';
import { DatabaseArchitectureViewer } from './components/private/DatabaseArchitectureViewer';
import { SecurityRgpdAudit } from './components/private/SecurityRgpdAudit';
import { PressRoomAndCybersecurity } from './components/private/PressRoomAndCybersecurity';
import { Radio } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<'public' | 'private'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('candidato-congreso');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Accessibility states (WCAG AAA)
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  // Private navigation
  const [activePrivateModule, setActivePrivateModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    setCurrentMode('public');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLoginSuccess = (role: string) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentMode('private');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentMode('public');
  };

  const privateNavItems = [
    { id: 'dashboard', label: 'Estrategia General', icon: Layers, badge: '29N' },
    { id: 'observatorio', label: '204 Municipios Toledo', icon: MapPin, badge: '204' },
    { id: 'legal', label: 'Asistente LOREG / JEC', icon: Scale, badge: 'Certeza' },
    { id: 'discursos', label: 'Laboratorio Lingüístico (LM)', icon: MessageSquare, badge: '30s' },
    { id: 'argumentarios', label: 'Monitor de Argumentarios', icon: ShieldAlert, badge: 'Feed' },
    { id: 'parlamentario', label: 'Traductor Nacional Toledo', icon: BarChart3, badge: 'Cortes' },
    { id: 'noche-electoral', label: 'Noche Electoral e Incidencias', icon: Vote, badge: 'En Vivo' },
    { id: 'ruta-postlectoral', label: 'Ruta Postlectoral (Acta)', icon: Award, badge: 'Diputado' },
    { id: 'prensa-ciberseguridad', label: 'Prensa & Ciberdefensa', icon: Radio, badge: 'Medios' },
    { id: 'arquitectura-db', label: 'Arquitectura SQL & DDL', icon: Database, badge: 'PostGIS' },
    { id: 'seguridad-rgpd', label: 'Seguridad & RGPD', icon: ShieldCheck, badge: 'Auditoría' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all ${
      highContrast ? 'bg-black text-white' : 'bg-slate-950 text-slate-100'
    } ${fontSizeLarge ? 'text-lg leading-relaxed' : 'text-sm'}`}>
      
      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        onSwitchMode={(mode) => {
          if (mode === 'private' && !isAuthenticated) {
            setIsLoginModalOpen(true);
          } else {
            setCurrentMode(mode);
          }
        }}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        fontSizeLarge={fontSizeLarge}
        onToggleFontSize={() => setFontSizeLarge(!fontSizeLarge)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      {/* Mode 1: WEB PÚBLICA */}
      {currentMode === 'public' && (
        <main className="flex-1">
          <PublicHero
            onEnterPrivateApp={() => {
              if (isAuthenticated) {
                setCurrentMode('private');
              } else {
                setIsLoginModalOpen(true);
              }
            }}
            onScrollToSection={handleScrollToSection}
          />
          <CortesGeneralesHub />
          <DhondtSimulator />
          <ElectoralCalendarGuide />
          <ToledoPublicDirectory />
        </main>
      )}

      {/* Mode 2: APLICACIÓN WEB PRIVADA (CENTRO DE OPERACIONES) */}
      {currentMode === 'private' && (
        <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3.5 bg-amber-500 text-slate-950 font-bold rounded-full shadow-2xl flex items-center justify-center border border-amber-400"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Sidebar */}
          <aside className={`w-72 flex-shrink-0 lg:block ${
            sidebarOpen 
              ? 'fixed inset-y-0 left-0 z-50 bg-slate-950 p-6 border-r border-slate-800 shadow-2xl block' 
              : 'hidden lg:block'
          }`}>
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl sticky top-24 space-y-1">
              <div className="px-3 py-2 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800/80 mb-2 flex justify-between items-center">
                <span>Módulos de Campaña</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>

              {privateNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePrivateModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePrivateModule(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}>
                      {item.badge}
                    </span>
                  </button>
                );
              })}

              {/* Status footer in sidebar */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono px-2 space-y-1">
                <div>Sesión: {userRole}</div>
                <div className="text-emerald-500">Servidores UE • TLS 1.3</div>
              </div>
            </div>
          </aside>

          {/* Private Main Workspace */}
          <main className="flex-1 min-w-0">
            {activePrivateModule === 'dashboard' && (
              <CampaignDashboard
                onSelectModule={(mod) => setActivePrivateModule(mod)}
                userRole={userRole}
              />
            )}
            {activePrivateModule === 'observatorio' && <MunicipalitiesObservatory />}
            {activePrivateModule === 'legal' && <LegalLoregAdvisor />}
            {activePrivateModule === 'discursos' && <LMLinguisticLab />}
            {activePrivateModule === 'argumentarios' && <ArgumentariosMonitor />}
            {activePrivateModule === 'parlamentario' && <ParliamentaryTracker />}
            {activePrivateModule === 'noche-electoral' && <ElectionNightOps />}
            {activePrivateModule === 'ruta-postlectoral' && <PostElectionParliamentaryRoute />}
            {activePrivateModule === 'prensa-ciberseguridad' && <PressRoomAndCybersecurity />}
            {activePrivateModule === 'arquitectura-db' && <DatabaseArchitectureViewer />}
            {activePrivateModule === 'seguridad-rgpd' && <SecurityRgpdAudit />}
          </main>
        </div>
      )}

      {/* Global Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-10 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <span className="text-base font-bold text-white font-serif">
                  RUTA <span className="text-amber-400">29N</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Centro digital de preparación, estrategia y gestión para candidaturas al Congreso de los Diputados y Senado. Con observatorio territorial de los 204 municipios de la provincia de Toledo.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono mb-3">Marco Institucional</h4>
              <ul className="space-y-2 text-xs">
                <li>• Cortes Generales: Congreso y Senado</li>
                <li>• Ley Orgánica 5/1985 del Régimen Electoral General (LOREG)</li>
                <li>• Doctrina Vinculante de la Junta Electoral Central (JEC)</li>
                <li>• Circunscripción Electoral Provincial de Toledo</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono mb-3">Trazabilidad y Principios</h4>
              <ul className="space-y-2 text-xs">
                <li>• Principio estricto: "No Me Lo Inventes"</li>
                <li>• Prohibición de perfilado ideológico personal (STC 76/2019)</li>
                <li>• Cumplimiento íntegro RGPD / LOPDGDD</li>
                <li>• Accesibilidad web WCAG 2.1 Nivel AAA</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase font-mono mb-3">Accesos y Soporte</h4>
              <p className="text-xs text-slate-400 mb-3">
                Plataforma dual diseñada para candidatos, directores de campaña, letrados, periodistas y ciudadanía toledana.
              </p>
              <button
                onClick={() => {
                  if (isAuthenticated) setCurrentMode('private');
                  else setIsLoginModalOpen(true);
                }}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 rounded-xl font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Acceso al Centro de Mando
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
            <div>
              © 2026 RUTA 29N • Plataforma Oficial de Estrategia y Preparación Electoral de Toledo
            </div>
            <div className="flex gap-4 mt-2 sm:mt-0 font-mono">
              <span>PostgreSQL 16 + PostGIS</span>
              <span>•</span>
              <span>Gemini 3.8 Flash RAG</span>
              <span>•</span>
              <span>Soberanía Digital UE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Simulated MFA Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
