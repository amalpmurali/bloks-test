"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeDisplay } from "@/components/common/code-display";

interface FileData {
  name: string;
  path: string;
  language: string;
  content: string;
}

interface ComponentShowcaseProps {
  title?: string;
  description?: string;
  previewComponent: React.ReactNode;
  codeFiles: FileData[];
  className?: string;
}

export function ComponentShowcase({
  title,
  description,
  previewComponent,
  codeFiles,
  className,
}: ComponentShowcaseProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview"
  );
  const [activeCodeFile, setActiveCodeFile] = React.useState<FileData | null>(
    codeFiles.length > 0 ? codeFiles[0] : null
  );

  return (
    <div className={cn("", className)}>
      {/* Title and description (optional) */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-mono font-bold mb-2 relative inline-block">
              <span className="relative z-10">{title}</span>
              <div className="absolute -left-2 -bottom-1 w-full h-2 bg-yellow-400 z-0"></div>
            </h2>
          )}
          {description && <p className="text-lg mt-2">{description}</p>}
        </div>
      )}

      {/* Unified component with tabs and content */}
      <div className="mb-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        {/* Primary tabs - Preview vs Code */}
        <div className="flex bg-gray-100 border-b-4 border-black">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "px-6 py-3 font-mono font-bold border-r-4 border-black",
              activeTab === "preview"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            )}
          >
            PREVIEW
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "px-6 py-3 font-mono font-bold",
              activeTab === "code"
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            )}
          >
            CODE
          </button>
        </div>

        {/* Content area */}
        {activeTab === "preview" ? (
          <div className="p-6">{previewComponent}</div>
        ) : (
          <div>
            {/* Code file tabs */}
            {codeFiles.length > 1 && (
              <div className="flex border-b-4 border-black overflow-x-auto">
                {codeFiles.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => setActiveCodeFile(file)}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 font-mono text-sm border-r-4 border-black",
                      activeCodeFile?.path === file.path
                        ? "bg-gray-200 font-bold"
                        : "bg-white hover:bg-gray-100"
                    )}
                  >
                    {file.name}
                  </button>
                ))}
              </div>
            )}

            {/* Code display */}
            {activeCodeFile && (
              <CodeDisplay
                code={activeCodeFile.content}
                language={activeCodeFile.language}
                fileName={activeCodeFile.name}
                showLineNumbers={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
