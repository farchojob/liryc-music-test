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
    <>
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:no-underline"
      >
        Skip to main content
      </a>
      <main className="min-h-screen p-4 sm:p-6 lg:p-8">
        <Suspense>
          <AppLayout left={<BandGrid />} />
        </Suspense>
      </main>
    </>
  );
}
