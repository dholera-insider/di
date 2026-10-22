import Link from "next/link";
import { investorLanguages } from "./seo";

const SITE_URL = "https://www.dholerainsider.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dholera Investment for NRIs | Country Guides | Dholera Insider",
  description:
    "Explore Dholera investment guides for NRIs in Bahrain, UAE, Oman, Kuwait, Singapore, Qatar, Hong Kong, and Saudi Arabia.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/investor`,
    languages: investorLanguages,
  },
};

const markets = [
  {
    name: "Bahrain",
    href: "/investor/bahrain",
    description: "Dholera property guidance for Bahrain-based NRIs.",
  },
  {
    name: "Dubai / UAE",
    href: "/investor/dubai",
    description: "Dholera investment guidance for Dubai and UAE-based NRIs.",
  },
  {
    name: "Oman",
    href: "/investor/oman",
    description: "Dholera property guidance for Oman-based NRIs.",
  },
  {
    name: "Kuwait",
    href: "/investor/kuwait",
    description: "Dholera investment guidance for Kuwait-based NRIs.",
  },
  {
    name: "Singapore",
    href: "/investor/singapore",
    description: "Dholera property guidance for Singapore-based NRIs.",
  },
  {
    name: "Qatar",
    href: "/investor/qatar",
    description: "Dholera investment guidance for Qatar-based NRIs.",
  },
  {
    name: "Hong Kong",
    href: "/investor/hong-kong",
    description: "Dholera property guidance for Hong Kong-based NRIs.",
  },
  {
    name: "Saudi Arabia",
    href: "/investor/saudi-arabia",
    description: "Dholera investment guidance for Saudi Arabia-based NRIs.",
  },
];

export default function InvestorHubPage() {
  return (
    <main className="bg-[#F8F7F3] text-[#051A3A]">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B77A00]">
            NRI Investor Guides
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Dholera Investment Guidance for NRIs
          </h1>
          <p className="mt-6 text-base leading-8 text-[#41516A] sm:text-lg">
            Choose your country of residence to explore Dholera residential plot
            information, document checks, payment guidance, and remote buying
            support relevant to your market.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market) => (
            <Link
              key={market.href}
              href={market.href}
              className="group rounded-2xl border border-[#D8DEE8] bg-white p-6 transition hover:-translate-y-1 hover:border-[#F0B429] hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-[#051A3A] group-hover:text-[#B77A00]">
                {market.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B6678]">
                {market.description}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-[#B77A00]">
                View NRI guide →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
