'use client';
import { useState } from 'react';
import { siteConfig } from '../../data/site';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const formspreeId = siteConfig.forms?.formspreeId;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formspreeId) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('done');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Contact</div>
        <h1>Get in Touch</h1>
        <p className="page-intro-sm">
          If you work on related problems in robotics, smart materials, or NLP, I&apos;d like to hear from you.
          I&apos;m also open to conversations about graduate opportunities and technical collaboration.
        </p>
      </div>

      <div className="form-grid" data-reveal>
        <div className="card">
          {status === 'done' ? (
            <div className="form-success">
              <strong className="experience-title">Message sent.</strong>
              <p className="card-copy">I&apos;ll get back to you as soon as I can.</p>
              <button onClick={() => setStatus('idle')} className="button button-secondary" type="button">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-card">
              <div className="form-group">
                <label className="label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={form.name}
                  required
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  value={form.email}
                  required
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  value={form.subject}
                  required
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label">Message</label>
                <textarea
                  className="form-input"
                  value={form.message}
                  required
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {status === 'error' && (
                <div className="form-error">
                  Something went wrong. Try emailing directly: {siteConfig.email}
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="button">
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              <p className="form-note">
                Add your Formspree ID in src/data/site.js to activate this form.
                Free tier at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" className="link-rust" aria-label="Formspree (opens in new window)">formspree.io</a>.
              </p>
            </form>
          )}
        </div>

        <aside className="section-stack">
          <div className="card">
            <div className="label">Direct</div>
            <a href={`mailto:${siteConfig.email}`} className="link-rust">
              {siteConfig.email}
            </a>
          </div>

          <div className="card">
            <div className="label">Social & Academic</div>
            <div className="text-link-list">
              {[
                { label: 'GitHub', url: siteConfig.links.github },
                { label: 'LinkedIn', url: siteConfig.links.linkedin },
                { label: 'Kaggle', url: siteConfig.links.kaggle },
                { label: 'LeetCode', url: siteConfig.links.leetcode },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="text-link-row" aria-label={`${link.label} (opens in new window)`}>
                  <span>{link.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="notice-card">
            <div className="label">Response time</div>
            <p className="card-copy">
              I try to respond within 48 hours. For graduate research and collaboration inquiries, I prioritize responses.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
