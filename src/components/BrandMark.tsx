"use client";

import Image from "next/image";

export function BrandMark() {
  return (
    <div className="relative flex h-[70px] w-[130px] flex-shrink-0 items-center">
      <Image
        src="/logo2.png"
        alt="Lyric Music logo"
        width={130}
        height={70}
        priority
        sizes="130px"
        className="h-[70px] w-[130px] object-contain"
      />
    </div>
  );
}
