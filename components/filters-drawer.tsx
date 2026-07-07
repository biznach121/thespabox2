"use client";

import { useEffect } from "react";
import { useBodyScrollLock } from "@/components/use-body-scroll-lock";

/** Reusable slide-over filter drawer + chips, shared by /services and /book. */

export function FiltersDrawer({
  open,
  onClose,
  resultCount,
  onClear,
  hasActiveFilters,
  children,
}: {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  onClear: () => void;
  hasActiveFilters: boolean;
  children: React.ReactNode;
}) {
  // Lock body scroll + close on Escape while open.
  useBodyScrollLock(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[320] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#402720]/52 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filter services"
        className={`absolute right-0 top-0 flex h-full w-[min(90vw,380px)] flex-col bg-[#f3f0e8] text-[#402720] shadow-[0_28px_90px_rgba(64,39,32,0.28)] transition-transform duration-300 ease-out md:w-[max(380px,45vw)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#402720]/12 px-6 py-5">
          <div>
            <p className="spabox-eyebrow m-0">Refine</p>
            <h2 className="m-0 font-serif text-[28px] font-light leading-none text-[#402720]">Filters</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#402720]/12 bg-[#f3f0e8] text-[#402720] transition-colors hover:bg-[#d8d3c5]"
          >
            ✕
          </button>
        </header>

        <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">{children}</div>

        <footer className="flex items-center gap-3 border-t border-[#402720]/12 px-6 py-4">
          <button
            type="button"
            onClick={onClear}
            disabled={!hasActiveFilters}
            className="h-12 flex-1 rounded-full border border-[#402720]/16 bg-transparent text-sm font-semibold text-[#402720] transition-colors hover:border-[#402720]/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 rounded-full bg-[#402720] text-sm font-semibold text-[#f3f0e8] transition-colors hover:bg-[#2f1d18]"
          >
            Show {resultCount}
          </button>
        </footer>
      </aside>
    </div>
  );
}

export function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7 last:mb-0">
      <p className="mb-3 text-[12px] font-bold uppercase tracking-wide text-[#82785f]">{title}</p>
      {children}
    </div>
  );
}

export function ToggleChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-[#402720] bg-[#402720] text-[#f3f0e8]"
          : "border-[#402720]/16 bg-[#f3f0e8] text-[#402720] hover:border-[#402720]/40",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function FilterPill({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#402720] py-1 pl-3 pr-1.5 text-[13px] font-semibold text-[#f3f0e8]">
      {children}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove filter"
        className="grid h-5 w-5 place-items-center rounded-full bg-[#f3f0e8]/20 text-[11px] transition-colors hover:bg-[#f3f0e8]/35"
      >
        ✕
      </button>
    </span>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function FilterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
