import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-[#2B7DE9] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Strengthen Your Risk Management?
        </h2>
        <p className="mt-6 text-lg leading-8 text-blue-100">
          Contact us today for a no-obligation consultation with one of our
          senior risk advisors.
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3.5 font-semibold text-[#2B7DE9] shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
