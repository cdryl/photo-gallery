"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Maximize2, Minimize2, Share2, X } from "lucide-react";
import { galleryCategories } from "@/constants/gallery";
import { PhotoVisual } from "@/components/gallery/GalleryPhotoCard";
import type { GalleryPhoto } from "@/types/gallery";

type LightboxProps = {
  photos: GalleryPhoto[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const lightboxAspectClasses: Record<GalleryPhoto["aspectRatio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/9]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
};

const lightboxRatioValues: Record<GalleryPhoto["aspectRatio"], number> = {
  portrait: 3 / 4,
  landscape: 16 / 9,
  square: 1,
  tall: 2 / 3,
};

type LightboxFrameStyle = CSSProperties & {
  "--photo-ratio": number;
};

export function Lightbox({
  photos,
  activeIndex,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedPhotoSlug, setCopiedPhotoSlug] = useState<string | null>(null);
  const photo = photos[activeIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, [activeIndex]);

  useEffect(() => {
    if (!copiedPhotoSlug) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedPhotoSlug(null);
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copiedPhotoSlug]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          return;
        }

        onClose();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrevious]);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === panelRef.current);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  async function toggleFullscreen() {
    if (!panelRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await panelRef.current.requestFullscreen();
  }

  async function copyPhotoLink() {
    if (!photo) {
      return;
    }

    const photoUrl = `${window.location.origin}/gallery?photo=${encodeURIComponent(photo.slug)}`;

    await navigator.clipboard.writeText(photoUrl);
    setCopiedPhotoSlug(photo.slug);
  }

  if (!photo) {
    return null;
  }

  const category = galleryCategories.find((item) => item.slug === photo.category);
  const categoryTitle = photo.categoryTitle ?? category?.title;
  const photoRatio =
    photo.width && photo.height
      ? photo.width / photo.height
      : lightboxRatioValues[photo.aspectRatio];
  const frameStyle = {
    "--photo-ratio": photoRatio,
    aspectRatio: `${photoRatio}`,
  } satisfies LightboxFrameStyle;
  const isCopied = copiedPhotoSlug === photo.slug;

  return (
    <div
      className="animate-lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/88 px-5 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Podglad zdjecia: ${photo.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className="lightbox-panel animate-lightbox-panel relative w-full max-w-7xl border border-[#3a3327] bg-[#070807] p-5 pt-20 shadow-2xl shadow-black md:p-8 md:pt-20"
      >
        <button
          type="button"
          onClick={copyPhotoLink}
          className="absolute right-[8.75rem] top-5 z-10 flex h-11 w-11 items-center justify-center border border-[#b38a46]/55 text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
          aria-label={isCopied ? "Skopiowano link do zdjecia" : "Kopiuj link do zdjecia"}
          title={isCopied ? "Skopiowano" : "Kopiuj link"}
        >
          {isCopied ? (
            <Check aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Share2 aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute right-20 top-5 z-10 flex h-11 w-11 items-center justify-center border border-[#b38a46]/55 font-manrope text-lg leading-none text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
          aria-label={isFullscreen ? "Wyjdz z pelnego ekranu" : "Otworz na pelnym ekranie"}
          title={isFullscreen ? "Wyjdz z pelnego ekranu" : "Pelny ekran"}
        >
          {isFullscreen ? (
            <Minimize2 aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Maximize2 aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-[#b38a46]/55 text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
          aria-label="Zamknij lightbox"
        >
          <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="lightbox-media relative mx-auto w-full">
          <div
            className={`lightbox-image-frame animate-lightbox-photo relative max-h-[70vh] w-full overflow-hidden bg-black ${lightboxAspectClasses[photo.aspectRatio]}`}
            style={frameStyle}
          >
            <PhotoVisual photo={photo} sizes="(min-width: 1024px) 78vw, 100vw" />
          </div>
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-[#b38a46]/55 bg-black/55 text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a] md:flex"
            aria-label="Poprzednie zdjecie"
          >
            <ChevronLeft aria-hidden="true" className="h-7 w-7" strokeWidth={1.4} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-[#b38a46]/55 bg-black/55 text-[#c7a66a] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a] md:flex"
            aria-label="Nastepne zdjecie"
          >
            <ChevronRight aria-hidden="true" className="h-7 w-7" strokeWidth={1.4} />
          </button>
        </div>

        <div className="mx-auto max-w-3xl px-2 pb-2 pt-5 text-center">
          <h2 className="font-cormorant text-4xl text-[#c7a66a] md:text-5xl">
            {photo.title}
          </h2>
          <p className="mt-2 font-manrope text-sm text-stone-400">
            {photo.location}
          </p>
          <div className="mx-auto mt-5 h-px w-64 bg-[#b38a46]/38" />
          <dl className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 font-manrope text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <dt className="uppercase tracking-[0.2em] text-[#b38a46]">Kategoria</dt>
              <dd>{categoryTitle}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="uppercase tracking-[0.2em] text-[#b38a46]">Data</dt>
              <dd>{photo.date}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="uppercase tracking-[0.2em] text-[#b38a46]">Kadr</dt>
              <dd>{activeIndex + 1} / {photos.length}</dd>
            </div>
          </dl>

          <div className="mt-6 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onPrevious}
              className="flex h-11 w-14 items-center justify-center border border-[#b38a46]/55 text-[#c7a66a]"
              aria-label="Poprzednie zdjecie"
            >
              <ChevronLeft aria-hidden="true" className="h-6 w-6" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex h-11 w-14 items-center justify-center border border-[#b38a46]/55 text-[#c7a66a]"
              aria-label="Nastepne zdjecie"
            >
              <ChevronRight aria-hidden="true" className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
