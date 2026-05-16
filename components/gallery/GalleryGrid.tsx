"use client";

import { useCallback, useState } from "react";
import { GalleryPhotoCard } from "@/components/gallery/GalleryPhotoCard";
import { Lightbox } from "@/components/gallery/Lightbox";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { GalleryPhoto } from "@/types/gallery";

type GalleryGridProps = {
  photos: GalleryPhoto[];
  initialPhotoSlug?: string;
};

const gridSpanClasses: Record<GalleryPhoto["aspectRatio"], string> = {
  portrait: "row-span-[36]",
  landscape: "row-span-[28] md:col-span-2",
  square: "row-span-[31]",
  tall: "row-span-[43]",
};

function getPhotoIndexBySlug(photos: GalleryPhoto[], slug?: string) {
  if (!slug) {
    return null;
  }

  const photoIndex = photos.findIndex((photo) => photo.slug === slug);

  return photoIndex >= 0 ? photoIndex : null;
}

export function GalleryGrid({ photos, initialPhotoSlug }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(() =>
    getPhotoIndexBySlug(photos, initialPhotoSlug),
  );

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNextPhoto = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % photos.length;
    });
  }, [photos.length]);

  const showPreviousPhoto = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  if (photos.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 md:px-10">
        <div className="border border-[#3a3327] bg-[#080a08] p-10 text-center">
          <h2 className="font-cormorant text-4xl text-stone-100">Brak zdjec w tej kategorii</h2>
          <p className="mt-3 font-manrope text-sm text-stone-400">
            Wybierz inna kategorie lub wroc do pelnej galerii.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-4 md:px-10">
      <div className="grid auto-rows-[0.25rem] grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 [grid-auto-flow:dense]">
        {photos.map((photo, index) => (
          <RevealOnScroll
            key={photo.id}
            className={gridSpanClasses[photo.aspectRatio]}
            delay={(index % 6) * 70}
          >
            <GalleryPhotoCard
              photo={photo}
              onOpen={() => {
                setActiveIndex(index);
              }}
            />
          </RevealOnScroll>
        ))}
      </div>
      {activeIndex !== null ? (
        <Lightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNext={showNextPhoto}
          onPrevious={showPreviousPhoto}
        />
      ) : null}
    </section>
  );
}
