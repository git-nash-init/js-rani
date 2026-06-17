import { COMPANY } from "@/lib/content";
import { Phone, Truck } from "./icons";

export default function AnnouncementBar() {
  return (
    <div className="bg-green-deep text-cream/90 text-[12px] sm:text-[13px]">
      <div className="mx-auto flex flex-wrap max-w-7xl items-center justify-center gap-x-6 gap-y-2 px-4 py-2 text-center sm:justify-between">
        <p className="hidden items-center gap-2 font-medium tracking-wide sm:flex">
          <span className="text-gold-bright">FSSAI</span>
          <span className="text-gold/50">·</span>
          <span className="text-gold-bright">HACCP</span>
          <span className="text-gold/50">·</span>
          <span className="text-gold-bright">ISO 22000</span>
          <span className="ml-1 hidden md:inline">Certified Premium Ghee</span>
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-medium tracking-wide">
          <Truck className="h-4 w-4 text-gold shrink-0" />
          <span className="whitespace-nowrap">All-India Delivery</span>
          <span className="text-gold/50">·</span>
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-bright whitespace-nowrap"
          >
            <Phone className="h-3.5 w-3.5 text-gold shrink-0" />
            {COMPANY.phoneDisplay}
          </a>
        </p>
      </div>
    </div>
  );
}
