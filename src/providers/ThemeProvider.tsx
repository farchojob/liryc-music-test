"use client";

/**
 * Wraps the app with next-themes to enable system/light/dark themes.
 * We use attribute="class" to leverage Tailwind's class-based dark mode.
 */
import * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
