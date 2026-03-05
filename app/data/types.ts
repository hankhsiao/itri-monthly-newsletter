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
  tags: string[];
  /**
   * 1-based display index within the article's major category (A/B/C/T),
   * counted sequentially across all subcategories ordered by tag → date desc → id.
   * Assigned by groupArticlesByCategory().
   */
  categoryIndex?: number;
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

export interface ConferenceEvent {
  id: string;
  title: string;
  url: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
}

