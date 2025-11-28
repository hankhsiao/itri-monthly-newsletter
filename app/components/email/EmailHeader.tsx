import { HeaderInfo } from '@/app/data/types';
import { emailStyles, EMAIL_MAX_WIDTH, EMAIL_MARGIN_AUTO, EMAIL_COLORS } from '@/app/data/email-styles';

interface EmailHeaderProps {
  info: HeaderInfo;
}

export function EmailHeader({ info }: EmailHeaderProps) {
  return (
    <header style={emailStyles.header.wrapper}>
      <div style={{ maxWidth: EMAIL_MAX_WIDTH, margin: EMAIL_MARGIN_AUTO }}>
        <h1 style={emailStyles.header.title}>{info.title}</h1>
        <p style={emailStyles.header.subtitle}>
          Volume {info.vol} • {info.date}
        </p>

        <div style={emailStyles.header.metadata}>
          <div style={{ marginBottom: '12px' }}>
            <strong>編輯:</strong> {info.editor}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>工研院北美公司總經理:</strong> {info.publisher}
          </div>
          <div>
            <strong>Website:</strong>{' '}
            <a href={info.url} target="_blank" rel="noopener noreferrer" style={{ color: EMAIL_COLORS.primary, textDecoration: 'none' }}>
              ITRI Newsletter
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
