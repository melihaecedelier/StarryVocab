import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import WordCard from './components/WordCard';
import WordModal from './components/WordModal';
import FlashcardModal from './components/FlashcardModal';
import { INITIAL_WORDS } from './data/initialWords';
import { Coffee, Plus, SearchX } from 'lucide-react';

const STORAGE_KEY = 'vocabcraft_words_cozy_v1';
const THEME_KEY = 'vocabcraft_theme_cozy_v1';

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
    if (window.confirm('Bu kelimeyi defterden silmek istediğinize emin misiniz?')) {
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
    downloadAnchor.setAttribute("download", `vocabcraft_cozy_backup_${new Date().toISOString().slice(0,10)}.json`);
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
          alert(`${imported.length} adet kelime deftere eklendi!`);
        } else {
          alert('Geçersiz JSON dosyası. Liste bir dizi şeklinde olmalıdır.');
        }
      } catch (err) {
        alert('Dosya okunurken bir hata oluştu: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#181614] text-stone-800 dark:text-stone-200 transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onExport={handleExport}
        onImport={handleImport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
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
          <div className="text-center py-16 bg-white dark:bg-[#23201D] border border-[#EDE8E0] dark:border-[#332D29] rounded-3xl p-8 shadow-soft">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mx-auto mb-3">
              {searchQuery ? (
                <SearchX className="w-6 h-6" />
              ) : (
                <Coffee className="w-6 h-6" />
              )}
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-white mb-1.5">
              {searchQuery ? 'Sonuç Bulunamadı' : 'Defter Henüz Boş'}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-6 font-light leading-relaxed">
              {searchQuery
                ? `"${searchQuery}" ifadesine uygun bir not bulunamadı. Filtreleri temizlemeyi deneyin.`
                : 'Bir fincan kahve eşliğinde ilk kelimeni ekleyerek öğrenme yolculuğuna başla.'}
            </p>
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLevel('ALL');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5EFE6] hover:bg-[#EDE5DA] dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              >
                Filtreleri Temizle
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingWord(null);
                  setIsWordModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white text-stone-100 dark:text-stone-900 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>İlk Kelimeni Ekle</span>
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
      <footer className="mt-auto py-8 border-t border-[#EDE8E0] dark:border-[#2D2824] text-center text-xs text-stone-400 dark:text-stone-500 font-light">
        <p>VocabCraft ☕ • Sıcak ve huzurlu bir kelime öğrenme deneyimi</p>
      </footer>
    </div>
  );
}
