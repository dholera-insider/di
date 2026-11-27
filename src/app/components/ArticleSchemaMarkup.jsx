import { urlFor } from "@/sanity/lib/image";
import { createArticleGraph, portableTextToPlainText } from "@/lib/structured-data.mjs";
import { withSiteSchema } from "@/app/schemaMarkup";
import JsonLd from "./JsonLd";

export default function ArticleSchemaMarkup({ post, includeMetadata = true }) {
  if (!post) return null;
  let image;
  try {
    if (post.mainImage) image = urlFor(post.mainImage).width(1200).height(630).fit("crop").auto("format").url();
  } catch {
    // Missing CMS assets must not prevent an article from rendering.
  }
  const data = createArticleGraph(post, { image });
  if (!data) return null;
  const url = data["@graph"][0].url;
  const description = post.metaDescription || portableTextToPlainText(post.body).slice(0, 160);
  return (
    <>
      <JsonLd data={withSiteSchema(data)} />
      {includeMetadata && (
        <>
          <meta name="author" content={post.author?.name || "Dholera Insider"} />
          <meta name="robots" content={post.noIndex ? "noindex, follow" : "index, follow"} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.metaTitle || post.title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:site_name" content="Dholera Insider" />
          {image && <meta property="og:image" content={image} />}
          {post.publishedAt && <meta property="article:published_time" content={post.publishedAt} />}
          {post._updatedAt && <meta property="article:modified_time" content={post._updatedAt} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.metaTitle || post.title} />
          <meta name="twitter:description" content={description} />
          {image && <meta name="twitter:image" content={image} />}
          <meta name="twitter:site" content="@Dholera_Insider" />
        </>
      )}
    </>
  );
}
