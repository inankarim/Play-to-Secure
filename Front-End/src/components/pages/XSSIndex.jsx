import React from 'react';
import { Header } from '../Vulnerabilities/XSS/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/XSS/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/XSS/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/XSS/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/XSS/Vulnerability/Navigation';

const XSSIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

XSS attacks can steal cookies, session
tokens, and credentials
• Hijack user accounts and perform
actions on their behalf
• Deface websites and damage
brand reputation
• Most common vulnerability found
in web applications`;

  const howToPrevent = `✅ How to Prevent XSS

• Always encode output when displaying user input
• Use Content Security Policy (CSP) headers
• Validate and sanitize all input on the server side
• Use modern frameworks that auto-escape by default
• Store sensitive data in httpOnly cookies`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Never trust user input - treat all
input as potentially malicious
• Use contextual encoding based on
where data is displayed
• Regular security testing and code
reviews for XSS vulnerabilities`;

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
                title="✅ How to Prevent XSS"
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

export default XSSIndex;