"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, PointerEvent } from "react";
import { useRef } from "react";
import { navigationItems } from "@/constants/home";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Ornament } from "@/components/ui/Ornament";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerItems = navigationItems.map((item) => ({
    label: item,
    href: `#${item.toLowerCase().replaceAll(" ", "-")}`,
  }));

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const section = sectionRef.current;

    if (!section || event.pointerType === "touch") {
      return;
    }

    const rect = section.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    section.style.setProperty("--hero-image-x", `${x * -18}px`);
    section.style.setProperty("--hero-image-y", `${y * -14}px`);
    section.style.setProperty("--hero-content-x", `${x * 10}px`);
    section.style.setProperty("--hero-content-y", `${y * 8}px`);
  }

  function handlePointerLeave() {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    section.style.setProperty("--hero-image-x", "0px");
    section.style.setProperty("--hero-image-y", "0px");
    section.style.setProperty("--hero-content-x", "0px");
    section.style.setProperty("--hero-content-y", "0px");
  }

  return (
    <section
      id="start"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-screen overflow-hidden border-b border-[#2b241b]"
      style={
        {
          "--hero-image-x": "0px",
          "--hero-image-y": "0px",
          "--hero-content-x": "0px",
          "--hero-content-y": "0px",
        } as CSSProperties
      }
    >
      <Image
        src="/images/hero3.jpg"
        alt="Jelen w mrocznym lesie o swicie"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 scale-[1.04] object-cover transition-transform duration-500 ease-out motion-reduce:transform-none"
        style={{
          transform:
            "translate3d(var(--hero-image-x), var(--hero-image-y), 0) scale(1.04)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,3,0.92)_0%,rgba(3,4,3,0.76)_32%,rgba(3,4,3,0.26)_68%,rgba(3,4,3,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.16)_52%,#050605_100%)]" />

      <SiteHeader logoHref="#start" items={headerItems} className="py-8" />

      <div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-104px)] max-w-7xl items-center px-6 pb-20 pt-10 transition-transform duration-500 ease-out motion-reduce:transform-none md:px-10"
        style={{
          transform: "translate3d(var(--hero-content-x), var(--hero-content-y), 0)",
        }}
      >
        <div className="max-w-3xl">
          <p className="mb-7 font-manrope text-xs uppercase tracking-[0.42em] text-[#b38a46]">
            Fotografia przyrodnicza
          </p>
          <h1 className="font-cormorant text-6xl uppercase leading-[0.95] tracking-[0.16em] text-stone-100 md:text-8xl lg:text-9xl">
            Dariusz
            <br />
            Dryl
          </h1>
          <div className="mt-7">
            <Ornament />
          </div>
          <p className="mt-8 max-w-xl font-manrope text-lg uppercase leading-9 tracking-[0.28em] text-stone-300">
            Dzika przyroda Polski uchwycona w obiektywie
          </p>
          <a
            href="#galeria"
            className="mt-10 inline-flex h-14 items-center border border-[#b38a46] px-8 font-manrope text-xs uppercase tracking-[0.26em] text-[#d4bd8f] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#c7a66a]"
            >
              Odkryj galerie
              <ArrowRight aria-hidden="true" className="ml-6 h-4 w-4" strokeWidth={1.5} />
            </a>
        </div>
      </div>
    </section>
  );
}
