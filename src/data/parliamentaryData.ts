export interface ParliamentaryInitiative {
  id: string;
  type: 'Pregunta Escrita al Gobierno' | 'Proposición No de Ley (PNL)' | 'Interpelación Urgente' | 'Moción en Senado';
  chamber: 'Congreso de los Diputados' | 'Senado de España';
  date: string;
  legislature: 'XV Legislatura' | 'XIV Legislatura' | 'XIII Legislatura';
  deputyOrSenator: string;
  group: string;
  title: string;
  topic: 'Infraestructuras y AVE' | 'Agua y Río Tajo' | 'Seguridad y Ocupación' | 'Agricultura y PAC' | 'Sanidad y Justicia';
  outcome: 'Aprobada' | 'Rechazada' | 'Respondida por escrito' | 'Caducada';
  parliamentaryExtract: string;
  strategicTakeaway: string;
}

export const PARLIAMENTARY_INITIATIVES: ParliamentaryInitiative[] = [
  {
    id: 'pnl-ave-talavera-2024',
    type: 'Proposición No de Ley (PNL)',
    chamber: 'Congreso de los Diputados',
    date: '2024-04-16',
    legislature: 'XV Legislatura',
    deputyOrSenator: 'Diputados electos por la Circunscripción de Toledo',
    group: 'Grupo Parlamentario Popular',
    title: 'Exigencia al Gobierno del soterramiento de las vías del AVE en su trazado urbano por Talavera de la Reina y fijación de cronograma vinculante',
    topic: 'Infraestructuras y AVE',
    outcome: 'Aprobada',
    parliamentaryExtract: 'El Pleno del Congreso insta al Gobierno de España a consensuar con el Ayuntamiento de Talavera de la Reina el proyecto constructivo soterrado para evitar una trinchera que estrangule el desarrollo urbano e industrial de la segunda ciudad más poblada de Toledo.',
    strategicTakeaway: 'Iniciativa de alta repercusión mediática local. Demuestra que la unión comarcal fuerza votaciones incómodas para el Gobierno.'
  },
  {
    id: 'pregunta-cercanias-illescas',
    type: 'Pregunta Escrita al Gobierno',
    chamber: 'Congreso de los Diputados',
    date: '2023-11-20',
    legislature: 'XV Legislatura',
    deputyOrSenator: 'Portavoz adjunto de Transportes',
    group: 'Grupo Parlamentario Mixto / Oposición',
    title: 'Previsiones temporales y presupuestarias para la llegada efectiva de la línea C-5 de Cercanías de Madrid hasta el municipio de Illescas (Toledo)',
    topic: 'Infraestructuras y AVE',
    outcome: 'Respondida por escrito',
    parliamentaryExtract: 'El Gobierno responde con evasivas remitiéndose al "Plan de Cercanías de Madrid en fase de evaluación técnica", sin fijar fecha de inicio de obras ni dotación específica para la electrificación del tramo Humanes-Illescas.',
    strategicTakeaway: 'Prueba documental irrefutable del abandono de La Sagra. Se debe exhibir la respuesta oficial del Ministerio en ruedas de prensa comarcales.'
  },
  {
    id: 'mocion-tajo-senado-2023',
    type: 'Moción en Senado',
    chamber: 'Senado de España',
    date: '2023-03-14',
    legislature: 'XIV Legislatura',
    deputyOrSenator: 'Senadores por la provincia de Toledo',
    group: 'Comisión General de las Comunidades Autónomas',
    title: 'Cumplimiento estricto de las cinco sentencias del Tribunal Supremo sobre fijación de caudales ecológicos en los municipios ribereños del Tajo',
    topic: 'Agua y Río Tajo',
    outcome: 'Aprobada',
    parliamentaryExtract: 'El Senado acuerda instar a la Confederación Hidrográfica del Tajo a no dilatar la implantación de los caudales ecológicos mínimos en Aranjuez, Toledo y Talavera, y a priorizar el abastecimiento humano y ambiental sobre las transferencias.',
    strategicTakeaway: 'El Senado, como cámara de representación territorial, es el foro óptimo para visibilizar agravios hídricos interautonómicos con senadores de Madrid, Castilla-La Mancha y Murcia.'
  },
  {
    id: 'pregunta-ocupacion-sesena',
    type: 'Pregunta Escrita al Gobierno',
    chamber: 'Congreso de los Diputados',
    date: '2024-02-08',
    legislature: 'XV Legislatura',
    deputyOrSenator: 'Diputada portavoz de Interior por Toledo',
    group: 'Grupo Parlamentario Popular',
    title: 'Número de denuncias por usurpación y allanamiento de morada en Seseña, Escalona y Torrijos, y efectivos de Guardia Civil asignados',
    topic: 'Seguridad y Ocupación',
    outcome: 'Respondida por escrito',
    parliamentaryExtract: 'El Ministerio del Interior reconoce un déficit de cobertura de vacantes del 14% en los puestos de la Guardia Civil de la provincia de Toledo respecto al catálogo oficial de plantilla.',
    strategicTakeaway: 'Dato oficial verificado que desmonta el discurso gubernamental sobre dotaciones policiales en Toledo.'
  }
];

export interface PolicyTranslation {
  id: string;
  nationalPolicy: string;
  boeReference: string;
  nationalDebate: string;
  toledoDirectImpact: string;
  affectedComarcas: string[];
  candidateTalkingPoints: string[];
}

export const NATIONAL_TO_TOLEDO_TRANSLATIONS: PolicyTranslation[] = [
  {
    id: 'reforma-pac-eco-regimenes',
    nationalPolicy: 'Plan Estratégico de la PAC (PEPAC) y aplicación de los ecorregímenes medioambientales',
    boeReference: 'Real Decreto 1048/2022, sobre la aplicación de las intervenciones del Plan Estratégico de la PAC',
    nationalDebate: 'Exigencias de rotación de cultivos, cubiertas vegetales y cuaderno digital de explotación impuestas por los acuerdos europeos de biodiversidad.',
    toledoDirectImpact: 'El 65% de las explotaciones de olivar tradicional en pendiente de Los Montes de Toledo y La Jara no pueden cumplir con el ecorrégimen de cubiertas vivas sin triplicar sus costes de mano de obra y combustible, arriesgando la pérdida de hasta un 23% de sus ayudas directas.',
    affectedComarcas: ['Montes de Toledo', 'La Jara', 'La Mancha Toledana', 'Sierra de San Vicente'],
    candidateTalkingPoints: [
      'Nuestros agricultores de Mora o Sonseca no son contaminadores; son los primeros guardianes del paisaje y del suelo toledano.',
      'En el Congreso y en Bruselas exigiremos la flexibilización inmediata de los ecorregímenes para el secano y el olivar de pendiente.',
      'Menos papeles en el despacho y más rentabilidad en el campo: supresión de las cargas punitivas del cuaderno digital.'
    ]
  },
  {
    id: 'ley-vivienda-alquiler',
    nationalPolicy: 'Ley 12/2023 por el Derecho a la Vivienda (Topes al alquiler y zonas tensionadas)',
    boeReference: 'Ley 12/2023, de 24 de mayo (BOE núm. 124)',
    nationalDebate: 'Intervención de precios de alquiler residencial y protección reforzada frente a desahucios de vulnerabilidad.',
    toledoDirectImpact: 'Efecto frontera inmediato: al topar precios en el sur de Madrid (Getafe, Leganés, Parla), miles de demandantes de alquiler se desplazan masivamente a Illescas, Seseña y Yuncos, disparando la demanda y contrayendo la oferta de alquiler toledana en más de un 28% por miedo a impagos y ocupaciones.',
    affectedComarcas: ['La Sagra', 'Mesa de Ocaña'],
    candidateTalkingPoints: [
      'Las leyes ideológicas aprobadas en Madrid provocan una marea de expulsión que satura el alquiler en La Sagra toledana.',
      'Defendemos seguridad jurídica para los pequeños propietarios: si hay garantía frente a la ocupación y aval público al alquiler joven, miles de casas vacías saldrán al mercado.',
      'Toledo necesita suelo urbanizable y bonificaciones al IRPF para jóvenes que quieran comprar su primera vivienda en nuestros municipios.'
    ]
  },
  {
    id: 'presupuestos-tren-mercancias',
    nationalPolicy: 'Inversiones Ferroviarias y Corredor Atlántico en los Presupuestos Generales del Estado',
    boeReference: 'Proyecto de Ley de Presupuestos Generales del Estado - Sección 17 (Transportes)',
    nationalDebate: 'Distribución de partidas de infraestructuras para electrificación de líneas y autopistas ferroviarias de mercancías.',
    toledoDirectImpact: 'Talavera de la Reina y el nodo logístico de Cazalegas corren el riesgo de quedar como un mero apeadero de paso si el Corredor Atlántico no incluye la estación intermodal de mercancías y el enlace directo con la A-5.',
    affectedComarcas: ['Talavera', 'Torrijos', 'Campana de Oropesa'],
    candidateTalkingPoints: [
      'No admitiremos un AVE que pase a 300 km/h por Talavera sin dejar riqueza ni puestos de trabajo.',
      'La plataforma logística de Talavera es de interés general del Estado: debe tener partida presupuestaria propia y no meros estudios preliminares.',
      'El voto de los toledanos en el Congreso y Senado condicionará cada partida de los Presupuestos Generales del Estado.'
    ]
  }
];
