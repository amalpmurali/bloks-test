import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./slash-menu.css";

interface CommandItem {
  title: string;
  command: ({
    editor,
    range,
  }: {
    editor: any;
    range: { from: number; to: number };
  }) => void;
}

interface CommandsListProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

interface CommandsListRef {
  onKeyDown: ({ event }: { event: KeyboardEvent }) => boolean;
}

export const CommandsList = forwardRef<CommandsListRef, CommandsListProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex((index) =>
        index <= 0 ? props.items.length - 1 : index - 1
      );
    };

    const downHandler = () => {
      setSelectedIndex((index) =>
        index >= props.items.length - 1 ? 0 : index + 1
      );
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="items">
        {props.items.length ? (
          props.items.map((item: CommandItem, index: number) => (
            <button
              className={`item ${index === selectedIndex ? "is-selected" : ""}`}
              key={index}
              onClick={() => selectItem(index)}
            >
              {item.title}
            </button>
          ))
        ) : (
          <div className="item">No result</div>
        )}
      </div>
    );
  }
);

CommandsList.displayName = "CommandsList";
