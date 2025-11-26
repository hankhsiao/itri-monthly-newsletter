export interface HeaderInfo {
  title: string;
  vol: string;
  date: string;
  editor: string;
  publisher: string;
  url: string;
}

export interface TechArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  category: string;
  subcategory: string;
  source: string;
  date: string;
  image?: string;
  caption?: string;
}

export interface TechCategory {
  key: string;
  name: string;
  subcategories: TechSubcategory[];
}

export interface TechSubcategory {
  key: string;
  name: string;
  articles: TechArticle[];
}
