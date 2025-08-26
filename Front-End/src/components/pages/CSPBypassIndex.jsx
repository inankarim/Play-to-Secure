import React from 'react';
import { Header } from '@/components/Vulnerabilities/CSP Bypass/Vulnerability/Header';
import { InfoCard } from '@/components/Vulnerabilities/CSP Bypass/Vulnerability/InfoCard';
import { CodeExample } from '@/components/Vulnerabilities/CSP Bypass/Vulnerability/CodeExample';
import { BonusTip } from '@/components/Vulnerabilities/CSP Bypass/Vulnerability/BonusTip';
import { Navigation } from '@/components/Vulnerabilities/CSP Bypass/Vulnerability/Navigation';

const CSPBypassIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

CSP bypass allows attackers to
circumvent security policies
• Weak CSP configurations can be
easily exploited by attackers
• Bypassed CSP enables XSS attacks
and data exfiltration
• Third-party integrations may
introduce CSP vulnerabilities
• Real websites have faced this issue
including major web applications`;

  const howToPrevent = `✅ How to Prevent CSP Bypass

• Use strict CSP policies with minimal exceptions
• Avoid unsafe-inline and unsafe-eval directives
• Implement nonce or hash-based CSP for dynamic content
• Regularly audit and test CSP policies
• Monitor CSP violation reports
• Use frameworks with secure CSP defaults`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Implement strict CSP headers
with proper directives
• Test CSP policies thoroughly
across all application features
• Monitor CSP violations and
respond to security reports
• Keep CSP policies updated as
application evolves`;

  return (
    <div className="min-h-screen bg-page pt-14">
      <div className="w-full max-w-[1440px] mx-auto relative">
        <Header />

        <main className="px-10 max-md:px-5">
          {/* Content grid: 2 columns on large screens (cards left, code right) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 max-md:gap-4">
            {/* Left: 3 info cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="🚨 Why Should You Care?"
                content={whyShouldYouCare}
                className="max-md:w-full"
              />
              <InfoCard
                title="✅ How to Prevent CSP Bypass"
                content={howToPrevent}
                className="max-md:w-full"
              />
              <InfoCard
                title="🛠️ What Developers Should Do"
                content={whatDevelopersShouldDo}
                className="max-md:w-full"
              />
            </div>

            {/* Right: Code example */}
            <aside className="lg:col-span-5">
              <CodeExample />
            </aside>
          </section>
        </main>

        {/* Bonus Tip Section */}
        <BonusTip />

        {/* Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default CSPBypassIndex;