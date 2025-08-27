import React from 'react';
import { Header } from '../Vulnerabilities/CDN Tampering/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/CDN Tampering/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/CDN Tampering/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/CDN Tampering/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/CDN Tampering/Vulnerability/Navigation';

const CDNTamperingIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

CDN tampering can inject malicious
scripts into your site
• Compromised CDNs affect millions
of websites simultaneously
• Attackers can steal user data,
redirect traffic, or inject malware
• Third-party dependencies create
security vulnerabilities
• Real websites have faced this issue
including major platforms`;

  const howToPrevent = `✅ How to Prevent CDN Tampering

• Use Subresource Integrity (SRI) to verify CDN resources
• Host critical files locally instead of relying on external CDNs
• Monitor CDN providers for security incidents
• Use Content Security Policy (CSP) to restrict resource loading
• Implement automated testing to detect unexpected changes
• Use frameworks with built-in security measures`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Always verify CDN resource integrity
with SRI hashes
• Monitor third-party dependencies
for security updates
• Have fallback plans if CDN services
become compromised
• Review CDN provider security practices
regularly`;

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
                title="✅ How to Prevent CDN Tampering"
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

export default CDNTamperingIndex;