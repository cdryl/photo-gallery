"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoLink } from "@/components/ui/LogoLink";

export type SiteNavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type SiteHeaderProps = {
  logoHref?: string;
  items: SiteNavItem[];
  className?: string;
};

const facebookUrl = "https://www.facebook.com/dariusz.dryl.fotografia.przyrodnicza";

function FacebookLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-stone-400 transition hover:text-[#c7a66a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#c7a66a] ${className}`}
      aria-label="Facebook Dariusz Dryl Fotografia Przyrodnicza"
    >
      <span
        aria-hidden="true"
        className="block h-5 w-5 bg-current"
        style={{
          WebkitMask: "url('/images/facebook.svg') center / contain no-repeat",
          mask: "url('/images/facebook.svg') center / contain no-repeat",
        }}
      />
    </a>
  );
}

export function SiteHeader({ logoHref = "/", items, className = "" }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  function openMenu() {
    setIsMenuMounted(true);
    window.requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }

  function closeMenu() {
    setIsOpen(false);
    window.setTimeout(() => {
      setIsMenuMounted(false);
    }, 360);
  }

  return (
    <header
      className={`relative z-20 mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center px-6 md:px-10 ${className}`}
    >
      <LogoLink href={logoHref} />

      <nav className="hidden justify-center gap-12 font-manrope text-xs uppercase tracking-[0.28em] text-stone-300 lg:flex">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`transition hover:text-[#c7a66a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#c7a66a] ${
              item.active ? "text-[#c7a66a]" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="hidden justify-end lg:flex">
        <FacebookLink />
      </div>

      <button
        type="button"
        onClick={isOpen ? closeMenu : openMenu}
        className="flex h-11 w-11 items-center justify-center justify-self-end border border-[#b38a46]/55 text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a] lg:hidden"
        aria-label={isOpen ? "Zamknij menu" : "Otworz menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        )}
      </button>

      {isMenuMounted ? (
        <div
          className={`fixed inset-0 z-50 flex min-h-screen flex-col bg-[#050605]/98 px-6 py-8 backdrop-blur transition duration-300 ease-out lg:hidden ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <LogoLink href={logoHref} />
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-11 items-center justify-center border border-[#b38a46]/55 text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
              aria-label="Zamknij menu"
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8 font-manrope text-sm uppercase tracking-[0.32em] text-stone-300">
            {items.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`transition duration-500 hover:text-[#c7a66a] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#c7a66a] ${
                  item.active ? "text-[#c7a66a]" : ""
                } ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{
                  transitionDelay: isOpen ? `${120 + index * 55}ms` : "0ms",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mx-auto mb-8 h-px w-40 bg-[#b38a46]/35" />

          <div className="flex justify-center pb-2">
            <FacebookLink />
          </div>
        </div>
      ) : null}
    </header>
  );
}
