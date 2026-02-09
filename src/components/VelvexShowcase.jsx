import React, { useState } from 'react';
import { 
  Code, FileText, Sparkles, ChevronLeft, ChevronRight, 
  Copy, Check, Eye, ArrowRight 
} from 'lucide-react';

const EXAMPLES = [
  {
    id: 'induction',
    title: 'Induction',
    velvet: `def theorem fib(n: Nat):
  F(0) = 0
  F(1) = 1
  F(n) = F(n-1) + F(n-2)
  
proof by induction on n
end`,
    latex: `\\begin{theorem}\n  F(0)=0, F(1)=1 \\\\\n  F(n) = F(n-1) + F(n-2)\n\\end{theorem}\n\\begin{proof}\n  By induction on $n$.\n\\end{proof}`,
    rendered: (
      <div className="space-y-4 text-center w-full">
        <div className="text-lg font-serif text-white/90">Theorem 1.1</div>
        <div className="p-4 bg-white/5 rounded-xl italic border border-white/10 text-sm leading-relaxed">
          {`For all n ∈ ℕ, the sequence is defined as Fn = Fn-1 + Fn-2.`}
        </div>
        <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Proof. By induction on n. ■</div>
      </div>
    )
  },
  {
    id: 'matrix',
    title: 'Linear Algebra',
    velvet: `let I = matrix(3, 3):
  [1, 0, 0]
  [0, 1, 0]
  [0, 0, 1]

render I * vector(x, y, z)`,
    latex: `I = \\begin{pmatrix} \n  1 & 0 & 0 \\\\ \n  0 & 1 & 0 \\\\ \n  0 & 0 & 1 \n\\end{pmatrix}\n\\mathbf{I} \\cdot \\vec{v}`,
    rendered: (
      <div className="flex items-center justify-center w-full h-full scale-90">
        <div className="flex items-center gap-4 text-xl font-serif">
          <span>I =</span>
          <div className="flex items-center">
            <div className="h-16 w-2 border-l-2 border-t-2 border-b-2 border-white/40" />
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 px-3 text-base">
              <span>1</span><span>0</span><span>0</span>
              <span>0</span><span>1</span><span>0</span>
              <span>0</span><span>0</span><span>1</span>
            </div>
            <div className="h-16 w-2 border-r-2 border-t-2 border-b-2 border-white/40" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'calculus',
    title: 'Calculus',
    velvet: `int from -inf to inf:
  exp(-x^2) dx = sqrt(pi)`,
    latex: `\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}`,
    rendered: (
      <div className="flex items-center justify-center w-full h-full text-2xl font-serif italic text-white tracking-wide">
        <span className="text-4xl mr-1">∫</span>
        <div className="flex flex-col text-[10px] -mt-1 mr-1 opacity-60">
          <span>∞</span>
          <span className="mt-2">-∞</span>
        </div>
        <span className="mr-2">e<sup className="text-xs">-x²</sup> dx = √π</span>
      </div>
    )
  }
];

export default function VelvexShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(null);

  const next = () => setActiveIndex((prev) => (prev + 1) % EXAMPLES.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + EXAMPLES.length) % EXAMPLES.length);

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">See Velvet in action</h2>
          <p className="text-neutral-500 font-medium text-base">Watch logic transform into visual clarity.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            {EXAMPLES.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeIndex === idx ? 'bg-white text-black shadow-lg' : 'text-neutral-500 hover:text-white'
                }`}
              >
                {ex.title}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Showcase Grid */}
      <div className="grid lg:grid-cols-3 gap-6 items-stretch">
        <ShowcaseCard 
          label="Velvet Source" 
          icon={<Code className="w-4 h-4 text-violet-400" />}
          onCopy={() => copy(EXAMPLES[activeIndex].velvet, 'velvet')}
          isCopied={copied === 'velvet'}
        >
          <pre className="text-[13px] font-mono text-violet-200/60 leading-relaxed whitespace-pre-wrap">
            {EXAMPLES[activeIndex].velvet}
          </pre>
        </ShowcaseCard>

        <ShowcaseCard 
          label="LaTeX Intermediate" 
          icon={<FileText className="w-4 h-4 text-blue-400" />}
          onCopy={() => copy(EXAMPLES[activeIndex].latex, 'latex')}
          isCopied={copied === 'latex'}
        >
          <pre className="text-[13px] font-mono text-blue-200/40 leading-relaxed whitespace-pre-wrap">
            {EXAMPLES[activeIndex].latex}
          </pre>
        </ShowcaseCard>

        <div className="relative group min-h-[320px]">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 to-blue-600/10 rounded-[2rem] blur opacity-25" />
          <div className="relative h-full bg-neutral-900/40 border border-white/10 rounded-[2rem] p-8 backdrop-blur-3xl flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-neutral-500">Rendered Result</span>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {EXAMPLES[activeIndex].rendered}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({ label, icon, children, onCopy, isCopied }) {
  return (
    <div className="bg-neutral-900/40 border border-white/5 rounded-[2rem] p-8 backdrop-blur-md flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-[10px] font-bold uppercase tracking-[2px] text-neutral-500">{label}</span>
        </div>
        <button onClick={onCopy} className="p-2 hover:bg-white/5 rounded-lg text-neutral-600 hover:text-white transition-colors">
          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}