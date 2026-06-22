import React from "react";

export default function TermsConditions() {
  return (
    <div className="w-full bg-gray-900">
      <div className="max-w-7xl mx-auto min-h-screen pt-12">
        <div className="text-white">
          <div className="relative">
            <div className="flex flex-col justify-center items-center mt-20">
              <p className="text-4xl text-white font-bold text-center z-20 relative mt-16 drop-shadow-lg">
                Terms & Conditions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="mt-10 text-lg space-y-5 pb-8 max-sm:mr-4 max-sm:ml-4">
            <div className="flex flex-col justify-center items-center mt-20">
              <h1 className="md:text-9xl text-4xl text-teal-300 opacity-10 font-black text-center z-0 absolute left-0 w-full">
                Terms & Conditions
              </h1>
            </div>

            <p>
              By using or accessing the Dholera Insider website
              (www.dholerainsider.com), you agree to be legally bound by the
              terms and conditions mentioned here. If you do not agree with any
              part of these terms, please do not use our website.
            </p>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
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
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Disclaimer
              </h2>
              <p className="mt-4">
                The content on this website is provided "as is" without
                warranties of any kind, either express or implied. While we
                strive to provide accurate and updated information, Dholera
                Insider makes no guarantees regarding the completeness,
                accuracy, reliability, or availability of any content on the
                site. We may update, remove, or change any part of the content
                at any time without notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Third-Party Links
              </h2>
              <p className="mt-4">
                Dholera Insider is not responsible for any third-party links or
                websites mentioned on our site. These links are provided only
                for convenience and do not imply endorsement. Accessing
                third-party content is at your own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Modifications
              </h2>
              <p className="mt-4">
                We reserve the right to modify these Terms & Conditions at any
                time. It is your responsibility to review this page regularly to
                stay informed of any changes. Continued use of the website after
                changes have been posted will be deemed acceptance of those
                updates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Governing Law
              </h2>
              <p className="mt-4">
                These terms and conditions are governed by and interpreted in
                accordance with the laws of India. Any disputes arising in
                relation to this website shall fall under the jurisdiction of
                the courts of [Insert City/State, e.g., Ahmedabad, Gujarat].
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
                <a href="mailto:info@dholerainsider.com">
                  📧 info@dholerainsider.com
                </a>
                <br />
                <a href="tel:+919211820887">📞 +91 9211820887</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
