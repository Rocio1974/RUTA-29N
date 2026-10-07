import React from 'react';
import { Calendar, CheckCircle2, AlertCircle, Clock, FileText, ChevronRight } from 'lucide-react';

interface CalendarStep {
  dayMarker: string;
  title: string;
  loregArticle: string;
  description: string;
  mandatoryRequirement: string;
}

const ELECTORAL_STEPS: CalendarStep[] = [
  {
    dayMarker: 'Día D - 54',
    title: 'Disolución de las Cortes y Real Decreto de Convocatoria',
    loregArticle: 'Art. 42 LOREG y Art. 115 Constitución Española',
    description: 'El Presidente del Gobierno acuerda la disolución anticipada o expiración de mandato. El Real Decreto fija la fecha exacta de las elecciones (54 días naturales tras la publicación).',
    mandatoryRequirement: 'Entrada en vigor inmediata de la prohibición de actos institucionales de inauguración y propaganda de logros (Art. 50 LOREG).'
  },
  {
    dayMarker: 'Día D + 2',
    title: 'Nombramiento de Representantes Generales y de Candidatura',
    loregArticle: 'Art. 43 LOREG',
    description: 'Los partidos y federaciones nombran a sus representantes ante la Junta Electoral Central y designan a los representantes de candidatura ante la Junta Electoral Provincial de Toledo.',
    mandatoryRequirement: 'Fijación de domicilio para notificaciones formales fehacientes.'
  },
  {
    dayMarker: 'Día D + 10',
    title: 'Constitución y Registro de Coaliciones Electorales',
    loregArticle: 'Art. 44.2 LOREG',
    description: 'Plazo improrrogable para que los partidos que deseen concurrir juntos en coalición formalicen su pacto ante la Junta Electoral Central.',
    mandatoryRequirement: 'Aportar estatutos de la coalición, normas de funcionamiento interno y denominación exacta.'
  },
  {
    dayMarker: 'Días D + 15 a D + 20',
    title: 'Presentación de Listas de Candidatos (Congreso y Senado)',
    loregArticle: 'Art. 45 y 46 LOREG',
    description: 'Las candidaturas se presentan ante la Junta Electoral Provincial de Toledo (Palacio de Justicia). Se exigen 6 titulares y 3 suplentes para el Congreso, y hasta 3 candidatos con 2 suplentes cada uno para el Senado.',
    mandatoryRequirement: 'Cumplimiento estricto de la composición paritaria equilibrada (mínimo 40% de cada sexo por tramos).'
  },
  {
    dayMarker: 'Día D + 27',
    title: 'Proclamación Oficial y Definitiva de Candidaturas',
    loregArticle: 'Art. 47 LOREG',
    description: 'La Junta Electoral Provincial de Toledo subsana defectos y proclama formalmente a los candidatos que cumplen todos los requisitos de elegibilidad.',
    mandatoryRequirement: 'Publicación oficial en el Boletín Oficial del Estado (BOE).'
  },
  {
    dayMarker: 'Día D + 38 a D + 52',
    title: 'Campaña Electoral Oficial (15 Días Improrrogables)',
    loregArticle: 'Art. 51 LOREG',
    description: 'Comienza a las 00:00 horas del viernes anterior al domingo de votación por quince días. Es el único periodo legal donde se permite la petición expresa de sufragio y la publicidad exterior contratada.',
    mandatoryRequirement: 'Cese absoluto de emisión de publicidad y encuestas en los 5 días previos a la votación (Art. 69 LOREG).'
  },
  {
    dayMarker: 'Día D + 53',
    title: 'Jornada de Reflexión',
    loregArticle: 'Art. 53 LOREG',
    description: 'Las 24 horas previas al domingo de votación. Prohibición tajante de cualquier acto de propaganda electoral, mítines o petición de voto.',
    mandatoryRequirement: 'Infracción grave e incluso delito electoral sancionado por los tribunales si se vulnera.'
  },
  {
    dayMarker: 'Día D + 54',
    title: 'Jornada de Votación (29N)',
    loregArticle: 'Art. 80 a 95 LOREG',
    description: 'Apertura de colegios a las 09:00 h y cierre a las 20:00 h en los 204 municipios de Toledo. Constitución de mesas, intervención de apoderados y escrutinio en cada mesa electoral al finalizar.',
    mandatoryRequirement: 'Firma de actas oficiales de sesión y entrega de sobres precintados en el Juzgado de Paz o de Instrucción.'
  },
  {
    dayMarker: 'Día D + 59',
    title: 'Escrutinio General por la Junta Electoral Provincial',
    loregArticle: 'Art. 103 LOREG',
    description: 'Cinco días después de las elecciones, la Junta Electoral Provincial de Toledo efectúa el escrutinio general definitivo con apertura de los votos de los residentes ausentes en el extranjero (CERA).',
    mandatoryRequirement: 'Resolución de reclamaciones, proclamación de los 6 diputados y 4 senadores electos y expedición de credenciales.'
  }
];

export const ElectoralCalendarGuide: React.FC = () => {
  return (
    <section className="py-14 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold uppercase mb-2">
            <Calendar className="w-3.5 h-3.5" /> Cronograma Legal Vinculante
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
            Calendario Oficial del Proceso Electoral conforme a la LOREG
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Plazos improrrogables fijados por la Ley Orgánica 5/1985 desde el Real Decreto de disolución hasta la constitución de las nuevas Cortes Generales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ELECTORAL_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {step.dayMarker}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{step.loregArticle}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-serif">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{step.description}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-amber-200/90 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{step.mandatoryRequirement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
