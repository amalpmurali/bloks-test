import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/utils";

interface MentionListProps {
  items: string[];
  command: (props: { id: string }) => void;
}

export const MentionList = forwardRef<
  { onKeyDown: (props: { event: KeyboardEvent }) => boolean },
  MentionListProps
>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
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
    <div
      className={cn(
        "flex flex-col gap-0.5 p-1.5 rounded-lg border border-zinc-200",
        "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
        "shadow-lg overflow-auto max-h-[280px]"
      )}
    >
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md text-sm text-left w-full",
              "hover:bg-zinc-100 transition-colors duration-150",
              "text-zinc-600 hover:text-zinc-900",
              index === selectedIndex && "bg-zinc-100 text-zinc-900"
            )}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
      ) : (
        <div className="px-2 py-1 text-sm text-zinc-500">No matches found</div>
      )}
    </div>
  );
});

MentionList.displayName = 'MentionList';
