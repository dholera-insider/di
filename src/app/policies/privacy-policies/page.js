import React from "react";

export default function Copyright() {
  return (
    <div className="w-full bg-gray-900">
      <div className="max-w-7xl mx-auto min-h-screen pt-12">
        <div className="text-white">
          <div className="relative">
            <div className="flex flex-col justify-center items-center mt-20">
              <p className="text-4xl text-white font-bold text-center z-20 relative mt-16 drop-shadow-lg">
                Privacy Policy
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="mt-10 text-lg space-y-5 pb-8 max-sm:mr-4 max-sm:ml-4">
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
            <div className="flex flex-col justify-center items-center mt-20">
              <p className="md:text-9xl text-4xl text-teal-300 opacity-10 font-black text-center z-0 absolute left-0 w-full">
                Privacy Policy
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Information We Collect
              </h2>
              <p className="mt-4">
                We may collect personally identifiable information such as your
                name, contact number, email address, and city when you:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Submit an inquiry</li>
                <li>Sign up for newsletters</li>
                <li>Book a consultation or request property details</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                How We Use Your Information
              </h2>
              <p className="mt-4">This information is used to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>
                  Provide services and updates relevant to Dholera SIR and real
                  estate
                </li>
                <li>Respond to user queries</li>
                <li>Improve user experience on the website</li>
                <li>Send marketing communications, if you have opted in</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
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

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
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

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                External Links
              </h2>
              <p className="mt-4">
                This website may contain links to external websites or
                third-party services. We are not responsible for their privacy
                practices and recommend reviewing their respective privacy
                policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Policy Updates
              </h2>
              <p className="mt-4">
                We reserve the right to update this policy at any time without
                notice. Changes will be reflected on this page. Continued use of
                the site indicates acceptance of any such changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Contact Us
              </h2>
              <p className="mt-4">
                If you have any questions or concerns regarding this privacy
                policy or our data handling practices, feel free to contact us
                at:
              </p>
              <div className="mt-4 space-y-2">
                <a href="mailto:info@dholerainsider.com">📧 info@dholerainsider.com</a>
                <br/>
                <a href="tel:+919211820887">📞 +91 9211820887</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
