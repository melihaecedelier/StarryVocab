import React, { useState, useEffect } from 'react';
import { X, Feather, Volume2 } from 'lucide-react';
import { CEFR_LEVELS } from '../data/initialWords';
import { speakWord } from '../utils/speech';

export default function WordModal({
  isOpen,
  onClose,
  onSave,
  editingWord
}) {
  const [formData, setFormData] = useState({
    word: '',
    translation: '',
    example: '',
    level: 'B1',
    category: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingWord) {
      setFormData({
        word: editingWord.word,
        translation: editingWord.translation,
        example: editingWord.example || '',
        level: editingWord.level || 'B1',
        category: editingWord.category || ''
      });
    } else {
      setFormData({
        word: '',
        translation: '',
        example: '',
        level: 'B1',
        category: ''
      });
    }
    setErrors({});
  }, [editingWord, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.word.trim()) errs.word = 'Kelime alanı zorunludur.';
    if (!formData.translation.trim()) errs.translation = 'Türkçe anlam zorunludur.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      word: formData.word.trim(),
      translation: formData.translation.trim(),
      example: formData.example.trim(),
      category: formData.category.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] dark:bg-[#201D1A] border border-[#EDE5DA] dark:border-[#38312B] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE5DA] dark:border-[#2D2722]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <Feather className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
              {editingWord ? 'Notu Düzenle' : 'Deftere Yeni Kelime Ekle'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Word Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Kelime (İngilizce) *
              </label>
              {formData.word.trim() && (
                <button
                  type="button"
                  onClick={() => speakWord(formData.word)}
                  className="text-xs text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1 font-medium"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Dinle
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Örn: Serendipity, Resilient..."
              value={formData.word}
              onChange={(e) => setFormData({ ...formData, word: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#181614] border ${
                errors.word ? 'border-rose-400' : 'border-[#E2D8CB] dark:border-[#38312B]'
              } text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all`}
            />
            {errors.word && <p className="text-xs text-rose-500 mt-1">{errors.word}</p>}
          </div>

          {/* Translation Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Türkçe Anlamı *
            </label>
            <input
              type="text"
              placeholder="Örn: Güzel tesadüf, dirençli..."
              value={formData.translation}
              onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#181614] border ${
                errors.translation ? 'border-rose-400' : 'border-[#E2D8CB] dark:border-[#38312B]'
              } text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all`}
            />
            {errors.translation && <p className="text-xs text-rose-500 mt-1">{errors.translation}</p>}
          </div>

          {/* Level & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CEFR Level */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                CEFR Seviyesi
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#181614] border border-[#E2D8CB] dark:border-[#38312B] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all cursor-pointer font-light"
              >
                {CEFR_LEVELS.map(lvl => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                Kelime Türü / Kategori
              </label>
              <input
                type="text"
                placeholder="Örn: Sıfat, İsim, Fiil"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#181614] border border-[#E2D8CB] dark:border-[#38312B] text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
              />
            </div>
          </div>

          {/* Example Sentence */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Örnek Cümle (İsteğe Bağlı)
            </label>
            <textarea
              rows={2}
              placeholder="Örn: It was a calm and peaceful evening by the hearth."
              value={formData.example}
              onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-white dark:bg-[#181614] border border-[#E2D8CB] dark:border-[#38312B] text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-serif italic"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDE5DA] dark:border-[#2D2722]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white text-stone-50 dark:text-stone-900 shadow-sm active:scale-[0.98] transition-all"
            >
              {editingWord ? 'Değişiklikleri Kaydet' : 'Deftere Kaydet'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
