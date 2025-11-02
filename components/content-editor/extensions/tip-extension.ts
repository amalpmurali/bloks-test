import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Tip } from "./tip";

export const extension = Node.create({
  name: "tip",
  group: "block",
  content: "block+",
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(Tip);
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="tip"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "tip" }, 0];
  },
});
