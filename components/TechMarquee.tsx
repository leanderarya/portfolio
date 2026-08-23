import {
  FaReact,
  FaJs,
  FaDocker,
  FaNodeJs,
  FaLaravel,
  FaDatabase,
} from "react-icons/fa6";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

const techs = [
  { name: "React 19", icon: <FaReact className="text-xl" /> },
  { name: "Next.js 15", icon: <SiNextdotjs className="text-xl" /> },
  { name: "TypeScript", icon: <FaJs className="text-xl" /> },
  { name: "Tailwind v4", icon: <SiTailwindcss className="text-xl" /> },
  { name: "Docker", icon: <FaDocker className="text-xl" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-xl" /> },
  { name: "Laravel", icon: <FaLaravel className="text-xl" /> },
  { name: "PostgreSQL", icon: <FaDatabase className="text-xl" /> },
];

function Row() {
  return (
    <div className="flex items-center space-x-12 sm:space-x-20 shrink-0 text-neutral-700 font-semibold text-sm">
      {techs.map((t) => (
        <span key={t.name} className="flex items-center gap-2 whitespace-nowrap">
          {t.icon} {t.name}
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section className="py-10 border-y border-[#E5E7EB]/70 bg-white/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
          Core Technologies & Ecosystem
        </span>
      </div>
      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="animate-marquee">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
