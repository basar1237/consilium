"use client";

import { useState } from "react";

const tabs = [
  {
    id: "when-to-act",
    label: "When to act",
    heading: "When to act",
    points: [
      "You're entering a new market, acquiring a business, or launching a major programme",
      "Board or audit committee is asking sharper questions about risk oversight",
      "A near-miss or incident has exposed gaps in your current framework",
      "Regulatory expectations are tightening in your sector",
      "You want to move from reactive to proactive risk management",
    ],
  },
  {
    id: "what-good-looks-like",
    label: "What good looks like",
    heading: "What good looks like",
    points: [
      "Articulate and understand risk appetite across your business",
      "Access to latest technology/practices in managing risk",
      "More effective/in-depth risk reporting",
      "Risk management aligned to goals and cultural ways of working",
      "Evaluate, design and implement full ERM systems",
    ],
  },
  {
    id: "how-we-help",
    label: "How we can help",
    heading: "How we can help",
    points: [
      "Articulate and understand risk appetite across your business",
      "Access to latest technology/practices in managing risk",
      "More effective/in-depth risk reporting",
      "Risk management aligned to goals and cultural ways of working",
      "Evaluate, design and implement full ERM systems",
    ],
  },
] as const;

export default function InsightTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2B7DE9]">
            Our Perspective
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Understanding risk management
          </h2>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-4 sm:gap-8">
          {tabs.map((tab, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`group flex flex-col items-center cursor-pointer gap-2 rounded-xl md:p-8 p-3 transition-all duration-300 sm:px-8 sm:py-5 ${
                  isActive
                    ? "bg-[#2B7DE9]/10 shadow-sm ring-2 ring-[#2B7DE9]/30"
                    : "hover:bg-zinc-50"
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300 sm:h-18 sm:w-18 ${
                    isActive
                      ? "bg-[#2B7DE9] text-white"
                      : "bg-zinc-100 text-zinc-500 group-hover:bg-[#2B7DE9]/10 group-hover:text-[#2B7DE9]"
                  }`}
                >
                  <span className="text-2xl font-bold">{idx + 1}</span>
                </div>
                <span
                  className={`text-xs font-semibold sm:text-sm ${
                    isActive ? "text-[#2B7DE9]" : "text-zinc-600"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="h-0.5 w-8 rounded-full bg-[#2B7DE9]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2B7DE9]/20 to-[#1A1A2E]/10 shadow-lg flex items-center justify-center">
              <span className="text-6xl font-bold text-[#2B7DE9]/30">{current.heading[0]}</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1A1A2E]">
                {current.heading}
              </h3>
              <ul className="mt-6 space-y-3">
                {current.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2B7DE9]" />
                    <span className="text-zinc-600">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
