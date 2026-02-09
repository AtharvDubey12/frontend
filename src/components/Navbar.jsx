import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // Import router components
import { Github, Play, BookOpen, Download } from 'lucide-react';
import velvexLogo from "/velvex_logo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-15">
          
          {/* Logo Section - Wraps in Link to Home */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-600/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img className="w-12" src={velvexLogo} alt="Velvex Logo" />
            </div>
            <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Velvet
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <CustomNavLink to="/download">
              {/* <Download className="w-4 h-4" /> */}
              Download
            </CustomNavLink>
            <CustomNavLink to="/docs">
              {/* <BookOpen className="w-4 h-4" /> */}
              Docs
            </CustomNavLink>
            <CustomNavLink to="/playground">
              {/* <Play className="w-4 h-4" /> */}
              Playground
            </CustomNavLink>
            
            {/* Vertical Divider */}
            <div className="w-px h-4 bg-white/10 mx-4" />

            {/* External Github Link (Standard <a> tag) */}
            <a 
              href="https://github.com/AtharvDubey12/velvex-cpp" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
             <button className="p-2 text-neutral-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Internal NavLink Component using react-router-dom
function CustomNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive 
          ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.1)]" 
          : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
        }
      `}
    >
      {children}
    </NavLink>
  );
}

export default Navbar;