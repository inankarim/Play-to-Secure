import React from 'react';
import { Header } from '../Vulnerabilities/DOM Clobbering/Vulnerability/Header';
import { InfoCard } from '../Vulnerabilities/DOM Clobbering/Vulnerability/InfoCard';
import { CodeExample } from '../Vulnerabilities/DOM Clobbering/Vulnerability/CodeExample';
import { BonusTip } from '../Vulnerabilities/DOM Clobbering/Vulnerability/BonusTip';
import { Navigation } from '../Vulnerabilities/DOM Clobbering/Vulnerability/Navigation';

const Index = () => {
  const whyShouldYouCare = `🚨 Why Should You Care?

Your code may break without
any error
• It makes your site vulnerable to
attacks, especially if user input or
HTML is injected
• It's hard to debug —
and easy to miss
• Real websites (like GitHub,
Trello, Vimeo) have faced this issue
before`;

  const howToPrevent = `✅ How to Prevent DOM Clobbering

• Always use let, const, or var to define variables in JavaScript
• Avoid using HTML attributes like id="submit" or name="login" that might match JS variable names
• Use linters like ESLint to warn you about risky code
• Never trust or render HTML from users directly unless it's sanitized
• Use frameworks like React or Vue — they structure code in ways that naturally reduce clobbering risks`;

  const whatDevelopersShouldDo = `🛠️ What Developers Should Do

• Write JavaScript in modular scope,
not in the global space
• Be mindful when writing forms or
templates — name elements wisely
• Review your page's structure — if things
aren't working, check if clobbering is the
cause`;

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
                title="✅ How to Prevent DOM Clobbering"
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

export default Index;
