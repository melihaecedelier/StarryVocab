import React, { useState, useEffect } from 'react';
import { X, Volume2, RotateCcw, Check, ArrowRight, Award, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakWord } from '../utils/speech';
import { getLevelBadgeClass } from '../data/initialWords';

export default function FlashcardModal({
  isOpen,
  onClose,
  words,
  onMarkLearned
}) {
  const [studyList, setStudyList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [learnedInSession, setLearnedInSession] = useState(0);

  // Initialize study list
  useEffect(() => {
    if (isOpen && words.length > 0) {
      // Prioritize unlearned words, fallback to all words if all learned
      const unlearned = words.filter(w => !w.isLearned);
      const list = unlearned.length > 0 ? unlearned : words;
      // Shuffle list
      const shuffled = [...list].sort(() => Math.random() - 0.5);
      setStudyList(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
      setSessionCompleted(false);
      setLearnedInSession(0);
    }
  }, [isOpen, words]);

  // Trigger celebration confetti on finish
  useEffect(() => {
    if (sessionCompleted) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [sessionCompleted]);

  if (!isOpen) return null;

  const currentWord = studyList[currentIndex];

  const handleNext = (learned = false) => {
    if (learned && currentWord) {
      onMarkLearned(currentWord.id, true);
      setLearnedInSession(prev => prev + 1);
    }

    setIsFlipped(false);

    if (currentIndex + 1 < studyList.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  const handleRestart = () => {
    const unlearned = words.filter(w => !w.isLearned);
    const list = unlearned.length > 0 ? unlearned : words;
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setStudyList(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setLearnedInSession(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Flashcard Çalışma Modu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!sessionCompleted && currentWord ? (
          <div className="p-6 flex-1 flex flex-col justify-between">
            {/* Progress & Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 font-semibold">
              <span>Kart {currentIndex + 1} / {studyList.length}</span>
              <span>{Math.round(((currentIndex) / studyList.length) * 100)}% Tamamlandı</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / studyList.length) * 100}%` }}
              />
            </div>

            {/* 3D Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="perspective-1000 w-full min-h-[260px] sm:min-h-[280px] cursor-pointer select-none group"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE (Word) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/60 dark:from-slate-800/80 dark:via-slate-900 dark:to-indigo-950/40 border-2 border-indigo-200/80 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center backface-hidden shadow-lg shadow-indigo-500/5">
                  <div className="w-full flex justify-between items-center">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getLevelBadgeClass(currentWord.level)}`}>
                      {currentWord.level}
                    </span>
                    {currentWord.category && (
                      <span className="text-xs font-semibold text-slate-400">
                        {currentWord.category}
                      </span>
                    )}
                  </div>

                  <div className="my-auto">
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {currentWord.word}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(currentWord.word);
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Telaffuz Dinle
                    </button>
                  </div>

                  <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                    <span>Anlamı görmek için tıkla</span>
                  </div>
                </div>

                {/* BACK SIDE (Translation & Example) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/60 dark:from-slate-800/80 dark:via-slate-900 dark:to-emerald-950/40 border-2 border-emerald-300/80 dark:border-emerald-900/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 shadow-lg shadow-emerald-500/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Türkçe Anlamı
                  </span>

                  <div className="my-auto">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                      {currentWord.translation}
                    </h3>
                    {currentWord.example && (
                      <p className="text-sm italic text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50 max-w-md mx-auto">
                        "{currentWord.example}"
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    Ön yüze dönmek için tıkla
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => handleNext(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70 border border-amber-200/60 dark:border-amber-900/60 transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tekrar Et</span>
              </button>

              <button
                onClick={() => handleNext(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
              >
                <Check className="w-4 h-4" />
                <span>Biliyorum!</span>
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="p-8 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-4 animate-bounce">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              Harika İş Çıkardın! 🎉
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-6">
              Bu oturumda toplam <strong className="text-slate-900 dark:text-white">{studyList.length}</strong> kelime çalıştın ve <strong className="text-emerald-600 dark:text-emerald-400">{learnedInSession}</strong> kelimeyi hafızana kazıdın.
            </p>

            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={handleRestart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Tekrar Başlat</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center py-3 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
