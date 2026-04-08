import CTAButton from "@/components/consilium/ui/CTAButton";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/consiliyum-hero-bg.webp')" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/68 to-white/30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center md:text-left md:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Navigating Risk, Delivering Confidence
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-100 sm:text-xl">
            Expert risk advisory and management services for UK businesses. We
            help organisations identify, assess, and manage risk to protect value
            and drive sustainable growth.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <CTAButton className="bg-white text-[#2B7DE9] hover:bg-blue-50 hover:text-[#1a4f9a] shadow-lg" />
            <a
              href="#services-hub"
              className="inline-block rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#2B7DE9]"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
