"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import "./editor.css";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Strikethrough,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useRef } from "react";

interface SimpleTipTapProps {
  className?: ClassValue;
  content?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
  showBubbleMenu?: boolean;
}

function MenuButton({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Export a separate EditorToolbar component
export function EditorToolbar({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1">
      {/* Text formatting dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Type className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={cn(editor.isActive("bold") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4 mr-2" />
            Bold
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(editor.isActive("italic") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4 mr-2" />
            Italic
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(editor.isActive("underline") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4 mr-2" />
            Underline
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(editor.isActive("strike") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4 mr-2" />
            Strikethrough
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* List dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <List className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={cn(editor.isActive("bulletList") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4 mr-2" />
            Bullet List
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(editor.isActive("orderedList") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4 mr-2" />
            Numbered List
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(editor.isActive("blockquote") && "bg-accent")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4 mr-2" />
            Quote
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alignment dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            {editor.isActive({ textAlign: "center" }) ? (
              <AlignCenter className="h-4 w-4" />
            ) : editor.isActive({ textAlign: "right" }) ? (
              <AlignRight className="h-4 w-4" />
            ) : (
              <AlignLeft className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className={cn(
              editor.isActive({ textAlign: "left" }) && "bg-accent"
            )}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="h-4 w-4 mr-2" />
            Left
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              editor.isActive({ textAlign: "center" }) && "bg-accent"
            )}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="h-4 w-4 mr-2" />
            Center
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              editor.isActive({ textAlign: "right" }) && "bg-accent"
            )}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="h-4 w-4 mr-2" />
            Right
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Link button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "text-muted-foreground",
          editor.isActive("link") && "bg-accent text-accent-foreground"
        )}
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

function BubbleMenuContent({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1 rounded-lg border bg-background p-1 shadow-md">
      <MenuButton
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </MenuButton>
      <div className="w-[1px] h-4 bg-border mx-1" />
      <MenuButton
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </MenuButton>
      <div className="w-[1px] h-4 bg-border mx-1" />
      <MenuButton
        isActive={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </MenuButton>
      <MenuButton
        isActive={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </MenuButton>
      <div className="w-[1px] h-4 bg-border mx-1" />
      <MenuButton
        isActive={editor.isActive("link")}
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        <LinkIcon className="h-4 w-4" />
      </MenuButton>
    </div>
  );
}

export function SimpleTipTap({
  className,
  content = "",
  onChange,
  placeholder = "Start writing...",
  onEditorReady,
  showBubbleMenu = true,
}: SimpleTipTapProps) {
  // Use a ref to store the onChange handler to prevent unnecessary re-renders
  const onChangeRef = useRef(onChange);

  // Update the ref when onChange changes
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Memoize the editor configuration to prevent re-creation
  const editorConfig = useMemo(
    () => ({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "center", "right"],
        }),
        Placeholder.configure({
          placeholder,
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-blue-600 underline cursor-pointer",
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: "max-w-full rounded-md border-2 border-blue-400 mx-auto",
          },
        }),
      ],
      content,
      editorProps: {
        attributes: {
          class:
            "prose prose-slate dark:prose-invert max-w-none focus:outline-none",
        },
      },
      onUpdate: ({ editor }: any) => {
        onChangeRef.current(editor.getHTML());
      },
      onSelectionUpdate: () => {
        // Don't force focus on every selection update as it can interfere with typing
      },
      onReady: (editor: any) => {
        console.log("Editor ready", editor);
        if (onEditorReady) {
          onEditorReady(editor);
        }
      },
      immediatelyRender: false,
    }),
    [content, placeholder, onEditorReady]
  );

  const editor = useEditor(editorConfig);

  return (
    <div className={cn("relative", className)}>
      {editor && showBubbleMenu && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          shouldShow={({ state, from, to }) => {
            const { doc, selection } = state;
            const { empty } = selection;
            const isEmptyTextBlock = !doc.textBetween(from, to).length;
            return !empty && !isEmptyTextBlock;
          }}
        >
          <BubbleMenuContent editor={editor} />
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
