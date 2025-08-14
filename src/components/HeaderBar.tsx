"use client";

/**
 * Top navigation: logo, genre filters as pills, search field, quick actions.
 * Filter state is managed via Zustand store with localStorage persistence
 * for better UX and to maintain user preferences across sessions.
 */
import { Bell, MessageCircle, Search, Settings } from "lucide-react";
import { PanelRightOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Genre, useFiltersStore } from "@/store/filters";
import { useUiStore } from "@/store/ui";

import { BrandMark } from "./BrandMark";
import { ClientOnly } from "./ClientOnly";
import { GenrePill } from "./GenrePill";
import { MobileSidebar } from "./MobileSidebar";

const GENRES: Genre[] = ["all", "country", "rock", "pop"];

/**
 * Calculate responsive classes for genre pills based on panel state and screen size
 * - lg+ (1024px+): Right panel is beside content, space is limited
 * - < lg (1024px): Right panel is below content, more horizontal space available
 */
function getGenrePillClasses(genre: Genre, isRightPanelOpen: boolean): string {
  // Simple breakpoint system
  const breakpoints = {
    pop: {
      panelOpen: "hidden xl:inline-flex", // 1280px+
      panelClosed: "hidden lg:inline-flex", // 1024px+
    },
    rock: {
      panelOpen: "hidden min-[1200px]:inline-flex", // 1200px+
      panelClosed: "hidden min-[900px]:inline-flex", // 900px+
    },
    country: {
      panelOpen: "hidden min-[1000px]:inline-flex", // 1000px+
      panelClosed: "hidden min-[800px]:inline-flex", // 800px+
    },
    all: {
      panelOpen: "inline-flex", // Always visible
      panelClosed: "inline-flex", // Always visible
    },
  };

  const config = breakpoints[genre];
  return isRightPanelOpen ? config.panelOpen : config.panelClosed;
}

export function HeaderBar() {
  const { selectedGenre, searchQuery, setGenre, setSearchQuery } = useFiltersStore();
  const { isRightPanelOpen, openRightPanel } = useUiStore();

  return (
    <nav className="w-full" role="navigation" aria-label="Main navigation">
      {/* Always desktop layout with responsive adjustments */}
      <div className="flex w-full items-center gap-2 sm:gap-4 lg:gap-8">
        {/* Mobile sidebar - show on small screens only */}
        <div className="sm:hidden">
          <MobileSidebar />
        </div>

        <BrandMark />

        {/* Genre pills - show on larger screens */}
        <div
          data-testid="genre-pills"
          className="hidden items-center gap-3 sm:flex"
          role="group"
          aria-label="Filter bands by genre"
        >
          <ClientOnly
            fallback={
              // Show "All" as active during SSR/initial load
              <>
                {GENRES.map(g => {
                  const label = g === "all" ? "All" : g[0].toUpperCase() + g.slice(1);
                  return (
                    <GenrePill
                      key={g}
                      active={g === "all"}
                      label={label}
                      onClick={() => setGenre(g)}
                      className={getGenrePillClasses(g, isRightPanelOpen)}
                    />
                  );
                })}
              </>
            }
          >
            {GENRES.map(g => {
              const label = g === "all" ? "All" : g[0].toUpperCase() + g.slice(1);
              const active = selectedGenre === g;

              return (
                <GenrePill
                  key={g}
                  active={active}
                  label={label}
                  onClick={() => setGenre(g)}
                  className={getGenrePillClasses(g, isRightPanelOpen)}
                />
              );
            })}
          </ClientOnly>
        </div>
        {/* Search - responsive width */}
        <div className="relative ml-2 h-[36px] w-full max-w-[200px] sm:ml-4">
          <label htmlFor="band-search" className="sr-only">
            Search for bands
          </label>
          <Search
            className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          <Input
            id="band-search"
            type="search"
            placeholder="Search ..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.currentTarget.value)}
            className="bg-search h-[36px] rounded-[18px] border-0 pl-9 focus-visible:border-0 focus-visible:ring-0"
            aria-label="Search for bands"
            aria-describedby="search-description"
          />
          <div id="search-description" className="sr-only">
            Search by band name or album title
          </div>
        </div>

        {/* Action icons and right panel toggle */}
        <div className="ml-auto flex items-center gap-3 sm:gap-6">
          {/* Action icons - hide all below 1280px (xl breakpoint) */}
          <div data-testid="action-icons" className="hidden items-center gap-6 xl:flex">
            <Bell className="text-icon-muted h-7 w-7" />
            <Settings className="text-icon-muted h-7 w-7" />
            <MessageCircle className="text-icon-muted h-7 w-7" />
          </div>

          {/* Right panel toggle - show when panel is closed, after message icon */}
          {!isRightPanelOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openRightPanel}
              aria-label="Open right panel"
              className="h-auto w-auto p-2"
            >
              <PanelRightOpen className="text-icon-muted h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
