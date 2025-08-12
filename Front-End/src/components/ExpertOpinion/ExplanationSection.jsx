import React from 'react';
import { Lock } from 'lucide-react';

const ExplanationSection = () => {
  return (
      <section className="container grid gap-4 md:grid-cols-2 items-stretch">
        <article className="bg-[hsl(var(--panel))] text-[hsl(var(--panel-foreground))] rounded-md p-5 shadow h-full">
          <p>
            Browsers sometimes create global variables from HTML elements that use id or name attributes. So if you name a form element name="submit", the browser will create window.submit, overriding any JavaScript function called submit(). This can break your code — or worse, create security holes attackers can exploit.
          </p>
        </article>
        <article className="rounded-md p-5 shadow bg-gradient-to-r from-[hsl(var(--warm-start))] to-[hsl(var(--warm-end))] text-[hsl(var(--foreground))] h-full">
          <div className="flex items-start gap-3">
            <Lock className="mt-1" aria-hidden />
            <div>
              <p className="font-semibold">Why it matters:</p>
              <p className="mt-1">
                In real-world apps, DOM Clobbering has led to unauthorized form bypasses, malicious script loading, and logic hijacking on production websites. Stay vigilant, and always code defensively!
              </p>
            </div>
          </div>
        </article>
      </section>
  );
};

export default ExplanationSection;
