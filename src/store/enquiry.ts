"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Something a visitor wants to talk about: a service/package, or a celebration they loved. */
export type BoardItem = {
  id: string;
  kind: "service" | "inspiration";
  title: string;
  meta?: string;
  image: string;
  href?: string;
};

type BoardState = {
  items: BoardItem[];
  /** Adds if absent, removes if present. Returns true when the item is now on the board. */
  toggle: (item: BoardItem) => boolean;
  add: (item: BoardItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useBoard = create<BoardState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const on = !get().items.some((i) => i.id === item.id);
        set((s) => ({ items: on ? [item, ...s.items] : s.items.filter((i) => i.id !== item.id) }));
        return on;
      },
      add: (item) => set((s) => (s.items.some((i) => i.id === item.id) ? s : { items: [item, ...s.items] })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    // skipHydration: rehydrated after mount by StoreHydrator so SSR and first paint always match.
    { name: "megara-board", skipHydration: true },
  ),
);
