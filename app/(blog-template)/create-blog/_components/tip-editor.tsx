"use client";

import React, { useState } from "react";
import { SimpleTipTap } from "@/components/content-editor/simple-tiptap";
import { type JSONContent } from "@tiptap/core";

interface TipEditorProps {
  content: {
    title: string;
    text: string;
    json?: JSONContent;
  };
  onChange: (content: any) => void;
}

export function TipEditor({ content, onChange }: TipEditorProps) {
  const handleContentChange = (newText: string) => {
    onChange({
      ...content,
      text: newText,
    });
  };

  const handleTitleChange = (newTitle: string) => {
    onChange({
      ...content,
      title: newTitle,
    });
  };

  return (
    <div className="space-y-4">      
      <div className="relative my-4 rounded-lg bg-purple-100 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div 
            className="font-semibold text-purple-900 border-b border-transparent hover:border-purple-900 focus-within:border-purple-900 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTitleChange(e.currentTarget.textContent || "Tip")}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
          >
            {content.title || "Tip"}
          </div>
        </div>
        <div className="text-purple-800">
          <SimpleTipTap
            content={content.text || ""}
            onChange={handleContentChange}
            className="min-h-[120px]"
            placeholder="Write your tip here..."
          />
        </div>
      </div>
    </div>
  );
}
