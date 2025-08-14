"use client";

import { useMemo } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchBands } from "@/lib/fetchers";

import { BandListItem } from "./BandListItem";

const GENRES = ["rock", "pop", "country"] as const;

export function BandList() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["bands"], queryFn: fetchBands });
  const params = useSearchParams();
  const router = useRouter();

  const q = params.get("q")?.toLowerCase() ?? "";
  const genre = params.get("genre") ?? "";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/?${next.toString()}`);
  };

  const filtered = useMemo(() => {
    const list = data ?? [];
    return list.filter(b => {
      const matchesQ = q ? `${b.bandName} ${b.album}`.toLowerCase().includes(q) : true;
      const matchesGenre = genre ? b.genre === genre : true;
      return matchesQ && matchesGenre;
    });
  }, [data, q, genre]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <Input placeholder="Search bands..." defaultValue={q} onChange={e => setParam("q", e.currentTarget.value)} />
        <div className="flex gap-2">
          {GENRES.map(g => (
            <Badge
              key={g}
              variant={genre === g ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setParam("genre", genre === g ? "" : g)}
            >
              {g}
            </Badge>
          ))}
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)] pr-2">
        <div className="flex flex-col gap-2">
          {isLoading && <div className="text-muted-foreground text-sm">Loading bands...</div>}
          {isError && <div className="text-destructive text-sm">Error loading bands.</div>}
          {!isLoading && filtered.map(band => <BandListItem key={band.id} band={band} />)}
          {!isLoading && filtered.length === 0 && <div className="text-muted-foreground text-sm">No bands found.</div>}
        </div>
      </ScrollArea>
    </div>
  );
}
