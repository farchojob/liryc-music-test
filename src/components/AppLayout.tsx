"use client";

import React from "react";

import { useUiStore } from "@/store/ui";

import { HeaderBar } from "./HeaderBar";
import { RightPanel } from "./RightPanel";

type AppLayoutProps = {
  left: React.ReactNode;
};

export function AppLayout({ left }: AppLayoutProps) {
  const { isRightPanelOpen } = useUiStore();

  return (
    <div
      className={`mx-auto grid w-full grid-cols-1 gap-6 lg:gap-8 ${
        isRightPanelOpen
          ? "max-w-[1689px] lg:grid-cols-[minmax(0,1fr)_403px] xl:grid-cols-[1267px_403px] xl:gap-8"
          : "max-w-[1267px] lg:grid-cols-1"
      }`}
    >
      <div id="main-content" data-testid="main-content" className="flex h-full flex-col gap-8">
        <header className="bg-panel flex h-[89px] w-full items-center rounded-[10px] px-4 sm:px-6">
          <HeaderBar />
        </header>
        <main>{left}</main>
      </div>
      {isRightPanelOpen && (
        <aside className="lg:row-span-2" aria-label="Band details panel">
          <RightPanel />
        </aside>
      )}
    </div>
  );
}
