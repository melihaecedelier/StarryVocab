import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Star } from 'lucide-react';
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
    if (!formData.word.trim()) errs.word = 'Kelime alanı boş bırakılamaz.';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="backdrop-blur-2xl bg-white/95 dark:bg-[#1D1735]/95 border border-purple-200/90 dark:border-purple-800/60 rounded-3xl w-full max-w-lg shadow-cloud-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-purple-100 dark:border-purple-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-twinkle" />
            </div>
            <h2 className="font-display text-lg font-bold text-purple-950 dark:text-white">
              {editingWord ? 'Yıldızı Düzenle' : 'Gökyüzüne Yeni Kelime Ekle ✨'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-purple-400 hover:text-purple-700 dark:hover:text-purple-200 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Word Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Kelime (İngilizce) *
              </label>
              {formData.word.trim() && (
                <button
                  type="button"
                  onClick={() => speakWord(formData.word)}
                  className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Dinle
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Örn: Ethereal, Luminescence, Serendipity..."
              value={formData.word}
              onChange={(e) => setFormData({ ...formData, word: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-2xl text-sm bg-purple-50/50 dark:bg-[#151128] border ${
                errors.word ? 'border-rose-400' : 'border-purple-200/80 dark:border-purple-800/60'
              } text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all font-medium`}
            />
            {errors.word && <p className="text-xs text-rose-500 mt-1">{errors.word}</p>}
          </div>

          {/* Translation Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-1.5">
              Türkçe Anlamı *
            </label>
            <input
              type="text"
              placeholder="Örn: Rüya gibi göksel, ışıltı..."
              value={formData.translation}
              onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-2xl text-sm bg-purple-50/50 dark:bg-[#151128] border ${
                errors.translation ? 'border-rose-400' : 'border-purple-200/80 dark:border-purple-800/60'
              } text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all font-medium`}
            />
            {errors.translation && <p className="text-xs text-rose-500 mt-1">{errors.translation}</p>}
          </div>

          {/* Level & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CEFR Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-1.5">
                CEFR Seviyesi
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl text-sm bg-purple-50/50 dark:bg-[#151128] border border-purple-200/80 dark:border-purple-800/60 text-purple-950 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all cursor-pointer font-medium"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-1.5">
                Kategori / Tür
              </label>
              <input
                type="text"
                placeholder="Örn: Sıfat, İsim, Deyim"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl text-sm bg-purple-50/50 dark:bg-[#151128] border border-purple-200/80 dark:border-purple-800/60 text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Example Sentence */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-1.5">
              Örnek Cümle (İsteğe Bağlı)
            </label>
            <textarea
              rows={2}
              placeholder="Örn: The night sky was filled with ethereal luminescence."
              value={formData.example}
              onChange={(e) => setFormData({ ...formData, example: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl text-sm bg-purple-50/50 dark:bg-[#151128] border border-purple-200/80 dark:border-purple-800/60 text-purple-950 dark:text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all italic font-light"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100 dark:border-purple-900/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-cloud shadow-purple-500/25 active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{editingWord ? 'Değişiklikleri Kaydet' : 'Yıldızı Ekle'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
