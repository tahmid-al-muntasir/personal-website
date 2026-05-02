import { researchPillars } from '../../data/site';

export default function PapersPage() {
  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Academic Output</div>
        <h1>Papers & Preprints</h1>
        <p className="page-intro-sm">
          Three papers in preparation, one per research pillar. The focus is a strong research narrative,
          reproducible methods, and a clean path to preprint release.
        </p>
      </div>

      <div className="notice-card" data-reveal>
        <div className="label">Transparency Note</div>
        <p className="card-copy">
          These papers are in preparation, meaning the research is active and the writing follows experimental milestones.
          I document the process publicly through the blog and will post preprints when they are ready.
        </p>
      </div>

      <div className="section-grid" data-reveal>
        {researchPillars.map(paper => (
          <article key={paper.id} className="card feature-card">
            <div className="chip-row">
              <span className={`tag ${paper.color}`}>{paper.label}</span>
              <span className="tag">In preparation</span>
            </div>

            <h2 className="card-title">{paper.paperTitle}</h2>
            <div className="label">Tahmid Al Muntasir et al.</div>

            <div className="section-grid">
              <div>
                <div className="label">Target Venue</div>
                <div className="card-copy">{paper.target}</div>
              </div>
              <div>
                <div className="label">Status</div>
                <div className="card-copy">Preprint after milestone completion</div>
              </div>
            </div>

            <p className="card-copy">{paper.description}</p>
          </article>
        ))}
      </div>

      <div className="card" data-reveal>
        <h3 className="card-title">Get notified when papers drop</h3>
        <p className="card-copy">
           Follow me on <a href="https://github.com/tahmid-al-muntasir" target="_blank" rel="noopener noreferrer" className="link-rust" aria-label="GitHub (opens in new window)">GitHub</a> or{' '}
           <a href="https://linkedin.com/in/tahmid-al-muntasir" target="_blank" rel="noopener noreferrer" className="link-rust" aria-label="LinkedIn (opens in new window)">LinkedIn</a> for
          updates. I post research progress publicly.
        </p>
      </div>
    </>
  );
}
