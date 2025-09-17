"use client";

import Header from "@/components/general/acm-header";
import BlogBodyEditor from "@/components/editor/blog-body-editor";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/*Title*/}

      {/* Editor Section */}
      <div className="max-w-9xl mx-auto mt-8 p-4">
        <BlogBodyEditor></BlogBodyEditor>
      </div>
    </div>
  );
}
