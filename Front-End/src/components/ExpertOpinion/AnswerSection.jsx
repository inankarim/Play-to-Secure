import React from 'react';

const AnswerSection = () => {
  return (
    <section className="container mt-6 space-y-6">
      <article className="rounded-md p-6 shadow bg-[hsl(var(--panel))] text-[hsl(var(--panel-foreground))] w-full md:max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold">✅ Correct Answer:</h3>
        <h4 className="font-semibold mt-3">What Went Wrong and Why</h4>
        <p className="mt-2">In this case, the issue is DOM Clobbering.</p>
        <p className="mt-2">Your form used name="submit" — which caused the browser to create a global variable submit, overwriting the JavaScript submit() function.</p>
        <p className="mt-2">So when the script tried to call submit(), it was calling the form element, not your function. That's why the code failed.</p>
      </article>

      <article className="rounded-md p-6 shadow bg-black text-white w-full md:max-w-3xl mx-auto">
        <h4 className="text-2xl font-semibold">🛠 How to Fix It</h4>
        <ul className="list-none mt-4 space-y-2">
          <li>✅ Rename the form to avoid clashing: use <strong>name="userForm"</strong> instead of <strong>name="submit"</strong>.</li>
          <li>✅ Define functions using <strong>let</strong> or <strong>const</strong> to keep them in block scope — not global.</li>
          <li>✅ Avoid using id or name attributes that match built-in JS/global object names (e.g., submit, location, config).</li>
        </ul>
      </article>
    </section>
  );
};

export default AnswerSection;
