import React, { useState, useMemo } from 'react';
import { Zap, Users, Shield, CheckCircle, Download, RotateCcw, Heart, ArrowRight, Sparkles, User } from 'lucide-react';

// --- TIPI ---
type DiscType = 'D' | 'I' | 'S' | 'C';

interface Option {
  t: string;
  v: DiscType;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

// --- DATABASE 30 DOMANDE ---
const questions: Question[] = [
  { id: 1, text: "Iniziando un nuovo progetto, la tua priorità è:", options: [{ t: "Ottenere risultati rapidi e tangibili", v: "D" }, { t: "Entusiasmare e coinvolgere il team", v: "I" }, { t: "Creare un piano d'azione stabile e sicuro", v: "S" }, { t: "Assicurarmi che ogni dettaglio sia corretto", v: "C" }] },
  { id: 2, text: "In una discussione di gruppo, tendi a:", options: [{ t: "Prendere il comando e decidere la rotta", v: "D" }, { t: "Portare energia e nuove idee creative", v: "I" }, { t: "Ascoltare tutti per trovare un compromesso", v: "S" }, { t: "Analizzare i fatti con logica e precisione", v: "C" }] },
  { id: 3, text: "Sotto pressione, la tua reazione tipica è:", options: [{ t: "Diventare diretto e molto esigente", v: "D" }, { t: "Parlare di più e cercare supporto sociale", v: "I" }, { t: "Rallentare per non fare passi falsi", v: "S" }, { t: "Chiudermi per controllare minuziosamente i dati", v: "C" }] },
  { id: 4, text: "Cosa ti rende più orgoglioso/a?", options: [{ t: "Vincere una sfida difficile", v: "D" }, { t: "Essere apprezzato/a e benvoluto/a", v: "I" }, { t: "Essere un punto di riferimento affidabile", v: "S" }, { t: "Svolgere un lavoro tecnicamente perfetto", v: "C" }] },
  { id: 5, text: "Quando deleghi un compito importante:", options: [{ t: "Ti fidi del risultato, non dei mezzi", v: "D" }, { t: "Cerchi di ispirare chi lo riceve", v: "I" }, { t: "Offri tutto il tuo supporto costante", v: "S" }, { t: "Fornisci istruzioni estremamente dettagliate", v: "C" }] },
  { id: 6, text: "In un ambiente sociale preferiresti:", options: [{ t: "Essere la persona che organizza l'evento", v: "D" }, { t: "Essere l'anima della festa e divertire", v: "I" }, { t: "Conversare tranquillamente con un amico", v: "S" }, { t: "Osservare e analizzare le dinamiche", v: "C" }] },
  { id: 7, text: "Il cambiamento improvviso per te è:", options: [{ t: "Uno stimolo per agire subito", v: "D" }, { t: "Un'avventura eccitante", v: "I" }, { t: "Una potenziale fonte di stress", v: "S" }, { t: "Una variabile da studiare con cautela", v: "C" }] },
  { id: 8, text: "Come gestisci i conflitti?", options: [{ t: "Affrontandoli di petto per risolverli", v: "D" }, { t: "Usando il carisma per addolcire i toni", v: "I" }, { t: "Cercando di mantenere la pace ad ogni costo", v: "S" }, { t: "Usando prove oggettive per dimostrare la mia tesi", v: "C" }] },
  { id: 9, text: "La tua scrivania o spazio di lavoro è:", options: [{ t: "Un po' caotico ma orientato all'azione", v: "D" }, { t: "Pieno di colori, foto e stimoli", v: "I" }, { t: "Tradizionale, caldo e rassicurante", v: "S" }, { t: "Essenziale, ordinato e metodico", v: "C" }] },
  { id: 10, text: "Cosa cerchi in un leader?", options: [{ t: "Decisionismo e forza", v: "D" }, { t: "Visione e ispirazione", v: "I" }, { t: "Pazienza e ascolto", v: "S" }, { t: "Competenza e precisione", v: "C" }] },
  { id: 11, text: "Nelle decisioni difficili segui:", options: [{ t: "Il tuo istinto di vittoria", v: "D" }, { t: "L'impatto sulle persone", v: "I" }, { t: "Il valore della stabilità", v: "S" }, { t: "La logica dei dati", v: "C" }] },
  { id: 12, text: "Un errore degli altri ti causa:", options: [{ t: "Impazienza: potevo farlo meglio io", v: "D" }, { t: "Dispiacere: rovina il clima", v: "I" }, { t: "Comprensione: capita a tutti", v: "S" }, { t: "Frustrazione: manca il metodo", v: "C" }] },
  { id: 13, text: "Come ti descriverebbero gli amici?", options: [{ t: "Determinante e coraggioso/a", v: "D" }, { t: "Solare e comunicativo/a", v: "I" }, { t: "Leale e disponibile", v: "S" }, { t: "Riflessivo/a e attento/a", v: "C" }] },
  { id: 14, text: "Il tuo obiettivo primario è:", options: [{ t: "L'indipendenza e il controllo", v: "D" }, { t: "L'approvazione e la popolarità", v: "I" }, { t: "L'appartenenza e la serenità", v: "S" }, { t: "L'accuratezza e la qualità", v: "C" }] },
  { id: 15, text: "Durante una presentazione:", options: [{ t: "Vai dritto al sodo velocemente", v: "D" }, { t: "Usi molta gestualità e storie", v: "I" }, { t: "Parli con tono calmo e costante", v: "S" }, { t: "Usi grafici, numeri e prove", v: "C" }] },
  { id: 16, text: "Ti senti rigenerato/a quando:", options: [{ t: "Raggiungi un traguardo difficile", v: "D" }, { t: "Sei circondato/a da persone positive", v: "I" }, { t: "Ti rilassi in un ambiente familiare", v: "S" }, { t: "Risolvi un problema logico complesso", v: "C" }] },
  { id: 17, text: "Cosa detesti di più?", options: [{ t: "La perdita di tempo", v: "D" }, { t: "L'isolamento sociale", v: "I" }, { t: "L'aggressività gratuita", v: "S" }, { t: "L'approssimazione", v: "C" }] },
  { id: 18, text: "Il tuo approccio alle regole è:", options: [{ t: "Servono a chi non sa dove andare", v: "D" }, { t: "Sono suggerimenti flessibili", v: "I" }, { t: "Sono fondamentali per la sicurezza", v: "S" }, { t: "Sono la base per l'eccellenza", v: "C" }] },
  { id: 19, text: "Nel tempo libero preferisci:", options: [{ t: "Attività fisiche o competitive", v: "D" }, { t: "Uscire, parlare e divertirti", v: "I" }, { t: "Hobby creativi o riposo", v: "S" }, { t: "Leggere, studiare o collezionare", v: "C" }] },
  { id: 20, text: "Quando ricevi un incarico:", options: [{ t: "Vuoi sapere 'cosa' e 'quando'", v: "D" }, { t: "Vuoi sapere 'con chi'", v: "I" }, { t: "Vuoi sapere 'come aiutarmi'", v: "S" }, { t: "Vuoi sapere 'perché' e i dettagli", v: "C" }] },
  { id: 21, text: "In un team sei la persona che:", options: [{ t: "Spinge per chiudere le attività", v: "D" }, { t: "Tiene alto il morale", v: "I" }, { t: "Appiana le divergenze", v: "S" }, { t: "Controlla la qualità finale", v: "C" }] },
  { id: 22, text: "La tua più grande forza è:", options: [{ t: "La resilienza", v: "D" }, { t: "L'ottimismo", v: "I" }, { t: "La costanza", v: "S" }, { t: "L'obiettività", v: "C" }] },
  { id: 23, text: "Davanti a una critica:", options: [{ t: "La valuti come una sfida", v: "D" }, { t: "Ti senti ferito/a personalmente", v: "I" }, { t: "Cerchi di capire come migliorare per gli altri", v: "S" }, { t: "Controlli se la critica è logicamente fondata", v: "C" }] },
  { id: 24, text: "Preferisci lavorare in:", options: [{ t: "Un ufficio dinamico e competitivo", v: "D" }, { t: "Uno spazio aperto e creativo", v: "I" }, { t: "Un ambiente tranquillo e accogliente", v: "S" }, { t: "Uno studio privato e silenzioso", v: "C" }] },
  { id: 25, text: "Come gestisci le scadenze?", options: [{ t: "Le batti sistematicamente", v: "D" }, { t: "Ti riduci all'ultimo ma con brio", v: "I" }, { t: "Le rispetti con metodo regolare", v: "S" }, { t: "Pianifichi ogni fase per non sbagliare", v: "C" }] },
  { id: 26, text: "La tua frase tipica sarebbe:", options: [{ t: "Facciamolo e basta!", v: "D" }, { t: "Sarà bellissimo!", v: "I" }, { t: "Facciamolo insieme con calma.", v: "S" }, { t: "Facciamolo nel modo corretto.", v: "C" }] },
  { id: 27, text: "Nelle relazioni sei:", options: [{ t: "Diretto/a e protettivo/a", v: "D" }, { t: "Espansivo/a e trascinante", v: "I" }, { t: "Paziente e leale", v: "S" }, { t: "Discreto/a e attento/a", v: "C" }] },
  { id: 28, text: "Cosa ti spinge a dare il massimo?", options: [{ t: "Il riconoscimento del potere", v: "D" }, { t: "L'ammirazione degli altri", v: "I" }, { t: "Il benessere delle persone care", v: "S" }, { t: "La soddisfazione della perfezione", v: "C" }] },
  { id: 29, text: "In un nuovo gruppo, tu:", options: [{ t: "Ti fai notare subito per le tue idee", v: "D" }, { t: "Fai amicizia con tutti in pochi minuti", v: "I" }, { t: "Aspetti che siano gli altri a venire da te", v: "S" }, { t: "Osservi i ruoli e le procedure", v: "C" }] },
  { id: 30, text: "Al termine della giornata vuoi sentirti:", options: [{ t: "Potente e vittorioso/a", v: "D" }, { t: "Amato/a e ispirato/a", v: "I" }, { t: "Utile e sereno/a", v: "S" }, { t: "Competente e impeccabile", v: "C" }] }
];

// --- PROFILI ---
const profiles = {
  D: { title: "Dominanza", color: "#701a75", light: "#fdf4ff", icon: <Zap size={28} />, desc: "Sei una forza della natura! La tua determinazione e il tuo coraggio sono la tua bussola. Non hai paura delle sfide e la tua capacità di decidere velocemente ti rende un leader naturale. Ricorda: la tua grinta è il tuo dono più grande, usala per costruire ponti verso il successo." },
  I: { title: "Influenza", color: "#a21caf", light: "#fef7ff", icon: <Users size={28} />, desc: "Sei pura luce e connessione! La tua capacità di ispirare le persone e di portare ottimismo è un talento raro. Il tuo entusiasmo è contagioso e rende ogni progetto più luminoso. Non smettere mai di sorridere: la tua visione trasforma la realtà." },
  S: { title: "Stabilità", color: "#86198f", light: "#faf5ff", icon: <Shield size={28} />, desc: "Sei il cuore pulsante e sicuro del team. La tua affidabilità, pazienza ed empatia creano un ambiente protetto per tutti. La tua forza risiede nella costanza e nella capacità di ascolto profondo. Sei la roccia su cui gli altri possono costruire con fiducia." },
  C: { title: "Conformità", color: "#4a044e", light: "#f8f2f9", icon: <CheckCircle size={28} />, desc: "Sei il custode dell'eccellenza e della verità! La tua precisione e la tua mente analitica garantiscono risultati impeccabili. Vedi i dettagli che agli altri sfuggono, portando ordine e qualità superiore. La tua serietà è la garanzia di un successo duraturo." }
};

export default function DiscApp() {
  const [step, setStep] = useState<'intro' | 'gender' | 'test' | 'result'>('intro');
  const [gender, setGender] = useState<string>('');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<DiscType, number>>({ D: 0, I: 0, S: 0, C: 0 });

  const handleAnswer = (val: DiscType) => {
    setScores(prev => ({ ...prev, [val]: prev[val] + 1 }));
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const dominant = useMemo(() => {
    return (Object.keys(scores) as DiscType[]).reduce((a, b) => scores[a] > scores[b] ? a : b);
  }, [scores, step]);

  const reset = () => {
    setStep('intro');
    setCurrentIdx(0);
    setScores({ D: 0, I: 0, S: 0, C: 0 });
  };

  return (
    <div className="min-h-screen bg-[#F9F6F9] flex items-center justify-center p-4 sm:p-8 font-sans antialiased text-slate-800">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(112,26,117,0.15)] border border-purple-100 overflow-hidden">
        
        {/* PROGRESS BAR (Only during test) */}
        {step === 'test' && (
          <div className="h-1.5 w-full bg-purple-50">
            <div 
              className="h-full bg-plum-800 transition-all duration-500 ease-out"
              style={{ width: `${(currentIdx / questions.length) * 100}%`, backgroundColor: '#701a75' }}
            ></div>
          </div>
        )}

        <div className="p-8 sm:p-12">
          
          {/* INTRO */}
          {step === 'intro' && (
            <div className="text-center space-y-8 py-6">
              <div className="w-24 h-24 bg-gradient-to-tr from-purple-900 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-6">
                <Sparkles className="text-white" size={48} />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-purple-950 tracking-tight leading-tight">Analisi del Potenziale DISC</h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto italic">
                  "Conosci te stesso per guidare il tuo futuro." Scopri il tuo stile comportamentale unico in 30 passaggi.
                </p>
              </div>
              <button 
                onClick={() => setStep('gender')}
                className="w-full bg-purple-950 text-white py-6 rounded-2xl font-bold text-xl hover:bg-purple-900 transition-all shadow-xl hover:shadow-purple-200 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Inizia l'Analisi <ArrowRight />
              </button>
            </div>
          )}

          {/* GENDER SELECTION */}
          {step === 'gender' && (
            <div className="text-center space-y-10 py-6">
              <h2 className="text-2xl font-bold text-purple-950">Come desideri che sia personalizzato il tuo report?</h2>
              <div className="grid gap-4 max-w-xs mx-auto">
                {[
                  { label: "Donna", val: "F", icon: <User size={20}/> },
                  { label: "Uomo", val: "M", icon: <User size={20}/> },
                  { label: "Non specificare", val: "N", icon: <Users size={20}/> }
                ].map((g) => (
                  <button 
                    key={g.label} 
                    onClick={() => { setGender(g.label); setStep('test'); }}
                    className="p-6 border-2 border-purple-50 rounded-2xl font-bold text-lg hover:border-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-3 text-purple-900"
                  >
                    {g.icon} {g.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TEST QUESTIONS */}
          {step === 'test' && (
            <div className="space-y-10 py-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-center">
                <span className="bg-purple-100 text-purple-900 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                  Domanda {currentIdx + 1} di 30
                </span>
                <span className="text-purple-300 font-mono text-sm">{Math.round((currentIdx / questions.length) * 100)}%</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-purple-950 leading-tight min-h-[4rem]">
                {questions[currentIdx].text}
              </h2>

              <div className="grid gap-4">
                {questions[currentIdx].options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(opt.v)}
                    className="group w-full text-left p-6 rounded-2xl border-2 border-slate-50 bg-white hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-colors font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-lg font-semibold text-slate-700 group-hover:text-purple-950">{opt.t}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS */}
          {step === 'result' && (
            <div className="py-2 text-center space-y-10" id="report-content">
              <header className="space-y-2">
                <div className="flex justify-center mb-4">
                   <div className="p-3 bg-purple-50 rounded-full text-purple-900"><Heart fill="currentColor" size={24}/></div>
                </div>
                <h2 className="text-sm font-black text-purple-600 uppercase tracking-[0.3em]">Profilo Comportamentale {gender !== 'Non specificare' ? gender : ''}</h2>
                <h1 className="text-4xl font-black text-purple-950 tracking-tighter">Sei un profilo <span style={{color: '#701a75'}}>{profiles[dominant].title}</span></h1>
              </header>

              <div 
                className="p-10 rounded-[2.5rem] text-left relative overflow-hidden shadow-inner border border-purple-100/50"
                style={{ backgroundColor: profiles[dominant].light }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 text-purple-900">
                  {profiles[dominant].icon}
                </div>
                <div className="flex items-center gap-3 mb-6" style={{ color: profiles[dominant].color }}>
                  {profiles[dominant].icon}
                  <h3 className="text-2xl font-bold italic tracking-tight">La tua essenza</h3>
                </div>
                <p className="text-xl leading-relaxed text-purple-900/80 font-medium">
                  {profiles[dominant].desc}
                </p>
                <div className="mt-8 pt-8 border-t border-purple-200/50">
                  <p className="text-purple-950 font-bold uppercase text-xs tracking-widest mb-4">La tua forza nelle dimensioni:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {(Object.keys(scores) as DiscType[]).map((key) => (
                      <div key={key} className="space-y-1">
                        <div className="text-[10px] font-black text-purple-400 uppercase">{profiles[key].title}</div>
                        <div className="text-xl font-black text-purple-950">{Math.round((scores[key]/30)*100)}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 no-print pt-4">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 bg-purple-950 text-white p-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-purple-900 shadow-xl transition-all active:scale-95"
                >
                  <Download size={22} /> Scarica Report PDF
                </button>
                <button 
                  onClick={reset}
                  className="flex-1 bg-white border-2 border-purple-100 text-purple-900 p-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-purple-50 transition-all active:scale-95"
                >
                  <RotateCcw size={22} /> Ripeti Analisi
                </button>
              </div>

              <footer className="pt-8 border-t border-purple-50">
                <p className="text-purple-300 text-[10px] uppercase font-bold tracking-[0.4em]">Odoo HR Intelligence • 2026</p>
              </footer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}