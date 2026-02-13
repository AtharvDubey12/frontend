import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MathJax } from "better-react-mathjax";

// ✅ PRISM SETUP
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "./velvex-grammar.js";

// ----------------------------------
// Helpers
// ----------------------------------
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();

// Safely extract text from React children
const getTextFromChildren = (children) => {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(getTextFromChildren).join("");
  if (children?.props?.children)
    return getTextFromChildren(children.props.children);
  return "";
};

// ----------------------------------
// Main Page
// ----------------------------------
export default function DocPage() {
  const { section, id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const module = await import(`../docs/${section}/${id}.md?raw`);
        setContent(module.default);
      } catch (err) {
        setContent("# 404 - Not Found");
      }
    };
    loadContent();
  }, [section, id]);

  // ----------------------------------
  // Markdown Components
  // ----------------------------------
  const components = {
    h1: ({ children }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <h1
          id={id}
          className="text-5xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-400"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="text-3xl font-bold mb-6 mt-12 text-white flex items-center gap-3"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="text-2xl font-bold mb-4 mt-8 text-neutral-100"
        >
          {children}
        </h3>
      );
    },
    p: ({ children }) => (
      <p className="text-lg text-neutral-400 leading-relaxed mb-6">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="space-y-3 mb-8 list-disc list-inside text-neutral-400">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    hr: () => <hr className="border-white/10 my-12" />,

    // ----------------------------------
    // Code Blocks
    // ----------------------------------
    code({ inline, className, children }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeRef = useRef(null);

      useEffect(() => {
        if (codeRef.current) {
          Prism.highlightElement(codeRef.current);
        }
      }, []);

      if (language === "math") {
        return (
          <div className="my-10 p-8 bg-white/5 border border-white/10 rounded-3xl shadow-2xl flex justify-center overflow-x-auto">
            <MathJax dynamic>
              {`\\[${String(children).trim()}\\]`}
            </MathJax>
          </div>
        );
      }

      if (!inline) {
        return (
          <div className="my-8 bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden text-sm shadow-xl">
            <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                {language || "code"}
              </span>
            </div>

            <pre
              className={`language-${language} p-6 !bg-transparent !m-0`}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 400,
                fontVariantLigatures: "none",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              <code
                ref={codeRef}
                className={`language-${language} text-neutral-300 leading-relaxed`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontVariantLigatures: "none",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {children}
              </code>
            </pre>
          </div>
        );
      }

      return (
        <code className="bg-white/5 px-1.5 py-0.5 rounded text-violet-300 font-mono text-sm">
          {children}
        </code>
      );
    },
  };

  // ----------------------------------
  // Layout
  // ----------------------------------
  return (
    <div className="max-w-7xl mx-auto">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
