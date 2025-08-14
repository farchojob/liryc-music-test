/**
 * Minimal UI store: manages the open/closed state of the right panel.
 * Keeping it outside React state avoids prop drilling and keeps the page
 * components focused on data concerns.
 */
import { create } from "zustand";

type UiState = {
  isRightPanelOpen: boolean;
  openRightPanel: () => void;
  closeRightPanel: () => void;
  toggleRightPanel: () => void;
};

export const useUiStore = create<UiState>(set => ({
  isRightPanelOpen: true,
  openRightPanel: () => set({ isRightPanelOpen: true }),
  closeRightPanel: () => set({ isRightPanelOpen: false }),
  toggleRightPanel: () => set(s => ({ isRightPanelOpen: !s.isRightPanelOpen })),
}));
