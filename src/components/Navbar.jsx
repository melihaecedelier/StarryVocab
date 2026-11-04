import React from 'react';
import { Coffee, Moon, Sun, Download, Upload, Sparkles } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, onExport, onImport }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[#FBF9F5]/85 dark:bg-[#181614]/85 border-b border-[#EDE8E0] dark:border-[#2D2824] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 flex items-center justify-center text-amber-50 shadow-sm shadow-amber-900/10 transition-transform hover:scale-105">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-stone-900 dark:text-stone-50">
                VocabCraft
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300/40 dark:border-amber-800/40">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" /> cozy edition
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block font-light">
              Huzurlu bir çalışma alanı & kelime hafıza asistanı
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Export */}
          <button
            onClick={onExport}
            title="Kelimeleri JSON Olarak İndir (Yedek)"
            className="px-3 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-stone-400" />
            <span className="hidden md:inline">Yedekle</span>
          </button>

          {/* Import */}
          <label
            title="Yedek JSON Dosyasından Yükle"
            className="px-3 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-stone-400" />
            <span className="hidden md:inline">İçe Aktar</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Gündüz Modu (Krem)" : "Gece Modu (Espresso)"}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl bg-stone-100 dark:bg-[#23201D] text-stone-700 dark:text-stone-300 border border-stone-200/70 dark:border-[#38312B] hover:bg-stone-200/60 dark:hover:bg-[#2D2824] transition-all"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
