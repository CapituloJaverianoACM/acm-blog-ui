"use client";

import BlogBodyEditor from "@/components/editor/blog-body-editor";
import BlogHeader from "@/components/general/blog-header";
import BlogTitle from "@/components/general/blog-title";


export default function Blog() {
  return (
    <div className="bg-[var(--background)]">
      {/* Header */}
      <BlogHeader/>
      {/*Title*/}
      <BlogTitle/>
      {/* Editor Section */}
      <div className="w-full mx-auto mt-8 p-4 px-8 md:px-20 pt-8 md:pt-10">
        <BlogBodyEditor></BlogBodyEditor>
      </div>
    </div>
  );
}
