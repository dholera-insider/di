import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Cpu,
  Home,
  Landmark,
  Plane,
} from "lucide-react";

const highlights = [
  {
    title: "India's First Greenfield Smart City",
    description: "Greenfield smart city planning built for long term development.",
    Icon: Landmark,
  },
  {
    title: "Tata Semiconductor Project",
    description: "A major industrial project strengthening Dholera's ecosystem.",
    Icon: Cpu,
  },
  {
    title: "Strong Multi Modal Connectivity",
    description: "Airport, expressway, rail and DFC connectivity around Dholera.",
    Icon: Plane,
  },
  {
    title: "Government Planned Development",
    description: "Planned infrastructure and development supporting future growth.",
    Icon: Building2,
  },
  {
    title: "Future Residential Growth",
    description: "Long term residential potential as Dholera continues to develop.",
    Icon: Home,
  },
];

export default function WhyDholera() {
  return (
    <section
      aria-labelledby="why-dholera-heading"
      className="
        relative
        overflow-hidden
        bg-[#FDFCFA]
        px-4
        py-14
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
      "
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2
            id="why-dholera-heading"
            className="
              text-[clamp(2rem,4vw,3rem)]
              font-bold
              leading-[1.15]
              tracking-tight
              text-[#051A3A]
            "
          >
            Why Invest in Dholera?
          </h2>
          <div className="mx-auto mt-5 h-[3px] w-14 rounded-full bg-[#F6C343]" />

        </div>

        {/* Investment Highlights */}
        <ul
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            xl:grid-cols-5
          "
        >
          {highlights.map(({ title, description, Icon }) => (
            <li
              key={title}
              className="
                group
                relative
                flex
                items-start
                gap-4
                overflow-hidden
                rounded-2xl
                border
                border-[#051A3A]/10
                bg-white
                p-5
                shadow-[0_5px_20px_rgba(5,26,58,0.05)]
                transition-[border-color,box-shadow,transform]
                duration-300
                motion-safe:hover:-translate-y-1
                hover:border-[#F6C343]/70
                hover:shadow-[0_12px_30px_rgba(5,26,58,0.10)]
                motion-reduce:transform-none
                motion-reduce:transition-none

                sm:min-h-[205px]
                sm:flex-col
                sm:p-6
              "
            >
              {/* Gold top detail */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-0
                  h-[3px]
                  w-0
                  bg-[#F6C343]
                  transition-all
                  duration-300
                  motion-safe:group-hover:w-full
                  motion-reduce:transition-none
                "
              />

              {/* Icon */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#F6C343]/30
                  bg-[#FFF8DF]
                  text-[#C99C18]

                  sm:h-14
                  sm:w-14
                "
              >
                <Icon
                  aria-hidden="true"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  strokeWidth={1.7}
                />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h3
                  className="
                    text-[17px]
                    font-bold
                    leading-6
                    text-[#051A3A]
                    sm:text-lg
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[15px]
                    leading-6
                    text-[#5B6475]
                    sm:text-base
                  "
                >
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      

        {/* CTA */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/about-dholera-sir"
            className="
              group
              inline-flex
              min-h-[52px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#051A3A]
              px-7
              py-3
              text-base
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(5,26,58,0.16)]
              transition-[background-color,color,box-shadow,transform]
              duration-300

              hover:bg-[#F6C343]
              hover:text-[#051A3A]
              hover:shadow-[0_10px_25px_rgba(5,26,58,0.18)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#F6C343]
              focus-visible:ring-offset-2

              motion-safe:hover:-translate-y-0.5
              motion-reduce:transform-none
              motion-reduce:transition-none

              sm:w-auto
            "
          >
            About Dholera

            <ArrowRight
              aria-hidden="true"
              className="
                h-5
                w-5
                transition-transform
                duration-300
                motion-safe:group-hover:translate-x-1
                motion-reduce:transition-none
              "
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
