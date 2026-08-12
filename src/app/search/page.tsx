import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchContent } from './SearchContent';

export const metadata: Metadata = {
  title: 'Search',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-apex py-24 text-center text-silver-500">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
