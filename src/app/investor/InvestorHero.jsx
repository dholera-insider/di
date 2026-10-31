import { getImageProps } from "next/image";
import { heroImages } from "./heroImages";

// Static AVIF variants avoid an on-demand encoding request for the LCP image.
// The original Next-optimized image remains the fallback for older browsers.
export default function InvestorHero({ country, ...imageProps }) {
  const { props } = getImageProps({ ...imageProps, loading: "eager", fetchPriority: "high" });
  const srcSet = heroImages[country].map(image => image.src + " " + image.width + "w").join(", ");

  return (
    <>
      <link rel="preload" as="image" type="image/avif" imageSrcSet={srcSet} imageSizes={props.sizes} fetchPriority="high" />
      <picture>
        <source type="image/avif" srcSet={srcSet} sizes={props.sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...props} data-investor-hero={country} />
      </picture>
    </>
  );
}
