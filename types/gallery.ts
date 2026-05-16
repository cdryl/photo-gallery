export type GalleryCategorySlug = string;

export type GalleryCategory = {
  title: string;
  slug: GalleryCategorySlug;
  description: string;
};

export type GalleryPhoto = {
  id: string;
  slug: string;
  title: string;
  category: GalleryCategorySlug;
  location: string;
  date: string;
  aspectRatio: "portrait" | "landscape" | "square" | "tall";
  width?: number;
  height?: number;
  imageSrc?: string;
  alt: string;
  categoryTitle?: string;
  featured?: boolean;
};
