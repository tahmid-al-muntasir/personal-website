import { posts } from '../../../data/site';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return {};
  return { title: `${post.title} | TAM`, description: post.excerpt };
}

export default function BlogPostPage({ params }) {
  const post = posts.find(p => p.slug === params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} allPosts={posts} />;
}
