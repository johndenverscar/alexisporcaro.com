import { defineType, defineField } from "sanity";

export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "quotes", title: "Press Quotes" },
    { name: "intro", title: "Intro" },
    { name: "highlights", title: "Highlights" },
    { name: "cta", title: "Closing CTA" },
  ],
  fields: [
    // HERO
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow Text",
      type: "string",
      description: "Small text above the name, e.g. 'Oboist · Teaching Artist'",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary Button Label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaHref",
      title: "Primary Button Link",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary Button Label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaHref",
      title: "Secondary Button Link",
      type: "string",
      group: "hero",
    }),
    // QUOTES
    defineField({
      name: "quotes",
      title: "Press Quotes",
      type: "array",
      group: "quotes",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text", rows: 3 },
            { name: "source", title: "Source", type: "string" },
          ],
          preview: {
            select: { title: "source", subtitle: "quote" },
          },
        },
      ],
      validation: (r) => r.max(3),
    }),
    // INTRO
    defineField({
      name: "introEyebrow",
      title: "Eyebrow",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introHeading",
      title: "Heading",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introBody",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
      group: "intro",
    }),
    defineField({
      name: "introImage",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      group: "intro",
    }),
    defineField({
      name: "introLinkLabel",
      title: "Link Label",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introLinkHref",
      title: "Link URL",
      type: "string",
      group: "intro",
    }),
    // HIGHLIGHTS
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "highlights",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "href", title: "Link", type: "string" },
            { name: "blurb", title: "Blurb", type: "text", rows: 2 },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "title", media: "image" } },
        },
      ],
    }),
    // CTA
    defineField({
      name: "ctaHeading",
      title: "Heading",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaBody",
      title: "Body",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "Button Label",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Button Link",
      type: "string",
      group: "cta",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
