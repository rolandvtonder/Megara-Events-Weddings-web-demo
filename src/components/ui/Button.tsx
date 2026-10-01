import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "coral" | "ink" | "outline" | "outline-light" | "light" | "gold";

// Each pill has a fill colour that wipes up from the bottom on hover.
const VARIANTS: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  coral: { base: "bg-coral-deep text-paper", fill: "bg-ink", hoverText: "group-hover:text-paper" },
  ink: { base: "bg-ink text-paper", fill: "bg-coral-deep", hoverText: "group-hover:text-paper" },
  gold: { base: "bg-gold text-ink", fill: "bg-ink", hoverText: "group-hover:text-gold" },
  outline: { base: "border border-ink/70 text-ink", fill: "bg-ink", hoverText: "group-hover:text-paper" },
  "outline-light": { base: "border border-paper/70 text-paper", fill: "bg-paper", hoverText: "group-hover:text-ink" },
  light: { base: "bg-paper text-ink", fill: "bg-gold", hoverText: "group-hover:text-ink" },
};

type Common = {
  variant?: Variant;
  children: ReactNode;
  icon?: "arrow" | "up-right" | "none";
  size?: "sm" | "md";
  className?: string;
};

function Inner({ variant = "coral", children, icon = "arrow" }: Common) {
  const v = VARIANTS[variant];
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span aria-hidden className={cn("absolute inset-0 origin-bottom scale-y-0 rounded-[inherit] transition-transform duration-500 ease-expo group-hover:scale-y-100", v.fill)} />
      <span className={cn("relative z-10 inline-flex items-center gap-2.5 transition-colors duration-300", v.hoverText)}>
        {children}
        {icon !== "none" && <Icon aria-hidden className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" strokeWidth={1.5} />}
      </span>
    </>
  );
}

function classes({ variant = "coral", size = "md", className }: Omit<Common, "children">) {
  return cn(
    "group relative inline-flex min-h-11 select-none items-center whitespace-nowrap justify-center overflow-hidden rounded-full font-sans font-medium uppercase tracking-[0.18em] transition-[transform,box-shadow] duration-300 active:scale-[0.97]",
    size === "sm" ? "px-5 py-2.5 text-[0.6875rem]" : "px-7 py-3.5 text-xs",
    VARIANTS[variant].base,
    className,
  );
}

export function PillLink({ href, ...props }: Common & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children" | "className">) {
  const { variant, children, icon, size, className, ...rest } = props;
  return (
    <Link href={href} className={classes({ variant, size, className })} {...rest}>
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </Link>
  );
}

export function PillButton(props: Common & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">) {
  const { variant, children, icon, size, className, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes({ variant, size, className })} {...rest}>
      <Inner variant={variant} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}

/** Small uppercase text link with a sliding arrow. */
export function ArrowLink({ href, children, className, light }: { href: string; children: ReactNode; className?: string; light?: boolean }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex min-h-11 items-center gap-2 eyebrow text-[0.6875rem]", light ? "text-paper/85 hover:text-paper" : "text-ink/75 hover:text-ink", className)}
    >
      <span className="u-link pb-0.5">{children}</span>
      <ArrowRight aria-hidden className="size-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
}
