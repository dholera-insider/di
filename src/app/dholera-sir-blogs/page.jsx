import { getblogs } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogCard from "./BlogCard";
import MobileBlogPagination from "./MobileBlogPagination";
import BlogHero from "./BlogHero";

export const revalidate = 60;
const BLOGS_PER_PAGE = 12;

const pageMetadata = {
  title: "Dholera Smart City Insights | Latest Updates and Investment Blogs",
  description:
    "Stay updated with the latest Dholera Smart City developments, market insights, and key growth trends. Ideal for investors and urban planning enthusiasts looking for future opportunities.",
  keywords:
    "Dholera blog, Dholera news, Dholera real estate, smart city updates, Dholera investment",
  alternates: {
    canonical: "https://www.dholerainsider.com/dholera-sir-blogs",
  },
};

function getPageNumber(searchParams) {
  const page = Number(searchParams?.page);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export async function generateMetadata({ searchParams }) {
  const page = getPageNumber(await searchParams);
  if (page === 1) return pageMetadata;

  return {
    ...pageMetadata,
    title: `${pageMetadata.title} | Page ${page}`,
    alternates: {
      canonical: `${pageMetadata.alternates.canonical}?page=${page}`,
    },
  };
}

async function BlogPosts({ searchParams }) {
  const currentPage = getPageNumber(await searchParams);
  let fetchError = false;
  let posts = [];
  try {
    const postsData = await getblogs();
    posts = Array.isArray(postsData) ? postsData : [];
  } catch (error) {
    fetchError = true;
    console.error("Error fetching blogs:", error);
  }

  const safePosts = posts.filter((post) => post?.slug?.current);
  const totalPages = Math.max(1, Math.ceil(safePosts.length / BLOGS_PER_PAGE));
  if (!fetchError && currentPage > totalPages) notFound();

  // Render just this page's cards and keep image URL building on the server.
  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const visiblePosts = safePosts
    .slice(startIndex, startIndex + BLOGS_PER_PAGE)
    .map((post) => ({
      _id: post._id,
      title: post.title || "Dholera Smart City Blog",
      slug: post.slug,
      publishedAt: post.publishedAt || post._createdAt,
      imageUrl: post.mainImage?.asset
        ? urlFor(post.mainImage)
            .width(800)
            .height(480)
            .fit("crop")
            .auto("format")
            .quality(75)
            .url()
        : null,
    }));

  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto py-12 sm:py-16 site-gutter">
        {visiblePosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
            <MobileBlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        ) : (
          <div className="text-center py-12 sm:py-20">
            <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-200">
              {fetchError ? (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Unable to Load Blogs
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                    We&apos;re experiencing some technical difficulties loading
                    the blog posts. Please try refreshing the page or
                    contact support if the issue persists.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Expert Content Coming Soon!
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                    We&apos;re preparing comprehensive investment guides, market
                    analysis, and expert insights about Dholera SIR
                    opportunities. Stay tuned!
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <button className="bg-gradient-to-r from-[#F6C343] to-[#e3ae25] text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                  Get Notified
                </button>
                <button className="border-2 border-orange-500 text-orange-600 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm sm:text-base">
                  Explore Projects
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogPostsSkeleton() {
  return (
    <div role="status" aria-label="Loading blog content">
      <span className="sr-only">Loading blog content...</span>
      <div
        aria-hidden="true"
        className="site-gutter mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: BLOGS_PER_PAGE }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-lg bg-white">
            <div className="h-52 bg-gray-200" />
            <div className="space-y-4 p-6">
              <div className="h-6 w-4/5 rounded bg-gray-200" />
              <div className="h-6 w-3/5 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage({ searchParams }) {
  return (
    <main className="min-h-screen bg-[#051A3A] relative overflow-hidden">
      <BlogHero />
      <Suspense fallback={<BlogPostsSkeleton />}>
        <BlogPosts searchParams={searchParams} />
      </Suspense>
      <div className="h-px w-full bg-white/30" />
    </main>
  );
}
