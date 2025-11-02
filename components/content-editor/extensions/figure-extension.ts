import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { FigureComponent } from "./figure-component";

export interface FigureOptions {
  HTMLAttributes: Record<string, string | number | boolean>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      setFigure: (options: { src?: string; caption?: string; type: "image" | "table" }) => ReturnType;
    };
  }
}

export const Figure = Node.create<FigureOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block",

  content: "(image | table) figcaption",

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      type: {
        default: "image",
        parseHTML: element => element.getAttribute("data-type"),
        renderHTML: attributes => ({
          "data-type": attributes.type,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["figure", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFigure:
        options =>
        ({ commands }) => {
          const { type, src, caption } = options;
          return commands.insertContent({
            type: "figure",
            attrs: { type },
            content: [
              {
                type: type === "image" ? "image" : "table",
                attrs: type === "image" ? { src } : undefined,
                ...(type === "table" && {
                  content: [
                    {
                      type: "tableRow",
                      content: [
                        { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Header 1" }] }] },
                        { type: "tableHeader", content: [{ type: "paragraph", content: [{ type: "text", text: "Header 2" }] }] },
                      ],
                    },
                    {
                      type: "tableRow",
                      content: [
                        { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Cell 1" }] }] },
                        { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "Cell 2" }] }] },
                      ],
                    },
                  ],
                }),
              },
              {
                type: "figcaption",
                content: [
                  {
                    type: "text",
                    text: caption || (type === "image" ? "Image caption" : "Table caption"),
                  },
                ],
              },
            ],
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FigureComponent);
  },
});
