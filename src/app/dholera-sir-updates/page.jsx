import Image from "next/image";
import { notFound } from "next/navigation";
import heroD from "../assets/hero/latest-updates-dholera-insider.webp";
import { getUpdates } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import BlogCard from "./BlogCard";
import MobileUpdatesPagination from "./MobileUpdatesPagination";

export const revalidate = 60;
const UPDATES_PER_PAGE = 12;

const pageMetadata = {
  title: "Latest Dholera Smart City News 2026 | Updates on Projects & Growth",
  description:
    "Get the Latest investment updates on Dholera Smart City - infrastructure news, expressway progress, airport updates, and industrial developments that helps to investors and residents.",
  keywords:
    "Dholera updates, Dholera news, Dholera real estate, smart city updates, Dholera investment",
  alternates: {
    canonical: "https://www.dholerainsider.com/dholera-sir-updates",
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

export default async function UpdatesPage({ searchParams }) {
  const currentPage = getPageNumber(await searchParams);
  let fetchError = false;
  let blogs = [];
  try {
    const blogsData = await getUpdates();
    blogs = Array.isArray(blogsData) ? blogsData : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    fetchError = true;
  }

  const safeBlogs = blogs.filter((blog) => blog?.slug?.current);
  const totalPages = Math.max(1, Math.ceil(safeBlogs.length / UPDATES_PER_PAGE));
  if (!fetchError && currentPage > totalPages) notFound();

  // Only render this page's cards; keep CMS image URL building on the server.
  const startIndex = (currentPage - 1) * UPDATES_PER_PAGE;
  const visibleBlogs = safeBlogs
    .slice(startIndex, startIndex + UPDATES_PER_PAGE)
    .map((blog) => ({
      _id: blog._id,
      title: blog.title || "Dholera Latest Update",
      slug: blog.slug,
      publishedAt: blog.publishedAt || blog._createdAt,
      imageUrl: blog.mainImage?.asset
        ? urlFor(blog.mainImage)
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
      <div className="min-h-screen bg-white relative overflow-hidden">
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

                md:h-[50vh]
                md:min-h-[400px]
              "
            >
              {/* Hero Image */}
              <Image
                src={heroD}
                alt="Dholera SIR Development"
                fill
                quality={75}
                priority
                placeholder="blur"
                sizes="100vw"
                className="
                  object-cover
                  object-center

                  md:object-cover
                "
              />

              {/* Black Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  z-[1]
                  bg-black/60
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
                  Dholera Latest Updates
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* Blog Posts Section */}
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl site-gutter section-space">
            {visibleBlogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {visibleBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
                <MobileUpdatesPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div className="text-center py-12 sm:py-20">
                <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-200">
                  {fetchError ? (
                    <>
                      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">
                        ⚠️
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        Unable to Load Updates
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We&apos;re experiencing some technical difficulties loading
                        the updates. Please try refreshing the page or contact
                        support if the issue persists.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">
                        📰
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        Latest Updates Coming Soon!
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We&apos;re preparing the latest news and updates about
                        Dholera SIR developments. Stay tuned!
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
      </div>
    </>
  );
}
