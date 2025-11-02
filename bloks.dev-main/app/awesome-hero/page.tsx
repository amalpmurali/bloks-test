"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeDisplay } from "@/components/common/code-display";
import { ChevronRight, ChevronDown, Folder, FileCode } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ComponentShowcase } from "@/components/ui/component-showcase";

const HeroComponentPreview = () => {
  return (
    <div className="border-2 border-black p-6 bg-gray-50">
      {/* Hero Component Preview */}
      <div className="relative min-h-[400px] flex items-center overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Brutalist geometric element */}
        <div className="absolute -left-4 -top-4 w-16 h-16 bg-yellow-400 z-0"></div>
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500 z-0"></div>

        <div className="w-full max-w-6xl mx-auto px-6 py-20 flex items-center relative z-10">
          <div className="w-1/2 pr-8">
            <h1 className="font-mono text-5xl font-bold mb-6 relative inline-block">
              <span className="relative z-10">BRUTALIST UI KIT</span>
              <div className="absolute -left-2 -bottom-2 w-full h-3 bg-yellow-400 z-0"></div>
            </h1>
            <p className="font-mono text-lg mb-8">
              A modern UI kit with sharp angles, high contrast, and raw
              interface elements. Perfect for products that want to make a bold
              statement.
            </p>
            <div className="flex space-x-4">
              <button className="bg-black text-white font-mono py-3 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors">
                GET STARTED
              </button>
              <button className="bg-white text-black font-mono py-3 px-6 border-2 border-black hover:bg-black hover:text-white transition-colors">
                DOCUMENTATION
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="relative">
              {/* Placeholder for hero image */}
              <div className="w-full h-64 bg-gray-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-2 left-2 text-xs font-mono bg-white border border-black p-1">
                  550 × 300
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-16 bg-red-400 border-2 border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Type definition for file structure
interface FileItem {
  name: string;
  type: "file" | "folder";
  language?: string;
  children?: FileItem[];
  expanded?: boolean;
  active?: boolean;
  path?: string;
}

const CodeEditor = () => {
  // Mock file structure with folders and files
  const [fileTree, setFileTree] = React.useState<FileItem[]>([
    {
      name: "components",
      type: "folder",
      expanded: true,
      children: [
        {
          name: "ui",
          type: "folder",
          expanded: true,
          children: [
            {
              name: "hero",
              type: "folder",
              expanded: true,
              children: [
                {
                  name: "hero.tsx",
                  type: "file",
                  language: "tsx",
                  active: true,
                  path: "components/ui/hero/hero.tsx",
                },
                {
                  name: "index.ts",
                  type: "file",
                  language: "typescript",
                  path: "components/ui/hero/index.ts",
                },
                {
                  name: "types.ts",
                  type: "file",
                  language: "typescript",
                  path: "components/ui/hero/types.ts",
                },
              ],
            },
          ],
        },
        { name: "layouts", type: "folder", expanded: false },
      ],
    },
    {
      name: "styles",
      type: "folder",
      expanded: false,
      children: [
        {
          name: "hero.module.css",
          type: "file",
          language: "css",
          path: "styles/hero.module.css",
        },
      ],
    },
  ]);

  const [selectedFile, setSelectedFile] = React.useState<{
    name: string;
    path: string;
    language: string;
  }>({
    name: "hero.tsx",
    path: "components/ui/hero/hero.tsx",
    language: "tsx",
  });

  // Code content for each file
  const codeContent: Record<string, string> = {
    "components/ui/hero/hero.tsx": `import React from "react";

export const HeroComponent = () => {
  return (
    <div className="relative min-h-[400px] flex items-center overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {/* Brutalist geometric element */}
      <div className="absolute -left-4 -top-4 w-16 h-16 bg-yellow-400 z-0"></div>
      <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500 z-0"></div>
      
      <div className="w-full max-w-6xl mx-auto px-6 py-20 flex items-center relative z-10">
        <div className="w-1/2 pr-8">
          <h1 className="font-mono text-5xl font-bold mb-6 relative inline-block">
            <span className="relative z-10">BRUTALIST UI KIT</span>
            <div className="absolute -left-2 -bottom-2 w-full h-3 bg-yellow-400 z-0"></div>
          </h1>
          <p className="font-mono text-lg mb-8">
            A modern UI kit with sharp angles, high contrast, and raw interface elements. 
            Perfect for products that want to make a bold statement.
          </p>
          <div className="flex space-x-4">
            <button className="bg-black text-white font-mono py-3 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors">
              GET STARTED
            </button>
            <button className="bg-white text-black font-mono py-3 px-6 border-2 border-black hover:bg-black hover:text-white transition-colors">
              DOCUMENTATION
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="relative">
            {/* Placeholder for hero image */}
            <div className="w-full h-64 bg-gray-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-2 left-2 text-xs font-mono bg-white border border-black p-1">550 × 300</div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-16 bg-red-400 border-2 border-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
`,
    "components/ui/hero/index.ts": `export * from './hero';
`,
    "components/ui/hero/types.ts": `export interface HeroProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
  imageUrl?: string;
}
`,
    "styles/hero.module.css": `.hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 2px solid black;
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
}

.geometricElement1 {
  position: absolute;
  left: -16px;
  top: -16px;
  width: 64px;
  height: 64px;
  background-color: #facc15;
  z-index: 0;
}

.geometricElement2 {
  position: absolute;
  right: -16px;
  bottom: -16px;
  width: 64px;
  height: 64px;
  background-color: #3b82f6;
  z-index: 0;
}
`,
  };

  // Toggle folder expansion
  const toggleFolder = (path: string[], items: FileItem[]): FileItem[] => {
    return items.map((item) => {
      if (path.length === 0 || path[0] !== item.name) return item;

      if (path.length === 1) {
        return { ...item, expanded: !item.expanded };
      }

      if (item.children) {
        return {
          ...item,
          children: toggleFolder(path.slice(1), item.children),
        };
      }

      return item;
    });
  };

  // Handle folder click
  const handleFolderClick = (folderPath: string[]) => {
    setFileTree((prevTree) => toggleFolder(folderPath, prevTree));
  };

  // Handle file click
  const handleFileClick = (file: {
    name: string;
    path: string;
    language: string;
  }) => {
    setSelectedFile(file);
  };

  // Recursive function to render file tree
  const renderFileTree = (items: FileItem[], currentPath: string[] = []) => {
    return items.map((item, index) => {
      const newPath = [...currentPath, item.name];
      const pathString = newPath.join("/");

      if (item.type === "folder") {
        return (
          <div key={pathString} className="select-none">
            <div
              className="flex items-center px-2 py-1 text-gray-300 hover:bg-gray-800 cursor-pointer"
              onClick={() => handleFolderClick(newPath)}
            >
              <span className="mr-1">
                {item.expanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </span>
              <Folder size={14} className="mr-1 text-yellow-400" />
              <span className="font-mono text-sm">{item.name}</span>
            </div>

            {item.expanded && item.children && (
              <div className="pl-4">
                {renderFileTree(item.children, newPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={pathString}
            className={cn(
              "flex items-center px-2 py-1 ml-4 text-gray-300 hover:bg-gray-800 cursor-pointer",
              selectedFile.path === pathString && "bg-gray-800 text-white"
            )}
            onClick={() =>
              handleFileClick({
                name: item.name,
                path: pathString,
                language: item.language || "typescript",
              })
            }
          >
            <FileCode size={14} className="mr-1 text-blue-400" />
            <span className="font-mono text-sm">{item.name}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="border-4 border-black bg-[#1e1e1e] text-white overflow-hidden">
      {/* Code editor header */}
      <div className="flex items-center justify-between bg-[#191919] px-4 py-2 border-b-4 border-black">
        <div className="font-mono text-sm font-bold">BRUTALIST UI KIT</div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="h-[400px]">
        {/* File sidebar */}
        <ResizablePanel
          defaultSize={25}
          minSize={15}
          className="border-r-4 border-black bg-[#252526]"
        >
          <div className="h-full overflow-y-auto py-2">
            {renderFileTree(fileTree)}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-black w-[6px]" />
        {/* Code content */}
        <ResizablePanel defaultSize={75}>
          <CodeDisplay
            code={codeContent[selectedFile.path] || ""}
            language={selectedFile.language}
            fileName={selectedFile.name}
            showLineNumbers={true}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default function AwesomeHeroPage() {
  // Code content for each file
  const heroComponentCode = `import React from "react";
import { cn } from "@/lib/utils";

export interface HeroProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}

export function Hero({
  title,
  description,
  ctaText,
  ctaLink,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative min-h-[600px] flex flex-col justify-center p-12 bg-white border-8 border-black",
        className
      )}
    >
      {/* Geometric elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 border-b-8 border-l-8 border-black" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 border-t-8 border-r-8 border-black" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 border-4 border-black rotate-45" />

      <div className="max-w-3xl z-10">
        <h1 className="text-5xl font-mono font-black mb-6 tracking-tight">
          {title.toUpperCase()}
        </h1>
        <p className="text-xl mb-12 max-w-2xl font-mono">{description}</p>
        <a
          href={ctaLink}
          className="inline-block px-8 py-4 text-white bg-black border-4 border-black font-mono text-lg font-bold hover:bg-white hover:text-black transition-colors"
        >
          {ctaText.toUpperCase()}
        </a>
      </div>
    </div>
  );
}`;

  const typesCode = `export interface HeroProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
}`;

  const stylesCode = `.hero {
  /* Custom styles for hero component */
  --hero-border-width: 8px;
  --hero-accent-color: #3b82f6; /* blue-500 */
  --hero-background-color: #ffffff;
  position: relative;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background-color: var(--hero-background-color);
  border: var(--hero-border-width) solid #000;
}

.hero__title {
  font-family: monospace;
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.hero__description {
  font-family: monospace;
  font-size: 1.25rem;
  margin-bottom: 3rem;
  max-width: 42rem;
}

.hero__cta {
  display: inline-block;
  padding: 1rem 2rem;
  color: #ffffff;
  background-color: #000000;
  border: 4px solid #000000;
  font-family: monospace;
  font-size: 1.125rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.hero__cta:hover {
  background-color: var(--hero-background-color);
  color: #000000;
}

/* Geometric elements */
.hero__shape--top-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 10rem;
  height: 10rem;
  background-color: #ef4444; /* red-500 */
  border-bottom: var(--hero-border-width) solid #000;
  border-left: var(--hero-border-width) solid #000;
}

.hero__shape--bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 8rem;
  height: 8rem;
  background-color: #facc15; /* yellow-400 */
  border-top: var(--hero-border-width) solid #000;
  border-right: var(--hero-border-width) solid #000;
}

.hero__shape--center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 3rem;
  height: 3rem;
  background-color: #3b82f6; /* blue-500 */
  border: 4px solid #000;
  z-index: 0;
}`;

  return (
    <div className="container mx-auto pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-mono font-bold mb-4 relative inline-block">
            <span className="relative z-10">AWESOME HERO</span>
            <div className="absolute -left-2 -bottom-1 w-full h-3 bg-yellow-400 z-0"></div>
          </h1>
          <p className="text-xl max-w-3xl">
            A bold hero component following brutalist design principles.
            Features sharp edges, high contrast, and geometric patterns.
          </p>
        </div>

        {/* Using our new reusable ComponentShowcase */}

        <ComponentShowcase
          previewComponent={<HeroComponentPreview />}
          codeFiles={[
            {
              name: "hero.tsx",
              path: "components/ui/hero/hero.tsx",
              language: "tsx",
              content: heroComponentCode,
            },
            {
              name: "types.ts",
              path: "components/ui/hero/types.ts",
              language: "typescript",
              content: typesCode,
            },
            {
              name: "hero.module.css",
              path: "styles/hero.module.css",
              language: "css",
              content: stylesCode,
            },
          ]}
        />

        {/* Component details */}
        <div className="mt-16">
          <h2 className="text-2xl font-mono font-bold mb-6 relative inline-block">
            <span className="relative z-10">COMPONENT DETAILS</span>
            <div className="absolute -left-2 -bottom-1 w-full h-2 bg-blue-400 z-0"></div>
          </h2>

          <div className="border-2 border-black p-6 bg-white mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-mono text-xl font-bold mb-4">Features</h3>
            <ul className="list-disc ml-6 space-y-2 font-mono">
              <li>Responsive layout that works on all devices</li>
              <li>Bold typography with monospace font</li>
              <li>High contrast buttons with hover effects</li>
              <li>Geometric shapes for visual interest</li>
              <li>Sharp corners and borders for brutalist aesthetic</li>
            </ul>

            <h3 className="font-mono text-xl font-bold mt-8 mb-4">Usage</h3>
            <p className="font-mono mb-4">
              Import the component and use it at the top of your landing page or
              key sections:
            </p>
            <div className="bg-gray-100 p-4 border-2 border-black">
              <pre className="font-mono text-sm">{`import { HeroComponent } from "@/components/ui/hero";

export default function LandingPage() {
  return (
    <main>
      <HeroComponent />
      {/* Rest of your page */}
    </main>
  );
}`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
