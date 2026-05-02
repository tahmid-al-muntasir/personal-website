import Link from 'next/link'
import { getAllResearch } from '../../sanity/lib/queries'
import { renderPortableText } from '../../components/PortableTextRenderer'
import { client } from '../../sanity/lib/client'

export const revalidate = 10; // Revalidates the page every 10 seconds
export default async function ResearchPage() {
  const researchPillars = await getAllResearch()
  const researchDebug = await client.fetch(`*[_type == "research"]{_id,title,pillarId}`)
  console.log('RESEARCH DATA:', researchPillars)
  console.log('RESEARCH DEBUG QUERY:', researchDebug)
  console.log('SANITY ENV (RESEARCH):', {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

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

      {(researchPillars?.length ?? 0) === 0 ? (
        <div className="notice-card" data-reveal>
          <div className="label">Research</div>
          <p className="card-copy">No research documents found in Sanity yet.</p>
        </div>
      ) : (
      <div className="section-grid" data-reveal>
        {researchPillars?.map((pillar) => (
          <section key={pillar._id} id={pillar.pillarId} className="card feature-card">
            <div className="card-topline">
              <div className="chip-row">
                <span className={`tag ${pillar.color}`}>{pillar.pillarId?.toUpperCase?.() || 'PILLAR'}</span>
                <span className="tag">{pillar.phase}</span>
              </div>
              <span className="tag rust">{pillar.pillarId === 'p1' ? '01' : pillar.pillarId === 'p2' ? '02' : '03'}</span>
            </div>

            <h2 className="card-title">{pillar.title}</h2>
            <div className="card-copy">
              {Array.isArray(pillar.description)
                ? renderPortableText(pillar.description)
                : pillar.description}
            </div>

            <div className="section-grid">
              <div>
                <div className="label">Key Problems</div>
                <div className="stack-row">
                  {pillar.keyProblems?.map((problem) => (
                    <span key={problem} className="tag">
                      {problem}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="label">Stack</div>
                <div className="stack-row">
                  {pillar.techStack?.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-panel">
              <div className="label">Paper in preparation</div>
              <div className="experience-title">{pillar.paperTitle}</div>
              <div className="label">Target: {pillar.targetVenue}</div>
            </div>
          </section>
        ))}
      </div>
      )}

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
  )
}

