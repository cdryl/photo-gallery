# AGENTS.md

Instrukcje dla agentów AI pracujących nad tym projektem.

Projekt: portfolio fotografa przyrodniczego **Dariusz Dryl**  
Stack: **Next.js**, **TypeScript**, **Tailwind CSS**, **Sanity CMS**

---

## 1. Cel projektu

Projekt jest nowoczesną, artystyczną stroną portfolio dla fotografa przyrodniczego. Strona prezentuje fotografie dzikiej polskiej przyrody, zwierząt i ptaków w estetyce ciemnej, eleganckiej galerii online.

Główne założenia:

- wygląd premium, artystyczny i nastrojowy,
- duży nacisk na fotografie,
- ciemna kolorystyka: czerń, grafit, ciemna zieleń, subtelne naturalne akcenty,
- typografia elegancka, wystawowa, mniej techniczna,
- brak korporacyjnego lub przesadnie komercyjnego charakteru,
- desktop-first, z możliwością późniejszej adaptacji mobilnej.

---

## 2. Stack technologiczny

Projekt używa:

- **Next.js** z App Routerem,
- **TypeScript**,
- **Tailwind CSS**,
- **Sanity CMS** jako źródła treści,
- komponentowego podejścia do UI.

Preferowany styl implementacji:

- komponenty funkcyjne React,
- typowanie propsów przez `type` lub `interface`,
- możliwie małe, czytelne komponenty,
- logika oddzielona od prezentacji tam, gdzie ma to sens,
- unikanie nadmiernej abstrakcji.

---

## 3. Priorytety przy pracy nad projektem

Podczas wprowadzania zmian zawsze zachowuj następującą hierarchię priorytetów:

1. **Estetyka i spójność wizualna** — projekt ma wyglądać jak profesjonalna galeria fotograficzna.
2. **Czytelność kodu** — kod powinien być prosty, przewidywalny i łatwy do rozwijania.
3. **Typowanie** — unikaj `any`, dbaj o poprawne typy TypeScript.
4. **Wydajność** — szczególnie przy obrazach, galerii i danych z Sanity.
5. **Dostępność** — zachowuj semantykę HTML, teksty alternatywne i logiczny focus.
6. **SEO** — używaj metadanych, poprawnych nagłówków i opisów.

---

## 4. Konwencje językowe

Interfejs strony jest w języku polskim.

Przykładowe teksty UI:

- `Start`
- `Galeria`
- `Kategorie`
- `O fotografie`
- `Kontakt`
- `Dzikie zwierzęta`
- `Ptaki`
- `Las`
- `Poranki w naturze`
- `Odkryj galerię`
- `Dzika przyroda Polski uchwycona w obiektywie`

Kod, nazwy plików, zmiennych i komponentów powinny być w języku angielskim.

Przykłady:

```ts
GalleryGrid
FeaturedPhotos
CategoryCard
PhotographerBio
Lightbox
```

---

## 5. Struktura projektu

Preferowana struktura katalogów:

```txt
src/
  app/
    page.tsx
    gallery/
      page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      Header.tsx
      Footer.tsx
    sections/
      HeroSection.tsx
      FeaturedGallery.tsx
      CategorySection.tsx
      AboutPhotographer.tsx
    gallery/
      GalleryGrid.tsx
      GalleryFilters.tsx
      Lightbox.tsx
      PhotoCard.tsx
    ui/
      Button.tsx
      Container.tsx
      SectionHeading.tsx

  lib/
    sanity/
      client.ts
      image.ts
      queries.ts

  types/
    sanity.ts
    gallery.ts

  constants/
    navigation.ts
    site.ts
```

Nie trzeba bezwzględnie trzymać się tej struktury, ale nowe pliki powinny logicznie pasować do istniejącej organizacji projektu.

---

## 6. Next.js

Zakładaj użycie **App Routera**.

Zasady:

- domyślnie twórz komponenty jako Server Components,
- używaj `use client` tylko wtedy, gdy jest to konieczne,
- komponenty interaktywne, takie jak lightbox, filtry lub animacje wymagające stanu, mogą być Client Components,
- dane z Sanity pobieraj po stronie serwera, jeśli nie ma potrzeby pobierania ich po stronie klienta,
- używaj `next/image` do obrazów,
- konfiguruj `metadata` dla stron.

Przykład:

```ts
export const metadata = {
  title: 'Dariusz Dryl — Fotografia przyrodnicza',
  description: 'Dzika przyroda Polski uchwycona w obiektywie.',
};
```

---

## 7. TypeScript

Zasady TypeScript:

- nie używaj `any`, chyba że jest to naprawdę konieczne,
- preferuj jawne typy dla danych z Sanity,
- typuj propsy komponentów,
- nie ignoruj błędów TypeScript przez `// @ts-ignore`,
- używaj typów union dla kategorii galerii.

Przykład:

```ts
export type PhotoCategory =
  | 'wildlife'
  | 'birds'
  | 'forest'
  | 'mornings';

export type GalleryPhoto = {
  _id: string;
  title: string;
  slug: string;
  category: PhotoCategory;
  image: unknown;
  alt: string;
  location?: string;
  date?: string;
};
```

Jeżeli typy Sanity są generowane automatycznie, korzystaj z wygenerowanych typów zamiast duplikować definicje ręcznie.

---

## 8. Tailwind CSS

Projekt powinien korzystać z Tailwinda w sposób estetyczny i konsekwentny.

Preferowany klimat wizualny:

- tła: `bg-black`, ciemne grafity, ciemne zielenie,
- tekst: złamana biel, beż, przygaszone złoto,
- akcenty: muted gold, moss green, warm beige,
- duże przestrzenie i spokojny layout,
- delikatne obramowania i półprzezroczystości,
- subtelne gradienty i winiety.

Unikaj:

- agresywnych kolorów,
- typowo startupowego wyglądu,
- przesadnych animacji,
- zbyt wielu ramek, kart i buttonów,
- ciasnych layoutów.

Przykładowe klasy klimatu projektu:

```tsx
<section className="relative bg-[#050706] text-stone-100">
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
</section>
```

Dopuszczalne jest używanie niestandardowych kolorów hex w klasach Tailwinda, jeśli poprawia to spójność artystyczną.

---

## 9. Typografia

Projekt powinien mieć bardziej artystyczny niż techniczny charakter.

Zalecenia:

- nagłówki: elegancki serif, wysoki kontrast, duży tracking,
- tekst pomocniczy: czytelny sans lub spokojny serif,
- krótkie, poetyckie opisy zamiast marketingowych sloganów,
- dużo oddechu między sekcjami.

Przykładowe podejście:

```tsx
<h1 className="font-serif text-7xl tracking-[0.18em] text-stone-100">
  Dariusz Dryl
</h1>
```

Nie używaj typografii, która wygląda zbyt technicznie, dashboardowo lub SaaS-owo.

---

## 10. Sanity CMS

Sanity jest źródłem treści dla zdjęć, kategorii i prawdopodobnie danych strony.

Typowe dokumenty Sanity:

- `photo`,
- `category`,
- `photographerProfile`,
- `siteSettings`.

Przykładowe pola dla `photo`:

```ts
{
  title: string;
  slug: string;
  image: image;
  alt: string;
  category: reference;
  featured: boolean;
  location?: string;
  date?: string;
  description?: string;
}
```

Zasady:

- zapytania GROQ trzymaj w `lib/sanity/queries.ts`,
- klienta Sanity trzymaj w `lib/sanity/client.ts`,
- helper do obrazów trzymaj w `lib/sanity/image.ts`,
- zawsze używaj pola `alt` dla obrazów,
- nie hardcoduj treści, które powinny pochodzić z CMS,
- dane statyczne typu nawigacja mogą być w `constants`.

Przykład zapytania:

```ts
export const featuredPhotosQuery = `
  *[_type == "photo" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    image,
    alt,
    location,
    date,
    category->{ title, "slug": slug.current }
  }
`;
```

---

## 11. Obrazy i galeria

Fotografie są najważniejszym elementem strony.

Zasady:

- używaj `next/image`,
- ustawiaj sensowne `sizes`,
- używaj wysokiej jakości zdjęć, ale dbaj o wydajność,
- zdjęcia w hero powinny mieć priorytet ładowania,
- miniatury galerii powinny mieć spójne kadrowanie,
- unikaj rozciągania i nienaturalnego cropowania zdjęć,
- zawsze dodawaj opisowy `alt`.

Galeria:

- układ masonry grid,
- duże miniatury,
- kategorie jako eleganckie filtry,
- lightbox zgodny z ciemną estetyką strony,
- tło lightboxa powinno być przyciemnione i immersyjne,
- przyciski poprzednie/następne powinny być subtelne.

---

## 12. Lightbox

Lightbox jest komponentem interaktywnym i może wymagać `use client`.

Wymagania:

- otwieranie zdjęcia po kliknięciu miniatury,
- zamykanie przez przycisk `X`,
- zamykanie przez `Escape`,
- nawigacja poprzednie/następne,
- zachowanie focusu i dostępności,
- podpis zdjęcia,
- metadane, jeśli są dostępne: kategoria, lokalizacja, data, sprzęt.

Lightbox powinien być elegancki, cichy wizualnie i zgodny z wystawowym charakterem strony.

---

## 13. Dostępność

Dbaj o podstawową dostępność:

- semantyczne elementy HTML,
- jeden główny `h1` na stronie,
- logiczna hierarchia nagłówków,
- `alt` dla obrazów,
- widoczny focus dla elementów interaktywnych,
- obsługa klawiatury w lightboxie,
- przyciski jako `<button>`, nie klikalne `<div>`.

Nie usuwaj focus outline bez dodania własnej alternatywy.

---

## 14. SEO i metadane

Każda główna strona powinna mieć metadane.

Strona główna:

```ts
export const metadata = {
  title: 'Dariusz Dryl — Fotografia dzikiej przyrody Polski',
  description: 'Artystyczne portfolio fotografa przyrodniczego. Dzika przyroda Polski uchwycona w obiektywie.',
};
```

Galeria:

```ts
export const metadata = {
  title: 'Galeria — Dariusz Dryl',
  description: 'Wybrane kadry dzikich zwierząt, ptaków, lasów i poranków w naturze.',
};
```

---

## 15. Animacje

Animacje powinny być subtelne i eleganckie.

Dobre przykłady:

- delikatny fade-in sekcji,
- powolne przyciemnienie zdjęcia na hover,
- subtelne przesunięcie miniatury,
- miękkie wejście lightboxa.

Unikaj:

- szybkich, agresywnych animacji,
- efektów typowych dla startup landing page,
- nadmiaru parallaxu,
- animacji odwracających uwagę od zdjęć.

---

## 16. Komponenty UI

Komponenty powinny być małe i jednoznaczne.

Przykładowe komponenty:

- `Header`
- `Footer`
- `HeroSection`
- `FeaturedGallery`
- `CategorySection`
- `AboutPhotographer`
- `GalleryGrid`
- `GalleryFilters`
- `Lightbox`
- `PhotoCard`
- `SectionHeading`
- `Container`

Zasady:

- komponent nie powinien robić zbyt wielu rzeczy naraz,
- propsy powinny być jasno nazwane,
- nie duplikuj layoutu sekcji, jeśli można użyć wspólnego komponentu,
- unikaj globalnego stanu, jeśli wystarczy lokalny.

---

## 17. Nazewnictwo

Pliki komponentów:

```txt
PascalCase.tsx
```

Przykłady:

```txt
HeroSection.tsx
GalleryGrid.tsx
Lightbox.tsx
```

Funkcje pomocnicze:

```txt
camelCase.ts
```

Przykłady:

```txt
formatDate.ts
getPhotoCategoryLabel.ts
```

Stałe:

```ts
export const SITE_NAME = 'Dariusz Dryl';
```

---

## 18. Treści i ton komunikacji

Treści powinny być spokojne, poetyckie i związane z naturą.

Dobry ton:

> Cisza lasu, ślad zwierzęcia, pierwszy ruch skrzydeł o świcie.

Unikaj tonu:

> Najlepsze zdjęcia przyrodnicze w najlepszej cenie. Sprawdź ofertę już teraz.

Strona ma być portfolio i galerią online, nie agresywną stroną sprzedażową.

---

## 19. Wydajność

Szczególnie dbaj o obrazy.

Zasady:

- hero image może mieć `priority`,
- pozostałe zdjęcia powinny ładować się leniwie,
- używaj `sizes`,
- unikaj ładowania pełnych obrazów w gridzie,
- lightbox może ładować większą wersję zdjęcia,
- nie importuj ciężkich bibliotek bez potrzeby.

---

## 20. Czego nie robić

Nie rób:

- nie zmieniaj stacku bez wyraźnej potrzeby,
- nie dodawaj backendu poza Sanity,
- nie używaj `any`, jeśli da się tego uniknąć,
- nie twórz biznesowego/SaaS-owego wyglądu,
- nie wprowadzaj jaskrawych kolorów,
- nie dodawaj zbędnych animacji,
- nie duplikuj logiki Sanity w wielu miejscach,
- nie hardcoduj danych galerii, jeśli mają być z CMS,
- nie usuwaj dostępności dla efektu wizualnego.

---

## 21. Checklist przed zakończeniem zadania

Przed zakończeniem pracy sprawdź:

- [ ] Czy kod przechodzi TypeScript bez błędów?
- [ ] Czy komponenty są czytelne i dobrze nazwane?
- [ ] Czy nie dodano niepotrzebnego `use client`?
- [ ] Czy obrazy używają `next/image`?
- [ ] Czy obrazy mają poprawne `alt`?
- [ ] Czy zapytania Sanity są w odpowiednim miejscu?
- [ ] Czy UI zachowuje ciemny, elegancki, artystyczny klimat?
- [ ] Czy layout nie wygląda zbyt komercyjnie lub biznesowo?
- [ ] Czy metadane SEO są ustawione?
- [ ] Czy lightbox i filtry są dostępne z klawiatury?

---

## 22. Preferowany kierunek wizualny

Cały projekt powinien sprawiać wrażenie:

- cichej galerii sztuki,
- mrocznego lasu o świcie,
- eleganckiego albumu fotograficznego,
- emocjonalnego portfolio autora,
- miejsca skupionego na zachwycie nad dziką naturą Polski.

Najważniejsze hasło projektu:

> **Majestat natury pokazany przez fotografię.**
