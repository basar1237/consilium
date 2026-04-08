import Link from "next/link";
import { cn } from "@/utilities/ui";

interface CTAButtonProps {
  text?: string;
  className?: string;
  variant?: "primary" | "outline";
  href?: string;
}

export default function CTAButton({
  text = "Book a Consultation",
  className,
  variant = "primary",
  href = "/book-consultation",
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block rounded-lg px-6 py-3 font-semibold transition-all duration-200",
        variant === "primary" &&
          "bg-[#2B7DE9] text-white shadow-md hover:bg-blue-700 hover:shadow-lg",
        variant === "outline" &&
          "border-2 border-[#2B7DE9] text-[#2B7DE9] hover:bg-[#2B7DE9] hover:text-white",
        className,
      )}
    >
      {text}
    </Link>
  );
}
