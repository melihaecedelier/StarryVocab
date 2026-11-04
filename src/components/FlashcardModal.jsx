import React, { useState, useEffect } from 'react';
import { X, Volume2, RotateCcw, Check, Sparkles, RefreshCw, Star, Cloud } from 'lucide-react';
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

  // Trigger celebration confetti on finish (Lilac, Gold & Pink stardust)
  useEffect(() => {
    if (sessionCompleted) {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#A855F7', '#EC4899', '#FBBF24', '#C084FC', '#E879F9']
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-[#1D1735]/95 border border-purple-200/90 dark:border-purple-800/60 rounded-3xl w-full max-w-xl shadow-cloud-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-purple-100 dark:border-purple-900/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
              <Cloud className="w-3.5 h-3.5" />
              <span>Yıldız Pratiği • Flashcard Modu</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-purple-400 hover:text-purple-700 dark:hover:text-purple-200 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!sessionCompleted && currentWord ? (
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            {/* Progress & Counter */}
            <div className="flex items-center justify-between text-xs text-purple-700/80 dark:text-purple-300/80 mb-3 font-semibold">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-purple-500" />
                Kart {currentIndex + 1} / {studyList.length}
              </span>
              <span>%{Math.round(((currentIndex) / studyList.length) * 100)} İlerleme</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-purple-100 dark:bg-purple-950/60 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
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
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-50/80 via-white to-fuchsia-50/60 dark:from-[#251E44] dark:via-[#1E1838] dark:to-[#17122C] border-2 border-purple-200/90 dark:border-purple-800/70 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center backface-hidden shadow-cloud">
                  <div className="w-full flex justify-between items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelBadgeClass(currentWord.level)}`}>
                      {currentWord.level}
                    </span>
                    {currentWord.category && (
                      <span className="text-xs font-semibold text-purple-500 dark:text-purple-400">
                        {currentWord.category}
                      </span>
                    )}
                  </div>

                  <div className="my-auto py-2">
                    <h3 className="font-display text-3xl sm:text-4xl font-black text-purple-950 dark:text-white tracking-tight">
                      {currentWord.word}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWord(currentWord.word);
                      }}
                      className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-200 hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Dinle
                    </button>
                  </div>

                  <div className="text-xs text-purple-400 dark:text-purple-400 flex items-center gap-1.5 font-medium">
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                    <span>Bulutu çevirmek için dokun ☁️</span>
                  </div>
                </div>

                {/* BACK SIDE (Translation & Example) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-50/80 via-white to-purple-50/60 dark:from-[#172528] dark:via-[#191F33] dark:to-[#1C1733] border-2 border-emerald-200/90 dark:border-emerald-800/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between items-center text-center backface-hidden rotate-y-180 shadow-cloud">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-twinkle" /> Türkçe Anlamı
                  </span>

                  <div className="my-auto py-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-purple-950 dark:text-white mb-2.5">
                      {currentWord.translation}
                    </h3>
                    {currentWord.example && (
                      <p className="text-xs sm:text-sm text-purple-800/80 dark:text-purple-200/80 bg-purple-50/70 dark:bg-[#151128]/70 p-3.5 rounded-2xl border border-purple-100 dark:border-purple-900/50 max-w-md mx-auto leading-relaxed italic">
                        "{currentWord.example}"
                      </p>
                    )}
                  </div>

                  <div className="text-xs text-purple-400 dark:text-purple-400 font-medium">
                    Ön yüze dönmek için dokun ✨
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => handleNext(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-fuchsia-50 text-fuchsia-800 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:hover:bg-fuchsia-950/70 border border-fuchsia-200/80 dark:border-fuchsia-900/50 transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Bulutlara Bırak ☁️</span>
              </button>

              <button
                onClick={() => handleNext(true)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-cloud active:scale-[0.98] transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Yıldızlandı! ✨</span>
              </button>
            </div>
          </div>
        ) : (
          /* Completion Screen */
          <div className="p-8 text-center flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-500 to-fuchsia-500 text-white flex items-center justify-center shadow-cloud mb-4 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-black text-purple-950 dark:text-white mb-2">
              Gökyüzü Işıldıyor! ✨
            </h3>
            <p className="text-sm text-purple-700/80 dark:text-purple-300/80 max-w-sm mb-6 font-light leading-relaxed">
              Bu büyülü oturumda <strong className="text-purple-950 dark:text-white font-bold">{studyList.length}</strong> kelimeyi bulutların arasından geçirdin ve <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{learnedInSession}</strong> yeni kelimeyi yıldız gibi parlatmayı başardın!
            </p>

            <div className="flex items-center gap-3 w-full max-w-xs">
              <button
                onClick={handleRestart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-cloud transition-all active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yeniden Başla</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-purple-100 hover:bg-purple-200/80 dark:bg-purple-950/70 dark:hover:bg-purple-900/70 text-purple-800 dark:text-purple-200 transition-colors"
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
