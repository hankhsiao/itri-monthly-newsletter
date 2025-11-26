export interface CSVRow {
  [key: string]: string;
}

/**
 * Parses CSV content and returns an array of objects with column names as keys
 */
export async function fetchAndParseCSV(csvUrl: string): Promise<CSVRow[]> {
  const response = await fetch(csvUrl, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  }

  const csvText = await response.text();
  return parseCSVContent(csvText);
}

function parseCSVContent(csvText: string): CSVRow[] {
  const lines = csvText.trim().split('\n');

  if (lines.length < 2) {
    return [];
  }

  // Parse header row
  const headerLine = lines[0];
  const headers = parseCSVLine(headerLine);

  // Clean up headers (remove \r, trim whitespace)
  const cleanedHeaders = headers.map((h) => h.trim().replace(/\r/g, ''));

  // Parse data rows
  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const values = parseCSVLine(line);
    const row: CSVRow = {};

    // Map values to header keys, handling duplicate column names with suffixes
    cleanedHeaders.forEach((header, index) => {
      let key = header;

      // If this header already exists, add index suffix
      if (key in row) {
        key = `${header}_${index}`;
      }

      row[key] = (values[index] || '').trim();
    });

    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // Field separator
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}
