import { cn } from "../utils/cn";

interface LogoProps {
  /** "light" for dark backgrounds, "dark" for light backgrounds */
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}

const LOGO_SRC = "/gs-property-logo.png";
/** Sizes were derived from the supplied 249x42 transparent logo artwork. */
export default function Logo({ tone = "dark", compact = false, className }: LogoProps) {
  const light = tone === "light";
  return (
    <span
      className={cn("site-logo inline-flex", className)}
      aria-label="GS Property Group"
    >
      <img
        src={LOGO_SRC}
        alt=""
        width={249}
        height={42}
        draggable={false}
        loading="eager"
        decoding="async"
        className={cn(
          "h-auto transition-opacity duration-300",
          compact
            ? "w-[9.25rem] sm:w-[10.5rem]"
            : "w-[10.25rem] sm:w-[11.75rem]",
        )}
        /* The source artwork is black on transparency; invert it so the
           wordmark reads as a warm off-white on the navy hero, drawer and
           footer surfaces without relying on second artwork version. */
        style={
          light
            ? {
                filter: "invert(1) sepia(0.16) saturate(1.05) brightness(0.97)",
              }
            : undefined
        }
      />
    </span>
  );
}
