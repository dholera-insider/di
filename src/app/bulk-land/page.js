import React from "react";
import Head from "next/head";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaCity,
  FaUsers,
  FaHandshake,
  FaRegBuilding,
  FaGlobeAmericas,
} from "react-icons/fa";

const DholeraBulkLandPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Dholera Insider",
            url: "https://dholerainsider.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://dholerainsider.com/bulk-land{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <div className="bg-gray-50 dark:bg-gray-900 ">
        <Head>
          <title>
            Why Invest in Bulk Land in Dholera SIR? | Dholera Insider
          </title>
          <meta
            name="description"
            content="Discover the benefits of investing in bulk residential plots in Dholera SIR with Dholera Insider"
          />
          <link
            rel="canonical"
            href="https://www.dholerainsider.com/bulk-land"
          />
        </Head>

        {/* Hero Section */}
        <header className="bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 text-emerald-100 dark:from-gray-800 dark:via-teal-900 dark:to-cyan-900 py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl pt-20 font-bold mb-6">
              Unlocking Opportunities: Bulk Land Investment in Dholera SIR
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover why savvy investors are turning to Dholera's bulk
              residential plots for exceptional returns
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Explore WestWyn County
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Featured Project */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-l-4 border-emerald-500 mb-12">
            <p className="text-lg font-medium dark:text-gray-200">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Featured Project:
              </span>{" "}
              WestWyn County by Dholera Insider presents premium bulk
              residential plots in Dholera SIR's most promising sector.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-16">
            <p className="text-lg mb-8 dark:text-gray-300">
              The Dholera Special Investment Region (SIR) is experiencing
              unprecedented demand for residential plots, driven by its
              strategic position along the Delhi-Mumbai Industrial Corridor,
              visionary urban planning, and strong governmental backing.
            </p>

            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 pb-2 border-b-2 border-emerald-500 inline-block">
              The Compelling Case for Bulk Land Investment
            </h2>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
                <div className="text-4xl text-emerald-500 mb-4">
                  <FaChartLine />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Accelerated Development
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Dholera's infrastructure is progressing rapidly with over
                  ₹10,000 crore already invested in phase one development.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
                <div className="text-4xl text-emerald-500 mb-4">
                  <FaMoneyBillWave />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Attractive Pricing
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Current land prices remain 60-70% below projected peak values,
                  offering substantial upside potential.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">
                <div className="text-4xl text-emerald-500 mb-4">
                  <FaCity />
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  Exceptional ROI
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Early investors in comparable developments have seen 4-5x
                  appreciation within 5-7 years.
                </p>
              </div>
            </div>

            {/* Strategic Advantages */}
            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 pb-2 border-b-2 border-emerald-500 inline-block">
              Strategic Advantages
            </h2>

            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  Master-Planned Urban Development
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Dholera's comprehensive city plan ensures coordinated
                  development of residential, commercial, and industrial zones.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  Government Incentives
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Investors benefit from special economic zone status, tax
                  holidays, and streamlined approval processes.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  Infrastructure Timeline
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  With 40% of phase one infrastructure already completed, the
                  value appreciation curve is becoming increasingly steep.
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md mb-16 relative">
              <div className="text-7xl text-emerald-500 opacity-20 absolute top-4 left-6">
                "
              </div>
              <p className="text-xl italic mb-6 relative z-10 dark:text-gray-300">
                "Our investment in Dholera bulk plots has outperformed all our
                other real estate holdings. The speed of development gives us
                confidence in the long-term potential."
              </p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400">
                - Rajesh Mehta, NRI Investor
              </p>
            </div>

            {/* Ideal Investors */}
            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 pb-2 border-b-2 border-emerald-500 inline-block">
              Ideal Investor Profiles
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="flex items-start">
                <div className="text-2xl text-emerald-500 mr-4 mt-1">
                  <FaRegBuilding />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Real Estate Developers
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Secure land banks now for future township projects at
                    current prices.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl text-emerald-500 mr-4 mt-1">
                  <FaGlobeAmericas />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    NRI Investors
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Dholera offers dollar-denominated returns with India's
                    growth potential.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl text-emerald-500 mr-4 mt-1">
                  <FaUsers />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Investment Groups
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Pool resources to acquire strategically located parcels.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-2xl text-emerald-500 mr-4 mt-1">
                  <FaHandshake />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    Housing Cooperatives
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Create member-owned communities in India's smartest city.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 text-emerald-100 dark:from-gray-800 dark:via-teal-900 dark:to-cyan-900 rounded-xl p-12 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Explore Dholera Opportunities?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team specializes in bulk land acquisitions with complete legal
              and documentation support.
            </p>
            <a
              href="tel:+919211820887"
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105"
            >
              Call +91 9211820887
            </a>
          </section>

          {/* Process Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-12 pb-2 border-b-2 border-emerald-500 inline-block">
              Our Acquisition Process
            </h2>

            <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
              <div className="text-center">
                <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Consultation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Personalized assessment of your investment goals
                </p>
              </div>

              <div className="text-center">
                <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Site Evaluation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Physical or virtual tours of shortlisted properties
                </p>
              </div>

              <div className="text-center">
                <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">
                  Transaction
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  End-to-end handling of due diligence
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 pb-2 border-b-2 border-emerald-500 inline-block">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  What makes Dholera's infrastructure unique?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Dholera features India's first integrated multi-modal
                  transport system including an international airport, dedicated
                  freight corridor, and metro network.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  How does Dholera compare in size to other Indian cities?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  At 920 sq km, Dholera SIR is nearly twice the size of
                  Ahmedabad and 50% larger than Mumbai.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  What investment safeguards exist for bulk buyers?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All plots come with clear titles, NA permissions, and approved
                  layouts.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-8 pb-2 border-b-2 border-emerald-500 inline-block">
              Why Partner With Dholera Insider?
            </h2>

            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>
                  Exclusive access to premium land parcels in WestWyn County
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Complete legal and documentation support</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Transparent pricing with no hidden costs</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>Proven track record with over 250 acres transacted</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default DholeraBulkLandPage;
