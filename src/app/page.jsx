import Link from 'next/link'
import { getHomepageData } from '../sanity/lib/queries'
import { siteConfig } from '../data/site'
import ProfileImage from '../components/ProfileImage'
import { renderPortableText } from '../components/PortableTextRenderer'

function StatusBadge({ status }) {
  const isActive = typeof status === 'string' && status.toLowerCase().includes('active')
  const label = typeof status === 'string' ? status : status?.label ?? ''
  return <span className={`tag ${isActive ? 'rust' : ''}`}>{label}</span>
}

export default async function HomePage() {
  // Ensure your query returns 'experience' and 'researchPillars' if you use them
  const { projects, research, experience = [], researchPillars = [] } = await getHomepageData()

  return (
    <div className="surface-grid">
      {/* 1. HERO SECTION */}
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
            I build applied systems with a strong research spine...
          </p>

          <div className="hero-actions">
            <a className="button" href={siteConfig.links.cv} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
            <Link className="button button-secondary" href="/research">
              View Research
            </Link>
          </div>
        </div>

        <aside className="hero-side">
          <div className="info-panel">
            <div className="label">Profile</div>
            <ProfileImage />
            <h3>{siteConfig.name}</h3>
            <div className="chip-row">
              <span className="tag rust">ML</span>
              <span className="tag steel">CV</span>
              <span className="tag sage">Robotics</span>
            </div>
          </div>
        </aside>
      </section>

      {/* 2. RESEARCH PILLARS */}
      <section className="section-stack" data-reveal>
        <div className="section-header">
          <h2>Research Pillars</h2>
        </div>
        <div className="section-grid">
          {research.map((pillar) => (
            <div key={pillar._id} className="card feature-card">
              <span className={`tag ${pillar.color}`}>{pillar.pillarId?.toUpperCase()}</span>
              <h3 className="card-title">{pillar.shortTitle || pillar.title}</h3>
              <p className="card-copy">{pillar.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="section-stack" data-reveal>
        <div className="section-header">
          <h2>Flagship Work</h2>
          <Link href="/projects" className="label link-inline">View all →</Link>
        </div>
        <div className="bento-grid">
          {projects.slice(0, 3).map((project, index) => (
            <article key={project._id} className={`card project-card bento-item ${index === 0 ? 'hero-span' : ''}`}>
              <div className="card-topline">
                <StatusBadge status={project.status} />
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-copy">{Array.isArray(project.description) ? renderPortableText(project.description) : project.description}</p>
              <div className="project-footer">
                {project.githubUrl && <a href={project.githubUrl}>GitHub ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}