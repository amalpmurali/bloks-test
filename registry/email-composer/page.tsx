"use client";

import { EmailComposer } from "@/registry/email-composer/components/email-ui/email-composer";

export default function EmailComposerPage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Email Composer</h1>
      <p className="mb-6 text-muted-foreground">
        This is a demo of a Gmail-like email composer using TipTap for rich text
        editing with React Email for email-safe HTML transformation.
      </p>
      <EmailComposer />
    </div>
  );
}
