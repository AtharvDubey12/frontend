import React, { useState, useRef, useEffect } from "react";
import { 
  Download, 
  ChevronDown, 
  ShieldCheck, 
  Zap,
  Monitor, 
  Cpu, 
  Globe, 
  Terminal,
  Check, 
  Copy,
  ShieldAlert
} from "lucide-react";
import Navbar from "../components/Navbar";


const handleDownload = (platform) => {
  let downloadUrl = "";

  if (platform === "Windows") {
    downloadUrl =
      "https://github.com/AtharvDubey12/velveX-cpp/releases/download/v1.2.0/Velvex_Installer_Win.exe";
  } else if (platform === "WASM SDK") {
    downloadUrl =
      "https://github.com/AtharvDubey12/velveX-cpp/releases/download/v1.2.0/Velvex_WASM_SDK.zip";
  }

  window.location.href = downloadUrl;
};


export default function VelvexDownloads() {
  const [ltsPlatform, setLtsPlatform] = useState({ id: "windows", label: "Windows", icon: <Monitor className="w-5 h-5" /> });
  const [nightlyPlatform, setNightlyPlatform] = useState({ id: "windows", label: "Windows", icon: <Monitor className="w-5 h-5" /> });
  const [isLtsOpen, setIsLtsOpen] = useState(false);
  const [isNightlyOpen, setIsNightlyOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const platforms = [
    { id: "windows", label: "Windows", sub: "x64 Installer", icon: <Monitor className="w-5 h-5" /> },
    { id: "linux", label: "Linux", sub: "x64 Binary", icon: <Cpu className="w-5 h-5" /> },
    { id: "wasm", label: "WASM SDK", sub: "Web Bundle", icon: <Globe className="w-5 h-5" /> },
  ];

  const copyCmd = () => {
    navigator.clipboard.writeText("velvex --version");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 selection:bg-violet-500/30 font-sans relative">
      {/* ✅ Subtle Background Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-violet-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="relative px-8 pt-48 pb-20">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
              Download Velvex
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              The high-performance compiler for Velvet. Optimized for efficiency, 
              built for mathematical precision.
            </p>
          </div>
        </section>

        {/* 🚀 Dual Action Section */}
        <section className="px-8 py-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            
            {/* Stable (LTS) Card - Added overflow-visible and dynamic z-index to fix layering */}
            <div className={`bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-10 relative group overflow-visible transition-all ${isLtsOpen ? 'z-50' : 'z-10'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck className="w-32 h-32 text-blue-500" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                  <ShieldCheck className="w-4 h-4" /> Recommended
                </div>
                <h2 className="text-4xl font-bold mb-4">Stable Release</h2>
                <p className="text-neutral-400 mb-10 text-sm leading-relaxed">
                  Validated builds for production environments. <br/>
                  Latest: **v1.2.0** (Feb 13, 2026)
                </p>

                <div className="flex items-stretch shadow-2xl shadow-blue-500/10">
                  <button onClick={() => handleDownload(ltsPlatform.label)} className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-l-2xl transition-all">
                    {ltsPlatform.icon}
                    Download for {ltsPlatform.label}
                  </button>
                  <div className="relative">
                    <button onClick={() => setIsLtsOpen(!isLtsOpen)} className="h-full px-4 bg-blue-700 hover:bg-blue-600 border-l border-white/10 rounded-r-2xl text-white transition-all">
                      <ChevronDown className={`w-5 h-5 transition-transform ${isLtsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isLtsOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 p-2 bg-neutral-900 border border-white/10 rounded-2xl z-[100] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {platforms.map(p => (
                          <button key={p.id} onClick={() => { setLtsPlatform(p); setIsLtsOpen(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="text-neutral-400">{p.icon}</div>
                            <div className="text-left">
                              <p className="text-sm font-bold text-white">{p.label}</p>
                              <p className="text-[10px] text-neutral-500 uppercase">{p.sub}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Nightly (Experimental) Card - Added overflow-visible and dynamic z-index */}
            <div className={`bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[32px] p-10 relative group overflow-visible transition-all ${isNightlyOpen ? 'z-50' : 'z-10'}`}>
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-amber-500">
                <Zap className="w-32 h-32" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-widest uppercase mb-4">
                  <Zap className="w-4 h-4" /> Bleeding Edge
                </div>
                <h2 className="text-4xl font-bold mb-4">Nightly Build</h2>
                <p className="text-neutral-400 mb-10 text-sm leading-relaxed">
                  Experience the latest features and optimizations. <br/>
                  Build: **v1.2.1-alpha** (Automated)
                </p>

                <div className="flex items-stretch shadow-2xl shadow-amber-500/10">
                  <button className="flex-1 flex items-center justify-center gap-3 bg-neutral-100 hover:bg-white text-neutral-950 font-bold py-5 rounded-l-2xl transition-all">
                    {nightlyPlatform.icon}
                    Get {nightlyPlatform.label} Build
                  </button>
                  <div className="relative">
                    <button onClick={() => setIsNightlyOpen(!isNightlyOpen)} className="h-full px-4 bg-neutral-200 hover:bg-white border-l border-black/10 rounded-r-2xl text-neutral-950 transition-all">
                      <ChevronDown className={`w-5 h-5 transition-transform ${isNightlyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isNightlyOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 p-2 bg-neutral-900 border border-white/10 rounded-2xl z-[100] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {platforms.map(p => (
                          <button key={p.id} onClick={() => { setNightlyPlatform(p); setIsNightlyOpen(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="text-neutral-400">{p.icon}</div>
                            <div className="text-left text-white">
                              <p className="text-sm font-bold">{p.label}</p>
                              <p className="text-[10px] text-neutral-500 uppercase">{p.sub}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🛠 Requirements & Verification */}
        <section className="px-8 py-20 relative z-0">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Requirements List */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Hardware Specification</h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                <SpecItem label="CPU" value="x86_64 / ARM64" sub="AVX-512 Support" />
                <SpecItem label="Memory" value="256MB RAM" sub="10MB Min Overhead" />
                <SpecItem label="Storage" value="50MB Free" sub="Static Linked Binary" />
                <SpecItem label="OS" value="Win / Linux" sub="Unix-like Shell Rec." />
              </div>
            </div>

            {/* Verification Code Block */}
            <div className="bg-black/60 rounded-3xl border mt-20 border-white/10 p-8 shadow-2xl backdrop-blur-xl">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <button onClick={copyCmd} className="text-neutral-500 hover:text-white transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
               </div>
               <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-4">Verification</p>
               <code className="text-lg font-mono leading-relaxed block text-white">
                  <span className="text-neutral-600 mr-3">$</span>velvex --version <br/>
                  <span className="text-neutral-400">Velvex version 1.2.0 LTS</span>
               </code>
               <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-xs text-neutral-500">
                  <ShieldAlert className="w-4 h-4" /> Ensure path is updated after install.
               </div>
            </div>
          </div>
        </section>

        <footer className="py-20 text-center text-xs text-neutral-600">
          Built by Atharv Dubey.
        </footer>
      </div>
    </div>
  );
}

function SpecItem({ label, value, sub }) {
  return (
    <div className="group">
      <p className="text-[10px] font-bold text-violet-500 uppercase tracking-[2px] mb-1">{label}</p>
      <p className="text-xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">{sub}</p>
    </div>
  );
}