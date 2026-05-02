import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';
import { getBlogPostBySlug, getAllBlogPosts } from '../../../sanity/lib/queries';

export const revalidate = 10;

async function resolveSlug(params) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  return typeof slug === 'string' ? slug : Array.isArray(slug) ? slug[0] : '';
}

export async function generateStaticParams() {
  const all = await getAllBlogPosts();
  return (all || [])
    .map((p) => ({ slug: p.slug?.current || '' }))
    .filter((params) => params.slug);
}

export async function generateMetadata({ params }) {
  const slug = await resolveSlug(params);
  if (!slug) return {};

  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | TAM`, description: post.excerpt };
}

export default async function BlogPostPage({ params }) {
  const slug = await resolveSlug(params);
  if (!slug) return notFound();

  const post = await getBlogPostBySlug(slug);
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
