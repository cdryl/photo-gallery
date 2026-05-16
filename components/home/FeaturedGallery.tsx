"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { featuredPhotos } from "@/constants/home";
import { Lightbox } from "@/components/gallery/Lightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhotoPlaceholder } from "@/components/home/PhotoPlaceholder";
import type { GalleryPhoto } from "@/types/gallery";

type FeaturedGalleryProps = {
  photos: GalleryPhoto[];
};

const featuredLayoutClasses: Record<GalleryPhoto["aspectRatio"], string> = {
  landscape: "md:col-span-2",
  portrait: "md:row-span-2",
  tall: "md:row-span-2",
  square: "",
};

export function FeaturedGallery({ photos }: FeaturedGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selectedPhotos = photos.filter((photo) => photo.featured).slice(0, 5);
  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);
  const showNextPhoto = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex + 1) % selectedPhotos.length;
    });
  }, [selectedPhotos.length]);
  const showPreviousPhoto = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return (currentIndex - 1 + selectedPhotos.length) % selectedPhotos.length;
    });
  }, [selectedPhotos.length]);

  return (
    <section id="galeria" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <SectionHeading eyebrow="Wybrane ujecia" title="Galeria ciszy" />
      <div className="mt-10 grid auto-rows-[18rem] gap-3 md:grid-cols-4">
        {selectedPhotos.length > 0
          ? selectedPhotos.map((photo, index) => (
              <figure
                key={photo.id}
                className={`group relative min-h-72 overflow-hidden border border-[#3a3327] bg-[#0a0d0a] ${
                  featuredLayoutClasses[photo.aspectRatio]
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  className="relative block h-full w-full text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
                  aria-label={`Otworz zdjecie: ${photo.title}`}
                >
                  {photo.imageSrc ? (
                    <Image
                      src={photo.imageSrc}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(176,139,74,0.18),transparent_28%),linear-gradient(145deg,rgba(61,73,54,0.72),rgba(4,5,4,0.96)_62%)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-manrope text-[0.65rem] uppercase tracking-[0.32em] text-[#b38a46]">
                      {photo.categoryTitle}
                    </p>
                    <h3 className="mt-2 font-cormorant text-2xl text-stone-100">
                      {photo.title}
                    </h3>
                    <p className="mt-2 font-manrope text-sm text-stone-400">
                      {photo.location} {photo.date ? `/ ${photo.date}` : ""}
                    </p>
                  </figcaption>
                </button>
              </figure>
            ))
          : featuredPhotos.map((photo) => <PhotoPlaceholder key={photo.id} slot={photo} />)}
      </div>
      {activeIndex !== null ? (
        <Lightbox
          photos={selectedPhotos}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onNext={showNextPhoto}
          onPrevious={showPreviousPhoto}
        />
      ) : null}
    </section>
  );
}
