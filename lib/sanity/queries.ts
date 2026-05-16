export const galleryCategoriesQuery = `
  *[_type == "category"] | order(order asc, title asc) {
    title,
    "slug": slug.current,
    description,
    photos[]{
      _key,
      title,
      image,
      featured,
      location,
      date,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  }
`;
