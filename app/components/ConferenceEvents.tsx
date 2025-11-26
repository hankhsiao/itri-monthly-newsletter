'use client';

import { ConferenceEvent } from '@/app/data/types';

interface ConferenceEventsProps {
  events: ConferenceEvent[];
}

export function ConferenceEvents({ events }: ConferenceEventsProps) {
  // Group events by category, with "Others" at the bottom
  const groupByCategory = (events: ConferenceEvent[]) => {
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
    
    // Sort categories: all except "Others" first, then "Others"
    const categories = Object.keys(grouped).sort((a, b) => {
      if (a === 'Others') return 1;
      if (b === 'Others') return -1;
      return a.localeCompare(b, 'zh-Hant');
    });
    
    return { grouped, categories };
  };

  const { grouped, categories } = groupByCategory(events);

  const getGoogleMapsUrl = (location: string): string => {
    return `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
  };

  const formatDateRange = (startDate: string, endDate: string): string => {
    if (!startDate && !endDate) return '';
    if (!endDate) return startDate;
    if (startDate === endDate) return startDate;
    return `${startDate} - ${endDate}`;
  };

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">北美研討會訊息 (Conference Events)</h2>
        
        {events.length === 0 ? (
          <p className="text-gray-600">No conference events available</p>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category} id={`conference-category-${category}`}>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                  {category}
                </h3>
                
                <div className="space-y-4">
                  {grouped[category].map((event) => (
                      <div
                        key={event.id}
                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col gap-3">
                          {/* Title */}
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-600 hover:text-blue-800 underline"
                          >
                            {event.title}
                          </a>

                          {/* Date Range */}
                          {(event.startDate || event.endDate) && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">📅</span>
                              <span>{formatDateRange(event.startDate, event.endDate)}</span>
                            </div>
                          )}

                          {/* Location with Google Maps Link */}
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">📍</span>
                              <a
                                href={getGoogleMapsUrl(event.location)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                {event.location}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
