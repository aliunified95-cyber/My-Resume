import { contactLinks, personalDetails } from '../data/resume';
import { isPlaceholder } from './Text';
import { ArrowIcon, DownloadIcon } from './Icons';

interface Props {
  variant?: 'primary' | 'ghost' | 'quiet';
  className?: string;
}

/**
 * "Download CV". When `personalDetails.cvFile` is empty the button opens the
 * printable résumé view instead (which explains the PDF is on its way and can
 * be saved with Print → Save as PDF), so it never leads to a broken link.
 */
export function CvButton({ variant = 'primary', className = '' }: Props) {
  const file = personalDetails.cvFile;
  const cls = `btn btn--${variant} ${className}`.trim();
  if (file) {
    return (
      <a className={cls} href={file} download>
        <span>Download CV</span>
        <DownloadIcon />
      </a>
    );
  }
  return (
    <a className={cls} href="#resume" data-cv-missing="true">
      <span>Download CV</span>
      <DownloadIcon />
    </a>
  );
}

export function ContactButton({ variant = 'ghost', className = '' }: Props) {
  return (
    <a className={`btn btn--${variant} ${className}`.trim()} href="#contact">
      <span>Contact me</span>
      <ArrowIcon />
    </a>
  );
}

export function emailHref(): string | undefined {
  const e = contactLinks.email;
  return e && !isPlaceholder(e) ? `mailto:${e}` : undefined;
}

export function linkedInHref(): string | undefined {
  const l = contactLinks.linkedIn;
  return l && !isPlaceholder(l) ? l : undefined;
}

export function phoneHref(): string | undefined {
  const p = contactLinks.phone;
  return p && !isPlaceholder(p) ? `tel:${p.replace(/[^+\d]/g, '')}` : undefined;
}
