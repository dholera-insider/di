// import Image from "next/image";
// import Link from "next/link";
// import {
//   Building2,
//   CheckCircle2,
//   Globe,
//   Home,
//   Landmark,
//   Users,
//   ShieldCheck,
//   CircleDollarSign,
//   FileCheck2,
//   MonitorPlay,
//   Headphones,
//   Handshake,
// } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";


// import heroImage from "@/app/assets/about-dholera/dholera-insider-about-dholera-banner.webp";
// import phoneheroImage from "@/app/assets/about-dholera/dholera-insider-about-dholera-moblie-banner.webp";
// import tataLogo from "@/app/assets/tata-logo.png";
// import WhyDholera from "@/app/about-dholera-sir/WhyDholera"
// import MegaProjectsSlider from "./MegaProjects";
// import AboutFaq from "./Faq"
// export const metadata = {
//   title: "About Dholera Smart City | Why NRIs Are Investing in Dholera",
//   description:
//     "Learn about Dholera Smart City, its infrastructure, major developments, and why NRIs are investing in residential plots for long-term growth.",
//   keywords: [
//     "About Dholera Smart City",
//     "Dholera Smart City",
//     "Dholera SIR",
//     "Dholera Investment",
//     "Dholera Residential Plots",
//     "Invest in Dholera",
//     "Dholera Smart City Investment",
//     "Dholera Property Investment",
//     "Residential Plots in Dholera",
//     "Dholera Infrastructure",
//     "Dholera for NRI Investors",
//   ],
//   alternates: {
//     canonical: "https://www.dholerainsider.com/about-dholera-sir",
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
//   openGraph: {
//     title: "About Dholera Smart City | Why NRIs Are Investing in Dholera",
//     description:
//       "Learn about Dholera Smart City, its infrastructure, major developments, and why NRIs are investing in residential plots for long-term growth.",
//     url: "https://www.dholerainsider.com/about-dholera-sir",
//     type: "website",
//   },
// };


// const insiderBenefits = [
//   {
//     title: "Verified Residential Plot Projects",
//     Icon: ShieldCheck,
//   },
//   {
//     title: "Transparent Pricing",
//     Icon: CircleDollarSign,
//   },
//   {
//     title: "Legal Documentation Support",
//     Icon: FileCheck2,
//   },
//   {
//     title: "Virtual Project Presentations",
//     Icon: MonitorPlay,
//   },
//   {
//     title: "100% Remote Buying Assistance",
//     Icon: Headphones,
//   },
//   {
//     title: "Exclusive Channel Partner of BookMyAssets",
//     Icon: Handshake,
//   },
// ];

// const megaProjects = [
//   {
//     icon: "🏢",
//     title: "ABCD Building",
//     description:
//       "Administrative & Business Centre, Dholera - Single-window system for investors",
//     href: "/about-dholera-sir/abcd-building-dholera-sir",
//   },
//   {
//     image: tataLogo,
//     title: "TATA Electronics Semiconductor Fab",
//     description: "India's first semiconductor manufacturing project",
//     href: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
//   },
//   {
//     icon: "✈️",
//     title: "Dholera International Airport",
//     description: "Global trade, cargo movement, and international travel",
//     href: "/about-dholera-sir/dholera-international-airport-project-update-2025",
//   },
//   {
//     icon: "🛣️",
//     title: "Ahmedabad–Dholera Expressway",
//     description: "High-speed corridor cutting travel time to one hour",
//     href: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
//   },
//   {
//     icon: "🚇",
//     title: "High-Speed Monorail & Railway",
//     description: "Links with Ahmedabad and major industrial hubs",
//     href: "/dholera-sir-blogs/how-connectivity-is-shaping-dholera-growth",
//   },
//   {
//     icon: "☀️",
//     title: "Dholera Solar Park",
//     description: "One of India's largest renewable energy projects",
//     href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
//   },
//   {
//     icon: "💧",
//     title: "Water Treatment Plant",
//     description: "Reliable long-term water supply for industries and residents",
//     href: "/dholera-sir-blogs/dholera-smart-city-water-scarcity-solutions",
//   },
//   {
//     icon: "⚡",
//     title: "ReNew Power & Activation Area",
//     description: "₹2,000 crore solar plant + ready infrastructure hub",
//     href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
//   },
//   {
//     icon: "🚢",
//     title: "Dholera Sea Port",
//     description:
//       "A planned greenfield port in the Gulf of Khambhat to support Dholera Connectivity.",
//     href: "/dholera-sir-blogs/dholera-sea-port-connectivity-growth",
//   },
// ];

// const nriBenefits = [
//   "Long-term land ownership",
//   "Opportunity to build a future home",
//   "Investment in a developing smart city",
//   "Potential for future appreciation",
//   "A long-term family asset in India",
// ];





// const suitableFor = [
//   {
//     Icon: Globe,
//     text: "NRIs looking for long-term property investment",
//   },
//   {
//     Icon: Home,
//     text: "Families planning a future home in India",
//   },
//   {
//     Icon: Landmark,
//     text: "Investors seeking residential land",
//   },
//   {
//     Icon: Building2,
//     text: "Buyers interested in government-planned developments",
//   },
//   {
//     Icon: Users,
//     text: "Individuals building long-term wealth through real estate",
//   },
// ];

// const faqs = [
//   {
//     question: "What is Dholera Smart City?",
//     answer:
//       "Dholera Smart City is India's first Greenfield Smart City, planned with modern infrastructure, industrial development, residential zones, and smart urban planning.",
//   },
//   {
//     question: "Why is Dholera attracting investors?",
//     answer:
//       "Dholera is attracting investors because of its government-backed development, major infrastructure projects, industrial investments, and long-term growth potential.",
//   },
//   {
//     question: "Can NRIs invest in Dholera?",
//     answer:
//       "Yes. NRIs can invest in residential plots in Dholera, subject to applicable Indian laws and regulations.",
//   },
//   {
//     question: "Why are residential plots popular in Dholera?",
//     answer:
//       "Residential plots offer long-term ownership, flexibility for future construction, and the opportunity to invest early in a developing smart city.",
//   },
//   {
//     question: "How does Dholera Insider help NRI investors?",
//     answer:
//       "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We help overseas buyers explore verified residential plot projects with transparent documentation, remote buying support, and end-to-end assistance.",
//   },
// ];



// const faqSchema = {
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   mainEntity: faqs.map((faq) => ({
//     "@type": "Question",
//     name: faq.question,
//     acceptedAnswer: {
//       "@type": "Answer",
//       text: faq.answer,
//     },
//   })),
// };

// function SectionHeading({ children, inverse = false }) {
//   return (
//     <div className="mb-6 md:mb-6">
//       <h2
//         className={`text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.025em] ${
//           inverse ? "text-white" : "text-[#051A3A]"
//         }`}
//       >
//         {children}
//       </h2>
//       <div className="mt-4 h-1 w-16 rounded-full bg-[#F6C343]" />
//     </div>
//   );
// }

// function CheckList({ items, inverse = false }) {
//   return (
//     <ul className="grid gap-4 sm:grid-cols-2">
//       {items.map((item) => (
//         <li
//           key={item}
//           className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${
//             inverse
//               ? "border-white/10 bg-white/[0.06] text-white"
//               : "border-[#051A3A]/10 bg-white text-[#162033] shadow-sm"
//           }`}
//         >
//           <CheckCircle2
//             className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]"
//             aria-hidden="true"
//           />
//           <span className="text-sm font-semibold leading-6">{item}</span>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default function AboutDholeraSirPage() {
//   return (
//     <main className="bg-[#FDFCFA] text-[#162033]">
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
//       />
//     <section className="overflow-hidden bg-[#051A3A] text-white">
//       {/* ================================
//           MOBILE / TABLET
//           Image first, content below
//       ================================= */}
//       <div className="lg:hidden">
//         {/* Complete mobile image */}
//         <div className="w-full bg-[#051A3A]">
//           <Image
//             src={phoneheroImage}
//             alt="About Dholera Smart City"
//             priority
//             sizes="100vw"
//             className="
//               block
//               h-auto
//               w-full
//               object-contain
//             "
//           />
//         </div>

//         {/* Mobile content */}
//         <div
//           className="
//             px-4
//             pb-10
//             pt-8

//             sm:px-6
//             sm:pb-12
//             sm:pt-10
//           "
//         >
//           <h1
//             className="
//               max-w-[390px]
//               text-[32px]
//               font-bold
//               leading-[1.05]
//               tracking-[-0.04em]

//               sm:max-w-xl
//               sm:text-[42px]
//             "
//           >
//             About{" "}
//             <span className="text-[#F6C343]">
//               Dholera Smart City
//             </span>
//           </h1>

//           <div className="mt-4 h-[3px] w-12 rounded-full bg-[#F6C343]" />

//           <p
//             className="
//               mt-6
//               max-w-xl
//               text-[15px]
//               leading-7
//               text-white/80

//               sm:text-base
//               sm:leading-8
//             "
//           >
//             Dholera Smart City is India’s first Greenfield Smart City, being
//             developed with planned infrastructure, industrial zones, and
//             residential areas. Major projects like the Ahmedabad Dholera
//             Expressway, Dholera International Airport, and Tata Semiconductor Plant
//             are driving its future growth.
//           </p>

//           <a
//             href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
//             target="_blank"
//             rel="noopener noreferrer"
//             className="
//               mt-7
//               inline-flex
//               min-h-12
//               items-center
//               justify-center

//               rounded-xl
//               bg-[#F6C343]

//               px-6
//               py-3

//               text-sm
//               font-bold
//               text-[#051A3A]

//               transition-all
//               duration-300

//               hover:bg-white

//               focus:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-white
//             "
//           >
//             Explore Residential Projects
//           </a>
//         </div>
//       </div>

//       {/* ================================
//           DESKTOP
//           Full-width banner background
//       ================================= */}
// {/* ================================
//     DESKTOP
//     Full-width banner background
// ================================= */}

//       <div
//         className="
//           relative
//           hidden
//           min-h-[540px]
//           overflow-hidden
//           lg:block
//           xl:min-h-[600px]
//         "
//       >
//           {/* =================================
//               DESKTOP HERO IMAGE
//           ================================== */}

//           <Image
//             src={heroImage}
//             alt="About Dholera Smart City"
//             fill
//             priority
//             sizes="100vw"
//             className="
//               object-cover
//               object-center
//             "
//           />

//           {/* =================================
//               MAIN LEFT-TO-RIGHT OVERLAY

//               Left:
//               Strong enough for text readability.

//               Middle:
//               Smooth transition.

//               Right:
//               Very light so Dholera building
//               remains clear and visible.
//           ================================== */}

//           <div
//             aria-hidden="true"
//             className="
//               absolute
//               inset-0
//               bg-[linear-gradient(90deg,rgba(5,26,58,0.91)_0%,rgba(5,26,58,0.82)_25%,rgba(5,26,58,0.60)_42%,rgba(5,26,58,0.30)_58%,rgba(5,26,58,0.10)_74%,rgba(5,26,58,0.03)_100%)]
//             "
//           />

//           {/* =================================
//               SOFT BOTTOM DEPTH

//               Much lighter than previous /80.
//               Keeps cinematic depth without
//               making the building muddy.
//           ================================== */}

//           <div
//             aria-hidden="true"
//             className="
//               absolute
//               inset-x-0
//               bottom-0
//               h-[42%]
//               bg-gradient-to-t
//               from-[#051A3A]/55
//               via-[#051A3A]/20
//               to-transparent
//             "
//           />

//           {/* =================================
//               VERY SUBTLE RIGHT BALANCE

//               This prevents the right side from
//               becoming excessively bright compared
//               with the text side.
//           ================================== */}

//           <div
//             aria-hidden="true"
//             className="
//               absolute
//               inset-y-0
//               right-0
//               w-[38%]
//               bg-gradient-to-l
//               from-[#051A3A]/[0.06]
//               to-transparent
//             "
//           />

//           {/* =================================
//               DESKTOP CONTENT
//           ================================== */}

//           <div
//             className="
//               relative
//               z-10
//               mx-auto
//               flex
//               min-h-[540px]
//               w-full
//               max-w-7xl
//               items-center
//               px-8
//               xl:min-h-[600px]
//             "
//           >
//             <div className="max-w-[620px]">
//               {/* Heading */}

//               <h1
//                 className="
//                   text-[54px]
//                   font-bold
//                   leading-[1.02]
//                   tracking-[-0.045em]
//                   xl:text-[64px]
//                 "
//               >
//                 About{" "}
//                 <span className="text-[#F6C343]">
//                   Dholera Smart City
//                 </span>
//               </h1>

//               {/* Gold accent */}

//               <div className="mt-5 h-[3px] w-14 rounded-full bg-[#F6C343]" />

//               {/* Description */}

//               <p
//                 className="
//                   mt-7
//                   max-w-[590px]
//                   text-[17px]
//                   leading-8
//                   text-white/85
//                 "
//               >
//                 Dholera Smart City is India’s first Greenfield Smart City,
//                 being developed with planned infrastructure, industrial
//                 zones, and residential areas. Major projects like the
//                 Ahmedabad Dholera Expressway, Dholera International Airport,
//                 and Tata Semiconductor Plant are driving its future growth.
//               </p>

//               {/* CTA */}

//               <a
//                 href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="
//                   mt-8
//                   inline-flex
//                   min-h-12
//                   items-center
//                   justify-center
//                   rounded-xl
//                   bg-[#F6C343]
//                   px-6
//                   py-3
//                   text-sm
//                   font-bold
//                   text-[#051A3A]
//                   transition-all
//                   duration-300
//                   hover:-translate-y-0.5
//                   hover:bg-white
//                   focus:outline-none
//                   focus-visible:ring-2
//                   focus-visible:ring-white
//                 "
//               > 
//                 <FaWhatsapp className="mr-1 h-5 w-5 " aria-hidden="true" />
//                 Explore Residential Projects
//               </a>
//             </div>
//           </div>
//       </div>
//     </section>

//     {/* why dholera */}
//       <WhyDholera/>

//       {/* <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <SectionHeading>Mega Projects in Dholera Smart City</SectionHeading>
//           <div className="grid gap-6 md:grid-cols-3">
//             {megaProjects.map((project) => (
//               <article
//                 key={project.title}
//                 className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-[0_16px_40px_rgba(5,26,58,.08)] transition-transform duration-300 hover:-translate-y-1"
//               >
//                 <div className="mb-5 flex h-10 items-center">
//                   {project.image ? (
//                     <Image
//                       src={project.image}
//                       alt="TATA"
//                       className="h-8 w-auto object-contain"
//                     />
//                   ) : (
//                     <span className="text-3xl" aria-hidden="true">
//                       {project.icon}
//                     </span>
//                   )}
//                 </div>
//                 <h3 className="mb-3 text-lg font-bold text-[#051A3A]">
//                   <Link
//                     href={project.href}
//                     className="transition-colors hover:text-[#B98500]"
//                   >
//                     {project.title}
//                   </Link>
//                 </h3>
//                 <p className="text-sm leading-7 text-[#2B364D]">
//                   {project.description}
//                 </p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       <MegaProjectsSlider/>

//       <section className="bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
//         <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
//           <div>
//             <SectionHeading inverse>
//               Why NRIs Are Considering Dholera
//             </SectionHeading>
//             <p className="text-base leading-8 text-white/80">
//               Many NRIs are exploring Dholera because it combines
//               government-backed planning with long-term development potential.
//             </p>
//           </div>
//           <div>
//             <h3 className="mb-6 text-xl font-bold text-white">
//               A residential plot in Dholera offers:
//             </h3>
//             <CheckList items={nriBenefits} inverse />
//           </div>
//         </div>
//       </section>

//       {/* <section className="px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <SectionHeading>Why Invest Through Dholera Insider?</SectionHeading>
//           <p className="mb-8 max-w-3xl text-base leading-8 text-[#2B364D]">
//             Dholera Insider helps NRIs invest with confidence by providing:
//           </p>
//           <CheckList items={insiderBenefits} />
//         </div>
//       </section> */}

//       <section className="overflow-hidden bg-[#EEF2F9] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
//         <div className="mx-auto max-w-6xl">
//           {/* Heading */}
//           <div className="mb-7 sm:text-center lg:mb-9">
//             <h2 className="text-left text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#051A3A] sm:text-center sm:text-3xl lg:text-[38px]">
//               Why Invest Through Dholera Insider?
//             </h2>

//             <div className="mt-4 h-1 w-14 rounded-full bg-[#F6C343] sm:mx-auto" />

//             <p className="mt-3 max-w-2xl text-left text-sm leading-6 text-[#657083] sm:mx-auto sm:text-center">
//               Dholera Insider helps NRIs invest with confidence by providing:
//             </p>
//           </div>

//           {/* Timeline */}
//           <div className="relative mx-auto max-w-5xl">
//             {/* Desktop center line */}
//             <div
//               aria-hidden="true"
//               className="absolute bottom-5 left-1/2 top-5 hidden w-px -translate-x-1/2 bg-[#D8C998] lg:block"
//             />

//             {/* Mobile line */}
//             <div
//               aria-hidden="true"
//               className="absolute bottom-4 left-[17px] top-4 w-px bg-[#D8C998] lg:hidden"
//             />

//             <div className="space-y-2.5 lg:space-y-1.5">
//               {insiderBenefits.map((item, index) => {
//                 const Icon = item.Icon;
//                 const isLeft = index % 2 === 0;
//                 const number = String(index + 1).padStart(2, "0");

//                 return (
//                   <div
//                     key={item.title}
//                     className="relative grid grid-cols-[34px_1fr] items-center gap-3 lg:grid-cols-[1fr_54px_1fr] lg:gap-5"
//                   >
//                     {/* Number */}
//                     <div className="relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2">
//                       <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E0C97A] bg-[#EEF2F9] text-[10px] font-semibold text-[#B98209] shadow-[0_3px_10px_rgba(5,26,58,0.06)] lg:h-9 lg:w-9">
//                         {number}
//                       </div>
//                     </div>

//                     {/* Card */}
//                     <div
//                       className={`
//                         group col-start-2 row-start-1 flex min-h-[70px] items-center gap-3
//                         rounded-[14px] border border-[#DCE2EB] bg-white px-4 py-3
//                         shadow-[0_5px_18px_rgba(5,26,58,0.045)]
//                         transition-all duration-300
//                         hover:-translate-y-0.5 hover:border-[#F6C343]
//                         hover:shadow-[0_10px_24px_rgba(5,26,58,0.08)]
//                         active:scale-[0.99]
//                         lg:min-h-[74px] lg:px-5
//                         ${
//                           isLeft
//                             ? "lg:col-start-1"
//                             : "lg:col-start-3 lg:flex-row-reverse"
//                         }
//                       `}
//                     >
//                       {/* Icon */}
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF7DF] text-[#C28A0A] transition-all duration-300 group-hover:bg-[#F6C343] group-hover:text-[#051A3A]">
//                         <Icon className="h-[19px] w-[19px]" strokeWidth={1.8} />
//                       </div>

//                       {/* Text */}
//                       <div className="min-w-0 flex-1 text-left">
//                         <h3 className="text-[13.5px] font-semibold leading-[1.35] tracking-[-0.015em] text-[#051A3A] sm:text-[14px] lg:text-[15px]">
//                           {item.title}
//                         </h3>

//                         <div className="mt-1.5 h-[2px] w-6 rounded-full bg-[#F6C343] transition-all duration-300 group-hover:w-10" />
//                       </div>
//                     </div>

//                     {/* Desktop connector */}
//                     <span
//                       aria-hidden="true"
//                       className={`
//                         absolute top-1/2 hidden h-px w-6 -translate-y-1/2 bg-[#D8C375] lg:block
//                         ${
//                           isLeft
//                             ? "left-[calc(50%_-_51px)]"
//                             : "right-[calc(50%_-_51px)]"
//                         }
//                       `}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>


//       <section className="bg-[#FDFCF8] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <SectionHeading>
//             Who Should Consider Investing in Dholera?
//           </SectionHeading>
//           <p className="mb-8 text-base leading-6 text-[#2B364D]">
//             Dholera may be suitable for:
//           </p>

//           {/* <p className="mb-6 text-[16px] font-semibold leading-7 text-[#2B364D] sm:mb-8 sm:text-[17px] sm:leading-8 lg:text-lg">
//             Dholera may be suitable for:
//           </p> */}

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
//             {suitableFor.map(({ Icon, text }) => (
//               <div
//                 key={text}
//                 className="rounded-2xl border border-[#051A3A]/10 bg-white p-6 shadow-sm"
//               >
//                 <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6C343]/20">
//                   <Icon
//                     className="h-6 w-6 text-[#051A3A]"
//                     strokeWidth={1.6}
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <p className="text-sm font-semibold leading-6 text-[#162033]">
//                   {text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="relative overflow-hidden bg-[#051A3A] px-4 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
//         <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F6C343]/10 blur-3xl" />
//         <div className="relative mx-auto max-w-4xl text-center">
//           <h2 className="mb-6 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight text-white">
//             Start Your Dholera Investment Journey
//           </h2>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
//           <a
//             href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#F6C343] px-7 py-3 text-base font-bold text-[#051A3A] transition-colors hover:bg-white sm:w-auto"
//           >
//             Explore Residential Plot Projects
//           </a>
//         </div>
//       </section>
    
//       <AboutFaq/>
//     </main>
//   );
// }



import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Globe,
  Home,
  Landmark,
  Users,
  ShieldCheck,
  CircleDollarSign,
  FileCheck2,
  MonitorPlay,
  Headphones,
  Handshake,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import heroImage from "@/app/assets/about-dholera/dholera-insider-about-dholera-banner.webp";
import phoneheroImage from "@/app/assets/about-dholera/dholera-insider-about-dholera-moblie-banner.webp";
import tataLogo from "@/app/assets/tata-logo.png";

import WhyDholera from "@/app/about-dholera-sir/WhyDholera";
import MegaProjectsSlider from "./MegaProjects";
import AboutFaq from "./Faq";

export const metadata = {
  title: "About Dholera Smart City | Why NRIs Are Investing in Dholera",
  description:
    "Learn about Dholera Smart City, its infrastructure, major developments, and why NRIs are investing in residential plots for long-term growth.",
  keywords: [
    "About Dholera Smart City",
    "Dholera Smart City",
    "Dholera SIR",
    "Dholera Investment",
    "Dholera Residential Plots",
    "Invest in Dholera",
    "Dholera Smart City Investment",
    "Dholera Property Investment",
    "Residential Plots in Dholera",
    "Dholera Infrastructure",
    "Dholera for NRI Investors",
  ],
  alternates: {
    canonical: "https://www.dholerainsider.com/about-dholera-sir",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Dholera Smart City | Why NRIs Are Investing in Dholera",
    description:
      "Learn about Dholera Smart City, its infrastructure, major developments, and why NRIs are investing in residential plots for long-term growth.",
    url: "https://www.dholerainsider.com/about-dholera-sir",
    type: "website",
  },
};

const insiderBenefits = [
  {
    title: "Verified Residential Plot Projects",
    Icon: ShieldCheck,
  },
  {
    title: "Transparent Pricing",
    Icon: CircleDollarSign,
  },
  {
    title: "Legal Documentation Support",
    Icon: FileCheck2,
  },
  {
    title: "Virtual Project Presentations",
    Icon: MonitorPlay,
  },
  {
    title: "100% Remote Buying Assistance",
    Icon: Headphones,
  },
  {
    title: "Exclusive Channel Partner of BookMyAssets",
    Icon: Handshake,
  },
];

const megaProjects = [
  {
    icon: "🏢",
    title: "ABCD Building",
    description:
      "Administrative & Business Centre, Dholera - Single-window system for investors",
    href: "/about-dholera-sir/abcd-building-dholera-sir",
  },
  {
    image: tataLogo,
    title: "TATA Electronics Semiconductor Fab",
    description: "India's first semiconductor manufacturing project",
    href: "/about-dholera-sir/tata-semiconductor-plant-in-dholera",
  },
  {
    icon: "✈️",
    title: "Dholera International Airport",
    description: "Global trade, cargo movement, and international travel",
    href: "/about-dholera-sir/dholera-international-airport-project-update-2025",
  },
  {
    icon: "🛣️",
    title: "Ahmedabad–Dholera Expressway",
    description: "High-speed corridor cutting travel time to one hour",
    href: "/about-dholera-sir/ahmedabad-dholera-expressway-transforming-gujarat-connectivity",
  },
  {
    icon: "🚇",
    title: "High-Speed Monorail & Railway",
    description: "Links with Ahmedabad and major industrial hubs",
    href: "/dholera-sir-blogs/how-connectivity-is-shaping-dholera-growth",
  },
  {
    icon: "☀️",
    title: "Dholera Solar Park",
    description: "One of India's largest renewable energy projects",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    icon: "💧",
    title: "Water Treatment Plant",
    description: "Reliable long-term water supply for industries and residents",
    href: "/dholera-sir-blogs/dholera-smart-city-water-scarcity-solutions",
  },
  {
    icon: "⚡",
    title: "ReNew Power & Activation Area",
    description: "₹2,000 crore solar plant + ready infrastructure hub",
    href: "/about-dholera-sir/renewable-energy-solar-park-in-dholera",
  },
  {
    icon: "🚢",
    title: "Dholera Sea Port",
    description:
      "A planned greenfield port in the Gulf of Khambhat to support Dholera Connectivity.",
    href: "/dholera-sir-blogs/dholera-sea-port-connectivity-growth",
  },
];

const nriBenefits = [
  "Long-term land ownership",
  "Opportunity to build a future home",
  "Investment in a developing smart city",
  "Potential for future appreciation",
  "A long-term family asset in India",
];

const suitableFor = [
  {
    Icon: Globe,
    text: "NRIs looking for long-term property investment",
  },
  {
    Icon: Home,
    text: "Families planning a future home in India",
  },
  {
    Icon: Landmark,
    text: "Investors seeking residential land",
  },
  {
    Icon: Building2,
    text: "Buyers interested in government-planned developments",
  },
  {
    Icon: Users,
    text: "Individuals building long-term wealth through real estate",
  },
];

const faqs = [
  {
    question: "What is Dholera Smart City?",
    answer:
      "Dholera Smart City is India's first Greenfield Smart City, planned with modern infrastructure, industrial development, residential zones, and smart urban planning.",
  },
  {
    question: "Why is Dholera attracting investors?",
    answer:
      "Dholera is attracting investors because of its government-backed development, major infrastructure projects, industrial investments, and long-term growth potential.",
  },
  {
    question: "Can NRIs invest in Dholera?",
    answer:
      "Yes. NRIs can invest in residential plots in Dholera, subject to applicable Indian laws and regulations.",
  },
  {
    question: "Why are residential plots popular in Dholera?",
    answer:
      "Residential plots offer long-term ownership, flexibility for future construction, and the opportunity to invest early in a developing smart city.",
  },
  {
    question: "How does Dholera Insider help NRI investors?",
    answer:
      "Dholera Insider is the exclusive channel partner of BookMyAssets for NRI investors. We help overseas buyers explore verified residential plot projects with transparent documentation, remote buying support, and end-to-end assistance.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function SectionHeading({ children, inverse = false }) {
  return (
    <div className="mb-6 md:mb-6">
      <h2
        className={`text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight tracking-[-0.025em] ${
          inverse ? "text-white" : "text-[#051A3A]"
        }`}
      >
        {children}
      </h2>

      <div className="mt-3 h-1 w-16 rounded-full bg-[#F6C343]" />
    </div>
  );
}

function CheckList({ items, inverse = false }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-xl border px-5 py-4 ${
            inverse
              ? "border-white/10 bg-white/[0.06] text-white"
              : "border-[#051A3A]/10 bg-white text-[#162033] shadow-sm"
          }`}
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-[#F6C343]"
            aria-hidden="true"
          />

          <span className="text-sm font-semibold leading-6">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutDholeraSirPage() {
  return (
    <main className="bg-[#FDFCFA] text-[#162033]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* =========================================
          HERO SECTION
      ========================================== */}
      <section className="overflow-hidden bg-[#051A3A] text-white">
        {/* ======================================
            MOBILE / TABLET
        ======================================= */}
        <div className="lg:hidden">
          {/* Mobile Image */}
          <div className="w-full bg-[#051A3A]">
            <Image
              src={phoneheroImage}
              alt="About Dholera Smart City"
              priority
              sizes="100vw"
              className="
                block
                h-auto
                w-full
                object-contain
              "
            />
          </div>

          {/* Mobile Content */}
          <div
            className="
              px-4
              pb-10
              pt-8
              sm:px-6
              sm:pb-12
              sm:pt-10
            "
          >
            <h1
              className="
                max-w-[390px]
                text-[32px]
                font-bold
                leading-[1.05]
                tracking-[-0.04em]
                sm:max-w-xl
                sm:text-[42px]
              "
            >
              About{" "}
              <span className="text-[#F6C343]">
                Dholera Smart City
              </span>
            </h1>

            <div className="mt-4 h-[3px] w-12 rounded-full bg-[#F6C343]" />

            <p
              className="
                mt-6
                max-w-xl
                text-[15px]
                leading-7
                text-white/80
                sm:text-base
                sm:leading-8
              "
            >
              Dholera Smart City is India’s first Greenfield Smart City, being
              developed with planned infrastructure, industrial zones, and
              residential areas. Major projects like the Ahmedabad Dholera
              Expressway, Dholera International Airport, and Tata Semiconductor
              Plant are driving its future growth.
            </p>

            {/* =====================================
                MOBILE WHATSAPP CTA
                FIXED
            ====================================== */}
            <a
              href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-7
                inline-flex w-fit
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#F6C343]
                px-6
                py-3
                text-sm
                font-bold
                text-[#051A3A]
                transition-all
                duration-300
                hover:bg-white
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              "
            >
              <FaWhatsapp
                aria-hidden="true"
                className="
                  block
                  h-5
                  w-5
                  shrink-0
                  text-[#25D366]
                "
                style={{
                  minWidth: "20px",
                  minHeight: "20px",
                }}
              />

              <span className="whitespace-nowrap">
                Explore Residential Projects
              </span>
            </a>
          </div>
        </div>

        {/* ======================================
            DESKTOP
        ======================================= */}
        <div
          className="
            relative
            hidden
            min-h-[540px]
            overflow-hidden
            lg:block
            xl:min-h-[600px]
          "
        >
          {/* Desktop Image */}
          <Image
            src={heroImage}
            alt="About Dholera Smart City"
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />

          {/* Main overlay */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(90deg,rgba(5,26,58,0.91)_0%,rgba(5,26,58,0.82)_25%,rgba(5,26,58,0.60)_42%,rgba(5,26,58,0.30)_58%,rgba(5,26,58,0.10)_74%,rgba(5,26,58,0.03)_100%)]
            "
          />

          {/* Bottom depth */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              bottom-0
              h-[42%]
              bg-gradient-to-t
              from-[#051A3A]/55
              via-[#051A3A]/20
              to-transparent
            "
          />

          {/* Right balance */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-y-0
              right-0
              w-[38%]
              bg-gradient-to-l
              from-[#051A3A]/[0.06]
              to-transparent
            "
          />

          {/* Desktop Content */}
          <div
            className="relative z-10 mx-auto flex min-h-[540px] w-full max-w-7xl items-center xl:min-h-[600px] site-gutter"
          >
            <div className="max-w-[620px]">
              <h1
                className="
                  text-[54px]
                  font-bold
                  leading-[1.02]
                  tracking-[-0.045em]
                  xl:text-[64px]
                "
              >
                About{" "}
                <span className="text-[#F6C343]">
                  Dholera Smart City
                </span>
              </h1>

              <div className="mt-5 h-[3px] w-14 rounded-full bg-[#F6C343]" />

              <p
                className="
                  mt-7
                  max-w-[590px]
                  text-[17px]
                  leading-8
                  text-white/85
                "
              >
                Dholera Smart City is India’s first Greenfield Smart City,
                being developed with planned infrastructure, industrial zones,
                and residential areas. Major projects like the Ahmedabad
                Dholera Expressway, Dholera International Airport, and Tata
                Semiconductor Plant are driving its future growth.
              </p>

              {/* Desktop WhatsApp CTA */}
              <a
                href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-8
                  inline-flex w-fit
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#F6C343]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-[#051A3A]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                "
              >
                <FaWhatsapp
                  aria-hidden="true"
                  className="
                    block
                    h-5
                    w-5
                    shrink-0
                    text-[#25D366]
                  "
                  style={{
                    minWidth: "20px",
                    minHeight: "20px",
                  }}
                />

                <span className="whitespace-nowrap">
                  Explore Residential Projects
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHY DHOLERA
      ========================================== */}
      <WhyDholera />

      {/* =========================================
          MEGA PROJECTS
      ========================================== */}
      <MegaProjectsSlider />

      {/* =========================================
          NRI BENEFITS
      ========================================== */}
      <section className="bg-[#051A3A] site-gutter section-space">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading inverse>
              Why NRIs Are Considering Dholera
            </SectionHeading>

            <p className="text-base leading-8 text-white/80">
              Many NRIs are exploring Dholera because it combines
              government-backed planning with long-term development potential.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold text-white">
              A residential plot in Dholera offers:
            </h3>

            <CheckList items={nriBenefits} inverse />
          </div>
        </div>
      </section>

      {/* =========================================
          WHY DHOLERA INSIDER
      ========================================== */}
      <section className="overflow-hidden bg-[#EEF2F9] site-gutter section-space">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 sm:text-center lg:mb-9">
            <h2 className="text-left text-[28px] font-semibold leading-[1.15] tracking-[-0.035em] text-[#051A3A] sm:text-center sm:text-3xl lg:text-[38px]">
              Why Invest Through Dholera Insider?
            </h2>

            <div className="mt-3 h-1 w-14 rounded-full bg-[#F6C343] sm:mx-auto" />

            <p className="mt-3 max-w-2xl text-left text-sm leading-6 text-[#657083] sm:mx-auto sm:text-center">
              Dholera Insider helps NRIs invest with confidence by providing:
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-5xl">
            {/* Desktop center line */}
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-1/2 top-5 hidden w-px -translate-x-1/2 bg-[#D8C998] lg:block"
            />

            {/* Mobile line */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-[17px] top-4 w-px bg-[#D8C998] lg:hidden"
            />

            <div className="space-y-2.5 lg:space-y-1.5">
              {insiderBenefits.map((item, index) => {
                const Icon = item.Icon;
                const isLeft = index % 2 === 0;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={item.title}
                    className="relative grid grid-cols-[34px_1fr] items-center gap-3 lg:grid-cols-[1fr_54px_1fr] lg:gap-5"
                  >
                    {/* Number */}
                    <div className="relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E0C97A] bg-[#EEF2F9] text-[10px] font-semibold text-[#B98209] shadow-[0_3px_10px_rgba(5,26,58,0.06)] lg:h-9 lg:w-9">
                        {number}
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className={`
                        group
                        col-start-2
                        row-start-1
                        flex
                        min-h-[70px]
                        items-center
                        gap-3
                        rounded-[14px]
                        border
                        border-[#DCE2EB]
                        bg-white
                        px-4
                        py-3
                        shadow-[0_5px_18px_rgba(5,26,58,0.045)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-[#F6C343]
                        hover:shadow-[0_10px_24px_rgba(5,26,58,0.08)]
                        active:scale-[0.99]
                        lg:min-h-[74px]
                        lg:px-5
                        ${
                          isLeft
                            ? "lg:col-start-1"
                            : "lg:col-start-3 lg:flex-row-reverse"
                        }
                      `}
                    >
                      {/* Icon */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF7DF] text-[#C28A0A] transition-all duration-300 group-hover:bg-[#F6C343] group-hover:text-[#051A3A]">
                        <Icon
                          className="h-[19px] w-[19px]"
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0 flex-1 text-left">
                        <h3 className="text-[13.5px] font-semibold leading-[1.35] tracking-[-0.015em] text-[#051A3A] sm:text-[14px] lg:text-[15px]">
                          {item.title}
                        </h3>

                        <div className="mt-1.5 h-[2px] w-6 rounded-full bg-[#F6C343] transition-all duration-300 group-hover:w-10" />
                      </div>
                    </div>

                    {/* Desktop connector */}
                    <span
                      aria-hidden="true"
                      className={`
                        absolute
                        top-1/2
                        hidden
                        h-px
                        w-6
                        -translate-y-1/2
                        bg-[#D8C375]
                        lg:block
                        ${
                          isLeft
                            ? "left-[calc(50%_-_51px)]"
                            : "right-[calc(50%_-_51px)]"
                        }
                      `}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHO SHOULD CONSIDER DHOLERA
      ========================================== */}
      <section
        className="bg-[#FDFCF8] site-gutter section-space"
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <SectionHeading>
            Who Should Consider Investing in Dholera?
          </SectionHeading>

          {/* Description */}
          <p
            className="
              mb-6
              text-[15px]
              leading-6
              text-[#2B364D]

              sm:mb-8
              sm:text-base
            "
          >
            Dholera may be suitable for:
          </p>

          {/* Cards */}
          <div
            className="
              grid
              gap-3

              sm:grid-cols-2
              sm:gap-5

              lg:grid-cols-5
              lg:gap-6
            "
          >
            {suitableFor.map(({ Icon, text }) => (
              <div
                key={text}
                className="
                  group
                  flex
                  min-h-[82px]
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-[#051A3A]/10
                  bg-white
                  px-4
                  py-4
                  shadow-[0_4px_14px_rgba(5,26,58,0.05)]
                  transition-all
                  duration-300

                  active:scale-[0.99]

                  sm:block
                  sm:min-h-0
                  sm:rounded-2xl
                  sm:p-6
                  sm:shadow-sm

                  lg:hover:-translate-y-1
                  lg:hover:border-[#F6C343]/60
                  lg:hover:shadow-[0_10px_28px_rgba(5,26,58,0.08)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F6C343]/20

                    transition-colors
                    duration-300

                    sm:mb-5
                    sm:h-11
                    sm:w-11

                    lg:group-hover:bg-[#F6C343]/30
                  "
                >
                  <Icon
                    className="
                      h-5
                      w-5
                      text-[#051A3A]

                      sm:h-6
                      sm:w-6
                    "
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <p
                  className="
                    min-w-0
                    flex-1
                    text-[14px]
                    font-semibold
                    leading-[1.45]
                    tracking-[-0.01em]
                    text-[#162033]

                    sm:text-sm
                    sm:leading-6
                  "
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================================
          FINAL CTA
      ========================================== */}
      <section className="relative overflow-hidden bg-[#051A3A] site-gutter section-space">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F6C343]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight text-white">
            Start Your Dholera Investment Journey
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              min-h-12
              w-fit
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#F6C343]
              px-7
              py-3
              text-base
              font-bold
              text-[#051A3A]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              sm:w-fit
            "
          >
            <FaWhatsapp
              aria-hidden="true"
              className="
                block
                h-5
                w-5
                shrink-0
                text-[#25D366]
              "
              style={{
                minWidth: "20px",
                minHeight: "20px",
              }}
            />

            <span>
              Explore Residential Plot Projects
            </span>
          </a>
        </div>
      </section>

      {/* =========================================
          FAQ
      ========================================== */}
      <AboutFaq />
    </main>
  );
}