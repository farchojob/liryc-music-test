/**
 * Main page: top `HeaderBar` plus the `SplitLayout`. We wrap client sections
 * that read URL search params in `Suspense` to satisfy Next.js 15 constraints
 * around `useSearchParams` during prerender.
 */
import { Suspense } from "react";

import { AppLayout } from "@/components/AppLayout";
import { BandGrid } from "@/components/BandGrid";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <Suspense>
        <AppLayout left={<BandGrid />} />
      </Suspense>
    </main>
  );
}
