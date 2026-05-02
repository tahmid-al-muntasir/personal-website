'use client';
import Link from 'next/link';
import { experience, researchPillars } from '../../data/site';

export default function ResearchPage() {
  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Research</div>
        <h1>Three Pillars</h1>
        <p className="page-intro-sm">
          I build AI systems that work in the real world, not just on benchmarks. Textile engineering gives the constraints,
          machine learning provides the policy, and deployment decides whether the idea is real.
        </p>
      </div>

      <div className="section-grid" data-reveal>
        {researchPillars.map(pillar => (
          <section key={pillar.id} id={pillar.id} className="card feature-card">
            <div className="card-topline">
              <div className="chip-row">
                <span className={`tag ${pillar.color}`}>{pillar.label}</span>
                <span className="tag">{pillar.phase}</span>
              </div>
              <span className="tag rust">{pillar.num}</span>
            </div>

            <h2 className="card-title">{pillar.title}</h2>
            <p className="card-copy">{pillar.description}</p>

            <div className="section-grid">
              <div>
                <div className="label">Key Problems</div>
                <div className="stack-row">
                  {pillar.problems.map(problem => <span key={problem} className="tag">{problem}</span>)}
                </div>
              </div>
              <div>
                <div className="label">Stack</div>
                <div className="stack-row">
                  {pillar.stack.map(item => <span key={item} className="tag">{item}</span>)}
                </div>
              </div>
            </div>

            <div className="surface-panel">
              <div className="label">Paper in preparation</div>
              <div className="experience-title">{pillar.paperTitle}</div>
              <div className="label">Target: {pillar.target}</div>
            </div>
          </section>
        ))}
      </div>

      <section className="section-stack" data-reveal>
        <div className="section-header">
          <div>
            <div className="section-kicker">Experience</div>
            <h2>Industrial rotations and thesis status</h2>
          </div>
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
      </section>

      <section className="section-stack" data-reveal>
        <div className="card">
          <h2 className="card-title">Academic Profile</h2>
          <p className="card-copy">
            Preparing a Master&apos;s application story that can survive both admissions review and engineering interviews:
            a clear thesis direction, applied portfolio, and evidence of execution.
          </p>
          <div className="button-row">
            <Link href="/contact" className="button">Get in touch</Link>
            <Link href="/papers" className="button button-secondary">View papers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
