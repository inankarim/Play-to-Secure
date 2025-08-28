import React from 'react';
import { Header } from '../Vulnerabilities/Clickjacking/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/Clickjacking/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/Clickjacking/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/Clickjacking/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/Clickjacking/Vulnerability/Navigation';

const ClickjackingIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

Clickjacking tricks users into
clicking malicious elements
• Users think they're clicking on
legitimate buttons or links
• Attackers can steal clicks, perform
unauthorized actions, or capture data
• Invisible iframes overlay legitimate
content to deceive users
• Real websites have faced this issue
including social media platforms`;

  const howToPrevent = `✅ How to Prevent Clickjacking

• Use X-Frame-Options header to prevent framing
• Implement Content Security Policy (CSP) frame-ancestors directive
• Use frame-busting JavaScript (legacy approach)
• Avoid displaying sensitive actions in iframes
• Implement visual indicators for user interactions
• Use frameworks with built-in clickjacking protection`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Always set X-Frame-Options or
CSP frame-ancestors headers
• Test your site's framing behavior
in different browsers
• Be cautious when embedding
third-party content
• Review iframe usage and ensure
proper security headers`;

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
                title="✅ How to Prevent Clickjacking"
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

export default ClickjackingIndex;