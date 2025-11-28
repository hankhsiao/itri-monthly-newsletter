'use client';

import { TechArticle, ConferenceEvent } from '@/app/data/types';
import { CATEGORIES } from '@/app/data/categories';
import { getExistingCategories, getExistingSubcategories, sortEventsByCategory } from '@/app/lib/grouping-utils';

interface ContentTableProps {
  articles: TechArticle[];
  events?: ConferenceEvent[];
}

export function ContentTable({ articles, events = [] }: ContentTableProps) {
  const existingCategories = getExistingCategories(articles);
  const existingSubcategories = getExistingSubcategories(articles);

  // Check if we have conference events
  const hasConferenceEvents = events.length > 0;

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">目錄 (Table of Contents)</h2>
        
        <div className="space-y-6">
          {CATEGORIES.map(category => (
            existingCategories.has(category.key) && (
              <div key={category.key}>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {category.name}
                </h3>
                
                <div className={`${category.color} rounded-lg p-4 space-y-2`}>
                  {category.subcategories
                    .filter(subcat => existingSubcategories.has(subcat.key))
                    .map(subcat => (
                      <button
                        key={subcat.key}
                        onClick={() => handleScroll(subcat.key)}
                        className="block text-left text-blue-600 hover:text-blue-800 hover:underline text-sm w-full"
                      >
                        • {subcat.name}
                      </button>
                    ))}
                </div>
              </div>
            )
          ))}

          {hasConferenceEvents && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                北美研討會訊息 (Conference Events)
              </h3>
              
              <div className="bg-gray-100 rounded-lg p-4 space-y-2">
                {sortEventsByCategory(Array.from(new Set(events.map(e => e.category))))
                  .map(category => (
                    <button
                      key={`category-${category}`}
                      onClick={() => handleScroll(`conference-category-${category}`)}
                      className="block text-left text-blue-600 hover:text-blue-800 hover:underline text-sm w-full"
                    >
                      • {category}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
