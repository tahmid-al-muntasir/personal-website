import { getAllMedia } from '../../sanity/lib/queries'
import { client } from '../../sanity/lib/client'
// Import your url builder (check your sanity/lib/image.js file)
// import { urlFor } from '../../sanity/lib/image' 

export const revalidate = 10; // Revalidates the page every 10 seconds

export default async function MediaPage() {
  const mediaItems = await getAllMedia()
  const mediaDebug = await client.fetch(`*[_type == "media"]{_id,title,mediaType}`)
  console.log('MEDIA DATA:', mediaItems)
  console.log('MEDIA DEBUG QUERY:', mediaDebug)
  console.log('SANITY ENV (MEDIA):', {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  })

  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Media</div>
        <h1>Photos & Videos</h1>
        <p className="page-intro-sm">
          Behind the scenes of the research. Training sessions, late-night annotation sprints,
          language study notes, and the actual workspace.
        </p>
      </div>

      {(mediaItems?.length ?? 0) === 0 ? (
        <div className="notice-card" data-reveal>
          <div className="label">Coming Soon</div>
          <p className="helper-note">Coming soon — media in progress.</p>
        </div>
      ) : (
        <div className="media-grid" data-reveal>
          {mediaItems?.map((item) => (
            <article key={item._id} className="media-card">
              {item.thumbnail && (
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="media-link">
                  <div className="media-image-wrapper">
                    {/* Use urlFor if thumbnail is a Sanity Image object */}
                    <img src={item.thumbnail} alt={item.title || 'Media item'} className="media-image" />
                    <div className="media-overlay">
                      <span className="media-type-badge">{item.mediaType?.toUpperCase()}</span>
                    </div>
                  </div>
                </a>
              )}
              
              <div className="media-content">
                <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="media-title-link">
                  <h3 className="card-title">{item.title}</h3>
                </a>
                <p className="card-copy">{item.description}</p>
                <div className="media-meta">
                  {item.platform && <span className="label">{item.platform}</span>}
                  {item.publishedDate && (
                    <span className="label">
                      {new Date(item.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}