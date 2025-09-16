// src/components/general/BlogTitle.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// Montserrat desde Google
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
});

// BC Liguria como fuente local
const bcLiguria = localFont({
  src: "/fonts/BCLiguria.woff2",
  weight: "400",
  style: "normal",
});

type Props = {
  defaultTitle?: string;
  className?: string;
};

export default function BlogTitle({ defaultTitle = "", className = "" }: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
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
    <div className={"w-full px-6 md:px-10 pt-6 md:pt-8 " + className}>
      {/* Editable title */}
      <input
        type="text"
        placeholder="Título del blog"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={[
            // padding para que se parezca al mock
            "w-full px-6 md:px-10 pt-6 md:pt-8",
            // tipografía BC Liguria
            "font-liguria text-3xl md:text-4xl leading-tight",
            // apariencia de H1 editable
            "bg-transparent border-none outline-none focus:ring-0",
            // colores
            "text-gray-100 placeholder-gray-400",
        ].join(" ")}
        />

        <p className="mt-1 text-sm text-gray-400 font-montserrat px-6 md:px-10">
        Última actualización {formatDate(lastUpdated)}
        </p>

    </div>
  );
}
