import Link from 'next/link';
import { experience, projects, researchPillars, siteConfig } from '../data/site';
import ProfileImage from '../components/ProfileImage';

function StatusBadge({ status }) {
  const isActive = typeof status === 'string' && status.toLowerCase().includes('active');
  const label = typeof status === 'string' ? status : (status?.label ?? '');
  return (
    <span className={`tag ${isActive ? 'rust' : ''}`}>{label}</span>
  );
}

export default function HomePage() {
  return (
    <div className="surface-grid">
      <section className="hero-grid" data-reveal>
        <div className="hero-panel hero-copy">
          <div className="hero-kicker">
            <span className="status-dot" />
            {siteConfig.tagline}
          </div>
          <h1 className="hero-title">
            Bridging textile engineering with machine learning, computer vision, and robotics.
          </h1>
          <p>
            I build applied systems with a strong research spine: smart thermal garments, real-time textile inspection, and robotic fabric manipulation.
            The goal is simple: make the work rigorous enough for competitive graduate admissions and credible enough for top-tier engineering teams.
          </p>

          <div className="hero-actions">
            <a className="button" href={siteConfig.links.cv} title="CV coming soon" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
            <Link className="button button-secondary" href="/research">
              View Research
            </Link>
          </div>

          <div className="stat-grid">
            <div className="stat-card">
              <span className="stat-accent">3</span>
              <strong>Active Research Tracks</strong>
              <span className="card-copy">Wearables, vision, and robotics — all grounded in textile manufacturing.</span>
            </div>
            <div className="stat-card">
              <span className="stat-accent">2×</span>
              <strong>Industry Rotations</strong>
              <span className="card-copy">Production-floor experience at SQUARE Apparels shaping every system design.</span>
            </div>
            <div className="stat-card">
              <span className="stat-accent">→</span>
              <strong>MSc / PhD Ready</strong>
              <span className="card-copy">Built for competitive Data Science and AI graduate admissions in 2026.</span>
            </div>
          </div>
        </div>

        <aside className="hero-side">
          <div className="info-panel">
            <div className="label">Profile</div>
            <ProfileImage />
            <h3>{siteConfig.name}</h3>
            <p className="card-copy">{siteConfig.description}</p>
            <div className="chip-row" style={{marginTop: '0.6rem'}}>
              <span className="tag rust">Machine Learning</span>
              <span className="tag steel">Computer Vision</span>
              <span className="tag sage">Robotics</span>
            </div>
          </div>

          <div className="info-panel">
            <div className="label">Connect</div>
            <div className="contact-links">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="GitHub (opens in new window)">
                GitHub ↗
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label="LinkedIn (opens in new window)">
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="info-panel">
            <div className="label">Current Focus</div>
            <div className="experience-grid">
              {experience.slice(0, 2).map(item => (
                <div key={item.title}>
                  <div className="experience-meta">
                    <span className="tag">{item.period}</span>
                    <span className={`tag ${item.status === 'In progress' ? 'rust' : ''}`}>{item.status}</span>
                  </div>
                  <strong className="experience-title">{item.title}</strong>
                  <p className="card-copy">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="section-stack" data-reveal data-reveal-delay="1">
        <div className="section-header">
          <div>
            <div className="section-kicker">Selected Projects</div>
            <h2>Professional showcase</h2>
          </div>
          <Link href="/projects" className="label link-inline">
            View all projects ↗
          </Link>
        </div>

        <div className="bento-grid">
          {projects.map((project, index) => (
            <article key={project.id} className={`card project-card bento-item ${index === 0 ? 'hero-span' : 'wide'}`}>
              <div className="card-topline">
                <div className="chip-row">
                  <span className={`tag ${project.pillarColor}`}>{project.pillar}</span>
                  <span className="tag">{project.phase}</span>
                  <StatusBadge status={project.status} />
                </div>
                <span className="status-dot" aria-hidden="true" />
              </div>

              <h3 className="card-title">{project.title}</h3>
              <p className="card-copy">{project.description}</p>

              <div className="project-footer">
                {project.github && (
                  <a className="label link-inline" href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                )}
                {project.demo && (
                  <a className="label link-inline" href={project.demo} target="_blank" rel="noopener noreferrer">Demo ↗</a>
                )}
              </div>

              <div className="stack-row">
                {project.stack.map(stackItem => (
                  <span key={stackItem} className="tag">{stackItem}</span>
                ))}
              </div>

              <div className="stack-row" style={{marginTop: '0.4rem'}}>
                {project.highlights.map(highlight => (
                  <span key={highlight} className="tag steel">✓ {highlight}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack" data-reveal data-reveal-delay="2">
        <div className="section-header">
          <div>
            <div className="section-kicker">Experience & Academic Status</div>
            <h2>Timeline</h2>
          </div>
          <Link href="/research" className="label link-inline">
            View thesis track ↗
          </Link>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <div key={item.title} className="timeline-item">
              <div className="label">{item.period}</div>
              <div className="timeline-rail">
                <div className="timeline-dot" />
                {index < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="card timeline-card">
                <div className="experience-meta">
                  <div>
                    <strong className="experience-title">{item.title}</strong>
                    <div className="label">{item.org}</div>
                  </div>
                  <span className={`tag ${item.status === 'In progress' ? 'rust' : ''}`}>{item.status}</span>
                </div>
                <p className="card-copy">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="label">Academic emphasis</div>
          <p className="card-copy">
            Built for competitive Master’s in Data Science review and research-oriented engineering roles: a clean technical narrative, credible prototypes, and measurable progress.
          </p>
        </div>
      </section>

      <section className="section-stack" data-reveal data-reveal-delay="3">
        <div className="section-header">
          <div>
            <div className="section-kicker">Research Pillars</div>
            <h2>Current thesis architecture</h2>
          </div>
        </div>

        <div className="section-grid">
          {researchPillars.map(pillar => (
            <article key={pillar.id} className="card feature-card">
              <div className="chip-row">
                <span className={`tag ${pillar.color}`}>{pillar.label}</span>
                <span className="tag">{pillar.phase}</span>
              </div>
              <h3 className="card-title">{pillar.title}</h3>
              <p className="card-copy">{pillar.summary}</p>
              {pillar.target && (
                <div className="pillar-target">
                  <span className="label">Target venue</span>
                  <span className="card-copy">{pillar.target}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
