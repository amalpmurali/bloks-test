import { useEditor, EditorContent, Editor, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Mention from "@tiptap/extension-mention";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import "./document-editor.css";
import "./extensions/code-block.css";
import { SlashCommand } from "./slash-commands/command";
import { suggestion } from "./slash-commands/suggestion";
import { extension as NoteExtension } from "./extensions/note-extension";
import { extension as TipExtension } from "./extensions/tip-extension";
import { extension as CautionExtension } from "./extensions/caution-extension";
import { extension as CodeBlockExtension } from "./extensions/code-block-extension";
import { EditorBubbleMenu } from "./extensions/menu-bar";
import { mentionSuggestion } from "./extensions/mention-suggestion";
import { Figure } from "./extensions/figure-extension";
import { Figcaption } from "./extensions/figcaption-extension";

export interface EditorExtensionConfig {
  starterKit?: boolean;
  placeholder?: boolean;
  highlight?: boolean;
  link?: boolean;
  typography?: boolean;
  underline?: boolean;
  mention?: boolean;
  image?: boolean;
  table?: boolean;
  slashCommands?: boolean;
  customExtensions?: Extension[];
  notes?: boolean;
  tips?: boolean;
  cautions?: boolean;
  codeBlock?: boolean;
  figure?: boolean;
}

type MaxWidthType =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full"
  | "min"
  | "max"
  | "fit"
  | "prose";

export interface TipTapEditorProps {
  className?: string;
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxWidth?: MaxWidthType;
  extensions?: Partial<EditorExtensionConfig>;
  editorClassName?: ClassValue;
  bubbleMenu?: boolean;
  onEditorReady?: (editor: Editor) => void;
}

const defaultExtensionConfig: EditorExtensionConfig = {
  starterKit: true,
  placeholder: true,
  highlight: true,
  link: true,
  typography: true,
  underline: true,
  mention: true,
  image: true,
  table: true,
  slashCommands: true,
  notes: true,
  tips: true,
  cautions: true,
  codeBlock: true,
  figure: true,
};

export function TipTapEditor({
  className,
  content = "",
  onChange,
  placeholder = "Press '/' for commands...",
  minHeight = "500px",
  maxWidth = "3xl",
  extensions = defaultExtensionConfig,
  editorClassName,
  bubbleMenu = true,
  onEditorReady,
}: TipTapEditorProps) {
  const getExtensions = () => {
    const extensionList: Extension[] = [];

    if (extensions.starterKit) {
      extensionList.push(
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
          bold: {
            HTMLAttributes: {
              class: "font-semibold",
            },
          },
          italic: {
            HTMLAttributes: {
              class: "italic",
            },
          },
          strike: {
            HTMLAttributes: {
              class: "line-through",
            },
          },
          code: {
            HTMLAttributes: {
              class:
                "rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800",
            },
          },
          codeBlock: false,
        })
      );
    }

    if (extensions.placeholder) {
      extensionList.push(
        Placeholder.configure({
          placeholder,
          emptyEditorClass:
            "before:content-[attr(placeholder)] before:text-muted-foreground before:h-0 before:float-left before:pointer-events-none",
        })
      );
    }

    if (extensions.underline) {
      extensionList.push(
        Underline.configure({
          HTMLAttributes: {
            class: "underline decoration-[0.1em] underline-offset-[0.15em]",
          },
        }) as Extension
      );
    }

    if (extensions.mention) {
      extensionList.push(
        Mention.configure({
          HTMLAttributes: {
            class:
              "rounded bg-blue-100 px-1.5 py-0.5 font-medium text-blue-800",
          },
          suggestion: mentionSuggestion as any,
        }) as Extension
      );
    }

    if (extensions.slashCommands) {
      extensionList.push(
        SlashCommand.configure({
          suggestion,
        })
      );
    }

    if (extensions.highlight)
      extensionList.push(Highlight.configure() as Extension);
    if (extensions.link) extensionList.push(Link.configure() as Extension);
    if (extensions.typography) extensionList.push(Typography);

    if (extensions.image) {
      extensionList.push(
        Image.configure({
          HTMLAttributes: {
            class: "max-w-full rounded-lg",
          },
        }) as Extension
      );
    }

    if (extensions.table) {
      extensionList.push(
        Table.configure({
          HTMLAttributes: {
            class: "min-w-full border-collapse border border-gray-200",
          },
        }) as Extension,
        TableRow.configure() as Extension,
        TableHeader.configure({
          HTMLAttributes: {
            class: "border border-gray-200 bg-gray-50 p-2",
          },
        }) as Extension,
        TableCell.configure({
          HTMLAttributes: {
            class: "border border-gray-200 p-2",
          },
        }) as Extension
      );
    }

    if (extensions.figure) {
      extensionList.push(Figure as Extension, Figcaption as Extension);
    }

    if (extensions.notes) extensionList.push(NoteExtension as Extension);
    if (extensions.tips) extensionList.push(TipExtension as Extension);
    if (extensions.cautions) extensionList.push(CautionExtension as Extension);
    if (extensions.codeBlock)
      extensionList.push(CodeBlockExtension as Extension);

    if (extensions.customExtensions) {
      extensionList.push(...extensions.customExtensions);
    }

    return extensionList;
  };

  const editor = useEditor({
    extensions: getExtensions(),
    content,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-slate dark:prose-invert max-w-none",
          `focus:outline-none min-h-[${minHeight}] p-4`,
          "selection:bg-primary/20"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    onCreate: ({ editor }) => {
      onEditorReady?.(editor);
    },
  });

  if (!editor) {
    return null;
  }

  const containerClasses = cn(
    "relative rounded-lg border bg-white shadow-sm",
    maxWidth && `max-w-${maxWidth}`,
    "mx-auto",
    "before:pointer-events-none before:absolute before:inset-0",
    "before:rounded-lg before:border before:border-transparent",
    "before:shadow-sm before:ring-offset-background",
    "before:transition focus-within:before:border-primary",
    "before:focus-within:ring-1 before:focus-within:ring-primary",
    className
  );

  return (
    <div className={containerClasses}>
      {bubbleMenu && <EditorBubbleMenu editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "prose max-w-none p-4",
          "prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
          "prose-p:text-gray-700 prose-p:leading-relaxed",
          "prose-pre:p-0 prose-pre:bg-transparent",
          "prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm",
          "prose-ul:list-disc prose-ol:list-decimal",
          "prose-strong:font-semibold prose-em:italic prose-strike:line-through",
          editorClassName
        )}
      />
    </div>
  );
}
