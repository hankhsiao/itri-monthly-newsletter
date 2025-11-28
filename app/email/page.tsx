import { EmailHeader } from '@/app/components/email/EmailHeader';
import { EmailContentTable } from '@/app/components/email/EmailContentTable';
import { EmailTechInformation } from '@/app/components/email/EmailTechInformation';
import { EmailConferenceEvents } from '@/app/components/email/EmailConferenceEvents';
import { EmailFooter } from '@/app/components/email/EmailFooter';
import { fetchArticlesFromSheet, fetchHeaderInfoFromSheet } from '@/app/data/fetchArticles';
import { fetchConferencesFromSheet } from '@/app/data/fetchConferences';
import { EMAIL_COLORS } from '@/app/data/email-styles';

export default async function EmailPage() {
  const [techArticles, headerInfo, conferenceEvents] = await Promise.all([
    fetchArticlesFromSheet(),
    fetchHeaderInfoFromSheet(),
    fetchConferencesFromSheet(),
  ]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: EMAIL_COLORS.textDefault, backgroundColor: EMAIL_COLORS.white }}>
      <EmailHeader info={headerInfo} />
      <EmailContentTable articles={techArticles} events={conferenceEvents} />
      <EmailTechInformation articles={techArticles} />
      <EmailConferenceEvents events={conferenceEvents} />
      <EmailFooter />
    </div>
  );
}
