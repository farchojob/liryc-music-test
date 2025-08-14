"use client";

import React from "react";

import { Bell, Menu, MessageSquareText, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { type Genre, useFiltersStore } from "@/store/filters";

import { BrandMark } from "./BrandMark";
import { ClientOnly } from "./ClientOnly";
import { GenrePill } from "./GenrePill";

const GENRES: Genre[] = ["all", "country", "rock", "pop"];

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);
  const { selectedGenre, setGenre } = useFiltersStore();

  const handleGenreSelect = (genre: Genre) => {
    setGenre(genre);
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            data-testid="mobile-sidebar-trigger"
            aria-label="Open menu"
            className="h-[36px] w-[36px] shrink-0 rounded-[10px] bg-[var(--panel-bg)]"
          >
            <Menu className="text-icon-muted h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent data-testid="mobile-sidebar" side="left" className="bg-[var(--panel-bg)]">
          <SheetHeader className="p-4">
            <div className="justify-self-center">
              <BrandMark variant="mobile" />
            </div>
            <SheetTitle className="sr-only">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col gap-6 p-4">
            <div className="flex flex-col gap-3" role="group" aria-label="Filter bands by genre">
              <ClientOnly
                fallback={
                  // Show "All" as active during SSR/initial load
                  GENRES.map(g => {
                    const label = g === "all" ? "All" : g[0].toUpperCase() + g.slice(1);
                    return (
                      <GenrePill
                        key={g}
                        active={g === "all"}
                        label={label}
                        className="w-full"
                        onClick={() => handleGenreSelect(g)}
                      />
                    );
                  })
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
                      className="w-full"
                      onClick={() => handleGenreSelect(g)}
                    />
                  );
                })}
              </ClientOnly>
            </div>
            <Separator className="my-4" />
            <div className="mt-auto flex flex-col gap-3">
              <Button variant="outline" className="h-auto justify-start gap-3 py-2">
                <Bell className="text-icon-muted h-5 w-5" />
                <span>Notifications</span>
              </Button>
              <Button variant="outline" className="h-auto justify-start gap-3 py-2">
                <Settings2 className="text-icon-muted h-5 w-5" />
                <span>Settings</span>
              </Button>
              <Button variant="outline" className="h-auto justify-start gap-3 py-2">
                <MessageSquareText className="text-icon-muted h-5 w-5" />
                <span>Messages</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
