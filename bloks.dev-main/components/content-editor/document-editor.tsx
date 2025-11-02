import { cn } from "@/lib/utils";
import { TipTapEditor } from "./TipTapEditor";
import { type ClassValue } from "clsx";

interface DocumentEditorProps {
  className?: ClassValue;
  content?: string;
  onChange?: (content: string) => void;
}

export function DocumentEditor({
  className,
  content = "",
  onChange,
}: DocumentEditorProps) {
  return (
    <TipTapEditor
      content={content}
      onChange={onChange}
      className={cn(className)}
      maxWidth="3xl"
      extensions={{
        starterKit: true,
        placeholder: true,
        highlight: true,
        link: true,
        typography: true,
        underline: true,
        mention: true,
        image: true,
        table: true,
        slashCommands: true,
        notes: true,
        tips: true,
        cautions: true,
        codeBlock: true,
        figure: true,
      }}
    />
  );
}
