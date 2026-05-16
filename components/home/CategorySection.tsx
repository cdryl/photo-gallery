import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { GalleryCategory, GalleryPhoto } from "@/types/gallery";

type CategorySectionProps = {
  categories: GalleryCategory[];
  photos: GalleryPhoto[];
};

function getRandomCategoryPhoto(category: GalleryCategory, photos: GalleryPhoto[]) {
  const categoryPhotos = photos.filter((photo) => photo.category === category.slug && photo.imageSrc);

  if (categoryPhotos.length === 0) {
    return undefined;
  }

  return categoryPhotos[Math.floor(Math.random() * categoryPhotos.length)];
}

export function CategorySection({ categories, photos }: CategorySectionProps) {
  return (
    <section
      id="kategorie"
      className="border-y border-[#2b241b] bg-[#080a08] py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Kategorie" title="Ścieżki natury" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const backgroundPhoto = getRandomCategoryPhoto(category, photos);

            return (
              <a
                key={category.slug}
                href={`/gallery?category=${category.slug}`}
                className="group relative min-h-72 overflow-hidden border border-[#3a3327] bg-[#0b0d0b] p-7 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c7a66a]"
              >
                {backgroundPhoto?.imageSrc ? (
                  <Image
                    src={backgroundPhoto.imageSrc}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_18%,rgba(179,138,70,0.16),transparent_24%),linear-gradient(180deg,rgba(28,42,30,0.6),rgba(3,4,3,0.96))]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/62 to-black/12" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,166,106,0.16),transparent_30%)]" />
                <div className="relative flex h-full flex-col justify-end">
                  <p className="mb-auto font-cormorant text-5xl text-[#b38a46]/55">
                    {(index + 1).toString().padStart(2, "0")}
                  </p>
                  <h3 className="font-cormorant text-2xl uppercase tracking-[0.18em] text-stone-100">
                    {category.title}
                  </h3>
                  <p className="mt-3 font-manrope text-sm leading-6 text-stone-300">
                    {category.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-3 font-manrope text-sm text-[#c7a66a] transition group-hover:translate-x-1">
                    Zobacz galerie
                    <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="/gallery"
            className="inline-flex h-14 items-center border border-[#b38a46] px-8 font-manrope text-xs uppercase tracking-[0.24em] text-[#d4bd8f] transition hover:bg-[#b38a46] hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#c7a66a]"
          >
            Zobacz pełną galerię
            <ArrowRight aria-hidden="true" className="ml-5 h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
