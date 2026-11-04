import React from 'react';
import { Sparkles, Plus, Play, Star, CloudRain, CheckCircle2 } from 'lucide-react';

export default function StatsBar({
  totalCount,
  learnedCount,
  unlearnedCount,
  onOpenAddModal,
  onStartStudy
}) {
  const percent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  return (
    <section className="mb-8 relative">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100/90 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
              <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-twinkle" />
              <span>Bulutların üzerinde bir öğrenme molası</span>
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-950 dark:text-white">
            Kelime Gökyüzün 🌙
          </h1>
          <p className="text-sm text-purple-700/70 dark:text-purple-300/70 mt-1 font-light">
            Kelimeleri keşfet, yıldızları topla ve interaktif flashcard ile hafızanı tazele.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Study Mode Button */}
          <button
            onClick={onStartStudy}
            disabled={totalCount === 0}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-cloud shadow-purple-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span>Yıldız Pratiği</span>
            {unlearnedCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs font-extrabold bg-white/25 rounded-md">
                {unlearnedCount}
              </span>
            )}
          </button>

          {/* Add Word Button */}
          <button
            onClick={onOpenAddModal}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm bg-purple-100 text-purple-800 hover:bg-purple-200/80 dark:bg-purple-900/40 dark:text-purple-200 dark:hover:bg-purple-900/70 border border-purple-200/80 dark:border-purple-700/50 shadow-sm active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Kelime Ekle</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Words */}
        <div className="backdrop-blur-md bg-white/85 dark:bg-[#1C1733]/85 border border-purple-100/90 dark:border-purple-900/50 rounded-3xl p-5 shadow-cloud transition-all hover:border-purple-200 dark:hover:border-purple-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700/70 dark:text-purple-400">
              Kayıtlı Yıldızlar
            </span>
            <div className="p-2 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300">
              <Star className="w-4 h-4 fill-purple-400/40" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-black text-purple-950 dark:text-white">
              {totalCount}
            </span>
            <span className="text-xs text-purple-600/70 dark:text-purple-400 font-medium">kelime havuzda</span>
          </div>
        </div>

        {/* Learned Words */}
        <div className="backdrop-blur-md bg-white/85 dark:bg-[#1C1733]/85 border border-purple-100/90 dark:border-purple-900/50 rounded-3xl p-5 shadow-cloud transition-all hover:border-purple-200 dark:hover:border-purple-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Işıldayanlar (Öğrenildi)
            </span>
            <div className="p-2 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-black text-purple-950 dark:text-white">
              {learnedCount}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              %{percent} parlıyor
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-purple-100/80 dark:bg-purple-950/60 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Unlearned / In-Practice */}
        <div className="backdrop-blur-md bg-white/85 dark:bg-[#1C1733]/85 border border-purple-100/90 dark:border-purple-900/50 rounded-3xl p-5 shadow-cloud transition-all hover:border-purple-200 dark:hover:border-purple-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-700 dark:text-fuchsia-400">
              Bulutlarda (Tekrar)
            </span>
            <div className="p-2 rounded-2xl bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-600 dark:text-fuchsia-300">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-black text-purple-950 dark:text-white">
              {unlearnedCount}
            </span>
            <span className="text-xs text-purple-600/70 dark:text-purple-400 font-medium">pratik bekliyor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
