import { ConferenceEvent } from '@/app/data/types';
import { groupEventsByCategory, formatDateRange, getGoogleMapsUrl } from '@/app/lib/grouping-utils';
import { emailStyles, EMAIL_MAX_WIDTH, EMAIL_MARGIN_AUTO, EMAIL_COLORS } from '@/app/data/email-styles';

interface EmailConferenceEventsProps {
  events: ConferenceEvent[];
}

export function EmailConferenceEvents({ events }: EmailConferenceEventsProps) {
  const { grouped, categories } = groupEventsByCategory(events);

  return (
    <section style={emailStyles.section.wrapper}>
      <div style={{ maxWidth: EMAIL_MAX_WIDTH, margin: EMAIL_MARGIN_AUTO }}>
        <h2 style={emailStyles.section.title}>北美研討會訊息 (Conference Events)</h2>

        {events.length === 0 ? (
          <p style={{ color: EMAIL_COLORS.textMuted }}>No conference events available</p>
        ) : (
          <div>
            {categories.map((category) => (
              <div key={category} id={`conference-category-${category}`} style={{ marginBottom: '32px' }}>
                <h3 style={emailStyles.section.subtitle}>{category}</h3>

                <div>
                  {grouped[category].map((event) => (
                    <div key={event.id} style={emailStyles.event.wrapper}>
                      {/* Title */}
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={emailStyles.event.title}
                      >
                        {event.title}
                      </a>

                      {/* Date Range */}
                      {(event.startDate || event.endDate) && (
                        <div style={emailStyles.event.detail}>
                          <span style={emailStyles.event.detailLabel}>📅 Date:</span> {formatDateRange(event.startDate, event.endDate)}
                        </div>
                      )}

                      {/* Location with Google Maps Link */}
                      {event.location && (
                        <div style={emailStyles.event.detail}>
                          <span style={emailStyles.event.detailLabel}>📍 Location:</span>{' '}
                          <a
                            href={getGoogleMapsUrl(event.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: EMAIL_COLORS.primary, textDecoration: 'none' }}
                          >
                            {event.location}
                          </a>
                        </div>
                      )}
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
