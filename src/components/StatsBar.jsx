import React from 'react';
import { BookMarked, Sparkles, Plus, Play, CheckCircle } from 'lucide-react';

export default function StatsBar({
  totalCount,
  learnedCount,
  unlearnedCount,
  onOpenAddModal,
  onStartStudy
}) {
  const percent = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  return (
    <section className="mb-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
              ☕ Bugün de yeni bir şeyler öğrenelim
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Kişisel Kelime Günlüğün
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 font-light">
            Sakin bir tempoda kelimeleri kaydet, sesli dinle ve hafıza kartlarıyla keyifle tekrar et.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Study Mode Button */}
          <button
            onClick={onStartStudy}
            disabled={totalCount === 0}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 hover:from-amber-800 hover:to-orange-800 text-amber-50 shadow-sm shadow-amber-900/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4 fill-amber-50" />
            <span>Pratik Molası</span>
            {unlearnedCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs font-bold bg-black/20 rounded-md">
                {unlearnedCount}
              </span>
            )}
          </button>

          {/* Add Word Button */}
          <button
            onClick={onOpenAddModal}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm bg-stone-800 hover:bg-stone-900 dark:bg-stone-200 dark:hover:bg-white text-stone-100 dark:text-stone-900 shadow-sm active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Kelime Ekle</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Words */}
        <div className="bg-white dark:bg-[#23201D] border border-[#EDE8E0] dark:border-[#332D29] rounded-2xl p-4 sm:p-5 shadow-soft transition-all hover:border-stone-300 dark:hover:border-stone-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Kayıtlı Kelime
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
              <BookMarked className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-50">
              {totalCount}
            </span>
            <span className="text-xs text-stone-500 font-light">kelime defterde</span>
          </div>
        </div>

        {/* Learned Words */}
        <div className="bg-white dark:bg-[#23201D] border border-[#EDE8E0] dark:border-[#332D29] rounded-2xl p-4 sm:p-5 shadow-soft transition-all hover:border-stone-300 dark:hover:border-stone-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Öğrenilenler
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-50">
              {learnedCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              %{percent} hafızada
            </span>
          </div>
          {/* Soft Matcha Progress bar */}
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-600/80 dark:bg-emerald-500/80 h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Unlearned / In-Practice */}
        <div className="bg-white dark:bg-[#23201D] border border-[#EDE8E0] dark:border-[#332D29] rounded-2xl p-4 sm:p-5 shadow-soft transition-all hover:border-stone-300 dark:hover:border-stone-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Tekrar Bekleyen
            </span>
            <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-50">
              {unlearnedCount}
            </span>
            <span className="text-xs text-stone-500 font-light">pratik bekliyor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
