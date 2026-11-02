import { preload } from "react-dom";
import avif480 from "@/app/assets/blog-hero-480.avif";
import avif768 from "@/app/assets/blog-hero-768.avif";
import avif1024 from "@/app/assets/blog-hero-1024.avif";
import avif1500 from "@/app/assets/blog-hero-1500.avif";
import webp480 from "@/app/assets/blog-hero-480.webp";
import webp768 from "@/app/assets/blog-hero-768.webp";
import webp1024 from "@/app/assets/blog-hero-1024.webp";
import webp1500 from "@/app/assets/blog-hero-1500.webp";

const srcSet = (images) =>
  images.map((image) => `${image.src} ${image.width}w`).join(", ");
const avifSrcSet = srcSet([avif480, avif768, avif1024, avif1500]);
const webpSrcSet = srcSet([webp480, webp768, webp1024, webp1500]);

export default function BlogHero() {
  // Match the picture source so the browser downloads only its chosen variant.
  preload(avif1500.src, {
    as: "image",
    type: "image/avif",
    imageSrcSet: avifSrcSet,
    imageSizes: "100vw",
    fetchPriority: "high",
  });

  return (
    <div className="relative bg-white pt-20">
      <div className="relative h-[300px] w-full overflow-hidden shadow-lg sm:h-[340px] md:h-[60vh] md:min-h-[420px] md:max-h-[680px]">
        <picture>
          <source type="image/avif" srcSet={avifSrcSet} sizes="100vw" />
          {/* Static responsive variants avoid a cold image-optimizer request. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-blog-hero="true"
            src={webp1500.src}
            srcSet={webpSrcSet}
            sizes="100vw"
            alt="Dholera SIR Development"
            width={1500}
            height={500}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 z-[1] bg-black/40" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-5xl">
            Dholera Smart City Blogs
          </h1>
        </div>
      </div>
    </div>
  );
}
