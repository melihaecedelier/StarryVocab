import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CEFR_LEVELS } from '../data/initialWords';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy
}) {
  return (
    <div className="backdrop-blur-md bg-white/85 dark:bg-[#1C1733]/85 border border-purple-100/90 dark:border-purple-900/50 rounded-3xl p-4 sm:p-5 mb-6 shadow-cloud space-y-4">
      {/* Search & Sort row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Yıldızlar arasında ara: kelime, Türkçe anlam veya cümle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl text-sm bg-purple-50/50 dark:bg-[#151128] border border-purple-200/70 dark:border-purple-800/60 text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all font-light"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-700 dark:hover:text-purple-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-purple-400 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-purple-50/50 dark:bg-[#151128] border border-purple-200/70 dark:border-purple-800/60 text-purple-800 dark:text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all cursor-pointer"
          >
            <option value="newest">En Yeni Yıldızlar</option>
            <option value="oldest">En Eski Yıldızlar</option>
            <option value="alphabetical">Alfabetik (A-Z)</option>
            <option value="level">Seviyeye Göre (A1-C2)</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Status & Level Tags */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-purple-100/70 dark:border-purple-900/40">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-purple-100/60 dark:bg-[#151128] rounded-2xl overflow-x-auto">
          {[
            { id: 'all', label: 'Tüm Gökyüzü' },
            { id: 'unlearned', label: 'Bulutlarda (Tekrar)' },
            { id: 'learned', label: 'Işıldayanlar (Öğrenildi)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-white dark:bg-[#282147] text-purple-800 dark:text-purple-200 shadow-sm'
                  : 'text-purple-700/70 dark:text-purple-400 hover:text-purple-950 dark:hover:text-purple-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Level Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-purple-400 mr-1 hidden lg:inline">
            Seviye:
          </span>
          <button
            onClick={() => setSelectedLevel('ALL')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              selectedLevel === 'ALL'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-100/60 dark:bg-[#151128] text-purple-700 dark:text-purple-300 hover:bg-purple-200/60 dark:hover:bg-[#201A3D]'
            }`}
          >
            Tümü
          </button>
          {CEFR_LEVELS.map(lvl => (
            <button
              key={lvl.value}
              onClick={() => setSelectedLevel(lvl.value)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl.value
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-100/60 dark:bg-[#151128] text-purple-700 dark:text-purple-300 hover:bg-purple-200/60 dark:hover:bg-[#201A3D]'
              }`}
            >
              {lvl.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
