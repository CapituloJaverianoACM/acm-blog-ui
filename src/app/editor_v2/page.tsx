"use client";

import Header from "@/components/general/acm-header";
import BlogBodyEditor from "@/components/editor/blog-body-editor";
import BlogTitle from "@/components/general/blog-title";


export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/*Title*/}
      <BlogTitle/>
      {/* Editor Section */}
      <div className="max-w-9xl mx-auto mt-8 p-4">
        <BlogBodyEditor></BlogBodyEditor>
      </div>
    </div>
  );
}
