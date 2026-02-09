import React, { useState } from "react";
import {
  Search,
  Book,
  Code2,
  Cpu,
  Layers,
  Zap,
  ChevronRight,
  ExternalLink,
  Info,
  Lightbulb,
  ArrowRight,
  Hash
} from "lucide-react";

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-violet-500/30">

      <div className="max-w-[1600px] mx-auto flex">
        {/* Left Sidebar - Navigation */}
        <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-80px)] sticky top-20 border-r border-white/5 p-6 overflow-y-auto">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search docs..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-violet-500/50 transition-all"
            />
          </div>

          <nav className="space-y-8">
            <NavGroup title="Getting Started">
              <NavItem label="Introduction" active />
              <NavItem label="Installation" />
              <NavItem label="Quick Start" />
            </NavGroup>

            <NavGroup title="Core Concepts">
              <NavItem label="Type System" />
              <NavItem label="Memory Safety" />
              <NavItem label="Concurrency" />
              <NavItem label="Optimization Flags" />
            </NavGroup>

            <NavGroup title="Standard Library">
              <NavItem label="vv::core" />
              <NavItem label="vv::math" />
              <NavItem label="vv::network" />
            </NavGroup>
          </nav>
        </aside>

        {/* Center - Content */}
        <main className="flex-1 px-6 py-12 md:px-12 lg:px-20 max-w-4xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-neutral-500 font-medium">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-violet-400">Introduction</span>
          </div>

          <header className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              Introduction to Velvex
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
              Velvex is a high-performance, compiled language designed for safety, 
              speed, and modern developer ergonomics. It bridges the gap between 
              low-level control and high-level abstraction.
            </p>
          </header>

          <div className="space-y-12">
            {/* Design Note Box */}
            <div className="bg-violet-500/5 border border-violet-500/20 rounded-3xl p-6 flex gap-4">
              <Lightbulb className="w-6 h-6 text-violet-400 shrink-0" />
              <div>
                <h4 className="text-violet-400 font-bold mb-1">Philosophy</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Velvex follows the "Zero-Cost Safety" principle. Memory safety is enforced 
                  at compile-time without a garbage collector, ensuring your binaries remain 
                  lean and predictable.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-violet-500" />
                Why Velvex?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard 
                  title="Blazing Fast" 
                  desc="LLVM-backed backend with aggressive O3 optimizations by default." 
                />
                <FeatureCard 
                  title="Memory Safe" 
                  desc="Ownership-based memory management prevents data races and leaks." 
                />
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">A Taste of Velvex</h3>
              <p className="text-neutral-400 mb-6">
                The syntax is designed to be familiar to C++ and Rust developers but 
                removes the cognitive overhead of header files and manual pointers.
              </p>
              
              <div className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden font-mono text-sm leading-6">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between">
                  <span className="text-xs text-neutral-500">example.vv</span>
                  
                </div>
                <pre className="p-6 overflow-x-auto text-neutral-300">
{`module main;

import vv::io;

fn fibonacci(n: i32) -> i32 {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

pub fn main() {
    let result = fibonacci(10);
    io::println("Fibonacci(10) is: {result}");
}`}
                </pre>
              </div>
            </section>

            {/* Pagination */}
            <div className="pt-12 border-t border-white/5 flex justify-between items-center">
              <div />
              <a href="#" className="group flex flex-col items-end">
                <span className="text-xs text-neutral-500 mb-1">Next Page</span>
                <span className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors flex items-center gap-2">
                  Installation <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </main>

        {/* Right Sidebar - TOC */}
        <aside className="hidden xl:block w-64 h-[calc(100vh-80px)] sticky top-20 p-8">
          <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-6">
            On this page
          </h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li className="text-violet-400 font-medium cursor-pointer">Introduction</li>
            <li className="hover:text-neutral-300 cursor-pointer transition-colors">Why Velvex?</li>
            <li className="hover:text-neutral-300 cursor-pointer transition-colors">Design Goals</li>
            <li className="hover:text-neutral-300 cursor-pointer transition-colors">Syntax Overview</li>
          </ul>
          
          <div className="mt-12 p-4 bg-white/5 border border-white/5 rounded-2xl">
            <p className="text-xs text-neutral-400 mb-4 font-medium leading-relaxed">
              Found a bug in the docs?
            </p>
            <a href="#" className="text-xs text-violet-400 flex items-center gap-2 hover:underline">
              Edit on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function NavGroup({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[2px] px-4">
        {title}
      </h4>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function NavItem({ label, active = false }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
      active 
      ? "bg-violet-600/10 text-violet-400" 
      : "text-neutral-500 hover:text-white hover:bg-white/5"
    }`}>
      {label}
    </button>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
      <h4 className="font-bold mb-2 text-white">{title}</h4>
      <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
    </div>
  );
}