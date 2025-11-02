"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const brutalistButtonVariants = cva(
  "relative inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all border-2 border-black rounded-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground border-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-accent-foreground border-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive border-destructive",
        ghost:
          "bg-transparent text-primary hover:bg-accent hover:text-accent-foreground border-accent",
        outline:
          "bg-white text-primary hover:bg-accent hover:text-accent-foreground border-primary",
        ring: "bg-white text-primary border-primary hover:ring-2 hover:ring-ring hover:ring-offset-2",
        gradient: "border-primary text-primary-foreground bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
        link: "bg-transparent hover:bg-transparent text-primary hover:text-primary hover:underline hover:underline-offset-4 border-none shadow-none p-0 inline-flex items-center",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10 p-0 flex items-center justify-center",
      },
      withShadow: {
        true: "",
        false: "",
      },
      loading: {
        true: "",
        false: "",
      },
      withIcon: {
        left: "",
        right: "",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      withShadow: true,
      loading: false,
      withIcon: "none",
    },
    compoundVariants: [
      {
        withShadow: false,
        className: "",
      },
      {
        variant: "link",
        className: "shadow-none",
      },
    ],
  }
);

export interface BrutalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brutalistButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const BrutalistButton = React.forwardRef<
  HTMLButtonElement,
  BrutalistButtonProps
>(
  (
    {
      className,
      variant,
      size,
      withShadow = true,
      loading = false,
      withIcon = "none",
      asChild = false,
      icon,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Create the button content
    const buttonContent = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin h-5 w-5" />
          </span>
        )}
        <span
          className={cn("flex items-center gap-2", isLoading && "invisible")}
        >
          {withIcon === "left" && icon}
          {children}
          {withIcon === "right" && icon}
        </span>
      </>
    );

    // If withShadow is true, wrap the button in a container with shadow
    if (withShadow) {
      return (
        <div className="relative inline-block group">
          <div
            className={cn(
              "absolute top-1 left-1 w-full h-full bg-black transition-all group-hover:top-0 group-hover:left-0",
              size === "sm" &&
                "top-[3px] left-[3px] group-hover:top-0 group-hover:left-0",
              size === "lg" &&
                "top-[5px] left-[5px] group-hover:top-0 group-hover:left-0"
            )}
          ></div>
          <Comp
            className={cn(
              brutalistButtonVariants({
                variant,
                size,
                withShadow,
                loading,
                withIcon,
                className,
              })
            )}
            ref={ref}
            disabled={disabled || isLoading}
            {...props}
          >
            {buttonContent}
          </Comp>
        </div>
      );
    }

    // Otherwise, just return the button
    return (
      <Comp
        className={cn(
          brutalistButtonVariants({
            variant,
            size,
            withShadow,
            loading,
            withIcon,
            className,
          })
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {buttonContent}
      </Comp>
    );
  }
);

BrutalistButton.displayName = "BrutalistButton";

export { BrutalistButton, brutalistButtonVariants };
