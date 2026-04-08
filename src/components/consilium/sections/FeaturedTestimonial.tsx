import Link from "next/link";

export default function FeaturedTestimonial() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A1A2E] via-[#1f2340] to-[#252b4a] px-8 py-12 shadow-2xl shadow-[#1A1A2E]/20 md:px-14 md:py-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2B7DE9]/20 blur-3xl"
            aria-hidden
          />
          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <span className="text-3xl text-[#2B7DE9]">&ldquo;</span>
                <blockquote className="mt-2 text-xl font-medium leading-relaxed text-white md:text-2xl md:leading-snug">
                  Consilium helped us move from a spreadsheet-led risk register
                  to a framework the board actually uses in decision meetings.
                  The work was thorough, proportionate, and grounded in our
                  regulatory context.
                </blockquote>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <div className="h-4 w-px bg-white/20" aria-hidden />
                  <div>
                    <p className="font-semibold text-white">
                      Director of Risk &amp; Compliance
                    </p>
                    <p className="text-sm text-white/60">
                      UK financial services organisation
                    </p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 lg:pt-2">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
                >
                  Read more client feedback
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
