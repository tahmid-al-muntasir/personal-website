import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { getBlogPostBySlug, getAllBlogPosts } from '../../../sanity/lib/queries';

export const revalidate = 10;

export async function generateStaticParams() {
  const all = await getAllBlogPosts();
  return (all || []).map((p) => ({ slug: p.slug?.current || '' }));
}

export async function generateMetadata({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} | TAM`, description: post.excerpt };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return notFound();

  const allPosts = await getAllBlogPosts();

  // Normalize shapes expected by client component (fallback to old field names)
  const normalize = (p) => ({
    ...p,
    slug: p.slug?.current ?? p.slug,
    date: p.publishedDate ?? p.date,
    content: p.body ?? p.content,
  });

  const normalizedPost = normalize(post);
  const normalizedAll = (allPosts || []).map(normalize);

  return <BlogPostClient post={normalizedPost} allPosts={normalizedAll} />;
}
