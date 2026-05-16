import { galleryCategories, galleryPhotos } from "@/constants/gallery";
import { sanityClient } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { galleryCategoriesQuery } from "@/lib/sanity/queries";
import type { GalleryCategory, GalleryPhoto } from "@/types/gallery";

type SanityCategory = {
  title?: string;
  slug?: string;
  description?: string;
  photos?: SanityPhoto[];
};

type SanityPhoto = {
  _key?: string;
  title?: string;
  image?: unknown;
  featured?: boolean;
  location?: string;
  date?: string;
  width?: number;
  height?: number;
};

function normalizeSlugPart(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createPhotoSlug(categorySlug: string, photo: Pick<SanityPhoto, "_key" | "title">) {
  const photoKey = photo._key ? normalizeSlugPart(photo._key) : "";
  const titleFallback = photo.title ? normalizeSlugPart(photo.title) : "";

  return [categorySlug, photoKey || titleFallback || "photo"].join("-");
}

function getAspectRatio(width?: number, height?: number): GalleryPhoto["aspectRatio"] {
  if (!width || !height) {
    return "portrait";
  }

  const ratio = width / height;

  if (ratio > 1.2) {
    return "landscape";
  }

  if (ratio > 0.9) {
    return "square";
  }

  if (ratio < 0.7) {
    return "tall";
  }

  return "portrait";
}

function mapSanityPhoto(
  photo: SanityPhoto,
  category: Pick<GalleryCategory, "slug" | "title">,
): GalleryPhoto | null {
  if (!photo.title) {
    return null;
  }

  const imageSrc = photo.image
    ? urlForImage(photo.image)
        ?.width(1800)
        .quality(88)
      .auto("format")
      .url()
    : undefined;

  return {
    id: `${category.slug}-${photo._key ?? photo.title}`,
    slug: createPhotoSlug(category.slug, photo),
    title: photo.title,
    category: category.slug,
    categoryTitle: category.title,
    location: photo.location ?? "Polska",
    date: photo.date ?? "",
    aspectRatio: getAspectRatio(photo.width, photo.height),
    width: photo.width,
    height: photo.height,
    imageSrc,
    alt: photo.title,
    featured: photo.featured,
  };
}

export async function getGalleryData(): Promise<{
  categories: GalleryCategory[];
  photos: GalleryPhoto[];
}> {
  if (!sanityClient) {
    return {
      categories: galleryCategories,
      photos: galleryPhotos,
    };
  }

  try {
    const categoriesResult = await sanityClient.fetch<SanityCategory[]>(
      galleryCategoriesQuery,
      {},
      { next: { revalidate: 60 } },
    );

    const categories = categoriesResult
      .filter(
        (category): category is Required<Pick<SanityCategory, "title" | "slug" | "description">> &
          SanityCategory => Boolean(category.title && category.slug && category.description),
      )
      .map((category) => ({
        title: category.title,
        slug: category.slug,
        description: category.description,
      }));

    const categoryPhotos = categoriesResult.flatMap((category) => {
      if (!category.title || !category.slug || !category.photos) {
        return [];
      }

      const categoryInfo = {
        title: category.title,
        slug: category.slug,
      };

      return category.photos
        .map((photo) => mapSanityPhoto(photo, categoryInfo))
        .filter((photo): photo is GalleryPhoto => Boolean(photo));
    });

    return {
      categories: categories.length > 0 ? categories : galleryCategories,
      photos: categoryPhotos.length > 0 ? categoryPhotos : galleryPhotos,
    };
  } catch {
    return {
      categories: galleryCategories,
      photos: galleryPhotos,
    };
  }
}
