import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-apex flex flex-col items-center gap-5 py-32 text-center">
      <span className="font-display text-7xl font-bold text-silver-700">404</span>
      <h1 className="section-heading">Page Not Found</h1>
      <p className="max-w-md text-sm text-silver-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link href="/" className="btn-gold mt-4">
        Back to Home
      </Link>
    </div>
  );
}
