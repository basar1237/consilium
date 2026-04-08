"use client";

import { Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import CTAButton from "@/components/consilium/ui/CTAButton";

export default function MobileNav() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xs"
        title={
          <span className="text-lg font-bold text-[#2B7DE9]">Menu</span>
        }
        styles={{
          body: { padding: "1rem" },
        }}
      >
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
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
      </Drawer>
    </div>
  );
}
