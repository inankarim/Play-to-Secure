import React from 'react';
import { Header } from '../Vulnerabilities/IDOR/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/IDOR/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/IDOR/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/IDOR/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/IDOR/Vulnerability/Navigation';

const IDORIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

IDOR allows attackers to access
unauthorized resources
• View private user data and
sensitive documents
• Modify or delete other users'
information
• Common in APIs and web
applications`;

  const howToPrevent = `✅ How to Prevent IDOR

• Always verify user authorization for resource access
• Use indirect object references (UUIDs instead of IDs)
• Implement proper access control checks
• Never rely solely on client-side validation
• Use session-based access controls`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Audit all direct object references
in your application
• Implement authorization checks at
every access point
• Use automated testing to verify
access controls`;

  return (
    <div className="min-h-screen bg-page pt-14">
      <div className="w-full max-w-[1440px] mx-auto relative">
        <Header />
        <main className="px-10 max-md:px-5">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 max-md:gap-4">
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard title="🚨 Why Should You Care?" content={whyShouldYouCare} className="max-md:w-full" />
              <InfoCard title="✅ How to Prevent IDOR" content={howToPrevent} className="max-md:w-full" />
              <InfoCard title="🛠️ What Developers Should Do" content={whatDevelopersShouldDo} className="max-md:w-full" />
            </div>
            <aside className="lg:col-span-5">
              <CodeExample />
            </aside>
          </section>
        </main>
        <BonusTip />
        <Navigation />
      </div>
    </div>
  );
};

export default IDORIndex;