'use client';
import { useState } from 'react';
import Link from 'next/link';
import { posts } from '../../data/site';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'research', label: 'Research', color: 'steel' },
  { id: 'devlog', label: 'Devlog / Errors', color: 'rust' },
  { id: 'math', label: 'Math & ML', color: 'amber' },
  { id: 'language', label: 'Language', color: 'sage' },
  { id: 'note', label: 'Notes', color: '' },
  { id: 'linkedin', label: 'LinkedIn Posts', color: 'steel' },
];

const catColors = { research: 'steel', devlog: 'rust', language: 'sage', math: 'amber', note: '', linkedin: 'steel' };

const catDescriptions = {
  research: 'Technical deep-dives into the three research pillars.',
  devlog: 'Raw progress logs, debugging sessions, and errors I hit. Unfiltered.',
  math: 'Intuition-first explanations of RL, ML, and math concepts I find interesting.',
  language: 'German, Japanese, Arabic learning logs and honest progress reports.',
  note: 'Short-form reflections and tactical notes.',
  linkedin: 'Posts I share on LinkedIn, archived here.',
};

export default function BlogPage() {
  const [active, setActive] = useState('all');

  const filtered = posts
    .filter(p => active === 'all' || p.category === active)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Writing</div>
        <h1>Blog</h1>
        <p className="page-intro-sm">
          Research notes, devlogs, error logs, language learning, and math intuition. Building in public.
        </p>
      </div>

      <div className="blog-filter-bar" data-reveal>
        {categories.map(cat => (
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
        {filtered.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-list-item">
            <div className="blog-item-head">
              <div>
                <div className="chip-row">
                  <span className={`tag ${catColors[post.category] || ''}`}>{post.category}</span>
                  {post.pillar && <span className="tag">{post.pillar}</span>}
                  {post.tags.slice(0, 2).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-copy">{post.excerpt}</p>
              </div>
              <div className="blog-head-meta">
                <div className="label">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="label">{post.readTime}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card" data-reveal>
          <div className="label">No posts in this category yet.</div>
        </div>
      )}
    </>
  );
}
