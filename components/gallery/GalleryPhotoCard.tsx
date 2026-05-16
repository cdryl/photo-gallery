import Image from "next/image";
import { Camera } from "lucide-react";
import { galleryCategories } from "@/constants/gallery";
import type { GalleryPhoto } from "@/types/gallery";

type GalleryPhotoCardProps = {
  photo: GalleryPhoto;
  onOpen: () => void;
  className?: string;
};

export function GalleryPhotoCard({ photo, onOpen, className = "" }: GalleryPhotoCardProps) {
  const category = galleryCategories.find((item) => item.slug === photo.category);
  const categoryTitle = photo.categoryTitle ?? category?.title;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border border-[#2d261d] bg-[#090b09] ${className}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full flex-1 cursor-pointer overflow-hidden text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
        aria-label={`Otworz zdjecie: ${photo.title}`}
      >
        <PhotoVisual photo={photo} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw" />
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-[#b38a46]/45 bg-black/35 text-[#c7a66a] opacity-0 transition group-hover:opacity-100">
          <Camera aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </button>
      <div className="shrink-0 p-5">
        <p className="font-manrope text-[0.62rem] uppercase tracking-[0.28em] text-[#b38a46]">
          {categoryTitle}
        </p>
        <h2 className="mt-2 font-cormorant text-3xl text-stone-100">{photo.title}</h2>
        <p className="mt-3 font-manrope text-sm leading-6 text-stone-400">
          {photo.location} / {photo.date}
        </p>
      </div>
    </article>
  );
}

type PhotoVisualProps = {
  photo: GalleryPhoto;
  sizes: string;
};

export function PhotoVisual({ photo, sizes }: PhotoVisualProps) {
  return (
    <>
      {photo.imageSrc ? (
        <Image
          src={photo.imageSrc}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_22%,rgba(179,138,70,0.2),transparent_24%),linear-gradient(145deg,rgba(58,70,50,0.82),rgba(5,6,5,0.98)_68%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/8 to-transparent opacity-80" />
      {!photo.imageSrc ? (
        <div className="absolute inset-6 border border-[#b38a46]/18">
          <span className="absolute left-4 top-4 font-manrope text-[0.62rem] uppercase tracking-[0.26em] text-[#c7a66a]">
            Placeholder
          </span>
        </div>
      ) : null}
    </>
  );
}
