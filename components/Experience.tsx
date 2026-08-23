import { site } from "@/data/site";

const history = [
  {
    role: "Software Engineer / Full-Stack Developer",
    org: "Freelance & Client Projects",
    period: "2021 — Present",
  },
  {
    role: "Web Developer (Laravel / React)",
    org: "Enterprise POS & CMS Solutions",
    period: "2020 — 2021",
  },
  {
    role: "Frontend Developer",
    org: "Digital Product Projects",
    period: "2018 — 2020",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 space-y-4">
          <span className="text-xs font-bold text-lime-600 uppercase tracking-widest">Background</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Building production software{" "}
            <span className="font-editorial italic font-normal text-neutral-500">since 2018</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
            Arya Ajisadda is a full-stack software engineer focused on robust web applications,
            CMS platforms, and POS systems — from backend architecture to accessible, pixel-perfect
            frontends.
          </p>

          <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-neutral-700">
            <a
              href={site.github && `https://github.com/${site.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={site.github ? "hover:text-lime-600 transition-colors" : "pointer-events-none text-neutral-400"}
            >
              GitHub ↗
            </a>
            <span className="text-neutral-300">•</span>
            <a
              href={site.linkedin && `https://linkedin.com/in/${site.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={site.linkedin ? "hover:text-lime-600 transition-colors" : "pointer-events-none text-neutral-400"}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] space-y-6">
          {history.map((h, i) => (
            <div
              key={h.role}
              className={`flex items-center justify-between ${i < history.length - 1 ? "border-b border-[#E5E7EB] pb-4" : ""}`}
            >
              <div>
                <h4 className="font-bold text-neutral-900 text-sm sm:text-base">{h.role}</h4>
                <p className="text-xs text-neutral-500">{h.org}</p>
              </div>
              <span className="text-xs font-bold text-neutral-500 font-mono">{h.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}