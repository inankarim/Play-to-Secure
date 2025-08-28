import React from 'react';
import { Header } from '../Vulnerabilities/CSS Injection/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/CSS Injection/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/CSS Injection/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/CSS Injection/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/CSS Injection/Vulnerability/Navigation';

const CSSInjectionIndex = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

CSS injection can steal sensitive
data and manipulate user interface
• Attackers can use CSS to exfiltrate
data through background images
• UI manipulation can trick users
into revealing sensitive information
• CSS keyloggers can capture
user input without JavaScript
• Real websites have faced this issue
including major platforms`;

  const howToPrevent = `✅ How to Prevent CSS Injection

• Sanitize and validate all user input before rendering
• Use Content Security Policy (CSP) to restrict CSS sources
• Implement proper output encoding for CSS contexts
• Avoid dynamic CSS generation from user input
• Use CSS-in-JS libraries with built-in sanitization
• Regular security audits of CSS handling`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Never trust user input when
generating CSS dynamically
• Implement proper CSS sanitization
and validation mechanisms
• Use CSP to control CSS sources
and prevent inline styles
• Monitor for unusual CSS behavior
in your applications`;

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
                title="✅ How to Prevent CSS Injection"
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

export default CSSInjectionIndex;