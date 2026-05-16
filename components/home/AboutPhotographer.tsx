import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutPhotographer() {
  return (
    <section
      id="o-fotografie"
      className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[0.86fr_1fr]"
    >
      <div className="relative min-h-[30rem] overflow-hidden border border-[#3a3327] bg-[#0b0d0b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_24%,rgba(179,138,70,0.16),transparent_22%),linear-gradient(140deg,rgba(34,46,34,0.8),#040504_64%)]" />
        <div className="absolute left-10 top-10 font-manrope text-xs uppercase tracking-[0.32em] text-[#b38a46]">
          Placeholder: portrait-photographer
        </div>
        <div className="absolute bottom-10 left-10 right-10 border-t border-[#b38a46]/25 pt-6">
          <p className="font-cormorant text-3xl text-stone-100">Portret autora w terenie</p>
          <p className="mt-3 font-manrope text-sm text-stone-400">
            Miejsce na nastrojowe zdjecie fotografa z aparatem.
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <SectionHeading title="O fotografie" />
          <p className="mt-8 max-w-2xl font-manrope text-lg leading-9 text-stone-300">
            Natura od zawsze byla azylem i zrodlem inspiracji. Fotografia pozwala
            zatrzymac ulotne chwile: spojrzenia, ruch, swiatlo i cisze, ktora trwa
            tylko przez moment.
          </p>
          <p className="mt-5 max-w-2xl font-manrope text-lg leading-9 text-stone-300">
            W moich obrazach staram sie pokazac dzika przyrode Polski taka, jaka jest
            najblizej prawdy: spokojna, nieujarzmiona i pelna zycia.
          </p>
          <p className="mt-10 font-cormorant text-4xl italic text-[#c7a66a]">
            Dariusz Dryl
          </p>
        </div>
      </div>
    </section>
  );
}
