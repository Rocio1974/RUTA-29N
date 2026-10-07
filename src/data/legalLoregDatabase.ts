export type CertaintyLevel = 
  | '100% Legal (Amparado expresamente por la LOREG)'
  | 'Doctrina Consolidada JEC (Criterio Vinculante)'
  | 'Prohibición Expresa (Infracción Electoral o Delito)'
  | 'Riesgo Sancionador Alto (Criterio Restrictivo)'
  | 'Requiere Autorización Previa de Junta Electoral Provincial';

export interface LegalEntry {
  id: string;
  question: string;
  category: 'Propaganda y Cartelería' | 'Actos Institucionales / Cargos Públicos' | 'Financiación y Gastos' | 'Día de Reflexión y Votación' | 'Medios de Comunicación y Encuestas' | 'Interventores y Apoderados';
  certaintyLevel: CertaintyLevel;
  primaryArticle: string;
  jecRulingOrBoe: string;
  verdict: 'PERMITIDO' | 'PROHIBIDO' | 'CONDICIONADO' | 'NO APLICABLE';
  summary: string;
  detailedAnalysis: string;
  practicalGuidelines: string[];
  statuteReference: string;
  dateOrResolution: string;
}

export const LOREG_KNOWLEDGE_BASE: LegalEntry[] = [
  {
    id: 'propaganda-previa-campana',
    question: '¿Podemos repartir folletos, colocar vallas o pedir el voto antes del inicio oficial de la campaña electoral (los 15 días previos)?',
    category: 'Propaganda y Cartelería',
    certaintyLevel: 'Prohibición Expresa (Infracción Electoral o Delito)',
    primaryArticle: 'Art. 53 párrafo segundo de la LOREG (reformado por L.O. 2/2011)',
    jecRulingOrBoe: 'Instrucción JEC 3/2011, de 24 de marzo, modificada por Instrucción 2/2017 y 1/2019',
    verdict: 'CONDICIONADO',
    summary: 'Se permite dar a conocer a los candidatos y programas en actos internos o informativos, pero está TERMINANTEMENTE PROHIBIDO cualquier petición expresa de voto o publicidad contratada en soportes comerciales antes del inicio legal de la campaña.',
    detailedAnalysis: 'Desde la convocatoria de elecciones hasta el inicio formal de la campaña electoral queda expresamente prohibida la realización de publicidad o propaganda electoral mediante carteles, soportes comerciales o inserciones en prensa/radio/televisión/redes de pago encaminadas directamente a solicitar el voto. Los partidos solo pueden realizar comunicaciones ordinarias con afiliados, ruedas de prensa, actos sectoriales de presentación de ideas sin pedir el voto explícito y distribución de material meramente informativo sin solicitud de sufragio.',
    practicalGuidelines: [
      'NUNCA uses lemas como "Vota a...", "Apóyanos con tu papeleta" ni logos de campaña con llamamiento al voto en vallas o folletos antes de la medianoche del primer día de campaña oficial.',
      'SÍ puedes celebrar actos públicos de presentación del candidato o conferencias explicativas.',
      'SÍ puedes distribuir material que explique el programa de gobierno de la candidatura sin consigna de votación.'
    ],
    statuteReference: 'BOE núm. 147, de 20 de junio de 1985 (LOREG consolidada)',
    dateOrResolution: 'Acuerdos JEC 231/2019, 142/2023'
  },
  {
    id: 'inauguraciones-cargos-publicos',
    question: '¿Puede un alcalde, presidente o consejero inaugurar obras, servicios o presumir de logros de gestión tras publicarse el Real Decreto de convocatoria electoral?',
    category: 'Actos Institucionales / Cargos Públicos',
    certaintyLevel: 'Prohibición Expresa (Infracción Electoral o Delito)',
    primaryArticle: 'Art. 50.2 y 50.3 de la LOREG',
    jecRulingOrBoe: 'Instrucción JEC 2/2011, de 24 de marzo, sobre interpretación del Art. 50 LOREG',
    verdict: 'PROHIBIDO',
    summary: 'Desde la publicación de la convocatoria electoral y hasta la votación, queda prohibido cualquier acto de inauguración de obras o servicios, y cualquier campaña institucional que ensalce logros o realizaciones de la administración.',
    detailedAnalysis: 'El artículo 50.2 prohíbe taxativamente la inauguración formal de obras públicas o proyectos financiados con fondos públicos. No se pueden colocar primeras piedras ni cortar cintas ni realizar visitas institucionales con cobertura mediática que simulen inauguraciones. El art. 50.3 prohíbe que la publicidad institucional contenga frases, imágenes o símbolos que sugieran logros o balance positivo de la gestión del equipo de gobierno en funciones.',
    practicalGuidelines: [
      'Si una obra se termina, puede abrirse al uso de los vecinos por necesidad pública, pero SIN acto institucional, sin corte de cinta, sin discursos de autoridades y sin convocatoria de prensa oficial.',
      'Cualquier infracción conlleva la apertura inmediata de expediente sancionador por la Junta Electoral Provincial (multas personales de 300 a 3.000 € para la autoridad).',
      'El equipo de campaña contrario puede denunciar el acto ante la Junta Electoral de Zona o Provincial en menos de 24 horas aportando fotos, notas de prensa y tuits oficiales.'
    ],
    statuteReference: 'BOE-A-1985-11672 Art. 50',
    dateOrResolution: 'Sentencia TC 172/2020 y Acuerdos JEC reiterados'
  },
  {
    id: 'merchandising-dia-reflexion',
    question: '¿Qué actividades están permitidas o prohibidas durante la jornada de reflexión (las 24 horas previas a la votación)?',
    category: 'Día de Reflexión y Votación',
    certaintyLevel: 'Prohibición Expresa (Infracción Electoral o Delito)',
    primaryArticle: 'Art. 53 de la LOREG y Art. 144.1.a (Delitos electorales)',
    jecRulingOrBoe: 'Doctrina unificada de la Junta Electoral Central sobre jornada de reflexión',
    verdict: 'PROHIBIDO',
    summary: 'Queda absolutamente prohibida la difusión de propaganda electoral, mítines, caravanas con megafonía, reparto de papeletas en vía pública o llamadas a la movilización partidaria durante toda la jornada de reflexión.',
    detailedAnalysis: 'La jornada de reflexión se concibe por la legislación española como un periodo de serenidad para el elector libre de influencias directas inmediatas. No se permite la instalación de carpas informativas, el reparto de merchandising (camisetas, bolígrafos, trípticos) ni la publicación de mensajes de petición de voto en perfiles de redes sociales o medios de comunicación. Mantener la cartelería colocada legalmente durante los 15 días de campaña no es infracción, pero no se pueden pegar nuevos carteles ni repartir material fresco.',
    practicalGuidelines: [
      'Cero actos públicos de partido dirigidos a electores generales.',
      'Las sedes de los partidos pueden permanecer abiertas para logística interna de apoderados e interventores, pero sin emitir música ni megafonía exterior.',
      'El candidato puede ser fotografiado en paseos personales o con su familia por los medios de comunicación, pero no puede formular declaraciones pidiendo el sufragio ni haciendo balance de campaña.'
    ],
    statuteReference: 'LOREG Art. 53 y 144 (penas de prisión de 3 meses a 1 año o multa)',
    dateOrResolution: 'Acuerdo JEC 412/2016'
  },
  {
    id: 'publicacion-sondeos-5-dias',
    question: '¿Cuándo entra en vigor la prohibición legal de publicar encuestas y sondeos electorales en España?',
    category: 'Medios de Comunicación y Encuestas',
    certaintyLevel: 'Prohibición Expresa (Infracción Electoral o Delito)',
    primaryArticle: 'Art. 69.7 y 69.8 de la LOREG',
    jecRulingOrBoe: 'Instrucción JEC y jurisprudencia penal ordinaria',
    verdict: 'PROHIBIDO',
    summary: 'Durante los 5 días anteriores al de la votación queda prohibida la publicación, difusión o reproducción de sondeos o encuestas electorales por cualquier medio de comunicación.',
    detailedAnalysis: 'El plazo arranca a las 00:00 horas del quinto día previo al domingo de votación (la medianoche del lunes al martes de la última semana). A partir de ese momento, ningún periódico, emisora de radio, canal de televisión, portal digital o red social con domicilio o difusión en España puede publicar estimaciones de voto ni reparto de escaños. Los partidos políticos sí pueden encargar trackings demoscópicos internos para su consumo de estrategia estrictamente privado, pero su filtración intencionada es ilícita.',
    practicalGuidelines: [
      'No difundir desde cuentas oficiales del partido capturas de supuestos sondeos o "trackings andorranos/australianos" con nombres de frutas o verduras, ya que la JEC ha impuesto multas cuando hay autoría partidista identificada.',
      'Los sondeos internos de última hora deben estar clasificados como "Documento Confidencial Interno de Campaña".'
    ],
    statuteReference: 'LOREG Art. 69.7',
    dateOrResolution: 'Acuerdo JEC 18/2021'
  },
  {
    id: 'distintivos-interventores-apoderados',
    question: '¿Qué emblemas, credenciales y distintivos pueden llevar los interventores y apoderados dentro del colegio electoral el día de la votación?',
    category: 'Interventores y Apoderados',
    certaintyLevel: 'Doctrina Consolidada JEC (Criterio Vinculante)',
    primaryArticle: 'Art. 91.1 y 93 de la LOREG',
    jecRulingOrBoe: 'Instrucción JEC 6/2011, de 28 de abril',
    verdict: 'CONDICIONADO',
    summary: 'Los apoderados e interventores solo pueden portar una credencial o placa con el nombre de la formación política y el logotipo identificativo para su función. Está terminantemente prohibido portar camisetas con lemas de campaña, banderas o propaganda política.',
    detailedAnalysis: 'El presidente de la mesa electoral ostenta la máxima autoridad dentro del local para mantener el orden. El art. 91 de la LOREG estipula que los interventores y apoderados deben llevar la acreditación oficial emitida por la Junta Electoral Provincial o por el representante de la candidatura. La JEC ha reiterado que los distintivos deben ser discretos (tamaño tarjeta identificativa o pin con el nombre y siglas). El uso de camisetas con eslóganes electorales ("Vota X", "Por un futuro mejor"), pañuelos con consignas o la distribución activa de papeletas en el pasillo del colegio constituye infracción grave e incluso delito de coacción electoral si persiste.',
    practicalGuidelines: [
      'Los apoderados deben llevar su credencial colgada al cuello o prendida de la solapa.',
      'Queda terminantemente prohibido acercarse a la cabina de votación a indicar a un elector qué papeleta escoger.',
      'Tienen derecho a examinar las actas, formular protestas formales y reclamar que se adjunten al acta de la sesión electoral.'
    ],
    statuteReference: 'BOE núm. 102 de 29 de abril de 2011',
    dateOrResolution: 'Instrucción JEC 6/2011'
  },
  {
    id: 'limite-gastos-toledo',
    question: '¿Cómo se calcula el límite máximo legal de gastos electorales para una candidatura en la circunscripción de Toledo?',
    category: 'Financiación y Gastos',
    certaintyLevel: '100% Legal (Amparado expresamente por la LOREG)',
    primaryArticle: 'Art. 130 y 175 de la LOREG + Orden Ministerial de actualización por proceso',
    jecRulingOrBoe: 'Resolución de la Presidencia del Tribunal de Cuentas y Órdenes de fijación de importes',
    verdict: 'CONDICIONADO',
    summary: 'El límite de gasto electoral por candidatura resulta de multiplicar una cantidad fija por habitante censado en la provincia (aproximadamente 0,37 € por elector en Toledo) más la subvención por envío directo de propaganda electoral (mailing) justificada.',
    detailedAnalysis: 'La LOREG establece en su artículo 175 el tope máximo que ninguna candidatura puede rebasar bajo sanción de pérdida de subvenciones y responsabilidad penal del Administrador Electoral. Para la provincia de Toledo (aproximadamente 540.000 electores en el Censo Electoral de Residentes - CER), el límite ordinario se sitúa en torno a los 200.000 € para la campaña general provincial. Los gastos de envío directo y personal de sobres y papeletas (mailing) tienen una partida y justificación diferenciada fiscalizada por el Tribunal de Cuentas.',
    practicalGuidelines: [
      'Todas las facturas deben ir a nombre exclusivo de la cuenta bancaria electoral específica de la candidatura.',
      'El Administrador Electoral nombrado ante la Junta Electoral Provincial de Toledo es el único autorizado para ordenar pagos y firmar contratos de campaña.',
      'Las donaciones anónimas están rigurosamente prohibidas y conllevan delito de financiación ilegal.'
    ],
    statuteReference: 'LOREG Art. 130, 175 y L.O. 8/2007 de Financiación de Partidos Políticos',
    dateOrResolution: 'Circular Tribunal de Cuentas Elecciones Generales'
  }
];
