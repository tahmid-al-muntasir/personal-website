import { now, siteConfig } from '../../data/site';

export default function NowPage() {
  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">
          <span className="status-dot" /> Updated {now.lastUpdated} · {now.location}
        </div>
        <h1>Now</h1>
        <p className="page-intro-sm">
          What I&apos;m currently focused on: research, learning, and reading. Updated monthly.
          Inspired by <a href="https://sive.rs/now" target="_blank" rel="noopener noreferrer" className="link-rust">Derek Sivers&apos; /now movement</a>.
        +          Inspired by <a href="https://sive.rs/now" target="_blank" rel="noopener noreferrer" className="link-rust" aria-label="Derek Sivers /now page (opens in new window)">Derek Sivers&apos; /now movement</a>.
        </p>
      </div>

      <section className="now-section" data-reveal>
        <div className="label">Research</div>
        <ul className="now-list">
          {now.research.map((item, i) => (
            <li key={i} className="now-list-item">
              <span className="now-bullet">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="now-section" data-reveal>
        <div className="label">Learning</div>
        <div className="section-grid">
          {now.learning.map((item, i) => (
            <div key={i} className="card">
              <div className="label">{item.flag} {item.label}</div>
              <p className="card-copy">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="now-section" data-reveal>
        <div className="label">Reading</div>
        <ul className="now-list">
          {now.reading.map((item, i) => (
            <li key={i} className="now-list-item">
              <span className="now-bullet">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="now-section" data-reveal>
        <div className="label">Building Toward</div>
        <ul className="now-list">
          {now.buildingToward.map((item, i) => (
            <li key={i} className="now-list-item">
              <span className="now-bullet">◎</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="now-section" data-reveal>
        <div className="label">Language Progress</div>
        <div className="section-grid">
          {[
            { lang: 'German', flag: '🇩🇪', target: 'B1', progress: 8, note: 'Month 1 of 14' },
            { lang: 'Japanese', flag: '🇯🇵', target: 'N4', progress: 6, note: 'Month 1 of 12' },
            { lang: 'Arabic', flag: '🇸🇦', target: 'Quranic', progress: 30, note: 'Ongoing' },
          ].map(l => (
            <div key={l.lang} className="card language-row">
              <div className="language-meta">
                <div>
                  <strong>{l.flag} {l.lang}</strong>
                  <span className="label"> · {l.target}</span>
                </div>
                <span className="label">{l.note}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${l.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pullquote" data-reveal>
        {siteConfig.quote}
      </div>
    </>
  );
}
