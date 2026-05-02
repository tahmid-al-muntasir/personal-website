import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="card not-found" data-reveal>
      <div className="not-found-code">404</div>
      <h2>Page not found</h2>
      <p className="card-copy">This page doesn&apos;t exist, or it has not been built yet.</p>
      <Link href="/" className="button button-secondary">
        Back to home
      </Link>
    </div>
  );
}
