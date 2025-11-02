import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Caution } from "./caution";

export const extension = Node.create({
  name: "caution",
  group: "block",
  content: "block+",
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(Caution);
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="caution"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "caution" }, 0];
  },
});
