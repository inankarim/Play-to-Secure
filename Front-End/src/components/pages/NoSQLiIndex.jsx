import React from 'react';
import { Header } from '@/components/Vulnerabilities/NoSQLi/Vulnerability/Header';
import { InfoCard } from '@/components/Vulnerabilities/NoSQLi/Vulnerability/InfoCard';
import { CodeExample } from '@/components/Vulnerabilities/NoSQLi/Vulnerability/CodeExample';
import { BonusTip } from '@/components/Vulnerabilities/NoSQLi/Vulnerability/BonusTip';
import { Navigation } from '@/components/Vulnerabilities/NoSQLi/Vulnerability/Navigation';

const NoSQLiIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

NoSQL Injection affects modern databases
like MongoDB, CouchDB, and Redis
• Can bypass authentication and access
control mechanisms
• Allows unauthorized data extraction
and manipulation
• Growing threat as NoSQL adoption
increases`;

  const howToPrevent = `✅ How to Prevent NoSQL Injection

• Validate and sanitize all user inputs before queries
• Use parameterized queries where available
• Avoid using JavaScript expressions in queries
• Implement proper access controls and authentication
• Keep NoSQL databases and drivers updated`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Never trust user input in NoSQL
query construction
• Use schema validation to enforce
data types and structures
• Implement query whitelisting for
complex operations`;

  return (
    <div className="min-h-screen bg-page pt-14">
      <div className="w-full max-w-[1440px] mx-auto relative">
        <Header />

        <main className="px-10 max-md:px-5">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 max-md:gap-4">
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="🚨 Why Should You Care?"
                content={whyShouldYouCare}
                className="max-md:w-full"
              />
              <InfoCard
                title="✅ How to Prevent NoSQL Injection"
                content={howToPrevent}
                className="max-md:w-full"
              />
              <InfoCard
                title="🛠️ What Developers Should Do"
                content={whatDevelopersShouldDo}
                className="max-md:w-full"
              />
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

export default NoSQLiIndex;