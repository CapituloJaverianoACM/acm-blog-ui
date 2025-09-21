// app/components/Header.tsx
"use client";

import { FaMoon, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function BlogHeader() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);
  
  return (
    <header className="bg-[#004AF5] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo + subtítulo */}
        <div>
          <h1 className="text-2xl font-bold italic">ACM</h1>
          <p className="text-xs">Capitulo Javeriano</p>
        </div>

        {/* Iconos */}
        <div className="flex items-center gap-4">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-blue-700"
            onClick={() => {
              console.log("dark mode:", !dark);
              setDark(!dark);
            }}>
            <FaMoon />
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white hover:bg-blue-700"
            onClick={() => console.log("User profile clicked")}
            >
            <FaUser />
          </button>
        </div>
      </div>
    </header>
  );
}
