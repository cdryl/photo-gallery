type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 font-manrope text-xs uppercase tracking-[0.38em] text-[#b38a46]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-cormorant text-4xl uppercase tracking-[0.18em] text-stone-100 md:text-5xl">
        {title}
      </h2>
      <div className={align === "center" ? "mt-5 flex justify-center" : "mt-5"}>
        <span className="block h-px w-24 bg-[#b38a46]" />
      </div>
    </div>
  );
}
