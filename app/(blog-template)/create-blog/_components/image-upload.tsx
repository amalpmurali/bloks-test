import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { useRef, useState } from "react";

export interface ImageMetadata {
  url: string | null;
  caption: string | null;
}

interface ImageUploadProps {
  className?: string;
  value?: ImageMetadata;
  onChange?: (metadata: ImageMetadata) => void;
  label?: string;
}

export function ImageUpload({
  className,
  value,
  onChange,
  label = "Upload image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && onChange) {
        onChange({
          url: event.target.result as string,
          caption: null,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer",
        {
          "border-primary": isDragging,
        },
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      {value?.url ? (
        <div className="relative w-full h-full">
          <img
            src={value.url}
            alt={value.caption || "Uploaded image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white text-sm font-medium">Change Image</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-muted/50 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
          <ImageIcon className="h-8 w-8 text-primary/40" />
          <div className="mt-4 text-sm text-primary/60 text-center">
            <p className="font-medium">{label}</p>
            <p className="text-xs">Drag and drop or click to upload</p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileChange(file);
          }
        }}
      />
    </div>
  );
}
