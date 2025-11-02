import { mergeAttributes, Node } from "@tiptap/core";

export interface FigcaptionOptions {
  HTMLAttributes: Record<string, string | number | boolean>;
}

export const Figcaption = Node.create<FigcaptionOptions>({
  name: "figcaption",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: "inline*",

  selectable: false,

  draggable: false,

  parseHTML() {
    return [
      {
        tag: "figcaption",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figcaption",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
