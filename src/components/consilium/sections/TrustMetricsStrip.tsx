const pillars = [
  {
    title: "Six practice areas",
    description:
      "Enterprise risk, compliance, resilience, cyber, internal audit, and strategic risk—delivered as an integrated view where you need it.",
  },
  {
    title: "ISO 31000–aligned",
    description:
      "Methodologies grounded in internationally recognised risk management principles, tailored to your sector and maturity.",
  },
  {
    title: "UK regulatory context",
    description:
      "Advice framed for operating in the United Kingdom—proportionate, defensible, and understandable to boards and regulators.",
  },
  {
    title: "Board-ready outputs",
    description:
      "Clear papers, dashboards, and narratives that support decisions—not lengthy reports that gather dust.",
  },
];

export default function TrustMetricsStrip() {
  return (
    <section className="relative bg-[#1A1A2E] py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(43,125,233,0.18),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
          Why teams work with us
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Credible delivery, without the noise
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#2B7DE9]/40 hover:bg-white/[0.07]"
            >
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
