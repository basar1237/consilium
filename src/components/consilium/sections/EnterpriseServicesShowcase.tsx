import Link from 'next/link'

const showcaseCards = [
  {
    href: '/services/enterprise-risk-management',
    title: 'Strategic Risk Appetite Frameworks',
    description:
      'Our services include designing risk appetite frameworks that help your organisation understand and quantify its risk tolerance.',
    bg: { url: '/consiliyum-services-bg.webp', position: 'center top' as const },
  },
  {
    href: '/iso-31000',
    title: 'Expert ISO 31000 Risk Management Consulting',
    description:
      'Leverage our expertise in ISO 31000 to enhance your risk management practices and ensure your strategies align with international standards.',
    bg: { url: '/consiliyum-hero-bg.webp', position: 'center center' as const },
  },
  {
    href: '/services/strategic-risk-consulting',
    title: 'Alignment of Risk Management Strategies',
    description:
      'We specialise in aligning your organisational strategies with robust risk management frameworks to drive sustainable growth.',
    bg: { url: '/consiliyum-services-bg.webp', position: 'center bottom' as const },
  },
  {
    href: '/services/enterprise-risk-management',
    title: 'Tailored Risk Registers Development',
    description:
      'We assist in developing customised risk registers that capture and manage your unique business risks effectively and efficiently.',
    bg: { url: '/consiliyum-hero-bg.webp', position: 'right center' as const },
  },
] as const

export default function EnterpriseServicesShowcase() {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-50 text-[#1A1A2E]">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
        <h3 className="text-center text-2xl font-bold tracking-tight text-[#1A1A2E] sm:text-3xl md:text-4xl">
          Comprehensive Enterprise Risk Management Services
        </h3>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl p-5 text-left text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] sm:min-h-[260px] md:p-6"
            >
              <div
                className="absolute inset-0 -z-20 bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-102"
                style={{
                  backgroundImage: `url('${card.bg.url}')`,
                  backgroundPosition: card.bg.position,
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/35"
                aria-hidden
              />
              <h4 className="relative text-base font-bold leading-snug sm:text-lg">{card.title}</h4>
              <p className="relative mt-2 text-sm leading-relaxed text-white/90">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
