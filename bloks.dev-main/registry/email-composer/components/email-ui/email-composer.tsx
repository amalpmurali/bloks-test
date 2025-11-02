import React, { useState, useRef } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Paperclip, Trash2 } from "lucide-react";
import { EmailMultiSelect, EmailOption } from "./email-multi-select";
import { EmailEditor } from "./custom-editor";
import { EmailPreview } from "./email-preview";
import { transformToEmailHtml } from "../../lib/email-transformer";

// Define types for attachments
interface Attachment {
  file: File;
  previewUrl?: string;
}

export function EmailComposer() {
  const [to, setTo] = useState<EmailOption[]>([]);
  const [cc, setCc] = useState<EmailOption[]>([]);
  const [bcc, setBcc] = useState<EmailOption[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    setIsTransforming(true);

    try {
      // Transform the TipTap content to email-safe HTML
      const transformedHtml = await transformToEmailHtml(content);
      setEmailHtml(transformedHtml);

      console.log({
        to,
        cc,
        bcc,
        subject,
        html: transformedHtml, // Use the transformed HTML for sending
        text: content.replace(/<[^>]*>/g, ""), // Plain text fallback
        attachments: attachments.map((att) => att.file),
      });

      // Clear the form
      setTo([]);
      setCc([]);
      setBcc([]);
      setSubject("");
      setContent("");
      setAttachments([]);
      setShowCc(false);
      setShowBcc(false);
      setEmailHtml(null);
    } catch (error) {
      console.error("Error transforming email content:", error);
    } finally {
      setIsTransforming(false);
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: Attachment[] = [];

    Array.from(files).forEach((file) => {
      const attachment: Attachment = { file };

      // Create preview URL for images
      if (file.type.startsWith("image/")) {
        attachment.previewUrl = URL.createObjectURL(file);
      }

      newAttachments.push(attachment);
    });

    setAttachments((prev) => [...prev, ...newAttachments]);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = [...prev];
      // Revoke the URL to avoid memory leaks
      if (newAttachments[index].previewUrl) {
        URL.revokeObjectURL(newAttachments[index].previewUrl!);
      }
      newAttachments.splice(index, 1);
      return newAttachments;
    });
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className="w-full h-auto">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between">
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full">
              <Badge variant="secondary" className="min-w-[35px] mr-2">
                To
              </Badge>
              <EmailMultiSelect
                placeholder="Enter recipients"
                options={[]}
                value={to}
                onChange={setTo}
                inputClassName="border-0 shadow-none rounded-none px-0 focus-visible:ring-0"
                containerClassName="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${showCc ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setShowCc(!showCc)}
                >
                  Cc
                </button>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${showBcc ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setShowBcc(!showBcc)}
                >
                  Bcc
                </button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={() => {
                  // Clear form and attachments
                  setTo([]);
                  setCc([]);
                  setBcc([]);
                  setSubject("");
                  setContent("");
                  setShowCc(false);
                  setShowBcc(false);
                  // Clean up attachments
                  attachments.forEach((attachment) => {
                    if (attachment.previewUrl) {
                      URL.revokeObjectURL(attachment.previewUrl);
                    }
                  });
                  setAttachments([]);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showCc && (
            <div className="flex items-center w-full border-t pt-2">
              <Badge
                variant="outline"
                className="min-w-[35px] mr-2 border-blue-200 text-blue-500"
              >
                Cc
              </Badge>
              <EmailMultiSelect
                placeholder="Enter Cc recipients"
                options={[]}
                value={cc}
                onChange={setCc}
                inputClassName="border-0 shadow-none rounded-none px-0 focus-visible:ring-0"
                containerClassName="w-full"
              />
            </div>
          )}

          {showBcc && (
            <div className="flex items-center w-full border-t pt-2">
              <Badge
                variant="outline"
                className="min-w-[35px] mr-2 border-purple-200 text-purple-500"
              >
                Bcc
              </Badge>
              <EmailMultiSelect
                placeholder="Enter Bcc recipients"
                options={[]}
                value={bcc}
                onChange={setBcc}
                inputClassName="border-0 shadow-none rounded-none px-0 focus-visible:ring-0"
                containerClassName="w-full"
              />
            </div>
          )}

          <div className="flex items-center w-full border-y pt-2">
            <Badge
              variant="outline"
              className="min-w-[35px] mr-2 border-green-200 text-green-500"
            >
              Subject
            </Badge>
            <Input
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-0 px-0 shadow-none rounded-none focus-visible:ring-0"
            />
          </div>
        </div>
      </CardHeader>

      <div className="px-4 py-0">
        <EmailEditor
          content={content}
          onChange={setContent}
          placeholder="Write your email here..."
          className="min-h-[200px] focus-visible:outline-none"
        />

        {/* Attachments Section */}
        <div className="py-2">
          {attachments.length > 0 && (
            <div className="border rounded-md p-2 mt-2">
              <div className="text-sm font-medium mb-2">Attachments</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={`${attachment.file.name}-${index}`}
                    className="relative border rounded-md p-2 flex flex-col"
                  >
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="absolute top-1 right-1 bg-background hover:bg-muted rounded-full p-1 shadow-sm border z-10"
                      aria-label={`Remove ${attachment.file.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative h-20 w-full">
                      {attachment.file.type.startsWith("image/") &&
                      attachment.previewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={attachment.previewUrl}
                          alt={attachment.file.name}
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-muted rounded-md">
                          <div className="text-2xl font-bold uppercase text-muted-foreground">
                            {attachment.file.name
                              .split(".")
                              .pop()
                              ?.substring(0, 3) || "?"}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-1 text-xs truncate">
                      {attachment.file.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.file.size)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CardFooter className="flex justify-start gap-x-2 items-center p-3 border-t">
        <Button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isTransforming}
        >
          {isTransforming ? (
            <>
              <span className="mr-2">Preparing...</span>
              <span className="animate-spin">↻</span>
            </>
          ) : (
            "Send"
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowPreview(true)}
          className="text-muted-foreground"
          disabled={!content}
        >
          Preview
        </Button>
        <div className="flex items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground"
            onClick={handleAttachFile}
            title="Attach files"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => {
            // Clear all attachments and revoke their object URLs to avoid memory leaks
            attachments.forEach((attachment) => {
              if (attachment.previewUrl) {
                URL.revokeObjectURL(attachment.previewUrl);
              }
            });
            setAttachments([]);
          }}
          disabled={attachments.length === 0}
          title="Clear all attachments"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>

      {/* Email Preview Dialog */}
      <EmailPreview
        content={content}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </Card>
  );
}
