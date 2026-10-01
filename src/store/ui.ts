"use client";

import { create } from "zustand";

export type Toast = {
  id: number;
  title: string;
  body?: string;
  image?: string;
  tone?: "default" | "success" | "info";
};

export type LightboxState = { images: { id: string; alt: string }[]; index: number } | null;

type UIState = {
  introDone: boolean;
  boardOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  storyOpen: boolean;
  lightbox: LightboxState;
  toasts: Toast[];
  setIntroDone: () => void;
  setBoard: (open: boolean) => void;
  setSearch: (open: boolean) => void;
  setMenu: (open: boolean) => void;
  setStory: (open: boolean) => void;
  openLightbox: (images: { id: string; alt: string }[], index: number) => void;
  setLightboxIndex: (index: number) => void;
  closeLightbox: () => void;
  toast: (t: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
};

let toastId = 0;

export const useUI = create<UIState>()((set, get) => ({
  introDone: false,
  boardOpen: false,
  searchOpen: false,
  menuOpen: false,
  storyOpen: false,
  lightbox: null,
  toasts: [],
  setIntroDone: () => set({ introDone: true }),
  setBoard: (open) => set({ boardOpen: open, searchOpen: false, menuOpen: false }),
  setSearch: (open) => set({ searchOpen: open, menuOpen: false }),
  setMenu: (open) => set({ menuOpen: open }),
  setStory: (open) => set({ storyOpen: open }),
  openLightbox: (images, index) => set({ lightbox: { images, index } }),
  setLightboxIndex: (index) => {
    const lb = get().lightbox;
    if (lb) set({ lightbox: { ...lb, index: ((index % lb.images.length) + lb.images.length) % lb.images.length } });
  },
  closeLightbox: () => set({ lightbox: null }),
  toast: (t) => {
    const id = ++toastId;
    set({ toasts: [...get().toasts.slice(-2), { ...t, id }] });
    window.setTimeout(() => get().dismiss(id), 4000);
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));

/** True while any overlay that should lock page scrolling is open. */
export const selectScrollLocked = (s: UIState) => s.boardOpen || s.searchOpen || s.menuOpen || s.storyOpen || s.lightbox !== null;
