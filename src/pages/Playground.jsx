import React, { useState, useEffect, useRef } from "react";
import EditorImport from "react-simple-code-editor";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import Prism from "prismjs";
import { highlight } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "../components/velvex-grammar.js";
import {
  Play,
  RotateCcw,
  Share2,
  Settings,
  Terminal as TerminalIcon,
  ChevronRight,
  Copy,
  Layout,
  Cpu,
  Save,
  Check,
  Eye,
  Code,
} from "lucide-react";

// ✅ Normalize Editor (ESM / Vite safe)
const CodeEditor = EditorImport?.default ?? EditorImport;

export default function Playground() {
  const [code, setCode] = useState(
    `Ignore[Welcome to the Velvex Playground]
f(Frac[x][2]) = Pdiff[2][y][x,m]

Txt[Hello World!]`,
  );
  const [viewMode, setViewMode] = useState("raw");
  const [output, setOutput] = useState([
    { type: "system", text: "Velvex Runtime v1.2.0 initialized..." },
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const workerRef = useRef(null);

  // ================= Worker logic (UNCHANGED) =================
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("velvex.worker.js", import.meta.url),
    );

    workerRef.current.onmessage = (e) => {
      const { type, text } = e.data;
      if (type === "stdout") {
        setOutput((prev) => [...prev, { type: "out", text }]);
      } else if (type === "stderr") {
        setOutput((prev) => [
          ...prev,
          { type: "system", text: `Error: ${text}` },
        ]);
      } else if (type === "done") {
        setIsCompiling(false);
        setOutput((prev) => [
          ...prev,
          { type: "success", text: "Compilation successful" },
        ]);
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  // ================= Sanitizer (UNCHANGED) =================
  const sanitizeCode = (rawCode) => {
    return rawCode
      .replace(/\r/g, "") // 1. Remove carriage returns
      .replace(/\n/g, " \\n ") // 2. Map newlines to literal " \n "
      .replace(/[+\-=*/()]/g, (match) => ` ${match} `); // 3. Isolate operators: +, -, =, *, /, (, )
  };

  const handleRun = () => {
    if (isCompiling) return;

    const sanitized = sanitizeCode(code);
    console.log(sanitized);
    setIsCompiling(true);
    setOutput((prev) => [...prev, { type: "system", text: "Compiling..." }]);
    workerRef.current.postMessage({ code: sanitized });
  };

  const clearOutput = () =>
    setOutput([{ type: "system", text: "Console cleared." }]);

  return (
    <div className="h-screen flex flex-col bg-neutral-950 text-neutral-200 selection:bg-violet-500/30 overflow-hidden">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4">
        {/* ================= Editor Pane ================= */}
        <div className="flex-1 flex flex-col bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden group transition-all duration-500 hover:border-violet-500/20">
          <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <span className="text-xs font-mono text-neutral-500 tracking-wider flex items-center gap-2">
                <FileCode className="w-3 h-3" /> main.vel
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/5 rounded-lg text-neutral-500">
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleRun}
                disabled={isCompiling}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${
                  isCompiling
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20"
                }`}
              >
                <Play
                  className={`w-4 h-4 ${isCompiling ? "animate-pulse" : "fill-current"}`}
                />
                {isCompiling ? "Compiling..." : "Run"}
              </button>
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Line numbers */}
            <div className="w-12 bg-black/20 border-r border-white/5 py-6 flex flex-col items-center text-[10px] font-mono text-neutral-600 select-none">
              {code.split("\n").map((_, i) => (
                <span key={i} className="leading-6">
                  {i + 1}
                </span>
              ))}
            </div>

            {/* ✅ Syntax-highlighted editor */}
            <CodeEditor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                highlight(code, Prism.languages.velvex, "velvex")
              }
              padding={24}
              className="velvex-editor flex-1 bg-transparent outline-none font-mono text-sm leading-6 text-neutral-300"
              style={{ fontFamily: '"Fira Code", monospace' }}
            />
          </div>
        </div>

        {/* ================= Console Pane ================= */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="flex-1 flex flex-col bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <TerminalIcon className="w-3.5 h-3.5" /> Output
                </div>

                {/* Mode Toggle Switch */}
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setViewMode("raw")}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${viewMode === "raw" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-400"}`}
                  >
                    <Code className="w-3 h-3" /> RAW
                  </button>
                  <button
                    onClick={() => setViewMode("render")}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${viewMode === "render" ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20" : "text-neutral-500 hover:text-neutral-400"}`}
                  >
                    <Eye className="w-3 h-3" /> RENDER
                  </button>
                </div>
              </div>

              <button
                onClick={clearOutput}
                className="text-neutral-500 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-2 custom-scrollbar">
              {output.map((line, i) => (
                <div key={i} className="flex gap-3">
                  {viewMode != "render" ? <span className="text-neutral-600 select-none">›</span> : <></>}
                  
                  <span
                    className={
                      line.type === "system"
                        ? "text-neutral-500 italic"
                        : line.type === "success"
                          ? "text-violet-400 font-bold"
                          : "text-white"
                    }
                  >
                    {/* Render Logic: If output type is 'out' and mode is 'render', use KaTeX */}
                    {line.type === "out" && viewMode === "render" ? (
                      <div className="py-2 overflow-x-auto">
                        <BlockMath math={line.text} />
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{line.text}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compiler Settings (UNCHANGED) */}
          <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-[2px] mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-500" /> Compiler Version
            </h4>
            <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-neutral-300">
              <option>Velvex 1.2.0 (Wasm Native)</option>
            </select>
          </div>
        </div>
      </main>

      {/* Prism colors */}
      <style>{`
        .velvex-editor textarea {
          white-space: pre !important;
          outline: none !important;
        }
        .velvex-editor pre {
          white-space: pre !important;
        }
        .velvex-editor .token.keyword { color: #a78bfa; font-weight: bold; }
        .velvex-editor .token.comment { color: #525252; font-style: italic; }
        .velvex-editor .token.punctuation { color: #737373; }
        .velvex-editor .token.operator { color: #c084fc; }
        .velvex-editor .token.variable { color: #e5e5e5; }
        .velvex-editor .token.string { color: #8b5cf6; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }

        .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Ensure the math looks clean */
  .katex-display { 
    margin: 0 !important; 
    text-align: left !important; 
  }
  .katex { 
    font-size: 1.1em !important; 
    color: white !important; 
  }

.velvex-editor .token.string {
  color: #a78bfa !important;
}

.velvex-editor .token.string .token.inner-text {
  color: #22c55e !important; 
  font-style: italic;
}
.velvex-editor .token.string .token.punctuation {
  color: #737373 !important;
}
      `}</style>
    </div>
  );
}

function FileCode({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  );
}
