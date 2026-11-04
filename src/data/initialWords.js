export const INITIAL_WORDS = [
  {
    id: "word-1",
    word: "Ethereal",
    translation: "Rüya gibi, göksel, tarifsiz derecede zarif ve hafif",
    example: "The evening twilight had an ethereal lavender glow behind the clouds.",
    level: "C1",
    category: "Sıfat • Adjective",
    isLearned: true,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: "word-2",
    word: "Luminescence",
    translation: "Işıltı, soğuk parıltı, yıldız parlaması",
    example: "The gentle luminescence of the night sky illuminated our path.",
    level: "B2",
    category: "İsim • Noun",
    isLearned: false,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: "word-3",
    word: "Serendipity",
    translation: "Güzel tesadüf, yıldızların denk getirdiği tatlı şans",
    example: "Finding my favorite poetry notebook under the stars was serendipity.",
    level: "B2",
    category: "İsim • Noun",
    isLearned: true,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: "word-4",
    word: "Petrichor",
    translation: "Yağmur sonrası yükselen bulut ve toprak kokusu",
    example: "The sweet petrichor filled the air after the evening rain.",
    level: "C2",
    category: "İsim • Noun",
    isLearned: false,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "word-5",
    word: "Halcyon",
    translation: "Huzurlu, dingin, altın çağ gibi masalsı sakinlik",
    example: "She recalled the halcyon days spent watching the drifting clouds.",
    level: "B1",
    category: "Sıfat • Adjective",
    isLearned: false,
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "word-6",
    word: "Resilient",
    translation: "Dirençli, her fırtınadan sonra yeniden parlayan",
    example: "Like stars behind the darkest clouds, she remained resilient.",
    level: "A2",
    category: "Sıfat • Adjective",
    isLearned: false,
    createdAt: new Date().toISOString()
  }
];

export const CEFR_LEVELS = [
  { 
    value: 'A1', 
    label: 'A1 • Başlangıç', 
    color: 'bg-pink-50 text-pink-700 border-pink-200/70 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/40' 
  },
  { 
    value: 'A2', 
    label: 'A2 • Temel', 
    color: 'bg-purple-50 text-purple-700 border-purple-200/70 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40' 
  },
  { 
    value: 'B1', 
    label: 'B1 • Orta', 
    color: 'bg-violet-50 text-violet-700 border-violet-200/70 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/40' 
  },
  { 
    value: 'B2', 
    label: 'B2 • İyi', 
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200/70 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/40' 
  },
  { 
    value: 'C1', 
    label: 'C1 • İleri', 
    color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/70 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-800/40' 
  },
  { 
    value: 'C2', 
    label: 'C2 • Usta', 
    color: 'bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40' 
  }
];

export const getLevelBadgeClass = (level) => {
  const found = CEFR_LEVELS.find(l => l.value === level);
  return found ? found.color : 'bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
};
