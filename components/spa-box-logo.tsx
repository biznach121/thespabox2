import Image from "next/image";

interface SpaBoxLogoProps {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}

const LOGO_URL =
  "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780581738/xis1usvfhpxdxhhc2jbj.png";

export function SpaBoxLogo({ className = "", compact = false, tone = "light" }: SpaBoxLogoProps) {
  return (
    <span
      className={[
        "relative inline-block",
        compact ? "h-[60px] w-[172px]" : "h-[96px] w-[260px]",
        className,
      ].join(" ")}
      aria-label="The SpaBox - Your Sanctuary of Beauty and Peace"
    >
      <Image
        src={LOGO_URL}
        alt="The SpaBox - Your Sanctuary of Beauty and Peace"
        fill
        sizes={compact ? "172px" : "260px"}
        className={[
          "object-contain",
          tone === "dark" ? "brightness-0 opacity-80" : "",
        ].join(" ")}
        priority
        unoptimized
      />
    </span>
  );
}
