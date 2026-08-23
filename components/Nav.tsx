"use client";

import { useState } from "react";
import { FaBars, FaXmark, FaArrowRight } from "react-icons/fa6";
import { site } from "@/data/site";

export default function Nav({ onOpenContact }: { onOpenContact: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About Me" },
    { href: "#process", label: "How I Work" },
    { href: "#experience", label: "Experience" },
    { href: "#works", label: "Selected Works" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-[#E5E7EB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs tracking-tighter group-hover:bg-lime group-hover:text-neutral-900 transition-colors">
            CA
          </div>
          <span className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight text-neutral-900">{site.brand}</span>
            <span className="text-[10px] text-neutral-500 font-medium mt-0.5">{site.name}</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Get in Touch
            <FaArrowRight className="text-xs" />
          </button>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden p-2.5 rounded-full bg-white border border-[#E5E7EB] text-neutral-800 hover:bg-neutral-50"
          >
            {open ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" role="navigation" aria-label="Mobile navigation" className="lg:hidden border-b border-[#E5E7EB] bg-white px-6 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-neutral-800 hover:text-black"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOpenContact();
            }}
            className="w-full text-center bg-[#18181B] text-white text-sm font-medium py-3 rounded-full"
          >
            Get in Touch →
          </button>
        </div>
      )}
    </header>
  );
}
