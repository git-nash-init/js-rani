import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const Crown = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M3 7l4 4 5-7 5 7 4-4-1.5 12H4.5L3 7z" />
    <path d="M4.5 19h15" />
  </svg>
);

export const Phone = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const Mail = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

export const MapPin = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const WhatsApp = (props: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.821 11.821 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);

export const Leaf = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
);

export const ShieldCheck = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Check = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const Menu = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Close = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Quote = (props: IconProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.5 5C6.46 6.2 4 9.2 4 12.5V19h6.5v-6.5H7.2c.2-2 1.6-3.6 3.3-4.3L9.5 5zm10 0c-3.04 1.2-5.5 4.2-5.5 7.5V19H20.5v-6.5h-3.3c.2-2 1.6-3.6 3.3-4.3L19.5 5z" />
  </svg>
);

export const Star = (props: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2l2.9 6.26 6.86.6-5.2 4.52 1.56 6.71L12 16.9 5.88 20.6l1.56-6.71-5.2-4.52 6.86-.6L12 2z" />
  </svg>
);

export const ChevronLeft = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const Truck = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M14 18V6a1 1 0 0 0-1-1H2v13" />
    <path d="M14 9h4l3 3v6h-7" />
    <circle cx="6.5" cy="18.5" r="2" />
    <circle cx="17.5" cy="18.5" r="2" />
  </svg>
);

export const ArrowUp = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);
