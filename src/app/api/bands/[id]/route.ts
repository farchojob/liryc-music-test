/**
 * GET /api/bands/[id]
 * Attempts to read `public/mock_data/<id>.json`. If not present, returns a
 * friendly fallback copy so the UI always renders something usable.
 */
import { NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

import { BandDetailJsonSchema } from "@/lib/schemas";
import { BandDetail } from "@/types/band";

// helper to pick the correct existing image variant for an id
async function pickImageSrc(id: string): Promise<string> {
  const imagesDir = path.join(process.cwd(), "public", "images");
  const primary = path.join(imagesDir, `im${id}.png`);
  const alt = path.join(imagesDir, `im00${id.slice(1)}.png`);
  try {
    await fs.access(primary);
    return `/images/im${id}.png`;
  } catch {
    try {
      await fs.access(alt);
      return `/images/im00${id.slice(1)}.png`;
    } catch {
      return "/images/default.png";
    }
  }
}

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const filePath = path.join(process.cwd(), "public", "mock_data", `${id}.json`);
    try {
      const file = await fs.readFile(filePath, "utf8");
      const json = JSON.parse(file);
      const parsed = BandDetailJsonSchema.parse(json);
      const detail: BandDetail = {
        id: parsed.id,
        description: parsed.description,
        album: parsed.album,
        imageSrc: await pickImageSrc(parsed.id),
      };
      return NextResponse.json(detail);
    } catch {
      // Fallback when detail json does not exist
      const fallback: BandDetail = {
        id,
        description: "No details available for this artist.",
        imageSrc: await pickImageSrc(id),
      };
      return NextResponse.json(fallback);
    }
  } catch {
    const fallback: BandDetail = {
      id,
      description: "No details available for this artist.",
      imageSrc: await pickImageSrc(id),
    };
    return NextResponse.json(fallback, { status: 200 });
  }
}
