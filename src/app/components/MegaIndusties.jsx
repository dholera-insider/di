import React from "react";
import Avaada from "@/app/assets/home/Avaada.webp";
import Chiripal from "@/app/assets/home/Chiripal.webp";
import Dawat from "@/app/assets/home/Dawat.webp";
import HP from "@/app/assets/home/HP.webp";
import Polycab from "@/app/assets/home/Polyacab.webp";
import Renew from "@/app/assets/home/Renew.webp";
import TATA from "@/app/assets/home/TATA chemical.webp";
import Torrent from "@/app/assets/home/Torrent.webp";
import Vedanta from "@/app/assets/home/Vedanta.webp";
import Image from "next/image";
import bg from "@/app/assets/home/pexels2.jpg";
import Cubic from "@/app/assets/home/Cubic.webp";

export default function MegaIndustries() {
  const companies = [
    { name: "Avaada", logo: Avaada },
    { name: "Chiripal", logo: Chiripal },
    { name: "Cubic", logo: Cubic },
    { name: "Dawat", logo: Dawat },
    { name: "HP", logo: HP },
    { name: "Polycab", logo: Polycab },
    { name: "Renew", logo: Renew },
    { name: "TATA Chemicals", logo: TATA },
    { name: "Torrent", logo: Torrent },
    { name: "Vedanta", logo: Vedanta },
  ];

  // Duplicate the array to create seamless looping
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          width: max-content;
        }
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
      `}</style>
      <div className="relative">

      <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10 opacity-30"
        />
      <div className=" max-w-7xl mx-auto pt-12">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-gray-800">
            Mega Industries Investment in Dholera SIR
          </h3>
          <div className="w-24 h-1 mt-4 bg-yellow-600 mx-auto"></div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <p className="text-lg leading-relaxed">
            <span className="font-semibold">
              Dholera is fast emerging as India's industrial powerhouse.
            </span>{" "}
            With giants like{" "}
            <span className="font-semibold">
              Tata, Vedanta-Foxconn, Renew Power
            </span>{" "}
            &amp; many more investing in land and infrastructure, the region is
            poised to become a{" "}
            <span className="font-semibold">
              global manufacturing and semiconductor hub 
            </span>
           {/*  <span className="text-blue-600">
              <a href="/DholeraSIR/mega-industries"> Read More</a>
            </span> */}
          </p>
        </div>

        <div className="marquee-container py-8">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {duplicatedCompanies.map((company, index) => (
              <div
              key={index}
              className="mx-8 flex-shrink-0 flex items-center justify-center"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={160}
                  height={80}
                  className="object-contain h-44 "
                  />
              </div>
            ))}
          </div>
        </div>
      </div>
            </div>
    </>
  );
}