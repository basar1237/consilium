"use client";

import { useState } from "react";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/consilium-risk-advisory-group",
    icon: "in",
    color: "hover:bg-[#0A66C2]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/consiliumriskadvisory",
    icon: "f",
    color: "hover:bg-[#1877F2]",
  },
] as const;

export default function FloatingSocial() {
  const [open, setOpen] = useState(true);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Consilium Risk Advisory Group",
          url: window.location.href,
        });
      } catch {
        /* user cancelled */
      }
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A2E] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Show social links"
      >
        ↗
      </button>
    );
  }

  return (
    <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex">
      <div className="flex flex-col gap-0.5 overflow-hidden rounded-xl bg-[#1A1A2E] shadow-xl">
        {socials.map(({ label, icon, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-11 w-11 items-center justify-center text-white font-bold text-sm transition-colors duration-200 ${color}`}
            aria-label={label}
          >
            {icon}
          </a>
        ))}
        <button
          onClick={handleShare}
          className="flex h-11 w-11 items-center justify-center text-white transition-colors duration-200 hover:bg-zinc-700"
          aria-label="Share this page"
        >
          ↗
        </button>
      </div>
    </div>
  );
}
