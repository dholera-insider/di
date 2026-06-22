"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";

const BLOGS_PER_PAGE = 10;

export default function MobileUpdatesPagination({ blogs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const totalPages = Math.max(1, Math.ceil(safeBlogs.length / BLOGS_PER_PAGE));

  const visibleBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    return safeBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);
  }, [currentPage, safeBlogs]);

  const goToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages));
  };

  if (safeBlogs.length === 0) {
    return null;
  }

  return (
    <div className="md:hidden">
      <div className="grid grid-cols-1 gap-8">
        {visibleBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Mobile update pagination"
          className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-[0.875rem] font-semibold text-gray-800 transition-colors hover:border-[#051A3A] hover:bg-[#2B364D] hover:text-black disabled:pointer-events-none disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
          >
            Prev
          </button>

          <span className="flex h-[2.5rem] items-center justify-center px-3 text-[0.875rem] font-semibold text-gray-700">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-[0.875rem] font-semibold text-gray-800 transition-colors hover:border-[#051A3A] hover:bg-[#2B364D] hover:text-black disabled:pointer-events-none disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
