"use client";

import Image from "next/image";

type BrandMarkProps = {
  variant: "mobile" | "desktop";
};

export function BrandMark({ variant }: BrandMarkProps) {
  // Note: variant is used for potential future mobile/desktop differences
  return (
    <div className="relative flex items-center">
      <Image
        src="/logo2.png"
        alt="Lyric Music logo"
        width={50}
        height={50}
        priority
        sizes="50px"
        className="h-[50px] w-auto"
      />
    </div>
  );
}
