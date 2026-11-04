import React, { useState } from 'react';
import { Volume2, CheckCircle2, Circle, Edit3, Trash2, Sparkles, Star } from 'lucide-react';
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
      className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border backdrop-blur-md ${
        word.isLearned
          ? 'bg-gradient-to-br from-purple-50/90 via-white/95 to-emerald-50/40 dark:from-[#1E1938]/90 dark:via-[#19142E]/95 dark:to-[#162224]/80 border-purple-200/80 dark:border-purple-800/60 shadow-cloud'
          : 'bg-white/90 dark:bg-[#1C1733]/90 border-purple-100/80 dark:border-purple-900/40 hover:border-purple-300/80 dark:hover:border-purple-700/60 shadow-cloud hover:shadow-cloud-lg hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Level Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getLevelBadgeClass(
                word.level
              )}`}
            >
              {word.level}
            </span>

            {/* Category / Part of Speech */}
            {word.category && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-100/70 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                {word.category}
              </span>
            )}
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(word)}
              title="Notu Düzenle"
              className="p-1.5 rounded-xl text-purple-400 hover:text-purple-700 dark:hover:text-purple-200 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(word.id)}
              title="Yıldızı Kaldır"
              className="p-1.5 rounded-xl text-purple-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Word and Sound Button */}
        <div className="flex items-baseline gap-2.5 mb-2">
          <h3 className="font-display text-2xl font-black tracking-tight text-purple-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
            {word.word}
          </h3>
          <button
            onClick={handleSpeak}
            title="Sesli Telaffuz Dinle (Web Speech API)"
            className={`p-1.5 rounded-full transition-all active:scale-90 ${
              isSpeaking
                ? 'bg-purple-600 text-white scale-110 shadow-star'
                : 'text-purple-600 dark:text-purple-300 hover:bg-purple-100/80 dark:hover:bg-purple-950/80'
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Translation */}
        <p className="text-sm font-semibold text-purple-900/90 dark:text-purple-100 mb-3 leading-relaxed">
          {word.translation}
        </p>

        {/* Example Sentence with soft lilac starlight background */}
        {word.example && (
          <div className="text-xs sm:text-[13px] text-purple-800/80 dark:text-purple-200/80 bg-purple-50/70 dark:bg-[#151128]/70 p-3 rounded-2xl border border-purple-100 dark:border-purple-900/40 my-2 leading-relaxed italic">
            "{word.example}"
          </div>
        )}
      </div>

      {/* Footer: Learned Status Toggle */}
      <div className="pt-3.5 mt-3 border-t border-purple-100/80 dark:border-purple-900/40 flex items-center justify-between">
        <button
          onClick={() => onToggleLearned(word.id)}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
            word.isLearned
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm'
              : 'bg-purple-100/60 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200/60 dark:hover:bg-purple-900/60'
          }`}
        >
          {word.isLearned ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-twinkle" />
              <span>Işıldıyor ✨</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-purple-400" />
              <span>Bulutlarda ☁️</span>
            </>
          )}
        </button>

        <span className="text-[11px] text-purple-400 font-medium flex items-center gap-1">
          <Star className="w-2.5 h-2.5 opacity-60" />
          {new Date(word.createdAt).toLocaleDateString('tr-TR', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
}
