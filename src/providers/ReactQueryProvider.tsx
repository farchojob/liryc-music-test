"use client";

/**
 * Provides a shared React Query client for the app. Co-located here so we can
 * configure retry/caching policies in one place.
 */
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
