import { createPageGraph, ORGANIZATION_ID, SITE_URL } from "@/lib/structured-data.mjs";
import { withSiteSchema } from "@/app/schemaMarkup";
import JsonLd from "./JsonLd";

export default function PageSchema({ metadata, country, ...options }) {
  const url = metadata.alternates.canonical;
  const name = metadata.title.trim();
  const service = country ? {
    "@type": "Service", "@id": `${url}#service`,
    name: `Dholera property buying assistance for ${country} NRIs`,
    serviceType: "NRI property buying assistance",
    description: metadata.description,
    url, provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": country === "Hong Kong" ? "AdministrativeArea" : "Country", name: country },
  } : undefined;
  const data = createPageGraph({
    url, name, description: metadata.description,
    image: metadata.openGraph?.images?.[0]?.url,
    ...(country ? {
      parents: [{ name: "NRI Investor Guides", url: `${SITE_URL}/investor` }],
      mainEntity: { "@id": service["@id"] },
    } : {}),
    ...options,
  });
  if (data && service) data["@graph"].push(service);
  return <JsonLd data={withSiteSchema(data)} />;
}
