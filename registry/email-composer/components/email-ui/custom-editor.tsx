import "../../editor.css";

import { useEditor, EditorContent, BubbleMenu, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
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
  Palette,
  Highlighter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Create a custom extension for background color
const BackgroundColor = Extension.create({
  name: "backgroundColor",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element: any) => element.style.backgroundColor,
            renderHTML: (attributes: any) => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBackgroundColor:
        (color: any) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { backgroundColor: color }).run();
        },
      unsetBackgroundColor:
        () =>
        ({ chain }: any) => {
          return chain()
            .setMark("textStyle", { backgroundColor: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
} as any);

// Text and background colors
const TEXT_COLORS = [
  { color: "#000000", name: "Black" },
  { color: "#333333", name: "Dark Gray" },
  { color: "#666666", name: "Gray" },
  { color: "#1a73e8", name: "Blue" },
  { color: "#d93025", name: "Red" },
  { color: "#188038", name: "Green" },
  { color: "#f9ab00", name: "Yellow" },
  { color: "#a142f4", name: "Purple" },
];

const BACKGROUND_COLORS = [
  { color: "#ffffff", name: "White" },
  { color: "#f1f3f4", name: "Light Gray" },
  { color: "#d2e3fc", name: "Light Blue" },
  { color: "#fce8e6", name: "Light Red" },
  { color: "#e6f4ea", name: "Light Green" },
  { color: "#fef7e0", name: "Light Yellow" },
  { color: "#f3e8fd", name: "Light Purple" },
];

// Enhanced bubble menu with quote option
function EnhancedBubbleMenu({
  editor,
}: {
  editor: ReturnType<typeof useEditor>;
}) {
  const [showTextColors, setShowTextColors] = useState(false);
  const [showBgColors, setShowBgColors] = useState(false);

  if (!editor) return null;

  return (
    <div className="flex flex-col items-start gap-1 rounded-lg border bg-background p-1 shadow-md max-w-[280px]">
      <div className="flex flex-wrap items-center gap-1">
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
        {/* Add blockquote button */}
        <MenuButton
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
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
        <MenuButton
          isActive={false}
          onClick={() => setShowTextColors(!showTextColors)}
        >
          <Palette className="h-4 w-4" />
        </MenuButton>
        <MenuButton
          isActive={false}
          onClick={() => setShowBgColors(!showBgColors)}
        >
          <Highlighter className="h-4 w-4" />
        </MenuButton>
      </div>

      {showTextColors && (
        <div className="flex flex-wrap gap-1 p-1 border-t pt-1 w-full">
          <ColorButton
            color="inherit"
            isActive={!editor.getAttributes("textStyle").color}
            onClick={() => {
              editor.chain().focus().unsetColor().run();
              setShowTextColors(false);
            }}
          />
          {TEXT_COLORS.map((color) => (
            <ColorButton
              key={color.color}
              color={color.color}
              isActive={editor.isActive("textStyle", { color: color.color })}
              onClick={() => {
                editor.chain().focus().setColor(color.color).run();
                setShowTextColors(false);
              }}
            />
          ))}
        </div>
      )}

      {showBgColors && (
        <div className="flex flex-wrap gap-1 p-1 border-t pt-1 w-full">
          <ColorButton
            color="inherit"
            isActive={!editor.getAttributes("textStyle").backgroundColor}
            onClick={() => {
              editor
                .chain()
                .focus()
                .setMark("textStyle", { backgroundColor: null })
                .removeEmptyTextStyle()
                .run();
              setShowBgColors(false);
            }}
          />
          {BACKGROUND_COLORS.map((color) => (
            <ColorButton
              key={color.color}
              color={color.color}
              isActive={editor.isActive("textStyle", {
                backgroundColor: color.color,
              })}
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { backgroundColor: color.color })
                  .run();
                setShowBgColors(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
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

function ColorButton({
  color,
  isActive,
  onClick,
}: {
  color: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "w-5 h-5 rounded-md border border-muted",
        isActive && "ring-2 ring-primary ring-offset-1"
      )}
      style={{ backgroundColor: color }}
      onClick={onClick}
      title={color}
    />
  );
}

interface EmailEditorProps {
  className?: ClassValue;
  content?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onEditorReady?: (editor: ReturnType<typeof useEditor>) => void;
  showBubbleMenu?: boolean;
}

export function EmailEditor({
  className,
  content = "",
  onChange,
  placeholder = "Write something...",
  onEditorReady,
  showBubbleMenu = true,
}: EmailEditorProps) {
  const editorRef = useRef<ReturnType<typeof useEditor> | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-md border-2 border-blue-400 mx-auto",
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      BackgroundColor,
    ],
    content,
    editorProps: {
      attributes: {
        class: cn("prose prose-sm focus:outline-none max-w-none", className),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    // Set immediatelyRender to false to prevent SSR hydration issues
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
    editorRef.current = editor;
  }, [editor, onEditorReady]);

  return (
    <div className="w-full relative">
      <EditorContent editor={editor} className="w-full" />
      {editor && showBubbleMenu && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            duration: 100,
            placement: "top",
            maxWidth: "none",
          }}
          shouldShow={({ state, from, to }) => {
            const { doc, selection } = state;
            const { empty } = selection;
            const isEmptyTextBlock = !doc.textBetween(from, to).length;
            return !empty && !isEmptyTextBlock;
          }}
        >
          <EnhancedBubbleMenu editor={editor} />
        </BubbleMenu>
      )}
    </div>
  );
}
