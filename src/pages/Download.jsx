import React, { useState } from "react";
import {
  Download,
  ChevronDown,
  Terminal,
  Package,
  FileCode,
  Github,
  Book,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Zap,
  Copy,
  Check
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function VelvexDownloads() {
  const [selectedOS, setSelectedOS] = useState("windows");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 selection:bg-violet-500/30 font-sans">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto text-center">
     
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
            Download <br />Velvex
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Download the high-performance compiler for velvet. 
            Production-ready binaries and nightly builds for every platform.
          </p>
        </div>
      </section>

      {/* Main Download Grid */}
      <section className="px-8 py-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 mb-12">
            
            {/* Stable Release Card */}
            <div className="lg:col-span-3 group relative overflow-hidden bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-blue-500" />
              </div>
              
              <div className="relative">
                <span className="text-blue-400 text-sm font-bold tracking-widest uppercase">Stable</span>
                <h2 className="text-4xl font-bold mt-2 mb-4">Long Term Support</h2>
                <p className="text-neutral-400 mb-8 max-w-md">
                  Validated builds with Long Term Support. Recommended for smooth, bug free experience.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl transition-all font-semibold flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20">
                    <Download className="w-5 h-5" />
                    Download for Windows
                  </button>
                  <button className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all font-medium flex items-center gap-2">
                    Linux .deb
                  </button>
                </div>
                <p className="mt-4 text-xs text-neutral-500 flex items-center gap-2">
                  <Check className="w-3 h-3 text-blue-500" /> Latest: v1.2.0 (Feb 7, 2026)
                </p>
              </div>
            </div>

            {/* Nightly Build Card */}
            <div className="lg:col-span-2 group relative overflow-hidden bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500">
              <span className="text-amber-500 text-sm font-bold tracking-widest uppercase">Nightly</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Experimental Build</h2>
              <p className="text-neutral-400 mb-8">
                Test the latest optimizations and language experimental features.
              </p>
              
              <button className="w-full bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-4 rounded-2xl transition-all font-semibold flex items-center justify-center gap-3 border border-white/5">
                <Terminal className="w-5 h-5 text-amber-500" />
                Get Latest Nightly
              </button>
              <div className="mt-6 pt-6 border-t border-white/5">
                 <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 text-xs">v1.2.1</span>
                    <span className="text-amber-500/80 tracking-tighter">●●●○○</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Platform Detail Section */}
          <div className="bg-neutral-900/20 backdrop-blur-md border border-white/5 rounded-[32px] p-4 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-2">Cross-platform Binaries</h3>
                <p className="text-neutral-500 text-sm">Select your architecture to see available formats.</p>
              </div>
              
              <div className="flex p-1 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-xl">
                {["windows", "Web Assembly", "linux", "source"].map((os) => (
                  <button
                    key={os}
                    onClick={() => setSelectedOS(os)}
                    className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedOS === os 
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" 
                      : "text-neutral-500 hover:text-white"
                    }`}
                  >
                    {os.charAt(0).toUpperCase() + os.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
               {/* Simplified mapping for demo */}
               <DownloadRow 
                icon={<Package className="w-5 h-5 text-violet-400" />}
                title={selectedOS === "windows" ? "Windows Installer (x64)" : "Universal Binary"}
                meta="45.2 MB • SHA-256 Verified"
                isPrimary
               />
               <DownloadRow 
                icon={<FileCode className="w-5 h-5 text-neutral-400" />}
                title="Portable Archive (.zip)"
                meta="42.8 MB • Standalone"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Package Managers - Terminal Style */}
      <section className="px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 tracking-tight text-center md:text-left">Quick Install</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TerminalBox label="npm" cmd="npm install -g velvex" copyFn={copyToClipboard} copied={copied} />
            <TerminalBox label="brew" cmd="brew install velvex" copyFn={copyToClipboard} copied={copied} />
            <TerminalBox label="cargo" cmd="cargo install velvex" copyFn={copyToClipboard} copied={copied} />
            <TerminalBox label="scoop" cmd="scoop install velvex" copyFn={copyToClipboard} copied={copied} />
          </div>
        </div>
      </section>

      {/* Minimal Requirements */}
      <section className="px-8 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
                <h2 className="text-3xl font-bold mb-4">System Requirements</h2>
                <p className="text-neutral-500">Velvex is optimized for both legacy and modern instruction sets (AVX-512 supported).</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 gap-8 w-full">
                <div className="space-y-1">
                    <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">Memory</p>
                    <p className="text-xl font-medium">256MB RAM</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">Storage</p>
                    <p className="text-xl font-medium">50MB Space</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">Processor</p>
                    <p className="text-xl font-medium">x86_64 / ARM64</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">OS</p>
                    <p className="text-xl font-medium">Windows / Linux</p>
                </div>
            </div>
        </div>
      </section>

      <footer className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rotate-45" />
                </div>
                <span className="text-xl font-bold tracking-tighter">VELVEX</span>
            </div>
            <div className="flex gap-10 text-sm font-medium text-neutral-500">
                <a href="#" className="hover:text-white transition-colors">Docs</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
                <a href="#" className="hover:text-white transition-colors">Changelog</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
            <p className="text-xs text-neutral-600">© 2026 Velvex Foundation.</p>
        </div>
      </footer>
    </div>
  );
}

// Sub-components for cleaner structure
function DownloadRow({ icon, title, meta, isPrimary = false }) {
  return (
    <div className={`group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border transition-all ${isPrimary ? 'bg-white/5 border-white/10 hover:border-violet-500/40' : 'bg-transparent border-white/5 hover:border-white/10'}`}>
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="p-3 bg-black/40 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm text-neutral-500">{meta}</p>
        </div>
      </div>
      <button className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${isPrimary ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'}`}>
        Download
      </button>
    </div>
  );
}

function TerminalBox({ label, cmd, copyFn, copied }) {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 backdrop-blur-xl group hover:border-violet-500/30 transition-all">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[2px]">{label}</span>
        <button 
          onClick={() => copyFn(cmd)}
          className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-neutral-500 hover:text-violet-400"
        >
          {copied === cmd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <code className="text-sm font-mono text-neutral-300 block overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="text-violet-500 mr-2">$</span>{cmd}
      </code>
    </div>
  );
}