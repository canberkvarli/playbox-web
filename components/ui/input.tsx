import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:border-coral transition-colors",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
