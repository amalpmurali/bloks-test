"use client";

import React, { useState } from "react";
import { CodeDisplay } from "./code-display";
import { Loader2, FileCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeFile {
  path: string;
  displayName?: string;
}

interface ComponentCodeTabsProps {
  componentName: string;
  files: CodeFile[];
  className?: string;
  customContent?: Record<string, React.ReactNode>;
}

export function ComponentCodeTabs({
  componentName,
  files,
  className = "",
  customContent,
}: ComponentCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [codeData, setCodeData] = useState<
    Record<string, { content: string; language: string; fileName: string }>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});

  // Lazy load the code only when a tab is clicked
  const handleTabClick = async (path: string) => {
    setActiveTab(path);

    // Only fetch if we haven't already fetched this file
    if (!codeData[path] && !loading[path]) {
      setLoading((prev) => ({ ...prev, [path]: true }));

      try {
        const response = await fetch(
          `/api/component-code?component=${componentName}&path=${path}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch code: ${response.statusText}`);
        }

        const data = await response.json();
        setCodeData((prev) => ({ ...prev, [path]: data }));
        setError((prev) => {
          const newErrors = { ...prev };
          delete newErrors[path];
          return newErrors;
        });
      } catch (err) {
        console.error(`Error fetching ${path}:`, err);
        setError((prev) => ({
          ...prev,
          [path]: err instanceof Error ? err.message : "Failed to load code",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [path]: false }));
      }
    }
  };

  return (
    <div
      className={`border-4 border-black bg-white p-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 ${className}`}
    >
      <div className="bg-black p-4 border-b-4 border-red-500 flex items-center">
        <FileCode className="text-white h-6 w-6 mr-3" />
        <h2 className="text-xl font-mono font-bold uppercase text-white">
          COMPONENT CODE
        </h2>
      </div>

      {/* Using the shadcn UI Tabs component with brutalist styling */}
      <Tabs
        defaultValue={activeTab || ""}
        onValueChange={handleTabClick}
        className="w-full"
      >
        <TabsList className="flex w-full h-auto rounded-none border-b-4 border-black bg-gray-100 p-0 overflow-x-auto">
          {files.map((file) => (
            <TabsTrigger
              key={file.path}
              value={file.path}
              className="flex-shrink-0 font-mono text-sm uppercase px-4 py-3 rounded-none border-r-4 border-black data-[state=active]:bg-red-100 data-[state=active]:font-bold data-[state=active]:shadow-none"
            >
              {file.displayName || file.path.split("/").pop()}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Initial state - no tab selected */}
        {!activeTab && (
          <div className="flex flex-col items-center justify-center p-12 text-center border-4 border-dashed border-gray-300 m-6">
            <FileCode className="h-12 w-12 text-gray-400 mb-4" />
            <p className="font-mono uppercase text-gray-500 mb-2">
              SELECT A FILE TO VIEW CODE
            </p>
            <p className="text-sm text-gray-400">
              Click on any tab above to see the component code
            </p>
          </div>
        )}

        {/* Generate a TabsContent for each file */}
        {files.map((file) => (
          <TabsContent key={file.path} value={file.path} className="mt-0 p-0">
            {loading[file.path] && (
              <div className="flex flex-col items-center justify-center p-12">
                <Loader2 className="h-8 w-8 text-black animate-spin mb-4" />
                <p className="font-mono uppercase">LOADING CODE...</p>
              </div>
            )}

            {error[file.path] && (
              <div className="p-6 bg-red-100 border-l-4 border-red-500 m-6">
                <h4 className="font-mono font-bold uppercase mb-2">
                  ERROR LOADING CODE
                </h4>
                <p className="font-mono">{error[file.path]}</p>
              </div>
            )}

            {/* Custom content takes precedence if provided */}
            {customContent && customContent[file.path] ? (
              <div className="p-0">
                {customContent[file.path]}
              </div>
            ) : codeData[file.path] ? (
              <div className="p-6">
                <CodeDisplay
                  code={codeData[file.path].content}
                  language={codeData[file.path].language}
                  fileName={codeData[file.path].fileName}
                />
              </div>
            ) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
