import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function BlogCard({ blog }) {
  return (
    <Link
      href={
        blog.slug?.current ? `/dholera-sir-updates/${blog.slug.current}` : "#"
      }
      className="group"
    >
      <div className="bg-white rounded-[8px] shadow-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Blog Image */}
        <div className="relative h-52">
          {blog.mainImage ? (
            <Image
              src={
                urlFor(blog.mainImage).width(1200).height(675).url() ||
                "/placeholder.svg"
              }
              alt={blog.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-teal-400 to-teal-600"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-teal-600 line-clamp-2 transition-colors">
            {blog.title}
          </h2>

          {/* Footer with "Read More" */}
          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center justify-center">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-700 mr-2"></span>
                <span className="text-black">
                  <time>
                    {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </span>
              </div>
              <span className="text-teal-500 font-medium">
                Read More &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
