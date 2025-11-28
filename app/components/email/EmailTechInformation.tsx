import { TechArticle } from '@/app/data/types';
import { CATEGORIES, CATEGORY_TAG_COLORS, SUBCATEGORY_NAMES } from '@/app/data/categories';
import { groupArticlesByCategory, sortArticlesByDate } from '@/app/lib/grouping-utils';
import { emailStyles, EMAIL_CATEGORY_COLORS, EMAIL_MAX_WIDTH, EMAIL_MARGIN_AUTO, EMAIL_COLORS, EMAIL_TAG_BG_COLORS, EMAIL_TAG_TEXT_COLORS } from '@/app/data/email-styles';

interface EmailTechInformationProps {
  articles: TechArticle[];
}

export function EmailTechInformation({ articles }: EmailTechInformationProps) {
  const getCategoryColor = (categoryKey: string): { bg: string; text: string } => {
    return CATEGORY_TAG_COLORS[categoryKey] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const grouped = groupArticlesByCategory(articles);

  return (
    <section style={emailStyles.section.wrapper}>
      <div style={{ maxWidth: EMAIL_MAX_WIDTH, margin: EMAIL_MARGIN_AUTO }}>
        <h2 style={emailStyles.section.title}>科技資訊 (Tech Information)</h2>

        <div>
          {CATEGORIES.map(category => (
            grouped[category.key] && Object.keys(grouped[category.key]).length > 0 && (
              <div
                key={category.key}
                style={{
                  marginBottom: '32px',
                  borderLeft: `4px solid ${EMAIL_CATEGORY_COLORS[category.key]?.border || EMAIL_COLORS.gray50}`,
                  paddingLeft: '0',
                }}
              >
                <h3
                  style={{
                    ...emailStyles.section.title,
                    backgroundColor: EMAIL_CATEGORY_COLORS[category.key]?.bg || EMAIL_COLORS.gray50,
                    margin: '0 0 16px 0',
                    padding: '16px',
                    borderRadius: '4px 4px 0 0',
                  }}
                >
                  {category.name}
                </h3>

                <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                  {category.subcategories.map(subcat => {
                    const subArticles = grouped[category.key][subcat.key];
                    return subArticles && subArticles.length > 0 ? (
                      <div key={subcat.key} id={subcat.key} style={{ marginBottom: '24px' }}>
                        <h4
                          style={{
                            ...emailStyles.section.subtitle,
                            margin: '0 0 16px 0',
                          }}
                        >
                          {SUBCATEGORY_NAMES[subcat.key]}
                        </h4>

                        <div>
                          {sortArticlesByDate(subArticles)
                            .map(article => (
                              <article key={article.id} style={emailStyles.article.wrapper}>
                                <a
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={emailStyles.article.title}
                                >
                                  {article.title}
                                </a>

                                <p style={emailStyles.article.summary}>{article.summary}</p>

                                {article.tags && article.tags.length > 0 && (
                                  <div style={{ marginBottom: '12px' }}>
                                    {article.tags.map((tag, tagIdx) => {
                                      const colors = getCategoryColor(article.category);

                                      return (
                                        <span
                                          key={`tag-${tagIdx}`}
                                          style={{
                                            ...emailStyles.tag.wrapper,
                                            backgroundColor: EMAIL_TAG_BG_COLORS[colors.bg] || EMAIL_COLORS.gray100,
                                            color: EMAIL_TAG_TEXT_COLORS[colors.text] || EMAIL_COLORS.textDefault,
                                          }}
                                        >
                                          {tag}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}

                                <p style={emailStyles.article.meta}>
                                  <span>{article.source}</span>
                                  <span> • </span>
                                  <span>{article.date}</span>
                                </p>
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
