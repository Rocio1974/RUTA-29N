export type ProjectStatus = 'Pendiente' | 'En Licitación' | 'En Ejecución' | 'Finalizado' | 'Paralizado';

export interface TerritorialProject {
  id: string;
  title: string;
  comarca: string;
  municipalityIds: string[];
  status: ProjectStatus;
  budgetMillionsEuro: number;
  financingSource: 'PGE (Estado)' | 'Junta CLM' | 'Fondos NextGen EU' | 'Mixto Estado-CLM';
  description: string;
  parliamentaryArgument: string;
  criticalDate: string;
  impactLevel: 'Estratégico Provincial' | 'Comarcal Clave' | 'Local Decisivo';
}

export const TERRITORIAL_PROJECTS: TerritorialProject[] = [
  {
    id: 'ave-madrid-talavera-lisboa',
    title: 'Línea de Alta Velocidad Madrid-Talavera-Extremadura-Lisboa (Soterramiento en Talavera)',
    comarca: 'Talavera',
    municipalityIds: ['talavera', 'calera-y-chozas', 'oropesa'],
    status: 'En Licitación',
    budgetMillionsEuro: 1250.0,
    financingSource: 'PGE (Estado)',
    description: 'Estudio informativo y licitación de tramos Pantoja-Talavera y Talavera-Oropesa. Reivindicación unánime del soterramiento a su paso urbano por Talavera de la Reina para evitar una barrera física de vías.',
    parliamentaryArgument: 'Toledo y Talavera no pueden tolerar más retrasos mientras Madrid y Lisboa fijan 2030 como horizonte del Mundial. Exigimos consignación presupuestaria plurianual blindada en el Congreso y compromiso por escrito del Ministerio de Transportes con el soterramiento.',
    criticalDate: 'Primer trimestre 2027',
    impactLevel: 'Estratégico Provincial'
  },
  {
    id: 'tercer-carril-a42-cercanias-sagra',
    title: 'Plan de Choque de Movilidad La Sagra: Tercer Carril A-42 y Extensión C-5 Renfe a Illescas',
    comarca: 'La Sagra',
    municipalityIds: ['illescas', 'sesena', 'yuncos', 'bargas', 'olias-del-rey', 'toledo-cap'],
    status: 'Pendiente',
    budgetMillionsEuro: 185.0,
    financingSource: 'PGE (Estado)',
    description: 'Ampliación de capacidad en la autovía A-42 en los 28 km de mayor saturación diaria (Toledo-Madrid) y reactivación del servicio ferroviario de cercanías de Madrid hasta Illescas mediante electrificación de vía única existente.',
    parliamentaryArgument: 'Más de 45.000 trabajadores de Toledo sufren atascos diarios de más de 40 minutos en el corredor de la A-42. Mientras se recaudan millones en impuestos en La Sagra industrial, la inversión en cercanías ferroviarias está congelada.',
    criticalDate: 'Debate PGE en el Congreso',
    impactLevel: 'Estratégico Provincial'
  },
  {
    id: 'caudal-ecologico-tajo-alberche',
    title: 'Garantía de Caudales Ecológicos del Tajo y Reducción Reglas del Trasvase Tajo-Segura',
    comarca: 'La Sagra',
    municipalityIds: ['toledo-cap', 'talavera', 'cebolla', 'puebla-de-montalban'],
    status: 'En Ejecución',
    budgetMillionsEuro: 92.5,
    financingSource: 'PGE (Estado)',
    description: 'Aplicación de las sentencias del Tribunal Supremo sobre caudales mínimos ecológicos del río Tajo a su paso por Toledo y Talavera de la Reina, con modernización de depuradoras de la cuenca de Madrid y modificación de las reglas de explotación.',
    parliamentaryArgument: 'El Tajo no puede seguir siendo un canal de desagüe de aguas residuales madrileñas ni un expolio hacia el Levante sin atender las necesidades de regadío y desarrollo de los municipios toledanos.',
    criticalDate: 'Revisión Plan Hidrológico 2027',
    impactLevel: 'Estratégico Provincial'
  },
  {
    id: 'autovia-a40-toledo-ocana',
    title: 'Cierre del Tramo Pendiente Autovía A-40 Toledo - Ocaña',
    comarca: 'Mesa de Ocaña',
    municipalityIds: ['toledo-cap', 'ocana', 'bargas'],
    status: 'Paralizado',
    budgetMillionsEuro: 240.0,
    financingSource: 'PGE (Estado)',
    description: 'Tramo de 38 km pendiente de la Autovía de la Alcarria / A-40 que conecta directamente la capital provincial con el nudo de Ocaña (A-4 / R-4), evitando el rodeo por Aranjuez o carreteras comarcales colapsadas.',
    parliamentaryArgument: 'La paralización de este tramo desconecta a Toledo del gran corredor logístico del este y de Andalucía, forzando tráfico pesado por vías secundarias de alta siniestralidad.',
    criticalDate: 'Reclamación en Comisión de Transportes',
    impactLevel: 'Comarcal Clave'
  },
  {
    id: 'modernizacion-regadios-alberche',
    title: 'Modernización y Digitalización de Regadíos Canal Bajo del Alberche',
    comarca: 'Talavera',
    municipalityIds: ['talavera', 'calera-y-chozas', 'cebolla'],
    status: 'En Ejecución',
    budgetMillionsEuro: 48.7,
    financingSource: 'Fondos NextGen EU',
    description: 'Sustitución de acequias tradicionales abiertas por conducciones presurizadas con telecontrol para más de 9.000 hectáreas de regantes en Talavera y comarca, garantizando ahorro del 30% de agua.',
    parliamentaryArgument: 'El futuro del campo toledano pasa por la eficiencia hídrica. La candidatura defenderá bonificaciones fiscales a la modernización y la eliminación de trabas burocráticas a las comunidades de regantes.',
    criticalDate: 'Diciembre 2026',
    impactLevel: 'Comarcal Clave'
  },
  {
    id: 'juzgados-seguridad-illescas',
    title: 'Nuevo Edificio Judicial y Comisaría de Policía Nacional en Illescas',
    comarca: 'La Sagra',
    municipalityIds: ['illescas', 'yuncos', 'sesena'],
    status: 'En Licitación',
    budgetMillionsEuro: 16.4,
    financingSource: 'PGE (Estado)',
    description: 'Concentración de las sedes del partido judicial de Illescas que da servicio a más de 120.000 habitantes y solicitud urgente de creación de comisaría de Policía Nacional ante la expansión industrial de la zona.',
    parliamentaryArgument: 'Illescas ha duplicado su población y concentra centros logísticos mundiales, pero su dotación judicial y policial sigue dimensionada para un pueblo de los años 90. Es una exigencia innegociable en el Congreso.',
    criticalDate: 'Octubre 2026',
    impactLevel: 'Local Decisivo'
  },
  {
    id: 'encauzamiento-sanguesa-cebolla',
    title: 'Plan Integral Antirriadas y Encauzamiento Arroyo Sangüesa en Cebolla',
    comarca: 'Torrijos',
    municipalityIds: ['cebolla'],
    status: 'Finalizado',
    budgetMillionsEuro: 6.2,
    financingSource: 'Mixto Estado-CLM',
    description: 'Obras de infraestructura hidráulica en el casco urbano de Cebolla para evitar las periódicas inundaciones que anegaban viviendas y comercios.',
    parliamentaryArgument: 'Ejemplo de éxito de la presión parlamentaria constante: lo que parecía imposible se convirtió en obra real. Demuestra que tener voz en Madrid cambia la vida de nuestros pueblos.',
    criticalDate: 'Finalizado e inaugurado',
    impactLevel: 'Local Decisivo'
  },
  {
    id: 'fibra-transporte-sanitario-rural',
    title: 'Plan de Garantía de Servicios Básicos en La Jara y Sierra de San Vicente',
    comarca: 'La Jara',
    municipalityIds: ['alcaudete-de-la-jara', 'navalcancan'],
    status: 'En Ejecución',
    budgetMillionsEuro: 11.8,
    financingSource: 'Fondos NextGen EU',
    description: 'Despliegue de banda ancha ultrarrápida 5G en municipios de menos de 1.000 habitantes y refuerzo de unidades móviles de soporte vital y guardias médicas.',
    parliamentaryArgument: 'No hay ciudadanos de primera y de segunda. Un vecino de Alcaudete de la Jara tiene el mismo derecho a conectividad y atención sanitaria rápida que uno del centro de Toledo.',
    criticalDate: 'Primer semestre 2027',
    impactLevel: 'Comarcal Clave'
  }
];
