export type AlertUrgency = 'Crítica (Rompe Campaña)' | 'Alta (Réplica en 2h)' | 'Media (Argumentario Diario)' | 'Informativa';

export type AlertTopic = 
  | 'Infraestructuras y Transportes'
  | 'Agua, Río Tajo y Regadíos'
  | 'Agricultura, Ganadería y PAC'
  | 'Empleo, Industria y Logística'
  | 'Sanidad y Servicios Sociales'
  | 'Seguridad Ciudadana y Ocupación';

export interface CampaignNotification {
  id: string;
  title: string;
  statementQuote: string;
  source: string;
  party: 'PP' | 'PSOE' | 'VOX' | 'Sumar' | 'Institucional';
  topic: AlertTopic;
  municipalityId: string;
  municipalityName: string;
  comarca: string;
  timestamp: string; // ISO or human format
  urgency: AlertUrgency;
  isRead: boolean;
  handled: boolean;
  suggestedAction: string;
  verifiedCounterFact: string;
}

export interface CustomAlertRule {
  id: string;
  ruleName: string;
  enabled: boolean;
  scopeType: 'provincial' | 'comarca' | 'municipio';
  selectedComarca?: string;
  selectedMunicipality?: string;
  selectedParties: string[]; // ['PP', 'PSOE', 'VOX', 'Sumar'] or ['ALL']
  selectedTopics: string[]; // AlertTopic or ['ALL']
  channel: 'Dashboard' | 'Telegram Campaña' | 'SMS Urgente' | 'Correo Prensa';
  minUrgency: AlertUrgency;
  createdAt: string;
}

export const INITIAL_NOTIFICATIONS: CampaignNotification[] = [
  {
    id: 'alert-01',
    title: 'El Consejero de Fomento declara en Talavera que el soterramiento del AVE «está en manos del Ministerio» sin garantizar plazos',
    statementQuote: '«La Junta defenderá el soterramiento, pero la decisión técnica y la dotación presupuestaria corresponden exclusivamente al Ministerio de Transportes en Madrid».',
    source: 'CMMedia / La Tribuna de Talavera',
    party: 'PSOE',
    topic: 'Infraestructuras y Transportes',
    municipalityId: 'talavera',
    municipalityName: 'Talavera de la Reina',
    comarca: 'Talavera',
    timestamp: 'Hace 12 min',
    urgency: 'Crítica (Rompe Campaña)',
    isRead: false,
    handled: false,
    suggestedAction: 'Exigir en rueda de prensa comparecencia conjunta y compromiso presupuestario firmado antes del 29N. Desmontar la excusa competencial: Talavera no puede ser moneda de cambio.',
    verifiedCounterFact: 'El Estudio Informativo del tramo Madrid-Oropesa lleva acumulando más de 4 años de retraso y en los PGE vigentes la partida ferroviaria para Talavera tiene un nivel de ejecución real inferior al 28%.'
  },
  {
    id: 'alert-02',
    title: 'El alcalde de Illescas anuncia ampliación de suelo logístico en Plataforma Central Iberum y reclama mejoras en la A-42',
    statementQuote: '«La Sagra sigue liderando la creación de empleo industrial en el centro de España, pero necesitamos que el Estado culmine el tercer carril de la A-42 de inmediato».',
    source: 'Europa Press Castilla-La Mancha',
    party: 'PSOE',
    topic: 'Empleo, Industria y Logística',
    municipalityId: 'illescas',
    municipalityName: 'Illescas',
    comarca: 'La Sagra',
    timestamp: 'Hace 38 min',
    urgency: 'Alta (Réplica en 2h)',
    isRead: false,
    handled: false,
    suggestedAction: 'Recordar que su propio grupo parlamentario en el Congreso votó en contra de la enmienda de los PGE para electrificar la línea C-5 hasta Illescas.',
    verifiedCounterFact: 'En la votación de la Sección 17 de los PGE 2023 y 2024, los diputados toledanos del grupo socialista rechazaron la dotación específica de 65 M€ para la extensión de Cercanías a Illescas.'
  },
  {
    id: 'alert-03',
    title: 'Portavoz de VOX en Seseña denuncia aumento de ocupaciones ilegales en El Quiñón y falta de efectivos de Guardia Civil',
    statementQuote: '«Los vecinos de Seseña viven desamparados ante mafias de ocupación mientras la Guardia Civil de la zona cuenta con un tercio de las plazas sin cubrir».',
    source: 'Cadena SER Toledo',
    party: 'VOX',
    topic: 'Seguridad Ciudadana y Ocupación',
    municipalityId: 'sesena',
    municipalityName: 'Seseña',
    comarca: 'La Sagra',
    timestamp: 'Hace 1 hora',
    urgency: 'Media (Argumentario Diario)',
    isRead: true,
    handled: false,
    suggestedAction: 'Enfocar nuestra propuesta en reformas legales procesales urgentes (desalojo en 24h) y dotación presupuestaria real en vez de alarmismo sin proyecto legislativo.',
    verifiedCounterFact: 'Según datos oficiales del Ministerio del Interior remitidos en respuesta parlamentaria, la Comandancia de Toledo presenta una tasa de vacantes estructural del 14,2% en puestos rurales.'
  },
  {
    id: 'alert-04',
    title: 'Cooperativas de La Mancha toledana advierten de pérdidas de hasta el 25% por las trabas del cuaderno digital de la PAC',
    statementQuote: '«Las explotaciones de secano y olivar de Mora y Consuegra no pueden sostener la sobrecarga burocrática impuesta por los ecorregímenes ambientales».',
    source: 'El Digital CLM / ASAJA Toledo',
    party: 'Institucional',
    topic: 'Agricultura, Ganadería y PAC',
    municipalityId: 'mora',
    municipalityName: 'Mora',
    comarca: 'La Mancha Toledana',
    timestamp: 'Hace 2 horas',
    urgency: 'Alta (Réplica en 2h)',
    isRead: true,
    handled: true,
    suggestedAction: 'Lanzar comunicado del candidato al Senado: compromiso de derogación de las sanciones del cuaderno digital y moratoria para explotaciones de menos de 50 hectáreas.',
    verifiedCounterFact: 'En la provincia de Toledo hay más de 32.000 perceptores de ayudas directas de la PAC, de los cuales el 72% gestionan explotaciones familiares en municipios de menos de 10.000 habitantes.'
  },
  {
    id: 'alert-05',
    title: 'Sumar propone declarar Illescas y Toledo capital como zonas de mercado residencial tensionado para topar alquileres',
    statementQuote: '«Los jóvenes de La Sagra y Toledo no pueden pagar 800 euros de alquiler medio por la especulación generada por la cercanía a Madrid».',
    source: 'EFE Noticias Toledo',
    party: 'Sumar',
    topic: 'Sanidad y Servicios Sociales',
    municipalityId: 'toledo-cap',
    municipalityName: 'Toledo (Capital)',
    comarca: 'La Sagra',
    timestamp: 'Hace 3 horas',
    urgency: 'Media (Argumentario Diario)',
    isRead: true,
    handled: false,
    suggestedAction: 'Aclarar que topar precios contrae la oferta de alquiler (como ha ocurrido en Cataluña) y proponer en su lugar aval público joven al 100% y movilización de suelo municipal.',
    verifiedCounterFact: 'El portal inmobiliario Idealista constata que en los municipios toledanos limítrofes con Madrid la oferta de vivienda en alquiler se ha reducido un 22% interanual tras los anuncios regulatorios.'
  }
];

export const INITIAL_ALERT_RULES: CustomAlertRule[] = [
  {
    id: 'rule-01',
    ruleName: 'AVE y Cercanías en Talavera y La Sagra',
    enabled: true,
    scopeType: 'comarca',
    selectedComarca: 'Talavera',
    selectedParties: ['PSOE', 'PP', 'VOX'],
    selectedTopics: ['Infraestructuras y Transportes'],
    channel: 'SMS Urgente',
    minUrgency: 'Alta (Réplica en 2h)',
    createdAt: '2026-10-01'
  },
  {
    id: 'rule-02',
    ruleName: 'Declaraciones sobre Agua y Río Tajo',
    enabled: true,
    scopeType: 'provincial',
    selectedParties: ['ALL'],
    selectedTopics: ['Agua, Río Tajo y Regadíos'],
    channel: 'Dashboard',
    minUrgency: 'Media (Argumentario Diario)',
    createdAt: '2026-10-02'
  },
  {
    id: 'rule-03',
    ruleName: 'Campo, Olivar y PAC en La Mancha y Montes',
    enabled: true,
    scopeType: 'comarca',
    selectedComarca: 'La Mancha Toledana',
    selectedParties: ['ALL'],
    selectedTopics: ['Agricultura, Ganadería y PAC'],
    channel: 'Telegram Campaña',
    minUrgency: 'Media (Argumentario Diario)',
    createdAt: '2026-10-03'
  }
];
