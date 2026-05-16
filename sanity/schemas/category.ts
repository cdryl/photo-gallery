import { defineField, defineType } from "sanity";

const sanityApiVersion =
  process.env.SANITY_STUDIO_API_VERSION ??
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ??
  "2025-01-01";

export const categoryType = defineType({
  name: "category",
  title: "Kategoria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Pokazuj na stronie glownej",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "photos",
      title: "Zdjecia w kategorii",
      description: "Dodawaj tutaj zdjecia nalezace do tej kategorii.",
      type: "array",
      of: [
        {
          type: "object",
          name: "categoryPhoto",
          title: "Zdjecie",
          fields: [
            defineField({
              name: "title",
              title: "Tytul",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Zdjecie",
              type: "image",
              options: {
                hotspot: true,
                metadata: ["blurhash", "lqip", "palette", "exif", "location"],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "featured",
              title: "Wyroznione",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "location",
              title: "Lokalizacja",
              type: "string",
            }),
            defineField({
              name: "date",
              title: "Data / okres",
              type: "string",
              description: "Np. Pazdziernik 2025 albo Wiosna 2026.",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
              featured: "featured",
            },
            prepare({ title, media, featured }) {
              return {
                title,
                media,
                subtitle: featured ? "Wyroznione" : "Zdjecie w kategorii",
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.custom(async (photos, context) => {
          const categoryId = context.document?._id?.replace(/^drafts\./, "");
          const currentPhotos = Array.isArray(photos)
            ? (photos as Array<{ featured?: boolean }>)
            : [];
          const featuredInCurrentCategory = currentPhotos.filter((photo) => photo.featured).length;

          if (!categoryId) {
            return featuredInCurrentCategory <= 5
              ? true
              : "Maksymalnie 5 zdjec moze byc oznaczonych jako wyroznione.";
          }

          const client = context.getClient({ apiVersion: sanityApiVersion });
          const featuredInOtherCategories = await client.fetch<number>(
            `count(*[
              _type == "category" &&
              !(_id in [$draftId, $publishedId])
            ].photos[featured == true])`,
            {
              draftId: `drafts.${categoryId}`,
              publishedId: categoryId,
            },
          );

          return featuredInOtherCategories + featuredInCurrentCategory <= 5
            ? true
            : "Maksymalnie 5 zdjec moze byc oznaczonych jako wyroznione.";
        }),
    }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
