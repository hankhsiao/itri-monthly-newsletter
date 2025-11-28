import { CSSProperties } from 'react';

/**
 * Email layout constants
 */
export const EMAIL_MAX_WIDTH = '600px';
export const EMAIL_PADDING = '32px 16px';
export const EMAIL_MARGIN_AUTO = '0 auto';

/**
 * Email color constants
 */
export const EMAIL_COLORS = {
  // Primary colors
  primary: '#2563eb',
  // Background colors
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  grayLight: '#eff6ff',
  // Text colors
  textDark: '#111827',
  textDefault: '#1f2937',
  textMuted: '#6b7280',
  textLight: '#9ca3af',
};

/**
 * Email-safe color definitions mapped from category colors
 */
export const EMAIL_CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  A: { bg: '#eff6ff', border: '#3b82f6', text: '#1f2937' },
  B: { bg: '#f0fdf4', border: '#16a34a', text: '#1f2937' },
  C: { bg: '#fffbeb', border: '#f59e0b', text: '#1f2937' },
  T: { bg: '#faf5ff', border: '#a855f7', text: '#1f2937' },
};

/**
 * Tag background color mapping for email
 */
export const EMAIL_TAG_BG_COLORS: Record<string, string> = {
  'bg-blue-100': '#DBEAFE',
  'bg-green-100': '#DCFCE7',
  'bg-amber-100': '#FEF3C7',
  'bg-purple-100': '#F3E8FF',
};

/**
 * Tag text color mapping for email
 */
export const EMAIL_TAG_TEXT_COLORS: Record<string, string> = {
  'text-blue-800': '#1E40AF',
  'text-green-800': '#166534',
  'text-amber-800': '#B45309',
  'text-purple-800': '#6B21A8',
};

/**
 * Email-safe inline styles
 */
export const emailStyles = {
  
  header: {
    wrapper: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '32px 16px',
    } as CSSProperties,
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 8px 0',
    } as CSSProperties,
    subtitle: {
      fontSize: '18px',
      color: '#6b7280',
      margin: 0,
    } as CSSProperties,
    metadata: {
      display: 'block',
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '16px',
    } as CSSProperties,
  },

  contentTable: {
    wrapper: {
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
      padding: '32px 16px',
    } as CSSProperties,
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 24px 0',
    } as CSSProperties,
    category: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1f2937',
      margin: '24px 0 12px 0',
    } as CSSProperties,
    link: {
      display: 'block',
      fontSize: '14px',
      color: '#2563eb',
      textDecoration: 'none',
      padding: '4px 0',
      marginLeft: '12px',
    } as CSSProperties,
  },

  section: {
    wrapper: {
      padding: '32px 16px',
      borderBottom: '1px solid #e5e7eb',
    } as CSSProperties,
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 24px 0',
    } as CSSProperties,
    subtitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#1f2937',
      margin: '24px 0 16px 0',
      paddingBottom: '8px',
      borderBottom: '2px solid #e5e7eb',
    } as CSSProperties,
  },

  article: {
    wrapper: {
      backgroundColor: '#f9fafb',
      borderRadius: '4px',
      padding: '16px',
      marginBottom: '16px',
    } as CSSProperties,
    title: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#2563eb',
      textDecoration: 'none',
      display: 'block',
      margin: '0 0 8px 0',
    } as CSSProperties,
    summary: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0 0 12px 0',
    } as CSSProperties,
    meta: {
      fontSize: '12px',
      color: '#9ca3af',
      margin: 0,
    } as CSSProperties,
  },

  tag: {
    wrapper: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      marginRight: '4px',
      marginBottom: '4px',
    } as CSSProperties,
  },

  event: {
    wrapper: {
      backgroundColor: '#f9fafb',
      borderRadius: '4px',
      padding: '16px',
      marginBottom: '16px',
    } as CSSProperties,
    title: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#2563eb',
      textDecoration: 'none',
      display: 'block',
      margin: '0 0 12px 0',
    } as CSSProperties,
    detail: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0 0 8px 0',
    } as CSSProperties,
    detailLabel: {
      fontWeight: 600,
    } as CSSProperties,
  },

  footer: {
    wrapper: {
      backgroundColor: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      padding: '32px 16px',
      textAlign: 'center',
    } as CSSProperties,
    text: {
      fontSize: '12px',
      color: '#6b7280',
      margin: '0 0 8px 0',
    } as CSSProperties,
    link: {
      color: '#2563eb',
      textDecoration: 'none',
    } as CSSProperties,
  },
};
