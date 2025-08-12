import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const btnClass = "text-foreground text-sm sm:text-base font-semibold transition-opacity hover:opacity-90 bg-cta px-4 py-2 rounded-full shadow-md tracking-wide";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-gray-900/70">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="text-white font-semibold">Play to Secure</div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className={btnClass}>Dashboard</Link>
          <button className={btnClass}>Leaderboard</button>
          <Link to="/common-vulnerability" className={btnClass}>Vulnerabilities</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
