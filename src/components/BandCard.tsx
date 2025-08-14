"use client";

/**
 * Single visual card for a band with an image background and text overlay.
 * Clicking the card sets the `id` search param used by the right panel.
 */
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { Band } from "@/types/band";

export function BandCard({ band }: { band: Band }) {
  const [imgSrc, setImgSrc] = React.useState(band.imageSrc);

  return (
    <article
      data-testid="band-card"
      className="group relative mx-auto h-[392px] w-full max-w-[403.94px] overflow-hidden rounded-[10px] bg-black"
    >
      <Link href={`/band/${band.id}`} className="block h-full w-full" aria-label={`View details for ${band.bandName}`}>
        {/* Top image section */}
        <div className="relative h-[195.45px] w-full overflow-hidden rounded-t-[10px]">
          <Image
            src={imgSrc}
            alt={`${band.bandName} band photo`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            onError={() => setImgSrc("/images/default.png")}
            unoptimized
          />
        </div>

        {/* Info section */}
        <div className="h-[196.55px] px-6 py-5 text-left">
          <h3 className="text-card-title text-band-name leading-snug group-hover:underline">{band.bandName}</h3>
          <div className="text-secondary text-album-name mt-2 text-[13px]">{band.album}</div>
          <p className="text-muted-custom text-body mt-4 line-clamp-3 text-[13px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ve
          </p>
        </div>
      </Link>
    </article>
  );
}
