import { useEffect, useState } from "react";

/**
 * Hook to prevent hydration mismatch by waiting for client-side hydration.
 * This prevents the flash of default values before localStorage values are loaded.
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This only runs on the client after hydration
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
