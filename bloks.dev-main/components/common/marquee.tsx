import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeItem {
  text: string;
  prefix?: string;
}

interface MarqueeProps {
  items: MarqueeItem[];
  className?: string;
  itemClassName?: string;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  repeat?: number; // How many times to repeat the items
  gap?: number; // Gap between items in rem
}

/**
 * A reusable marquee component with brutalist styling
 */
export function Marquee({
  items,
  className,
  itemClassName,
  direction = "left",
  speed = "normal",
  repeat = 2,
  gap = 4,
}: MarqueeProps) {
  // Generate the animation class based on direction and speed
  const getAnimationClass = () => {
    const baseClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";
    
    switch (speed) {
      case "slow":
        return `${baseClass}-slow`;
      case "fast":
        return `${baseClass}-fast`;
      default:
        return baseClass;
    }
  };

  // Create an array of repeated items
  const repeatedItems = Array.from({ length: repeat }, (_, i) => 
    items.map((item, index) => ({ ...item, key: `${i}-${index}` }))
  ).flat();

  return (
    <div className={cn("overflow-hidden border-y-4 border-black py-2", className)}>
      <div className={cn(getAnimationClass(), "whitespace-nowrap")}>
        {repeatedItems.map((item, index) => (
          <span 
            key={item.key} 
            className={cn(`mx-${gap} text-2xl font-mono font-bold`, itemClassName)}
          >
            {item.prefix || "★"} {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
