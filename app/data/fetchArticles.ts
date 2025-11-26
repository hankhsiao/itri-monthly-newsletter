import { TechArticle, HeaderInfo } from './types';
import { fetchAndParseCSV, CSVRow } from '@/app/lib/csv';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1ZOOfe8vel4jg199WGvLPlwE8Nk444LjYw7Qwig_Cjo0/export?format=csv&gid=1932562813';
const HEADER_CSV_URL = 'https://docs.google.com/spreadsheets/d/1ZOOfe8vel4jg199WGvLPlwE8Nk444LjYw7Qwig_Cjo0/export?format=csv&gid=1363291738';

export async function fetchArticlesFromSheet(): Promise<TechArticle[]> {
  try {
    const csvRows = await fetchAndParseCSV(CSV_URL);
    
    if (csvRows.length === 0) {
      console.warn('No CSV data found');
      return [];
    }
    
    // Get headers from first row
    const headers = Object.keys(csvRows[0]);
    
    // Convert CSV rows to TechArticle array
    const articles: TechArticle[] = csvRows
      .map((row, index) => {
        try {
          return convertRowToArticle(row, headers, index);
        } catch (error) {
          console.warn(`Failed to convert row ${index}:`, error);
          return null;
        }
      })
      .filter((article): article is TechArticle => article !== null);
    
    return articles;
  } catch (error) {
    console.error('Error fetching articles from Google Sheets:', error);
    return [];
  }
}

function convertRowToArticle(row: CSVRow, headers: string[], index: number): TechArticle | null {
  const title = row['title']?.trim() || '';
  const url = row['url']?.trim() || '';
  
  // Only include articles with title and URL
  if (!title || !url) {
    return null;
  }
  
  const categoryFull = row['category']?.trim() || '';
  const categoryCode = extractCategoryCode(categoryFull);
  
  const subcategoryFull = row['subcategory']?.trim() || '';
  const subcategoryCode = extractSubcategoryCode(subcategoryFull);
  
  // Get the second summary column (summary_9) which has the actual summary text
  // If not available, try the first summary column
  const summaryText = row['summary_9']?.trim() || row['summary']?.trim() || '';
  
  // Parse tags from comma-separated string
  const tagsString = row['tags']?.trim() || '';
  const tags = tagsString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  return {
    id: `article-${index}`,
    title,
    summary: summaryText,
    url,
    category: categoryCode,
    subcategory: subcategoryCode,
    source: row['source']?.trim() || '',
    date: row['date']?.trim() || '',
    image: row['image1']?.trim() || undefined,
    caption: row['caption1']?.trim() || undefined,
    tags,
  };
}

function extractCategoryCode(categoryFull: string): string {
  // Extract code like "C" from "C.永續環境"
  const match = categoryFull.match(/^([A-Z])/);
  return match ? match[1] : '';
}

function extractSubcategoryCode(subcategoryFull: string): string {
  // Extract code like "C2" from "C2-4.農工生產整合"
  const match = subcategoryFull.match(/^([A-Z]\d+)/);
  return match ? match[1] : '';
}

export async function fetchHeaderInfoFromSheet(): Promise<HeaderInfo> {
  try {
    const csvRows = await fetchAndParseCSV(HEADER_CSV_URL);
    
    if (csvRows.length === 0) {
      console.warn('No header CSV data found');
      throw new Error('No header data available');
    }
    
    // Get the first row which contains the header info
    const headerRow = csvRows[0];
    
    return {
      title: headerRow['title']?.trim() || '',
      vol: headerRow['vol']?.trim() || '',
      date: headerRow['date']?.trim() || '',
      editor: headerRow['editor']?.trim() || '',
      publisher: headerRow['publisher']?.trim() || '',
      url: headerRow['url']?.trim() || '',
    };
  } catch (error) {
    console.error('Error fetching header info from Google Sheets:', error);
    throw error;
  }
}
