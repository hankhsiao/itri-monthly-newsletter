'use client';

import { TechArticle } from '@/app/data/types';
import { CATEGORIES, CATEGORY_TAG_COLORS, SUBCATEGORY_NAMES } from '@/app/data/categories';
import { groupArticlesByCategory, sortArticlesByDate } from '@/app/lib/grouping-utils';

interface TechInformationProps {
  articles: TechArticle[];
}

export function TechInformation({ articles }: TechInformationProps) {
  const getCategoryColor = (categoryKey: string): { bg: string; text: string } => {
    return CATEGORY_TAG_COLORS[categoryKey] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const grouped = groupArticlesByCategory(articles);

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">科技資訊 (Tech Information)</h2>
        
        <div className="space-y-12">
          {CATEGORIES.map(category => (
            grouped[category.key] && Object.keys(grouped[category.key]).length > 0 && (
              <div key={category.key} className="border-l-4" style={{ borderLeftColor: category.key === 'A' ? '#3b82f6' : category.key === 'B' ? '#16a34a' : category.key === 'C' ? '#f59e0b' : '#a855f7' }}>
                <h3 className={`text-2xl font-bold mb-6 p-4 ${category.color} rounded-t text-gray-900`}>
                  {category.name}
                </h3>
                
                <div className="space-y-8 px-4 pb-8">
                  {category.subcategories.map(subcat => {
                    const subArticles = grouped[category.key][subcat.key];
                    return subArticles && subArticles.length > 0 ? (
                      <div key={subcat.key} id={subcat.key}>
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                          {SUBCATEGORY_NAMES[subcat.key]}
                        </h4>
                        
                        <div className="space-y-4">
                          {sortArticlesByDate(subArticles)
                            .map((article) => (
                              <article
                                key={article.id}
                                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <a
                                          href={article.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-lg font-semibold text-blue-600 hover:text-blue-800 underline block mb-2"
                                        >
                                          {article.title}
                                        </a>
                                        <p className="text-gray-600 text-sm mb-3">
                                          {article.summary}
                                        </p>
                                        {article.tags && article.tags.length > 0 && (
                                          <div className="flex flex-wrap gap-2 mb-3">
                                            {article.tags.map((tag) => {
                                              const colors = getCategoryColor(article.category);
                                              return (
                                                <span
                                                  key={tag}
                                                  className={`inline-block ${colors.bg} ${colors.text} text-xs px-2 py-1 rounded`}
                                                >
                                                  {tag}
                                                </span>
                                              );
                                            })}
                                          </div>
                                        )}
                                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                          <span>{article.source}</span>
                                          <span>•</span>
                                          <span>
                                            {article.date}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            ))}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
