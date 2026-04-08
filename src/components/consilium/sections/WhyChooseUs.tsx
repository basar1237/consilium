const highlights = [
  {
    title: "Proven Expertise",
    description: "Decades of combined experience across risk management disciplines",
  },
  {
    title: "Tailored Solutions",
    description: "Bespoke frameworks designed for your organisation's unique needs",
  },
  {
    title: "UK Market Focus",
    description: "Deep understanding of the UK regulatory and business landscape",
  },
  {
    title: "Pragmatic Approach",
    description: "Practical, actionable advice that delivers measurable results",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Why Choose Consilium?
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2B7DE9]/10">
                <span className="text-xl font-bold text-[#2B7DE9]">✓</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1A1A2E]">
                {item.title}
              </h3>
              <p className="mt-2 text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
