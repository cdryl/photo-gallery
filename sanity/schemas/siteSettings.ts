import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Ustawienia strony",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytul strony",
      type: "string",
      initialValue: "Dariusz Dryl — Fotografia dzikiej przyrody Polski",
    }),
    defineField({
      name: "description",
      title: "Opis SEO",
      type: "text",
      rows: 3,
      initialValue:
        "Artystyczne portfolio fotografa przyrodniczego. Dzika przyroda Polski uchwycona w obiektywie.",
    }),
    defineField({
      name: "heroImage",
      title: "Zdjecie hero",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
