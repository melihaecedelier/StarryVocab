import React, { useState, useEffect } from 'react';
import { X, Volume2, RotateCcw, Check, Award, RefreshCw, Sparkles } from 'lucide-react';
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
      const unlearned = words.filter(w => !w.isLearned);
      const list = unlearned.length > 0 ? unlearned : words;
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
          particleCount: 80,
          spread: 60,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] dark:bg-[#1E1B18] border border-[#EBE3D7] dark:border-[#38312B] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D7] dark:border-[#2D2722]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Hafıza Kartları • Pratik Molası ☕
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!sessionCompleted && currentWord ? (
          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            {/* Progress & Counter */}
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-3 font-medium">
              <span>Kart {currentIndex + 1} / {studyList.length}</span>
              <span>%{Math.round(((currentIndex) / studyList.length) * 100)} İlerleme</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-200/70 dark:bg-stone-800 h-1.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-amber-700 dark:bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / studyList.length) * 100}%` }}
              />
            </div>

            {/* 3D Flip Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="perspective-1000 w-full min-h-[270px] sm:min-h-[290px] cursor-pointer select-none group"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE (Word) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-[#FCFBF8] to-[#F7F3EB] dark:from-[#25221F] dark:via-[#221F1C] dark:to-[#1B1816] border-2 border-[#E5DDD0] dark:border-[#38312B] rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center backface-hidden shadow-soft">
                  <div className="w-full flex justify-between items-center">
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${getLevelBadgeClass(currentWord.level)}`}>
                      {currentWord.level}
                    </span>
                    {currentWord.category && (
                      <span className="text-xs font-medium text-stone-400">
                        {currentWord.category}
                      </span>
                    )}
                  </div>

                  <div className="my-auto py-2">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
                      {currentWord.word}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(currentWord.word);
                      }}
                      className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:scale-105 active:scale-95 transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Dinle
                    </button>
                  </div>

                  <div className="text-xs text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Anlamı görmek için dokunun</span>
                  </div>
                </div>

                {/* BACK SIDE (Translation & Example) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FBFDFB] via-white to-[#F2F8F3] dark:from-[#1D241F] dark:via-[#1B211D] dark:to-[#161C18] border-2 border-emerald-200/80 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 shadow-soft">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Türkçe Anlamı
                  </span>

                  <div className="my-auto py-2">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                      {currentWord.translation}
                    </h3>
                    {currentWord.example && (
                      <p className="font-serif italic text-xs sm:text-sm text-stone-600 dark:text-stone-300 bg-white/80 dark:bg-[#201D1A]/80 p-3.5 rounded-xl border border-stone-200/60 dark:border-stone-700/50 max-w-md mx-auto leading-relaxed">
                        "{currentWord.example}"
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-stone-400 dark:text-stone-500">
                    Ön yüze dönmek için dokunun
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => handleNext(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold bg-[#F5EFE6] text-stone-700 hover:bg-[#EDE5DA] dark:bg-[#28231F] dark:text-stone-300 dark:hover:bg-[#322C27] border border-[#E5DDD0] dark:border-[#38312B] transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4 text-stone-500" />
                <span>Tekrar Edelim 🌿</span>
              </button>

              <button
                onClick={() => handleNext(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-emerald-50 shadow-sm transition-all active:scale-[0.98]"
              >
                <Check className="w-4 h-4" />
                <span>Hafızamda! ☕</span>
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="p-8 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shadow-soft mb-4">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">
              Pratik Tamamlandı ☕
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm mb-6 font-light leading-relaxed">
              Bu dinlendirici oturumda toplam <strong className="text-stone-900 dark:text-white font-semibold">{studyList.length}</strong> kelime gözden geçirdin ve <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{learnedInSession}</strong> yeni kelimeyi hafızana mühürledin.
            </p>

            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={handleRestart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 shadow-sm transition-all active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yeniden Başla</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center py-3 rounded-2xl text-xs sm:text-sm font-medium bg-[#F5EFE6] hover:bg-[#EDE5DA] dark:bg-[#25211E] dark:hover:bg-[#2F2A26] text-stone-700 dark:text-stone-300 transition-colors"
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
