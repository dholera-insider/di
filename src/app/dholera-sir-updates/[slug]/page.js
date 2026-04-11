import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import {
  getblogs,
  getPostBySlug,
  getUpdates,
  projectInfo,
} from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import LeadForm from "../LeadForm";
import BlogSchemaMarkup from "../BlogSchemaMarkup";



const URLFormatter = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const extractHeadings = (body) => {
  if (!body || !Array.isArray(body)) return [];

  return body
    .filter((block) => {
      // Check if it's a valid heading block
      const isHeading =
        block.style &&
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.style);

      // Check if it has valid text content
      const hasValidText =
        block.children &&
        Array.isArray(block.children) &&
        block.children.length > 0 &&
        block.children[0]?.text &&
        block.children[0].text.trim().length > 0;

      return isHeading && hasValidText;
    })
    .map((block) => ({
      ...block,
      // Ensure we have clean text
      children: [
        {
          ...block.children[0],
          text: block.children[0].text.trim(),
        },
      ],
    }));
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const site = "dholera-insider";
  const post = await getPostBySlug(slug, site);

  return {
    /*  title: post.title, */
    /* description: post.metaDescription, */
  };
}

const TrendingBlogItem = ({ post }) => {
  return (
    <Link href={`/dholera-sir-updates/${post.slug.current}`}>
      <div className="flex gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all hover:shadow-md">
        {post.mainImage && (
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={urlFor(post.mainImage).width(80).height(80).url()}
              alt={post.title}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              rel="preconnect"
            />
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 line-clamp-2">
            {post.title}
          </h4>
          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
            {post.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const RelatedBlogCard = ({ blog }) => {
  return (
    <Link href={`/dholera-sir-blogs/${blog.slug.current}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
          {blog.mainImage ? (
            <Image
              src={urlFor(blog.mainImage).width(400).height(250).url()}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {blog.categories && blog.categories.length > 0 && (
            <div className="absolute top-2 left-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full bg-opacity-90">
                News Headlines
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="text-sm text-gray-500 mb-2">
            {new Date(blog.publishedAt || blog._createdAt).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            )}
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-teal-700 hover:text-teal-900 p-1 rounded-xl font-semibold bg-gray-800 inline-flex items-center">
              Read more
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const site = "dholera-insider";

  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  try {
    const [post, trendingBlogs, getPro] = await Promise.all([
      getPostBySlug(slug, site),
      getUpdates(),
    ]);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Blog post not found</h1>
            <Link
              href="/dholera-updates/latest-news"
              className="mt-4 inline-block text-[#d3b66b] hover:text-[#b69b5e]"
            >
              ← Back to News
            </Link>
          </div>
        </div>
      );
    }

    const components = {
      types: {
        image: ({ value }) => {
          if (!value?.asset) return null;

          const imageUrl =
            value.asset.url || urlFor(value).width(1200).height(800).url();

          const imageNode = (
            <img
              src={imageUrl}
              alt={value.alt || ""}
              className="w-full h-auto aspect-[3/2] rounded-lg my-6"
              width={1200}
              height={800}
              loading="lazy"
              rel="preconnect"
            />
          );

          return (
            <figure className="my-6">
              {value.url ? (
                <a
                  href={value.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {imageNode}
                </a>
              ) : (
                imageNode
              )}
              {value.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {value.caption}
                </figcaption>
              )}
            </figure>
          );
        },

        table: ({ value }) => {
          if (!value?.rows || !Array.isArray(value.rows)) {
            return null;
          }

          return (
            <div className="overflow-x-auto my-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <table className="min-w-full">
                <tbody>
                  {value.rows.map((row, i) => {
                    if (!row?.cells || !Array.isArray(row.cells)) {
                      return null;
                    }

                    return (
                      <tr
                        key={i}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          i === 0
                            ? "bg-gradient-to-r from-teal-400/10 to-teal-600/10 font-semibold"
                            : i % 2 === 0
                              ? "bg-gray-50/50"
                              : "bg-white"
                        }`}
                      >
                        {row.cells.map((cell, j) => (
                          <td
                            key={j}
                            className="px-6 py-4 text-gray-700 border-b border-gray-100 last:border-r-0"
                          >
                            {cell || ""}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        },

        htmlTableBlock: ({ value }) => {
          if (!value?.html) return null;

          return (
            <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <div
                className="[&_table]:w-full [&_table]:border-collapse [&_table]:bg-white 
          [&_th]:px-6 [&_th]:py-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-700 
          [&_th]:bg-gray-50 [&_th]:border-b [&_th]:border-gray-200
          [&_td]:px-6 [&_td]:py-4 [&_td]:text-gray-600 [&_td]:border-b [&_td]:border-gray-200
          [&_tr:last-child_td]:border-b-0
          [&_tr:hover]:bg-gray-50/50
          [&_th:first-child]:rounded-tl-lg [&_th:last-child]:rounded-tr-lg
          [&_tr:last-child_td:first-child]:rounded-bl-lg [&_tr:last-child_td:last-child]:rounded-br-lg"
                dangerouslySetInnerHTML={{ __html: value.html }}
              />
            </div>
          );
        },

        code: ({ value }) => (
          <div className="my-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-1 shadow-2xl">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
              <code className="font-mono text-sm leading-relaxed">
                {value.code}
              </code>
            </pre>
          </div>
        ),
      },

      marks: {
        link: ({ children, value }) => (
          <Link
            href={value.href}
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-500 underline decoration-teal-400/30 hover:decoration-teal-400 decoration-2 underline-offset-4 transition-all duration-300 hover:bg-teal-400/5 px-1 py-0.5 rounded"
          >
            {children}
          </Link>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900 px-1 py-0.5 rounded">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800 px-1 py-0.5 rounded">
            {children}
          </em>
        ),
        code: ({ children }) => (
          <code className="font-mono bg-gradient-to-r from-gray-100 to-gray-200 px-2 py-1 rounded-md text-sm text-gray-800 border border-gray-300">
            {children}
          </code>
        ),
        button: ({ children, value }) => {
          const getButtonClasses = () => {
            switch (value.style) {
              case "secondary":
                return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl";
              case "outline":
                return "bg-transparent border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white shadow-md hover:shadow-lg";
              default:
                return "bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-500 shadow-lg hover:shadow-xl";
            }
          };

          return (
            <Link
              href={value.href}
              className={`inline-block px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 ${getButtonClasses()}`}
            >
              {value.text || children}
            </Link>
          );
        },
      },

      block: {
        h1: ({ children }) => (
          <h1 className="text-2xl md:text-5xl font-black mt-8 mb-6 text-gray-800 relative border-l-4 border-teal-400 pl-6 bg-gradient-to-r from-teal-400/5 to-transparent py-4">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-400 rounded-full"></span>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-8 text-gray-800 relative border-l-4 border-teal-400 pl-6 bg-gradient-to-r from-teal-400/5 to-transparent py-3">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-400 rounded-full"></span>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-800 relative border-l-4 border-teal-400 pl-6 bg-gradient-to-r from-teal-400/5 to-transparent py-2">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-400 rounded-full"></span>
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 relative border-l-4 border-teal-400 pl-6 bg-gradient-to-r from-teal-400/5 to-transparent py-2">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-400 rounded-full"></span>
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-xl font-semibold mt-8 mb-3 text-gray-800 relative border-l-4 border-teal-400 pl-6 bg-gradient-to-r from-teal-400/5 to-transparent py-2">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-400 rounded-full"></span>
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-lg font-semibold mt-6 mb-2 text-gray-800 relative border-l-4 border-teal-400 pl-6 bg-gradient-to-r from-teal-400/5 to-transparent py-1">
            <span className="absolute -left-1 top-0 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-400 rounded-full"></span>
            {children}
          </h6>
        ),
        normal: ({ children }) => (
          <p className="mb-8 text-gray-700 leading-loose text-lg font-light tracking-wide">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="relative my-12 p-8 bg-gradient-to-br from-teal-400/5 to-teal-500/10 rounded-2xl shadow-lg border border-teal-400/20">
            <div className="absolute top-4 left-6 text-6xl text-teal-400/30 font-serif">
              "
            </div>
            <div className="pl-8 italic text-gray-700 text-xl leading-relaxed font-medium">
              {children}
            </div>
          </blockquote>
        ),
        centerAlign: ({ children }) => (
          <p className="mb-8 text-gray-700 leading-loose text-lg text-center bg-gray-50 py-6 rounded-xl">
            {children}
          </p>
        ),
      },

      list: {
        bullet: ({ children }) => (
          <ul className="space-y-4 mb-10 pl-0">{children}</ul>
        ),
        number: ({ children }) => (
          <ol className="space-y-4 mb-10 pl-0 counter-reset-list">
            {children}
          </ol>
        ),
      },

      listItem: {
        bullet: ({ children }) => (
          <li className="text-lg leading-relaxed text-gray-700 flex items-start gap-4 p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
            <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">{children}</div>
          </li>
        ),
        number: ({ children }) => (
          <li className="text-lg leading-relaxed text-gray-700 flex items-start gap-4 p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300 relative counter-increment-list">
            <div className="w-3 h-3 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              <span className="counter-content"></span>
            </div>
            <div className="flex-1">{children}</div>
          </li>
        ),
      },
    };

        const TableOfContent = ({ headings }) => {
      // Filter for valid headings with text content
      const validHeadings =
        headings?.filter((heading) => {
          const text = heading.children?.[0]?.text;
          return text && text.trim().length > 0;
        }) || [];

      // Filter for only h1 and h2 headings
      const h1h2Headings = validHeadings.filter((heading) => {
        return heading.style === "h1" || heading.style === "h2";
      });

      // Hide TOC if no h1 or h2 headings exist
      if (h1h2Headings.length === 0) return null;

      return (
        <div className="my-8 p-6 bg-gradient-to-br from-[#C69C21]/5 to-[#FDB913]/10 rounded-2xl shadow-lg border border-[#C69C21]/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Table of Contents
          </h2>
          <ul className="space-y-3">
            {validHeadings.map((heading, index) => {
              const text = heading.children[0].text.trim();
              const level = parseInt(heading.style.replace("h", ""));
              const indent = (level - 2) * 16;

              return (
                <li
                  key={index}
                  style={{ marginLeft: `${Math.max(0, indent)}px` }}
                  className="relative"
                >
                  <a
                    href={`#${URLFormatter(text)}`}
                    className="text-[#C69C21] hover:text-[#FDB913] hover:underline transition-colors duration-200 flex items-start gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#C69C21] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm leading-relaxed">{text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };

    // Format date for display
    const formattedDate = new Date(
      post.publishedAt || post._createdAt,
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div className="bg-white min-h-screen">
        <title>{post.metaTitle}</title>
        <link
          rel="canonical"
          href={`https://www.dholerainsider.com/dholera-sir-updates/${post.slug.current}`}
        />
        <meta name="robots" content="index, dofollow" />
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords} />
        <meta name="publisher" content="Dholera Insider" />
        <BlogSchemaMarkup post={post} />

        {/* Sticky Nav Placeholder */}
        <div className="bg-white shadow-sm sticky top-0 z-30" />

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Article */}
            <article className="lg:w-2/3 pt-16">
              {/* Header with breadcrumbs */}
              <div className="mb-4">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <Link
                          href="/about-dholera-sir"
                          className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2"
                        >
                          DholeraSIR
                        </Link>
                      </div>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">
                          {post.title}
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Categories */}
              <div className="mb-8">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category._id || category.title}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        Dholera SIR
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>

                {/* Publication date */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <time className="text-gray-500">{formattedDate}</time>
                  </div>

                  {post.readingTime && (
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>{post.readingTime} min read</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Image */}
              {post.mainImage && (
                <div className="mb-10 overflow-hidden rounded-xl shadow-lg aspect-[3/2]">
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(800).url()}
                    alt={post.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto aspect-[3/2]"
                    priority
                    rel="preconnect"
                  />
                </div>
              )}

              <TableOfContent headings={extractHeadings(post.body)} />

              {/* Content */}
              <div className="bg-white rounded-xl shadow-2xl text-black leading-5 shadow-t-2xl p-8 border border-gray-200">
                <div className="text-xl max-w-none">
                  <PortableText value={post.body} components={components} />
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Related Topics:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/dholera-updates/${tag}`}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky space-y-4 top-24">
                <div className=" pt-4 max-w-xl mx-auto">
                  <LeadForm
                    title="Planning to Invest in Dholera Smart City?"
                    buttonName="Know More"
                  />
                </div>
                {/* Trending posts */}
                <div className="bg-[#151f28] rounded-xl shadow-2xl shadow-gray-500 p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Dholera Latest Updates
                  </h3>
                  <div className="">
                    {trendingBlogs && trendingBlogs.length > 0 ? (
                      trendingBlogs.map((post) => (
                        <div key={post._id} className="mb-3">
                          <TrendingBlogItem post={post} />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">
                        No trending articles found.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", slug, error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error loading blog post</h1>
          <p className="text-gray-600">Please try again later</p>
          <Link
            href="/dholera-sir-updates"
            className="mt-4 inline-block text-[#d3b66b] hover:text-[#b69b5e]"
          >
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }
}
