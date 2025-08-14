/**
 * GET /api/bands
 * Reads `public/mock_data/bands.json` from the filesystem, validates structure
 * with Zod, and maps it to the internal `Band` type.
 *
 * We prefer FS read over `fetch('/mock_data/...')` so this also works in
 * server-only contexts and avoids extra HTTP work during SSR.
 */
import { NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

import { BandsJsonSchema } from "@/lib/schemas";
import { Band } from "@/types/band";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "mock_data", "bands.json");
    const file = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(file);
    const parsed = BandsJsonSchema.parse(json);

    const imagesDir = path.join(process.cwd(), "public", "images");

    const bands: Band[] = await Promise.all(
      parsed.map(async b => {
        // Primary naming: im<id>.png → e.g., id=001 => im001.png
        const primary = path.join(imagesDir, `im${b.id}.png`);
        // Some assets are named as im00<lastTwo>.png for ids like 010 → im0010.png
        const alt = path.join(imagesDir, `im00${b.id.slice(1)}.png`);

        let imageSrc = "/images/default.png";
        try {
          await fs.access(primary);
          imageSrc = `/images/im${b.id}.png`;
        } catch {
          try {
            await fs.access(alt);
            imageSrc = `/images/im00${b.id.slice(1)}.png`;
          } catch {
            imageSrc = "/images/default.png";
          }
        }

        return {
          id: b.id,
          bandName: b.band_name,
          album: b.album,
          genre: b.genre,
          imageSrc,
        } satisfies Band;
      })
    );

    return NextResponse.json(bands);
  } catch {
    return NextResponse.json({ error: "Failed to load bands" }, { status: 500 });
  }
}
