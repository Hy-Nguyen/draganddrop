'use client';

import SortExample from '@/components/Sortable/SortExample';
import Git from '../../public/svg/Git';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-24 bg-black-wd p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-green-wd">hello</h1>
        <a href="https://github.com/Hy-Nguyen/draganddrop" target="_blank">
          <h1 className="text-green-highlight-wd flex items-center gap-2 text-xl hover:underline">
            Code <Git />
          </h1>
        </a>
      </div>
      <SortExample />
    </main>
  );
}
