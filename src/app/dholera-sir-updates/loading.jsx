export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading updates"
      className="min-h-screen bg-white pt-20"
    >
      <span className="sr-only">Loading updates...</span>
      <div aria-hidden="true">
        <div className="h-[300px] bg-[#051A3A]/10 sm:h-[340px] md:h-[50vh] md:min-h-[400px]" />
        <div className="site-gutter section-space mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="h-52 bg-gray-200" />
              <div className="space-y-4 p-6">
                <div className="h-6 w-4/5 rounded bg-gray-200" />
                <div className="h-6 w-3/5 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
