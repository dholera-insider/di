import React from "react";

export default function Copyright() {
  return (
    <div className="w-full bg-gray-900">
      <div className="max-w-7xl mx-auto min-h-screen pt-12">
        <div className="text-white">
          <div className="relative">
            <div className="flex flex-col justify-center items-center mt-20">
              <h1 className="text-4xl text-white font-bold text-center z-20 relative mt-16 drop-shadow-lg">
                Refund & Cancellation Policy
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="mt-10 text-lg space-y-5 pb-8 max-sm:mr-4 max-sm:ml-4">
            <p>
              At Dholera Insider, we are committed to ensuring transparency and
              clarity in all transactions. Customers who wish to cancel their
              booking may apply for a refund within 30 days from the date of
              booking. Once the refund is initiated, the amount will be credited
              back to the original payment method within 7 working days. (Note:
              Timelines are subject to change without prior notice.)
            </p>

            <p>
              The booking amount is ₹50,000, which may be revised at the sole
              discretion of the company without any advance intimation.
            </p>

            <p>
              Plot pricing, applicable charges, and other associated fees are
              subject to change without prior notice, based on market conditions
              and company policies.
            </p>
            <div className="flex flex-col justify-center items-center mt-20">
              <p className="md:text-9xl text-5xl text-teal-300 opacity-10 font-black text-center z-0 absolute left-0 w-full">
                Refund & Cancellation Policy
              </p>
            </div>
            <div>
              <p className="mt-4">
                Maintenance charges, once paid, are strictly non-refundable.
              </p>
            </div>

            <div>
              <p className="mt-4">
                If applicable, a Preferred Location Charge (PLC) will be added
                to the total cost of the plot as per the chosen location.
              </p>
            </div>

            <div>
              <p className="mt-4">
                All buyers are required to complete 100% payment within 30 days
                from the date of booking. Failure to do so may result in
                cancellation of the allotment at the company's discretion.
              </p>
            </div>

            <div>
              <p className="mt-4">
                Stamp duty will be levied as per the Government of Gujarat’s
                prevailing rates:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>4.90% for female buyers</li>
                <li>5.90% for male buyers</li>
              </ul>
            </div>

            <div>
              <p className="mt-4">
                These rates are calculated on the total sale value and may be revised by the government at any time.

              </p>
            </div>

            <div>
              <p className="mt-4">
                Additionally, Goods and Services Tax (GST) will be applied as per current government regulations.

              </p>
              <p className="mt-4">
                Legal fees will be charged to cover documentation and property registration processes. These are mandatory and non-negotiable.


              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold max-sm:text-center mt-8">
                Contact Us
              </h2>
              <p className="mt-4">
                For any questions, clarifications, or support regarding refunds and cancellations, please contact us atRefund & Cancellation Policy
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
