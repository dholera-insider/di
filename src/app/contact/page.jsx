import ContactPageClient from "./ContactPageClient";
import PageSchema from "@/app/components/PageSchema";
import { ORGANIZATION_ID } from "@/lib/structured-data.mjs";

export const metadata = {
  title: "Contact Dholera Insider | Dholera Investment for NRIs",
  description:
    "Get in touch with Dholera Insider for expert guidance on Dholera investment for NRIs. Explore verified residential plots, project details, and remote buying support.",
  alternates: {
    canonical: "https://www.dholerainsider.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Dholera Insider | Dholera Investment for NRIs",
    description:
      "Get in touch with Dholera Insider for expert guidance on Dholera investment for NRIs. Explore verified residential plots, project details, and remote buying support.",
    url: "https://www.dholerainsider.com/contact",
    type: "website",
  },
};

const contactFaqs = [
  {
    question: "How can I contact Dholera Insider?",
    answer:
      "You can contact us by phone, email, or by submitting the enquiry form on this page. Our team will respond as soon as possible.",
  },
  {
    question: "Can I get project details before making a decision?",
    answer:
      "Yes. We provide project information, pricing, and guidance to help you understand your options before investing.",
  },
  {
    question: "Can NRIs invest in Dholera without visiting India?",
    answer:
      "Yes. We assist NRIs with a remote buying process, including project discussions and documentation guidance.",
  },
  {
    question: "Does Dholera Insider provide legal guidance?",
    answer:
      "We help buyers understand project documents, approvals, and the buying process so they can make informed investment decisions.",
  },
];



export default function ContactPage() {
  return (
    <>
      <PageSchema metadata={metadata} type="ContactPage" mainEntity={{ "@id": ORGANIZATION_ID }} faqs={contactFaqs} />
      <ContactPageClient faqs={contactFaqs} />
    </>
  );
}
