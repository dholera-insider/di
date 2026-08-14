import HomePage from "./pages/home";

export default function App() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "dholerainsider",
            alternateName: "DI",
            url: "https://www.dholerainsider.com/",
            logo: "https://www.dholerainsider.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.8d300ec5.webp&w=128&q=85",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/profile.php?id=61578651603291",
              "https://www.instagram.com/dholerainsider/",
              "https://www.youtube.com/@DholeraInsider",
              "https://x.com/Dholera_Insider",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Dholera Insider",
            url: "https://www.dholerainsider.com/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.dholerainsider.com/search?q={search_term_string}{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "Dholera Insider",
            url: "https://www.dholerainsider.com",
            logo: "https://www.dholerainsider.com/assets/images/logo.png",
            image:
              "https://www.dholerainsider.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.8d300ec5.webp&w=128&q=85",
            priceRange: "from â‚¹10 Lakh",
            telephone: "+91 92 11 82 08 87",
            address: {
              "@type": "PostalAddress",
              streetAddress: "620, JMD Megapolis, Sohna Rd, Sector 48,",
              addressLocality: "Gurgaon",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            areaServed: {
              "@type": "Place",
              name: "Dholera Smart City",
            },
          }),
        }}
      />

      <title>Dholera Investment for NRI | Verified Residential Plots</title>
      <meta
        name="description"
        content="Dholera Insider helps NRIs explore verified residential plots in Dholera Smart City with transparent information, legal clarity, and a smooth remote buying experience."
      />
      <meta
        name="keywords"
        content="Dholera Investment for NRI, Dholera plots for NRI, Dholera residential plots, NRI investment in Dholera, Buy Dholera plot from abroad, Dholera Smart City investment, Dholera property investment, Buy plot in Dholera, Dholera real estate for NRIs, Dholera plot investment, Invest in Dholera from abroad, Dholera Smart City for NRI investors, Residential plots in Dholera"
      />
      <link rel="canonical" href="https://www.dholerainsider.com" />

      <div>
        <HomePage />
      </div>
    </>
  );
}
