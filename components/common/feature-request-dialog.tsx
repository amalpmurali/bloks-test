"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dynamically import the SimpleTipTap component with SSR disabled
const SimpleTipTap = dynamic(
  () =>
    import("@/components/content-editor/simple-tiptap").then(
      (mod) => mod.SimpleTipTap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border-2 border-black bg-white p-4">
        Loading editor...
      </div>
    ),
  }
);

interface FeatureRequestDialogProps {
  trigger?: React.ReactNode;
  onSubmit?: (data: {
    featureName: string;
    description: string;
    images: File[];
  }) => void;
}

export function FeatureRequestDialog({
  trigger,
  onSubmit,
}: FeatureRequestDialogProps) {
  const [featureName, setFeatureName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const updateDescription = (newContent: string) => {
    setDescription(newContent);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setImages((prevImages) => [...prevImages, ...acceptedFiles]);

      // Create previews
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ featureName, description, images });
    }

    // Reset form
    setFeatureName("");
    setDescription("");
    setImages([]);
    // Revoke all object URLs to avoid memory leaks
    previews.forEach((preview) => URL.revokeObjectURL(preview));
    setPreviews([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="font-mono relative group bg-white border-2 border-black text-black hover:bg-yellow-400 transition-colors">
            <span className="absolute -left-1 -top-1 w-full h-full bg-black opacity-10 z-0"></span>
            <span className="relative z-10">REQUEST A FEATURE</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-4 border-black bg-white p-0 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] flex flex-col">
        <div className="bg-black text-white p-4 font-mono flex-shrink-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <DialogTitle className="text-xl uppercase tracking-wide">
              <span className="relative inline-block">
                REQUEST A FEATURE
                <div className="absolute -left-2 -bottom-1 w-full h-2 bg-yellow-400 z-0"></div>
              </span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Sanskrit verse from the Bhagavad Gita
            </DialogDescription>

            {/* Quote section */}
            <div className="text-white/70 relative max-w-[320px] border-l-2 border-yellow-400 pl-3">
              <div className="text-yellow-400 text-2xl leading-none opacity-70">
                &ldquo;
              </div>

              {/* Sanskrit */}
              <p className="text-sm font-medium tracking-wide">
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
              </p>

              {/* English translation */}
              <p className="text-xs italic mt-1 text-white/60">
                &ldquo;You have the right to work only, but never to its
                fruits.&rdquo;
              </p>

              <p className="text-right text-xs mt-1">
                — श्रीमद् भगवद्गीता, २.४७
              </p>
              <div className="text-yellow-400 text-2xl leading-none opacity-70 absolute bottom-0 right-0">
                &rdquo;
              </div>
            </div>
          </div>
        </div>

        <ScrollArea
          className="flex-grow overflow-auto"
          style={{ maxHeight: "calc(90vh - 160px)" }}
        >
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="feature-name"
                className="text-lg font-mono font-bold"
              >
                FEATURE NAME
              </Label>
              <div className="relative">
                <div className="absolute top-1 left-1 right-1 bottom-1 bg-black opacity-10"></div>
                <Input
                  id="feature-name"
                  value={featureName}
                  onChange={(e) => setFeatureName(e.target.value)}
                  className="font-mono border-2 border-black rounded-none bg-white relative z-10"
                  placeholder="Enter feature name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-lg font-mono font-bold"
              >
                DESCRIPTION
              </Label>
              <div className="border-2 border-black relative">
                <div className="absolute -left-2 -top-2 w-6 h-6 bg-yellow-400 z-0"></div>
                <div className="absolute -right-2 -bottom-2 w-6 h-6 bg-blue-500 z-0"></div>
                <div className="relative z-10 bg-white">
                  <SimpleTipTap
                    content={description}
                    onChange={updateDescription}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-mono font-bold">
                REFERENCE IMAGES
              </Label>

              {/* Image preview section */}
              {previews.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 border-2 border-black"
                    >
                      <Image
                        src={preview}
                        alt={`Uploaded image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-black p-6 cursor-pointer relative ${
                  isDragActive ? "bg-yellow-100" : "bg-white"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="font-mono font-bold mb-1">
                    DRAG & DROP IMAGES HERE
                  </p>
                  <p className="text-sm text-gray-500 font-mono">
                    or click to select files
                  </p>
                  <p className="mt-2 text-xs text-gray-400 font-mono">
                    Maximum file size: 5MB
                  </p>
                </div>
                <div className="absolute -left-2 -bottom-2 w-6 h-6 bg-blue-500 z-0"></div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <DialogClose asChild>
                <Button className="font-mono relative group bg-white border-2 border-black text-black hover:bg-yellow-400 transition-colors">
                  <span className="absolute -left-1 -top-1 w-full h-full bg-black opacity-10 z-0"></span>
                  <span className="relative z-10">CANCEL</span>
                </Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                className="font-mono relative group bg-black border-2 border-black text-white hover:bg-blue-500 transition-colors"
              >
                <span className="absolute -left-1 -top-1 w-full h-full bg-black opacity-10 z-0"></span>
                <span className="relative z-10">SUBMIT</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
