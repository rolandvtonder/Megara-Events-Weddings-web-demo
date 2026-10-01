"use client";

import { useEffect } from "react";
import { useBoard } from "@/store/enquiry";

/** Rehydrates the persisted enquiry board after mount so server and first client render always match. */
export function StoreHydrator() {
  useEffect(() => {
    useBoard.persist.rehydrate();
  }, []);
  return null;
}
