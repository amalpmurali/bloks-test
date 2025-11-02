"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PackageTabs } from "@/components/content-editor/package-tabs";

interface InstallationTabsEditorProps {
  content: {
    title?: string;
    package?: string;
    commands: {
      npm?: string;
      pnpm?: string;
      yarn?: string;
      bun?: string;
    };
  };
  onChange: (content: any) => void;
}

export function InstallationTabsEditor({
  content,
  onChange,
}: InstallationTabsEditorProps) {
  const [showPreview, setShowPreview] = useState(true);

  const handleChange = (field: string, value: any) => {
    onChange({
      ...content,
      [field]: value,
    });
  };

  const handleCommandChange = (manager: string, command: string) => {
    const updatedCommands = {
      ...(content.commands || {}),
      [manager]: command,
    };
    handleChange("commands", updatedCommands);
  };

  const generateDefaultCommand = (packageName: string, manager: string) => {
    switch (manager) {
      case "npm":
        return `npm install ${packageName}`;
      case "pnpm":
        return `pnpm add ${packageName}`;
      case "yarn":
        return `yarn add ${packageName}`;
      case "bun":
        return `bun add ${packageName}`;
      default:
        return "";
    }
  };

  // Auto-generate commands when package name changes
  const handlePackageChange = (packageName: string) => {
    const updatedCommands = {
      npm: generateDefaultCommand(packageName, "npm"),
      pnpm: generateDefaultCommand(packageName, "pnpm"),
      yarn: generateDefaultCommand(packageName, "yarn"),
      bun: generateDefaultCommand(packageName, "bun"),
      // Preserve any manually edited commands
      ...Object.entries(content.commands || {}).reduce(
        (acc, [key, value]) => {
          if (value && !value.includes(content.package || "")) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, string>
      ),
    };

    onChange({
      ...content,
      package: packageName,
      commands: updatedCommands,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="installation-title">Title (Optional)</Label>
        <Input
          id="installation-title"
          placeholder="Installation"
          value={content.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <Label>Installation Commands</Label>
          {content.commands && Object.keys(content.commands).length > 0 && (
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-xs text-primary hover:underline"
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          )}
        </div>

        <div>
          <Label htmlFor="npm-command" className="text-xs">
            npm
          </Label>
          <Input
            id="npm-command"
            placeholder="npm install package-name"
            value={
              content.commands?.npm ||
              generateDefaultCommand(content.package || "package-name", "npm")
            }
            onChange={(e) => handleCommandChange("npm", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="pnpm-command" className="text-xs">
            pnpm
          </Label>
          <Input
            id="pnpm-command"
            placeholder="pnpm add package-name"
            value={
              content.commands?.pnpm ||
              generateDefaultCommand(content.package || "package-name", "pnpm")
            }
            onChange={(e) => handleCommandChange("pnpm", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="yarn-command" className="text-xs">
            yarn
          </Label>
          <Input
            id="yarn-command"
            placeholder="yarn add package-name"
            value={
              content.commands?.yarn ||
              generateDefaultCommand(content.package || "package-name", "yarn")
            }
            onChange={(e) => handleCommandChange("yarn", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bun-command" className="text-xs">
            bun
          </Label>
          <Input
            id="bun-command"
            placeholder="bun add package-name"
            value={
              content.commands?.bun ||
              generateDefaultCommand(content.package || "package-name", "bun")
            }
            onChange={(e) => handleCommandChange("bun", e.target.value)}
          />
        </div>
      </div>

      {showPreview &&
        content.commands &&
        Object.keys(content.commands).length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            {content.title && (
              <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
            )}
            <PackageTabs commands={content.commands} />
          </div>
        )}
    </div>
  );
}
