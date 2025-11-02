"use client";

import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeDisplay } from "./code-display";
import { PackageTabs } from "@/components/content-editor/package-tabs";

// CodeMirror imports
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { markdown } from "@codemirror/lang-markdown";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { LanguageSupport } from "@codemirror/language";
import { languages } from "@codemirror/language-data";

interface CodeEditorProps {
  content: {
    code: string;
    language: string;
    fileName?: string;
    heading?: string;
    showLineNumbers?: boolean;
    showPackageManager?: boolean;
    packageCommands?: {
      npm?: string;
      pnpm?: string;
      yarn?: string;
      bun?: string;
    };
  };
  onChange: (content: any) => void;
}

const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "shell", label: "Shell/Bash" },
  { value: "sql", label: "SQL" },
  { value: "markdown", label: "Markdown" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "plaintext", label: "Plain Text" },
];

// Function to get the appropriate language extension based on the selected language
const getLanguageExtension = (
  language: string
): LanguageSupport | undefined => {
  switch (language) {
    case "javascript":
      return javascript();
    case "typescript":
    case "tsx":
    case "jsx":
      return javascript({
        jsx: true,
        typescript: language === "typescript" || language === "tsx",
      });
    case "html":
      return html();
    case "css":
      return css();
    case "python":
      return python();
    case "java":
      return java();
    case "rust":
      return rust();
    case "markdown":
      return markdown();
    case "json":
      return json();
    default:
      // Try to find a matching language from the language-data package
      const lang = languages.find(
        (l) => l.name.toLowerCase() === language.toLowerCase()
      );
      return lang?.support;
  }
};

export function CodeEditor({ content, onChange }: CodeEditorProps) {
  const [showPreview, setShowPreview] = useState(true);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...content,
      [field]: value,
    });
  };

  // Generate package commands based on the code
  const generatePackageCommands = (packageName: string = "package-name") => {
    if (!content.code || !content.showPackageManager) return null;

    // Try to extract package name from the code or use the fileName without extension
    if (content.fileName) {
      const fileName = content.fileName.split(".")[0];
      if (fileName && fileName !== "") {
        packageName = fileName;
      }
    }

    return {
      npm: `npm install ${packageName}`,
      pnpm: `pnpm add ${packageName}`,
      yarn: `yarn add ${packageName}`,
      bun: `bun add ${packageName}`,
      ...(content.packageCommands || {}),
    };
  };

  const handlePackageCommandChange = (manager: string, command: string) => {
    const updatedCommands = {
      ...(content.packageCommands || {}),
      [manager]: command,
    };
    handleChange("packageCommands", updatedCommands);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="heading">Heading (Optional)</Label>
          <Input
            id="heading"
            placeholder="Add a heading for this code block"
            value={content.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="fileName">File Name (Optional)</Label>
          <Input
            id="fileName"
            placeholder="e.g. app.js"
            value={content.fileName || ""}
            onChange={(e) => handleChange("fileName", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="show-package-manager"
          checked={content.showPackageManager || false}
          onCheckedChange={(checked: boolean) => {
            handleChange("showPackageManager", checked);
          }}
        />
        <label
          htmlFor="show-package-manager"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show package installation tabs
        </label>
      </div>

      <div>
        <Label htmlFor="language">Language</Label>
        <Select
          value={content.language || "javascript"}
          onValueChange={(value) => handleChange("language", value)}
        >
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="code">Code</Label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs text-primary hover:underline"
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        <div
          className="border rounded-md overflow-hidden"
          style={{ height: "300px" }}
        >
          <CodeMirror
            value={content.code || ""}
            height="300px"
            extensions={[
              getLanguageExtension(content.language || "javascript") || [],
            ]}
            onChange={(value) => handleChange("code", value)}
            theme="dark"
            placeholder="Paste or type your code here"
            className="font-mono"
          />
        </div>
      </div>

      {showPreview && content.code && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Preview</h3>
          {content.heading && (
            <h3 className="text-xl font-semibold mb-2">{content.heading}</h3>
          )}
          <CodeDisplay
            code={content.code}
            language={content.language || "javascript"}
            fileName={content.fileName}
            showLineNumbers={content.showLineNumbers !== false}
          />

          {content.showPackageManager && (
            <PackageTabs
              commands={generatePackageCommands() || {}}
              className="mt-4"
            />
          )}
        </div>
      )}

      {content.showPackageManager && (
        <div className="mt-4">
          <Label className="mb-2 block">Package Installation Commands</Label>
          <div className="space-y-2">
            <div>
              <Label htmlFor="npm-command" className="text-xs">
                npm
              </Label>
              <Input
                id="npm-command"
                placeholder="npm install package-name"
                value={
                  content.packageCommands?.npm || "npm install package-name"
                }
                onChange={(e) =>
                  handlePackageCommandChange("npm", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="pnpm-command" className="text-xs">
                pnpm
              </Label>
              <Input
                id="pnpm-command"
                placeholder="pnpm add package-name"
                value={content.packageCommands?.pnpm || "pnpm add package-name"}
                onChange={(e) =>
                  handlePackageCommandChange("pnpm", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="yarn-command" className="text-xs">
                yarn
              </Label>
              <Input
                id="yarn-command"
                placeholder="yarn add package-name"
                value={content.packageCommands?.yarn || "yarn add package-name"}
                onChange={(e) =>
                  handlePackageCommandChange("yarn", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="bun-command" className="text-xs">
                bun
              </Label>
              <Input
                id="bun-command"
                placeholder="bun add package-name"
                value={content.packageCommands?.bun || "bun add package-name"}
                onChange={(e) =>
                  handlePackageCommandChange("bun", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
