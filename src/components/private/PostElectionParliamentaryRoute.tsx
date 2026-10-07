import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  Landmark, 
  MapPin, 
  Calendar, 
  Briefcase,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ParliamentaryStep {
  stepNumber: number;
  title: string;
  location: string;
  deadline: string;
  description: string;
  criticalAction: string;
}

const POST_ELECTION_STEPS: ParliamentaryStep[] = [
  {
    stepNumber: 1,
    title: 'Recogida de Credencial Oficial de Electo',
    location: 'Junta Electoral Provincial de Toledo (Palacio de Justicia)',
    deadline: 'D+5 a D+8 días tras la votación',
    description: 'Finalizado el escrutinio general y resueltas las posibles reclamaciones de votos nulos, la JEP proclama oficialmente a los 6 diputados y 4 senadores electos y expide sus credenciales individuales firmadas por el Presidente de la Junta.',
    criticalAction: 'Personarse con DNI original o autorizar fehacientemente al representante legal de la candidatura.'
  },
  {
    stepNumber: 2,
    title: 'Acreditación y Presentación en las Cortes Generales',
    location: 'Palacio de las Cortes (Congreso) o Plaza de la Marina Española (Senado)',
    deadline: 'Dentro de los 25 días siguientes a las elecciones',
    description: 'Los parlamentarios presentan su credencial, cumplimentan las fichas de datos personales, fotografía oficial, facilitan los datos bancarios para asignaciones y recogen el maletín de trabajo parlamentario (dispositivo seguro y firma digital de las Cortes).',
    criticalAction: 'Apertura de expediente personal y entrega de firma digital parlamentaria.'
  },
  {
    stepNumber: 3,
    title: 'Declaraciones de Bienes, Actividades e Incompatibilidades',
    location: 'Registro de Intereses del Congreso y del Senado',
    deadline: 'Previo a la sesión constitutiva',
    description: 'Cumplimentación obligatoria y pública de la Declaración de Actividades y la Declaración de Bienes Patrimoniales (inmuebles, cuentas, acciones, deudas de préstamos e IRPF del ejercicio anterior).',
    criticalAction: 'Transparencia absoluta para evitar causas sobrevenidas de incompatibilidad (Art. 159 LOREG).'
  },
  {
    stepNumber: 4,
    title: 'Sesión Constitutiva y Juramento o Promesa de Acatamiento',
    location: 'Hemiciclo del Congreso / Salón de Sesiones del Senado',
    deadline: 'Día fijado en el Real Decreto de Convocatoria',
    description: 'Presidencia de la Mesa de Edad, votación secreta en urna del Presidente de la Cámara y de los cuatro vicepresidentes y cuatro secretarios. Llamamiento nominal de cada parlamentario para prestar juramento o promesa de la Constitución.',
    criticalAction: 'Adquisición de la condición plena de Diputado o Senador de las Cortes Generales.'
  },
  {
    stepNumber: 5,
    title: 'Adscripción a Comisiones Estratégicas para Toledo',
    location: 'Grupos Parlamentarios del Congreso y Senado',
    deadline: 'Primer mes de legislatura',
    description: 'Los parlamentarios de Toledo deben solicitar adscripción prioritaria a las comisiones con impacto directo sobre la provincia: Transportes (AVE y A-42), Transición Ecológica (Agua y Río Tajo), Agricultura (PAC) e Interior (cuarteles).',
    criticalAction: 'Garantizar portavocías adjuntas o vocalías en materias territoriales toledanas.'
  },
  {
    stepNumber: 6,
    title: 'Registro de la Primera PNL para la Provincia de Toledo',
    location: 'Registro General de la Cámara',
    deadline: 'Primeros 100 días de mandato',
    description: 'Redacción y registro de una Proposición No de Ley con el compromiso electoral número uno: soterramiento del AVE en Talavera o plan de choque para el corredor de La Sagra.',
    criticalAction: 'Rueda de prensa en Toledo dando cuenta del primer compromiso electoral cumplido en sede parlamentaria.'
  }
];

export const PostElectionParliamentaryRoute: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Ruta Parlamentaria Postlectoral • Del 30N al Congreso y Senado
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Hoja de Ruta del Diputado y Senador Electo por Toledo
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Protocolo reglamentario paso a paso desde la obtención del escaño hasta la sesión constitutiva, declaraciones de bienes y registro de las primeras iniciativas por Toledo.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-right">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Estatus de Mandato</span>
          <span className="text-xs font-bold text-emerald-400 font-mono">XV / XVI Legislatura</span>
        </div>
      </div>

      {/* Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POST_ELECTION_STEPS.map((step) => (
          <div
            key={step.stepNumber}
            className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold font-mono flex items-center justify-center text-sm">
                  #{step.stepNumber}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {step.deadline}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5 font-serif">{step.title}</h3>
              <span className="text-xs font-mono text-amber-300 block mb-2">{step.location}</span>

              <p className="text-xs text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-amber-200/90 flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Acción Clave:</strong> {step.criticalAction}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested First Parliamentary Initiatives for Toledo */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          Paquete de Primeras Iniciativas Prioritarias a Registrar en el Congreso:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold uppercase font-mono block">PNL Prioridad 1</span>
            <h4 className="font-bold text-white">Soterramiento del AVE en Talavera de la Reina</h4>
            <p className="text-slate-400">
              Instar al Ministerio de Transportes a licitar el estudio constructivo soterrado y blindar partidas plurianuales en los PGE.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold uppercase font-mono block">Pregunta Escrita con Respuesta</span>
            <h4 className="font-bold text-white">Extensión de la C-5 a Illescas y Tercer Carril A-42</h4>
            <p className="text-slate-400">
              Exigir el cronograma detallado de ejecución de la electrificación entre Humanes e Illescas y solución al colapso de La Sagra.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold uppercase font-mono block">Moción en Senado</span>
            <h4 className="font-bold text-white">Cumplimiento de Caudales Ecológicos del Tajo</h4>
            <p className="text-slate-400">
              Exigir la aplicación rigurosa de las sentencias del Tribunal Supremo sobre caudales mínimos a su paso por Toledo y Talavera.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
