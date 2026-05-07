"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const SlugPageForm = dynamic(() => import("./SlugPageForm"), {
  ssr: false,
  loading: () => <div className="min-h-[28rem]" />,
});

export default function LazySlugPageForm() {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldLoad) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="min-h-[28rem]">
      {shouldLoad ? <SlugPageForm /> : null}
    </div>
  );
}
