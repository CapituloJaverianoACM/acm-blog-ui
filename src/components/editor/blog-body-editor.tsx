"use client";

import Toolbar from "@/components/editor/editor-tool-bar";

export default function BlogBodyEditor() {
    return(
        <div>
            <Toolbar></Toolbar>
            <textarea
            placeholder="Escribe el contenido aquí..."
            rows={6}
            className="w-full px-4 py-2 border rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
        </div>
    );
}