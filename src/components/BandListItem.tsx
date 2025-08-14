"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { defaultBandImageSrc } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { Band } from "@/types/band";

export function BandListItem({ band }: { band: Band }) {
  const params = useSearchParams();
  const selectedId = params.get("id");

  const isSelected = selectedId === band.id;

  return (
    <Link
      href={`/band/${band.id}`}
      className={cn(
        "hover:bg-accent/60 flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors",
        isSelected && "bg-accent"
      )}
    >
      <div className="relative h-12 w-12 flex-none overflow-hidden rounded">
        <Image
          src={band.imageSrc}
          alt={`${band.bandName} album cover`}
          fill
          className="object-cover"
          onError={e => {
            (e.target as HTMLImageElement).setAttribute("src", defaultBandImageSrc());
          }}
        />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-band-name truncate">{band.bandName}</span>
        <span className="text-muted-foreground text-album-name truncate text-sm">{band.album}</span>
      </div>
      <span className="text-muted-foreground ml-auto text-xs uppercase">{band.genre}</span>
    </Link>
  );
}
