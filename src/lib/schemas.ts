/**
 * Zod schemas for validating the shape of the JSON files under /public/mock_data.
 * These guard us from silent shape changes and provide typed inference.
 */
import { z } from "zod";

export const BandsJsonSchema = z.array(
  z.object({
    id: z.string(),
    band_name: z.string(),
    album: z.string(),
    genre: z.string(),
  })
);

export type BandsJson = z.infer<typeof BandsJsonSchema>;

export const BandDetailJsonSchema = z.object({
  id: z.string(),
  description: z.string(),
  album: z.string().optional(),
});

export type BandDetailJson = z.infer<typeof BandDetailJsonSchema>;
