import React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Code as CodeIcon,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BubbleMenu, Editor } from "@tiptap/react";

const MenuButton = ({
  isActive,
  onClick,
  children,
  className,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "p-1 rounded-md border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100/50 transition-all duration-150",
      "text-zinc-600 hover:text-zinc-900 text-xs",
      "active:bg-zinc-100",
      "disabled:opacity-50 disabled:pointer-events-none",
      isActive && "bg-zinc-100 text-zinc-900 border-zinc-400 shadow-sm",
      className
    )}
  >
    {children}
  </button>
);

export const EditorBubbleMenu = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        animation: "scale-subtle",
      }}
      className={cn(
        "flex gap-1 items-center p-1 rounded-lg shadow-xl",
        "border border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      )}
    >
      <div className="flex gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="h-3.5 w-3.5" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="h-3.5 w-3.5" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <Underline className="h-3.5 w-3.5" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="h-3.5 w-3.5" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <CodeIcon className="h-3.5 w-3.5" />
        </MenuButton>
      </div>

      <div className="w-px self-stretch bg-zinc-200 mx-0.5" />

      <div className="flex gap-1">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="h-3.5 w-3.5" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </MenuButton>
      </div>
    </BubbleMenu>
  );
};
