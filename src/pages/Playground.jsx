import React, { useState, useEffect, useRef, useMemo } from "react";
import EditorImport from "react-simple-code-editor";
import { MathJax, MathJaxContext } from "better-react-mathjax"; 
import Prism from "prismjs";
import { highlight } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "../components/velvex-grammar.js";

import {
  Play, RotateCcw, Settings, Terminal as TerminalIcon,
  Cpu, Eye, Code
} from "lucide-react";

const CodeEditor = EditorImport?.default ?? EditorImport;

export default function Playground() {
  const [code, setCode] = useState(
    `Ignore[Welcome to the Velvex Playground]\nf(Frac[x][2]) = Pdiff[2][y][x,m]\n\nTxt[Hello World!]`
  );
  const [viewMode, setViewMode] = useState("raw");
  const [output, setOutput] = useState([
    { type: "system", text: "Velvex Runtime v1.2.0 initialized..." },
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const workerRef = useRef(null);

  // 🛠️ 1. Computed Aggregation: Join all 'out' types into one string for rendering
  const aggregatedMath = useMemo(() => {
    return output
      .filter(line => line.type === 'out')
      .map(line => line.text)
      .join(""); 
  }, [output]);

  useEffect(() => {
    const worker = new Worker("/velvex.worker.js", { type: "classic" });
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const { type, text } = e.data;
      
      if (type === "stdout") {
        // ✅ Keeps the console printing line-by-line as it arrives
        setOutput((prev) => [...prev, { type: "out", text }]);
      } 
      else if (type === "stderr") {
        setOutput((prev) => [...prev, { type: "system", text: `Error: ${text}` }]);
      } 
      else if (type === "done") {
        setIsCompiling(false);
        setOutput((prev) => [...prev, { type: "success", text: "Compilation successful" }]);
      }
    };

    return () => worker.terminate();
  }, []);

const sanitizeCode = (rawCode) => {
  return rawCode
    .replace(/\r/g, "")
    .replace(/\n/g, " \\n ")
    .replace(/(->|=>|[+*/()]|-(?!>)|=(?!>))/g, (match) => ` ${match} `);
};

  const handleRun = () => {
    if (isCompiling) return;
    const sanitized = sanitizeCode(code);
    setIsCompiling(true);
    setOutput((prev) => [...prev, { type: "system", text: "Compiling..." }]);
    workerRef.current.postMessage({ code: sanitized });
  };

  return (
    <MathJaxContext>
      <div className="h-screen flex flex-col bg-neutral-950 text-neutral-200 selection:bg-violet-500/30 overflow-hidden">
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4">
          
          {/* Editor Pane */}
          <div className="flex-1 flex flex-col bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-violet-500/20">
            <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500 flex items-center gap-2 tracking-widest font-bold">
                <FileCode className="w-3 h-3" /> main.vel
              </span>
              <button
                onClick={handleRun}
                disabled={isCompiling}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  isCompiling ? "bg-neutral-800 text-neutral-500" : "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20"
                }`}
              >
                <Play className={`w-4 h-4 ${isCompiling ? "animate-pulse" : "fill-current"}`} />
                {isCompiling ? "Compiling..." : "Run"}
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <div className="w-12 bg-black/20 border-r border-white/5 py-6 flex flex-col items-center text-[10px] font-mono text-neutral-600 select-none">
                {code.split("\n").map((_, i) => <span key={i} className="leading-6">{i + 1}</span>)}
              </div>
              <CodeEditor
                value={code}
                onValueChange={setCode}
                highlight={(code) => highlight(code, Prism.languages.velvex, "velvex")}
                padding={24}
                className="velvex-editor flex-1 bg-transparent outline-none font-mono text-sm leading-6 text-neutral-300"
                style={{ fontFamily: '"Fira Code", monospace' }}
              />
            </div>
          </div>

          {/* Console Pane (UPDATED) */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="flex-1 flex flex-col bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                    <TerminalIcon className="w-3.5 h-3.5" /> Output
                  </span>
                  <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                    <button onClick={() => setViewMode("raw")} className={`px-2 py-1 rounded-md text-[10px] font-bold ${viewMode === "raw" ? "bg-white/10 text-white" : "text-neutral-500"}`}>
                      <Code className="w-3 h-3 inline mr-1" /> RAW
                    </button>
                    <button onClick={() => setViewMode("render")} className={`px-2 py-1 rounded-md text-[10px] font-bold ${viewMode === "render" ? "bg-violet-500 text-white" : "text-neutral-500"}`}>
                      <Eye className="w-3 h-3 inline mr-1" /> RENDER
                    </button>
                  </div>
                </div>
                <button onClick={() => setOutput([])}><RotateCcw className="w-4 h-4 text-neutral-500 hover:text-white" /></button>
              </div>

              <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-2 no-scrollbar">
                {/* 🛠️ Logic: Show line-by-line if RAW, show single aggregated block if RENDER */}
                {viewMode === 'render' ? (
                  <>
                    {/* Render system/meta messages first */}
                    {output.filter(l => l.type !== 'out').map((line, i) => (
                      <div key={`meta-${i}`} className="flex gap-3">
                        <span className="text-neutral-600 select-none">›</span>
                        <span className={line.type === 'system' ? 'text-neutral-500 italic' : 'text-violet-400 font-bold'}>
                          {line.text}
                        </span>
                      </div>
                    ))}
                    {/* Single Aggregated Math Block */}
                    {aggregatedMath && (
                      <div className="py-4 overflow-x-auto no-scrollbar bg-white/5 rounded-2xl px-6 my-2 border border-white/5 shadow-2xl">
                        <MathJax dynamic hideUntilFirstTypeset>{`\\[ ${aggregatedMath} \\]`}</MathJax>
                      </div>
                    )}
                  </>
                ) : (
                  // ✅ Traditional Line-by-Line for RAW mode
                  output.map((line, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-neutral-600 select-none">›</span>
                      <span className={line.type === 'system' ? 'text-neutral-500 italic' : line.type === 'success' ? 'text-violet-400 font-bold' : 'text-white'}>
                        <span className="whitespace-pre-wrap">{line.text}</span>
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-violet-500" /> Compiler Version
              </h4>
              <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-neutral-300 outline-none">
                <option>Velvex 1.2.0 (Wasm Native)</option>
              </select>
            </div>
          </div>
        </main>

        <style>{`
          .velvex-editor textarea, .velvex-editor pre { white-space: pre !important; outline: none !important; }
          .velvex-editor .token.keyword { color: #a78bfa; font-weight: bold; }
          .velvex-editor .token.comment { color: #525252; font-style: italic; }
          .velvex-editor .token.punctuation { color: #737373; }
          .velvex-editor .token.operator { color: #c084fc; }
          .velvex-editor .token.variable { color: #e5e5e5; }
          .velvex-editor .token.string { color: #a78bfa !important; }
          .velvex-editor .token.string .token.inner-text { color: #22c55e !important; font-style: italic; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .MathJax { color: white !important; }
        `}</style>
      </div>
    </MathJaxContext>
  );
}

function FileCode({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" /><path d="m10 13-2 2 2 2" /><path d="m14 17 2-2-2-2" />
    </svg>
  );
}
