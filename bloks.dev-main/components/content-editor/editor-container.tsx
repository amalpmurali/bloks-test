"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the SimpleTipTap component with SSR disabled
const SimpleTipTap = dynamic(
  () =>
    import("@/components/content-editor/simple-tiptap").then(
      (mod) => mod.SimpleTipTap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border rounded-md bg-background p-4">
        Loading editor...
      </div>
    ),
  }
);

export default function ContentEditor() {
  const [content, setContent] = useState("");

  const updateContent = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="min-h-[200px]">
      <SimpleTipTap
        content={content}
        onChange={updateContent}
        className="min-h-[200px]"
      />
    </div>
  );
}
