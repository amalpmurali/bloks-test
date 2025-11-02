import Image from "next/image";
import { Clock, Calendar, User, Tag } from "lucide-react";

export default function BlogPage() {
  return (
    <article className="p-6 md:p-8">
      {/* Blog post header */}
      <header className="mb-8">
        <div className="mb-4 font-mono text-sm uppercase flex items-center gap-4">
          <span className="flex items-center gap-1 border-2 border-black p-1 bg-yellow-400">
            <Calendar size={14} className="text-black" />
            <span>March 9, 2025</span>
          </span>
          <span className="flex items-center gap-1 border-2 border-black p-1 bg-blue-400">
            <User size={14} className="text-black" />
            <span>John Doe</span>
          </span>
          <span className="flex items-center gap-1 border-2 border-black p-1 bg-green-400">
            <Tag size={14} className="text-black" />
            <span>Brutalism</span>
          </span>
          <span className="flex items-center gap-1 border-2 border-black p-1 bg-red-400">
            <Clock size={14} className="text-black" />
            <span>6 min read</span>
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tight mb-4">
          <span className="relative inline-block">
            Embracing Brutalist Design
            <span className="absolute -left-1 -top-1 text-red-500 opacity-70 blur-[0.3px] select-none">
              Embracing Brutalist Design
            </span>
            <span className="absolute -right-1 -bottom-1 text-blue-500 opacity-70 blur-[0.3px] select-none">
              Embracing Brutalist Design
            </span>
          </span>
        </h1>
        <p className="font-mono text-lg border-l-4 border-black pl-4">
          A comprehensive guide to creating bold, raw, and unforgettable web experiences with brutalist design principles.
        </p>
      </header>

      {/* Featured image */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-8 border-4 border-black rotate-[-0.5deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-4 right-4 bg-yellow-400 border-2 border-black p-2 z-10 rotate-3 font-mono font-bold uppercase text-sm">
          Featured Image
        </div>
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-2xl font-bold">BRUTALIST IMAGE</div>
            <div className="font-mono text-sm">(Image placeholder)</div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 border-4 border-black p-4 bg-gray-100 rotate-[0.5deg]">
        <h2 className="font-mono font-bold text-xl mb-2 uppercase">Table of Contents</h2>
        <ol className="list-decimal ml-5 font-mono">
          <li className="mb-1"><a href="#introduction" className="hover:bg-yellow-400 transition-colors">Introduction to Brutalism</a></li>
          <li className="mb-1"><a href="#history" className="hover:bg-yellow-400 transition-colors">History and Origins</a></li>
          <li className="mb-1"><a href="#principles" className="hover:bg-yellow-400 transition-colors">Core Principles</a></li>
          <li className="mb-1"><a href="#implementation" className="hover:bg-yellow-400 transition-colors">Implementation Techniques</a></li>
          <li className="mb-1"><a href="#examples" className="hover:bg-yellow-400 transition-colors">Notable Examples</a></li>
          <li className="mb-1"><a href="#conclusion" className="hover:bg-yellow-400 transition-colors">Conclusion</a></li>
        </ol>
      </div>

      {/* Main content */}
      <div className="prose prose-lg max-w-none font-mono">
        <section id="introduction" className="mb-8">
          <h2 className="text-3xl font-bold mb-4 uppercase bg-yellow-400 inline-block p-2 -rotate-1 border-2 border-black">Introduction to Brutalism</h2>
          <p className="mb-4">
            Brutalist design is characterized by its raw, unfiltered aesthetic. The term originates from the French word &quot;brut,&quot; meaning raw or unrefined. In web design, brutalism emerged as a reaction against the polished, homogenized look that dominated the internet.
          </p>
          <p className="mb-4">
            At its core, brutalist design celebrates:<br />
            - Functionality over form<br />
            - Stark contrasts<br />
            - Bold typography<br />
            - Unfiltered user experiences
          </p>
          <blockquote className="border-l-4 border-black pl-4 italic my-6">
            &quot;Brutalism is honesty in design. It doesn&apos;t pretend to be something it&apos;s not.&quot; — Anonymous Designer
          </blockquote>
        </section>

        <section id="history" className="mb-8">
          <h2 className="text-3xl font-bold mb-4 uppercase bg-blue-400 inline-block p-2 rotate-1 border-2 border-black">History and Origins</h2>
          <p className="mb-4">
            The brutalist movement in web design draws inspiration from brutalist architecture of the 1950s and 1960s. Characterized by exposed concrete structures and a functional approach, brutalist architecture emphasized the raw and unfinished.
          </p>
          <p className="mb-4">
            In the digital realm, brutalism emerged in the mid-2010s as designers sought to break free from the constraints of flat design and material design principles that had standardized much of the web&apos;s appearance.
          </p>
        </section>

        <section id="principles" className="mb-8">
          <h2 className="text-3xl font-bold mb-4 uppercase bg-red-400 inline-block p-2 -rotate-[0.5deg] border-2 border-black">Core Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border-2 border-black p-4 bg-yellow-100">
              <h3 className="text-xl font-bold mb-2">Raw Content</h3>
              <p>Emphasizing content in its purest form without unnecessary embellishments.</p>
            </div>
            <div className="border-2 border-black p-4 bg-blue-100">
              <h3 className="text-xl font-bold mb-2">Bold Typography</h3>
              <p>Using assertive, often monospaced fonts to create striking visual hierarchy.</p>
            </div>
            <div className="border-2 border-black p-4 bg-green-100">
              <h3 className="text-xl font-bold mb-2">Stark Contrasts</h3>
              <p>Implementing high-contrast elements to create visual tension and interest.</p>
            </div>
            <div className="border-2 border-black p-4 bg-red-100">
              <h3 className="text-xl font-bold mb-2">Functional Minimalism</h3>
              <p>Stripping away decorative elements while maintaining essential functionality.</p>
            </div>
          </div>
        </section>

        <p className="text-center font-bold text-xl my-8">More sections coming soon...</p>
      </div>
    </article>
  );
}
