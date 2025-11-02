import DynamicTable, { type TableData } from "./dynamic-table";
import { Input } from "@/components/ui/input";

interface TableEditorProps {
  content: {
    data: TableData;
    title?: string;
  };
  onChange: (content: { data: TableData; title?: string }) => void;
}

export function TableEditor({ content, onChange }: TableEditorProps) {
  const handleTableChange = (data: TableData) => {
    onChange({ ...content, data });
  };

  const handleTitleChange = (title: string) => {
    onChange({ ...content, title });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          value={content.title || ""}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter table title"
          className="text-center font-medium"
        />
      </div>
      <DynamicTable
        initialData={content.data}
        onChange={handleTableChange}
        showHeaders={true}
        minRows={1}
        minColumns={2}
      />
    </div>
  );
}
