import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { megaProjects } from "@/lib/mega-projects.mjs";

import MegaProjectsSliderClient from "./MegaProjectsSliderClient";

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
