import { SiteHeader } from "@/components/layout/SiteHeader";
import { Ornament } from "@/components/ui/Ornament";

const galleryNavItems = [
  {
    label: "Start",
    href: "/",
  },
  {
    label: "Galeria",
    href: "/gallery",
    active: true,
  },
];

export function GalleryHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#2b241b] bg-[#070907] pb-14 pt-8 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_12%,rgba(179,138,70,0.14),transparent_24%),linear-gradient(180deg,rgba(17,25,18,0.86),rgba(5,6,5,1))]" />
      <SiteHeader logoHref="/" items={galleryNavItems} />

      <div className="relative z-10 mx-auto mt-20 max-w-7xl px-6 md:px-10">
        <p className="mb-6 font-manrope text-xs uppercase tracking-[0.42em] text-[#b38a46]">
          Wybrane kadry natury
        </p>
        <h1 className="font-cormorant text-6xl uppercase leading-none tracking-[0.18em] text-stone-100 md:text-8xl">
          Galeria
        </h1>
        <div className="mt-7">
          <Ornament />
        </div>
        <p className="mt-8 max-w-2xl font-manrope text-lg uppercase leading-9 tracking-[0.24em] text-stone-300">
          Wybrane kadry natury. Uchwycone z szacunkiem i cisza.
        </p>
      </div>
    </section>
  );
}
