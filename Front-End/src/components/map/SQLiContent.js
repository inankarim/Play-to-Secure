/* SQLi Tutorial & Quiz placeholders (to be expanded next iterations) */
export const tutorialPages = [
  "What is SQL Injection? Attackers inject malicious SQL into inputs to read or modify data.",
  "Risk: Bypass authentication, exfiltrate PII, delete data.",
  "Mitigation: Use parameterized queries (prepared statements).",
  "Never concatenate user input into SQL. Validate and sanitize inputs.",
  "Apply least-privilege DB accounts and enforce proper error handling.",
];

export const quiz = [
  { q: "Best defense against SQLi?", options: ["WAF only", "Parameterized queries", "Escape quotes sometimes", "Disable errors"], answer: 1 },
  { q: "Which input is vulnerable?", options: ["SELECT * FROM users WHERE id = " + "?", "SELECT * FROM users WHERE id = " + "'" + " + input + " + "'" , "ORM with bound params", "Stored proc with parameters"], answer: 1 },
  { q: "Good practice?", options: ["Concatenate table names", "Use least privilege", "Return raw DB errors", "Trust hidden fields"], answer: 1 },
];