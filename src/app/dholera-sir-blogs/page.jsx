import { getblogs } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import BlogCard from "./BlogCard";
import MobileBlogPagination from "./MobileBlogPagination";
import Image from "next/image";
import hero from "@/app/assets/dholera-sir-blogs-banner-dholera-insider.webp";

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

export default async function BlogPage({ searchParams }) {
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
    <>
      <div className="min-h-screen bg-[#051A3A] relative overflow-hidden">
        {/* Enhanced Hero Section - Responsive Height */}
        <div className="relative bg-white">
          <div className="pt-20">
            <div
              className="
                relative
                h-[300px]
                w-full
                overflow-hidden
                shadow-lg

                sm:h-[340px]

                md:h-[60vh]
                md:min-h-[420px]
                md:max-h-[680px]
              "
            >
              {/* Hero Image */}
              <Image
                src={hero}
                alt="Dholera SIR Development"
                fill
                quality={75}
                priority
                placeholder="blur"
                sizes="100vw"
                className="
                  object-cover
                  object-center
                "
              />

              {/* Black Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  z-[1]
                  bg-black/40
                "
              />

              {/* Text Content */}
              <div
                className="
                  absolute
                  inset-0
                  z-10
                  flex
                  items-center
                  justify-center
                  px-4
                  text-center
                "
              >
                <h1
                  className="
                    text-2xl
                    font-bold
                    leading-tight
                    text-white

                    sm:text-3xl

                    md:text-5xl
                  "
                >
                  Dholera Smart City Blogs
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
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
        <div className="h-px w-full bg-white/30" />
      </div>
    </>
  );
}
