import { getAllPapers } from '../../sanity/lib/queries'
import { renderPortableText } from '../../components/PortableTextRenderer'
import { client } from '../../sanity/lib/client'

export const revalidate = 10; // Revalidates the page every 10 seconds
export default async function PapersPage() {
  const papers = await getAllPapers()
  const papersDebug = await client.fetch(`*[_type == "paper"]{_id,title}`)
  console.log('PAPERS DATA:', papers)
  console.log('PAPERS DEBUG QUERY:', papersDebug)
  console.log('SANITY ENV (PAPERS):', {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

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

      {(papers?.length ?? 0) === 0 ? (
        <div className="notice-card" data-reveal>
          <div className="label">Transparency Note</div>
          <p className="card-copy">Coming soon — papers in progress.</p>
        </div>
      ) : (
        <div className="section-grid" data-reveal>
          {papers?.map((paper) => (
            <article key={paper._id} className="card feature-card">
              <div className="chip-row">
                <span className="tag">{paper.pillar?.toUpperCase() || 'Paper'}</span>
                <span className="tag">{paper.publicationStatus}</span>
              </div>

              <h2 className="card-title">{paper.title}</h2>
              <div className="label">{paper.authors?.join(', ')}</div>

              <div className="section-grid">
                <div>
                  <div className="label">Venue</div>
                  <div className="card-copy">{paper.venue || 'To be determined'}</div>
                </div>
                <div>
                  <div className="label">Status</div>
                  <div className="card-copy">{paper.publicationStatus}</div>
                </div>
              </div>

              <div className="card-copy">
                {Array.isArray(paper.abstract)
                  ? renderPortableText(paper.abstract)
                  : paper.abstract}
              </div>

              <div className="surface-panel">
                {paper.arxivUrl && (
                  <a href={paper.arxivUrl} target="_blank" rel="noopener noreferrer" className="label link-inline">
                    arXiv ↗
                  </a>
                )}
                {paper.pdfUrl && (
                  <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="label link-inline">
                    PDF ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="card" data-reveal>
        <h3 className="card-title">Get notified when papers drop</h3>
        <p className="card-copy">
          Follow me on{' '}
          <a href="https://github.com/tahmid-al-muntasir" target="_blank" rel="noopener noreferrer" className="link-rust" aria-label="GitHub (opens in new window)">
            GitHub
          </a>{' '}
          or{' '}
          <a href="https://linkedin.com/in/tahmid-al-muntasir" target="_blank" rel="noopener noreferrer" className="link-rust" aria-label="LinkedIn (opens in new window)">
            LinkedIn
          </a>{' '}
          for updates. I post research progress publicly.
        </p>
      </div>
    </>
  )
}
