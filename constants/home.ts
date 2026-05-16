import type { Category, PhotoSlot } from "@/types/home";

export const featuredPhotos: PhotoSlot[] = [
  {
    id: "featured-bison",
    title: "Zubr w porannej mgle",
    label: "Wybrane ujecie 01",
    className: "md:row-span-2",
  },
  {
    id: "featured-wolf",
    title: "Wilk na granicy lasu",
    label: "Wybrane ujecie 02",
    className: "md:row-span-2",
  },
  {
    id: "featured-owl",
    title: "Sowa w locie",
    label: "Wybrane ujecie 03",
    className: "md:col-span-2",
  },
  {
    id: "featured-fox",
    title: "Lis w zlotym swietle",
    label: "Wybrane ujecie 04",
  },
  {
    id: "featured-boar",
    title: "Dzik w gestwinie",
    label: "Wybrane ujecie 05",
  },
];

export const categories: Category[] = [
  {
    title: "Dzikie zwierzeta",
    slug: "wildlife",
    description: "Ciche spotkania na skraju lasu.",
    marker: "01",
  },
  {
    title: "Ptaki",
    slug: "birds",
    description: "Ruch skrzydel zapisany w swietle.",
    marker: "02",
  },
  {
    title: "Las",
    slug: "forest",
    description: "Gestosc, cien i pierwsze promienie.",
    marker: "03",
  },
  {
    title: "Poranki w naturze",
    slug: "mornings",
    description: "Mgla, rosa i powolne budzenie dnia.",
    marker: "04",
  },
];

export const navigationItems = [
  "Start",
  "Galeria",
  "Kategorie",
  "O fotografie",
  "Kontakt",
];
