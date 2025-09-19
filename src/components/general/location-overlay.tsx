"use client";

import React from "react";

type LocationOverlayProps = {
  open: boolean;
  onClose: () => void;
  onSelect?: (value: string) => void;
  title: string; 
};

const SUGGESTIONS = [
  "Pontificia Universidad Javeriana, Bogotá",
  "EAFIT Universidad, Medellín",
  "Universidad Nacional, Bogotá",
  "Universidad de los Andes, Bogotá",
];

export default function LocationOverlay({
  open, onClose, onSelect, title,
}: LocationOverlayProps) {
  const [query, setQuery] = React.useState("");
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      if (e.target instanceof Node && overlayRef.current.contains(e.target)) return;
      onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const fecha = new Intl.DateTimeFormat("es-CO", {
    day: "numeric", month: "numeric", year: "numeric",
  }).format(new Date());

  const filtered = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" aria-modal="true" role="dialog">
      <div className="flex items-start justify-center pt-24 px-4 md:px-8 lg:px-10">
        <div ref={overlayRef} className="w-full max-w-3xl">

          {/* NEW: panel wrapper to simulate the card with border and background */}
          <div className="rounded-[28px] border-2 border-[#0F172A] bg-[#D8E2F0] p-6 md:p-8 shadow-xl">
            {/* Header with the blog title */}
            <h2
              id="overlay-title"
              className="mb-4 text-2xl md:text-3xl font-liguria text-slate-900 truncate"
              title={title || "Sin título"}
            >
              {title || "Sin título"}
            </h2>

            {/* Input Container */}
            <div className="relative">
              <div className="flex items-center bg-[#0F172A] text-slate-100 rounded-full h-14 px-6 shadow-xl">
                <input
                  aria-labelledby="overlay-title"
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Añadir Ubicación"
                  className="flex-1 bg-transparent outline-none placeholder-slate-400 text-base md:text-lg"
                />
                <span className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A8A]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden="true">
                    <path d="M12 22s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z"
                          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                  </svg>
                </span>
              </div>

              {/* Suggestion List */}
              <div className="mt-2 rounded-3xl bg-[#0F172A] text-slate-100 shadow-2xl overflow-hidden">
                {filtered.length === 0 ? (
                  <div className="px-6 py-4 text-slate-400">Sin resultados</div>
                ) : (
                  <ul className="divide-y divide-slate-700/60">
                    {filtered.map((item) => (
                      <li
                        key={item}
                        className="px-6 py-3 hover:bg-slate-800/80 cursor-pointer text-base md:text-lg"
                        onClick={() => {
                          onSelect?.(item);
                          setQuery(item);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm md:text-base text-slate-700">
                Fecha Publicación: {fecha}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="ml-4 px-8 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-montserrat rounded-md transition-colors shadow-md"
              >
                Publicar
              </button>
            </div>
          </div>
          {/* END panel wrapper */}

        </div>
      </div>
    </div>
  );
}
