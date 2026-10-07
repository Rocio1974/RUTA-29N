export interface MunicipalityData {
  id: string;
  codeINE: string;
  name: string;
  comarca: 'La Sagra' | 'Talavera' | 'La Mancha Toledana' | 'Torrijos' | 'Montes de Toledo' | 'Campana de Oropesa' | 'Sierra de San Vicente' | 'Mesa de Ocaña' | 'La Jara';
  population: number;
  census: number;
  pollingStations: number;
  currentMayorParty: 'PP' | 'PSOE' | 'VOX' | 'Independiente' | 'Otro';
  electoralPriority: 'Prioridad 1 (Clave Escaño)' | 'Prioridad 2 (Consolidación)' | 'Prioridad 3 (Movilización Rural)';
  elections2023: {
    turnout: number; // percentage
    pp: number; // percentage
    psoe: number;
    vox: number;
    sumar: number;
    winner: 'PP' | 'PSOE' | 'VOX';
  };
  elections2019N: {
    turnout: number;
    pp: number;
    psoe: number;
    vox: number;
    cs: number;
    podemos: number;
    winner: 'PP' | 'PSOE' | 'VOX';
  };
  keyIssues: string[];
  economicSector: 'Industrial / Logístico' | 'Agrario / Olivar / Cereal' | 'Servicios / Residencial' | 'Artesanal / Cerámica' | 'Ganadero / Forestal';
  coordinates: [number, number]; // [lat, lng]
}

// Representative sample of the 204 municipalities of Toledo covering all 9 comarcas, from big hubs to rural villages
export const TOLEDO_MUNICIPALITIES: MunicipalityData[] = [
  {
    id: 'toledo-cap',
    codeINE: '45168',
    name: 'Toledo (Capital)',
    comarca: 'La Sagra',
    population: 86450,
    census: 64920,
    pollingStations: 108,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 76.4, pp: 39.8, psoe: 32.1, vox: 14.9, sumar: 11.2, winner: 'PP' },
    elections2019N: { turnout: 75.1, pp: 27.9, psoe: 31.4, vox: 19.8, cs: 9.3, podemos: 10.1, winner: 'PSOE' },
    keyIssues: ['Caudal ecológico y depuración del Río Tajo', 'Conexión AVE y tercer carril A-42', 'Suelo industrial Polígono y Vega Baja', 'Plan de Vivienda en el Casco Histórico'],
    economicSector: 'Servicios / Residencial',
    coordinates: [39.8628, -4.0273]
  },
  {
    id: 'talavera',
    codeINE: '45165',
    name: 'Talavera de la Reina',
    comarca: 'Talavera',
    population: 83247,
    census: 63890,
    pollingStations: 99,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 72.8, pp: 37.6, psoe: 34.2, vox: 16.8, sumar: 9.5, winner: 'PP' },
    elections2019N: { turnout: 71.4, pp: 26.2, psoe: 35.8, vox: 19.2, cs: 7.9, podemos: 9.4, winner: 'PSOE' },
    keyIssues: ['Soterramiento del AVE Madrid-Extremadura-Lisboa', 'Plataforma Logística Intermodal', 'Regadíos Canal Bajo del Alberche', 'Plan industrial Talavera Ferial'],
    economicSector: 'Artesanal / Cerámica',
    coordinates: [39.9635, -4.8308]
  },
  {
    id: 'illescas',
    codeINE: '45081',
    name: 'Illescas',
    comarca: 'La Sagra',
    population: 32296,
    census: 22810,
    pollingStations: 34,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 73.1, pp: 35.4, psoe: 36.8, vox: 17.2, sumar: 8.9, winner: 'PSOE' },
    elections2019N: { turnout: 72.5, pp: 22.4, psoe: 36.1, vox: 21.6, cs: 8.8, podemos: 9.5, winner: 'PSOE' },
    keyIssues: ['Extensión Cercanías Renfe C-5 / C-3', 'Presión demográfica y escolarización', 'Plataforma Central Iberum (Amazon/Airbus)', 'Ampliación juzgados y seguridad'],
    economicSector: 'Industrial / Logístico',
    coordinates: [40.1265, -3.8475]
  },
  {
    id: 'sesena',
    codeINE: '45161',
    name: 'Seseña',
    comarca: 'La Sagra',
    population: 29271,
    census: 19540,
    pollingStations: 28,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 70.8, pp: 36.1, psoe: 32.4, vox: 19.5, sumar: 10.2, winner: 'PP' },
    elections2019N: { turnout: 69.2, pp: 21.8, psoe: 33.5, vox: 23.4, cs: 9.7, podemos: 10.2, winner: 'PSOE' },
    keyIssues: ['Conexión directa A-4 y R-4 El Quiñón', 'Estación de Cercanías Seseña', 'Transporte escolar y sanitario hacia Toledo', 'Ocupación ilegal y seguridad'],
    economicSector: 'Servicios / Residencial',
    coordinates: [40.1044, -3.6983]
  },
  {
    id: 'torrijos',
    codeINE: '45173',
    name: 'Torrijos',
    comarca: 'Torrijos',
    population: 13809,
    census: 9780,
    pollingStations: 16,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 77.2, pp: 41.2, psoe: 33.8, vox: 16.1, sumar: 7.2, winner: 'PP' },
    elections2019N: { turnout: 76.0, pp: 28.5, psoe: 34.9, vox: 20.4, cs: 7.8, podemos: 7.1, winner: 'PSOE' },
    keyIssues: ['Comarca agroalimentaria y embutidos', 'Enlace A-40 Toledo-Torrijos', 'Centro de Especialidades Médicas', 'Fomento del comercio comarcal'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.9822, -4.2833]
  },
  {
    id: 'fuensalida',
    codeINE: '45066',
    name: 'Fuensalida',
    comarca: 'Torrijos',
    population: 12329,
    census: 8640,
    pollingStations: 14,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 75.9, pp: 43.1, psoe: 30.5, vox: 18.2, sumar: 6.8, winner: 'PP' },
    elections2019N: { turnout: 74.3, pp: 31.2, psoe: 32.1, vox: 22.4, cs: 6.9, podemos: 6.2, winner: 'PSOE' },
    keyIssues: ['Crisis y modernización de la industria del calzado', 'Polígono industrial La Mariola', 'Seguridad rural y polígonos', 'Relevo generacional empresarial'],
    economicSector: 'Industrial / Logístico',
    coordinates: [40.0578, -4.1997]
  },
  {
    id: 'sonseca',
    codeINE: '45163',
    name: 'Sonseca',
    comarca: 'Montes de Toledo',
    population: 11205,
    census: 8420,
    pollingStations: 13,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 78.4, pp: 38.4, psoe: 36.9, vox: 15.3, sumar: 7.8, winner: 'PP' },
    elections2019N: { turnout: 77.1, pp: 27.6, psoe: 37.8, vox: 19.1, cs: 7.4, podemos: 7.0, winner: 'PSOE' },
    keyIssues: ['Industria tradicional del mazapán y mueble', 'Conexión N-401 Toledo-Ciudad Real', 'Ayudas a autónomos artesanos', 'Residencia comarcal de mayores'],
    economicSector: 'Industrial / Logístico',
    coordinates: [39.6756, -3.9725]
  },
  {
    id: 'quintanar',
    codeINE: '45142',
    name: 'Quintanar de la Orden',
    comarca: 'La Mancha Toledana',
    population: 11119,
    census: 8190,
    pollingStations: 12,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 76.5, pp: 42.6, psoe: 33.1, vox: 17.5, sumar: 5.4, winner: 'PP' },
    elections2019N: { turnout: 74.8, pp: 31.9, psoe: 33.7, vox: 21.0, cs: 6.8, podemos: 5.5, winner: 'PSOE' },
    keyIssues: ['Sector vitivinícola y cooperativas del vino', 'Infraestructuras de regadío y pozos', 'Nudo de comunicación AP-36 / N-301', 'Seguridad en explotaciones agrícolas'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.5911, -3.0442]
  },
  {
    id: 'madridejos',
    codeINE: '45087',
    name: 'Madridejos',
    comarca: 'La Mancha Toledana',
    population: 10182,
    census: 7890,
    pollingStations: 12,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 77.0, pp: 41.8, psoe: 36.2, vox: 15.1, sumar: 5.8, winner: 'PP' },
    elections2019N: { turnout: 75.3, pp: 29.8, psoe: 38.1, vox: 18.9, cs: 6.5, podemos: 5.4, winner: 'PSOE' },
    keyIssues: ['Azafrán de La Mancha y aceite de oliva', 'Corredor Autovía A-4 Madrid-Andalucía', 'Modernización regadíos Acuífero 23', 'Servicios de geriatría comarcales'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.4678, -3.5303]
  },
  {
    id: 'consuegra',
    codeINE: '45053',
    name: 'Consuegra',
    comarca: 'La Mancha Toledana',
    population: 9884,
    census: 7550,
    pollingStations: 11,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 78.1, pp: 44.5, psoe: 34.0, vox: 14.8, sumar: 5.2, winner: 'PP' },
    elections2019N: { turnout: 76.2, pp: 33.1, psoe: 35.8, vox: 19.3, cs: 5.7, podemos: 4.8, winner: 'PSOE' },
    keyIssues: ['Turismo molinos y patrimonio histórico', 'Denominación de Origen Queso Manchego', 'CM-42 Autovía de los Viñedos', 'Garantía hídrica para el campo'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.4611, -3.6067]
  },
  {
    id: 'mora',
    codeINE: '45106',
    name: 'Mora',
    comarca: 'La Mancha Toledana',
    population: 9782,
    census: 7420,
    pollingStations: 11,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 77.8, pp: 45.2, psoe: 32.7, vox: 16.1, sumar: 4.8, winner: 'PP' },
    elections2019N: { turnout: 76.5, pp: 34.8, psoe: 34.2, vox: 19.5, cs: 5.8, podemos: 4.5, winner: 'PP' },
    keyIssues: ['Capital del aceite de oliva virgen extra (D.O. Montes de Toledo)', 'Costes energéticos de almazaras', 'Conexión por carretera con Toledo y A-4', 'Formación agraria juvenil'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.6844, -3.7744]
  },
  {
    id: 'villacanas',
    codeINE: '45198',
    name: 'Villacañas',
    comarca: 'La Mancha Toledana',
    population: 9418,
    census: 7120,
    pollingStations: 10,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 76.2, pp: 37.1, psoe: 42.3, vox: 14.2, sumar: 5.1, winner: 'PSOE' },
    elections2019N: { turnout: 74.9, pp: 25.4, psoe: 44.1, vox: 18.0, cs: 5.9, podemos: 5.4, winner: 'PSOE' },
    keyIssues: ['Reconversión de la industria de puertas de madera', 'Estación ferroviaria línea convencional Madrid-Alicante', 'Protección ambiental humedales Lagunas de Villacañas', 'Atracción de empresas sostenibles'],
    economicSector: 'Industrial / Logístico',
    coordinates: [39.6192, -3.3325]
  },
  {
    id: 'bargas',
    codeINE: '45019',
    name: 'Bargas',
    comarca: 'La Sagra',
    population: 10807,
    census: 7910,
    pollingStations: 11,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 76.9, pp: 39.5, psoe: 33.8, vox: 17.6, sumar: 7.9, winner: 'PP' },
    elections2019N: { turnout: 75.3, pp: 26.8, psoe: 35.1, vox: 22.1, cs: 7.8, podemos: 7.1, winner: 'PSOE' },
    keyIssues: ['Centro Comercial Puerta de Toledo y accesos A-42', 'Crecimiento de urbanizaciones y transporte metropolitano a Toledo', 'Seguridad ciudadana y cuartel Guardia Civil', 'Saneamiento red de aguas'],
    economicSector: 'Servicios / Residencial',
    coordinates: [39.9328, -4.0197]
  },
  {
    id: 'yuncos',
    codeINE: '45205',
    name: 'Yuncos',
    comarca: 'La Sagra',
    population: 11675,
    census: 7650,
    pollingStations: 11,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 71.9, pp: 34.2, psoe: 35.8, vox: 20.4, sumar: 8.3, winner: 'PSOE' },
    elections2019N: { turnout: 70.8, pp: 21.5, psoe: 35.2, vox: 25.1, cs: 8.9, podemos: 8.1, winner: 'PSOE' },
    keyIssues: ['Congestión A-42 eje Illescas-Yuncos', 'Logística y almacenes última milla', 'Integración vecinal y servicios sanitarios', 'Presión en centros de salud'],
    economicSector: 'Industrial / Logístico',
    coordinates: [40.0864, -3.8722]
  },
  {
    id: 'ocana',
    codeINE: '45121',
    name: 'Ocaña',
    comarca: 'Mesa de Ocaña',
    population: 13868,
    census: 8940,
    pollingStations: 13,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 1 (Clave Escaño)',
    elections2023: { turnout: 73.5, pp: 38.9, psoe: 32.4, vox: 20.8, sumar: 6.7, winner: 'PP' },
    elections2019N: { turnout: 72.1, pp: 27.1, psoe: 32.9, vox: 24.5, cs: 8.2, podemos: 6.2, winner: 'PSOE' },
    keyIssues: ['Nudo A-4 / A-40 / R-4 y plataforma logística', 'Centros penitenciarios Ocaña I y II (personal y seguridad)', 'Restauración del Conjunto Histórico y Plaza Mayor', 'Transporte regular con Madrid y Aranjuez'],
    economicSector: 'Industrial / Logístico',
    coordinates: [39.9575, -3.4989]
  },
  {
    id: 'olias-del-rey',
    codeINE: '45122',
    name: 'Olías del Rey',
    comarca: 'La Sagra',
    population: 8705,
    census: 6240,
    pollingStations: 8,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 77.5, pp: 39.1, psoe: 35.2, vox: 16.9, sumar: 7.6, winner: 'PP' },
    elections2019N: { turnout: 75.9, pp: 26.5, psoe: 34.8, vox: 21.2, cs: 8.7, podemos: 7.6, winner: 'PSOE' },
    keyIssues: ['Desarrollo logístico y comercial eje A-42', 'Cohesión entre pueblo y urbanizaciones (Los Olivos)', 'Rutas escolares y guarderías', 'Mejora de accesos viales'],
    economicSector: 'Servicios / Residencial',
    coordinates: [39.9431, -3.9878]
  },
  {
    id: 'arges',
    codeINE: '45016',
    name: 'Argés',
    comarca: 'Montes de Toledo',
    population: 6961,
    census: 5120,
    pollingStations: 7,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 80.2, pp: 46.8, psoe: 28.9, vox: 15.6, sumar: 7.5, winner: 'PP' },
    elections2019N: { turnout: 78.8, pp: 35.4, psoe: 28.5, vox: 21.1, cs: 7.9, podemos: 6.1, winner: 'PP' },
    keyIssues: ['Cercanía al parque Puy du Fou España y flujo turístico', 'Carretera de circunvalación con Toledo CM-4013', 'Ampliación de colegio público', 'Mantenimiento de zonas verdes'],
    economicSector: 'Servicios / Residencial',
    coordinates: [39.8058, -4.0544]
  },
  {
    id: 'los-yebenes',
    codeINE: '45200',
    name: 'Los Yébenes',
    comarca: 'Montes de Toledo',
    population: 5752,
    census: 4480,
    pollingStations: 6,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 81.3, pp: 44.1, psoe: 37.4, vox: 13.9, sumar: 3.8, winner: 'PP' },
    elections2019N: { turnout: 79.5, pp: 32.8, psoe: 39.2, vox: 17.5, cs: 5.2, podemos: 4.1, winner: 'PSOE' },
    keyIssues: ['Sector cinegético y carne de caza', 'Turismo de naturaleza Montes de Toledo y Cabañeros', 'Mantenimiento de cuartel de Guardia Civil', 'Conectividad banda ancha en pedanías'],
    economicSector: 'Ganadero / Forestal',
    coordinates: [39.5583, -3.8697]
  },
  {
    id: 'corral-de-almaguer',
    codeINE: '45054',
    name: 'Corral de Almaguer',
    comarca: 'La Mancha Toledana',
    population: 5218,
    census: 3980,
    pollingStations: 5,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 79.0, pp: 47.3, psoe: 31.2, vox: 16.5, sumar: 3.9, winner: 'PP' },
    elections2019N: { turnout: 77.4, pp: 37.5, psoe: 31.9, vox: 20.8, cs: 5.1, podemos: 3.7, winner: 'PP' },
    keyIssues: ['Agricultura de regadío y pozos del Riánsares', 'Industria quesera y bodeguera', 'Plan de caminos rurales', 'Médico de guardia 24 horas'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.7583, -3.1667]
  },
  {
    id: 'puebla-de-montalban',
    codeINE: '45137',
    name: 'La Puebla de Montalbán',
    comarca: 'Torrijos',
    population: 7839,
    census: 5690,
    pollingStations: 8,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 76.8, pp: 42.9, psoe: 34.6, vox: 15.8, sumar: 5.4, winner: 'PP' },
    elections2019N: { turnout: 75.1, pp: 30.2, psoe: 36.5, vox: 20.3, cs: 6.4, podemos: 5.5, winner: 'PSOE' },
    keyIssues: ['Producción de melocotón y frutales de regadío', 'Festival Celestina y patrimonio histórico', 'Conexión vial con Toledo y Talavera', 'Regulación de precios de origen agrícola'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.8667, -4.3667]
  },
  {
    id: 'oropesa',
    codeINE: '45125',
    name: 'Oropesa',
    comarca: 'Campana de Oropesa',
    population: 2607,
    census: 2130,
    pollingStations: 4,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 78.5, pp: 41.5, psoe: 38.9, vox: 14.1, sumar: 4.5, winner: 'PP' },
    elections2019N: { turnout: 77.2, pp: 32.1, psoe: 41.8, vox: 16.4, cs: 4.8, podemos: 4.2, winner: 'PSOE' },
    keyIssues: ['Parador de Turismo y patrimonio monumental', 'Cabecera de comarca sanitaria y educativa', 'Acceso autovía A-5 y parada de autobuses Madrid-Lisboa', 'Freno a la despoblación en comarca de Oropesa'],
    economicSector: 'Ganadero / Forestal',
    coordinates: [39.9194, -5.1744]
  },
  {
    id: 'navahermosa',
    codeINE: '45109',
    name: 'Navahermosa',
    comarca: 'Montes de Toledo',
    population: 3586,
    census: 2790,
    pollingStations: 4,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 80.9, pp: 45.4, psoe: 35.8, vox: 14.2, sumar: 3.5, winner: 'PP' },
    elections2019N: { turnout: 79.1, pp: 34.6, psoe: 37.9, vox: 18.2, cs: 5.0, podemos: 3.5, winner: 'PSOE' },
    keyIssues: ['Explotaciones de corcho, madera y apicultura', 'Acceso al Parque Nacional de Cabañeros', 'Mantenimiento de escuela rural y transporte a Toledo', 'Telefonía móvil en pedanía de Hontanar'],
    economicSector: 'Ganadero / Forestal',
    coordinates: [39.6361, -4.4819]
  },
  {
    id: 'escalona',
    codeINE: '45063',
    name: 'Escalona',
    comarca: 'Torrijos',
    population: 3573,
    census: 2740,
    pollingStations: 4,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 75.3, pp: 33.2, psoe: 47.9, vox: 13.5, sumar: 4.4, winner: 'PSOE' },
    elections2019N: { turnout: 73.9, pp: 23.4, psoe: 50.1, vox: 16.8, cs: 4.9, podemos: 4.2, winner: 'PSOE' },
    keyIssues: ['Castillo de Escalona y río Alberche', 'Abastecimiento de agua en verano a urbanizaciones', 'Seguridad en segundas residencias', 'Empleo en servicios locales'],
    economicSector: 'Servicios / Residencial',
    coordinates: [40.1667, -4.4000]
  },
  {
    id: 'mentrida',
    codeINE: '45099',
    name: 'Méntrida',
    comarca: 'Torrijos',
    population: 5722,
    census: 4180,
    pollingStations: 5,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 2 (Consolidación)',
    elections2023: { turnout: 74.6, pp: 40.5, psoe: 33.1, vox: 18.7, sumar: 6.5, winner: 'PP' },
    elections2019N: { turnout: 73.0, pp: 27.8, psoe: 34.2, vox: 23.5, cs: 7.6, podemos: 6.2, winner: 'PSOE' },
    keyIssues: ['Denominación de Origen Méntrida (Vino)', 'Frontera con Comunidad de Madrid (convenio sanitario y transportes)', 'Presión demográfica urbanizaciones', 'Banda ancha y telecomunicaciones'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [40.2378, -4.1956]
  },
  {
    id: 'cebolla',
    codeINE: '45046',
    name: 'Cebolla',
    comarca: 'Torrijos',
    population: 3201,
    census: 2450,
    pollingStations: 4,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 77.4, pp: 38.6, psoe: 41.2, vox: 15.0, sumar: 4.2, winner: 'PSOE' },
    elections2019N: { turnout: 76.1, pp: 28.1, psoe: 43.5, vox: 18.4, cs: 5.1, podemos: 4.1, winner: 'PSOE' },
    keyIssues: ['Obras de encauzamiento del arroyo Sangüesa (inundaciones históricas)', 'Agricultura de regadío del Tajo', 'Mantenimiento del consultorio médico', 'Caminos rurales y motas'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.9500, -4.5667]
  },
  {
    id: 'calera-y-chozas',
    codeINE: '45028',
    name: 'Calera y Chozas',
    comarca: 'Talavera',
    population: 4716,
    census: 3620,
    pollingStations: 5,
    currentMayorParty: 'PP',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 76.3, pp: 44.8, psoe: 34.9, vox: 14.5, sumar: 4.8, winner: 'PP' },
    elections2019N: { turnout: 74.8, pp: 32.5, psoe: 38.1, vox: 18.9, cs: 5.5, podemos: 4.2, winner: 'PSOE' },
    keyIssues: ['Vía Verde de la Jara y cicloturismo', 'Regadíos del Canal Bajo del Alberche', 'Conexión rápida por N-502 con Talavera', 'Ganadería vacuna y porcina'],
    economicSector: 'Agrario / Olivar / Cereal',
    coordinates: [39.8833, -4.9833]
  },
  {
    id: 'navalcancan',
    codeINE: '45110',
    name: 'Navalcán',
    comarca: 'Sierra de San Vicente',
    population: 1888,
    census: 1520,
    pollingStations: 2,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 79.2, pp: 39.4, psoe: 42.1, vox: 13.8, sumar: 3.7, winner: 'PSOE' },
    elections2019N: { turnout: 78.0, pp: 29.8, psoe: 46.2, vox: 16.5, cs: 3.9, podemos: 3.1, winner: 'PSOE' },
    keyIssues: ['Bordado tradicional de Navalcán (BIC)', 'Embalse de Navalcán y pesca deportiva', 'Retención de jóvenes y vivienda rural', 'Servicios asistenciales a mayores'],
    economicSector: 'Ganadero / Forestal',
    coordinates: [40.1000, -5.1000]
  },
  {
    id: 'alcaudete-de-la-jara',
    codeINE: '45006',
    name: 'Alcaudete de la Jara',
    comarca: 'La Jara',
    population: 1614,
    census: 1340,
    pollingStations: 2,
    currentMayorParty: 'PSOE',
    electoralPriority: 'Prioridad 3 (Movilización Rural)',
    elections2023: { turnout: 77.8, pp: 37.8, psoe: 44.2, vox: 13.5, sumar: 3.5, winner: 'PSOE' },
    elections2019N: { turnout: 76.5, pp: 28.2, psoe: 47.9, vox: 16.1, cs: 4.1, podemos: 3.0, winner: 'PSOE' },
    keyIssues: ['Comarca de La Jara: lucha activa contra la despoblación', 'Carretera N-502 corredor Talavera-Córdoba', 'Ayudas a ganadería extensiva y dehesas', 'Transporte a demanda y farmacia rural'],
    economicSector: 'Ganadero / Forestal',
    coordinates: [39.7833, -4.8667]
  }
];

// Comarcas summary with demographics and electoral weights
export const COMARCAS_TOLEDO = [
  { name: 'La Sagra', municipalitiesCount: 31, population: 215400, weightPercentage: 30.5, profile: 'Industrial, logística hiperactiva, proximidad Madrid, voto oscilante decisivo' },
  { name: 'Talavera', municipalitiesCount: 16, population: 104200, weightPercentage: 14.8, profile: 'Urbano comarcal, artesanía, agroalimentario, alta exigencia de infraestructuras AVE/A-5' },
  { name: 'La Mancha Toledana', municipalitiesCount: 20, population: 98600, weightPercentage: 14.0, profile: 'Vitivinícola, cooperativismo agrario, Acuífero 23, tradición electoral conservadora/moderada' },
  { name: 'Torrijos', municipalitiesCount: 32, population: 93800, weightPercentage: 13.3, profile: 'Industria del calzado, agroalimentaria, huerta del Tajo, enlace A-40 Toledo-Ávila' },
  { name: 'Montes de Toledo', municipalitiesCount: 18, population: 68900, weightPercentage: 9.8, profile: 'Caza mayor, aceite de oliva virgen extra Montes de Toledo, turismo Cabañeros, rural' },
  { name: 'Mesa de Ocaña', municipalitiesCount: 14, population: 43200, weightPercentage: 6.1, profile: 'Nudo A-4/A-40, logística pesada, cerealista, patrimonio histórico' },
  { name: 'Campana de Oropesa', municipalitiesCount: 18, population: 19800, weightPercentage: 2.8, profile: 'Frontera con Extremadura, dehesas, ganadería de vacuno, turismo de castillos' },
  { name: 'Sierra de San Vicente', municipalitiesCount: 21, population: 17400, weightPercentage: 2.5, profile: 'Montaña, castañares, ganadería extensiva, micro-municipios con alta necesidad de servicios' },
  { name: 'La Jara', municipalitiesCount: 22, population: 13200, weightPercentage: 1.9, profile: 'Dehesas, caza, miel, reto demográfico extremo, transporte sanitario y fibra óptica' }
];

export const TOTAL_TOLEDO_SUMMARY = {
  totalMunicipalities: 204,
  totalPopulation: 713498,
  totalCensus2023: 541285,
  totalCongressSeats: 6,
  totalSenateSeatsInElection: 4,
  dhondtThreshold: 0.03, // 3% legal minimum threshold per LOREG Art. 163.1.a
  electoralHistoryCongress: [
    { year: '2023 (23-J)', seats: { PP: 3, PSOE: 2, VOX: 1, Sumar: 0 }, votes: { PP: 153782, PSOE: 129486, VOX: 74218, Sumar: 32904 }, turnout: 75.3 },
    { year: '2019-N (10-N)', seats: { PSOE: 2, PP: 2, VOX: 2, CS: 0, UP: 0 }, votes: { PSOE: 116282, PP: 101890, VOX: 88477, CS: 26084, UP: 27958 }, turnout: 72.8 },
    { year: '2019-A (28-A)', seats: { PSOE: 2, PP: 2, CS: 1, VOX: 1 }, votes: { PSOE: 124806, PP: 83261, CS: 67123, VOX: 63345, UP: 37311 }, turnout: 77.8 },
    { year: '2016 (26-J)', seats: { PP: 3, PSOE: 2, UP: 1, CS: 0 }, votes: { PP: 148562, PSOE: 88720, UP: 52602, CS: 45780 }, turnout: 73.6 },
    { year: '2015 (20-D)', seats: { PP: 3, PSOE: 2, CS: 1, Podemos: 0 }, votes: { PP: 145393, PSOE: 104934, CS: 51368, Podemos: 49454 }, turnout: 76.1 }
  ]
};
