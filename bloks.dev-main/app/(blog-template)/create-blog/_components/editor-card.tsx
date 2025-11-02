import { cn } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface EditorCardProps {
  children: ReactNode;
  className?: string;
  onRemove?: () => void;
  dragHandleProps?: any;
  icon?: ReactNode;
}

export default function EditorCard({
  children,
  className,
  onRemove,
  dragHandleProps,
  icon,
}: EditorCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border border-primary/20 bg-primary/5",
        className
      )}
    >
      {/* Controls */}
      <div className="absolute -top-3 left-4 flex items-center gap-2">
        {dragHandleProps && (
          <div {...dragHandleProps} className="text-primary">
            <div className="rounded-full bg-background px-2 py-1 border border-primary/20">
              <GripVertical className="h-3 w-3 cursor-grab hover:text-primary/80 transition-colors" />
            </div>
          </div>
        )}
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-6 w-6 p-0 rounded-full bg-background border border-primary/20 hover:bg-destructive/10"
          >
            <X className="h-3 w-3 text-primary hover:text-destructive transition-colors" />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
