import React, { useState } from 'react';
import { Volume2, CheckCircle2, Circle, Edit3, Trash2, Quote } from 'lucide-react';
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
      className={`group relative bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
        word.isLearned
          ? 'border-emerald-200/80 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10'
          : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Level Badge */}
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getLevelBadgeClass(
                word.level
              )}`}
            >
              {word.level}
            </span>

            {/* Category / Part of Speech */}
            {word.category && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {word.category}
              </span>
            )}
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(word)}
              title="Kelimeyi Düzenle"
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(word.id)}
              title="Kelimeyi Sil"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Word and Sound Button */}
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {word.word}
          </h3>
          <button
            onClick={handleSpeak}
            title="Sesli Telaffuz Dinle (Web Speech API)"
            className={`p-1.5 rounded-full transition-transform active:scale-90 ${
              isSpeaking
                ? 'bg-indigo-600 text-white scale-110 animate-pulse'
                : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60'
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Translation */}
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
          {word.translation}
        </p>

        {/* Example Sentence */}
        {word.example && (
          <div className="relative pl-3 border-l-2 border-indigo-200 dark:border-indigo-900/60 py-1 my-2 text-xs text-slate-600 dark:text-slate-400 italic bg-slate-50/50 dark:bg-slate-800/30 rounded-r-lg pr-2">
            "{word.example}"
          </div>
        )}
      </div>

      {/* Footer: Learned Status Toggle */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => onToggleLearned(word.id)}
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
            word.isLearned
              ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200/70'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {word.isLearned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Öğrenildi</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4 text-slate-400" />
              <span>Öğreniyorum</span>
            </>
          )}
        </button>

        <span className="text-[10px] text-slate-400">
          {new Date(word.createdAt).toLocaleDateString('tr-TR', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
}
