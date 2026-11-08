"use client";

import { useEffect } from "react";

export default function LocalLenisExperiment() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hadNativeSmooth = root.classList.contains("scroll-smooth");
    let cancelled = false;
    let loading = false;
    let lenis: { destroy: () => void } | undefined;

    const restoreNativeScroll = () => {
      if (hadNativeSmooth) root.classList.add("scroll-smooth");
    };

    const stop = () => {
      lenis?.destroy();
      lenis = undefined;
      restoreNativeScroll();
    };

    const start = () => {
      if (cancelled || reduceMotion.matches || lenis || loading) return;

      root.classList.remove("scroll-smooth");
      loading = true;

      void import("lenis")
        .then(({ default: Lenis }) => {
          loading = false;
          if (cancelled || reduceMotion.matches) {
            restoreNativeScroll();
            return;
          }

          root.classList.remove("scroll-smooth");
          lenis = new Lenis({
            anchors: false,
            autoRaf: true,
            smoothWheel: true,
          });
        })
        .catch(() => {
          loading = false;
          restoreNativeScroll();
        });
    };

    // Lenis 1.3.23 has no reduced-motion option, so stop intercepting scroll when requested.
    const syncMotionPreference = () => {
      if (reduceMotion.matches) stop();
      else start();
    };

    reduceMotion.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      cancelled = true;
      reduceMotion.removeEventListener("change", syncMotionPreference);
      stop();
    };
  }, []);

  return null;
}
