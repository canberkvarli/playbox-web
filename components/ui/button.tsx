import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display tracking-[0.02em] uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        coral: "bg-coral text-ink hover:bg-coral-soft active:scale-[0.98]",
        outline: "border border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink active:scale-[0.98]",
        ghost: "bg-transparent text-paper hover:text-coral",
        ink: "bg-ink text-paper hover:bg-ink-soft",
      },
      size: {
        default: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-lg",
        xl: "h-16 px-12 text-xl",
        sm: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: { variant: "coral", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
