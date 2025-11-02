import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: number;
  className?: string;
  href?: string;
  withText?: boolean;
}

export function Logo({ size = 24, className = "", href = "/", withText = true }: LogoProps) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${className}`}>
      {/* Building block icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect x="4" y="4" width="14" height="14" rx="2" fill="#4285F4" />{" "}
        {/* Blue block */}
        <rect x="14" y="14" width="14" height="14" rx="2" fill="#EA4335" />{" "}
        {/* Red block */}
        <rect x="4" y="14" width="10" height="4" rx="1" fill="#FBBC05" />{" "}
        {/* Yellow connector */}
        <rect x="14" y="4" width="4" height="10" rx="1" fill="#34A853" />{" "}
        {/* Green connector */}
      </svg>

      {/* Text logo */}
      {withText && (
        <span className="font-mono font-black text-2xl uppercase tracking-tight">
          Bloks<span className="text-primary">.dev</span>
        </span>
      )}
    </Link>
  );
}

// Animation variant with hover effects
export function AnimatedLogo(props: LogoProps) {
  return (
    <div className="group">
      <Logo
        {...props}
        className={`transition-all duration-300 ease-in-out group-hover:scale-105 ${props.className || ""}`}
      />
      <div className="w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-violet-500 mt-1"></div>
    </div>
  );
}
