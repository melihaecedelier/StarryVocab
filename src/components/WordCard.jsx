import React, { useState } from 'react';
import { Volume2, CheckCircle, Circle, Edit3, Trash2 } from 'lucide-react';
import { getLevelBadgeClass } from '../data/initialWords';
import { speakWord } from '../utils/speech';

export default function WordCard({
  word,
  onToggleLearned,
  onEdit,
  onDelete
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakWord(word.word);
    setTimeout(() => setIsSpeaking(false), 1200);
  };

  return (
    <div
      className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between border ${
        word.isLearned
          ? 'bg-[#F9FCF9] dark:bg-[#1C221D] border-emerald-200/70 dark:border-emerald-900/40 shadow-soft'
          : 'bg-white dark:bg-[#23201D] border-[#EDE8E0] dark:border-[#332D29] hover:border-[#DDD4C7] dark:hover:border-[#423A34] shadow-soft hover:shadow-soft-lg'
      }`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Level Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border ${getLevelBadgeClass(
                word.level
              )}`}
            >
              {word.level}
            </span>

            {/* Category / Part of Speech */}
            {word.category && (
              <span className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[#F5EFE6] dark:bg-[#1C1917] text-stone-600 dark:text-stone-400">
                {word.category}
              </span>
            )}
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(word)}
              title="Notu Düzenle"
              className="p-1.5 rounded-lg text-stone-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-[#F5EFE6] dark:hover:bg-[#2D2824] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(word.id)}
              title="Kelimeyi Sil"
              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Word and Sound Button */}
        <div className="flex items-baseline gap-2.5 mb-2">
          <h3 className="font-serif text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
            {word.word}
          </h3>
          <button
            onClick={handleSpeak}
            title="Sesli Telaffuz Dinle"
            className={`p-1.5 rounded-full transition-all active:scale-90 ${
              isSpeaking
                ? 'bg-amber-700 text-white scale-110 shadow-sm'
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Translation */}
        <p className="text-sm font-medium text-stone-700 dark:text-stone-200 mb-3 leading-relaxed">
          {word.translation}
        </p>

        {/* Example Sentence with cozy bookish styling */}
        {word.example && (
          <div className="font-serif italic text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 bg-[#FAF7F2] dark:bg-[#1A1816] p-3 rounded-xl border border-[#EDE5DA] dark:border-[#2D2722] my-2 leading-relaxed">
            "{word.example}"
          </div>
        )}
      </div>

      {/* Footer: Learned Status Toggle */}
      <div className="pt-3.5 mt-3 border-t border-[#F2ECE3] dark:border-[#2D2824] flex items-center justify-between">
        <button
          onClick={() => onToggleLearned(word.id)}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition-all ${
            word.isLearned
              ? 'bg-emerald-100/70 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200/80'
              : 'bg-[#F5EFE6] dark:bg-[#1C1917] text-stone-600 dark:text-stone-400 hover:bg-[#EDE5DA] dark:hover:bg-[#2A2522]'
          }`}
        >
          {word.isLearned ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Hafızada</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-stone-400" />
              <span>Öğreniyorum</span>
            </>
          )}
        </button>

        <span className="text-[11px] text-stone-400 font-light">
          {new Date(word.createdAt).toLocaleDateString('tr-TR', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
}
