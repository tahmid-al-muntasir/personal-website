import { getAllProjects } from '../../sanity/lib/queries'
import { renderPortableText } from '../../components/PortableTextRenderer'

export const revalidate = 10; // Revalidates the page every 10 seconds
function getPillarColor(pillar) {
  const colorMap = {
    p1: 'rust',
    p2: 'amber',
    p3: 'sage',
  }
  return colorMap[pillar] || ''
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Projects</div>
        <h1>Flagship Research Projects</h1>
        <p className="page-intro-sm">
          Three active projects, each designed to read like a strong graduate research artifact and an industry-ready engineering case study.
        </p>
      </div>

      <div className="bento-grid" data-reveal>
        {projects.map((project, index) => (
          <article key={project._id} className={`card project-card bento-item ${index === 0 ? 'hero-span' : 'wide'}`}>
            <div className="card-topline">
              <div className="chip-row">
                <span className={`tag ${getPillarColor(project.pillar)}`}>{project.pillar?.toUpperCase()}</span>
                <span className="tag">{project.phase}</span>
                <span className={`tag ${project.status?.toLowerCase() === 'active' ? 'rust' : ''}`}>{project.status}</span>
              </div>
              <span className="status-dot" />
            </div>

            <h2 className="card-title">{project.title}</h2>
            <p className="card-copy">{Array.isArray(project.description) ? renderPortableText(project.description) : project.description}</p>

            <div className="project-footer">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label={`${project.title} GitHub repository (opens in new window)`}>
                  GitHub ↗
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label={`${project.title} demo (opens in new window)`}>
                  Demo ↗
                </a>
              )}
            </div>

            <div className="stack-row">
              {project.techStack?.map((stackItem) => (
                <span key={stackItem} className="tag">
                  {stackItem}
                </span>
              ))}
            </div>

            <div className="stack-row">
              {project.highlights?.map((highlight) => (
                <span key={highlight} className="tag steel">
                  {highlight}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
