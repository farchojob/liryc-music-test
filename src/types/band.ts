/**
 * Domain types representing bands and their details. These are the single
 * source of truth used across API routes, components and fetchers so we keep
 * the shape consistent and easy to refactor.
 */
export type Band = {
  /** 3-digit zero-padded artist identifier, e.g. "001" */
  id: string;
  /** Display name of the band. Mapped from `band_name` in the raw JSON. */
  bandName: string;
  /** Album name used in the list/grid card. */
  album: string;
  /** One of: rock | pop | country (per mock data). */
  genre: string;
  /** Resolved image path. We still keep a runtime <Image> onError fallback. */
  imageSrc: string;
};

export type BandDetail = {
  id: string;
  /** Short marketing copy for the band. */
  description: string;
  album?: string;
  imageSrc: string;
};
