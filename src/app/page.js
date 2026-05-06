"use client";
import { useState } from "react";
import HomePage from "./pages/home";
import Popup from "./components/Pop";

export default function App() {
  const [showpopForm, setpopShowForm] = useState(false);

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
            priceRange: "from ₹10 Lakh",
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

      <title>Dholera Smart City Investment | Buy Govt Approved Plots in Dholera</title>
      <meta
        name="description"
        content="Dholera Smart City investment opportunities with Dholera Insider. Buy govt approved plots in Dholera with site visit, registry, and documentation."
      />
      <meta
        name="keywords"
        content="Dholera Smart City Investment, Dholera SIR, plots in Dholera, Dholera investment, buy plots in Dholera"
      />
      <link rel="canonical" href="https://www.dholerainsider.com" />
      <div>
        <HomePage openForm={() => setpopShowForm(true)} />
      </div>
      {showpopForm && (
        <Popup
          onClose={() => setpopShowForm(false)}
          title={`Exclusive Deal: Own a plot at ₹11,000/sq. yard — hurry, limited units! –  left`}
          buttonName="Get A Call Back"
          className="font-medium"
        />
      )}
    </>
  );
}
