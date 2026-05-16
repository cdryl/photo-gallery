import type { Metadata } from "next";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { Footer } from "@/components/home/Footer";
import { getGalleryData } from "@/lib/sanity/gallery";
import type { GalleryCategorySlug } from "@/types/gallery";
import type { GalleryCategory } from "@/types/gallery";

type GalleryPageProps = {
  searchParams?: Promise<{
    category?: string;
    photo?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Galeria — Dariusz Dryl",
  description: "Wybrane kadry dzikich zwierzat, ptakow, lasow i porankow w naturze.",
};

function getValidCategory(
  categories: GalleryCategory[],
  category?: string,
): GalleryCategorySlug | undefined {
  const match = categories.find((item) => item.slug === category);
  return match?.slug;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const { categories, photos: allPhotos } = await getGalleryData();
  const activeCategory = getValidCategory(categories, params?.category);
  const photos = activeCategory
    ? allPhotos.filter((photo) => photo.category === activeCategory)
    : allPhotos;

  return (
    <main className="min-h-screen bg-[#050605] font-manrope text-stone-100">
      <GalleryHero />
      <GalleryFilters categories={categories} activeCategory={activeCategory} />
      <GalleryGrid photos={photos} initialPhotoSlug={params?.photo} />
      <Footer />
    </main>
  );
}
