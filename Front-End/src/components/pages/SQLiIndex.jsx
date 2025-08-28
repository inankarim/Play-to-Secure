import React from 'react';
import { Header } from '../Vulnerabilities/SQLi/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/SQLi/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/SQLi/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/SQLi/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/SQLi/Vulnerability/Navigation';

const SQLiIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

SQL Injection can completely compromise
your database
• Attackers can steal, modify, or delete
sensitive data including user credentials
• It's one of the most common and
dangerous vulnerabilities
• Major breaches (Yahoo, Sony, LinkedIn)
have occurred due to SQLi`;

  const howToPrevent = `✅ How to Prevent SQL Injection

• Always use parameterized queries or prepared statements
• Never concatenate user input directly into SQL queries
• Use stored procedures with care and validate inputs
• Apply the principle of least privilege to database accounts
• Use ORM libraries that handle SQL safely by default`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Review all database queries for
concatenated user input
• Implement input validation and
sanitization as defense in depth
• Regular security audits and penetration
testing of database interactions`;

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
                title="✅ How to Prevent SQL Injection"
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

export default SQLiIndex;