import React, { useState, useMemo } from 'react';
import { Calculator, Award, ArrowUpRight, RotateCcw, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

interface PartyInput {
  name: string;
  color: string;
  votes: number;
}

const DEFAULT_PARTIES: PartyInput[] = [
  { name: 'PP', color: '#1d4ed8', votes: 153782 },
  { name: 'PSOE', color: '#dc2626', votes: 129486 },
  { name: 'VOX', color: '#16a34a', votes: 74218 },
  { name: 'Sumar', color: '#db2777', votes: 32904 },
  { name: 'Otros / SALF', color: '#ea580c', votes: 12450 },
];

export const DhondtSimulator: React.FC = () => {
  const [parties, setParties] = useState<PartyInput[]>(DEFAULT_PARTIES);
  const totalSeats = 6; // Toledo has 6 congress seats

  const totalVotes = useMemo(() => {
    return parties.reduce((sum, p) => sum + p.votes, 0);
  }, [parties]);

  // Calculate 3% threshold
  const threshold = totalVotes * 0.03;

  // D'Hondt Quotients calculation
  const { seatDistribution, quotientTable, winningQuotients, lastSeatInfo } = useMemo(() => {
    // Filter parties exceeding 3%
    const validParties = parties.filter(p => p.votes >= threshold);

    interface QuotientItem {
      party: string;
      divisor: number;
      quotient: number;
      originalVotes: number;
    }

    const allQuotients: QuotientItem[] = [];

    validParties.forEach(p => {
      for (let d = 1; d <= totalSeats; d++) {
        allQuotients.push({
          party: p.name,
          divisor: d,
          quotient: Math.floor(p.votes / d),
          originalVotes: p.votes
        });
      }
    });

    // Sort descending
    allQuotients.sort((a, b) => b.quotient - a.quotient);

    // Pick top 6
    const winners = allQuotients.slice(0, totalSeats);

    // Count seats per party
    const seats: Record<string, number> = {};
    parties.forEach(p => { seats[p.name] = 0; });
    winners.forEach(w => {
      seats[w.party] = (seats[w.party] || 0) + 1;
    });

    // 6th seat vs runner-up quotient margin
    const sixthWinner = winners[totalSeats - 1];
    const seventhQuotient = allQuotients[totalSeats];
    const votesToFlip = seventhQuotient 
      ? (sixthWinner.quotient - seventhQuotient.quotient + 1) * (seventhQuotient.divisor)
      : 0;

    return {
      seatDistribution: seats,
      quotientTable: allQuotients,
      winningQuotients: winners,
      lastSeatInfo: {
        winner: sixthWinner,
        runnerUp: seventhQuotient,
        votesToFlip
      }
    };
  }, [parties, totalVotes, threshold]);

  const handleVoteChange = (index: number, val: number) => {
    const updated = [...parties];
    updated[index].votes = Math.max(0, val);
    setParties(updated);
  };

  const loadPreset = (preset: '2023' | '2019N' | 'tight') => {
    if (preset === '2023') {
      setParties([
        { name: 'PP', color: '#1d4ed8', votes: 153782 },
        { name: 'PSOE', color: '#dc2626', votes: 129486 },
        { name: 'VOX', color: '#16a34a', votes: 74218 },
        { name: 'Sumar', color: '#db2777', votes: 32904 },
        { name: 'Otros / SALF', color: '#ea580c', votes: 12450 },
      ]);
    } else if (preset === '2019N') {
      setParties([
        { name: 'PP', color: '#1d4ed8', votes: 101890 },
        { name: 'PSOE', color: '#dc2626', votes: 116282 },
        { name: 'VOX', color: '#16a34a', votes: 88477 },
        { name: 'Sumar', color: '#db2777', votes: 27958 },
        { name: 'Otros / SALF', color: '#ea580c', votes: 26084 },
      ]);
    } else if (preset === 'tight') {
      setParties([
        { name: 'PP', color: '#1d4ed8', votes: 142000 },
        { name: 'PSOE', color: '#dc2626', votes: 139500 },
        { name: 'VOX', color: '#16a34a', votes: 79000 },
        { name: 'Sumar', color: '#db2777', votes: 34000 },
        { name: 'Otros / SALF', color: '#ea580c', votes: 11000 },
      ]);
    }
  };

  return (
    <section id="dhondt-simulator" className="py-14 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase mb-2">
              <Calculator className="w-3.5 h-3.5" /> Simulador Matemático de Ley D'Hondt
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              Calculadora de Reparto de los 6 Escaños de Toledo
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Modifica los votos de cada candidatura o carga escenarios históricos para ver en tiempo real cómo se adjudica cada diputado y el margen de votos que decide el sexto escaño.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadPreset('2023')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium"
            >
              Cargar 23-J (2023)
            </button>
            <button
              onClick={() => loadPreset('2019N')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium"
            >
              Cargar 10-N (2019)
            </button>
            <button
              onClick={() => loadPreset('tight')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-xs text-amber-300 font-medium"
            >
              Escenario Empate 2026
            </button>
          </div>
        </div>

        {/* Seat Output Bar */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 mb-8 shadow-xl">
          <div className="text-xs uppercase font-mono text-slate-400 mb-2 flex justify-between">
            <span>Proyección de los 6 Escaños del Congreso (Toledo):</span>
            <span>Total Votos Válidos: {totalVotes.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
            {parties.map((p) => {
              const seats = seatDistribution[p.name] || 0;
              const pct = totalVotes > 0 ? ((p.votes / totalVotes) * 100).toFixed(1) : '0';
              return (
                <div
                  key={p.name}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                  style={{ borderTopColor: p.color, borderTopWidth: 4 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-base">{p.name}</span>
                    <span className="text-xs font-mono text-slate-400">{pct}%</span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-400 font-serif">
                      {seats} <span className="text-xs text-slate-400 font-normal">diputados</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {p.votes.toLocaleString()} v.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decisive 6th Seat Alert */}
          {lastSeatInfo.winner && lastSeatInfo.runnerUp && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>El 6º escaño decisivo</strong> se lo adjudica <strong>{lastSeatInfo.winner.party}</strong> (con cociente de {lastSeatInfo.winner.quotient.toLocaleString()} votos).
                </span>
              </div>
              <span className="font-mono text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded border border-amber-500/30">
                Margen frente a {lastSeatInfo.runnerUp.party}: +{(lastSeatInfo.winner.quotient - lastSeatInfo.runnerUp.quotient).toLocaleString()} cociente (~{lastSeatInfo.votesToFlip.toLocaleString()} votos)
              </span>
            </div>
          )}
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {parties.map((party, idx) => (
            <div key={party.name} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-white uppercase">{party.name}</label>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  {party.votes.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="500"
                value={party.votes}
                onChange={(e) => handleVoteChange(idx, parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 bg-slate-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0</span>
                <span>100k</span>
                <span>200k</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quotient Table Breakdown */}
        <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-800">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-serif">
            <Award className="w-4 h-4 text-amber-400" />
            Tabla Oficial de Asignación por Cocientes Decrecientes (Escaños 1 al 6):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {winningQuotients.map((w, index) => (
              <div
                key={index}
                className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-amber-400 font-mono">Escaño #{index + 1}</span>
                  <span className="font-bold text-white px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {w.party}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  Divisor: <span className="font-mono text-slate-300">/{w.divisor}</span>
                </div>
                <div className="text-amber-300 font-bold font-mono text-xs mt-1">
                  {w.quotient.toLocaleString()} votos
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
