export const INITIAL_WORDS = [
  {
    id: "word-1",
    word: "Resilient",
    translation: "Dirençli, çabuk toparlanan, esnek",
    example: "Children are often remarkably resilient in facing new challenges.",
    level: "B2",
    category: "Sıfat • Adjective",
    isLearned: false,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: "word-2",
    word: "Serendipity",
    translation: "Güzel tesadüf, şans eseri gelen tatlı sürpriz",
    example: "Finding my dream book in a small roadside cafe was pure serendipity.",
    level: "C1",
    category: "İsim • Noun",
    isLearned: true,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: "word-3",
    word: "Eloquent",
    translation: "Etkili ve akıcı konuşan, beliğ",
    example: "She gave a calm, eloquent talk by the fireplace.",
    level: "B2",
    category: "Sıfat • Adjective",
    isLearned: false,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: "word-4",
    word: "Endeavor",
    translation: "Samimi gayret, içten çaba, girişim",
    example: "We wish you warmth and peace in all your future endeavors.",
    level: "B1",
    category: "Fiil • İsim",
    isLearned: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "word-5",
    word: "Ephemeral",
    translation: "Geçici, anlık, tatlı bir an gibi kısa ömürlü",
    example: "The soft morning mist over the valley was ephemeral.",
    level: "C2",
    category: "Sıfat • Adjective",
    isLearned: false,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "word-6",
    word: "Cherish",
    translation: "Sevgiyle korumak, değer vermek, bağrına basmak",
    example: "I cherish these peaceful evening study hours with warm tea.",
    level: "A2",
    category: "Fiil • Verb",
    isLearned: true,
    createdAt: new Date().toISOString()
  }
];

export const CEFR_LEVELS = [
  { 
    value: 'A1', 
    label: 'A1 - Başlangıç', 
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40' 
  },
  { 
    value: 'A2', 
    label: 'A2 - Temel', 
    color: 'bg-teal-50 text-teal-800 border-teal-200/60 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40' 
  },
  { 
    value: 'B1', 
    label: 'B1 - Orta', 
    color: 'bg-amber-50 text-amber-800 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40' 
  },
  { 
    value: 'B2', 
    label: 'B2 - İyi', 
    color: 'bg-orange-50 text-orange-800 border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/40' 
  },
  { 
    value: 'C1', 
    label: 'C1 - İleri', 
    color: 'bg-rose-50 text-rose-800 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40' 
  },
  { 
    value: 'C2', 
    label: 'C2 - Usta', 
    color: 'bg-stone-100 text-stone-800 border-stone-300/60 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700/50' 
  }
];

export const getLevelBadgeClass = (level) => {
  const found = CEFR_LEVELS.find(l => l.value === level);
  return found ? found.color : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300';
};
