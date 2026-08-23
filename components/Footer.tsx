"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion/primitives";

export default function Footer() {
  const socials = [
    { name: "GitHub", url: site.github && `https://github.com/${site.github}`, icon: <FaGithub className="text-base" /> },
    { name: "LinkedIn", url: site.linkedin && `https://linkedin.com/in/${site.linkedin}`, icon: <FaLinkedin className="text-base" /> },
  ].filter((s) => s.url);

  return (
    <footer className="pt-12 pb-8 border-t border-[#E5E7EB] overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-12 text-xs text-neutral-500 font-medium">
          <div>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </div>
          {socials.length > 0 && (
            <div className="flex items-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                >
                  {s.icon} {s.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <Reveal y={16} className="text-center select-none pt-4 pointer-events-none">
          <span className="block text-[12vw] sm:text-[11vw] font-editorial italic text-neutral-100 leading-none tracking-tighter">
            {site.brand}
          </span>
        </Reveal>
      </div>
    </footer>
  );
}
