import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BackgroundPattern } from "@/components/common/background-patterns";
import { Marquee } from "@/components/common/marquee";
import { Logo } from "@/components/ui/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Bloks.dev",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Error Section with Brutalist Style */}
      <section className="relative flex-1 flex flex-col items-center justify-between border-b-4 border-black">
        {/* Background patterns */}
        <BackgroundPattern
          pattern="both"
          gridOpacity={0.05}
          noiseOpacity={0.03}
          noiseMixBlend="multiply"
        />

        {/* Main content */}
        <div className="relative container mx-auto px-4 py-0 my-auto flex-1 flex items-center">
          <div className="max-w-3xl mx-auto">
            {/* Glitchy 404 with offset shadows */}
            <div className="mb-8 md:mb-12 relative">
              {/* Decorative blocks for brutalist style - positioned on the sides */}
              {/* Hidden on mobile, visible on larger screens */}
              <div className="hidden md:block absolute -left-10 top-80 w-14 h-14 bg-purple-300 rotate-[30deg] opacity-70 z-0"></div>
              <div className="hidden md:block absolute right-[-80px] top-10 w-32 h-12 bg-yellow-400 -rotate-6 z-0"></div>

              <Logo
                size={60}
                className="hidden lg:block mx-auto mb-8 md:mb-12 md:h-20 md:w-20 relative z-10"
              />
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-mono uppercase font-black tracking-tighter text-center leading-none relative z-10">
                <span className="block relative">
                  404
                  <span className="absolute -left-1 -top-1 text-red-500 opacity-70 blur-[0.3px]">
                    404
                  </span>
                  <span className="absolute -right-1 -bottom-1 text-blue-500 opacity-70 blur-[0.3px]">
                    404
                  </span>
                </span>
              </h1>
              <div className="absolute -right-2 -bottom-4 w-12 h-6 md:w-20 md:h-8 bg-blue-500 rotate-3"></div>
            </div>

            {/* Error description */}
            <div className="bg-black text-white p-4 md:p-6 mb-8 md:mb-12 border-2 border-black rotate-1 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl font-mono text-center mb-2">
                &ldquo;नासतो विद्यते भावो नाभावो विद्यते सतः&rdquo;
              </p>
              <p className="text-base md:text-lg font-mono text-center opacity-80">
                &ldquo;The unreal never exists; the real never ceases to
                be.&rdquo;
              </p>
              <p className="text-xs md:text-sm font-mono text-center mt-4">
                PAGE NOT FOUND. The page you&apos;re looking for has been moved,
                deleted, or never existed in the first place.
              </p>
            </div>

            {/* Back to Home CTA */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="group font-mono uppercase font-bold tracking-wider px-4 sm:px-6 md:px-8 py-2 md:py-4 bg-yellow-400 border-3 md:border-4 border-black text-black text-base md:text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 md:hover:translate-x-2 md:hover:translate-y-2 transition-all inline-flex items-center"
              >
                <ArrowLeft className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
        {/* Marquee effect */}
        <Marquee
          className="w-full mt-auto mb-4 md:mb-8"
          items={[
            { text: "LOST" },
            { text: "CONFUSED" },
            { text: "MISPLACED" },
            { text: "WANDERING" },
            { text: "404" },
          ]}
          speed="normal"
          direction="left"
          repeat={2}
          gap={4}
        />
      </section>
    </div>
  );
}
