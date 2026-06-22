import Image from "next/image";
import Link from "next/link";
import { getblogs } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

const RelatedBlogCard = ({ blog }) => {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-[#051A3A] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-36 w-full md:h-48">
        {blog.mainImage ? (
          <Image
            src={urlFor(blog.mainImage).url()}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#2B364D]/10">
            <span className="text-[0.875rem] text-[#6C7484]">
              No image available
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-[clamp(1rem,2vw,1.5rem)]">
        <h3 className="mb-3 line-clamp-2 min-h-[2.75rem] text-[clamp(0.875rem,1vw,1.125rem)] font-semibold leading-[1.4] text-[#FDFCFA]">
          {blog.title}
        </h3>

        <div className="mb-4 text-[0.875rem] leading-[1.7] text-[#FDFCFA]/85">
          <time>
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <div>
            Posted By{" "}
            <span className="font-medium text-[#F6C343]">Dholera Insider</span>
          </div>
        </div>

        <Link
          href={`/dholera-sir-blogs/${blog.slug.current}`}
          className="mt-auto inline-flex w-full justify-center rounded-md bg-[#F6C343] px-[clamp(1rem,2vw,1.5rem)] py-2 text-[0.875rem] font-medium text-[#051A3A] transition-colors duration-300 hover:bg-[#FDFCFA] focus:outline-none focus:ring-2 focus:ring-[#F6C343] focus:ring-offset-2"
        >
          Explore More
        </Link>
      </div>
    </article>
  );
};

const BlogSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-[#2B364D]/15 bg-[#FDFCFA] shadow-md">
    <div className="h-48 bg-gradient-to-r from-[#FDFCFA] to-[#2B364D]/10" />
    <div className="p-[clamp(1rem,2vw,1.5rem)]">
      <div className="mb-3 h-4 w-1/4 rounded bg-[#2B364D]/10" />
      <div className="mb-3 h-6 w-3/4 rounded bg-[#2B364D]/10" />
      <div className="mb-2 h-4 w-full rounded bg-[#2B364D]/10" />
      <div className="h-4 w-2/3 rounded bg-[#2B364D]/10" />
    </div>
  </div>
);

export default async function FeaturedBlogs() {
  let blogs = [];
  let hasError = false;

  try {
    const posts = await getblogs();
    const safePosts = posts.map((post) => ({
      ...post,
      author: post.author || "Dholera Times",
      mainImage: post.mainImage || null,
      slug: post.slug || { current: "#" },
    }));

    blogs = safePosts
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b._createdAt) -
          new Date(a.publishedAt || a._createdAt),
      )
      .slice(0, 4);
  } catch (error) {
    hasError = true;
  }

  if (hasError) {
    return (
      <section className="bg-[#FDFCFA] px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[#051A3A]">
            Dholera Blogs & Investment Guides
          </h2>
          <p className="text-[#B42318]">
            Error loading blogs. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FDFCFA] px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,5rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-[clamp(1.5rem,3vw,3rem)] max-w-[56rem] text-center">
          
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[clamp(2rem,4vw,3.5rem)] text-[#051A3A]">
            Dholera Blogs & Investment Guides
          </h2>
          <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-[#F6C343]" />
          <p className="mt-4 text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.7] text-[#2B364D]">
            Stay updated with the latest blogs on Dholera Smart City.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,2rem)] md:grid-cols-4">
          {blogs.length > 0
            ? blogs.map((blog) => (
                <RelatedBlogCard key={blog._id} blog={blog} />
              ))
            : Array(4)
                .fill(0)
                .map((_, i) => <BlogSkeleton key={i} />)}
        </div>

        <div className="mt-[clamp(1.5rem,3vw,3rem)] text-center">
          <Link
            href="/dholera-sir-blogs"
            className="inline-flex rounded-md bg-[#051A3A] px-[clamp(1.25rem,2.5vw,2rem)] py-3 text-[0.875rem] font-semibold text-[#FDFCFA] transition-colors duration-300 hover:bg-[#2B364D]"
          >
            Read Latest Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
