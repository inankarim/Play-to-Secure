import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-popover mt-16" role="contentinfo">
      <div className="mx-auto max-w-[1440px] px-4 py-8 text-muted-foreground">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-foreground font-bold text-lg">Contact Us</h2>
            <p className="mt-2">Join our mission to make the web a safer place</p>
            <div className="mt-4 flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="transition-opacity duration-200 hover:opacity-80">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="transition-opacity duration-200 hover:opacity-80">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="transition-opacity duration-200 hover:opacity-80">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </section>

      <nav aria-label="Company">
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Partner With Us</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Meet the Team</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Our Mission</a></li>
        </ul>
      </nav>

      <nav aria-label="Product">
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">OWASP Top 10 Learning</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Gamified Challenges</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Mentor Support</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Real-World Scenarios</a></li>
        </ul>
      </nav>

      <nav aria-label="Resources">
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-foreground transition-colors">Resources</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Secure Coding Guide</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Vulnerability Guide</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Community Forum</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Blog & Articles</a></li>
        </ul>
      </nav>
        </div>

      <div className="border-t border-border mt-6 pt-4 text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Play to Secure</div>
          <div className="opacity-80">All rights reserved.</div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
