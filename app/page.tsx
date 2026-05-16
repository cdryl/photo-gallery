import { AboutPhotographer } from "@/components/home/AboutPhotographer";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedGallery } from "@/components/home/FeaturedGallery";
import { Footer } from "@/components/home/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { getGalleryData } from "@/lib/sanity/gallery";

export default async function Home() {
  const { categories, photos } = await getGalleryData();

  return (
    <main className="min-h-screen bg-[#050605] font-manrope text-stone-100">
      <HeroSection />
      <FeaturedGallery photos={photos} />
      <CategorySection categories={categories} photos={photos} />
      <AboutPhotographer />
      <Footer />
    </main>
  );
}
