"use client";

import { EmailComposer } from "@/registry/email-composer/components/email-ui/email-composer";
import { Mail } from "lucide-react";
import { BackgroundPattern } from "@/components/common/background-patterns";
import { ComponentCodeTabs } from "@/components/common/component-code-tabs";

export default function EmailEditorPage() {
  return (
    <div className="min-h-screen bg-white mt-8">
      {/* Header Section - Brutalist Style */}
      <section className="relative border-b-4 border-black mb-16">
        {/* Background patterns */}
        <BackgroundPattern
          pattern="both"
          gridOpacity={0.05}
          noiseOpacity={0.03}
          noiseMixBlend="multiply"
        />

        {/* Main content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Glitchy header with offset shadows */}
            <div className="mb-12 relative">
              {/* Decorative element positioned to not overlap */}
              <div className="absolute -right-8 top-0 w-24 h-24 bg-red-500 rotate-12 z-0"></div>
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-mono uppercase font-black tracking-tighter text-center leading-none">
                  <span className="mb-2 relative inline-block">
                    Email Composer
                  </span>
                </h1>
              </div>
            </div>

            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
                    <div className="bg-red-500 p-4 border-b-4 border-black flex items-center">
                      <Mail className="text-black h-8 w-8 mr-3" />
                      <h2 className="text-2xl font-mono font-bold uppercase text-black">
                        Compose Your Email
                      </h2>
                    </div>
                    <div className="p-6">
                      <EmailComposer />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Email Editor Component */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* About section with brutalist styling */}
            <div className="border-l-4 border-black bg-white p-6 mb-8 font-mono">
              <h3 className="text-xl uppercase font-bold mb-4 inline-block bg-black text-white px-3 py-1 -ml-2">
                ABOUT
              </h3>
              <p className="mb-4">
                A GMAIL-LIKE EMAIL COMPOSER COMPONENT BUILT WITH BRUTALIST
                DESIGN PRINCIPLES. THIS COMPONENT PROVIDES A COMPLETE EMAIL
                AUTHORING EXPERIENCE WITH RICH TEXT EDITING, RECIPIENT
                MANAGEMENT, AND EMAIL PREVIEW.
              </p>
              <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4">
                <h4 className="font-bold uppercase mb-2">KEY FEATURES</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>RICH TEXT EDITING WITH TIPTAP</li>
                  <li>MULTIPLE RECIPIENT FIELDS (TO, CC, BCC)</li>
                  <li>LIVE EMAIL PREVIEW</li>
                  <li>EMAIL-SAFE HTML TRANSFORMATION</li>
                  <li>BRUTALIST DESIGN AESTHETIC</li>
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-black">
                <p className="text-sm uppercase font-bold">
                  BUILT WITH: TIPTAP, REACT EMAIL, TAILWIND CSS
                </p>
              </div>
            </div>

            {/* Installation section with brutalist styling */}
            <div className="border-l-4 border-black bg-white p-6 mb-8 font-mono">
              <h3 className="text-xl uppercase font-bold mb-4 inline-block bg-black text-white px-3 py-1 -ml-2">
                INSTALLATION
              </h3>
              <p className="mb-6">
                USE THE SHADCN CLI TO ADD THIS COMPONENT TO YOUR PROJECT:
              </p>
              <div className="bg-black text-white p-4 font-mono mb-6 overflow-x-auto">
                <code>
                  bunx --bun shadcn@latest add
                  https://bloks.dev/r/email-composer.json
                </code>
              </div>
              <div className="border-2 border-black p-4 bg-yellow-100">
                <h4 className="font-bold uppercase mb-2">DEPENDENCIES</h4>
                <p className="mb-2">THIS COMPONENT REQUIRES THESE PACKAGES:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>@tiptap/react</li>
                  <li>@tiptap/starter-kit</li>
                  <li>@tiptap/extension-placeholder</li>
                  <li>@tiptap/extension-link</li>
                  <li>@tiptap/extension-image</li>
                  <li>@tiptap/extension-text-align</li>
                  <li>@tiptap/extension-underline</li>
                  <li>@tiptap/extension-color</li>
                  <li>@tiptap/extension-text-style</li>
                  <li>@react-email/components</li>
                  <li>@react-email/render</li>
                </ul>
              </div>
            </div>

            {/* Usage description with brutalist styling */}
            <div className="border-l-4 border-black bg-white p-6 mb-8 font-mono">
              <h3 className="text-xl uppercase font-bold mb-4 inline-block bg-black text-white px-3 py-1 -ml-2">
                HOW TO USE
              </h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <span className="font-bold">RECIPIENTS</span>: Enter email
                  addresses in the TO, CC, BCC fields. Multiple addresses can be
                  entered with comma separation.
                </li>
                <li>
                  <span className="font-bold">SUBJECT</span>: Add your email
                  subject in the designated field.
                </li>
                <li>
                  <span className="font-bold">CONTENT</span>: Compose your email
                  using the rich text editor. Use the toolbar for formatting
                  options.
                </li>
                <li>
                  <span className="font-bold">PREVIEW</span>: Click the preview
                  button to see how your email will appear to recipients.
                </li>
                <li>
                  <span className="font-bold">SEND</span>: When ready, click the
                  send button to dispatch your email.
                </li>
              </ol>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-black">
                <p className="text-sm uppercase tracking-wide">
                  This component uses TipTap for rich text editing and React
                  Email for HTML transformation.
                </p>
              </div>
            </div>
            
            {/* Component Code Section */}
            <div className="border-l-4 border-black bg-white p-6 mb-8 font-mono">
              <h3 className="text-xl uppercase font-bold mb-4 inline-block bg-black text-white px-3 py-1 -ml-2">
                COMPONENT CODE
              </h3>
              <p className="mb-6">
                EXPLORE THE SOURCE CODE FOR THIS COMPONENT. CLICK ON ANY TAB TO VIEW THE
                CORRESPONDING FILE. THE CODE IS LOADED ONLY WHEN YOU SELECT A TAB.  
              </p>
              <ComponentCodeTabs
                componentName="email-composer"
                files={[
                  { 
                    path: "registry/email-composer/components/email-ui/email-composer.tsx",
                    displayName: "EmailComposer.tsx" 
                  },
                  { 
                    path: "registry/email-composer/components/email-ui/custom-editor.tsx",
                    displayName: "CustomEditor.tsx" 
                  },
                  { 
                    path: "registry/email-composer/components/email-ui/email-multi-select.tsx",
                    displayName: "EmailMultiSelect.tsx" 
                  },
                  { 
                    path: "registry/email-composer/components/email-ui/email-preview.tsx",
                    displayName: "EmailPreview.tsx" 
                  },
                  { 
                    path: "registry/email-composer/lib/email-transformer.ts",
                    displayName: "EmailTransformer.ts" 
                  },
                  { 
                    path: "registry/email-composer/editor.css",
                    displayName: "Editor.css" 
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
