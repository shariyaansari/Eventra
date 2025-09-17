import React from "react";

export const Terms = () => {
  return (
    // UPDATED: Main page background
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 pt-4">
          {/* UPDATED: Icon wrapper */}
          <div className="inline-block p-3 rounded-lg bg-indigo-50 dark:bg-gray-800 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // UPDATED: Icon color
              className="h-10 w-10 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          {/* UPDATED: Text colors */}
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {/* UPDATED: Underline color */}
          <div className="w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Intro */}
        {/* UPDATED: Card and text styles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-10 border border-gray-100 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Welcome to{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Eventra</span>. By
            accessing or using our platform, you agree to be bound by the
            following terms and conditions that govern your use of our services.
            Please read these Terms of Service carefully before using our
            website and services.
          </p>
        </div>

        {/* Table of Contents for larger screens */}
        {/* UPDATED: Card and text styles */}
        <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-10 border border-gray-100 dark:border-gray-700 sticky top-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Table of Contents
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              // UPDATED: Link colors
              <a
                key={num}
                href={`#section-${num}`}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm flex items-center"
              >
                <span className="mr-2">{num}.</span>
                {num === 1 && "Acceptance of Terms"}
                {num === 2 && "User Responsibilities"}
                {num === 3 && "Intellectual Property"}
                {num === 4 && "Limitation of Liability"}
                {num === 5 && "Changes to Terms"}
                {num === 6 && "Contact Information"}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section
            id="section-1"
            // UPDATED: Section card styles
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">1.</span>
              Acceptance of Terms
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                By accessing or using Eventra, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service and all applicable laws and regulations. If you do not
                agree with any of these terms, you are prohibited from using or
                accessing this platform. These terms apply to all visitors,
                users, and others who access or use the Service.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section
            id="section-2"
            // UPDATED: Section card styles
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">2.</span>
              User Responsibilities
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="mb-3">
                As a user of our platform, you agree to the following
                responsibilities:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-5">
                <li>
                  Provide accurate, current, and complete information during
                  registration and maintain the accuracy of such information
                </li>
                <li>
                  Maintain the security and confidentiality of your account
                  credentials
                </li>
                <li>
                  Accept responsibility for all activities that occur under your
                  account
                </li>
                <li>
                  Not engage in unauthorized use of the platform or interfere
                  with its security features
                </li>
                <li>
                  Comply with all applicable laws and regulations regarding your
                  use of our services
                </li>
                <li>
                  Not use the platform for any illegal or unauthorized purpose
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section
            id="section-3"
            // UPDATED: Section card styles
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">3.</span>
              Intellectual Property
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                The Eventra platform and its original content, features, and
                functionality are and will remain the exclusive property of
                Eventra and its licensors. Our platform is protected by
                copyright, trademark, and other laws of both the United States
                and foreign countries. Our trademarks and trade dress may not be
                used in connection with any product or service without the prior
                written consent of Eventra. You may not copy, distribute, create
                derivative works, or otherwise exploit any content without
                express authorization.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section
            id="section-4"
            // UPDATED: Section card styles
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">4.</span>
              Limitation of Liability
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                In no event shall Eventra, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-5 mt-3">
                <li>
                  Your access to or use of or inability to access or use the
                  Service
                </li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>
                  Any unauthorized access to or use of our servers and/or any
                  personal information stored therein
                </li>
                <li>
                  Any interruption or cessation of transmission to or from the
                  Service
                </li>
                <li>
                  Any bugs, viruses, Trojan horses, or the like that may be
                  transmitted to or through our Service
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section
            id="section-5"
            // UPDATED: Section card styles
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">5.</span>
              Changes to Terms
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will provide at least 30 days' notice prior to any new terms
                taking effect. What constitutes a material change will be
                determined at our sole discretion. By continuing to access or
                use our Service after those revisions become effective, you
                agree to be bound by the revised terms. If you do not agree to
                the new terms, please stop using the Service.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section
            id="section-6"
            // UPDATED: Section card styles
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">6.</span>
              Contact Information
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-5 mt-3">
                <li>
                  Through our contact form on the{" "}
                  {/* UPDATED: Link colors */}
                  <a
                    href="/contact"
                    className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Contact Page
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Acceptance Footer */}
        {/* UPDATED: Footer border and text */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            By using our website, you acknowledge that you have read and
            understood our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
