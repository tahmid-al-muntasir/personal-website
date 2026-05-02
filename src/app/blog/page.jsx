import { getAllBlogPosts } from '../../sanity/lib/queries'
import BlogClientWrapper from './BlogClientWrapper'

export const revalidate = 10; // Revalidates the page every 10 seconds
export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'research', label: 'Research', color: 'steel' },
    { id: 'devlog', label: 'Devlog / Errors', color: 'rust' },
    { id: 'math', label: 'Math & ML', color: 'amber' },
    { id: 'language', label: 'Language', color: 'sage' },
    { id: 'note', label: 'Notes', color: '' },
    { id: 'linkedin', label: 'LinkedIn Posts', color: 'steel' },
  ]

  const catDescriptions = {
    research: 'Technical deep-dives into the three research pillars.',
    devlog: 'Raw progress logs, debugging sessions, and errors I hit. Unfiltered.',
    math: 'Intuition-first explanations of RL, ML, and math concepts I find interesting.',
    language: 'German, Japanese, Arabic learning logs and honest progress reports.',
    note: 'Short-form reflections and tactical notes.',
    linkedin: 'Posts I share on LinkedIn, archived here.',
  }

  return (
    <>
      <div className="page-intro" data-reveal>
        <div className="label">Writing</div>
        <h1>Blog</h1>
        <p className="page-intro-sm">
          Research notes, devlogs, error logs, language learning, and math intuition. Building in public.
        </p>
      </div>

      <BlogClientWrapper posts={posts} categories={categories} catDescriptions={catDescriptions} />
    </>
  )
}
