import Link from "next/link";
import type { BlogPost } from "@/types";

const categoryColors: Record<string, string> = {
  "Risk Management": "bg-blue-100 text-blue-800",
  "Cyber Security": "bg-red-100 text-red-800",
  Compliance: "bg-green-100 text-green-800",
};

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const badgeColor =
    categoryColors[post.category] ?? "bg-gray-100 text-gray-800";

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <span
          className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {post.category}
        </span>
        <h3 className="mb-2 text-lg font-bold text-[#1A1A2E] group-hover:text-[#2B7DE9] transition-colors">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <span>{formattedDate}</span>
          <span>{post.readingTime} min read</span>
        </div>
        <span className="mt-4 text-sm font-semibold text-[#2B7DE9] group-hover:underline">
          Read More &rarr;
        </span>
      </article>
    </Link>
  );
}
