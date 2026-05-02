'use client';
import { projects } from '../../data/site';

export default function ProjectsPage() {
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
          <article key={project.id} className={`card project-card bento-item ${index === 0 ? 'hero-span' : 'wide'}`}>
            <div className="card-topline">
              <div className="chip-row">
                <span className={`tag ${project.pillarColor}`}>{project.pillar}</span>
                <span className="tag">{project.phase}</span>
                <span className="tag">{project.status}</span>
              </div>
              <span className="status-dot" />
            </div>

            <h2 className="card-title">{project.title}</h2>
            <p className="card-copy">{project.description}</p>

            <div className="project-footer">
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label={`${project.title} GitHub repository (opens in new window)`}>GitHub ↗</a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="label link-inline" aria-label={`${project.title} demo (opens in new window)`}>Demo ↗</a>}
            </div>

            <div className="stack-row">
              {project.stack.map(stackItem => <span key={stackItem} className="tag">{stackItem}</span>)}
            </div>

            <div className="stack-row">
              {project.highlights.map(highlight => <span key={highlight} className="tag steel">{highlight}</span>)}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
