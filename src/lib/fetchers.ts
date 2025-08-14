/**
 * Client-side fetchers used by React Query. These call the local API routes
 * so the data access layer is consistent whether we keep files or move to a DB.
 */
import { Band, BandDetail } from "@/types/band";

export async function fetchBands(): Promise<Band[]> {
  const res = await fetch("/api/bands", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch bands");
  return res.json();
}

export async function fetchBandDetail(id: string): Promise<BandDetail> {
  const res = await fetch(`/api/bands/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch band detail");
  return res.json();
}
