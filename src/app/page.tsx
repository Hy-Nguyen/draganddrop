'use client';

import SortExample from '@/components/Sortable/SortExample';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-24 bg-black-wd p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-green-wd">hello</h1>
      </div>
      <SortExample />
    </main>
  );
}
