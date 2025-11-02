import { BrutalistButton } from "../../registry/brutalist/buttons/button";
import { Heart, Mail } from "lucide-react";
import { BackgroundPattern } from "@/components/common/background-patterns";
import { ComponentCodeTabs } from "@/components/common/component-code-tabs";

export default function BrutalistDesignPage() {
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
                    Brutalist Buttons
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-10">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Buttons</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Default variant */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Default Button</h3>
              <BrutalistButton>Default Button</BrutalistButton>
            </div>

            {/* Secondary variant */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Secondary Button</h3>
              <BrutalistButton variant="secondary">
                Secondary Button
              </BrutalistButton>
            </div>

            {/* Destructive variant */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Destructive Button</h3>
              <BrutalistButton variant="destructive">
                Destructive Button
              </BrutalistButton>
            </div>

            {/* Ring variant */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Ring Button</h3>
              <BrutalistButton variant="ring">Ring Button</BrutalistButton>
            </div>

            {/* Outline variant */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Outline Button</h3>
              <BrutalistButton variant="outline">
                Outline Button
              </BrutalistButton>
            </div>

            {/* Link variant */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Link Button</h3>
              <div className="flex flex-col items-start gap-4">
                <BrutalistButton
                  withShadow={false}
                  variant="link"
                  className="text-blue-600"
                >
                  Link Button
                </BrutalistButton>
              </div>
            </div>

            {/* With Icon (left) */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">With Icon (Left)</h3>
              <BrutalistButton withIcon="left" icon={<Heart />}>
                Like
              </BrutalistButton>
            </div>

            {/* With Icon (right) */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">With Icon (Right)</h3>
              <BrutalistButton withIcon="right" icon={<Mail />}>
                Send Email
              </BrutalistButton>
            </div>

            {/* Icon only */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Icon Button</h3>
              <div className="flex space-x-4">
                <BrutalistButton size="icon" variant="default">
                  <Heart className="h-5 w-5" />
                </BrutalistButton>
                <BrutalistButton size="icon" variant="secondary">
                  <Mail className="h-5 w-5" />
                </BrutalistButton>
                <BrutalistButton size="icon" variant="destructive">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </BrutalistButton>
              </div>
            </div>

            {/* Loading state */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Loading Button</h3>
              <BrutalistButton isLoading>Loading</BrutalistButton>
            </div>

            {/* Size variants */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Size Variants</h3>
              <div className="flex flex-col gap-4 items-start">
                <BrutalistButton size="sm">Small Button</BrutalistButton>
                <BrutalistButton>Default Size</BrutalistButton>
                <BrutalistButton size="lg">Large Button</BrutalistButton>
              </div>
            </div>

            {/* Without Shadow */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Without Shadow</h3>
              <BrutalistButton withShadow={false}>No Shadow</BrutalistButton>
            </div>

            {/* Gradient Button */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Gradient Button</h3>
              <BrutalistButton variant="gradient">Gradient</BrutalistButton>
            </div>

            {/* Custom Styling */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Custom Styling</h3>
              <BrutalistButton className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-black">
                Custom Gradient
              </BrutalistButton>
            </div>

            {/* Variant Combinations */}
            <div className="p-6 bg-slate-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Variant Combinations</h3>
              <div className="flex flex-col gap-4 items-start">
                <BrutalistButton variant="gradient" size="sm">
                  Small Gradient
                </BrutalistButton>
                <BrutalistButton
                  variant="destructive"
                  withIcon="left"
                  icon={
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  }
                >
                  Delete with Icon
                </BrutalistButton>
                <BrutalistButton variant="outline" size="lg" withShadow={false}>
                  Large Outline No Shadow
                </BrutalistButton>
              </div>
            </div>
          </div>
        </section>

        {/* Information Sections with Brutalist Styling */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* About section with brutalist styling */}
              <div className="border-l-4 border-black bg-white p-6 mb-8 font-mono">
                <h3 className="text-xl uppercase font-bold mb-4 inline-block bg-black text-white px-3 py-1 -ml-2">
                  ABOUT
                </h3>
                <p className="mb-4">
                  A COLLECTION OF BRUTALIST-STYLED BUTTONS FOR YOUR NEXT DIGITAL
                  EXPERIENCE. THESE COMPONENTS EMBRACE RAW, BOLD DESIGN WITH
                  HIGH CONTRAST, SHARP EDGES, AND STRONG VISUAL HIERARCHY.
                </p>
                <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4">
                  <h4 className="font-bold uppercase mb-2">KEY FEATURES</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      MULTIPLE VARIANTS: DEFAULT, SECONDARY, DESTRUCTIVE, RING,
                      OUTLINE, LINK, GRADIENT
                    </li>
                    <li>
                      CUSTOMIZABLE ICON POSITIONING: LEFT, RIGHT, OR ICON-ONLY
                    </li>
                    <li>ADJUSTABLE SIZES: SMALL, DEFAULT, LARGE</li>
                    <li>OPTIONAL SHADOW EFFECTS</li>
                    <li>LOADING STATE SUPPORT</li>
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t-2 border-dashed border-black">
                  <p className="text-sm uppercase font-bold">
                    BUILT WITH: REACT, TAILWIND CSS, LUCIDE ICONS
                  </p>
                </div>
              </div>

              {/* Installation section with brutalist styling */}
              <div className="border-l-4 border-black bg-white p-6 mb-8 font-mono">
                <h3 className="text-xl uppercase font-bold mb-4 inline-block bg-black text-white px-3 py-1 -ml-2">
                  INSTALLATION
                </h3>
                <p className="mb-6">
                  USE THE SHADCN CLI TO ADD THESE BUTTONS TO YOUR PROJECT:
                </p>
                <div className="bg-black text-white p-4 font-mono mb-6 overflow-x-auto">
                  <code>
                    bunx --bun shadcn@canary add
                    https://bloks.dev/r/brutalist-buttons.json
                  </code>
                </div>
                <div className="border-2 border-black p-4 bg-yellow-100">
                  <h4 className="font-bold uppercase mb-2">DEPENDENCIES</h4>
                  <p className="mb-2">
                    THIS COMPONENT REQUIRES THESE PACKAGES:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>react</li>
                    <li>react-dom</li>
                    <li>tailwindcss</li>
                    <li>lucide-react (for icons)</li>
                    <li>class-variance-authority</li>
                    <li>clsx</li>
                    <li>tailwind-merge</li>
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
                    <span className="font-bold">IMPORT</span>: Import the
                    BrutalistButton component from your components directory.
                  </li>
                  <li>
                    <span className="font-bold">CHOOSE VARIANT</span>: Select
                    from default, secondary, destructive, ring, outline, link,
                    or gradient variants.
                  </li>
                  <li>
                    <span className="font-bold">SET SIZE</span>: Choose from sm
                    (small), default, or lg (large) sizes.
                  </li>
                  <li>
                    <span className="font-bold">ADD ICONS</span>: Optionally
                    include icons on the left, right, or create an icon-only
                    button.
                  </li>
                  <li>
                    <span className="font-bold">CUSTOMIZE</span>: Apply
                    additional classes or toggle the shadow effect as needed.
                  </li>
                </ol>
                <div className="mt-4 pt-4 border-t-2 border-dashed border-black">
                  <p className="text-sm uppercase tracking-wide">
                    SEE THE EXAMPLES ABOVE FOR IMPLEMENTATION DETAILS AND
                    STYLING OPTIONS.
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
                  componentName="brutalist"
                  files={[
                    { 
                      path: "registry/brutalist/buttons/button.tsx",
                      displayName: "Button.tsx" 
                    },
                    { 
                      path: "registry/brutalist/buttons/variants.ts",
                      displayName: "Variants.ts" 
                    },
                    { 
                      path: "registry/brutalist/buttons/styles.css",
                      displayName: "Styles.css" 
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
