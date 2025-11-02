import { type JSONContent } from "@tiptap/core";
import { SimpleTipTap } from "@/components/content-editor/simple-tiptap";

interface ContentEditorProps {
  content: { text: string; json?: JSONContent };
  onChange: (content: { text: string; json?: JSONContent }) => void;
}

export function ContentEditor({ content, onChange }: ContentEditorProps) {
  return (
    <div className="min-h-[200px]">
      <SimpleTipTap
        content={content.text}
        onChange={(newContent) => {
          onChange({
            text: newContent,
            json: content.json,
          });
        }}
        className="min-h-[200px]"
      />
    </div>
  );
}
