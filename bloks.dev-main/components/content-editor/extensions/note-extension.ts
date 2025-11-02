import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Note } from "./note";

export const extension = Node.create({
  name: "note",
  group: "block",
  content: "block+",
  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(Note);
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="note"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "note" }, 0];
  },
});
