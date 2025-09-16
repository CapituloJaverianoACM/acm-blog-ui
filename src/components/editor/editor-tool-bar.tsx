// components/Toolbar.tsx
import { Image, Save, Type } from "lucide-react";

export default function Toolbar() {
  return (
    <div className="w-full bg-blue-600 rounded-t-2xl px-4 py-2 flex items-center gap-6">
      {/* Icono de imagen */}
      <button className="flex items-center gap-2 text-white hover:opacity-80 transition">
        <Image size={20} />
      </button>

      {/* Icono de texto */}
      <button className="flex items-center gap-2 text-white hover:opacity-80 transition">
        <Type size={20} />
      </button>

      {/* Guardado */}
      <button className="flex items-center gap-2 text-white font-medium hover:opacity-80 transition">
        <Save size={20} />
        Guardado
      </button>
    </div>
  );
}
