// src/containers/PrivacyPage.jsx
import React from "react";

const PrivacyPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        BlueJag Privacy Notice
      </h1>
      <p className="mb-4 text-gray-300">Last updated: 8 Nov 2025</p>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">1. Scope of this notice</h2>
        <p className="text-gray-300 mb-1">
          This privacy notice applies to you if you interact with BlueJag
          through our website, including:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>Purchasing products from our website</li>
          <li>Signing up for newsletters or marketing emails</li>
          <li>Participating in promotions or competitions</li>
          <li>Interacting with us on social media</li>
          <li>Submitting inquiries via our contact forms</li>
        </ul>
        <p className="text-gray-300">
          It explains how we collect, use, store, and protect your personal
          information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">
          2. Information we collect
        </h2>
        <p className="text-gray-300 mb-1">
          We may collect personal information including:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>Name, email, phone number, and delivery address</li>
          <li>Payment information for processing orders</li>
          <li>
            Interaction data such as browsing behavior, clicks, and page visits
          </li>
          <li>Marketing preferences</li>
        </ul>
        <p className="text-gray-300">
          We do not collect more information than necessary to provide our
          services or improve your experience.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">
          3. How we use your information
        </h2>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>To process and fulfill orders</li>
          <li>
            To communicate about your account, orders, or support requests
          </li>
          <li>
            To send marketing and promotional communications if you have opted
            in
          </li>
          <li>To improve our website, products, and services</li>
          <li>To detect and prevent fraud or unauthorized activity</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">
          4. Sharing your information
        </h2>
        <p className="text-gray-300 mb-1">
          We may share your information with:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>Payment processors to complete transactions</li>
          <li>Delivery services to fulfill orders</li>
          <li>Marketing and analytics providers to improve our services</li>
          <li>Law enforcement or regulators if required by law</li>
        </ul>
        <p className="text-gray-300">
          We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">5. Cookies and tracking</h2>
        <p className="text-gray-300 mb-1">
          Our website uses cookies and pixels to improve user experience, track
          website performance, and show relevant advertisements. You can manage
          cookies in your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">6. Your rights</h2>
        <p className="text-gray-300 mb-1">
          Depending on your jurisdiction, you may have rights to:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-2">
          <li>Access your personal data</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Object to processing of your data in certain situations</li>
        </ul>
        <p className="text-gray-300">
          To exercise these rights, please contact us at{" "}
          <a
            href="mailto:support@bluejag.com"
            className="text-blue-600 underline"
          >
            support@bluejag.com
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">7. Data security</h2>
        <p className="text-gray-300">
          We implement appropriate technical and organizational measures to
          protect your personal information from unauthorized access,
          alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">
          8. Changes to this privacy notice
        </h2>
        <p className="text-gray-300">
          We may update this notice from time to time. The most recent version
          will always be available on our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold text-lg mb-2">9. Contact</h2>
        <p className="text-gray-300">
          If you have questions or concerns about this Privacy Notice, contact
          us at{" "}
          <a
            href="mailto:support@bluejag.com"
            className="text-blue-600 underline"
          >
            support@bluejag.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
