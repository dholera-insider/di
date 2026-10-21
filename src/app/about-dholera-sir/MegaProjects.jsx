import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

import MegaProjectsSliderClient from "./MegaProjectsSliderClient";

/* =========================================================
   PROJECT DATA
   ========================================================= */

const megaProjects = [
  {
    title: "ABCD Building",
    description:
      "Administrative & Business Centre, Dholera - Single-window system for investors",
    href: "/about-dholera-sir/abcd-building-dholera-sir",
  },
  {
    title: "TATA Electronics Semiconductor Fab",
    description:
      "India's first semiconductor manufacturing project",
    href: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
  },
  {
    title: "Dholera International Airport",
    description:
      "Global trade, cargo movement, and international travel",
    href: "/about-dholera-sir/dholera-international-airport-project-update-2025",
  },
  {
    title: "Ahmedabad–Dholera Expressway",
    description:
      "High-speed corridor cutting travel time to one hour",
    href: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
  },
  {
    title: "High-Speed Monorail & Railway",
    description:
      "Links with Ahmedabad and major industrial hubs",
    href: "/dholera-sir-blogs/how-connectivity-is-shaping-dholera-growth",
  },
  {
    title: "Dholera Solar Park",
    description:
      "One of India's largest renewable energy projects",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    title: "Water Treatment Plant",
    description:
      "Reliable long-term water supply for industries and residents",
    href: "/dholera-sir-blogs/dholera-smart-city-water-scarcity-solutions",
  },
  {
    title: "ReNew Power & Activation Area",
    description:
      "₹2,000 crore solar plant + ready infrastructure hub",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    title: "Dholera Sea Port",
    description:
      "A planned greenfield port in the Gulf of Khambhat to support Dholera Connectivity.",
    href: "/dholera-sir-blogs/dholera-sea-port-connectivity-growth",
  },
];

/* =========================================================
   SANITY QUERY

   No title matching.

   We simply fetch 9 main images and assign:
   image 1 -> project 1
   image 2 -> project 2
   image 3 -> project 3
   etc.
   ========================================================= */

const SANITY_IMAGES_QUERY = `
  *[
    defined(mainImage.asset)
  ]
  | order(_createdAt asc)
  [0...9]
  {
    mainImage {
      ...,
      asset-> {
        _id,
        url
      }
    }
  }
`;

/* =========================================================
   IMAGE URL

   Use Sanity CDN resizing instead of sending giant originals.

   900x560 is already more than enough for these cards.
   ========================================================= */

function getOptimizedSanityImage(mainImage) {
  if (!mainImage) return null;

  try {
    return urlFor(mainImage)
      .width(900)
      .height(560)
      .fit("crop")
      .auto("format")
      .quality(82)
      .url();
  } catch (error) {
    return mainImage?.asset?.url || null;
  }
}

/* =========================================================
   SERVER COMPONENT
   ========================================================= */

export default async function MegaProjectsSlider() {
  let sanityDocuments = [];

  try {
    sanityDocuments = await client.fetch(
      SANITY_IMAGES_QUERY,
      {},
      {
        next: {
          revalidate: 3600,
        },
      }
    );
  } catch (error) {
    console.error(
      "Mega Projects: unable to fetch Sanity images:",
      error
    );
  }

  const sanityImages = Array.isArray(sanityDocuments)
    ? sanityDocuments
        .map((document) =>
          getOptimizedSanityImage(document?.mainImage)
        )
        .filter(Boolean)
    : [];

  /*
   * Sequential image assignment.
   *
   * If Sanity temporarily returns fewer than 9 images,
   * existing images are cycled so cards never become blank.
   */
  const projectsWithImages = megaProjects.map(
    (project, index) => ({
      ...project,

      image:
        sanityImages.length > 0
          ? sanityImages[index % sanityImages.length]
          : null,
    })
  );

  return (
    <MegaProjectsSliderClient
      projects={projectsWithImages}
    />
  );
}