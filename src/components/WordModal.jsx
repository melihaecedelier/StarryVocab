import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingWord ? 'Kelimeyi Düzenle' : 'Yeni Kelime Ekle'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Word Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Kelime (İngilizce) *
              </label>
              {formData.word.trim() && (
                <button
                  type="button"
                  onClick={() => speakWord(formData.word)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Dinle
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Örn: Resilient, Ephemeral..."
              value={formData.word}
              onChange={(e) => setFormData({ ...formData, word: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border ${
                errors.word ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
            />
            {errors.word && <p className="text-xs text-rose-500 mt-1">{errors.word}</p>}
          </div>

          {/* Translation Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Türkçe Anlamı *
            </label>
            <input
              type="text"
              placeholder="Örn: Dirençli, esnek..."
              value={formData.translation}
              onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border ${
                errors.translation ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all`}
            />
            {errors.translation && <p className="text-xs text-rose-500 mt-1">{errors.translation}</p>}
          </div>

          {/* Level & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CEFR Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                CEFR Seviyesi
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {CEFR_LEVELS.map(lvl => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category / Part of Speech */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Kategori / Kelime Türü
              </label>
              <input
                type="text"
                placeholder="Örn: Sıfat, İsim, Deyim"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Example Sentence */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Örnek Cümle (İsteğe Bağlı)
            </label>
            <textarea
              rows={2}
              placeholder="Örn: She showed resilient spirit throughout the journey."
              value={formData.example}
              onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-[0.98] transition-all"
            >
              {editingWord ? 'Değişiklikleri Kaydet' : 'Kelimeyi Ekle'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
