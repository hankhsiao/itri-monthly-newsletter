export interface Subcategory {
  key: string;
  name: string;
}

export interface Category {
  key: string;
  name: string;
  color: string;
  tagBg: string;
  tagText: string;
  subcategories: Subcategory[];
}

export const CATEGORIES: Category[] = [
  {
    key: 'A',
    name: '智慧生活 (Smart Living)',
    color: 'bg-blue-50',
    tagBg: 'bg-blue-100',
    tagText: 'text-blue-800',
    subcategories: [
      { key: 'A1', name: 'A1. 個人化裝置與服務 (Personalized Devices & Services)' },
      { key: 'A2', name: 'A2. 自主移動系統 (Autonomous Mobility Systems)' },
      { key: 'A3', name: 'A3. 智慧產業及服務 (Smart Industry & Services)' },
    ],
  },
  {
    key: 'B',
    name: '健康樂活 (Health & Wellness)',
    color: 'bg-green-50',
    tagBg: 'bg-green-100',
    tagText: 'text-green-800',
    subcategories: [
      { key: 'B1', name: 'B1. 智慧醫療 (Smart Healthcare)' },
      { key: 'B2', name: 'B2. 健康照護 (Health Management)' },
    ],
  },
  {
    key: 'C',
    name: '永續環境 (Sustainable Environment)',
    color: 'bg-amber-50',
    tagBg: 'bg-amber-100',
    tagText: 'text-amber-800',
    subcategories: [
      { key: 'C1', name: 'C1. 循環經濟 (Circular Economy)' },
      { key: 'C2', name: 'C2. 智慧製造 (Smart Manufacturing)' },
      { key: 'C3', name: 'C3. 綠能系統與環境科技 (Green Energy & Environmental Tech)' },
    ],
  },
  {
    key: 'T',
    name: '智慧化智能技術 (Intelligent Enabling Technology)',
    color: 'bg-purple-50',
    tagBg: 'bg-purple-100',
    tagText: 'text-purple-800',
    subcategories: [
      { key: 'T1', name: 'T1. 人工智慧技術 (AI Technology)' },
      { key: 'T2', name: 'T2. 半導體晶片技術 (Semiconductor Chip Technology)' },
      { key: 'T3', name: 'T3. 通訊技術 (Communication Technology)' },
      { key: 'T4', name: 'T4. 資安與雲端技術 (Cybersecurity & Cloud Technology)' },
    ],
  },
];

// Derive category colors map for tags
export const CATEGORY_TAG_COLORS: Record<string, { bg: string; text: string }> = {};
CATEGORIES.forEach(category => {
  CATEGORY_TAG_COLORS[category.key] = {
    bg: category.tagBg,
    text: category.tagText,
  };
});
