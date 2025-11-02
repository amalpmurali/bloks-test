"use client";

import { BackgroundPattern } from "@/components/common/background-patterns";
import { BlogComponent } from "./create-blog-container";
import { ImageIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface BlogPreviewProps {
  components: BlogComponent[];
}

// Component renderers for each component type
type ComponentRenderer = (component: BlogComponent) => ReactNode;

// Registry of component renderers
const componentRenderers: Record<string, ComponentRenderer> = {
  content: (component) => (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{
        __html: component.content.text,
      }}
    />
  ),

  image: (component) => (
    <figure className="my-4">
      {component.content.url ? (
        <img
          src={component.content.url}
          alt={component.content.caption || ""}
          className="w-full rounded-md"
        />
      ) : (
        <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
      )}
      {component.content.caption && (
        <figcaption className="text-sm text-center mt-2 text-muted-foreground">
          {component.content.caption}
        </figcaption>
      )}
    </figure>
  ),

  code: (component) => (
    <div className="my-4">
      {component.content.heading && (
        <h3 className="text-lg font-semibold mb-2">
          {component.content.heading}
        </h3>
      )}
      <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
        <pre>{component.content.code}</pre>
      </div>
      {component.content.fileName && (
        <p className="text-xs text-right mt-1 text-muted-foreground">
          {component.content.fileName}
        </p>
      )}
    </div>
  ),

  note: (component) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
      <h4 className="font-bold uppercase mb-2">{component.content.title}</h4>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: component.content.text,
        }}
      />
    </div>
  ),

  tip: (component) => (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
      <h4 className="font-bold uppercase mb-2">{component.content.title}</h4>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: component.content.text,
        }}
      />
    </div>
  ),

  installation: (component) => (
    <InstallationDisplay
      title={component.content.title}
      commands={component.content.commands}
    />
  ),

  twitter: (component) => (
    <div className="border rounded-lg p-4 my-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1
            4.2-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
            ></path>
          </svg>
        </div>
        <span className="font-medium">Twitter</span>
      </div>
      <div className="border p-3 rounded bg-white">
        <p className="text-sm text-muted-foreground">
          {component.content.url
            ? `Tweet from: ${component.content.url}`
            : "Tweet URL not provided"}
        </p>
      </div>
    </div>
  ),

  youtube: (component) => (
    <div className="my-4">
      <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center">
        {component.content.videoId ? (
          <img
            src={`https://img.youtube.com/vi/${component.content.videoId}/maxresdefault.jpg`}
            alt="YouTube thumbnail"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="text-white font-medium">YouTube Video</div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
          </div>
        </div>
      </div>
      {component.content.title && (
        <p className="font-medium mt-2">{component.content.title}</p>
      )}
    </div>
  ),

  table: (component) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {component.content.columns?.map(
              (column: string, colIndex: number) => (
                <th
                  key={colIndex}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {column}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {component.content.rows?.map((row: string[], rowIndex: number) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.map((cell: string, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 px-4 py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {component.content.caption && (
        <p className="text-sm text-center mt-2 text-muted-foreground">
          {component.content.caption}
        </p>
      )}
    </div>
  ),
};

// Helper function to render a component
const renderComponent = (component: BlogComponent) => {
  const renderer = componentRenderers[component.type];
  if (!renderer) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <p className="text-red-500">Unknown component type: {component.type}</p>
      </div>
    );
  }
  return renderer(component);
};

// Installation component for the blog preview
const InstallationDisplay = ({
  title,
  commands,
}: {
  title?: string;
  commands?: Record<string, string>;
}) => {
  const packageManagers = commands ? Object.keys(commands) : [];
  const [activeTab, setActiveTab] = useState(packageManagers[0] || "npm");
  const [copied, setCopied] = useState(false);

  const getCommand = () => {
    if (!commands) return "";
    return commands[activeTab] || "";
  };

  const copyToClipboard = () => {
    const command = getCommand();
    if (!command) return;

    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => console.error("Could not copy text")
    );
  };

  return (
    <div className="border-4 border-black p-4 my-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-2xl font-bold mb-4 font-mono uppercase relative inline-block">
        <span className="relative z-10">{title || "Installation"}</span>
        <div className="absolute -right-2 -top-2 w-6 h-6 bg-yellow-400 rotate-12 z-0"></div>
      </h3>

      {/* Tabs */}
      {packageManagers.length > 0 ? (
        <>
          <div className="grid grid-cols-4 mb-0 w-full overflow-hidden">
            {packageManagers.map((manager) => (
              <button
                key={manager}
                onClick={() => setActiveTab(manager)}
                className={`px-3 py-2 font-mono text-sm font-bold uppercase tracking-tight transition-none
                  border-4 border-black border-b-0
                  ${
                    activeTab === manager
                      ? "bg-black text-white -mb-px translate-y-[-2px]"
                      : "bg-white hover:bg-gray-100"
                  }`}
              >
                {manager}
              </button>
            ))}
          </div>

          {/* Command Display with Copy Button */}
          <div className="relative">
            <div className="bg-black text-white p-4 pt-5 border-4 border-black font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap pr-8">{getCommand()}</pre>

              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 w-10 h-8 flex items-center justify-center
                  bg-yellow-400 border-2 border-black text-black font-bold hover:bg-yellow-300 
                  transition-colors text-xs uppercase tracking-tight"
                aria-label="Copy to clipboard"
              >
                {copied ? "✓" : "copy"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="border-4 border-black p-6 bg-gray-100 text-center">
          <p className="font-mono text-sm">
            No installation commands available
          </p>
        </div>
      )}
    </div>
  );
};

export function BlogPreview({ components }: BlogPreviewProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-screen bg-white">
        {/* Header Section - Brutalist Style */}
        <section className="relative border-b-4 border-black mb-8">
          {/* Background patterns */}
          <BackgroundPattern
            pattern="both"
            gridOpacity={0.05}
            noiseOpacity={0.03}
            noiseMixBlend="multiply"
          />

          {/* Main content */}
          <div className="relative container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
              {/* Glitchy header with offset shadows */}
              <div className="mb-8 relative">
                {/* Decorative element positioned to not overlap */}
                <div className="absolute -right-8 top-0 w-24 h-16 bg-yellow-400 rotate-12 z-0"></div>
                <div className="relative z-10">
                  <h1 className="text-3xl md:text-5xl font-mono uppercase font-black tracking-tighter text-center leading-none">
                    <span className="mb-2 relative inline-block">
                      Blog Preview
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                <div className="p-6 prose-headings:mt-6 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
                  {components.length === 0 ? (
                    <div className="text-center p-8">
                      <p className="text-lg font-mono">No content added yet.</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add components from the sidebar to see them in the
                        preview.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8 prose prose-headings:mt-4 prose-headings:mb-2">
                      {components.map((component, index) => (
                        <div
                          key={component.id}
                          className="border-b border-dashed border-gray-300 pb-6 last:border-0 last:pb-0"
                        >
                          {/* Render component using the dynamic renderer */}
                          {renderComponent(component)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
