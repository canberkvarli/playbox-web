import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-display text-[0.7rem] uppercase tracking-[0.06em] leading-none",
  {
    variants: {
      variant: {
        neutral: "bg-paper/10 text-paper/70",
        coral: "bg-coral text-ink",
        mauve: "bg-mauve text-paper",
        butter: "bg-butter text-ink",
        outline: "border border-paper/30 text-paper/70",
        danger: "bg-coral/15 text-coral border border-coral/40",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
