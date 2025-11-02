import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Laptop, Smartphone, Tablet, Loader2 } from "lucide-react";
import { transformToEmailHtml } from "../../lib/email-transformer";

interface EmailPreviewProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EmailPreview({ content, isOpen, onClose }: EmailPreviewProps) {
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState("desktop");

  useEffect(() => {
    if (isOpen && content) {
      setLoading(true);

      // Transform the content
      transformToEmailHtml(content)
        .then((html) => {
          // Ensure we have a valid HTML string
          const validHtml =
            typeof html === "string"
              ? html
              : html
                ? typeof html === "object"
                  ? JSON.stringify(html)
                  : String(html)
                : "";
          setEmailHtml(validHtml);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error transforming email content:", error);
          setLoading(false);
        });
    } else {
      setEmailHtml(null);
    }
  }, [isOpen, content]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
          <DialogDescription>
            Preview how your email will look on different devices
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="desktop"
          value={activeDevice}
          onValueChange={setActiveDevice}
          className="w-full mt-4"
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Tablet className="h-4 w-4" />
                <span className="hidden sm:inline">Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="tablet" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span className="hidden sm:inline">Tablet</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
            </TabsList>

            <Button
              variant="outline"
              onClick={() => {
                // Copy the HTML to clipboard
                if (emailHtml) {
                  navigator.clipboard.writeText(emailHtml);
                }
              }}
            >
              Copy HTML
            </Button>
          </div>

          <div className="border rounded-md flex-1 overflow-hidden bg-background">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Generating preview...
                </span>
              </div>
            ) : (
              <>
                <TabsContent
                  value="desktop"
                  className="h-full m-0 data-[state=active]:flex"
                >
                  <div className="w-full h-full overflow-auto p-8">
                    <div
                      className="max-w-[600px] mx-auto border shadow-sm"
                      dangerouslySetInnerHTML={{ __html: emailHtml || "" }}
                    />
                  </div>
                </TabsContent>

                <TabsContent
                  value="tablet"
                  className="h-full m-0 data-[state=active]:flex"
                >
                  <div className="w-full h-full overflow-auto flex justify-center p-8">
                    <div
                      className="w-[480px] border shadow-sm"
                      dangerouslySetInnerHTML={{ __html: emailHtml || "" }}
                    />
                  </div>
                </TabsContent>

                <TabsContent
                  value="mobile"
                  className="h-full m-0 data-[state=active]:flex"
                >
                  <div className="w-full h-full overflow-auto flex justify-center p-8">
                    <div
                      className="w-[320px] border shadow-sm"
                      dangerouslySetInnerHTML={{ __html: emailHtml || "" }}
                    />
                  </div>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>

        <div className="text-sm text-muted-foreground mt-4">
          <p>
            This preview provides an approximation of how your email will appear
            in different email clients. Actual rendering may vary based on the
            specific email client and version.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
