export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading blog content"
      className="min-h-screen bg-[#051A3A] pt-20"
    >
      <span className="sr-only">Loading blog content...</span>
      <div aria-hidden="true">
        <div className="h-[300px] bg-white/10 sm:h-[340px] md:h-[60vh] md:min-h-[420px] md:max-h-[680px]" />
        <div className="site-gutter mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-lg bg-white">
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
