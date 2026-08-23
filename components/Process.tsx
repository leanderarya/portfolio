import { FaDiagramProject, FaCode, FaRocket } from "react-icons/fa6";

const steps = [
  {
    n: "01",
    title: "Discover & Architect",
    desc: "Analyzing technical requirements, database models, and user journeys to construct a robust system blueprint.",
    tag: "System Design & Schema",
    icon: <FaDiagramProject />,
  },
  {
    n: "02",
    title: "Build & Optimize",
    desc: "Writing modular, type-safe code with React / Next.js and Laravel, ensuring high performance, SEO, and responsive accessibility.",
    tag: "Clean Code & Best Practices",
    icon: <FaCode />,
  },
  {
    n: "03",
    title: "Deploy & Scale",
    desc: "Configuring deployment pipelines and containerizing services to ship reliable applications to production.",
    tag: "CI/CD & Cloud",
    icon: <FaRocket />,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
          / Engineering Process
        </span>
        <h2 className="text-3xl sm:text-5xl font-editorial text-neutral-900 mt-2">Here's how I work</h2>
        <p className="text-sm text-neutral-600 mt-3">
          Combining engineering rigor, clean code architecture, and high aesthetic standards from inception to deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-soft-ambient hover:-translate-y-1 transition-all duration-300 group ${
              i === 1 ? "md:-translate-y-3 hover:-translate-y-4" : ""
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-brand-bg border border-[#E5E7EB] flex items-center justify-center font-bold text-lg text-neutral-800 mb-6 group-hover:bg-lime transition-colors">
              {s.n}
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">{s.title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-400">
              {s.icon}
              <span>{s.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-20 pt-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start md:divide-x md:divide-[#E5E7EB]/80">
          <div className="pr-0 md:pr-8 space-y-6">
            <div className="flex items-start justify-between">
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                Working with Arya was seamless from start to finish. He understood our goals quickly,
                asked the right questions, and delivered a system that scaled cleanly with our growing
                web app.
              </p>
              <span className="text-2xl font-serif text-neutral-900 shrink-0 ml-4">”</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center text-xs font-bold text-neutral-900">
                DR
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">Daniel Reed</div>
                <div className="text-[11px] text-neutral-500">Founder of NovaLabs</div>
              </div>
            </div>
          </div>

          <div className="pl-0 md:pl-12 space-y-6">
            <div className="flex items-start justify-between">
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                Arya brought our product vision to life with incredible attention to detail. He
                balanced business needs with solid engineering — our platform is not just beautiful,
                but genuinely reliable.
              </p>
              <span className="text-2xl font-serif text-neutral-900 shrink-0 ml-4">”</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#18181B] text-white flex items-center justify-center text-xs font-bold">
                SN
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900">Sarah Nguyen</div>
                <div className="text-[11px] text-neutral-500">Product Manager at FlowSync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
