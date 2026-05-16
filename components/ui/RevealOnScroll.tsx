"use client";

import { useEffect, useRef, useState } from "react";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "gallery" | "section";
};

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "gallery",
}: RevealOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    let revealTimeout: number | undefined;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimeout = window.setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        rootMargin: variant === "section" ? "0px 0px -22% 0px" : "0px 0px 28% 0px",
        threshold: variant === "section" ? 0.08 : 0.02,
      },
    );

    observer.observe(element);

    return () => {
      if (revealTimeout) {
        window.clearTimeout(revealTimeout);
      }

      observer.disconnect();
    };
  }, [delay, variant]);

  return (
    <div
      ref={elementRef}
      className={`${variant === "section" ? "section-reveal" : "gallery-reveal"} ${
        isVisible ? "is-visible" : ""
      } ${className}`}
      style={{ transitionDelay: variant === "gallery" ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
