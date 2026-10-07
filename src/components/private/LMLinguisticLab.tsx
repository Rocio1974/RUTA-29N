import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Timer, 
  Mic, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  FileText, 
  Send,
  UserCheck,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { COMARCAS_TOLEDO } from '../../data/toledoMunicipalities';

export const LMLinguisticLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discursos' | 'treinta-segundos' | 'simulador'>('discursos');

  // Discursos State
  const [speechFormat, setSpeechFormat] = useState('Mitin multitudinario en plaza');
  const [speechTopic, setSpeechTopic] = useState('Agua, Río Tajo y agricultura en Toledo');
  const [speechTone, setSpeechTone] = useState('Combativo y cercano');
  const [speechComarca, setSpeechComarca] = useState('Talavera y La Sagra');
  const [speechKeyMessage, setSpeechKeyMessage] = useState('Exigir el soterramiento del AVE en Talavera y la gratuidad del transporte en La Sagra');
  const [speechLoading, setSpeechLoading] = useState(false);
  const [generatedSpeech, setGeneratedSpeech] = useState<string | null>(null);
  const [copiedSpeech, setCopiedSpeech] = useState(false);

  // 30 Seconds Trainer State
  const [trapQuestion, setTrapQuestion] = useState('¿No cree que prometer el soterramiento del AVE en Talavera es engañar a los ciudadanos cuando el Ministerio dice que no hay fondos?');
  const [trainerRole, setTrainerRole] = useState('Candidato nº 1 al Congreso de los Diputados');
  const [trainerLoading, setTrainerLoading] = useState(false);
  const [trainerData, setTrainerData] = useState<any | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);

  // Simulador / Repregúntame State
  const [interviewerStyle, setInterviewerStyle] = useState('hostil');
  const [interviewQuestion, setInterviewQuestion] = useState('Ustedes prometen bajar el IRPF en Toledo pero a la vez piden más millones para el Hospital y para trenes. ¿De dónde van a recortar?');
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [simLoading, setSimLoading] = useState(false);
  const [simFeedback, setSimFeedback] = useState<any | null>(null);

  // Timer logic for 30 seconds
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleGenerateSpeech = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpeechLoading(true);
    try {
      const res = await fetch('/api/gemini/speech-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format: speechFormat,
          topic: speechTopic,
          tone: speechTone,
          targetLocation: speechComarca,
          keyMessage: speechKeyMessage,
          candidateRole: 'Candidatura RUTA 29N Toledo',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedSpeech(data.text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSpeechLoading(false);
    }
  };

  const handleTrain30s = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrainerLoading(true);
    setTimerSeconds(30);
    setTimerRunning(false);
    try {
      const res = await fetch('/api/gemini/quick-response-trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionOrTrap: trapQuestion,
          candidateRole: trainerRole,
          topic: 'Infraestructuras y Presupuestos de Toledo',
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setTrainerData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTrainerLoading(false);
    }
  };

  const handleSimulateInterview = async (isFollowUp = false) => {
    if (!candidateAnswer.trim()) return;
    setSimLoading(true);
    try {
      const res = await fetch('/api/gemini/interview-simulator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewerStyle,
          question: interviewQuestion,
          userAnswer: candidateAnswer,
          isFollowUp,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSimFeedback(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSimLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Laboratorio Lingüístico y Discursivo (LM Político)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Generador de piezas orales y escritas, entrenador de respuestas rápidas y simulador de entrevistas con repreguntas.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('discursos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'discursos'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Generador de Discursos
          </button>
          <button
            onClick={() => setActiveTab('treinta-segundos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'treinta-segundos'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" /> Respuesta en 30s
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'simulador'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" /> Simulador "Repregúntame"
          </button>
        </div>
      </div>

      {/* TAB 1: GENERADOR DE DISCURSOS */}
      {activeTab === 'discursos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono mb-2">
              Configuración de la Pieza Discursiva
            </h3>

            <form onSubmit={handleGenerateSpeech} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Formato de Comunicación</label>
                <select
                  value={speechFormat}
                  onChange={(e) => setSpeechFormat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Mitin multitudinario en plaza">Mitin multitudinario en plaza</option>
                  <option value="Entrevista en radio / televisión">Entrevista en radio / televisión</option>
                  <option value="Debate electoral cara a cara">Debate electoral cara a cara</option>
                  <option value="Nota de prensa oficial">Nota de prensa oficial</option>
                  <option value="Hilo e intervenciones para redes sociales">Hilo e intervenciones para redes sociales</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tema Central de Campaña</label>
                <select
                  value={speechTopic}
                  onChange={(e) => setSpeechTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Agua, Río Tajo y agricultura en Toledo">Agua, Río Tajo y agricultura en Toledo</option>
                  <option value="AVE Madrid-Talavera-Lisboa y soterramiento">AVE Madrid-Talavera-Lisboa y soterramiento</option>
                  <option value="Colapso de la A-42 y Cercanías a La Sagra">Colapso de la A-42 y Cercanías a La Sagra</option>
                  <option value="Seguridad ciudadana y freno a la ocupación">Seguridad ciudadana y freno a la ocupación</option>
                  <option value="Presión fiscal a pymes y autónomos toledanos">Presión fiscal a pymes y autónomos toledanos</option>
                  <option value="Sanidad, listas de espera y Hospital de Toledo">Sanidad, listas de espera y Hospital de Toledo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tono Discursivo</label>
                  <select
                    value={speechTone}
                    onChange={(e) => setSpeechTone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Combativo y cercano">Combativo y cercano</option>
                    <option value="Institucional y solemne">Institucional y solemne</option>
                    <option value="Técnico y propositivo">Técnico y propositivo</option>
                    <option value="Empático y social">Empático y social</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Comarca Destino</label>
                  <select
                    value={speechComarca}
                    onChange={(e) => setSpeechComarca(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="Provincial general">Provincial general</option>
                    {COMARCAS_TOLEDO.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Idea Fuerza o Compromiso Específico</label>
                <textarea
                  rows={3}
                  value={speechKeyMessage}
                  onChange={(e) => setSpeechKeyMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500"
                  placeholder="Escribe la idea central que el candidato debe fijar en la memoria del votante..."
                />
              </div>

              <button
                type="submit"
                disabled={speechLoading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {speechLoading ? (
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Generar Versión de Discurso (Gemini AI)
              </button>
            </form>
          </div>

          <div className="lg:col-span-7">
            {generatedSpeech ? (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Pieza Redactada con Estricta Trazabilidad
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedSpeech);
                      setCopiedSpeech(true);
                      setTimeout(() => setCopiedSpeech(false), 2000);
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedSpeech ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSpeech ? 'Copiado al Portapapeles' : 'Copiar Texto'}
                  </button>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                  {generatedSpeech}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 rounded-2xl p-14 border border-slate-800 text-center text-slate-400">
                <Sparkles className="w-10 h-10 text-amber-400/40 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">Laboratorio de Redacción Discursiva</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Configura los parámetros a la izquierda para generar discursos completos, notas de prensa y titulares verificados para Toledo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ENTRENADOR DE RESPUESTA EN 30 SEGUNDOS */}
      {activeTab === 'treinta-segundos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase font-mono">
                Entrenador de Síntesis Exprés (30 Segundos)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Estructura ganadora en plató o debate: <strong>Gancho titular (5s)</strong> + <strong>Dato oficial demoledor (15s)</strong> + <strong>Cierre (10s)</strong>.
            </p>

            <form onSubmit={handleTrain30s} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Pregunta Trampa o Ataque</label>
                <textarea
                  rows={3}
                  value={trapQuestion}
                  onChange={(e) => setTrapQuestion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  placeholder="Pregunta incisiva del rival o periodista..."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Portavoz / Rol</label>
                <select
                  value={trainerRole}
                  onChange={(e) => setTrainerRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="Candidato nº 1 al Congreso de los Diputados">Candidato nº 1 al Congreso de los Diputados</option>
                  <option value="Candidato al Senado de España">Candidato al Senado de España</option>
                  <option value="Portavoz comarcal de La Sagra">Portavoz comarcal de La Sagra</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={trainerLoading}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {trainerLoading ? (
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Estructurar Respuesta en 30s
              </button>
            </form>

            {/* Stopwatch Component */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Cronómetro de Ensayo</span>
                <span className={`text-2xl font-black font-mono ${timerSeconds < 5 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
                  00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="p-2 bg-amber-500 text-slate-950 rounded-lg font-bold text-xs flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" /> {timerRunning ? 'Pausar' : 'Iniciar'}
                </button>
                <button
                  onClick={() => { setTimerSeconds(30); setTimerRunning(false); }}
                  className="p-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {trainerData ? (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-white font-serif">
                  Guion Pautado para el Candidato:
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-amber-400">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block mb-1">
                      1. GANCHO TITULAR (Primeros 5 Segundos):
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      "{trainerData.openingHook5s}"
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-emerald-400">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                      2. DATO DEMOLEDOR VERIFICADO (15 Segundos centrales):
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200">
                      "{trainerData.dataBomb15s}"
                    </p>
                    <span className="text-[11px] font-mono text-slate-400 block mt-1">
                      Fuente verificada: <em>{trainerData.verifiedSource}</em>
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border-l-4 border-blue-400">
                    <span className="text-[10px] font-mono text-blue-400 uppercase font-bold block mb-1">
                      3. CIERRE PROPOSITIVO (Últimos 10 Segundos):
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      "{trainerData.closingCall10s}"
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <strong>Consejo del Preparador de Debate:</strong> {trainerData.coachingAdvice}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 rounded-2xl p-14 border border-slate-800 text-center text-slate-400">
                <Timer className="w-10 h-10 text-amber-400/40 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">Simulador de Síntesis en 30 Segundos</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Entrena a no divagar. Genera respuestas estructuradas que no superen el medio minuto reglamentario de debate en televisión.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SIMULADOR INTERACTIVO CON "REPREGÚNTAME" */}
      {activeTab === 'simulador' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono mb-2">
              Perfil de Entrevistador y Pregunta
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Perfil del Periodista / Oponente</label>
                <select
                  value={interviewerStyle}
                  onChange={(e) => setInterviewerStyle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                >
                  <option value="hostil">Periodista incisivo y hostil (busca contradicción)</option>
                  <option value="economico">Analista técnico (pide números y cuentas exactas)</option>
                  <option value="rival">Candidato rival en debate (ataque directo)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Pregunta Lanzada al Candidato</label>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-medium">
                  "{interviewQuestion}"
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Respuesta ensayada por el candidato:
                </label>
                <textarea
                  rows={4}
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500"
                  placeholder="Escribe cómo responderías a la pregunta..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulateInterview(false)}
                  disabled={simLoading || !candidateAnswer.trim()}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  Evaluar Claridad
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulateInterview(true)}
                  disabled={simLoading || !candidateAnswer.trim()}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 shadow-md"
                >
                  <Mic className="w-3.5 h-3.5" /> Repregúntame
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {simFeedback ? (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-xs uppercase font-mono font-bold text-slate-400">
                    Diagnóstico de Desempeño Discursivo:
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Claridad: {simFeedback.critique?.clarityScore || 75}%
                  </span>
                </div>

                {/* The Repregunta */}
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase font-mono">
                    <AlertCircle className="w-4 h-4" />
                    Repregunta Implacable del Periodista:
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white italic leading-relaxed">
                    "{simFeedback.followUpQuestion}"
                  </p>
                </div>

                {/* Critique detail */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 font-semibold">Muletillas o evasivas detectadas:</span>
                    <span className="text-amber-300 font-mono">
                      {simFeedback.critique?.fillerWordsDetected?.join(', ') || 'Ninguna grave'}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 font-semibold">Desvío del mensaje clave:</span>
                    <p className="text-slate-300">{simFeedback.critique?.driftFromCoreMessage}</p>
                  </div>
                </div>

                {/* Suggested Pivot */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs">
                  <strong className="text-amber-400 block mb-1">Frase sugerida para reconducir la entrevista:</strong>
                  <p className="text-slate-200 italic">"{simFeedback.suggestedPivotLine}"</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/60 rounded-2xl p-14 border border-slate-800 text-center text-slate-400">
                <Mic className="w-10 h-10 text-amber-400/40 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white">Simulador de Entrevista "Repregúntame"</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Redacta tu respuesta a la pregunta del periodista y pulsa "Repregúntame" para poner a prueba tu capacidad de aguante ante periodistas hostiles.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
