"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CommonForm = dynamic(() => import("./CommonForm"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[32rem] bg-[#051A3A]" />
  ),
});

export default function LazyCommonFormSection({ title }) {
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
      { rootMargin: "600px 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="">
      {shouldLoad ? (
        <CommonForm title={title} />
      ) : (
        <div className="bg-[#051A3A]" />
      )}
    </div>
  );
}
