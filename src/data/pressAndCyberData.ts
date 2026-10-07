export interface MediaOutlet {
  id: string;
  name: string;
  type: 'Prensa Escrita / Digital' | 'Radio Comarcal / Provincial' | 'Televisión' | 'Agencia de Noticias';
  scope: 'Provincial' | 'Comarca Talavera' | 'Comarca La Sagra' | 'Comarca La Mancha' | 'Regional CLM';
  contactPerson: string;
  email: string;
  phone: string;
  audienceEstimate: string;
  coverageStatus: 'Acreditado Permanente' | 'Petición Pendiente' | 'Cobertura Puntual' | 'Especial Entrevistas';
}

export interface PressRelease {
  id: string;
  title: string;
  date: string;
  targetMedia: string;
  municipalityFocus: string;
  status: 'Borrador' | 'Enviado a Medios' | 'Publicado con Cobertura';
  clippingCount: number;
}

export interface CyberThreatAlert {
  id: string;
  detectedAt: string;
  type: 'Intento de Suplantación (Phishing)' | 'Bulo Coordinado en WhatsApp' | 'Campaña de Desinformación en Redes' | 'Ataque de Fuerza Bruta / Credenciales';
  severity: 'Crítica' | 'Alta' | 'Media';
  description: string;
  affectedTarget: string;
  mitigationProtocol: string;
  status: 'Neutralizado' | 'En Mitigación Activa' | 'En Monitorización';
}

export const TOLEDO_MEDIA_OUTLETS: MediaOutlet[] = [
  {
    id: 'med-01',
    name: 'Castilla-La Mancha Media (CMMedia)',
    type: 'Televisión',
    scope: 'Regional CLM',
    contactPerson: 'Redacción Informativos Toledo',
    email: 'informativos.toledo@cmmedia.es',
    phone: '925 288 600',
    audienceEstimate: 'Líder regional (más de 180.000 espectadores diarios)',
    coverageStatus: 'Acreditado Permanente'
  },
  {
    id: 'med-02',
    name: 'La Tribuna de Toledo',
    type: 'Prensa Escrita / Digital',
    scope: 'Provincial',
    contactPerson: 'Jefatura de Sección Política',
    email: 'redaccion@latribunadetoledo.es',
    phone: '925 256 700',
    audienceEstimate: '45.000 lectores digitales diarios',
    coverageStatus: 'Acreditado Permanente'
  },
  {
    id: 'med-03',
    name: 'La Voz del Tajo (Talavera)',
    type: 'Prensa Escrita / Digital',
    scope: 'Comarca Talavera',
    contactPerson: 'Alberto de Castro',
    email: 'redaccion@lavozdeltajo.com',
    phone: '925 801 210',
    audienceEstimate: 'Referente comarcal en Talavera y comarca de Oropesa',
    coverageStatus: 'Acreditado Permanente'
  },
  {
    id: 'med-04',
    name: 'Cadena SER Toledo (Radio Toledo 92.9 FM)',
    type: 'Radio Comarcal / Provincial',
    scope: 'Provincial',
    contactPerson: 'Dirección de Contenidos',
    email: 'ser.toledo@cadenaser.com',
    phone: '925 220 011',
    audienceEstimate: '38.000 oyentes en Hora 14 Toledo y Hoy por Hoy',
    coverageStatus: 'Especial Entrevistas'
  },
  {
    id: 'med-05',
    name: 'Onda Cero Talavera y La Sagra',
    type: 'Radio Comarcal / Provincial',
    scope: 'Comarca La Sagra',
    contactPerson: 'Coordinador comarcal',
    email: 'ondacero.talavera@ondacero.es',
    phone: '925 820 400',
    audienceEstimate: '26.000 oyentes comarcales',
    coverageStatus: 'Cobertura Puntual'
  },
  {
    id: 'med-06',
    name: 'El Digital Castilla-La Mancha (El Español)',
    type: 'Prensa Escrita / Digital',
    scope: 'Provincial',
    contactPerson: 'Mesa de Redacción',
    email: 'contacto@eldigitalclm.es',
    phone: '925 284 311',
    audienceEstimate: '95.000 usuarios únicos diarios en CLM',
    coverageStatus: 'Acreditado Permanente'
  },
  {
    id: 'med-07',
    name: 'Encastillalamancha.es (ENCLMTV)',
    type: 'Prensa Escrita / Digital',
    scope: 'Provincial',
    contactPerson: 'Directora de Política',
    email: 'redaccion@encastillalamancha.es',
    phone: '925 210 500',
    audienceEstimate: '50.000 lectores diarios',
    coverageStatus: 'Acreditado Permanente'
  },
  {
    id: 'med-08',
    name: 'Radio Surco La Mancha (Quintanar y Madridejos)',
    type: 'Radio Comarcal / Provincial',
    scope: 'Comarca La Mancha',
    contactPerson: 'Emisiones comarcales',
    email: 'informativos@radiosurco.es',
    phone: '926 512 800',
    audienceEstimate: 'Líder en cooperativas agrícolas de La Mancha toledana',
    coverageStatus: 'Petición Pendiente'
  }
];

export const CYBER_SECURITY_ALERTS: CyberThreatAlert[] = [
  {
    id: 'threat-01',
    detectedAt: 'Hoy, 09:14',
    type: 'Bulo Coordinado en WhatsApp',
    severity: 'Alta',
    description: 'Detección de una cadena viral manipulada en grupos vecinales de La Sagra (Illescas y Seseña) atribuyendo a nuestro candidato falso apoyo a peajes de acceso a Madrid en la A-42.',
    affectedTarget: 'Candidato nº 1 al Congreso de los Diputados',
    mitigationProtocol: 'Publicación inmediata de desmentido oficial en vídeo de 20s con la postura real del candidato: exigencia de tercer carril gratuito y abono transporte único.',
    status: 'En Mitigación Activa'
  },
  {
    id: 'threat-02',
    detectedAt: 'Ayer, 18:42',
    type: 'Intento de Suplantación (Phishing)',
    severity: 'Crítica',
    description: 'Envío de correos fraudulentos a apoderados e interventores de Talavera simulando ser de la "Junta Electoral Provincial de Toledo" solicitando claves de acceso al censo.',
    affectedTarget: 'Red de Apoderados y Gestores de Campaña',
    mitigationProtocol: 'Bloqueo del dominio suplantador en servidores de correo, aviso preventivo por SMS autenticado a los 350 interventores y denuncia a la Guardia Civil (Unidad de Delitos Telemáticos).',
    status: 'Neutralizado'
  },
  {
    id: 'threat-03',
    detectedAt: '2026-10-04, 22:15',
    type: 'Campaña de Desinformación en Redes',
    severity: 'Media',
    description: 'Creación de tres perfiles ficticios en redes sociales utilizando el logotipo de RUTA 29N para difundir encuestas electorales falsas con el objetivo de desmovilizar votantes en La Mancha toledana.',
    affectedTarget: 'Reputación digital de la candidatura en Toledo',
    mitigationProtocol: 'Notificación urgente al departamento legal de la plataforma y solicitud de retirada formal por infracción de marca e infracción del Art. 69 LOREG.',
    status: 'Neutralizado'
  }
];

export const CAMPAIGN_BUDGET_LIMITS_TOLEDO = {
  provincialCensus: 541285,
  spendingLimitPerElectorEuro: 0.37, // Importe oficial LOREG Art. 175 actualizado
  maxOrdinaryExpenditure: 200275.45, // 541.285 * 0.37 €
  mailingSubventionPerElector: 0.18, // Subvención justificada por envío directo de sobres y papeletas
  maxMailingExpenditure: 97431.30,
  currentCommittedBudget: 114250.00,
  currentOrdinarySpent: 68420.00,
  currentMailingSpent: 45830.00,
  authorizedBankAccounts: [
    { bank: 'Banco Santander (Oficina Principal Toledo Zocodover)', iban: 'ES84 0049 **** **** **** 4516', holder: 'Administrador Electoral Provincial Acreditado' }
  ]
};
