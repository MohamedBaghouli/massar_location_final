import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ActionColor = "amber" | "blue" | "emerald" | "red" | "slate" | "violet";

interface ActionIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  color?: ActionColor;
  icon: LucideIcon;
  label: string;
}

const colorClasses: Record<ActionColor, string> = {
  amber:
    "text-amber-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:text-amber-300 dark:hover:border-amber-900 dark:hover:bg-amber-950/30 dark:hover:text-amber-200",
  blue:
    "text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-300 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-200",
  emerald:
    "text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:text-emerald-300 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-200",
  red:
    "text-red-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:text-red-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-200",
  slate:
    "text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100",
  violet:
    "text-violet-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:text-violet-300 dark:hover:border-violet-900 dark:hover:bg-violet-950/30 dark:hover:text-violet-200",
};

export function ActionIconButton({
  asChild = false,
  className,
  color = "slate",
  disabled,
  icon: Icon,
  label,
  type = "button",
  children,
  ...props
}: ActionIconButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <span className="group/action relative inline-flex">
      <Comp
        aria-disabled={asChild && disabled ? true : undefined}
        aria-label={label}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900",
          colorClasses[color],
          asChild && disabled && "pointer-events-none opacity-50",
          className,
        )}
        disabled={asChild ? undefined : disabled}
        title={label}
        type={asChild ? undefined : type}
        {...props}
      >
        {asChild && children ? children : <Icon className="h-4 w-4" />}
      </Comp>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/action:opacity-100 group-focus-within/action:opacity-100 dark:bg-slate-100 dark:text-slate-950">
        {label}
      </span>
    </span>
  );
}
