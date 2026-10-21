import type { MouseEventHandler, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils/cn";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "gold" | "navy" | "outline-light" | "outline-dark";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  withArrow?: boolean;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-[2px] px-7 py-3.5 text-[0.8125rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 ease-out";

const variants: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  gold: "bg-gold text-navy-deep hover:bg-gold-pale shadow-[0_10px_28px_-12px_rgba(182,154,104,0.65)]",
  navy: "bg-navy text-cream hover:bg-navy-soft shadow-[0_10px_28px_-12px_rgba(23,43,58,0.55)]",
  "outline-light":
    "border border-cream/45 text-cream hover:border-cream hover:bg-cream/10 backdrop-blur-[2px]",
  "outline-dark": "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-cream",
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className,
  onClick,
  withArrow = true,
}: ButtonLinkProps) {
  return (
    <a href={href} onClick={onClick} className={cn(base, variants[variant], className)}>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </a>
  );
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** Underlined editorial link with animated gold rule. */
export function TextLink({ href, children, tone = "dark", className, onClick }: TextLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group/link relative inline-flex items-center gap-2 pb-1 text-[0.8125rem] font-semibold tracking-[0.12em] uppercase",
        tone === "dark" ? "text-navy" : "text-cream",
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight
        className="h-4 w-4 text-gold-deep transition-transform duration-300 group-hover/link:translate-x-1"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-500 ease-out group-hover/link:scale-x-0",
          tone === "dark" ? "bg-navy/25" : "bg-cream/35"
        )}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover/link:scale-x-100"
      />
    </a>
  );
}
