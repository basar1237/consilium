const steps = [
  {
    step: 1,
    title: "Discovery & scope",
    description:
      "We start with a structured conversation to understand your objectives, risk landscape, stakeholders, and constraints.",
  },
  {
    step: 2,
    title: "Assessment & evidence",
    description:
      "We review documentation, facilitate workshops where helpful, and apply proportionate analysis so recommendations rest on clear evidence.",
  },
  {
    step: 3,
    title: "Recommendations",
    description:
      "You receive practical options aligned with your risk appetite and regulatory context, with trade-offs explained in business language.",
  },
  {
    step: 4,
    title: "Implementation support",
    description:
      "We help embed changes through playbooks, governance design, and working alongside your teams—without displacing ownership.",
  },
  {
    step: 5,
    title: "Review & continuous improvement",
    description:
      "We agree review points and how to refresh the approach so it stays proportionate as your strategy and context evolve.",
  },
] as const;

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="relative overflow-hidden bg-white py-20">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
            Our approach
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            How we work with you
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            A clear, five-stage engagement model—transparent at each step, so
            you always know what happens next and why it matters.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <ul className="space-y-10 md:space-y-12">
            {steps.map((item) => (
              <li key={item.step} className="relative flex gap-6 md:gap-8">
                <div className="flex shrink-0 flex-col items-center md:w-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2B7DE9] to-[#1a5fc4] text-sm font-bold text-white shadow-md shadow-[#2B7DE9]/25 ring-4 ring-white">
                    {item.step}
                  </div>
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-6 shadow-sm transition-shadow duration-300 hover:border-[#2B7DE9]/20 hover:shadow-md md:p-8">
                  <h3 className="text-xl font-semibold text-[#1A1A2E]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
