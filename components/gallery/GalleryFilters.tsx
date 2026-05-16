import Link from "next/link";
import type { GalleryCategory, GalleryCategorySlug } from "@/types/gallery";

type GalleryFiltersProps = {
  categories: GalleryCategory[];
  activeCategory?: GalleryCategorySlug;
};

export function GalleryFilters({ categories, activeCategory }: GalleryFiltersProps) {
  return (
    <nav
      aria-label="Kategorie galerii"
      className="mx-auto flex max-w-7xl flex-wrap gap-3 px-6 py-8 md:px-10"
    >
      <Link
        href="/gallery"
        className={`border px-6 py-3 font-manrope text-xs uppercase tracking-[0.24em] transition ${
          activeCategory
            ? "border-[#3a3327] text-stone-400 hover:border-[#b38a46] hover:text-[#c7a66a]"
            : "border-[#b38a46] text-[#c7a66a]"
        }`}
      >
        Wszystkie
      </Link>
      {categories.map((category) => {
        const isActive = category.slug === activeCategory;

        return (
          <Link
            key={category.slug}
            href={`/gallery?category=${category.slug}`}
            className={`border px-6 py-3 font-manrope text-xs uppercase tracking-[0.24em] transition ${
              isActive
                ? "border-[#b38a46] text-[#c7a66a]"
                : "border-[#3a3327] text-stone-400 hover:border-[#b38a46] hover:text-[#c7a66a]"
            }`}
          >
            {category.title}
          </Link>
        );
      })}
    </nav>
  );
}
