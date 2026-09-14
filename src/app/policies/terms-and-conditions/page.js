import React from "react";
import { Mail, Phone } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          pb-12
          pt-24

          sm:px-6
          sm:pb-16

          lg:px-8
          lg:pt-28
        "
      >
        {/* =========================================
            PAGE HEADER
        ========================================== */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1
            className="
              text-3xl
              font-bold
              leading-tight
              text-white

              sm:text-4xl
            "
          >
            Terms &amp; Conditions
          </h1>

          <div
            className="
              mt-4
              h-1
              w-24
              rounded-full
              bg-gradient-to-r
              from-[#F6C343]
              to-[#e3ae25]
            "
          />
        </div>

        {/* =========================================
            MAIN CONTENT
        ========================================== */}
        <div
          className="
            mt-10
            space-y-10
            text-left
            text-base
            leading-7
            text-white/90

            sm:mt-12
            sm:text-lg
            sm:leading-8
          "
        >
          {/* Introduction */}
          <p>
            By using or accessing the Dholera Insider website
            (www.dholerainsider.com), you agree to be legally bound by the
            terms and conditions mentioned here. If you do not agree with any
            part of these terms, please do not use our website.
          </p>

          {/* =========================================
              INTELLECTUAL PROPERTY
          ========================================== */}
          <section>
            <h2
              className="
                text-xl
                font-bold
                text-white

                sm:text-2xl
              "
            >
              Intellectual Property
            </h2>

            <p className="mt-4">
              All the content on this website, including text, images,
              graphics, logos, data, software, and other materials, is the
              intellectual property of Dholera Insider or its content suppliers
              and is protected under applicable copyright and trademark laws.
              You may use the content only for personal, non-commercial
              purposes. You are not permitted to copy, modify, reproduce,
              republish, upload, transmit, or distribute any part of this
              website without prior written permission from Dholera Insider.
            </p>
          </section>

          {/* =========================================
              DISCLAIMER
          ========================================== */}
          <section>
            <h2
              className="
                text-xl
                font-bold
                text-white

                sm:text-2xl
              "
            >
              Disclaimer
            </h2>

            <p className="mt-4">
              The content on this website is provided "as is" without
              warranties of any kind, either express or implied. While we
              strive to provide accurate and updated information, Dholera
              Insider makes no guarantees regarding the completeness,
              accuracy, reliability, or availability of any content on the
              site. We may update, remove, or change any part of the content at
              any time without notice.
            </p>
          </section>

          {/* =========================================
              THIRD-PARTY LINKS
          ========================================== */}
          <section>
            <h2
              className="
                text-xl
                font-bold
                text-white

                sm:text-2xl
              "
            >
              Third-Party Links
            </h2>

            <p className="mt-4">
              Dholera Insider is not responsible for any third-party links or
              websites mentioned on our site. These links are provided only for
              convenience and do not imply endorsement. Accessing third-party
              content is at your own risk.
            </p>
          </section>

          {/* =========================================
              MODIFICATIONS
          ========================================== */}
          <section>
            <h2
              className="
                text-xl
                font-bold
                text-white

                sm:text-2xl
              "
            >
              Modifications
            </h2>

            <p className="mt-4">
              We reserve the right to modify these Terms &amp; Conditions at
              any time. It is your responsibility to review this page regularly
              to stay informed of any changes. Continued use of the website
              after changes have been posted will be deemed acceptance of those
              updates.
            </p>
          </section>

          {/* =========================================
              GOVERNING LAW
          ========================================== */}
          <section>
            <h2
              className="
                text-xl
                font-bold
                text-white

                sm:text-2xl
              "
            >
              Governing Law
            </h2>

            <p className="mt-4">
              These terms and conditions are governed by and interpreted in
              accordance with the laws of India. Any disputes arising in
              relation to this website shall fall under the jurisdiction of the
              courts of [Insert City/State, e.g., Ahmedabad, Gujarat].
            </p>
          </section>

          {/* =========================================
              CONTACT US
          ========================================== */}
          <section>
            <h2
              className="
                text-xl
                font-bold
                text-white

                sm:text-2xl
              "
            >
              Contact Us
            </h2>

            <p className="mt-4">
              If you have any questions or concerns regarding these Terms &amp;
              Conditions, feel free to contact us at:
            </p>

            {/* Contact Details */}
            <div className="mt-5 flex flex-col items-start gap-3">
              {/* Email */}
              <a
                href="mailto:info@dholerainsider.com"
                className="
                  inline-flex
                  items-center
                  gap-3
                  text-white/90
                  transition-colors
                  duration-200

                  hover:text-[#F6C343]
                "
              >
                <Mail
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-[#F6C343]
                  "
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>info@dholerainsider.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919211820887"
                className="
                  inline-flex
                  items-center
                  gap-3
                  text-white/90
                  transition-colors
                  duration-200

                  hover:text-[#F6C343]
                "
              >
                <Phone
                  className="
                    h-5
                    w-5
                    shrink-0
                    text-[#F6C343]
                  "
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>+91 9211820887</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}