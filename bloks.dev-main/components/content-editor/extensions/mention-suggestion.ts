import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance, Props } from "tippy.js";
import { MentionList } from "./mention-list";

const suggestionItems = [
  "Sarah Johnson",
  "Michael Chen",
  "Emily Davis",
  "David Wilson",
  "Lisa Anderson",
  "James Taylor",
  "Maria Garcia",
  "Robert Smith",
  "Jennifer Lee",
  "William Brown",
];

export const mentionSuggestion = {
  items: ({ query }: { query: string }) => {
    return suggestionItems
      .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  },

  render: () => {
    let component: any;
    let popup: Instance<Props>[];

    return {
      onStart: (props: {
        clientRect?: (() => DOMRect | null) | null | undefined;
        command: (props: { id: string }) => void;
        editor: any;
      }) => {
        component = new ReactRenderer(MentionList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: () => {
            const rect = props.clientRect?.();
            return rect || new DOMRect();
          },
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate: (props: {
        clientRect: DOMRect | null;
        command: (props: { id: string }) => void;
        editor: any;
      }) => {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: () => {
            const rect = props.clientRect;
            return rect || new DOMRect();
          },
        });
      },

      onKeyDown: (props: { event: KeyboardEvent; editor: any }) => {
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit: () => {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
