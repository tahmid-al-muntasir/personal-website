'use client'

import { useState } from 'react'
import Link from 'next/link'

const catColors = {
  research: 'steel',
  devlog: 'rust',
  language: 'sage',
  math: 'amber',
  note: '',
  linkedin: 'steel',
}

export default function BlogClientWrapper({ posts, categories, catDescriptions }) {
  const [active, setActive] = useState('all')

  const filtered = posts
    .filter((p) => active === 'all' || p.category === active)
    .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))

  return (
    <>
      <div className="blog-filter-bar" data-reveal>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`filter-button ${active === cat.id ? 'is-active' : ''}`}
            aria-current={active === cat.id ? 'page' : undefined}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {active !== 'all' && catDescriptions[active] && (
        <div className="category-description" data-reveal>
          <p className="card-copy">{catDescriptions[active]}</p>
        </div>
      )}

      <div className="blog-list" data-reveal>
        {filtered.map((post) => {
          // 1. Logic handled before the return
          const slug = post.slug?.current ?? post.slug;
          
          // 2. Explicit return with clean JSX
          return (
            <Link key={slug} href={`/blog/${slug}`} className="blog-list-item">
              <div className="blog-item-head">
                <div>
                  <div className="chip-row">
                    <span className={`tag ${catColors[post.category] || ''}`}>{post.category}</span>
                    {post.pillar && <span className="tag">{post.pillar}</span>}
                    {post.tags?.slice(0, 2).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-copy">{post.excerpt}</p>
                </div>
                <div className="blog-head-meta">
                  <div className="label">
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="label">{post.readTime}</div>
                </div>
              </div>
            </Link>
          );
          })}
      </div>

      {filtered.length === 0 && (
        <div className="card" data-reveal>
          <div className="label">No posts in this category yet.</div>
        </div>
      )}
    </>
  )
}
