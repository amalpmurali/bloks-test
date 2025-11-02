"use client";

import { cn } from "@/lib/utils";

// Radio button group in brutalist style
interface BrutalistRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function BrutalistRadioGroup({
  name,
  options,
  defaultValue,
  onChange,
  className,
}: BrutalistRadioGroupProps) {
  return (
    <div className={cn("space-x-3 flex text-sm font-medium", className)}>
      {options.map((option) => (
        <label key={option.value}>
          <input
            className="sr-only peer"
            name={name}
            type="radio"
            value={option.value}
            defaultChecked={option.value === defaultValue}
            onChange={(e) => onChange?.(e.target.value)}
          />
          <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
            {option.label}
          </div>
        </label>
      ))}
    </div>
  );
}
