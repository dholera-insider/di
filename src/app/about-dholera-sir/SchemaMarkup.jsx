import ArticleSchemaMarkup from "../components/ArticleSchemaMarkup";

export default function SchemaMarkup({ post }) {
  return <ArticleSchemaMarkup post={post} includeMetadata={false} />;
}
