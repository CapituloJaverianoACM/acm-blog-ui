"use client";

import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

type LocationOverlayProps = {
  open: boolean;
  onClose: () => void;
  onSelect?: (value: string) => void; // UI text
  title: string;
  onSelectCoords?: (data: {
    lat: number;
    lng: number;
    placeId: string;
    description: string;
  }) => void;
};

const LIBRARIES: ("places")[] = ["places"];

export default function LocationOverlay(props: LocationOverlayProps) {
  // --- state (top-level)
  const [query, setQuery] = React.useState("");
  const [predictions, setPredictions] =
    React.useState<google.maps.places.AutocompletePrediction[]>([]);
  const [loadingPreds, setLoadingPreds] = React.useState(false);
  const [selected, setSelected] = React.useState<{
    placeId: string;
    description: string;
    lat?: number;
    lng?: number;
  } | null>(null);

  // controls when the suggestions list is visible
  const [showList, setShowList] = React.useState(false);

  // --- refs
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const placesSvcRef = React.useRef<google.maps.places.PlacesService | null>(
    null
  );
  const autoSvcRef =
    React.useRef<google.maps.places.AutocompleteService | null>(null);

  // --- load Google script once (idempotent)
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: LIBRARIES,
  });

  // helper (plain fn)
  const ensureServices = () => {
    if (!window.google?.maps?.places) return false;
    if (!autoSvcRef.current) {
      autoSvcRef.current = new window.google.maps.places.AutocompleteService();
    }
    if (!placesSvcRef.current) {
      placesSvcRef.current = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
    }
    return true;
  };

  // close with ESC
  React.useEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && props.onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [props.open, props.onClose]);

  // close when clicking outside
  React.useEffect(() => {
    if (!props.open) return;
    const handler = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      if (e.target instanceof Node && overlayRef.current.contains(e.target)) return;
      props.onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [props.open, props.onClose]);

  // reset visibility when the overlay opens
  React.useEffect(() => {
    if (!props.open) return;
    setShowList(false);
  }, [props.open]);

  // query -> predictions
  React.useEffect(() => {
    if (!props.open || !isLoaded) return;

    let cancelled = false;
    const run = () => {
      if (!query.trim()) {
        setPredictions([]);
        setSelected(null);
        return;
      }
      if (!ensureServices()) return;

      setLoadingPreds(true);
      autoSvcRef.current!.getPlacePredictions(
        { input: query, componentRestrictions: { country: ["co"] } },
        (res) => {
          if (cancelled) return;
          setPredictions(res ?? []);
          setLoadingPreds(false);
        }
      );
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [props.open, isLoaded, query]);

  // early returns (no hooks below)
  if (!props.open) return null;
  if (loadError) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center">
        <div className="bg-white/90 rounded-xl p-6 text-red-700">
          Error cargando Google Maps: {String(loadError.message || loadError)}
        </div>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center">
        <div className="bg-white/90 rounded-xl p-4 text-slate-700">Cargando mapas…</div>
      </div>
    );
  }

  // pick a prediction -> fetch details (lat/lng) and hide list
  const handlePickPrediction = (p: google.maps.places.AutocompletePrediction) => {
    if (!ensureServices()) return;
    setSelected({ placeId: p.place_id!, description: p.description! });
    setQuery(p.description || "");
    setPredictions([]);
    setShowList(false); // hide suggestions after picking

    placesSvcRef.current!.getDetails(
      {
        placeId: p.place_id!,
        fields: ["geometry", "formatted_address", "name", "place_id"],
      },
      (res, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          res?.geometry?.location
        ) {
          const lat = res.geometry.location.lat();
          const lng = res.geometry.location.lng();
          setSelected((cur) =>
            cur
              ? {
                  ...cur,
                  lat,
                  lng,
                  description: res.formatted_address || cur.description,
                }
              : cur
          );
        }
      }
    );
  };

  // publish -> emit text + coords and close
  const handlePublish = () => {
    const text = selected?.description || query.trim();
    if (text) props.onSelect?.(text);
    if (selected?.lat != null && selected?.lng != null && selected.placeId) {
      props.onSelectCoords?.({
        lat: selected.lat,
        lng: selected.lng,
        placeId: selected.placeId,
        description: selected.description,
      });
    }
    props.onClose();
  };

  const fecha = new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date());

  const hasTitle = !!props.title?.trim();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex items-start justify-center pt-24 px-4 md:px-8 lg:px-10">
        <div ref={overlayRef} className="w-full max-w-3xl">
          {/* panel wrapper */}
          <div className="rounded-[28px] border-2 border-[#0F172A] bg-[#D8E2F0] p-6 md:p-8 shadow-xl">
            {/* Header with the blog title (and fallback) */}
            <h2
              id="overlay-title"
              className="mb-1 text-2xl md:text-3xl font-liguria text-slate-900 truncate"
              title={hasTitle ? props.title : "Falta título"}
            >
              {hasTitle ? props.title : "Falta título"}
            </h2>
            {!hasTitle && (
              <p className="mb-3 text-sm text-slate-700">
                Escribe un título en la pantalla anterior.
              </p>
            )}

            {/* Input + suggestions (suggestions appear only while typing) */}
            <div className="relative">
              <div className="flex items-center bg-[#0F172A] text-slate-100 rounded-full h-14 px-6 shadow-xl">
                <input
                  aria-labelledby="overlay-title"
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => {
                    const v = e.target.value;
                    setQuery(v);
                    setShowList(v.trim().length > 0); // show results only when typing
                  }}
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

              {/* Suggestions list (conditional) */}
              {showList && (
                <div className="mt-2 rounded-3xl bg-[#0F172A] text-slate-100 shadow-2xl overflow-hidden">
                  {loadingPreds ? (
                    <div className="px-6 py-4 text-slate-400">Buscando…</div>
                  ) : predictions.length === 0 ? (
                    <div className="px-6 py-4 text-slate-400">Sin resultados</div>
                  ) : (
                    <ul className="divide-y divide-slate-700/60">
                      {predictions.map((item) => (
                        <li
                          key={item.place_id}
                          className="px-6 py-3 hover:bg-slate-800/80 cursor-pointer text-base md:text-lg"
                          onClick={() => handlePickPrediction(item)}
                        >
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Selection hint */}
              {selected?.lat != null && selected?.lng != null && (
                <p className="mt-2 text-sm text-slate-700">
                  Seleccionado: {selected.description} 
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm md:text-base text-slate-700">
                Fecha Publicación: {fecha}
              </p>
              <button
                type="button"
                onClick={handlePublish}
                className="ml-4 px-8 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-montserrat rounded-md transition-colors shadow-md disabled:opacity-60"
                disabled={!query.trim() && !selected}
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
