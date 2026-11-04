import React from 'react';
import { Sparkles, Moon, Sun, Download, Upload, Cloud } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode, onExport, onImport }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#F8F5FD]/80 dark:bg-[#130F24]/80 border-b border-purple-100/80 dark:border-purple-900/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 via-fuchsia-400 to-indigo-400 flex items-center justify-center text-white shadow-cloud shadow-purple-500/25 transition-transform hover:scale-105 group">
            <Cloud className="w-5 h-5 absolute opacity-80 animate-float" />
            <Sparkles className="w-4 h-4 z-10 animate-twinkle" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-purple-700 via-fuchsia-600 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-300 bg-clip-text text-transparent">
                VocabCraft
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100/80 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
                ✨ starlight
              </span>
            </div>
            <p className="text-xs text-purple-600/70 dark:text-purple-300/60 hidden sm:block font-light">
              Bulutların ve yıldızların arasında kelime yolculuğu ☁️🌙
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Backup / Export */}
          <button
            onClick={onExport}
            title="Kelimeleri İndir (JSON Yedek)"
            className="px-3 py-2 rounded-2xl text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100/70 dark:hover:bg-purple-950/60 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">Yedekle</span>
          </button>

          {/* Import */}
          <label
            title="JSON Dosyasından İçe Aktar"
            className="px-3 py-2 rounded-2xl text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100/70 dark:hover:bg-purple-950/60 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-purple-400" />
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
            title={darkMode ? "Gündüz Gökyüzü Modu" : "Gece Yıldızları Modu"}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-2xl bg-white/80 dark:bg-[#1E1834] text-purple-700 dark:text-purple-200 border border-purple-200/70 dark:border-purple-900/60 shadow-sm hover:scale-105 transition-all"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-300 animate-twinkle" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
