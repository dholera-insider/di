import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Date not available";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Link
      href={
        post.slug?.current ? `/dholera-sir-blogs/${post.slug.current}` : "#"
      }
      className="group"
    >
      <div className="bg-white rounded-[8px] shadow-md overflow-hidden h-full hover:shadow-[#f6c343] hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200">
        {/* Blog Image */}
        <div className="relative h-52">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 80px) / 2), (max-width: 1279px) calc((100vw - 128px) / 3), 384px"
              quality={75}
              className="object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-[#F6C343] to-[#e3ae25]"></div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-[#F6C343] line-clamp-2 transition-colors">
            {post.title}
          </h2>

          <div className="border-t border-gray-200 pt-4 mt-auto">
            <div className="flex justify-between text-sm">
              <p className="text-sm text-black">
                {formatDate(post.publishedAt || post._createdAt)}
              </p>
              <span className="font-medium hover:underline text-[#F6C343]">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
