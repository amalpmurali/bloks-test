import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface TableData {
  rows: number;
  columns: number;
  cells: { [key: string]: string };
  headers: string[];
}

interface DynamicTableProps {
  initialData: TableData;
  onChange?: (data: TableData) => void;
  showHeaders?: boolean;
  minRows?: number;
  minColumns?: number;
}

export default function DynamicTable({
  initialData,
  onChange,
  showHeaders = true,
  minRows = 1,
  minColumns = 1,
}: DynamicTableProps) {
  const [data, setData] = useState<TableData>(initialData);

  const updateData = (newData: TableData) => {
    setData(newData);
    onChange?.(newData);
  };

  const addRow = () => {
    updateData({
      ...data,
      rows: data.rows + 1,
    });
  };

  const removeRow = () => {
    if (data.rows <= minRows) return;
    const newData = { ...data };
    newData.rows = data.rows - 1;
    // Remove cells from the last row
    Object.keys(newData.cells).forEach((key) => {
      const [row] = key.split("-").map(Number);
      if (row === data.rows - 1) {
        delete newData.cells[key];
      }
    });
    updateData(newData);
  };

  const addColumn = () => {
    const newData = {
      ...data,
      columns: data.columns + 1,
      headers: [...data.headers, `Column ${data.columns + 1}`],
    };
    updateData(newData);
  };

  const removeColumn = () => {
    if (data.columns <= minColumns) return;
    const newData = { ...data };
    newData.columns = data.columns - 1;
    newData.headers = newData.headers.slice(0, -1);
    // Remove cells from the last column
    Object.keys(newData.cells).forEach((key) => {
      const [, col] = key.split("-").map(Number);
      if (col === data.columns - 1) {
        delete newData.cells[key];
      }
    });
    updateData(newData);
  };

  const updateCell = (row: number, col: number, value: string) => {
    updateData({
      ...data,
      cells: {
        ...data.cells,
        [`${row}-${col}`]: value,
      },
    });
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...data.headers];
    newHeaders[index] = value;
    updateData({
      ...data,
      headers: newHeaders,
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          {showHeaders && (
            <thead>
              <tr>
                {Array.from({ length: data.columns }).map((_, col) => (
                  <th
                    key={`header-${col}`}
                    className="border-b bg-primary/5 p-2 text-left"
                  >
                    <Input
                      value={data.headers[col] || ""}
                      onChange={(e) => updateHeader(col, e.target.value)}
                      className="border-0 bg-transparent p-0 text-primary font-medium focus-visible:ring-0 text-sm"
                      placeholder={`Column ${col + 1}`}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: data.rows }).map((_, row) => (
              <tr key={`row-${row}`}>
                {Array.from({ length: data.columns }).map((_, col) => (
                  <td key={`cell-${row}-${col}`} className="border p-2">
                    <Input
                      value={data.cells[`${row}-${col}`] || ""}
                      onChange={(e) => updateCell(row, col, e.target.value)}
                      className="border-0 p-0 focus-visible:ring-0 text-sm"
                      placeholder="Enter value"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={removeRow}
          disabled={data.rows <= minRows}
          className="gap-2"
        >
          <Trash2Icon className="h-4 w-4" />
          Remove Row
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          className="gap-2"
        >
          <PlusCircleIcon className="h-4 w-4" />
          Add Row
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={removeColumn}
          disabled={data.columns <= minColumns}
          className="gap-2"
        >
          <Trash2Icon className="h-4 w-4" />
          Remove Column
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addColumn}
          className="gap-2"
        >
          <PlusCircleIcon className="h-4 w-4" />
          Add Column
        </Button>
      </div>
    </div>
  );
}
