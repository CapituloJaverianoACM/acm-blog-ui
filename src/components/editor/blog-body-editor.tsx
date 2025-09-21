"use client";

import Toolbar from "@/components/editor/editor-tool-bar";

export default function BlogBodyEditor() {
    return(
        <div>
            <Toolbar></Toolbar>
            <textarea
            placeholder="Escribe el contenido aquí..."
            rows={6}
            className="text-black w-full px-4 py-2 bg-[#DDE5F8] border-0 rounded-b-lg outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
        </div>
    );
}