import { getblogs, getUpdates, projectInfo } from "@/sanity/lib/api";
import React from "react";
import BlogCard from "./BlogCard";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import FormComponent from "./FormComponent";
import hero from "@/app/assets/dholera-sir-blogs-banner-dholera-insider.webp";
import LeadForm from "../about-dholera-sir/LeadForm";
import TrendingBlogItem from "./TrendingBlog";

export default async function page() {
  let fetchError = null;

  let trendingBlogs = [];
  try {
    const newsData = await getUpdates();
    trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
    console.log("News data fetched:", trendingBlogs.length);
  } catch (error) {
    console.error("Error fetching news:", error);
    // Fallback to getUpdates if getnews fails
    try {
      const updatesData = await getUpdates();
      trendingBlogs = Array.isArray(updatesData) ? updatesData.slice(0, 5) : [];
      console.log("Fallback to updates data:", trendingBlogs.length);
    } catch (fallbackError) {
      console.error("Error fetching updates as fallback:", fallbackError);
    }
  }

  let posts = [];
  try {
    const postsData = await getblogs();
    // Check if postsData is an array
    posts = Array.isArray(postsData) ? postsData : [];
    console.log("Posts data fetched:", posts.length);
  } catch (error) {
    console.error("Error fetching project info:", error);
  }

  // Add error handling for post data
  const safePosts = posts.map((post) => ({
    ...post,
    author: post.author || "Dholera Insider",
    mainImage: post.mainImage || null,
    slug: post.slug?.current
      ? { current: post.slug.current }
      : { current: "#" },
  }));

  return (
    <>
      <title>
        Dholera Smart City Insights | Latest Updates and Investment Blogs
      </title>
      <meta
        name="description"
        content="Stay updated with the latest Dholera Smart City developments, market insights, and key growth trends. Ideal for investors and urban planning enthusiasts looking for future opportunities."
      />
      <meta
        name="keywords"
        content="Dholera blog, Dholera news, Dholera real estate, smart city updates, Dholera investment"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/dholera-sir-blogs"
      />
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Enhanced Hero Section - Responsive Height */}
        <div className="bg-white relative">
          <div className="pt-16 md:pt-8">
            <div className="relative w-full md:h-[60vh] overflow-hidden shadow-lg aspect-[3/1]">
              {/* Hero Image */}
              <Image
                src={hero}
                alt="Dholera SIR Development"
                className="w-full h-auto md:h-[60vh] object-contain md:object-cover  aspect-[3/1]"
                quality={100}
                priority
                sizes="100vw"
              />

              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text Content */}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
                <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                  Dholera Smart City Blogs
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
            {safePosts.length > 0 ? (
              <>
                {/* All Posts Grid */}
                <div>
                  <div className="px-4 ">
                    <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
                      {/* Blog Grid */}
                      <div className=" max-w-7xl mx-auto">
                        {safePosts.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {safePosts.map((post) => (
                              <BlogCard key={post._id} post={post} />
                            ))}
                          </div>
                        ) : (
                          <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              No Blog Posts Available
                            </h3>
                            <p className="text-gray-600">
                              Check back soon for information about Dholera SIR
                              investment opportunities.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
                        Unable to Load Blogs
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We're experiencing some technical difficulties loading
                        the blog posts. Please try refreshing the page or
                        contact support if the issue persists.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">
                        📝
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                        Expert Content Coming Soon!
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We're preparing comprehensive investment guides, market
                        analysis, and expert insights about Dholera SIR
                        opportunities. Stay tuned!
                      </p>
                    </>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                    <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
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
