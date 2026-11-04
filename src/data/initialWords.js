export const INITIAL_WORDS = [
  {
    id: "word-1",
    word: "Resilient",
    translation: "Dirençli, çabuk toparlanan, esnek",
    example: "Children are often remarkably resilient in facing new challenges.",
    level: "B2",
    category: "Sıfat (Adjective)",
    isLearned: false,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: "word-2",
    word: "Serendipity",
    translation: "Güzel tesadüf, şans eseri gelen mutluluk",
    example: "Finding my dream job while browsing a forum was pure serendipity.",
    level: "C1",
    category: "İsim (Noun)",
    isLearned: true,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: "word-3",
    word: "Eloquent",
    translation: "Etkili ve güzel konuşan, beliğ",
    example: "She gave an eloquent speech that moved the entire audience.",
    level: "B2",
    category: "Sıfat (Adjective)",
    isLearned: false,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: "word-4",
    word: "Endeavor",
    translation: "Çaba, gayret göstermek, girişim",
    example: "We wish you the best in all your future endeavors.",
    level: "B1",
    category: "Fiil / İsim",
    isLearned: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "word-5",
    word: "Ephemeral",
    translation: "Geçici, kısa ömürlü, anlık",
    example: "Fame in the internet age can be quite ephemeral.",
    level: "C2",
    category: "Sıfat (Adjective)",
    isLearned: false,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "word-6",
    word: "Accomplish",
    translation: "Başarmak, üstesinden gelmek",
    example: "If you work consistently, you will accomplish your language goals.",
    level: "A2",
    category: "Fiil (Verb)",
    isLearned: true,
    createdAt: new Date().toISOString()
  }
];

export const CEFR_LEVELS = [
  { value: 'A1', label: 'A1 - Başlangıç', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300/40' },
  { value: 'A2', label: 'A2 - Temel', color: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300/40' },
  { value: 'B1', label: 'B1 - Orta', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300/40' },
  { value: 'B2', label: 'B2 - İyi', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300/40' },
  { value: 'C1', label: 'C1 - İleri', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300/40' },
  { value: 'C2', label: 'C2 - Usta', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300/40' }
];

export const getLevelBadgeClass = (level) => {
  const found = CEFR_LEVELS.find(l => l.value === level);
  return found ? found.color : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
};
