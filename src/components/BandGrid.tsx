"use client";

/**
 * Responsive grid of band cards. Filtering logic is performed on the client
 * based on filters from the Zustand store (genre and search query).
 */
import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { fetchBands } from "@/lib/fetchers";
import { useFiltersStore } from "@/store/filters";

import { BandCard } from "./BandCard";
import { ClientOnly } from "./ClientOnly";

export function BandGrid() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["bands"], queryFn: fetchBands });
  const { selectedGenre, searchQuery } = useFiltersStore();

  const filtered = useMemo(() => {
    const list = data ?? [];
    // Simple AND filter: both the genre and the query must match if present.
    return list.filter(b => {
      const matchesQ = searchQuery
        ? `${b.bandName} ${b.album}`.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesGenre = selectedGenre === "all" ? true : b.genre === selectedGenre;
      return matchesQ && matchesGenre;
    });
  }, [data, searchQuery, selectedGenre]);

  if (isLoading)
    return (
      <div className="text-muted-foreground text-sm" aria-live="polite">
        Loading bands...
      </div>
    );
  if (isError)
    return (
      <div className="text-destructive text-sm" role="alert" aria-live="assertive">
        Error loading bands.
      </div>
    );

  return (
    <ClientOnly fallback={<div className="text-muted-foreground text-sm">Loading bands...</div>}>
      <section aria-label="Band collection">
        <h2 className="sr-only">Music Bands</h2>
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {filtered.length === 1 ? `${filtered.length} band found` : `${filtered.length} bands found`}
        </div>
        <div className="mx-auto grid w-full max-w-[1267px] grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:place-items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filtered.map(b => (
            <BandCard key={b.id} band={b} />
          ))}
        </div>
      </section>
    </ClientOnly>
  );
}
