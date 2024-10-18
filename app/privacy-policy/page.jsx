import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="max-w-4xl px-4 mx-auto my-8">
      <main className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Privacy Policy</h2>
        <p className="mb-6 text-sm text-gray-500">Last updated: October 22, 2022</p>
        <p className="mb-6">
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
          information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Collecting Data</h2>
        <h3 className="mb-2 text-lg italic font-semibold">Personal Data</h3>
        <p className="mb-4">
          While using Our Service, We may ask You to provide Us with certain personally identifiable information that can
          be used to contact or identify You. Personally identifiable information may include, but is not limited to:
        </p>
        <ul className="pl-6 mb-6 space-y-2 list-disc">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Usage Data</li>
        </ul>

        <h3 className="mb-2 text-lg italic font-semibold">Cookies</h3>
        <p className="mb-4">
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or
          mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
        </p>
        <ul className="pl-6 mb-6 space-y-2 list-disc">
          <li>
            <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
            <p className="text-sm text-gray-600">Type: Persistent Cookies</p>
            <p className="text-sm text-gray-600">Administered by: Us</p>
            <p className="text-sm text-gray-600">Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
          </li>
        </ul>
        <p className="mb-6">
          For more information about the cookies we use and your choices regarding cookies, please visit our Cookies
          Policy or the Cookies section of our Privacy Policy.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Use of Your Personal Data</h2>
        <p className="mb-4">The Company may use Personal Data for the following purposes:</p>
        <ul className="pl-6 mb-6 space-y-2 list-disc">
          <li>
            <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
          </li>
          <li>
            <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
          </li>
          <li>
            <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
          </li>
          <li>
            <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
          </li>
          <li>
            <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
          </li>
        </ul>

        <h2 className="mb-4 text-xl font-semibold">Retention of Your Personal Data</h2>
        <p className="mb-6">
          The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this
          Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal
          obligations (for example, if we are required to retain your data to comply with applicable laws), resolve
          disputes, and enforce our legal agreements and policies.
        </p>
        <p className="mb-6">
          The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a
          shorter period of time, except when this data is used to strengthen the security or to improve the
          functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Security of Your Personal Data</h2>
        <p className="mb-6">
          The security of Your Personal Data is important to Us, but remember that no method of transmission over the
          Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means
          to protect Your Personal Data, We cannot guarantee its absolute security.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Changes to this Privacy Policy</h2>
        <p className="mb-6">
          We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
          Privacy Policy on this page.
        </p>
        <p className="mb-6">
          We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming
          effective and update the "Last updated" date at the top of this Privacy Policy.
        </p>
        <p className="mb-6">
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
        <p className="mb-6">If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul className="pl-6 space-y-2 list-disc">
          <li>
            By email:{" "}
            <a
              href="mailto:cloudcomputing@nist.edu?subject=Regarding Privacy Policy&body=Message"
              className="text-blue-600 underline"
            >
              cloudcomputing@nist.edu
            </a>
          </li>
        </ul>
      </main>
    </section>
  );
};

export default PrivacyPolicy;
