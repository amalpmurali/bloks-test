import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { CommandsList } from "./CommandsList";
import type { Editor } from "@tiptap/core";
import type { Instance as TippyInstance } from "tippy.js";

interface CommandItem {
  title: string;
  command: ({
    editor,
    range,
  }: {
    editor: Editor;
    range: { from: number; to: number };
  }) => void;
}

interface SuggestionProps {
  editor: Editor;
  range: { from: number; to: number };
  clientRect: () => DOMRect;
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

interface SuggestionKeyDownProps {
  event: KeyboardEvent;
}

export const suggestion = {
  items: ({ query }: { query: string }): CommandItem[] => {
    return [
      {
        title: "Image Figure",
        command: ({ editor, range }: any) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setFigure({
              type: "image",
              src: "https://source.unsplash.com/random/800x400",
              caption: "Image caption",
            })
            .run();
        },
      },
      {
        title: "Tip",
        command: ({ editor, range }: any) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent({
              type: "tip",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Add your tip here" }] }],
            })
            .run();
        },
      },
      {
        title: "Caution",
        command: ({ editor, range }: any) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent({
              type: "caution",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Add your caution here" }] }],
            })
            .run();
        },
      },
      {
        title: "Table Figure",
        command: ({ editor, range }: any) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setFigure({
              type: "table",
              caption: "Table caption",
            })
            .run();
        },
      },
      {
        title: "Heading 1",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        title: "Heading 2",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        title: "Quote",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor.chain().focus().deleteRange(range).setBlockquote().run();
        },
      },
      {
        title: "Code Block",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent({
              type: "codeBlock",
              attrs: { language: "typescript" },
              content: [{ type: "text", text: "// Your code here" }],
            })
            .run();
        },
      },
      {
        title: "Bullet List",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: "Numbered List",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: "Paragraph",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor.chain().focus().deleteRange(range).setParagraph().run();
        },
      },
      {
        title: "Note",
        command: ({
          editor,
          range,
        }: {
          editor: Editor;
          range: { from: number; to: number };
        }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent({
              type: "note",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Enter your note here..." }],
                },
              ],
            })
            .run();
        },
      },
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10);
  },

  render: () => {
    let component:
      | ReactRenderer<{
          ref: {
            onKeyDown: (props: SuggestionKeyDownProps) => boolean;
          };
        }>
      | any = null;
    let popup: TippyInstance[] | null = null;

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(CommandsList, {
          props,
          editor: props.editor,
        });

        if (component.element) {
          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        }
      },

      onUpdate(props: SuggestionProps) {
        component?.updateProps(props);

        popup?.[0]?.setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event.key === "Escape") {
          popup?.[0]?.hide();
          return true;
        }

        return component?.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.[0]?.destroy();
        component?.destroy();
      },
    };
  },
};
