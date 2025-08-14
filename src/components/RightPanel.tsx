"use client";

/**
 * Right-hand panel showing either static copy (no selection) or detailed info
 * for the selected band. Visibility is controlled by the `ui` store and
 * content is fetched via React Query using the selected `id`.
 */
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { Flag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchBandDetail } from "@/lib/fetchers";
import { useUiStore } from "@/store/ui";

export function RightPanel() {
  const params = useSearchParams();
  const id = params.get("id");
  const { isRightPanelOpen, closeRightPanel } = useUiStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["band", id],
    queryFn: () => fetchBandDetail(id as string),
    enabled: Boolean(id),
  });

  if (!isRightPanelOpen) return null;

  const Promo = () => (
    <div className="bg-promo flex h-[112px] w-full shrink-0 items-center gap-2 rounded-[10px] p-4">
      <div className="relative flex w-[100px] items-center gap-2">
        <Image
          src="/promo-flags.svg"
          alt="Promotional flags decoration"
          width={100}
          height={100}
          className="absolute mt-12"
        />
      </div>
      <div className="space-y- flex-1">
        <div className="text-accent text-band-name text-[19px] uppercase">Coming soon</div>
        <div className="text-muted-foreground text-body text-[13px]">
          Check out whats new for 2025 from the Lyric team.
        </div>
      </div>
    </div>
  );

  if (!id) {
    return (
      <Card
        data-testid="right-panel"
        className="bg-panel relative flex w-full flex-col rounded-[10px] border-none p-6 shadow-none md:h-[1111px] md:w-[374px]"
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="text-card-title text-band-name h-[36px] pl-2 leading-[36px]">Welcome to Lyric Music</div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close band details panel"
            onClick={closeRightPanel}
            className="h-auto w-auto p-1"
          >
            <X className="h-5 w-5 text-neutral-300" strokeWidth={3} />
          </Button>
        </div>
        <div className="text-muted-foreground text-panel-body flex-1 space-y-4 text-base">
          <p className="pr-4 pl-2">
            We're thrilled to have you join us on this musical journey! Lyric Music is your gateway to a fresh and
            immersive way to enjoy the bands and artists you love. Whether you're searching for your all-time favorite
            tracks, exploring curated playlists crafted to fit every mood, or discovering new songs that will soon
            become your go-to anthems, Lyric Music is here to elevate your listening experience.
          </p>
          <p className="pr-4 pl-2">
            Imagine having the perfect soundtrack for every moment of your life, from energizing workouts to peaceful
            evenings under the stars. With an intuitive interface designed to make finding music effortless and
            enjoyable, you'll spend less time searching and more time grooving. Best of all, it's completely
            free—because we believe that great music should be accessible to everyone.
          </p>
          <p className="pr-4 pl-2">
            At Lyric Music, we're passionate about creating a community where music lovers like you can explore,
            connect, and celebrate the power of sound. So dive in, press play, and let the music move you. Welcome to
            your new favorite way to listen.
          </p>
        </div>
        <div className="mt-auto pr-2 pl-2">
          <div data-testid="promo-section">
            <Promo />
          </div>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-panel relative mx-auto w-full rounded-[10px] border-none p-6 shadow-none md:h-[1111px] md:w-[374px]">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close band details panel"
          onClick={closeRightPanel}
          className="absolute top-3 right-3 h-auto w-auto p-1"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="text-body" aria-live="polite">
          Loading band details...
        </div>
      </Card>
    );
  }
  if (isError || !data) {
    return (
      <Card className="bg-panel relative mx-auto w-full rounded-[10px] border-none p-6 shadow-none md:h-[1111px] md:w-[374px]">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close band details panel"
          onClick={closeRightPanel}
          className="absolute top-3 right-3 h-auto w-auto p-1"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="text-body" role="alert" aria-live="assertive">
          Failed to load band details.
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-panel relative mx-auto flex w-full flex-col gap-4 rounded-[10px] border-none p-6 shadow-none md:h-[1111px] md:w-[374px]">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded">
          <Image src={data.imageSrc} alt={`${data.id} band thumbnail`} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <div className="text-card-title text-band-name h-[36px] w-[270px] leading-[36px]">Band #{data.id}</div>
          {data.album && <div className="text-muted-foreground text-album-name text-sm">Album: {data.album}</div>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close band details panel"
          onClick={closeRightPanel}
          className="ml-auto h-auto w-auto self-start p-1"
        >
          <X className="h-5 w-5 text-neutral-300" strokeWidth={3} />
        </Button>
      </div>
      <p className="text-foreground/90 text-body text-sm leading-relaxed">{data.description}</p>
      <Promo />
    </Card>
  );
}
