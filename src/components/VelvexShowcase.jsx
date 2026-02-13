import React, { useState } from "react";
import { MathJax } from "better-react-mathjax";
import {
  Code,
  FileText,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Eye,
} from "lucide-react";

import Prism from "prismjs";
import { highlight } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-latex";
import "./velvex-grammar.js";
import "prismjs/themes/prism-tomorrow.css";

/* ---------------- EXAMPLES ---------------- */

const EXAMPLES = [
  {
    id: "fraction",
    title: "Macros",
    velvet: `Taylor[x][Inf][y]`,
    latex: `f\\left(x\\right) = \\sum_{n=0}^{\\infty} \\frac{f^{\\left(n\\right)}\\left(y\\right)}{n!} \\,\\left(x-y\\right)^n`,
  },
  {
    id: "diff",
    title: "Differential",
    velvet: `Pdiff[3][y][x,y]`,
    latex: `\\frac{\\partial^3 y}{\\partial x \\partial y^2}`,
  },
  {
    id: "text",
    title: "Integral",
    velvet: `=> Integ[3][f(Frac[xyz][2])][x,y,z][0->1,0->2,0->1] != (Frac[5][3])^2`,
    latex: `\\Rightarrow \\int_{0} ^ {1} \\int_{0} ^ {2} \\int_{0} ^ {1} f \\left(\\frac{xyz}{2} \\right) \\, dx \\, dy \\, dz \\neq \\left( \\frac{5}{3} \\right)^{2}`,
  },
];

/* ---------------- COMPONENT ---------------- */

export default function VelvexShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(null);

  const active = EXAMPLES[activeIndex];

  const next = () => setActiveIndex((prev) => (prev + 1) % EXAMPLES.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + EXAMPLES.length) % EXAMPLES.length);

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            See The Difference
          </h2>
          <p className="text-neutral-500 text-sm">Less syntax. More math.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1">
            {EXAMPLES.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-1.5 text-xs rounded-full transition ${
                  activeIndex === idx
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>

          <div className="flex gap-1">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-6 min-h-[240px]">
        {/* Velvet */}
        {/* Velvet */}
        <ShowcaseCard
          label="Velvet"
          icon={<Code className="w-4 h-4 text-violet-400" />}
          onCopy={() => copy(active.velvet, "velvet")}
          copied={copied === "velvet"}
        >
          <pre
            className="text-xs leading-relaxed"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
            dangerouslySetInnerHTML={{
              __html: highlight(
                active.velvet,
                Prism.languages.velvex,
                "velvex",
              ),
            }}
          />
        </ShowcaseCard>

        {/* LaTeX (NO highlighting) */}
        <ShowcaseCard
          label="LaTeX"
          icon={<FileText className="w-4 h-4 text-blue-400" />}
          onCopy={() => copy(active.latex, "latex")}
          copied={copied === "latex"}
        >
          <pre
            className="text-xs leading-relaxed text-blue-300/70"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {active.latex}
          </pre>
        </ShowcaseCard>

        {/* Rendered */}
        <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
              Rendered
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center text-md">
            <MathJax dynamic hideUntilFirstTypeset>
              {`\\[ ${active.latex} \\]`}
            </MathJax>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function ShowcaseCard({ label, icon, children, onCopy, copied }) {
  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 flex flex-col font-mono overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">
            {label}
          </span>
        </div>

        <button
          onClick={onCopy}
          className="p-1.5 rounded hover:bg-white/5 transition"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-500" />
          )}
        </button>
      </div>

      <div
        className="flex-1 text-neutral-200 overflow-hidden"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          fontVariantLigatures: "none",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {children}
      </div>
    </div>
  );
}
