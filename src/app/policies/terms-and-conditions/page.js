import React from "react";
import { Mail, Phone } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
        <header className="mb-8 flex flex-col items-center text-center sm:mb-10 lg:mb-12">
          <h1 className="m-0 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Terms &amp; Conditions
          </h1>

          <div
            aria-hidden="true"
            className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#F6C343] to-[#e3ae25]"
          />
        </header>

        <div className="space-y-8 text-base leading-relaxed text-gray-200 sm:text-lg">
          <p>
            By using or accessing the Dholera Insider website
            (www.dholerainsider.com), you agree to be legally bound by the
            terms and conditions mentioned here. If you do not agree with any
            part of these terms, please do not use our website.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Intellectual Property
            </h2>
            <p className="mt-4">
              All the content on this website, including text, images,
              graphics, logos, data, software, and other materials, is the
              intellectual property of Dholera Insider or its content
              suppliers and is protected under applicable copyright and
              trademark laws. You may use the content only for personal,
              non-commercial purposes. You are not permitted to copy, modify,
              reproduce, republish, upload, transmit, or distribute any part
              of this website without prior written permission from Dholera
              Insider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Disclaimer
            </h2>
            <p className="mt-4">
              The content on this website is provided &quot;as is&quot; without
              warranties of any kind, either express or implied. While we
              strive to provide accurate and updated information, Dholera
              Insider makes no guarantees regarding the completeness,
              accuracy, reliability, or availability of any content on the
              site. We may update, remove, or change any part of the content
              at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Third-Party Links
            </h2>
            <p className="mt-4">
              Dholera Insider is not responsible for any third-party links or
              websites mentioned on our site. These links are provided only
              for convenience and do not imply endorsement. Accessing
              third-party content is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Modifications
            </h2>
            <p className="mt-4">
              We reserve the right to modify these Terms &amp; Conditions at
              any time. It is your responsibility to review this page
              regularly to stay informed of any changes. Continued use of the
              website after changes have been posted will be deemed acceptance
              of those updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Governing Law
            </h2>
            <p className="mt-4">
              These terms and conditions are governed by and interpreted in
              accordance with the laws of India. Any disputes arising in
              relation to this website shall fall under the jurisdiction of
              the courts of [Insert City/State, e.g., Ahmedabad, Gujarat].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions or concerns regarding this privacy
              policy or our data handling practices, feel free to contact us
              at:
            </p>

            <div className="mt-4 flex flex-col items-start gap-3">
              <a
                href="mailto:info@dholerainsider.com"
                className="inline-flex max-w-full items-center gap-3 rounded-sm transition-colors hover:text-[#F6C343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C343]"
              >
                <Mail
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[#F6C343]"
                  strokeWidth={1.8}
                />
                <span className="min-w-0 break-words">
                  info@dholerainsider.com
                </span>
              </a>

              <a
                href="tel:+919211820887"
                className="inline-flex items-center gap-3 rounded-sm transition-colors hover:text-[#F6C343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C343]"
              >
                <Phone
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[#F6C343]"
                  strokeWidth={1.8}
                />
                <span>+91 9211820887</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}