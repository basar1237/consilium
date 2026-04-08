import Link from "next/link";
import { services } from "@/constants/services";

export default function ServicesOverview() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Comprehensive risk advisory solutions tailored to your organisation
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:shadow-lg hover:border-[#2B7DE9]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B7DE9]/10 text-lg font-bold text-[#2B7DE9] mb-4">
                {service.title[0]}
              </span>
              <h3 className="text-xl font-semibold text-[#1A1A2E] group-hover:text-[#2B7DE9] transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 text-zinc-600 leading-relaxed">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
