"use client";

/**
 * Two-column responsive layout: the grid takes 2/3 and the right panel 1/3 on
 * desktop. When the right panel is closed, the grid expands to full width.
 */
import { BandGrid } from "./BandGrid";
import { HeaderBar } from "./HeaderBar";
import { RightPanel } from "./RightPanel";

export function SplitLayout() {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_374px] lg:gap-8 xl:max-w-[1730px] xl:grid-cols-[1267px_374px] xl:gap-8">
      <div>
        <div className="flex h-full flex-col gap-8">
          <div className="bg-panel flex h-auto w-full items-center rounded-[10px] px-4 sm:h-[89px] sm:px-6">
            <HeaderBar />
          </div>
          <BandGrid />
        </div>
      </div>
      <div className="lg:row-span-2">
        <RightPanel />
      </div>
    </div>
  );
}
