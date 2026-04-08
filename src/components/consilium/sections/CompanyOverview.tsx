import { IconCalendar, IconUsers, IconBriefcase } from '@tabler/icons-react'

const stats = [
  { icon: IconCalendar, label: 'Years Experience', value: '20+' },
  { icon: IconUsers, label: 'Clients Served', value: '100+' },
  { icon: IconBriefcase, label: 'Core Services', value: '6' },
]

export default function CompanyOverview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl lg:text-5xl">
            About Consilium Risk Advisory Group
          </h1>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-8 text-zinc-600">
          <p>
            Consilium Risk Advisory Group was founded by experienced risk professionals with a
            shared belief: that effective risk management should be practical, proportionate, and
            tailored to each organisation&rsquo;s unique circumstances. Based in the United Kingdom,
            we bring decades of combined expertise to help businesses navigate an increasingly
            complex risk landscape.
          </p>
          <p>
            We serve organisations across a broad range of sectors, from financial services and
            energy to the public sector and beyond. Our team draws on real-world experience in
            enterprise risk management, regulatory compliance, operational resilience, and
            governance to deliver advisory services that make a measurable difference.
          </p>
          <p>
            What sets Consilium apart is our commitment to a pragmatic approach. We don&rsquo;t deal
            in abstract frameworks or generic templates. We work closely with our clients to
            understand their specific challenges, build bespoke risk strategies, and embed lasting
            capability within their teams.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2B7DE9]/10">
                <stat.icon className="h-7 w-7 text-[#2B7DE9]" stroke={1.5} />
              </div>
              <p className="mt-4 text-3xl font-bold text-[#1A1A2E]">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
