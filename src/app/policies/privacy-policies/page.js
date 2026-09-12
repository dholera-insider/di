import React from "react";
import { Phone, Mail } from "lucide-react";

export default function Copyright() {
  return (
    <div className="relative w-full bg-gray-900">
      <div className="mx-auto min-h-screen max-w-7xl pt-12">
        <div className="text-white">
          {/* =========================
              PAGE HEADING
          ========================== */}
          <div className="relative">
            <div className="mt-20 flex flex-col items-center justify-center">
              <p className="relative z-20 text-center text-4xl font-bold text-white drop-shadow-lg">
                Privacy Policy
              </p>

              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#F6C343] to-[#e3ae25]" />
            </div>
          </div>



          {/* =========================
              PRIVACY CONTENT
          ========================== */}
          <div className="mt-10 space-y-5 pb-8 text-lg max-sm:mx-4">
            <p>
              The terms of the Dholera Insider Policy (User Agreement) apply to
              this Privacy Statement. When a user registers with Dholera Insider
              by completing the registration form and accepting the terms and
              conditions, a formal agreement is entered into between the user
              and Dholera Insider.
            </p>

            <p>
              By providing your personal details and using our platform, you
              consent to the collection, use, and disclosure of your information
              in accordance with this privacy policy. This policy explains how
              we collect and use personal and other information that we obtain
              through our website.
            </p>

            <p>
              Dholera Insider ensures the privacy of the information you provide
              to us and does not share, sell, or distribute your information to
              any third party, except as required to provide you with services
              or as mandated by law.
            </p>

            {/* =========================
                INFORMATION WE COLLECT
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                Information We Collect
              </h2>

              <p className="mt-4">
                We may collect personally identifiable information such as your
                name, contact number, email address, and city when you:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Submit an inquiry</li>
                <li>Sign up for newsletters</li>
                <li>Book a consultation or request property details</li>
              </ul>
            </div>

            {/* =========================
                HOW WE USE INFORMATION
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                How We Use Your Information
              </h2>

              <p className="mt-4">This information is used to:</p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  Provide services and updates relevant to Dholera SIR and real
                  estate
                </li>
                <li>Respond to user queries</li>
                <li>Improve user experience on the website</li>
                <li>Send marketing communications, if you have opted in</li>
              </ul>
            </div>

            {/* =========================
                TECHNICAL INFORMATION
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                Technical Information
              </h2>

              <p className="mt-4">
                Dholera Insider may also collect technical information such as
                your IP address, browser type, device ID, and usage patterns to
                help us improve the performance and content of our website.
                Cookies may be used to collect data for analytics and
                optimization. You can modify your browser settings to control
                cookie preferences.
              </p>
            </div>

            {/* =========================
                DATA SECURITY
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                Data Security
              </h2>

              <p className="mt-4">
                All information provided by you is stored on secure servers and
                accessed only by authorized personnel. We are committed to
                safeguarding your information; however, data transmission over
                the Internet is not fully secure and we cannot guarantee
                complete protection.
              </p>
            </div>

            {/* =========================
                EXTERNAL LINKS
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                External Links
              </h2>

              <p className="mt-4">
                This website may contain links to external websites or
                third-party services. We are not responsible for their privacy
                practices and recommend reviewing their respective privacy
                policies.
              </p>
            </div>

            {/* =========================
                POLICY UPDATES
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                Policy Updates
              </h2>

              <p className="mt-4">
                We reserve the right to update this policy at any time without
                notice. Changes will be reflected on this page. Continued use of
                the site indicates acceptance of any such changes.
              </p>
            </div>

            {/* =========================
                CONTACT US
            ========================== */}
            <div>
              <h2 className="mt-8 text-2xl font-bold max-sm:text-center">
                Contact Us
              </h2>

              <p className="mt-4">
                If you have any questions or concerns regarding this privacy
                policy or our data handling practices, feel free to contact us
                at:
              </p>

              <div className="mt-4 space-y-3">
                <a
                  href="mailto:info@dholerainsider.com"
                  className="flex items-center gap-2 transition-colors hover:text-[#F6C343]"
                >
                  <Mail
                    className="h-5 w-5 shrink-0 text-[#F6C343]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>info@dholerainsider.com</span>
                </a>

                <a
                  href="tel:+919211820887"
                  className="flex items-center gap-2 transition-colors hover:text-[#F6C343]"
                >
                  <Phone
                    className="h-5 w-5 shrink-0 text-[#F6C343]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>+91 9211820887</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}