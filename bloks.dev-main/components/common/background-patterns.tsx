import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundPatternProps {
  pattern: "grid" | "noise" | "both";
  className?: string;
  gridOpacity?: number;
  noiseOpacity?: number;
  noiseMixBlend?: string;
}

/**
 * A reusable component for brutalist design background patterns
 */
export function BackgroundPattern({
  pattern = "both",
  className,
  gridOpacity = 0.05,
  noiseOpacity = 0.03,
  noiseMixBlend = "multiply",
}: BackgroundPatternProps) {
  return (
    <>
      {(pattern === "grid" || pattern === "both") && (
        <div
          className={cn(
            "absolute inset-0 bg-[url('/grid-pattern.svg')]",
            className
          )}
          style={{ opacity: gridOpacity }}
        ></div>
      )}
      {(pattern === "noise" || pattern === "both") && (
        <div
          className={cn(
            "absolute inset-0 bg-[url('/noise.png')]",
            className
          )}
          style={{ 
            opacity: noiseOpacity,
            mixBlendMode: noiseMixBlend as any 
          }}
        ></div>
      )}
    </>
  );
}
