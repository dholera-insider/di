import React from "react";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  MessageCircle,
  PhoneCall,
  ScrollText,
} from "lucide-react";

const steps = [
  {
    label: "Speak With RM",
    Icon: PhoneCall,
  },
  {
    label: "Explore Projects",
    Icon: Building2,
  },
  {
    label: "Review Documents",
    Icon: FileCheck2,
  },
  {
    label: "Book Your Plot",
    Icon: CheckCircle2,
  },
  {
    label: "Complete Payment",
    Icon: CreditCard,
  },
  {
    label: "Get Registry",
    Icon: ScrollText,
  },
];

export default function RemoteBuying() {
  return (
    <section
      aria-labelledby="remote-buying-heading"
      className="
        relative
        overflow-hidden
        bg-[#EEF2F9]
        px-4
        py-14
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2
            id="remote-buying-heading"
            className="
              text-[clamp(2rem,4vw,2.8rem)]
              font-bold
              leading-[1.15]
              tracking-tight
              text-[#051A3A]
            "
          >
            Buy Your Dholera Plot from Anywhere
          </h2>

          <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-[#F6C343]" />
        </div>

        {/* Desktop / Tablet */}
        <div className="hidden md:block">
          <div
            className="
              relative
              rounded-3xl
              border
              border-[#051A3A]/10
              bg-white
              px-6
              py-10
              shadow-[0_10px_35px_rgba(5,26,58,0.06)]
              lg:px-8
              lg:py-12
            "
          >
            {/* Connecting Line */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-[8%]
                right-[8%]
                top-[84px]
                h-px
                bg-[#051A3A]/15
              "
            />

            <div
              className="
                relative
                grid
                grid-cols-3
                gap-x-6
                gap-y-10
                lg:grid-cols-6
                lg:gap-5
              "
            >
              {steps.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="
                    group
                    relative
                    flex
                    min-w-0
                    flex-col
                    items-center
                    text-center
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-[72px]
                      w-[72px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#F6C343]/45
                      bg-[#FFF9E7]
                      text-[#B6880B]
                      ring-[8px]
                      ring-white
                      transition-all
                      duration-300
                      group-hover:border-[#F6C343]
                      group-hover:bg-[#F6C343]
                      group-hover:text-[#051A3A]
                      motion-safe:group-hover:-translate-y-1
                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7"
                      strokeWidth={1.7}
                    />
                  </div>

                  {/* Label */}
                  <h3
                    className="
                      mt-5
                      text-[16px]
                      font-bold
                      leading-6
                      text-[#051A3A]
                      lg:text-[17px]
                    "
                  >
                    {label}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="relative md:hidden">
          {/* Vertical Connecting Line */}
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-7
              left-[26px]
              top-7
              w-px
              bg-[#051A3A]/15
            "
          />

          <div className="space-y-4">
            {steps.map(({ label, Icon }) => (
              <div
                key={label}
                className="
                  relative
                  flex
                  items-center
                  gap-4
                "
              >
                {/* Icon Node */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-[54px]
                    w-[54px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#F6C343]/45
                    bg-[#FFF9E7]
                    text-[#B6880B]
                    shadow-sm
                  "
                >
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6"
                    strokeWidth={1.7}
                  />
                </div>

                {/* Mobile Card */}
                <div
                  className="
                    flex
                    min-h-[64px]
                    min-w-0
                    flex-1
                    items-center
                    rounded-2xl
                    border
                    border-[#051A3A]/10
                    bg-white
                    px-5
                    py-4
                    shadow-[0_5px_18px_rgba(5,26,58,0.05)]
                  "
                >
                  <h3
                    className="
                      text-[16px]
                      font-bold
                      leading-6
                      text-[#051A3A]
                    "
                  >
                    {label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="
            mt-9
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:mt-10
          "
        >
          <a
            href="https://wa.me/919211820887?text=Hello%2C%20I%20am%20interested%20in%20buying%20a%20plot%20in%20Dholera.%20Please%20share%20the%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              min-h-[54px]
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-[#051A3A]
              px-7
              py-3.5
              text-[16px]
              font-bold
              text-[#FDFCFA]
              shadow-[0_8px_22px_rgba(5,26,58,0.16)]
              transition-all
              duration-300
              hover:bg-[#F6C343]
              hover:text-[#051A3A]
              hover:shadow-[0_10px_26px_rgba(5,26,58,0.18)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#F6C343]
              focus-visible:ring-offset-2
              motion-safe:hover:-translate-y-0.5
              motion-reduce:transform-none
              motion-reduce:transition-none
              sm:w-auto
              sm:min-w-[190px]
            "
          >
            {/* <MessageCircle
              aria-hidden="true"
              className="h-5 w-5"
              strokeWidth={2}
            /> */}
            Connect with RM
          </a>
        </div>
      </div>
    </section>
  );
}
