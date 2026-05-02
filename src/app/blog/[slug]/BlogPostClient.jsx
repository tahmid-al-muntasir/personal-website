"use client";
import Link from 'next/link';
import { renderPortableText } from '../../../components/PortableTextRenderer';

const catColors = { research: 'steel', devlog: 'rust', language: 'sage', math: 'amber', note: '', linkedin: 'steel' };

function formatInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="link-rust" target="_blank" rel="noopener noreferrer">$1</a>');
}

function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;
  let inCode = false;
  let codeBlock = [];
  let inTable = false;
  let tableRows = [];

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeBlock = [];
        i++;
        continue;
      }
      elements.push(
        <pre key={`code-${i}`}>
          <code>{codeBlock.join('\n')}</code>
        </pre>
      );
      inCode = false;
      codeBlock = [];
      i++;
      continue;
    }

    if (inCode) {
      codeBlock.push(line);
      i++;
      continue;
    }

    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
      i++;
      if (!lines[i] || !lines[i].startsWith('|')) {
        const header = tableRows[0].split('|').filter(c => c.trim()).map(c => c.trim());
        const body = tableRows.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
        elements.push(
          <div key={`table-${i}`} className="notice-card" style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {header.map((h, j) => (
                    <th key={j} style={{ padding: '8px 10px', borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{ padding: '8px 10px', borderBottom: '1px solid var(--line)', color: 'var(--muted)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
      }
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={i}>{line.slice(2)}</blockquote>);
    } else if (line === '---') {
      elements.push(<hr key={i} className="rule" />);
    } else if (line.trim() === '') {
      // skip
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {listItems.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      continue;
    } else {
      elements.push(<p key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
    }
    i++;
  }

  return elements;
}

export default function BlogPostClient({ post, allPosts }) {
  const getSlug = (p) => p?.slug?.current ?? p?.slug;
  const related = (allPosts || [])
    .filter((p) => getSlug(p) !== getSlug(post) && (p.category === post.category || p.pillar === post.pillar))
    .slice(0, 3);

  return (
    <>
      <div className="page-intro" data-reveal>
        <Link href="/blog" className="back-link">
          Back to blog
        </Link>
      </div>

      <header className="page-intro" data-reveal>
        <div className="chip-row">
          <span className={`tag ${catColors[post.category] || ''}`}>{post.category}</span>
          {post.pillar && <span className="tag">{post.pillar}</span>}
          {post.tags?.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h1>{post.title}</h1>
        <div className="label">
          {new Date(post.date ?? post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {' | '}
          {post.readTime} read
        </div>
      </header>

      <article className="prose" data-reveal>
        {post.body ? renderPortableText(post.body) : renderContent(post.content)}
      </article>

      {related.length > 0 && (
        <section className="section-stack" data-reveal>
          <div className="label">Related Posts</div>
          <div className="blog-list">
            {related.map((p) => (
              <Link key={getSlug(p)} href={`/blog/${getSlug(p)}`} className="blog-list-item">
                <div className="chip-row">
                  <span className={`tag ${catColors[p.category] || ''}`}>{p.category}</span>
                </div>
                <div className="card-title">{p.title}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
