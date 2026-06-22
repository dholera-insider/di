import React from "react";

export default function Copyright() {
  return (
    <div className="w-full bg-gray-900">
      <div className="max-w-7xl mx-auto min-h-screen pt-12">
        <div className="text-white">
          <div className="relative">
            <div className="flex flex-col justify-center items-center mt-20">
              <p className="text-4xl text-white font-bold text-center z-20 relative mt-16 drop-shadow-lg">
                Copyright Policy
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="mt-10 text-lg space-y-5 pb-8 max-sm:mr-4 max-sm:ml-4">
            <p>
              Dholera Insider, its users, and its content suppliers are the
              exclusive owners of the text, graphics, logos, button icons,
              pictures, clips, digital downloads, data compilations, and
              software included in our Services. All of this content is
              protected by copyright laws. Dholera Insider owns all the software
              utilized on this website. The owners of all other trademarks not
              owned by Dholera Insider that appear on this website may or may
              not be related to, connected to, or supported by Dholera Insider
              or its affiliates.
            </p>

            <p>
              Any copyrighted content, trademarks, or other proprietary
              information must not be posted, distributed, or reproduced in any
              way without the owner’s express written authorization. Without
              limiting the aforementioned, if you believe that your work has
              been duplicated and uploaded on the Dholera Insider site in a way
              that violates your copyright, kindly provide the following
              information to our copyright agent:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Submit an inquiry</li>
              <li>Sign up for newsletters</li>
              <li>Book a consultation or request property details</li>
            </ul>

            <div className="flex flex-col justify-center items-center mt-20">
              <p className="md:text-9xl text-4xl text-teal-300 opacity-10 font-black text-center z-0 absolute left-0 w-full">
                Copyright Policy
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                How We Use Your Information
              </h2>
              <p className="mt-4">
                A written declaration from you stating that you firmly believe
                the disputed use is not permitted by law, the copyright owner,
                or their agent.
              </p>
              <p className="mt-4">
                A declaration from you, given under oath, that the information
                in your notice is true and that you are the copyright owner or
                have the right to speak on their behalf.
              </p>
              <p className="mt-4">
                You can write to the Dholera Insider Agent at the address listed
                under the Contact Us section of the website to notify them of
                copyright infringement allegations.
              </p>
              <p className="mt-4">
                Copyright, intellectual property laws, and other jurisdictions
                protect the Site’s content, structure, “look and feel,” and all
                other features. Without our express written authorization, you
                are not permitted to sell, license, distribute, copy, publish,
                publicly perform, display, alter, adapt, translate, or create
                derivative works from the Site or any portion of the Site. All
                rights that aren’t given explicitly in this Agreement are
                reserved by us. Furthermore, you agree that we will vigorously
                and legally protect our intellectual property rights with regard
                to the Site.
              </p>
              <p className="mt-4">
                If information or materials contained on Dholera Insider are
                submitted or used without authorization, it will constitute a
                violation of copyright laws, privacy laws, trademark laws,
                publicity laws, and related communications statutes and
                regulations. You are solely accountable for any activities taken
                using your username, password, or otherwise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Contact Us
              </h2>
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
