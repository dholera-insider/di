import React from "react";
import Image from "next/image";
import Link from "next/link";
import heroD from "../assets/hero/latest-updates-dholera-insider.webp";
import heroM from "../assets/hero/blogMhero.webp";
import { getUpdates, projectInfo } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import CommonForm from "../components/CommonForm";
import LeadForm from "../about-dholera-sir/LeadForm";
import TrendingBlogItem from "./TrendingBlog";
import BlogCard from "./BlogCard";

export default async function Blogs() {
  let fetchError = null;
  let trendingBlogs = [];

  try {
    const newsData = await projectInfo();
    trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
    console.log("News data fetched:", trendingBlogs.length);
  } catch (error) {
    console.error("Error fetching news:", error);
    fetchError = error;
  }

  let blogs = [];
  try {
    const blogsData = await getUpdates();
    blogs = Array.isArray(blogsData) ? blogsData : [];
    console.log("Blogs data fetched:", blogs.length);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    fetchError = error;
  }

  // Add error handling for blog data
  const safeBlogs = blogs.map((blog) => ({
    ...blog,
    author: blog.author || "Dholera Insider",
    mainImage: blog.mainImage || null,
    slug: blog.slug?.current
      ? { current: blog.slug.current }
      : { current: "#" },
  }));

  return (
    <>
      <title>Latest Dholera Smart City News 2026 | Updates on Projects & Growth</title>
      <meta
        name="description"
        content="Get the Latest investment updates on Dholera Smart City - infrastructure news, expressway progress, airport updates, and industrial developments that helps to investors and residents."
      />
      <meta
        name="keywords"
        content="Dholera updates, Dholera news, Dholera real estate, smart city updates, Dholera investment"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/dholera-sir-updates"
      />

      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Enhanced Hero Section - Responsive Height */}
        <div className="bg-white relative">
          <div className="pt-16 md:pt-20">
            <div className="relative md:h-[50vh] overflow-hidden shadow-lg">
              {/* Hero Image */}
              <Image
                src={heroD}
                alt="Dholera SIR Development"
                className="w-full h-auto md:h-[60vh] object-contain md:object-cover"
                quality={100}
                priority
                sizes="100vw"
              />

              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text Content */}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
                <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                  Dholera Latest Updates
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="relative z-10">
          <div className="px-4 py-12">
            {safeBlogs.length > 0 ? (
              <>
                {/* All Posts Grid */}
                <div>

                  <div className="px-4">
                    <div className="flex flex-col max-sm:flex-col-reverse lg:flex-row gap-8">
                      {/* Trending Section - Left Sidebar */}

                      {/* Blog Grid */}
                      <div className="max-w-7xl mx-auto">
                        {safeBlogs.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {safeBlogs.map((blog) => (
                              <BlogCard key={blog._id} blog={blog} />
                            ))}
                          </div>
                        ) : (
                          <div className="bg-white p-8 rounded-xl shadow-md text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              No Updates Available
                            </h3>
                            <p className="text-gray-600">
                              Check back soon for the latest information about
                              Dholera SIR.
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
                        Unable to Load Updates
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        We're experiencing some technical difficulties loading
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
                        We're preparing the latest news and updates about
                        Dholera SIR developments. Stay tuned!
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

      {/* Common Form at the bottom */}
      <CommonForm title="Secure Your Investment In India's First GreenField SmartCity" />
    </>
  );
}
