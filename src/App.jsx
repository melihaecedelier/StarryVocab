import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import WordCard from './components/WordCard';
import WordModal from './components/WordModal';
import FlashcardModal from './components/FlashcardModal';
import { INITIAL_WORDS } from './data/initialWords';
import { Sparkles, Plus, SearchX, Cloud, Star } from 'lucide-react';

const STORAGE_KEY = 'vocabcraft_words_starlight_v1';
const THEME_KEY = 'vocabcraft_theme_starlight_v1';

export default function App() {
  // Theme state (Dark/Light)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Words state
  const [words, setWords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('LocalStorage load error:', e);
    }
    return INITIAL_WORDS;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'learned', 'unlearned'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'alphabetical', 'level'

  // Modal states
  const [isWordModalOpen, setIsWordModalOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync words with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [words]);

  // Stats
  const totalCount = words.length;
  const learnedCount = useMemo(() => words.filter(w => w.isLearned).length, [words]);
  const unlearnedCount = totalCount - learnedCount;

  // Filter & Sort words
  const filteredWords = useMemo(() => {
    let result = [...words];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        w =>
          w.word.toLowerCase().includes(q) ||
          w.translation.toLowerCase().includes(q) ||
          (w.example && w.example.toLowerCase().includes(q))
      );
    }

    // Level filter
    if (selectedLevel !== 'ALL') {
      result = result.filter(w => w.level === selectedLevel);
    }

    // Status filter
    if (statusFilter === 'learned') {
      result = result.filter(w => w.isLearned);
    } else if (statusFilter === 'unlearned') {
      result = result.filter(w => !w.isLearned);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'alphabetical') {
        return a.word.localeCompare(b.word);
      }
      if (sortBy === 'level') {
        const order = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
        return (order[a.level] || 0) - (order[b.level] || 0);
      }
      return 0;
    });

    return result;
  }, [words, searchQuery, selectedLevel, statusFilter, sortBy]);

  // Actions
  const handleSaveWord = (wordData) => {
    if (editingWord) {
      setWords(prev =>
        prev.map(w => (w.id === editingWord.id ? { ...w, ...wordData } : w))
      );
      setEditingWord(null);
    } else {
      const newWord = {
        ...wordData,
        id: 'word_' + Date.now(),
        isLearned: false,
        createdAt: new Date().toISOString()
      };
      setWords(prev => [newWord, ...prev]);
    }
  };

  const handleEditWord = (word) => {
    setEditingWord(word);
    setIsWordModalOpen(true);
  };

  const handleDeleteWord = (id) => {
    if (window.confirm('Bu kelimeyi gökyüzünden silmek istediğinize emin misiniz?')) {
      setWords(prev => prev.filter(w => w.id !== id));
    }
  };

  const handleToggleLearned = (id) => {
    setWords(prev =>
      prev.map(w => (w.id === id ? { ...w, isLearned: !w.isLearned } : w))
    );
  };

  const handleMarkLearned = (id, learned) => {
    setWords(prev =>
      prev.map(w => (w.id === id ? { ...w, isLearned: learned } : w))
    );
  };

  // Export JSON backup
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(words, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vocabcraft_starlight_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setWords(imported);
          alert(`${imported.length} adet kelime gökyüzüne eklendi! ✨`);
        } else {
          alert('Geçersiz JSON dosyası. Kelime listesi dizi olmalıdır.');
        }
      } catch (err) {
        alert('Dosya yüklenirken bir hata oluştu: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#F8F5FD] dark:bg-[#130F24] text-purple-950 dark:text-purple-100 transition-colors duration-300">
      
      {/* Background Floating Cloud & Star Atmospheric Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Lavender Cloud Blob Top Left */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/25 dark:bg-purple-900/20 rounded-full blur-3xl animate-float-slow" />
        {/* Soft Fuchsia Cloud Blob Top Right */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-fuchsia-300/20 dark:bg-fuchsia-900/15 rounded-full blur-3xl animate-float" />
        {/* Soft Indigo Cloud Blob Bottom Center */}
        <div className="absolute -bottom-20 left-1/3 w-[32rem] h-[32rem] bg-indigo-300/20 dark:bg-indigo-950/25 rounded-full blur-3xl animate-float-slow" />

        {/* Subtle Decorative Stars */}
        <div className="absolute top-20 left-[12%] text-purple-300/60 dark:text-purple-400/30 animate-twinkle text-lg">✦</div>
        <div className="absolute top-44 right-[15%] text-fuchsia-300/60 dark:text-fuchsia-400/30 animate-twinkle-delay-1 text-sm">✧</div>
        <div className="absolute top-[60%] left-[8%] text-indigo-300/50 dark:text-indigo-400/20 animate-twinkle-delay-2 text-base">✦</div>
        <div className="absolute bottom-28 right-[10%] text-purple-300/60 dark:text-purple-400/30 animate-twinkle text-xl">⋆</div>
      </div>

      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Stats Header */}
        <StatsBar
          totalCount={totalCount}
          learnedCount={learnedCount}
          unlearnedCount={unlearnedCount}
          onOpenAddModal={() => {
            setEditingWord(null);
            setIsWordModalOpen(true);
          }}
          onStartStudy={() => setIsStudyModalOpen(true)}
        />

        {/* Filter and Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Words Grid or Empty State */}
        {filteredWords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWords.map(word => (
              <WordCard
                key={word.id}
                word={word}
                onToggleLearned={handleToggleLearned}
                onEdit={handleEditWord}
                onDelete={handleDeleteWord}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 backdrop-blur-md bg-white/80 dark:bg-[#1C1733]/80 border border-purple-100 dark:border-purple-900/50 rounded-3xl p-8 shadow-cloud">
            <div className="w-16 h-16 rounded-3xl bg-purple-100/90 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
              {searchQuery ? (
                <SearchX className="w-7 h-7" />
              ) : (
                <Cloud className="w-7 h-7 animate-float" />
              )}
            </div>
            <h3 className="font-display text-xl font-bold text-purple-950 dark:text-white mb-1.5">
              {searchQuery ? 'Yıldız Bulunamadı' : 'Gökyüzü Henüz Sessiz'}
            </h3>
            <p className="text-sm text-purple-700/70 dark:text-purple-300/70 max-w-sm mx-auto mb-6 font-light leading-relaxed">
              {searchQuery
                ? `"${searchQuery}" aramasına uygun bir kelime bulunamadı. Filtreleri temizlemeyi deneyin.`
                : 'Gökyüzüne ilk kelimeni ekleyerek kendi yıldız takımını oluşturmaya başla! ✨'}
            </p>
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('ALL');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 rounded-2xl text-xs font-bold bg-purple-100 hover:bg-purple-200/80 dark:bg-purple-950/80 dark:hover:bg-purple-900/70 text-purple-800 dark:text-purple-200 transition-colors"
              >
                Filtreleri Temizle
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingWord(null);
                  setIsWordModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white shadow-cloud transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>İlk Yıldızını Ekle</span>
              </button>
            )}
          </div>
        )}
      </main>

      {/* Word Add / Edit Modal */}
      <WordModal
        isOpen={isWordModalOpen}
        onClose={() => {
          setIsWordModalOpen(false);
          setEditingWord(null);
        }}
        onSave={handleSaveWord}
        editingWord={editingWord}
      />

      {/* Flashcard Study Modal */}
      <FlashcardModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        words={words}
        onMarkLearned={handleMarkLearned}
      />

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 border-t border-purple-100/80 dark:border-purple-900/40 text-center text-xs text-purple-400 dark:text-purple-400 font-light">
        <p>VocabCraft ✨☁️ • Bulutların üzerinde ve yıldızların ışığında kelime defteri</p>
      </footer>
    </div>
  );
}
