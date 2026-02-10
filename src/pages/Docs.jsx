import React, { useState } from "react";
import { Link, useLocation, Outlet, useParams } from "react-router-dom";
import {
  Search, ChevronRight, ExternalLink
} from "lucide-react";

export default function Docs() {
  const location = useLocation();
  const { section, id } = useParams();

  // 🔹 TOC STATE (fed by DocPage)
  const [toc, setToc] = useState([]);

  // ✅ Helper to check if a nav item is active
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-violet-500/30">
      <div className="max-w-[1600px] mx-auto flex">

        {/* ================= LEFT SIDEBAR ================= */}
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
              <NavItem to="/docs/getting-started/introduction" label="Introduction" active={isActive("introduction")} />
              <NavItem to="/docs/getting-started/installation" label="Installation" active={isActive("installation")} />
              <NavItem to="/docs/getting-started/quick-start" label="Quick Start" active={isActive("quick-start")} />
            </NavGroup>

            <NavGroup title="Core Concepts">
              <NavItem to="/docs/core-concepts/type-system" label="Type System" active={isActive("type-system")} />
              <NavItem to="/docs/core-concepts/memory-safety" label="Memory Safety" active={isActive("memory-safety")} />
              <NavItem to="/docs/core-concepts/concurrency" label="Concurrency" active={isActive("concurrency")} />
              <NavItem to="/docs/core-concepts/optimization-flags" label="Optimization Flags" active={isActive("optimization-flags")} />
            </NavGroup>

            <NavGroup title="Standard Library">
              <NavItem to="/docs/std/vv-core" label="vv::core" active={isActive("vv-core")} />
              <NavItem to="/docs/std/vv-math" label="vv::math" active={isActive("vv-math")} />
              <NavItem to="/docs/std/vv-network" label="vv::network" active={isActive("vv-network")} />
            </NavGroup>
          </nav>
        </aside>

        {/* ================= CENTER CONTENT ================= */}
        <main className="flex-1 px-6 py-12 md:px-12 lg:px-20 max-w-full min-h-screen">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center gap-2 text-sm text-neutral-500 font-medium capitalize">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3" />
            <span>{section?.replace("-", " ")}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-violet-400">{id?.replace("-", " ")}</span>
          </div>

          {/* 🚀 Content from DocPage */}
          <Outlet context={{ toc, setToc }} />
        </main>

        {/* ================= RIGHT SIDEBAR (TOC) ================= */}
        
      </div>
    </div>
  );
}

/* ================= NAV HELPERS ================= */

function NavGroup({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-neutral-600 uppercase tracking-[2px] px-4">
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavItem({ to, label, active = false }) {
  return (
    <Link
      to={to}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-violet-600/10 text-violet-400"
          : "text-neutral-500 hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}
