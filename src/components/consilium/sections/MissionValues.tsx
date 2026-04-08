import {
  IconShieldCheck,
  IconStar,
  IconUsersGroup,
  IconBulb,
} from "@tabler/icons-react";

const values = [
  {
    icon: IconShieldCheck,
    title: "Integrity",
    description:
      "We act with honesty and transparency in every engagement, building trust through ethical practice and impartial advice.",
  },
  {
    icon: IconStar,
    title: "Excellence",
    description:
      "We hold ourselves to the highest professional standards, delivering rigorous analysis and actionable recommendations.",
  },
  {
    icon: IconUsersGroup,
    title: "Collaboration",
    description:
      "We work as an extension of our clients' teams, fostering open dialogue and shared ownership of outcomes.",
  },
  {
    icon: IconBulb,
    title: "Innovation",
    description:
      "We continuously evolve our methods and thinking to help clients stay ahead of emerging risks and opportunities.",
  },
];

export default function MissionValues() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Our Mission &amp; Values
          </h2>
          <p className="mt-6 text-lg leading-8 text-zinc-600">
            Our mission is to empower organisations with the insight,
            frameworks, and confidence they need to manage risk effectively and
            make better decisions. We believe that sound risk management is not a
            barrier to growth &mdash; it is the foundation of it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2B7DE9]/10">
                <value.icon
                  className="h-7 w-7 text-[#2B7DE9]"
                  stroke={1.5}
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1A1A2E]">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
