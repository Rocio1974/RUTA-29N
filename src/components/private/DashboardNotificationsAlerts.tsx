import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Settings, 
  Filter, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  PlusCircle, 
  Trash2, 
  ExternalLink, 
  Check, 
  Share2, 
  ShieldAlert, 
  Radio, 
  Zap, 
  Volume2,
  Copy
} from 'lucide-react';
import { 
  CampaignNotification, 
  CustomAlertRule, 
  AlertTopic, 
  AlertUrgency,
  INITIAL_NOTIFICATIONS, 
  INITIAL_ALERT_RULES 
} from '../../data/campaignAlertsData';
import { TOLEDO_MUNICIPALITIES, COMARCAS_TOLEDO } from '../../data/toledoMunicipalities';

interface DashboardNotificationsAlertsProps {
  onGoToDiscursos?: (suggestedPrompt?: string) => void;
}

export const DashboardNotificationsAlerts: React.FC<DashboardNotificationsAlertsProps> = ({ onGoToDiscursos }) => {
  const [notifications, setNotifications] = useState<CampaignNotification[]>(INITIAL_NOTIFICATIONS);
  const [alertRules, setAlertRules] = useState<CustomAlertRule[]>(INITIAL_ALERT_RULES);
  
  // Filter States
  const [partyFilter, setPartyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [municipalityFilter, setMunicipalityFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Panels
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Rule Form State
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleScope, setNewRuleScope] = useState<'provincial' | 'comarca' | 'municipio'>('comarca');
  const [newRuleComarca, setNewRuleComarca] = useState('La Sagra');
  const [newRuleMun, setNewRuleMun] = useState('illescas');
  const [newRuleParty, setNewRuleParty] = useState('ALL');
  const [newRuleTopic, setNewRuleTopic] = useState('ALL');
  const [newRuleChannel, setNewRuleChannel] = useState<'Dashboard' | 'Telegram Campaña' | 'SMS Urgente' | 'Correo Prensa'>('SMS Urgente');
  const [newRuleUrgency, setNewRuleUrgency] = useState<AlertUrgency>('Alta (Réplica en 2h)');

  // Filtered Notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const matchParty = partyFilter === 'all' || notif.party === partyFilter;
      const matchTopic = topicFilter === 'all' || notif.topic === topicFilter;
      const matchMun = municipalityFilter === 'all' || notif.municipalityId === municipalityFilter || notif.comarca === municipalityFilter;
      const matchUrgency = urgencyFilter === 'all' || notif.urgency === urgencyFilter;
      const matchSearch = searchQuery === '' || 
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.statementQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.municipalityName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchParty && matchTopic && matchMun && matchUrgency && matchSearch;
    });
  }, [notifications, partyFilter, topicFilter, municipalityFilter, urgencyFilter, searchQuery]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.urgency.includes('Crítica') && !n.handled).length;

  const markAsHandled = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, handled: true, isRead: true } : n));
  };

  const copyCounterFact = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    const newRule: CustomAlertRule = {
      id: `rule-${Date.now()}`,
      ruleName: newRuleName,
      enabled: true,
      scopeType: newRuleScope,
      selectedComarca: newRuleScope === 'comarca' ? newRuleComarca : undefined,
      selectedMunicipality: newRuleScope === 'municipio' ? newRuleMun : undefined,
      selectedParties: [newRuleParty],
      selectedTopics: [newRuleTopic],
      channel: newRuleChannel,
      minUrgency: newRuleUrgency,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAlertRules([newRule, ...alertRules]);
    setNewRuleName('');
  };

  const toggleRule = (id: string) => {
    setAlertRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteRule = (id: string) => {
    setAlertRules(prev => prev.filter(r => r.id !== id));
  };

  // Simulate incoming live alert
  const simulateLiveAlert = () => {
    const sampleMuns = [
      { id: 'toledo-cap', name: 'Toledo (Capital)', comarca: 'La Sagra' },
      { id: 'talavera', name: 'Talavera de la Reina', comarca: 'Talavera' },
      { id: 'torrijos', name: 'Torrijos', comarca: 'Torrijos' },
      { id: 'madridejos', name: 'Madridejos', comarca: 'La Mancha Toledana' },
      { id: 'fuensalida', name: 'Fuensalida', comarca: 'Torrijos' },
      { id: 'sesena', name: 'Seseña', comarca: 'La Sagra' }
    ];
    const randomMun = sampleMuns[Math.floor(Math.random() * sampleMuns.length)];
    const parties: ('PP' | 'PSOE' | 'VOX' | 'Sumar')[] = ['PP', 'PSOE', 'VOX', 'Sumar'];
    const randomParty = parties[Math.floor(Math.random() * parties.length)];

    const newAlert: CampaignNotification = {
      id: `live-${Date.now()}`,
      title: `ÚLTIMA HORA: Declaraciones del candidato del ${randomParty} en ${randomMun.name} sobre infraestructuras y empleo`,
      statementQuote: `«Prometemos un plan integral de choque presupuestario para la comarca de ${randomMun.comarca} en los primeros 100 días de mandato».`,
      source: 'Agencia EFE / La Tribuna de Toledo (Teletipo en vivo)',
      party: randomParty,
      topic: 'Infraestructuras y Transportes',
      municipalityId: randomMun.id,
      municipalityName: randomMun.name,
      comarca: randomMun.comarca,
      timestamp: 'Ahora mismo',
      urgency: 'Crítica (Rompe Campaña)',
      isRead: false,
      handled: false,
      suggestedAction: `Lanzar réplica rápida desde el comité de ${randomMun.name} recordando las votaciones pasadas del ${randomParty} sobre enmiendas presupuestarias en Toledo.`,
      verifiedCounterFact: `En las últimas tres votaciones en el Congreso de los Diputados, las enmiendas específicas a los PGE destinadas a ${randomMun.name} no contaron con el voto favorable de su grupo.`
    };

    setNotifications([newAlert, ...notifications]);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
      {/* Top Header of Alert Center */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Radar de Alertas y Declaraciones • 204 Municipios de Toledo
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
            Monitor de Noticias, Reacciones y Declaraciones de Contrarios
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Sistema automatizado de vigilancia mediática y política territorial con alertas filtradas por municipio, partido y tema.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={simulateLiveAlert}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors shadow-sm"
            title="Simular teletipo entrante en vivo sobre Toledo"
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" /> Simular Alerta en Vivo
          </button>
          
          <button
            onClick={() => setIsConfigModalOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
          >
            <Settings className="w-3.5 h-3.5" /> Configurar Alertas ({alertRules.length})
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Alertas Totales</span>
          <span className="text-lg font-bold text-white font-mono">{notifications.length} monitorizadas</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Críticas Pendientes</span>
          <span className="text-lg font-bold text-red-400 font-mono">{criticalCount} sin réplica</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Sin Leer</span>
          <span className="text-lg font-bold text-amber-300 font-mono">{unreadCount} nuevas</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Reglas de Vigilancia</span>
          <span className="text-lg font-bold text-emerald-400 font-mono">{alertRules.filter(r => r.enabled).length} activas</span>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por titular, municipio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto text-xs">
          {/* Party Filter */}
          <select
            value={partyFilter}
            onChange={(e) => setPartyFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todos los Partidos</option>
            <option value="PSOE">PSOE</option>
            <option value="PP">PP</option>
            <option value="VOX">VOX</option>
            <option value="Sumar">Sumar</option>
            <option value="Institucional">Institucional</option>
          </select>

          {/* Topic Filter */}
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todos los Temas</option>
            <option value="Infraestructuras y Transportes">Infraestructuras y Transportes</option>
            <option value="Agua, Río Tajo y Regadíos">Agua, Río Tajo y Regadíos</option>
            <option value="Agricultura, Ganadería y PAC">Agricultura y PAC</option>
            <option value="Empleo, Industria y Logística">Empleo y Logística</option>
            <option value="Sanidad y Servicios Sociales">Sanidad y Social</option>
            <option value="Seguridad Ciudadana y Ocupación">Seguridad y Ocupación</option>
          </select>

          {/* Municipality / Comarca Filter */}
          <select
            value={municipalityFilter}
            onChange={(e) => setMunicipalityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Todos los Municipios / Comarcas</option>
            <optgroup label="Comarcas Principales">
              {COMARCAS_TOLEDO.map(c => (
                <option key={c.name} value={c.name}>Comarca: {c.name}</option>
              ))}
            </optgroup>
            <optgroup label="Municipios Clave">
              {TOLEDO_MUNICIPALITIES.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </optgroup>
          </select>

          {/* Urgency Filter */}
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="all">Toda Urgencia</option>
            <option value="Crítica (Rompe Campaña)">Crítica (Rompe Campaña)</option>
            <option value="Alta (Réplica en 2h)">Alta (Réplica en 2h)</option>
            <option value="Media (Argumentario Diario)">Media</option>
            <option value="Informativa">Informativa</option>
          </select>

          {(partyFilter !== 'all' || topicFilter !== 'all' || municipalityFilter !== 'all' || urgencyFilter !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setPartyFilter('all');
                setTopicFilter('all');
                setMunicipalityFilter('all');
                setUrgencyFilter('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-amber-400 hover:text-amber-300 px-2 py-1 underline"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3.5">
        {filteredNotifications.length === 0 ? (
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center text-slate-400 text-xs">
            No se han encontrado alertas con los filtros seleccionados. Modifica los criterios o simula una alerta en vivo.
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const isCritical = notif.urgency.includes('Crítica');
            const isHigh = notif.urgency.includes('Alta');
            const partyBadge =
              notif.party === 'PP' ? 'bg-blue-950 text-blue-300 border-blue-800' :
              notif.party === 'PSOE' ? 'bg-red-950 text-red-300 border-red-800' :
              notif.party === 'VOX' ? 'bg-green-950 text-green-300 border-green-800' :
              notif.party === 'Sumar' ? 'bg-pink-950 text-pink-300 border-pink-800' :
              'bg-slate-800 text-slate-300 border-slate-700';

            return (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all ${
                  notif.handled
                    ? 'bg-slate-950/60 border-slate-800/80 opacity-75'
                    : isCritical
                    ? 'bg-slate-950 border-red-500/50 shadow-lg shadow-red-950/20'
                    : isHigh
                    ? 'bg-slate-950 border-amber-500/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Notification Top Meta */}
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${
                      isCritical ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                      isHigh ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {notif.urgency}
                    </span>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${partyBadge}`}>
                      {notif.party}
                    </span>

                    <span className="text-[11px] font-mono text-amber-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <strong>{notif.municipalityName}</strong> ({notif.comarca})
                    </span>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {notif.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {notif.timestamp}
                    </span>
                    <span className="text-slate-500">• {notif.source}</span>
                  </div>
                </div>

                {/* Headline & Quote */}
                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {notif.title}
                </h4>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 italic mb-3">
                  {notif.statementQuote}
                </div>

                {/* Countermeasure Guidance & Verified Fact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90">
                    <strong className="text-amber-400 block mb-1 font-mono uppercase text-[11px]">
                      Línea de Réplica Inmediata Recomendada:
                    </strong>
                    {notif.suggestedAction}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200/90 flex flex-col justify-between">
                    <div>
                      <strong className="text-emerald-400 block mb-1 font-mono uppercase text-[11px]">
                        Dato Oficial Verificado para Desarme:
                      </strong>
                      <span>{notif.verifiedCounterFact}</span>
                    </div>
                    <div className="text-right mt-2">
                      <button
                        onClick={() => copyCounterFact(notif.id, notif.verifiedCounterFact)}
                        className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 underline inline-flex items-center gap-1"
                      >
                        {copiedId === notif.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedId === notif.id ? 'Dato Copiado' : 'Copiar Dato Oficial'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-between items-center pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    {notif.handled ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Réplica Atendida por Gabinete
                      </span>
                    ) : (
                      <button
                        onClick={() => markAsHandled(notif.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px]"
                      >
                        Marcar como Atendida
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {onGoToDiscursos && (
                      <button
                        onClick={() => onGoToDiscursos(notif.title)}
                        className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold rounded-lg border border-amber-500/30 flex items-center gap-1 text-[11px]"
                      >
                        <Sparkles className="w-3 h-3" /> Redactar Respuesta en Laboratorio LM
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL DE CONFIGURACIÓN DE ALERTAS */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-400" />
                  Configuración de Reglas de Alerta sobre Toledo
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Define filtros para recibir avisos automáticos ante declaraciones de contrarios o noticias en cualquiera de los 204 municipios.
                </p>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Form to Add New Rule */}
            <form onSubmit={handleCreateRule} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <h4 className="text-xs font-bold text-amber-300 uppercase font-mono flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" /> Crear Nueva Regla de Alerta
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nombre Descriptivo de la Regla</label>
                  <input
                    type="text"
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                    placeholder="Ej: Vigilancia de declaraciones sobre agua en La Mancha"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Ámbito Territorial</label>
                  <select
                    value={newRuleScope}
                    onChange={(e: any) => setNewRuleScope(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="provincial">Toda la Provincia de Toledo (204 municipios)</option>
                    <option value="comarca">Por Comarca Específica</option>
                    <option value="municipio">Municipio Concreto</option>
                  </select>
                </div>
              </div>

              {/* Conditional Comarca / Municipality Selector */}
              {newRuleScope === 'comarca' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Seleccionar Comarca de Toledo</label>
                  <select
                    value={newRuleComarca}
                    onChange={(e) => setNewRuleComarca(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    {COMARCAS_TOLEDO.map(c => (
                      <option key={c.name} value={c.name}>{c.name} ({c.municipalitiesCount} municipios)</option>
                    ))}
                  </select>
                </div>
              )}

              {newRuleScope === 'municipio' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Seleccionar Municipio entre los 204</label>
                  <select
                    value={newRuleMun}
                    onChange={(e) => setNewRuleMun(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    {TOLEDO_MUNICIPALITIES.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.comarca})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Formación a Monitorizar</label>
                  <select
                    value={newRuleParty}
                    onChange={(e) => setNewRuleParty(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="ALL">Todos los partidos</option>
                    <option value="PSOE">Solo PSOE</option>
                    <option value="PP">Solo PP</option>
                    <option value="VOX">Solo VOX</option>
                    <option value="Sumar">Solo Sumar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tema Clave</label>
                  <select
                    value={newRuleTopic}
                    onChange={(e) => setNewRuleTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="ALL">Cualquier tema</option>
                    <option value="Infraestructuras y Transportes">Infraestructuras y Transportes</option>
                    <option value="Agua, Río Tajo y Regadíos">Agua, Río Tajo y Regadíos</option>
                    <option value="Agricultura, Ganadería y PAC">Agricultura y PAC</option>
                    <option value="Empleo, Industria y Logística">Empleo y Logística</option>
                    <option value="Sanidad y Servicios Sociales">Sanidad y Social</option>
                    <option value="Seguridad Ciudadana y Ocupación">Seguridad y Ocupación</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Canal de Notificación</label>
                  <select
                    value={newRuleChannel}
                    onChange={(e: any) => setNewRuleChannel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Dashboard">Aviso en Dashboard</option>
                    <option value="Telegram Campaña">Telegram Portavoces</option>
                    <option value="SMS Urgente">SMS Urgente Director</option>
                    <option value="Correo Prensa">Correo Gabinete Prensa</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={!newRuleName.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  Guardar y Activar Regla
                </button>
              </div>
            </form>

            {/* List of Existing Rules */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase font-mono">
                Reglas Actualmente Activas ({alertRules.length}):
              </h4>

              <div className="space-y-2">
                {alertRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                        <strong className="text-white">{rule.ruleName}</strong>
                        <span className="text-[10px] font-mono text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                          {rule.channel}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Ámbito: <strong>{rule.scopeType}</strong> {rule.selectedComarca && `(${rule.selectedComarca})`} {rule.selectedMunicipality && `(${rule.selectedMunicipality})`} • 
                        Partidos: {rule.selectedParties.join(', ')} • Temas: {rule.selectedTopics.join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-colors ${
                          rule.enabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {rule.enabled ? 'ACTIVA' : 'PAUSADA'}
                      </button>

                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900 transition-colors"
                        title="Eliminar regla"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Cerrar Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
