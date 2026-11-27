# Structured data

Public pages render JSON-LD on the server through `JsonLd.jsx`. The serializer escapes `<` so that CMS text cannot close the script element. Sanity Studio and API routes do not receive public-page schema.

| Pages | Markup |
| --- | --- |
| Home | WebPage, RealEstateAgent, WebSite, visible FAQ questions |
| About Us / About Dholera SIR | AboutPage, BreadcrumbList, business and website identity; Dholera FAQs |
| Contact | ContactPage, BreadcrumbList, contact FAQs |
| Gallery | ImageGallery, ItemList and ImageObject for all 18 visible images |
| Blog / Updates archives | CollectionPage, BreadcrumbList, ItemList for that page's visible articles |
| Investor overview | CollectionPage, BreadcrumbList, ItemList for the eight country guides |
| Investor country guides | WebPage, Service, BreadcrumbList, that country's visible FAQs |
| Privacy, copyright, terms | WebPage, BreadcrumbList |
| Blog articles | BlogPosting, WebPage, BreadcrumbList |
| News updates | NewsArticle, WebPage, BreadcrumbList |
| Dholera project articles | Article, WebPage, BreadcrumbList |

Every graph shares the same `#organization` and `#website` identities. Business details follow the existing contact page and footer. No ratings, offers, unverified project prices, or nonexistent site-search actions are added.

Article ownership and canonical URLs come from `article-routes.mjs`, including featured project overrides. Word counts and reading times use the entire Portable Text article. The optional `articleBody` field is omitted to avoid duplicating the full article in the HTML payload. Descriptions fall back to article text when the CMS description is empty. Missing images and invalid dates are omitted. FAQ markup uses the same arrays as the corresponding page content; unrendered CMS FAQ fields are not marked up.

## Validation

Run the isolated route/schema checks without starting Next.js:

```powershell
node --test scripts/structured-data.test.mjs
```

The suite compiles real route/schema components with the installed Next.js compiler and captures rendered JSON-LD. CMS calls and unrelated UI components are replaced at their import boundaries. It checks route coverage, page types, entity references, canonical breadcrumbs, archive pagination, gallery data, services, complete article text, missing CMS fields and script escaping.

Optional environment variables extend validation:

- `SCHEMA_ARTICLES_PATH`: a JSON array of published Sanity posts, including `site`, `slug`, `title`, `body`, `author`, `categories`, dates and main images.
- `SCHEMA_VOCAB_PATH`: the downloaded [official Schema.org JSON-LD vocabulary](https://schema.org/version/latest/schemaorg-current-https.jsonld). This checks that every generated type and property exists; it is not a complete check of every Schema.org range or Google feature requirement.

On November 27, 2026, all 11 checks passed with a snapshot of 105 public article pages, all 19 static public pages, both paginated archives and the official vocabulary. One additional CMS record belongs to an unsupported project category and is excluded by the existing article routing rules. Source JSX/module syntax was also checked. No Next.js build, development server or full application lint was run, following the repository instructions.

After deployment, check representative public URLs in [Google Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/). Those checks have not been run against this unpublished change. Local tests do not guarantee search-result enhancements.

FAQPage remains a valid Schema.org type, but [Google stopped showing FAQ rich results on May 7, 2026](https://developers.google.com/search/updates). The FAQ markup describes visible content; it does not promise a Google FAQ enhancement.
