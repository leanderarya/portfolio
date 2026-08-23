const pills = [
  "⚡ System Architecture",
  "🎯 Clean Code & Type Safety",
  "🚀 CI/CD & Cloud",
  "🎨 Pixel-Precise Frontend",
];

export default function Statement() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-y border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Philosophy</span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-snug mt-4">
          I build by blending{" "}
          <span className="font-bold underline decoration-lime decoration-4">clear architecture</span>
          , quality-first engineering, and user empathy to{" "}
          <span className="font-editorial italic text-neutral-900">craft products</span> that solve real
          problems.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 sm:mt-10">
          {pills.map((p) => (
            <span
              key={p}
              className="px-4 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-sm text-xs font-semibold text-neutral-700"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}