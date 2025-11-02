import Link from "next/link";
import { ArrowRight, Mail, Palette, Zap } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { BackgroundPattern } from "@/components/common/background-patterns";
import { Marquee } from "@/components/common/marquee";
import { Metadata } from "next";

// SEO Metadata
export const metadata: Metadata = {
  title: "Bloks.dev | Brutalist UI Components for Modern Websites",
  description:
    "A collection of raw, bold, and unforgettable brutalist UI components that scream for attention. Build websites that refuse to be ignored.",
  keywords: [
    "brutalist design",
    "UI components",
    "web design",
    "brutalism",
    "UI kit",
    "React components",
    "Next.js",
    "design system",
    "bold interfaces",
  ],
  authors: [{ name: "Bloks.dev Team" }],
  creator: "Bloks.dev",
  publisher: "Bloks.dev",
  openGraph: {
    type: "website",
    url: "https://bloks.dev",
    title: "Bloks.dev | Brutalist UI Components for Modern Websites",
    description:
      "A collection of raw, bold, and unforgettable brutalist UI components that scream for attention.",
    siteName: "Bloks.dev",
    images: [
      {
        url: "/og-image.jpg", // Create this image in the public folder
        width: 1200,
        height: 630,
        alt: "Bloks.dev Brutalist UI Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloks.dev | Brutalist UI Components for Modern Websites",
    description:
      "A collection of raw, bold, and unforgettable brutalist UI components that scream for attention.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bloks.dev",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Brutalist Style */}
      <section className="relative border-b-4 border-black">
        {/* Background patterns */}
        <BackgroundPattern pattern="both" gridOpacity={0.05} noiseOpacity={0.03} noiseMixBlend="multiply" />

        {/* Main content */}
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            {/* Glitchy header with offset shadows */}
            <div className="mb-12 relative">
              <div className="absolute -right-6 top-6 w-32 h-32 bg-yellow-400 rotate-12"></div>
              <div className="absolute left-1/3 -top-6 w-48 h-12 bg-blue-500"></div>
              <div className="relative">
                <Logo size={120} className="mx-auto mb-12" />
                <h1 className="text-5xl md:text-8xl font-mono uppercase font-black tracking-tighter text-center leading-none relative z-10">
                  <span className="block mb-2 relative">
                    blocks
                    <span className="absolute -left-1 -top-1 text-red-500 opacity-70 blur-[0.3px]">
                      blocks
                    </span>
                    <span className="absolute -right-1 -bottom-1 text-blue-500 opacity-70 blur-[0.3px]">
                      blocks
                    </span>
                  </span>
                  <span className="block text-3xl md:text-6xl">
                    for beautiful interfaces
                  </span>
                </h1>
              </div>
            </div>

            {/* Raw description */}
            <div className="bg-black text-white p-6 mb-12 border-2 border-black rotate-1 max-w-3xl mx-auto">
              <p className="text-xl font-mono">
                RAW. BOLD. UNFORGETTABLE. A collection of brutalist UI
                components that scream for attention. No frills, just function
                with attitude.
              </p>
            </div>

            {/* CTA buttons with brutalist style */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <Link
                href="#components"
                className="group font-mono uppercase font-bold tracking-wider px-8 py-4 bg-yellow-400 border-4 border-black text-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
              >
                Explore <span className="line-through">BORING</span> BOLD
                Components
              </Link>
              <Link
                href="/create-blog"
                className="group font-mono uppercase font-bold tracking-wider px-8 py-4 bg-blue-400 border-4 border-black text-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
              >
                CREATE BLOG
              </Link>
              <a
                href="https://github.com/rsfyi/blok.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase font-bold tracking-wider px-8 py-4 border-4 border-black text-black text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
              >
                FORK ON GITHUB
              </a>
            </div>

            {/* Marquee effect */}
            <Marquee
              className="-mx-4"
              items={[
                { text: "RAW" },
                { text: "BOLD" },
                { text: "LOUD" },
                { text: "AUTHENTIC" },
                { text: "BRUTALIST" }
              ]}
              speed="normal"
              direction="left"
              repeat={2}
              gap={4}
            />
          </div>
        </div>
      </section>

      {/* Features Section - Brutalist Style */}
      <section className="py-20 bg-white" id="components">
        <div className="container mx-auto px-4">
          <div className="mb-16 -rotate-1">
            <h2 className="text-5xl font-mono font-black uppercase border-4 border-black inline-block p-4 bg-blue-400 transform rotate-2">
              Component Showcase
            </h2>
            <p className="font-mono text-lg mt-6 max-w-2xl border-l-4 border-black pl-4">
              Explore our growing collection of UNAPOLOGETICALLY BOLD components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Editor Card - Brutalist */}
            <div className="border-4 border-black bg-white transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-red-500 p-8 border-b-4 border-black flex items-center justify-center">
                <Mail className="text-black h-16 w-16" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-mono font-bold uppercase mb-3 flex justify-between">
                  Email Editor
                  <span className="text-red-500">01</span>
                </h3>
                <p className="font-mono mb-4">
                  A Gmail-like email composer with brutalist styling and zero
                  compromises
                </p>
                <Link
                  href="/email-editor"
                  className="inline-flex items-center text-md font-mono font-bold uppercase text-red-500 hover:underline"
                >
                  VIEW COMPONENT <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Brutalist Design Card */}
            <div className="border-4 border-black bg-white transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-blue-500 p-8 border-b-4 border-black flex items-center justify-center">
                <Palette className="text-black h-16 w-16" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-mono font-bold uppercase mb-3 flex justify-between">
                  Brutalist Button
                  <span className="text-blue-500">02</span>
                </h3>
                <p className="font-mono mb-4">
                  Bold, raw, and expressive buttons that make minimalism look
                  boring
                </p>
                <Link
                  href="/brutalist-design"
                  className="inline-flex items-center text-md font-mono font-bold uppercase text-blue-500 hover:underline"
                >
                  VIEW COMPONENT <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Coming Soon Card */}
            <div className="border-4 border-black bg-white transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-yellow-400 p-8 border-b-4 border-black flex items-center justify-center">
                <Zap className="text-black h-16 w-16" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-mono font-bold uppercase mb-3 flex justify-between">
                  Coming Soon
                  <span className="text-yellow-400">03</span>
                </h3>
                <p className="font-mono mb-4">
                  More brutalist components in development. NOT FOR THE FAINT OF
                  HEART.
                </p>
                <span className="inline-flex items-center text-md font-mono font-bold uppercase text-yellow-400">
                  IN DEVELOPMENT{" "}
                  <span className="relative ml-2 h-4 w-4">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative h-4 w-4 rounded-full bg-yellow-400"></span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Brutalist */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-mono font-black uppercase mb-8 inline-block border-b-4 border-white pb-2">
              READY TO BUILD <span className="text-yellow-400">LOUD</span>{" "}
              INTERFACES?
            </h2>
            <p className="font-mono text-xl mb-12 max-w-xl mx-auto">
              USE OUR BRUTALIST COMPONENTS TO CREATE WEBSITES THAT REFUSE TO BE
              IGNORED.
            </p>
            <a
              href="https://github.com/rsfyi/blok.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-mono uppercase font-bold tracking-wider px-8 py-4 bg-white text-black text-xl shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all border-4 border-white"
            >
              Get Started <ArrowRight className="ml-2 h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Brutalist */}
      <footer className="border-t-4 border-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <Logo size={40} />
              <div className="ml-4 font-mono">
                <div className="text-lg font-bold">bloks.dev</div>
                <div className="text-sm">
                  {" "}
                  {new Date().getFullYear()} - NO RIGHTS RESERVED
                </div>
              </div>
            </div>
            <div className="flex space-x-8">
              <a
                href="#"
                className="font-mono uppercase font-bold hover:line-through"
              >
                PRIVACY
              </a>
              <a
                href="#"
                className="font-mono uppercase font-bold hover:line-through"
              >
                TERMS
              </a>
              <a
                href="#"
                className="font-mono uppercase font-bold hover:line-through"
              >
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
