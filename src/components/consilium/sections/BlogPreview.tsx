import Link from "next/link";
import { blogPosts } from "@/constants/blog-posts";

export default function BlogPreview() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A2E] sm:text-4xl">
            Latest Insights
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block self-start rounded-full bg-[#2B7DE9]/10 px-3 py-1 text-xs font-medium text-[#2B7DE9]">
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-[#1A1A2E] line-clamp-2">
                  <Link
                    href={`/perspectives/${post.slug}`}
                    className="hover:text-[#2B7DE9] transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-zinc-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span>{post.readingTime} min read</span>
                </div>
                <Link
                  href={`/perspectives/${post.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#2B7DE9] hover:text-blue-700 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/perspectives"
            className="inline-flex items-center gap-2 text-[#2B7DE9] font-semibold hover:text-blue-700 transition-colors"
          >
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
