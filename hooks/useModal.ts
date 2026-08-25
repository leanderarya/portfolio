"use client";

import { useEffect, useRef } from "react";

// ponytail: focus-trap manual (no lib). Cukup untuk modal pendek; upgrade ke
// @react-aria/focus atau dialog lib kalo modal jadi kompleks.
export function useModal(onClose: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // kunci scroll background saat modal terbuka
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const modal = el;
    const prevActive = document.activeElement as HTMLElement | null;
    modal.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus();
    };
  }, [onClose]);

  return ref;
}
