// lib/api.js
import { client } from './client';



/* Blog Posts */
export async function getPosts() {
  const query = `*[_type == "post" && "Project" in categories[]->title && author->name == "Dholera Insider" && !("Sold Out" in categories[]->title)]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export async function getSub() {
  const query = `*[_type == "post" && "Sub-Project" in categories[]->title && author->name == "Dholera Insider"]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export async function getblogs() {
  const query = `
    *[
      _type == "post" &&
      "Blog" in categories[]->title &&
      author->name == "Dholera Insider" &&
      !("Sold Out" in categories[]->title)
    ]
    | order(publishedAt desc)
    {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      author->{name, image},
      categories[]->{title}
    }
  `;

  return await client.fetch(query, {}, { cache: "no-store" });
}


export async function getUpdates() {
  const query = `
    *[
      _type == "post" &&
      "Updates" in categories[]->title &&
      author->name == "Dholera Insider" &&
      !("Sold Out" in categories[]->title)
    ]
    | order(publishedAt desc)
    {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      author->{name, image},
      categories[]->{title}
    }
  `;

  return await client.fetch(query, {}, { cache: "no-store" });
}

export async function getEvents() {
  const query = `*[_type == "post" && "Events" in categories[]->title && author->name == "Dholera Insider"]{
    _id, title, slug, mainImage, publishedAt, body, author->{name, image}, categories[]->{title}
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

/* Project Info */
export async function projectInfo() {
  const query = `
    *[
      _type == "post" &&
      "project-Info" in categories[]->title &&
      author->name == "Dholera Insider" &&
      !("Sold Out" in categories[]->title)
    ]
    | order(publishedAt desc)
    {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      author->{name, image},
      categories[]->{title}
    }
  `;

  return await client.fetch(query, {}, { cache: "no-store" });
}



export async function projectInfoX() {
  const posts = await projectInfo();
  return { relatedProjects: posts };
}

/* Documents */
export async function Inventory() {
  const query = `*[_type == "post" && author->name == "Dholera Insider" && "Project" in categories[]->title] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "categories": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown"),
    "isSoldOut": "Sold Out" in categories[]->title
  }`;

  const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    const json = await response.json();
    const posts = json.result || [];

    // Filter to return only posts that have a PDF URL
    const filteredPosts = posts.filter(post => post.pdfUrl);
    return filteredPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function Brochure() {
  const query = `*[_type == "post" && author->name == "Dholera Insider" && "Brochure" in categories[]->title] | order(publishedAt desc) [0..9] {
    _id, title, publishedAt, mainImage,
    "pdfUrl": coalesce(pdfFile.asset->url, null),
    "category": coalesce(categories[]->title, []),
    "author": coalesce(author->name, "Unknown")
  }`;

  const posts = await client.fetch(query, {}, { cache: 'no-store' });
  return posts.filter(post => post.pdfUrl);
}

/* Single Post Fetching */
export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "Dholera Insider"][0]{
    _id, title, metaTitle, metaDescription, "keywords": keywords, slug,
    mainImage { asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, alt, caption, url },
    publishedAt, _createdAt,
    body[]{ ..., _type=="image"=>{..., asset->{ _id, _ref, url, metadata{ dimensions, lqip } }, "url": url }, markDefs[]{..., _type=="link"=>{"href":@.href}} },
    author->{ name, image }, categories[]->{ title, _id }, readingTime
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

export async function getProjectBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "Dholera Insider"][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title}, mainImage, location, investment, returns,
    "relatedProjects": *[
      _type == "post" && 
      author->name == "Dholera Insider" && 
      "Sub-Project" in categories[]->title && 
      !("Sold Out" in categories[]->title) &&
      slug.current != $slug
    ]{ title, "slug": slug.current, mainImage }
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

export async function getProjectSOBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "Dholera Insider"][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title}, mainImage, location, investment, returns,
    "relatedProjects": *[
      _type == "post" && 
      author->name == "Dholera Insider" && 
      "Sub-Project" in categories[]->title && 
      "Sold Out" in categories[]->title &&
      slug.current != $slug
    ]{ title, "slug": slug.current, mainImage }
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

export async function getEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug][0]{
    _id, eventName, slug, mainImage, publishedAt, description,
    dateOfEvent, timeOfEvent, location, mapsLink,
    "eventMaterials": eventMaterials.asset->url,
    categories[]->{title, _id}
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}

/* Helper Functions */
export async function getAllSubProjects() {
  const query = `*[_type == "post" && "Sub-Project" in categories[]->title && author->name == "Dholera Insider"]{
    title, "slug": slug.current, mainImage, categories[]->{title}
  }`;
  return await client.fetch(query, {}, { cache: 'no-store' });
}

export async function getSubProjects(slug) {
  const query = `*[_type == "post" && slug.current == $slug && author->name == "Dholera Insider"][0]{
    title, metaTitle, metaDescription, keywords, description, body,
    categories[]->{title}, mainImage, location, investment, returns,
    "relatedProjects": *[
      _type == "post" && 
      author->name == "Dholera Insider" && 
      "Sub-Project" in categories[]->title && 
      slug.current != $slug
    ]{ title, "slug": slug.current, mainImage }
  }`;
  return await client.fetch(query, { slug }, { cache: 'no-store' });
}