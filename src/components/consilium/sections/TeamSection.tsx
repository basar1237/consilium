import { teamMembers } from "@/constants/team";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamSection() {
  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Our people are our greatest strength. Each member of the Consilium
            team brings deep expertise and a genuine commitment to helping
            clients succeed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2B7DE9] text-2xl font-bold text-white">
                {getInitials(member.name)}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#1A1A2E]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#2B7DE9]">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
