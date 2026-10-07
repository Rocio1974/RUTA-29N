export interface PartyArgument {
  id: string;
  party: 'PP' | 'PSOE' | 'VOX' | 'Sumar';
  date: string;
  headline: string;
  keyTalkingPoints: string[];
  targetAudience: string;
  vulnerabilityFlank: string;
  suggestedCounterMeasure: {
    factualData: string;
    winningHeadline: string;
    soundbite30Seconds: string;
    verifiedSource: string;
  };
}

export const DAILY_ARGUMENTARIOS_MONITOR: PartyArgument[] = [
  {
    id: 'arg-psoe-empleo-pensiones',
    party: 'PSOE',
    date: '2026-10-06',
    headline: 'Toledo bate récord de afiliación a la Seguridad Social y blindaje de las pensiones frente al modelo de recortes',
    keyTalkingPoints: [
      'Subida del SMI a más de 1.134 € beneficia a más de 42.000 trabajadores toledanos.',
      'Revalorización de pensiones conforme al IPC real para los 140.000 pensionistas de la provincia.',
      'La Sagra se consolida como el motor logístico del centro de España gracias a la estabilidad económica del Gobierno.'
    ],
    targetAudience: 'Pensionistas, trabajadores por cuenta ajena, clase media comarcal',
    vulnerabilityFlank: 'Pérdida de poder adquisitivo por inflación acumulada en cesta de la compra básica e hipotecas, nula inversión real en Cercanías a Illescas y retraso reiterado en el soterramiento del AVE en Talavera.',
    suggestedCounterMeasure: {
      factualData: 'La cesta de la compra en la provincia de Toledo ha subido un 31,4% acumulado desde 2019 según el INE, y el 73% de las partidas de los Presupuestos Generales del Estado consignadas para ferrocarriles en la provincia quedaron sin ejecutar en 2024 y 2025.',
      winningHeadline: 'Toledo paga más impuestos que nunca mientras los trenes no llegan y la compra asfixia a nuestras familias.',
      soundbite30Seconds: 'Es muy fácil presumir de cifras macroeconómicas desde despachos oficiales, pero la realidad en los supermercados de Talavera o de Torrijos es que llenar el carro cuesta un 30% más. En Toledo nos prometieron cercanías y soterramiento del AVE, y lo único que nos ha llegado han sido más peajes e impuestos. Nuestra candidatura viene a exigir que cada euro que pagan los toledanos se quede en infraestructuras y alivio fiscal real.',
      verifiedSource: 'INE IPC Provincial de Toledo 2019-2026 e Intervención General de la Administración del Estado (IGAE)'
    }
  },
  {
    id: 'arg-pp-bajadas-impuestos-tajo',
    party: 'PP',
    date: '2026-10-05',
    headline: 'Toledo necesita un cambio urgente: plan de choque fiscal a clases medias y defensa sin complejos del agua y del campo',
    keyTalkingPoints: [
      'Deflactación del IRPF provincial y bonificación al 99% de Sucesiones y Donaciones entre padres e hijos.',
      'Pacto de Estado del Agua que garantice las necesidades de la cuenca cedente del Tajo y acabe con los agravios.',
      'Tolerancia cero con la ocupación ilegal de viviendas en municipios como Seseña, Escalona y Méntrida.'
    ],
    targetAudience: 'Familias de clase media, autónomos, agricultores y propietarios de vivienda',
    vulnerabilityFlank: 'Voto dividido en el bloque de centro-derecha con VOX en zonas rurales y riesgo de perder el tercer o cuarto escaño provincial si se dispersa el sufragio en municipios medianos.',
    suggestedCounterMeasure: {
      factualData: 'En la circunscripción de Toledo, la aplicación estricta de la Ley D\'Hondt hace que el último escaño del Congreso se decida por menos de 4.200 votos entre los bloques.',
      winningHeadline: 'Cada voto dividido es un escaño directo que se regala al rival: concentrar la fuerza es garantizar la victoria.',
      soundbite30Seconds: 'La Ley D\'Hondt en Toledo es implacable: se reparten únicamente 6 escaños. Las matemáticas electorales demuestran que la fragmentación en Toledo dejó a miles de votantes sin representación en 2019. Solo una candidatura amplia, solvente y centrada en resolver los problemas de los toledanos garantiza el cambio efectivo en el Congreso y la mayoría en el Senado.',
      verifiedSource: 'Simulación matemática Ley D\'Hondt Elecciones Generales 2019 y 2023 Junta Electoral Provincial de Toledo'
    }
  },
  {
    id: 'arg-vox-seguridad-campo-pac',
    party: 'VOX',
    date: '2026-10-04',
    headline: 'Ni un paso atrás frente a la Agenda 2030 que arruina el campo toledano y frente a la inseguridad en nuestros barrios',
    keyTalkingPoints: [
      'Derogación total de las exigencias medioambientales de la PAC que asfixian al olivar y al cereal en La Mancha.',
      'Endurecimiento penal contra la reincidencia delictiva y expulsión de delincuentes extranjeros en La Sagra.',
      'Protección de la familia tradicional y eliminación de chiringuitos ideológicos.'
    ],
    targetAudience: 'Agricultores tradicionales, cazadores, jóvenes descontentos en periferia de Madrid/Toledo',
    vulnerabilityFlank: 'Ausencia de propuestas técnicas de gestión presupuestaria viable, voto útil hacia el partido mayoritario de centro-derecha para amarrar la victoria parlamentaria.',
    suggestedCounterMeasure: {
      factualData: 'El 82% de las ayudas directas de la PAC a agricultores toledanos proceden de fondos comunitarios que exigen cumplimiento de normativas de comercialización de la UE para poder exportar a mercados comunitarios.',
      winningHeadline: 'Frente a los discursos que aíslan a nuestro campo, nosotros ofrecemos gestión eficaz, bajada de costes y peso real en Bruselas y Madrid.',
      soundbite30Seconds: 'Nuestros agricultores de Mora, Madridejos y Consuegra no necesitan consignas para desahogarse; necesitan menos burocracia, gasóleo agrícola bonificado, agua garantizada y un Gobierno fuerte que negocie de tú a tú en Bruselas. No podemos condenar a nuestros productores al aislamiento. Con nosotros, el campo toledano tendrá una voz con capacidad de gobernar y transformar leyes.',
      verifiedSource: 'Ministerio de Agricultura, Pesca y Alimentación (FEGA - Fondos Europeos en Toledo)'
    }
  },
  {
    id: 'arg-sumar-vivienda-servicios',
    party: 'Sumar',
    date: '2026-10-03',
    headline: 'Toledo para vivir: regulación de alquileres en La Sagra, transporte público gratuito y blindaje de la sanidad pública',
    keyTalkingPoints: [
      'Declaración de zonas de mercado residencial tensionado en Illescas, Seseña y Toledo capital.',
      'Contratación masiva de médicos de atención primaria para acabar con las listas de espera en el Hospital Universitario de Toledo.',
      'Freno inmediato a los macroproyectos de logística desregulada que precarizan a los jóvenes.'
    ],
    targetAudience: 'Estudiantes, jóvenes con dificultad para emanciparse, trabajadores de plataformas logísticas',
    vulnerabilityFlank: 'Riesgo altísimo de quedar fuera del Congreso en Toledo al no alcanzar la barrera efectiva de votos (necesita más de 45.000 votos para optar a 1 escaño en Toledo, lo que en 2023 derivó en 0 diputados y votos perdidos para la izquierda).',
    suggestedCounterMeasure: {
      factualData: 'En 2023 Sumar obtuvo 32.904 votos en Toledo y 0 diputados (se quedó a más de 18.000 votos de obtener representación). Esos votos no computaron para ningún escaño.',
      winningHeadline: 'El voto testimonial no frena nada: en Toledo solo los proyectos transversales con arraigo territorial logran frenar el retroceso.',
      soundbite30Seconds: 'Respetamos profundamente a los votantes progresistas, pero la realidad de la provincia de Toledo es que 33.000 papeletas quedaron sin un solo diputado en el Congreso. La única manera de garantizar servicios públicos dignos, defender el Hospital de Toledo y proteger a nuestros jóvenes es unir el voto útil en la candidatura mayoritaria que sí tiene garantizados los escaños.',
      verifiedSource: 'Resultados oficiales BOE Elecciones Generales 23-J Toledo'
    }
  }
];
