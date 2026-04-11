import { getblogs, projectInfo } from "@/sanity/lib/api";
import hero from "@/app/assets/about-dholera-sir-banner-dholera-insider.webp";
import heroM from "@/app/assets/hero/abt-sir-mob.png";

import Image from "next/image";
import BlogCard from "./BlogCard";
import TrendingBlogItem from "./TrendingBlog";
import Link from "next/link";
import LeadForm from "./LeadForm";
import tata from "@/app/assets/tata-logo.png";

export default async function BlogsPage() {
  // Fetch data and handle potential errors
  let posts = [];
  try {
    const postsData = await projectInfo();
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

  // Fetch news for sidebar (changed from getUpdates to getnews)
  let trendingBlogs = [];
  try {
    const newsData = await getblogs();
    trendingBlogs = Array.isArray(newsData) ? newsData.slice(0, 3) : [];
    console.log("News data fetched:", trendingBlogs.length);
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <>
      <title>
        About Dholera Smart City | Overview, Growth & Future Potential
      </title>
      <meta
        name="description"
        content="Learn what makes Dholera Smart City unique its vision, infrastructure, connectivity, and investment potential. Discover why Dholera SIR is a top destination for future growth."
      />
      <meta
        name="keywords"
        content="Dholera SIR, Dholera Special Investment Region, smart city Gujarat, Dholera Smart City, Dholera investment"
      />
      <link
        rel="canonical"
        href="https://www.dholerainsider.com/about-dholera-sir"
      />
      <meta name="robots" content="index, dofollow" />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        {/* <div className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-cover bg-center">
          <Image
            src={hero}
            alt="Dholera SIR"
            className="h-full w-full object-cover max-sm:hidden pt-16"
            fill
            priority
          />
          <Image
            src={heroM}
            alt="Dholera SIR"
            className="h-full w-full object-cover md:hidden pt-16"
            fill
            priority
          />
        </div> */}

        <div className="bg-white relative">
          <div className="pt-16 md:pt-16">
            <div className="relative w-full  overflow-hidden shadow-lg aspect-[3/1]"> 
              <Image
                src={hero}
                alt="Dholera SIR Development"
                className="w-full h-auto   aspect-[3/1] pt-4"
                quality={100}
                priority
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Introduction Section */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-3">
                What is Dholera SIR?
              </h1>
              <div className="w-24 h-1 bg-teal-700 mx-auto"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-black rounded-xl p-6 md:p-8 shadow-xl">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
                  <strong>Dholera SIR (Special Investment Region)</strong> is
                  India's first planned smart city, located in Gujarat,
                  approximately 100 km from Ahmedabad, and developed under the{" "}
                  <strong>Delhi–Mumbai Industrial Corridor (DMIC)</strong>.
                  Spread over{" "}
                  <strong className="text-teal-700">922.5 km²</strong>, Dholera
                  Smart City Project is designed with an infrastructure-first approach,
                  where roads, utilities, zoning, and governance are planned
                  before population growth.
                </p>
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                  Backed by the Government of Gujarat and the central
                  government, Dholera SIR aims to become a global hub for
                  manufacturing, technology, and sustainable urban living. With
                  clear planning, legal transparency, and long-term vision,
                  Dholera SIR Gujarat is positioned as a model city for India's
                  future development.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Connectivity Section */}
          <section className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-teal-900 text-white rounded-xl p-6 md:p-7">
                <div className="inline-block bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                  VISION
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  The Vision Behind Dholera Smart City
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      Dholera Smart City is envisioned as a world-class urban
                      and industrial hub to drive India’s long-term economic
                      growth.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      The project was conceptualized during PM Narendra Modi’s
                      tenure as Chief Minister of Gujarat.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      Dholera Smart City Project follows a smart, sustainable, and
                      scalable development model with Plug & Play
                      infrastructure.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      It aims to attract global investment, generate employment,
                      and support industries like semiconductors, manufacturing,
                      and renewable energy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-700 text-white rounded-xl p-6 md:p-7">
                <div className="inline-block bg-teal-900 text-white px-4 py-2 rounded-lg text-sm font-bold mb-4">
                  CONNECTIVITY
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Connectivity of Dholera Smart City
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      Direct connectivity to Ahmedabad via the Ahmedabad–Dholera
                      Expressway, reducing travel time significantly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      Upcoming Dholera International Airport to enhance national
                      and global connectivity
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      Seamless access to major ports and rail networks,
                      supporting trade and logistics
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base">
                      Part of the Delhi–Mumbai Industrial Corridor (DMIC),
                      boosting industrial growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure & Economic Growth Section */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-black mb-3">
                Infrastructure, Industries & Economic Growth
              </h2>
              <div className="w-24 h-1 bg-teal-700 mx-auto mb-3"></div>
            </div>

            <div className="bg-teal-900 p-4 text-white rounded-xl text-base">
              <p>
                The idea behind Dholera SIR is to build India’s first fully
                planned smart city with a strong focus on infrastructure and
                long-term economic growth. Developed under the Gujarat SIR Act
                and designed by Halcrow, a UK-based company, Dholera follows an
                infrastructure-first model, where roads, utilities, and systems
                are built before large population growth. The city is planned as
                a future hub for semiconductor manufacturing, renewable energy,
                electric vehicles, logistics, advanced industries, and data
                centres. Major companies like Tata Electronics, ReNew Power, and
                INOX Air Products have already invested here. Often compared to
                global smart cities like Shenzhen and Songdo, Dholera aims to
                become a self-sustaining economic center for India.
              </p>
            </div>
          </section>

          {/* Mega Projects Section */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Mega Projects in Dholera Smart City
              </h2>
              <div className="w-24 h-1 bg-teal-700 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🏢</div>
                <h4 className="text-lg font-bold mb-2">ABCD Building</h4>
                <p className="text-gray-700 text-sm">
                  Administrative & Business Centre, Dholera - Single-window
                  system for investors
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">
                  <Image src={tata} alt="tata" height="30" />
                </div>
                <h4 className="text-lg font-bold mb-2">
                  TATA Electronics Semiconductor Fab
                </h4>
                <p className="text-gray-700 text-sm">
                  India's first semiconductor manufacturing project
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">✈️</div>
                <h4 className="text-lg font-bold mb-2">
                  Dholera International Airport
                </h4>
                <p className="text-gray-700 text-sm">
                  Global trade, cargo movement, and international travel
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🛣️</div>
                <h4 className="text-lg font-bold mb-2">
                  Ahmedabad–Dholera Expressway
                </h4>
                <p className="text-gray-700 text-sm">
                  High-speed corridor cutting travel time to one hour
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">🚇</div>
                <h4 className="text-lg font-bold mb-2">
                  High-Speed Monorail & Railway
                </h4>
                <p className="text-gray-700 text-sm">
                  Links with Ahmedabad and major industrial hubs
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">☀️</div>
                <h4 className="text-lg font-bold mb-2">Dholera Solar Park</h4>
                <p className="text-gray-700 text-sm">
                  One of India's largest renewable energy projects
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">💧</div>
                <h4 className="text-lg font-bold mb-2">
                  Water Treatment Plant
                </h4>
                <p className="text-gray-700 text-sm">
                  Reliable long-term water supply for industries and residents
                </p>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-lg font-bold mb-2">
                  ReNew Power & Activation Area
                </h4>
                <p className="text-gray-700 text-sm">
                  ₹2,000 crore solar plant + ready infrastructure hub
                </p>
              </div>
            </div>
          </section>

          {/* Projects Grid Section */}

          {/* Investment Landscape Section */}
          <section id="investment" className="mb-8">
            <div className="text-center mb-6">
              <div className="inline-block bg-teal-700 text-white px-4 py-2 rounded-full text-sm md:text-lg font-bold mb-3 uppercase tracking-wider">
                INVESTMENT OPPORTUNITIES
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-black mb-3">
                Major Investments in Dholera Smart City
              </h2>
              <div className="w-24 h-1 bg-teal-700 mx-auto mb-3"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tata Electronics */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-600 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-700 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Tata Electronics</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Semiconductor
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  India's first semiconductor manufacturing facility
                </p>
              </div>

              {/* ReNew Power */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-900 hover:to-teal-800 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-900 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">ReNew Power</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    ₹2,000 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Solar manufacturing plant and clean energy
                </p>
              </div>

              {/* INOX Air Products */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-600 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-700 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">INOX Air Products</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Industrial
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Industrial gases and specialty products
                </p>
              </div>

              {/* Reliance Industries */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-900 hover:to-teal-800 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-900 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Reliance Industries</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Major Investor
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Strategic industrial development partner
                </p>
              </div>

              {/* Adani Group */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-600 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-700 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Adani Group</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Infrastructure
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Infrastructure and logistics development
                </p>
              </div>

              {/* Mahindra Lifespaces */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-900 hover:to-teal-800 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-900 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Mahindra Lifespaces</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Real Estate
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Integrated smart city development
                </p>
              </div>

              {/* Tsingshan */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-600 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-700 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Tsingshan (China)</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    ₹21,000 crore
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Steel & EV battery manufacturing plant
                </p>
              </div>

              {/* Intel */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-900 hover:to-teal-800 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-900 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Intel (USA)</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Technology
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Advanced technology and semiconductor ecosystem
                </p>
              </div>

              {/* Fujifilm */}
              <div className="bg-white hover:bg-gradient-to-br hover:from-teal-700 hover:to-teal-600 text-black hover:text-white rounded-lg p-5 border-2 border-black hover:border-teal-700 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold">Fujifilm (Japan)</h4>
                  <span className="bg-teal-700 group-hover:bg-white text-white group-hover:text-teal-900 px-3 py-1 rounded-full text-xs font-bold">
                    Manufacturing
                  </span>
                </div>
                <p className="text-gray-700 group-hover:text-white/90 text-sm">
                  Advanced manufacturing and technology solutions
                </p>
              </div>
            </div>
          </section>

          {/* Dholera Insiders Section */}
          <section className="mb-8">
            <div className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                  Why Invest in Dholera with Dholera Insiders
                </h2>
                <div className="w-32 h-1.5 bg-white/90 mx-auto rounded-full shadow-md"></div>
              </div>

              {/* Introduction Text */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-base">
                    Trusted Local Expertise: Dholera Insiders brings deep
                    on-ground knowledge of Dholera Smart City Project, ensuring accurate
                    guidance and reliable investment insights.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-base">
                    Government-Approved Projects: We offer access to verified,
                    government-approved plots with clear titles for safe and
                    secure investments.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-base">
                    Strategic Investment Advisory: Our team helps you choose the
                    right location and project based on growth potential,
                    budget, and future appreciation.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-base">
                    End-to-End Support: From site visits and documentation to
                    registration and post-sales assistance, we provide complete
                    investment support.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white/90 text-base">
                    Proven Growth Focus: With a strong understanding of
                    Dholera’s infrastructure development and upcoming projects,
                    we help investors maximize long-term returns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div>
            {safePosts.length > 0 && (
              <section className="mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                    Featured Blogs
                  </h2>
                  <div className="w-24 h-1 bg-teal-700 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {safePosts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
