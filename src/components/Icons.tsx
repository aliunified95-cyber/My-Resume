const base = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, 'aria-hidden': true, focusable: false } as const;

export const DownloadIcon = () => (
  <svg {...base}><path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M3 13h10" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const ArrowIcon = () => (
  <svg {...base}><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const ArrowUpRightIcon = () => (
  <svg {...base}><path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const MailIcon = () => (
  <svg {...base}><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" strokeLinejoin="round" /></svg>
);
export const PhoneIcon = () => (
  <svg {...base}><path d="M5.5 2.5 3.5 3c-.6 4.8 3.9 9.4 9.5 9.5l.5-2-2.6-1.2-1.3 1.3C8 9.9 6.1 8 5.4 6.4l1.3-1.3z" strokeLinejoin="round" /></svg>
);
export const LinkedInIcon = () => (
  <svg {...base}><rect x="2" y="2" width="12" height="12" rx="2" /><path d="M5 7v4M5 5v.01M8 11V7m0 1.8c0-1 .8-1.8 1.8-1.8S11 7.8 11 8.8V11" strokeLinecap="round" /></svg>
);
export const PrintIcon = () => (
  <svg {...base}><path d="M4.5 6V2.5h7V6M4.5 11H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.5M4.5 9h7v4.5h-7z" strokeLinejoin="round" /></svg>
);
