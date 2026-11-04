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
    <div className="bg-white dark:bg-[#23201D] border border-[#EDE8E0] dark:border-[#332D29] rounded-2xl p-4 sm:p-5 mb-6 shadow-soft space-y-4">
      {/* Search & Sort row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Defterde ara: kelime, Türkçe anlam veya cümle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-[#F7F4EE] dark:bg-[#1C1917] border border-[#E5DFD5] dark:border-[#38312B] text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-light"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-400 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-[#F7F4EE] dark:bg-[#1C1917] border border-[#E5DFD5] dark:border-[#38312B] text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all cursor-pointer"
          >
            <option value="newest">En Yeni Notlar</option>
            <option value="oldest">En Eski Notlar</option>
            <option value="alphabetical">Alfabetik (A-Z)</option>
            <option value="level">Seviyeye Göre (A1-C2)</option>
          </select>
        </div>
      </div>

      {/* Filter Row: Status & Level Tags */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-[#F2ECE3] dark:border-[#2D2824]">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5EFE6] dark:bg-[#1C1917] rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: 'Tüm Kelimeler' },
            { id: 'unlearned', label: 'Tekrar Edilecek' },
            { id: 'learned', label: 'Öğrenilenler' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-white dark:bg-[#2A2522] text-amber-900 dark:text-amber-200 shadow-sm font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Level Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-medium text-stone-400 mr-1 hidden lg:inline">
            Seviye:
          </span>
          <button
            onClick={() => setSelectedLevel('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedLevel === 'ALL'
                ? 'bg-stone-800 text-stone-100 dark:bg-stone-200 dark:text-stone-900 font-semibold'
                : 'bg-[#F5EFE6] dark:bg-[#1C1917] text-stone-600 dark:text-stone-400 hover:bg-[#EDE5DA] dark:hover:bg-[#2A2522]'
            }`}
          >
            Tümü
          </button>
          {CEFR_LEVELS.map(lvl => (
            <button
              key={lvl.value}
              onClick={() => setSelectedLevel(lvl.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedLevel === lvl.value
                  ? 'bg-amber-700 text-amber-50 dark:bg-amber-600 dark:text-white font-semibold shadow-sm'
                  : 'bg-[#F5EFE6] dark:bg-[#1C1917] text-stone-600 dark:text-stone-400 hover:bg-[#EDE5DA] dark:hover:bg-[#2A2522]'
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
