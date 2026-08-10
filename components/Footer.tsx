import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { site } from "@/data/site";

export default function Footer() {
  const socials = [
    { name: "GitHub", url: site.github, icon: <FaGithub className="text-base" /> },
    { name: "LinkedIn", url: site.linkedin, icon: <FaLinkedin className="text-base" /> },
  ].filter((s) => s.url);

  return (
    <footer className="bg-white border-t border-[#E5E7EB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-editorial italic text-xl">Arya</span>
          <span className="text-sm font-bold">Ajisadda</span>
          <span className="text-xs text-neutral-400 ml-2">© 2026. All rights reserved.</span>
        </div>
        {socials.length > 0 && (
          <div className="flex items-center gap-6 text-neutral-600 text-sm">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors flex items-center gap-1.5"
              >
                {s.icon} {s.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}