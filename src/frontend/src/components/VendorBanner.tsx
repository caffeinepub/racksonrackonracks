import { Calendar, Clock, MapPin } from "lucide-react";

export default function VendorBanner() {
  const text =
    "AT HOME — COME SHOPPING WITH US · MARCH 7, 2026 · LOS ANGELES · 5:00AM TO 5:30PM  ";

  return (
    <div className="vendor-banner overflow-hidden py-2.5 relative">
      <div className="flex items-center gap-2 px-4 mb-1 justify-center flex-wrap">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <Clock className="w-3.5 h-3.5 shrink-0" />
        <span className="font-display font-black text-xs uppercase tracking-widest">
          Vendor Event
        </span>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="font-heading font-semibold text-xs px-4">
            {text}
          </span>
          <span className="font-heading font-semibold text-xs px-4">
            {text}
          </span>
          <span className="font-heading font-semibold text-xs px-4">
            {text}
          </span>
          <span className="font-heading font-semibold text-xs px-4">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
