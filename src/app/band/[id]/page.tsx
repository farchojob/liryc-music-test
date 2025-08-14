import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AppLayout } from "@/components/AppLayout";

async function fetchDetail(id: string) {
  // For SSR, we can call the API route directly instead of making HTTP requests
  const { GET } = await import("@/app/api/bands/[id]/route");
  const request = new Request(`http://localhost/api/bands/${id}`);
  const response = await GET(request, { params: Promise.resolve({ id }) });

  if (!response.ok) throw new Error("Failed to fetch band detail");
  return response.json();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Band #${id} - Lyric Music`,
    description: `Discover Band #${id} and their music on Lyric Music platform.`,
  };
}

export default async function BandDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const detail = await fetchDetail(id);

  const Left = (
    <article data-testid="band-detail-content" className="grid gap-6 md:grid-cols-[400px_1fr]">
      <figure data-testid="band-detail-image" className="relative h-[300px] w-full overflow-hidden rounded-md">
        <Image src={detail.imageSrc} alt={`${detail.id} band promotional photo`} fill className="object-cover" />
      </figure>
      <div data-testid="band-detail-info" className="space-y-4">
        <h1 className="text-accent text-band-name text-3xl">Band #{detail.id}</h1>
        {detail.album && <p className="text-muted-foreground text-album-name">Album: {detail.album}</p>}
        <p className="text-body">{detail.description}</p>
        <nav aria-label="Band navigation">
          <Link
            href="/"
            className="border-input bg-secondary inline-flex items-center rounded-md border px-3 py-2 text-sm"
            aria-label="Return to band collection"
          >
            ← Back to Bands
          </Link>
        </nav>
      </div>
    </article>
  );

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <AppLayout left={Left} />
    </main>
  );
}
