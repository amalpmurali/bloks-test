import { Input } from "@/components/ui/input";
import { ImageUpload, type ImageMetadata } from "./image-upload";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

interface ImageEditorProps {
  content: { url: string; caption: string };
  onChange: (content: { url: string; caption: string }) => void;
}

export function ImageEditor({ content, onChange }: ImageEditorProps) {
  const [isChanging, setIsChanging] = useState(false);

  const handleImageUpload = (metadata: ImageMetadata) => {
    if (metadata.url) {
      onChange({
        url: metadata.url,
        caption: metadata.caption || content.caption,
      });
      setIsChanging(false);
    }
  };

  if (isChanging) {
    return (
      <div className="space-y-4">
        <div className="aspect-[16/9] overflow-hidden rounded-lg">
          <ImageUpload
            value={
              content.url
                ? { url: content.url, caption: content.caption }
                : undefined
            }
            onChange={handleImageUpload}
            className="h-full w-full"
            label="Change featured image"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {content.url ? (
        <div className="space-y-4">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={content.url}
              alt={content.caption || "Blog image"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsChanging(true)}
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Change Image
              </Button>
            </div>
          </div>
          <Input
            value={content.caption}
            onChange={(e) => onChange({ ...content, caption: e.target.value })}
            placeholder="Add a caption for this image..."
            className="border-primary/20 focus:border-primary"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] overflow-hidden rounded-lg">
          <ImageUpload
            value={undefined}
            onChange={handleImageUpload}
            className="h-full w-full"
            label="Add featured image"
          />
        </div>
      )}
    </div>
  );
}
