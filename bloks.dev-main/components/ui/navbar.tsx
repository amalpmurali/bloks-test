"use client";

import { Logo } from "@/components/ui/logo";
import { FeatureRequestDialog } from "@/components/common/feature-request-dialog";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b-4 border-black dark:border-white">
      <div className="container mx-auto py-3 px-6 flex justify-between items-center">
        <Logo size={40} className="hover:scale-105 transition-transform" />

        <FeatureRequestDialog
          onSubmit={({ featureName, description, images }) => {
            console.log("Feature Request:", {
              featureName,
              description,
              images,
            });
            // Here you would typically send the data to your backend
          }}
        />
      </div>
    </header>
  );
}
