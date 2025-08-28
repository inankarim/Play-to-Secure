import React, { useState } from "react";

const attacks = [
  { id: "sqli", name: "SQLi", description: "SQL Injection (SQLi) is a code injection technique where malicious SQL queries are used to exploit vulnerabilities in an application's database.", backgroundImage: 'url(/images/sqli.png)' },
  { id: "xss", name: "XSS", description: "Cross-Site Scripting (XSS) is a vulnerability that allows attackers to inject malicious scripts into webpages viewed by users.", backgroundImage: 'url(/images/xss.png)' },
  { id: "nosqli", name: "NoSQLi", description: "NoSQL Injection (NoSQLi) occurs when an attacker manipulates a NoSQL database query, exploiting weaknesses in its design or implementation.", backgroundImage: 'url(/images/nosqli.png)' },
  { id: "idor", name: "IDOR", description: "Insecure Direct Object Reference (IDOR) is an access control vulnerability that occurs when an attacker can manipulate input to access data they are not authorized to.", backgroundImage: 'url(/images/idor.png)' },
  { id: "cssinjection", name: "CSS Injection", description: "CSS Injection is a vulnerability where an attacker injects malicious CSS code into a webpage, potentially altering the page's design or behavior.", backgroundImage: 'url(/images/cssinjection.png)' },
  { id: "cspbypass", name: "CSP Bypass", description: "CSP Bypass refers to evading the Content Security Policy (CSP) to execute malicious scripts on a website.", backgroundImage: 'url(/images/cspbypass.png)' },
  { id: "clickjacking", name: "Clickjacking", description: "Clickjacking is a malicious technique where a user is tricked into clicking on something different from what they perceive and attackers take advantage of that.", backgroundImage: 'url(/images/clickjacking.png)' },
  { id: "domclobbering", name: "DOM Clobbering", description: "DOM Clobbering occurs when an attacker manipulates the DOM to overwrite properties or functionality of web pages.", backgroundImage: 'url(/images/domclobbering.png)' },
  { id: "cdntampering", name: "CDN Tampering", description: "CDN Tampering occurs when an attacker manipulates content delivered via a Content Delivery Network (CDN) to inject malicious content.", backgroundImage: 'url(/images/cdntampering.png)' }
];

const AttackDetails = () => {
  const [activeAttack, setActiveAttack] = useState(null);

  const handleToggle = (id) => {
    setActiveAttack(activeAttack === id ? null : id); // Toggle active attack
  };

  return (
    <div className="min-h-screen bg-transparent ">
      <div className="my-16 p-14 ">
        {/* Section: What is Security? */}
        <div className="bg-transparent text-bold-white p-8 rounded-3xl shadow-2xl mb-4 ">
          <h1 className="text-2xl font-bold">What is Security?</h1>
          <p className="text-xl mt-4">"Security is the practice of defending information systems, networks, and data from cyber threats and attacks. In this section, we’ll explore various security vulnerabilities that can occur in web applications, particularly those arising from common coding mistakes made by "NOVICE DEVELOPERS."
          </p>
        </div>
      </div>

      {/* Attack Dropdown List - Centered Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mx-auto pl-14">
        {attacks.map((attack) => (
          <div 
            key={attack.id} 
            className={`bg-transparent border-2 border-gray-300 shadow-2xl rounded-3xl p-14 transition-all duration-200 transform hover:scale-105 hover:shadow-3xl max-w-md relative`}
            style={{
              backgroundImage: attack.backgroundImage, // Use dynamic background image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: activeAttack === attack.id ? 'blur(5px)' : 'none',  // Apply blur when active
            }}
          >
            {/* Attack Name - Initially hidden */}
            <div
              className={`absolute inset-0 flex items-center justify-center text-white font-bold text-xl transition-all duration-500 ease-in-out ${activeAttack === attack.id ? 'opacity-100' : 'opacity-0'}`}
            >
              {attack.name}
            </div>

            {/* Text Description - Becomes visible when clicked */}
            {activeAttack === attack.id && (
              <div className="mt-4 text-lg transition-all duration-500 ease-in-out transform opacity-100 text-white">
                <p>{attack.description}</p>
              </div>
            )}

            {/* Toggle action */}
            <button
              onClick={() => handleToggle(attack.id)}
              className="absolute top-2 left-2 text-white font-bold p-2 bg-black bg-opacity-50 rounded"
            >
              {activeAttack === attack.id ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttackDetails;
