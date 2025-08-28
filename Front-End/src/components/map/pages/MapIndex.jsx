import { Link } from "react-router-dom";
import SEO from "../SEO";
import { Button } from "../../ui/button";
import bg from "../../../assets/Blue-cyan galaxy background with nebula.png";

const Index = () => {
  return (
    <main className="min-h-screen">
      <SEO
        title="Cybersecurity Galaxy Game – Learn Vulnerabilities"
        description="Play through colorful space worlds to learn cybersecurity vulnerabilities with tutorials and quizzes."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Cybersecurity Galaxy Game",
          applicationCategory: "EducationalApplication",
        }}
      />
      <header className="relative overflow-hidden">
        <img src={bg} alt="Starry galaxy background" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,hsl(var(--primary)/0.25),transparent),radial-gradient(70%_60%_at_50%_80%,hsl(var(--accent)/0.25),transparent)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">
            Explore the Cybersecurity Galaxy
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Master real-world vulnerabilities through playful, level-based maps with tutorials, quizzes, and stars.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/sqli">
              <Button variant="hero" size="lg" className="hover-scale">Start SQLi World</Button>
            </Link>
            <a href="#worlds" className="story-link text-primary text-lg">See all worlds</a>
          </div>
        </div>
      </header>

      <section id="worlds" className="mx-auto max-w-5xl px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="p-6 rounded-xl bg-card border shadow-[var(--shadow-elegant)]">
          <h2 className="text-xl font-bold">SQL Injection</h2>
          <p className="text-muted-foreground mt-1">Blue/Cyan world of database planets.</p>
          <Link to="/sqli" className="mt-4 inline-block"><Button size="sm">Enter World</Button></Link>
        </article>
        <article className="p-6 rounded-xl bg-card border opacity-70">
          <h2 className="text-xl font-bold">More worlds coming</h2>
          <p className="text-muted-foreground mt-1">NoSQLi, XSS, IDOR, and more.</p>
        </article>
      </section>
    </main>
  );
};

export default Index;