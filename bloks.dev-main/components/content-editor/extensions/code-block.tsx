import React, { useState, useCallback } from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NodeViewProps } from '@tiptap/core';

export interface CodeBlockAttributes {
  language: string;
}

export const CodeBlock = ({
  node,
  updateAttributes,
}: {
  node: NodeViewProps['node'];
  updateAttributes: (attrs: Partial<CodeBlockAttributes>) => void;
}) => {
  const [language, setLanguage] = useState(node.attrs.language || "typescript");

  const languages = [
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
    { value: "astro", label: "Astro" },
  ];

  const handleLanguageChange = useCallback(
    (value: string) => {
      setLanguage(value);
      updateAttributes({ language: value });
    },
    [updateAttributes]
  );

  return (
    <NodeViewWrapper className="relative my-4 overflow-hidden">
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 border-t border-x border-gray-200 rounded-t-lg px-4 py-2">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[140px] bg-transparent border-0 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 transition-colors">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                className="text-sm"
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/90" />
          <div className="w-3 h-3 rounded-full bg-green-400/90" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-b-lg p-4 font-mono text-sm">
        <NodeViewContent className="text-gray-800 prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent" />
      </div>
    </NodeViewWrapper>
  );
};
