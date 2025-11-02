"use client";

import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDisplayProps {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
}

export function CodeDisplay({
  code,
  language,
  fileName,
  showLineNumbers = true,
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-mono mb-6 border-4 border-black bg-gray-900 overflow-hidden">
      {fileName && (
        <div className="flex justify-between items-center bg-gray-800 px-4 py-2 border-b-4 border-black">
          <span className="text-white font-mono">{fileName}</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-white hover:text-gray-300 font-mono"
          >
            {copied ? (
              <>
                <Check size={16} /> COPIED!
              </>
            ) : (
              <>
                <Clipboard size={16} /> COPY CODE
              </>
            )}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={nightOwl}
        showLineNumbers={showLineNumbers}
        customStyle={{ margin: 0, borderRadius: 0 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
