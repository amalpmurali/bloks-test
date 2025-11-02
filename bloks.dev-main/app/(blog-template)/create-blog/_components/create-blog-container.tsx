"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, Suspense, useCallback, lazy } from "react";
import { BlogPreview } from "./blog-preview";
import {
  ImageIcon,
  Table as TableIcon,
  AlignLeft,
  Code,
  Info,
  Lightbulb,
  PackageIcon,
  Eye,
} from "lucide-react";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ContentEditor } from "./content-editor";
import { ImageEditor } from "./image-editor";
import { TableEditor } from "./table-editor";
import { CodeEditor } from "./code-editor";
import { NoteEditor } from "./note-editor";
import { TipEditor } from "./tip-editor";
import { InstallationTabsEditor } from "./installation-tabs-editor";
import EditorCard from "./editor-card";

const TwitterEditor = lazy(() => import("./twitter-editor"));
const YoutubeEditor = lazy(() => import("./youtube-editor"));

type ComponentType =
  | "content"
  | "image"
  | "table"
  | "twitter"
  | "youtube"
  | "code"
  | "note"
  | "tip"
  | "installation";

export interface BlogComponent {
  id: string;
  type: ComponentType;
  content: any;
}

interface FormData {
  components: BlogComponent[];
}

const componentIcons = {
  content: AlignLeft,
  image: ImageIcon,
  table: TableIcon,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  code: Code,
  note: Info,
  tip: Lightbulb,
  installation: PackageIcon,
};

export default function CreateBlogContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      components: [],
    },
  });

  const { watch, setValue } = form;
  const components = watch("components");

  const addComponent = (type: ComponentType) => {
    const newComponent: BlogComponent = {
      id: crypto.randomUUID(),
      type,
      content: getDefaultContent(type),
    };
    setValue("components", [...components, newComponent]);
  };

  const getDefaultContent = (type: ComponentType) => {
    switch (type) {
      case "content":
        return {
          text: "",
          json: {
            type: "doc",
            content: [{ type: "paragraph" }],
          },
        };
      case "image":
        return { url: "", caption: "" };
      case "table":
        return {
          title: "",
          data: {
            rows: 1,
            columns: 2,
            cells: {},
            headers: ["Column 1", "Column 2"],
          },
        };
      case "twitter":
        return { tweets: [] };
      case "youtube":
        return { videos: [] };
      case "code":
        return {
          code: "",
          language: "javascript",
          fileName: "",
          heading: "",
          showLineNumbers: true,
        };
      case "note":
        return {
          text: "",
          title: "Note",
          json: {
            type: "doc",
            content: [{ type: "paragraph" }],
          },
        };
      case "tip":
        return {
          text: "",
          title: "Tip",
          json: {
            type: "doc",
            content: [{ type: "paragraph" }],
          },
        };
      case "installation":
        return {
          title: "Installation",
          package: "package-name",
          commands: {
            npm: "npm install package-name",
            pnpm: "pnpm add package-name",
            yarn: "yarn add package-name",
            bun: "bun add package-name",
          },
        };
      default:
        return {};
    }
  };

  const removeComponent = (index: number) => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setValue("components", newComponents);
  };

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;

      const { source, destination } = result;

      if (source.droppableId === destination.droppableId) {
        if (source.droppableId === "components") {
          const items = Array.from(components);
          const [reorderedItem] = items.splice(source.index, 1);
          items.splice(destination.index, 0, reorderedItem);
          setValue("components", items);
        }
      } else if (
        source.droppableId === "componentsList" &&
        destination.droppableId === "components"
      ) {
        const type = result.draggableId.replace(
          "template-",
          ""
        ) as ComponentType;
        const newComponent: BlogComponent = {
          id: crypto.randomUUID(),
          type,
          content: getDefaultContent(type),
        };
        const items = Array.from(components);
        items.splice(destination.index, 0, newComponent);
        setValue("components", items);
      }
    },
    [components, setValue]
  );

  const renderComponent = (component: BlogComponent, index: number) => {
    const Icon = componentIcons[component.type];

    return (
      <Draggable key={component.id} draggableId={component.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="group relative py-6 space-y-6"
          >
            <EditorCard
              icon={<Icon className="text-primary" />}
              dragHandleProps={provided.dragHandleProps}
              onRemove={() => removeComponent(index)}
            >
              {renderComponentEditor(component, index)}
            </EditorCard>
            {index !== components.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
            )}
          </div>
        )}
      </Draggable>
    );
  };

  const renderComponentEditor = (component: BlogComponent, index: number) => {
    const updateContent = (content: any) => {
      const newComponents = [...components];
      newComponents[index].content = content;
      setValue("components", newComponents);
    };

    switch (component.type) {
      case "content":
        return (
          <ContentEditor content={component.content} onChange={updateContent} />
        );
      case "image":
        return (
          <ImageEditor content={component.content} onChange={updateContent} />
        );
      case "table":
        return (
          <TableEditor content={component.content} onChange={updateContent} />
        );
      case "code":
        return (
          <CodeEditor content={component.content} onChange={updateContent} />
        );
      case "note":
        return (
          <NoteEditor content={component.content} onChange={updateContent} />
        );
      case "tip":
        return (
          <TipEditor content={component.content} onChange={updateContent} />
        );
      case "installation":
        return (
          <InstallationTabsEditor
            content={component.content}
            onChange={updateContent}
          />
        );
      case "twitter":
        return (
          <Suspense
            fallback={
              <div className="p-4 animate-pulse">Loading Twitter editor...</div>
            }
          >
            <TwitterEditor
              content={component.content}
              onChange={updateContent}
            />
          </Suspense>
        );
      case "youtube":
        return (
          <Suspense
            fallback={
              <div className="p-4 animate-pulse">Loading YouTube editor...</div>
            }
          >
            <YoutubeEditor
              content={component.content}
              onChange={updateContent}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log("Blog data:", data);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message || "Failed to create blog page");
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen animate-pulse bg-muted rounded-lg" />
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-[300px,1fr] min-h-[calc(100vh-4rem)]">
          {/* Fixed Components Sidebar */}
          <div className="border-r bg-muted/50 flex flex-col h-[calc(100vh-6rem)] sticky top-24">
            {/* Scrollable Components List */}
            <div className="flex-1">
              <div className="flex items-center gap-2 p-4 pb-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <h3 className="font-medium">Components</h3>
              </div>
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="p-4 pt-2">
                  <Droppable droppableId="componentsList" isDropDisabled={true}>
                    {(provided) => (
                      <div
                        className="space-y-2.5"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {[
                          "content",
                          "image",
                          "table",
                          "code",
                          "installation",
                          "note",
                          "tip",
                          "twitter",
                          "youtube",
                        ].map((type, index) => {
                          const Icon = componentIcons[type as ComponentType];
                          return (
                            <Draggable
                              key={type}
                              draggableId={`template-${type}`}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="group flex items-center gap-3 p-3 bg-background rounded-md border shadow-sm cursor-grab hover:border-primary hover:shadow-md transition-all"
                                  onClick={() =>
                                    addComponent(type as ComponentType)
                                  }
                                >
                                  <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-medium capitalize">
                                      {type}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {type === "content" &&
                                        "Rich text editor with formatting"}
                                      {type === "image" &&
                                        "Upload and caption images"}
                                      {type === "table" &&
                                        "Create structured data tables"}
                                      {type === "code" &&
                                        "Add code snippets with syntax highlighting"}
                                      {type === "note" &&
                                        "Add important notes with custom headings"}
                                      {type === "tip" &&
                                        "Share tips and tricks with your readers"}
                                      {type === "installation" &&
                                        "Add package installation instructions with tabs"}
                                      {type === "twitter" &&
                                        "Embed tweets with ease"}
                                      {type === "youtube" &&
                                        "Embed YouTube videos with thumbnails"}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>

            {/* Footer */}
            <div className="flex-none p-4 border-t bg-background space-y-2">
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => setShowPreview(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Blog
              </Button>
              <Button
                className="w-full"
                type="button"
                disabled={isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isSubmitting ? "Creating..." : "Create Blog"}
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-card flex flex-col overflow-y-auto">
            <Droppable droppableId="components">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 p-6"
                >
                  <div className="max-w-4xl p-2 w-full h-auto border border-primary rounded-lg">
                    {components.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="max-w-md text-center space-y-4">
                          <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                            <div className="h-12 w-12 rounded-full border-2 border-primary border-dashed flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              Start Building Your Content
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                              Drag components from the sidebar or click them to
                              add to your content. Mix different components to
                              create engaging posts.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      components.map((component, index) =>
                        renderComponent(component, index)
                      )
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-background sticky top-0 z-50">
            <DialogTitle className="text-xl font-semibold">
              Blog Preview
            </DialogTitle>
            <DialogDescription>
              Preview how your blog will appear when published
            </DialogDescription>
          </DialogHeader>
          <BlogPreview components={components} />
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}
