import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { CodeBlock } from "./code-block";
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

export const extension = Node.create({
  name: "codeBlock",
  group: "block",
  content: "text*",
  marks: "",
  code: true,
  defining: true,

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }: any) => {
        const { selection } = editor.state;
        const { empty, $head } = selection;

        // Only handle empty selections
        if (!empty) return false;

        const parent = $head.parent;
        if (parent.type.name !== "codeBlock") return false;

        const isAtEnd = $head.pos === $head.end();

        if (isAtEnd && $head.parent.textContent.endsWith("\n")) {
          editor
            .chain()
            .focus()
            .insertContentAt($head.after(), { type: "paragraph" })
            .command(({ tr }: any) => {
              tr.setSelection(
                editor.state.selection.constructor.near(
                  tr.doc.resolve($head.after() + 1)
                )
              );
              return true;
            })
            .run();
          return true;
        }

        return false;
      },
    };
  },

  addAttributes() {
    return {
      language: {
        default: "typescript",
        parseHTML: (element) => element.getAttribute("data-language"),
        renderHTML: (attributes) => ({
          "data-language": attributes.language,
          class: `language-${attributes.language}`,
        }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock);
  },

  parseHTML() {
    return [
      {
        tag: "pre[data-type='code-block']",
        preserveWhitespace: "full",
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }: any) {
    const content = node.content.text;
    const language = HTMLAttributes["data-language"];
    let highlighted;

    try {
      highlighted = content ? lowlight.highlight(language, content) : "";
    } catch (_) {
      highlighted = content;
    }

    return [
      "pre",
      mergeAttributes(
        { "data-type": "code-block", spellcheck: "false" },
        HTMLAttributes
      ),
      ["code", {}, highlighted || 0],
    ];
  },
});
