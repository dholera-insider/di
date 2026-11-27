import PageSchema from "@/app/components/PageSchema";
import { absoluteUrl } from "@/lib/structured-data.mjs";
import { galleryImages } from "./images";
import galleryBanner from "@/app/assets/dholera-insider-gallery-banner.webp";

const SITE_URL = "https://www.dholerainsider.com";
const PAGE_URL = `${SITE_URL}/gallery`;
const PAGE_TITLE = "Dholera Smart City Project Gallery | Dholera Insider";
const PAGE_DESCRIPTION =
  "Explore Dholera Smart City photos of the airport, expressway, Tata semiconductor plant, solar parks and infrastructure projects with Dholera Insider.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Dholera Insider",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: galleryBanner.src,
        width: galleryBanner.width,
        height: galleryBanner.height,
        alt: "Dholera Smart City project gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: galleryBanner.src,
        alt: "Dholera Smart City project gallery",
      },
    ],
  },
};

export default function GalleryLayout({ children }) {
  return (
    <>
      <PageSchema
        metadata={metadata}
        type="ImageGallery"
        items={galleryImages.map((image) => ({
          "@type": "ImageObject", name: image.alt, caption: image.caption,
          contentUrl: absoluteUrl(image.src.src), url: absoluteUrl(image.src.src),
          width: image.src.width, height: image.src.height,
        }))}
      />
      {children}
    </>
  );
}
