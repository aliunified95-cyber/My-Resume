import { useState, type FormEvent } from 'react';
import { contactLinks, personalDetails } from '../data/resume';
import { CvButton, emailHref, linkedInHref, phoneHref } from './Actions';
import { ArrowUpRightIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons';
import { Text } from './Text';

type Status = { kind: 'idle' | 'sending' | 'sent' | 'error' | 'info'; message?: string };

function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);

    if (contactLinks.formEndpoint) {
      setStatus({ kind: 'sending', message: 'Sending…' });
      try {
        const res = await fetch(contactLinks.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus({ kind: 'sent', message: 'Thank you — your message has been sent.' });
      } catch {
        setStatus({ kind: 'error', message: 'Sorry, the message could not be sent. Please email me directly instead.' });
      }
      return;
    }

    // No form service configured: open the visitor's email app, pre-filled.
    const href = emailHref();
    if (!href) {
      setStatus({ kind: 'info', message: 'Email address not added yet — please connect via LinkedIn for now.' });
      return;
    }
    const subject = `Hello from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`;
    window.location.href = `${href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: 'info', message: 'Your email app should open with the message ready to send.' });
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows={5} required />
      </div>
      <button className="btn btn--primary" type="submit" disabled={status.kind === 'sending'}>
        {contactLinks.formEndpoint ? 'Send message' : 'Write the email'}
      </button>
      <p className={`form-status form-status--${status.kind}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}

export function ContactSection() {
  const mail = emailHref();
  const linkedIn = linkedInHref();
  const phone = phoneHref();
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="contact__grid">
        <div className="contact__intro">
          {personalDetails.photo && (
            <img
              className="portrait"
              src={personalDetails.photo.src}
              alt={personalDetails.photo.alt}
              width={personalDetails.photo.width}
              height={personalDetails.photo.height}
              loading="lazy"
              decoding="async"
            />
          )}
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="section__title">Let’s talk</h2>
          <p className="section__lede">
            Open to conversations about leadership roles in eCommerce, operations and customer experience.
          </p>
          <ul className="contact__links">
            <li>
              <MailIcon />
              <span className="contact__kind">Email</span>
              {mail ? <a href={mail}>{contactLinks.email}</a> : <Text>{contactLinks.email}</Text>}
            </li>
            <li>
              <LinkedInIcon />
              <span className="contact__kind">LinkedIn</span>
              {linkedIn ? (
                <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                  View profile <ArrowUpRightIcon />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                <Text>{contactLinks.linkedIn}</Text>
              )}
            </li>
            {contactLinks.phone && (
              <li>
                <PhoneIcon />
                <span className="contact__kind">Phone</span>
                {phone ? <a href={phone}>{contactLinks.phone}</a> : <Text>{contactLinks.phone}</Text>}
              </li>
            )}
          </ul>
          <CvButton variant="ghost" />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>
        © {year} <Text>{personalDetails.fullName}</Text>. All rights reserved.
      </p>
      <a href="#top" className="text-link">Back to top</a>
    </footer>
  );
}
