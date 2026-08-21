import HomePage from "./pages/home";
import { homePageSchema } from "./schemaMarkup";

export default function App() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
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
