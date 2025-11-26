import { ConferenceEvent } from './types';
import { fetchAndParseCSV, CSVRow } from '@/app/lib/csv';

const CONFERENCE_CSV_URL = 'https://docs.google.com/spreadsheets/d/1ZOOfe8vel4jg199WGvLPlwE8Nk444LjYw7Qwig_Cjo0/export?format=csv&gid=1333595318';

export async function fetchConferencesFromSheet(): Promise<ConferenceEvent[]> {
  try {
    const csvRows = await fetchAndParseCSV(CONFERENCE_CSV_URL);
    
    if (csvRows.length === 0) {
      console.warn('No conference CSV data found');
      return [];
    }
    
    // Get headers from first row
    const headers = Object.keys(csvRows[0]);
    
    // Convert CSV rows to ConferenceEvent array
    const events: ConferenceEvent[] = csvRows
      .map((row, index) => {
        try {
          return convertRowToEvent(row, index);
        } catch (error) {
          console.warn(`Failed to convert conference row ${index}:`, error);
          return null;
        }
      })
      .filter((event): event is ConferenceEvent => event !== null);
    
    return events;
  } catch (error) {
    console.error('Error fetching conferences from Google Sheets:', error);
    return [];
  }
}

function convertRowToEvent(row: CSVRow, index: number): ConferenceEvent | null {
  const title = row['title']?.trim() || '';
  const url = row['url']?.trim() || '';
  
  // Only include events with title
  if (!title) {
    return null;
  }
  
  const category = row['category']?.trim() || 'Others';
  const startDate = row['start_date']?.trim() || '';
  const endDate = row['end_date']?.trim() || '';
  const location = row['location']?.trim() || '';
  
  return {
    id: `conference-${index}`,
    title,
    url,
    category,
    startDate,
    endDate,
    location,
  };
}
