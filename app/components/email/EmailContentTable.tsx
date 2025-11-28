import { TechArticle, ConferenceEvent } from '@/app/data/types';
import { CATEGORIES } from '@/app/data/categories';
import { getExistingCategories, getExistingSubcategories, sortEventsByCategory } from '@/app/lib/grouping-utils';
import { emailStyles, EMAIL_CATEGORY_COLORS, EMAIL_MAX_WIDTH, EMAIL_MARGIN_AUTO, EMAIL_COLORS } from '@/app/data/email-styles';

interface EmailContentTableProps {
  articles: TechArticle[];
  events?: ConferenceEvent[];
}

export function EmailContentTable({ articles, events = [] }: EmailContentTableProps) {
  const existingCategories = getExistingCategories(articles);
  const existingSubcategories = getExistingSubcategories(articles);
  const hasConferenceEvents = events.length > 0;

  return (
    <nav style={emailStyles.contentTable.wrapper}>
      <div style={{ maxWidth: EMAIL_MAX_WIDTH, margin: EMAIL_MARGIN_AUTO }}>
        <h2 style={emailStyles.contentTable.title}>目錄 (Table of Contents)</h2>

        <div>
          {CATEGORIES.map(category => (
            existingCategories.has(category.key) && (
              <div key={category.key} style={{ marginBottom: '20px' }}>
                <h3 style={emailStyles.contentTable.category}>{category.name}</h3>

                <div
                  style={{
                    backgroundColor: EMAIL_CATEGORY_COLORS[category.key]?.bg || EMAIL_COLORS.gray50,
                    borderRadius: '4px',
                    padding: '12px',
                  }}
                >
                  {category.subcategories
                    .filter(subcat => existingSubcategories.has(subcat.key))
                    .map(subcat => (
                      <div key={subcat.key}>
                        <a
                          href={`#${subcat.key}`}
                          style={{
                            ...{ display: 'block' },
                            color: EMAIL_COLORS.primary,
                            textDecoration: 'none',
                            fontSize: '14px',
                            padding: '4px 0',
                            marginLeft: '12px',
                          }}
                        >
                          • {subcat.name}
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            )
          ))}

          {hasConferenceEvents && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={emailStyles.contentTable.category}>北美研討會訊息 (Conference Events)</h3>

              <div
                style={{
                  backgroundColor: EMAIL_COLORS.gray100,
                  borderRadius: '4px',
                  padding: '12px',
                }}
              >
                {sortEventsByCategory(Array.from(new Set(events.map(e => e.category))))
                  .map(category => (
                    <div key={`category-${category}`}>
                      <a
                        href={`#conference-category-${category}`}
                        style={{
                          ...{ display: 'block' },
                          color: EMAIL_COLORS.primary,
                          textDecoration: 'none',
                          fontSize: '14px',
                          padding: '4px 0',
                          marginLeft: '12px',
                        }}
                      >
                        • {category}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
