import type { PhotoSlot } from "@/types/home";

type PhotoPlaceholderProps = {
  slot: PhotoSlot;
};

export function PhotoPlaceholder({ slot }: PhotoPlaceholderProps) {
  return (
    <figure
      className={`group relative min-h-72 overflow-hidden border border-[#3a3327] bg-[#0a0d0a] ${slot.className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(176,139,74,0.18),transparent_28%),linear-gradient(145deg,rgba(61,73,54,0.72),rgba(4,5,4,0.96)_62%)]" />
      <div className="absolute inset-x-8 top-8 h-px bg-[#b38a46]/25" />
      <div className="absolute inset-y-8 left-8 w-px bg-[#b38a46]/18" />
      <div className="absolute bottom-8 right-8 h-20 w-28 border-b border-r border-[#b38a46]/20" />
      <div className="absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-55">
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b38a46]/20" />
        <div className="absolute left-1/2 top-1/2 h-28 w-px -translate-y-1/2 bg-[#b38a46]/20" />
        <div className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 bg-[#b38a46]/20" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
        <p className="font-manrope text-[0.65rem] uppercase tracking-[0.32em] text-[#b38a46]">
          {slot.label}
        </p>
        <h3 className="mt-2 font-cormorant text-2xl text-stone-100">{slot.title}</h3>
        <p className="mt-2 font-manrope text-sm text-stone-400">Placeholder: {slot.id}</p>
      </figcaption>
    </figure>
  );
}
