import React, { useState } from "react";
import {
  Code,
  FileText,
  Zap,
  Github,
  Download,
  BookOpen,
  Terminal,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe,
  PenTool,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Required for animated curves
import VelvexShowcase from "../components/VelvexShowcase";

export default function VelvexLanding() {
  const velvetCode = `def theorem fibonacci(n: Nat):
  F(0) = 0
  F(1) = 1
  F(n) = F(n-1) + F(n-2)
  
proof by induction on n
end`;

  const latexCode = `\\begin{theorem}
  \\text{For all } n \\in \\mathbb{N}:
  \\begin{cases}
    F(0) = 0 \\\\
    F(1) = 1 \\\\
    F(n) = F(n-1) + F(n-2)
  \\end{cases}
\\end{theorem}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 selection:bg-violet-500/30 font-sans">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
 <section className="relative px-8 pt-40 pb-24 overflow-hidden">
        {/* ANIMATED BACKGROUND CURVES - Multi-layered function tracing */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-50">
          <svg className="w-full h-full max-w-7xl" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none">
            
            {/* 1. Primary Sigmoid Curve (Logo Deep Purple) */}
            <motion.path
              d="M-50 450 C 300 450, 400 150, 1250 150"
              stroke="url(#hero-gradient-brand)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0], 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                times: [0, 0.4, 0.6, 1] 
              }}
            />

            {/* 2. Gaussian Distribution (Center-Bottom) */}
            <motion.path
              d="M200 580 Q 600 80, 1000 580"
              stroke="url(#hero-gradient-violet)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0], 
                opacity: [0, 0.6, 0.6, 0] 
              }}
              transition={{ 
                duration: 14, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 3
              }}
            />

            {/* 3. Dashed Cubic Function (Top Left) */}
            <motion.path
              d="M-100 100 C 150 100, 250 350, 550 350"
              stroke="url(#hero-gradient-blue)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0], 
                opacity: [0, 0.4, 0.4, 0] 
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity, 
                ease: "linear",
                delay: 1
              }}
            />

            {/* 4. Sine-wave variant (Middle-Right) */}
            <motion.path
              d="M700 250 Q 850 100, 1000 250 T 1400 250"
              stroke="url(#hero-gradient-brand)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0], 
                opacity: [0, 0.5, 0.5, 0] 
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: 5 
              }}
            />

            <defs>
              {/* Brand Colors derived from logo: $#581c87$ to $#6b21a8$ */}
              <linearGradient id="hero-gradient-brand" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#581c87" stopOpacity="0" />
                <stop offset="50%" stopColor="#6b21a8" />
                <stop offset="100%" stopColor="#581c87" stopOpacity="0" />
              </linearGradient>
              
              <linearGradient id="hero-gradient-violet" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="hero-gradient-blue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9] text-white">
            Write Velvet.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400">
              Publish Perfection.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            An elegant language for writing mathematics. Compiles blazingly fast
            into production-grade LaTeX via Velvex, the Velvet Compiler.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/download"
              className="bg-white text-black hover:bg-neutral-200 px-10 py-4 rounded-lg transition-all font-bold flex items-center gap-2 shadow-xl shadow-white/5 active:scale-95"
            >
              <Download className="w-5 h-5" />
              Download
            </Link>
            <Link
              to="/playground"
              className="bg-neutral-900/50 hover:bg-neutral-800 text-white border border-white/10 px-10 py-4 rounded-lg transition-all font-bold flex items-center gap-2 backdrop-blur-xl active:scale-95"
            >
              <PlaygroundIcon className="w-5 h-5 text-violet-400" />
              Try in Browser
            </Link>
            <Link
              to="/docs"
              className="bg-violet-900/20 hover:bg-violet-900/40 text-white border border-white/10 px-10 py-4 rounded-lg transition-all font-bold flex items-center gap-2 backdrop-blur-xl active:scale-95"
            >
              <Terminal className="w-5 h-5 text-violet-400" />
              Learn Velvet
            </Link>
          </div>
        </div>
      </section>

      {/* Compiler Transformation Visualizer */}
      <section className="px-8 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="p-10 bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
            <VelvexShowcase />
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                Built for Smooth Experience.
              </h2>
              <p className="text-lg text-neutral-500 font-medium">
                Stop wrestling with macros and environments. Focus on the proof,
                we'll handle the typesetting.
              </p>
            </div>
            <Link
              to="/docs"
              className="group flex items-center gap-2 text-violet-400 font-bold hover:text-violet-300 transition-colors"
            >
              Explore Documentation{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureItem
              icon={<Zap className="w-6 h-6 text-amber-400" />}
              title="Ultra Fast Compilation"
              desc="Optimized C++ based compiler provides sub-millisecond parsing and instant diagnostics."
            />
            <FeatureItem
              icon={<Terminal className="w-6 h-6 text-emerald-400" />}
              title="Macros"
              desc="Instantly write complex expressions like Taylor Series using predefined macros."
            />
            <FeatureItem
              icon={<BookOpen className="w-6 h-6 text-blue-400" />}
              title="Journal Ready"
              desc="Compatibility with IEEE, ACM, and Springer templates right out of the box."
            />
            <FeatureItem
              icon={<PenTool className="w-6 h-6 text-violet-400" />}
              title="Intuitive Syntax"
              desc="Simple and easy to learn syntax. On average 40% less verbose than traditional LaTeX."
            />
            <FeatureItem
              icon={<Cpu className="w-6 h-6 text-indigo-400" />}
              title="Multiplatform Support"
              desc="Velvex, the Velvet compiler, is available for Windows and Linux. Moreover, it is also available as a WASM binary."
            />
            <FeatureItem
              icon={<Github className="w-6 h-6 text-white" />}
              title="Open Source"
              desc="The Language and its compiler are fully open source, available on GitHub."
            />
          </div>
        </div>
      </section>

      {/* Blog/Updates CTA */}
      <section className="px-8 py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-violet-950/10">
        <div className="max-w-4xl mx-auto bg-neutral-900/40 border border-white/10 rounded-[3rem] p-12 text-center backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-violet-600/40">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">
            Join the Community
          </h2>
          <p className="text-neutral-400 mb-10 text-lg leading-relaxed">
            Stay updated with the latest in language design and compiler
            optimizations. Join 2,000+ researchers using Velvex.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-colors">
              Read the Blog
            </button>
            <button className="px-8 py-3 bg-neutral-800 text-white rounded-xl font-bold border border-white/5 hover:bg-neutral-700 transition-colors">
              Join Discord
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-[2rem] bg-neutral-900/30 border border-white/5 hover:border-violet-500/20 transition-all group">
      <div className="mb-6 p-4 bg-black/40 border border-white/5 rounded-2xl inline-block group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-neutral-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function PlaygroundIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10" />
      <path d="M17 2h5v5" />
      <path d="m21 2-5 5" />
      <path d="M2 17v5h5" />
      <path d="m2 22 5-5" />
      <path d="M17 22h5v-5" />
      <path d="m17 17 5 5" />
      <path d="M2 12V2h10" />
    </svg>
  );
}