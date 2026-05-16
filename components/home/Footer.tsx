export function Footer() {
  return (
    <footer
      id="kontakt"
      className="border-t border-[#2b241b] bg-black px-6 py-8 font-manrope text-stone-500 md:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="w-full text-center md:text-left">
          <p className="font-cormorant text-2xl uppercase tracking-[0.12em] text-[#c7a66a]">
            Dariusz Dryl
          </p>
          <p className="mt-1 text-sm">&copy; 2026 Wszystkie prawa zastrzezone</p>
        </div>
      </div>
    </footer>
  );
}
