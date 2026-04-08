"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import CTAButton from "@/components/consilium/ui/CTAButton";

export default function MobileNav() {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpened(false);
  }, [pathname]);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpened((o) => !o)}
        aria-label="Toggle navigation"
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block h-0.5 w-6 bg-[#1A1A2E] transition-all duration-300 ${
              opened ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1A1A2E] transition-all duration-300 ${
              opened ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1A1A2E] transition-all duration-300 ${
              opened ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpened(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
          opened ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-4 py-4">
          <span className="text-lg font-bold text-[#2B7DE9]">Menu</span>
          <button
            onClick={() => setOpened(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 text-[#2B7DE9]"
                  : "text-[#1A1A2E] hover:bg-gray-50 hover:text-[#2B7DE9]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 border-t pt-4">
            <CTAButton text="Book a Consultation" className="w-full text-center" />
          </div>
        </nav>
      </div>
    </div>
  );
}
