/**
 * Small helpers to resolve public image paths. We keep these utilities decoupled
 * to make it trivial to swap asset strategy (e.g., CDN) later.
 */
export function resolveBandImageSrc(id: string): string {
  const imagePath = `/images/im${id}.png`;
  // In Next.js we cannot check fs existence on client, rely on server/API to set imageSrc or use onError fallback in <Image/>
  return imagePath;
}

export function defaultBandImageSrc(): string {
  return "/images/default.png";
}
