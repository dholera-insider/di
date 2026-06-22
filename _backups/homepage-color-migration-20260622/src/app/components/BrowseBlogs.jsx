"use client";
import { getblogs } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

// Related Blog Card Component
const RelatedBlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      <div className="relative w-full h-36 md:h-48">
        {blog.mainImage ? (
          <Image
            src={urlFor(blog.mainImage).url()}
            alt={blog.title}
            fill
            className=""
            rel="preconnect"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-teal-950 line-clamp-2 h-14">
          {blog.title}
        </h3>

        {/* Meta info */}
        <div className="text-sm text-gray-600 mb-4">
          <time>
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <div>
            Posted By{" "}
            <span className="font-medium text-teal-700">Dholera Insider</span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/dholera-sir-blogs/${blog.slug.current}`}
          className="mt-auto"
        >
          <button className="w-full px-4 py-2 text-white bg-teal-700 hover:bg-teal-800 transition-colors duration-300 rounded-md">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

// Loading skeleton component
const BlogSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
    <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
  </div>
);

export default function LatestUpdates() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const getUpdates = await getblogs();
        
        const safePosts = getUpdates.map((post) => ({
          ...post,
          author: post.author || "Dholera Times",
          mainImage: post.mainImage || null,
          slug: post.slug || { current: "#" },
        }));

        const trendingBlogs = safePosts
          .sort(
            (a, b) =>
              new Date(b.publishedAt || b._createdAt) -
              new Date(a.publishedAt || a._createdAt)
          )
          .slice(0, 4);

        setBlogs(trendingBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <p className="text-[28px] font-semibold mb-6 text-center text-teal-950">Featured Blogs</p>
        <div className="text-center text-red-500">
          <p>Error loading blogs. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 bg-gray-50">
      <div className="w-full px-2 mb-10 text-center">
        <h3 className="font-bold text-2xl md:text-3xl mb-3 relative inline-block pb-2 text-teal-950">
          Featured Blogs
          <span className="absolute bottom-0 left-1/4 right-1/4 h-1 rounded-full bg-teal-700"></span>
        </h3>
        <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-600 mt-4">
          Handpicked reads to stay ahead with Expert views on Dholera
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <BlogSkeleton key={i} />)
          : blogs.length > 0
            ? blogs.map((blog) => (
                <RelatedBlogCard key={blog._id} blog={blog} />
              ))
            : Array(4)
                .fill(0)
                .map((_, i) => <BlogSkeleton key={i} />)
        }
      </div>
    </div>
  );
}