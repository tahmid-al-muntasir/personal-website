export default function MediaPage() {
  const mediaItems = [
    { type: 'photo', title: 'Research Setup', desc: 'The desk where all three pillars get built. Bangladesh, 2026.' },
    { type: 'photo', title: 'Fabric Defect Labeling Session', desc: 'Annotating fabric images in Roboflow, week 2 session.' },
    { type: 'video', title: 'Thermal Simulation Running', desc: 'First 2D thermal model rendering in real time after a long debug cycle.' },
    { type: 'photo', title: 'Hiragana Notes', desc: 'Day 4 of hiragana. Handwriting practice session.' },
    { type: 'photo', title: 'Boxing Training', desc: 'Monday session. Discipline that carries into research.' },
    { type: 'video', title: 'Week 1 Research Log', desc: 'Talking through the first week of all three pillars. Raw and unedited.' },
  ];

  const phColor = ['#1f2937', '#172554', '#0f172a', '#111827', '#1e293b', '#0b1322'];

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

      <div className="notice-card" data-reveal>
        <div className="label">To add your own media</div>
        <p className="helper-note">
          Add photo files to public/media/ and update the src/data/site.js media array.
          For videos, upload to YouTube or Vimeo and paste the embed URL. See README for details.
        </p>
      </div>

      <div className="media-grid" data-reveal>
        {mediaItems.map((item, i) => (
          <div key={item.title} className="media-card">
            <div className="media-placeholder" style={{ background: phColor[i % phColor.length] }}>
              <div>
                <div style={{ fontSize: '2rem', textAlign: 'center' }}>
                  {item.type === 'video' ? '▶' : '📷'}
                </div>
                <div className="label">{item.type === 'video' ? 'VIDEO' : 'PHOTO'} PLACEHOLDER</div>
              </div>
              <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <span className={`tag ${item.type === 'video' ? 'rust' : ''}`}>{item.type}</span>
              </div>
            </div>
            <div className="media-content">
              <div className="card-title">{item.title}</div>
              <p className="card-copy">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="section-stack" data-reveal>
        <div className="label">Behind the Scenes</div>
        <div className="split-grid">
          {[
            { emoji: '🏋️', title: 'Training', desc: 'Boxing, BJJ, Taekwondo, and strength sessions build discipline that transfers directly into research execution.' },
            { emoji: '🇩🇪🇯🇵🇸🇦', title: 'Language Study', desc: 'German B1 track, Japanese N4 track, and Quranic Arabic for long-term technical literacy.' },
            { emoji: '⚙️', title: 'Research Workspace', desc: 'All three pillars running in parallel with a practical toolkit: Jupyter, VS Code, Roboflow, and Anki.' },
            { emoji: '📖', title: 'Reading', desc: 'Strategy, history, and engineering texts that sharpen technical judgment and long-horizon thinking.' },
          ].map(item => (
            <div key={item.title} className="card">
              <div style={{ fontSize: '1.5rem' }}>{item.emoji}</div>
              <div className="card-title">{item.title}</div>
              <p className="card-copy">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
