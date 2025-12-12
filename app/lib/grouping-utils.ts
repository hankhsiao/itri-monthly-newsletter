import { TechArticle, ConferenceEvent } from '@/app/data/types';
import { CATEGORIES } from '@/app/data/categories';

/**
 * Groups articles by category and subcategory
 * Maintains the structure defined in CATEGORIES
 */
export function groupArticlesByCategory(articles: TechArticle[]) {
  const result: Record<string, Record<string, TechArticle[]>> = {};
  
  CATEGORIES.forEach(category => {
    result[category.key] = {};
    category.subcategories.forEach(subcat => {
      result[category.key][subcat.key] = [];
    });
  });
  
  articles.forEach(article => {
    const catKey = article.category;
    const subKey = article.subcategory;
    
    if (result[catKey] && result[catKey][subKey]) {
      result[catKey][subKey].push(article);
    }
  });
  
  return result;
}

/**
 * Sorts articles by tag first, then by date (newest first) with stable sort by ID
 */
export function sortArticlesByDate(articles: TechArticle[]): TechArticle[] {
  return [...articles].sort((a, b) => {
    // Get primary tag from each article (first tag)
    const tagA = a.tags && a.tags.length > 0 ? a.tags[0] : '';
    const tagB = b.tags && b.tags.length > 0 ? b.tags[0] : '';
    
    // First, sort by tag
    if (tagA !== tagB) {
      return tagA.localeCompare(tagB);
    }
    
    // If tags are the same, sort by date (newest first)
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA !== dateB) {
      return dateB - dateA;
    }
    
    // If dates are also the same, sort by ID for stable ordering
    return a.id.localeCompare(b.id);
  });
}

/**
 * Sorts event categories with "Others" always at the end
 */
export function sortEventsByCategory(categories: string[]): string[] {
  return categories.sort((a, b) => {
    if (a === 'Others') {
      return 1;
    }
    if (b === 'Others') {
      return -1;
    }
    return a.localeCompare(b, 'zh-Hant');
  });
}

/**
 * Groups conference events by category
 * Returns grouped events and sorted category list
 */
export function groupEventsByCategory(events: ConferenceEvent[]) {
  // Sort events by startDate (newest first) before grouping
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  const grouped: Record<string, ConferenceEvent[]> = {};
  
  sortedEvents.forEach(event => {
    const category = event.category || 'Others';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(event);
  });
  
  // Sort categories using the dedicated function
  const categories = sortEventsByCategory(Object.keys(grouped));
  
  return { grouped, categories };
}

/**
 * Formats a date range for display
 */
export function formatDateRange(startDate: string, endDate: string): string {
  if (!startDate && !endDate) {
    return '';
  }
  if (!endDate) {
    return startDate;
  }
  if (startDate === endDate) {
    return startDate;
  }
  return `${startDate} - ${endDate}`;
}

/**
 * Generates a Google Maps URL from a location string
 */
export function getGoogleMapsUrl(location: string): string {
  return `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
}

/**
 * Gets the display name for a subcategory key
 * @deprecated Use SUBCATEGORY_NAMES from categories.ts instead for better performance
 */
export function getSubcategoryName(subcategoryKey: string): string {
  for (const category of CATEGORIES) {
    const subcat = category.subcategories.find(s => s.key === subcategoryKey);
    if (subcat) {
      return subcat.name;
    }
  }
  return subcategoryKey;
}

/**
 * Collects all existing categories from articles
 */
export function getExistingCategories(articles: TechArticle[]): Set<string> {
  return new Set(articles.map(a => a.category));
}

/**
 * Collects all existing subcategories from articles
 */
export function getExistingSubcategories(articles: TechArticle[]): Set<string> {
  return new Set(articles.map(a => a.subcategory));
}
