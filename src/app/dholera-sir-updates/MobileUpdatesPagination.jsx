import Link from "next/link";

const buttonClassName =
  "flex h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-semibold";
const activeClassName =
  `${buttonClassName} border-gray-300 bg-white text-gray-800 transition-colors hover:border-[#051A3A] hover:bg-gray-100`;
const disabledClassName =
  `${buttonClassName} border-gray-200 bg-gray-100 text-gray-400`;

export default function MobileUpdatesPagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Updates pagination"
      className="mt-[clamp(2rem,4vw,3rem)] flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={
            currentPage === 2
              ? "/dholera-sir-updates"
              : `/dholera-sir-updates?page=${currentPage - 1}`
          }
          rel="prev"
          className={activeClassName}
        >
          Prev
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClassName}>
          Prev
        </span>
      )}

      <span className="flex h-11 items-center justify-center px-3 text-sm font-semibold text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`/dholera-sir-updates?page=${currentPage + 1}`}
          rel="next"
          className={activeClassName}
        >
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClassName}>
          Next
        </span>
      )}
    </nav>
  );
}
