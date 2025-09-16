"use client";

import React, { useEffect, useState } from "react";

export default function BlogTitle() {
  const [title, setTitle] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    if (title !== "") setLastUpdated(new Date());
  }, [title]);

  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);

  return (
    <div className="w-full px-8 md:px-20 pt-8 md:pt-10">
      {/* fila: título a la izquierda, botón a la derecha */}
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del blog"
            className={[
              "font-liguria",
              "text-3xl md:text-4xl leading-tight",
              "bg-transparent border-none outline-none focus:ring-0",
              "text-gray-100 placeholder-gray-400",
              "w-full",
            ].join(" ")}
          />
          <p className="mt-1 text-sm text-gray-400 font-montserrat">
            Última actualización {formatDate(lastUpdated)}
          </p>
        </div>

        {/* botón estilo mockup */}
        <button
          type="button"
          className="ml-4 px-8 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-montserrat rounded-md  transition-colors shadow-md"
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
