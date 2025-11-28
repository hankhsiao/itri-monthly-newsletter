import { emailStyles, EMAIL_MAX_WIDTH, EMAIL_MARGIN_AUTO, EMAIL_COLORS } from '@/app/data/email-styles';

export function EmailFooter() {
  return (
    <footer style={emailStyles.footer.wrapper}>
      <div style={{ maxWidth: EMAIL_MAX_WIDTH, margin: EMAIL_MARGIN_AUTO }}>
        <p style={emailStyles.footer.text}>
          © 2025 Industrial Technology Research Institute (ITRI). All rights reserved.
        </p>
        <p style={emailStyles.footer.text}>
          For more information, visit{' '}
          <a
            href="https://www.itri.org.tw"
            target="_blank"
            rel="noopener noreferrer"
            style={emailStyles.footer.link}
          >
            www.itri.org.tw
          </a>
        </p>
        <p style={{ ...emailStyles.footer.text, fontSize: '11px', marginTop: '16px' }}>
          This is an email-compatible version of the ITRI Monthly Newsletter.{' '}
          <a
            href="https://itri-monthly-newsletter.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={emailStyles.footer.link}
          >
            View full version online
          </a>
        </p>
      </div>
    </footer>
  );
}
