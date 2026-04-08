'use client'

import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Consilium Risk Advisory Group"
      width={400}
      height={80}
      className="h-14 w-auto md:h-16"
      priority
    />
  );
}
