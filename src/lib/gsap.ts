"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Plugins are registered exactly once, here; every component imports gsap from this module.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, CustomEase, useGSAP);
  CustomEase.create("silk", "0.7, 0, 0.2, 1");
  gsap.defaults({ ease: "expo.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip, CustomEase, useGSAP };
