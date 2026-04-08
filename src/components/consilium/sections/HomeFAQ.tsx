"use client";

const faqs = [
  {
    question: "What does an initial consultation cover?",
    answer:
      "We discuss your context, priorities, and whether our expertise is the right fit. There is no obligation to proceed; you receive a clear view of sensible next steps and indicative scope.",
  },
  {
    question: "How are projects typically structured and priced?",
    answer:
      "Most engagements combine a defined discovery phase with optional follow-on work. Fees reflect complexity, senior time required, and deliverables—usually fixed-fee where scope is clear, or time-based for exploratory work.",
  },
  {
    question: "Which sectors do you support?",
    answer:
      "We work with organisations across regulated and non-regulated sectors in the UK. Our approach is adapted to your industry vocabulary, stakeholder expectations, and applicable standards.",
  },
  {
    question: "How do you handle confidentiality?",
    answer:
      "We treat all engagement information as confidential and can work under mutual NDA where required. Materials are shared through secure channels agreed with your organisation.",
  },
  {
    question: "Do you replace our internal risk or audit function?",
    answer:
      "No. We strengthen governance and capability alongside your team—whether that is coaching, co-delivery, or independent assurance. Ownership of risk always remains with the organisation.",
  },
  {
    question: "How does this relate to ISO 31000?",
    answer:
      "ISO 31000 describes principles and a process for managing risk. We use it as a reference to design proportionate frameworks and assessments. We focus on practical, defensible practice.",
  },
];

export default function HomeFAQ() {
  return (
    <section id="faq" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Straight answers on how we engage—before you pick up the phone.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 open:border-[#2B7DE9]/30 open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#1A1A2E] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="pr-2">{faq.question}</span>
                <span className="shrink-0 text-[#2B7DE9] transition-transform duration-200 group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="border-t border-zinc-100 px-5 pb-5 pt-3 text-zinc-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
