import Image from "next/image";

/**
 * JS Rani Foods logo with the registered ® mark anchored to the oval.
 * The wordmark "JS RANI FOODS" lives inside the artwork; the ® is added here
 * so the registered trademark appears wherever the logo is used.
 */
export default function Logo({
  size = 56,
  priority = false,
  className = "",
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/js-rani-logo.png"
        alt="JS Rani Foods registered logo"
        width={size}
        height={size}
        priority={priority}
        className="h-full w-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
      />
      <sup
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-[26%] text-gold-bright"
        style={{ fontSize: Math.max(9, size * 0.16), lineHeight: 1 }}
      >
        ®
      </sup>
    </span>
  );
}
