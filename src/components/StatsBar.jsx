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
    <section className="mb-12 relative">
      {/* Centered Grand Hero Section */}
      <div className="text-center flex flex-col items-center justify-center pt-4 pb-8 sm:pb-12 mb-4">
        
        {/* Floating Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/60 text-xs sm:text-sm font-semibold shadow-sm mb-4 sm:mb-5 animate-float">
          <Sparkles className="w-4 h-4 text-purple-500 animate-twinkle" />
          <span>Bulutların ve yıldızların rehberliğinde</span>
        </div>

        {/* Super Massive Centered Title */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 sm:mb-5">
          <span className="bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 dark:from-purple-200 dark:via-fuchsia-200 dark:to-indigo-200 bg-clip-text text-transparent drop-shadow-sm">
            StarryVocab
          </span>
          <span className="inline-block ml-3 sm:ml-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-twinkle select-none">
            ✨
          </span>
        </h1>

        {/* Centered Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-purple-800/80 dark:text-purple-300/80 font-light max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-9">
          Kendi kelime gökyüzünü keşfet; yeni kelimeleri yıldız gibi parlat, bulutların arasında hafıza kartlarıyla keyifle tekrar et ☁️🌙
        </p>

        {/* Centered Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* Study Mode Button */}
          <button
            onClick={onStartStudy}
            disabled={totalCount === 0}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-cloud-lg shadow-purple-500/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white group-hover:scale-110 transition-transform" />
            <span>Yıldız Pratiği</span>
            {unlearnedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-black bg-white/25 rounded-lg">
                {unlearnedCount}
              </span>
            )}
          </button>

          {/* Add Word Button */}
          <button
            onClick={onOpenAddModal}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base bg-purple-100 text-purple-800 hover:bg-purple-200/80 dark:bg-purple-900/40 dark:text-purple-200 dark:hover:bg-purple-900/70 border border-purple-200/80 dark:border-purple-700/50 shadow-sm active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Yeni Kelime Ekle</span>
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
