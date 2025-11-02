import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Force Node.js runtime instead of Edge runtime
export const runtime = "nodejs";

/**
 * API Route handler for fetching component code files
 * This endpoint provides code snippets for components in the registry
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const componentName = searchParams.get("component");
  const filePath = searchParams.get("path");

  if (!componentName || !filePath) {
    return NextResponse.json(
      { error: "Component name and file path required" },
      { status: 400 }
    );
  }

  try {
    // Load the registry data dynamically to ensure it's up to date
    const registryPath = path.join(process.cwd(), "registry.json");
    const registryContent = fs.readFileSync(registryPath, "utf8");
    const registry = JSON.parse(registryContent);

    // Find component in registry
    const component = registry.items.find(
      (item: any) => item.name === componentName
    );

    if (!component) {
      return NextResponse.json(
        { error: `Component '${componentName}' not found in registry` },
        { status: 404 }
      );
    }

    // Find the specific file
    const file = component.files.find((f: any) => f.path === filePath);
    if (!file) {
      return NextResponse.json(
        { error: `File '${filePath}' not found for component '${componentName}'` },
        { status: 404 }
      );
    }

    // Read the file content
    const fullPath = path.join(process.cwd(), file.path);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: `File does not exist at path '${fullPath}'` },
        { status: 404 }
      );
    }
    
    const content = fs.readFileSync(fullPath, "utf8");
    const fileExtension = path.extname(filePath).replace(".", "");
    
    // Map file extensions to languages for syntax highlighting
    const languageMap: Record<string, string> = {
      "tsx": "tsx",
      "ts": "typescript",
      "js": "javascript",
      "jsx": "jsx",
      "css": "css",
      "scss": "scss",
      "json": "json",
      "md": "markdown"
    };

    return NextResponse.json({
      content,
      language: languageMap[fileExtension] || fileExtension,
      fileName: path.basename(filePath),
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Failed to read file", details: (error as Error).message },
      { status: 500 }
    );
  }
}
