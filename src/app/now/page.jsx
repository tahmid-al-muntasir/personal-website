import { getNowPage } from '../../sanity/lib/queries'
import { siteConfig } from '../../data/site'
import { renderPortableText } from '../../components/PortableTextRenderer'
import { client } from '../../sanity/lib/client'

export const revalidate = 10; // Revalidates the page every 10 seconds

export default async function NowPage() {
  const nowData = await getNowPage()
  const nowDebug = await client.fetch(`*[_type == "now"]{_id,singletonId,lastUpdatedDate}`)
  console.log('NOW DATA:', nowData)
  console.log('NOW DEBUG QUERY:', nowDebug)
  console.log('SANITY ENV (NOW):', {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

  if (!nowData) {
    return (
      <div className="notice-card" data-reveal>
        <div className="label">Now</div>
        <p className="card-copy">Now page content has not been published yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">
          <span className="status-dot" /> Updated {nowData.lastUpdatedDate
            ? new Date(nowData.lastUpdatedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : 'Recently'}
          {nowData.location ? ` · ${nowData.location}` : ''}
        </div>
        <h1>Now</h1>
        <div className="page-intro-sm">
          {Array.isArray(nowData.currentFocus)
            ? renderPortableText(nowData.currentFocus)
            : nowData.currentFocus}
        </div>
      </div>

      <section className="now-section" data-reveal>
        <div className="label">Research</div>
        <ul className="now-list">
          {nowData.researchItems?.map((item, i) => (
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
          {nowData.learningItems?.map((item, i) => (
            <div key={i} className="card">
              <div className="label">
                {item.emoji} {item.label}
              </div>
              <p className="card-copy">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="now-section" data-reveal>
        <div className="label">Reading</div>
        <ul className="now-list">
          {nowData.reading?.map((item, i) => (
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
          {nowData.buildingToward?.map((item, i) => (
            <li key={i} className="now-list-item">
              <span className="now-bullet">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="now-section" data-reveal>
        <div className="card">
          <h3 className="card-title">Get in Touch</h3>
          <p className="card-copy">
            Interested in collaborating on research or discussing any of the work above?
          </p>
          <a href={`mailto:${siteConfig.email}`} className="button">
            Send me a message
          </a>
        </div>
      </section>

      <div className="pullquote" data-reveal>
        {siteConfig.quote}
      </div>
    </>
  )
}
