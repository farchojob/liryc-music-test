import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store for managing filter state (genre, search query) with localStorage persistence.
 * This provides a better UX than URL params for filters, maintaining user preferences
 * across sessions without cluttering the URL.
 */

export type Genre = "all" | "country" | "rock" | "pop";

interface FiltersState {
  // Current selected genre filter
  selectedGenre: Genre;
  // Current search query
  searchQuery: string;

  // Actions
  setGenre: (genre: Genre) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    set => ({
      // Initial state
      selectedGenre: "all",
      searchQuery: "",

      // Actions
      setGenre: genre => set({ selectedGenre: genre }),
      setSearchQuery: query => set({ searchQuery: query }),
      clearFilters: () => set({ selectedGenre: "all", searchQuery: "" }),
    }),
    {
      name: "lyric-filters", // localStorage key
      // Only persist the filter values, not the actions
      partialize: state => ({
        selectedGenre: state.selectedGenre,
        searchQuery: state.searchQuery,
      }),
    }
  )
);
