import React from 'react';
import { TutorialSection } from '../Vulnerabilities/DOM Clobbering/DetailedVulnerability/TutorialSection/TutorialSection';
import { CodeBlock } from '../Vulnerabilities/DOM Clobbering/DetailedVulnerability/CodeBlocks';
import { TitleBar } from '../Vulnerabilities/DOM Clobbering/DetailedVulnerability/TitleBar';
import { TipGreyBox } from '../Vulnerabilities/DOM Clobbering/DetailedVulnerability/TipGreyBox';
import { PastePanel } from '../Vulnerabilities/DOM Clobbering/DetailedVulnerability/PastePanel';
import { NavigationButtons } from '../Vulnerabilities/IDOR/DetailedVulnerability/NavigationButton';

const DetailedIDOR = () => {
  React.useEffect(() => {
    document.title = 'Detailed IDOR';
  }, []);

  return (
    <main className="container mx-auto px-6 py-8 max-w-4xl">
      <article className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-4">Detailed IDOR Analysis</h1>
          <p className="text-xl text-muted-foreground">
            Deep dive into Insecure Direct Object Reference vulnerabilities
          </p>
        </header>

        <TutorialSection>
          IDOR (Insecure Direct Object Reference) occurs when an application provides direct access to objects based on user-supplied input. This vulnerability allows attackers to bypass authorization and access resources belonging to other users.
        </TutorialSection>

        <section>
          <TitleBar>Vulnerable IDOR Example</TitleBar>
          <CodeBlock>
{`// GET /api/documents/123 - User can access any document by changing ID
app.get('/api/documents/:id', (req, res) => {
  const docId = req.params.id;
  const document = db.getDocument(docId); // No ownership check!
  res.json(document);
});

// Attacker can access documents: /api/documents/1, /api/documents/2, etc.`}
          </CodeBlock>
        </section>

        <TipGreyBox title="Why IDOR is Dangerous">
          IDOR vulnerabilities can lead to unauthorized data access, privacy breaches, and exposure of sensitive information. Attackers can systematically enumerate resources to access data they shouldn't see.
        </TipGreyBox>

        <section>
          <TitleBar>Secure Implementation</TitleBar>
          <CodeBlock>
{`// Proper authorization check
app.get('/api/documents/:id', authenticateUser, (req, res) => {
  const docId = req.params.id;
  const userId = req.user.id;
  
  // Check if user owns this document
  const document = db.getDocumentByIdAndOwner(docId, userId);
  
  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }
  
  res.json(document);
});`}
          </CodeBlock>
        </section>

        <PastePanel title="Prevention Strategies">
          <ul className="list-disc list-inside space-y-2">
            <li>Implement proper access control checks for every resource</li>
            <li>Use indirect reference maps or UUIDs instead of sequential IDs</li>
            <li>Validate user permissions before accessing any resource</li>
            <li>Implement role-based access control (RBAC)</li>
            <li>Log and monitor access attempts for suspicious patterns</li>
          </ul>
        </PastePanel>

        <NavigationButtons />
      </article>
    </main>
  );
};

export default DetailedIDOR;
