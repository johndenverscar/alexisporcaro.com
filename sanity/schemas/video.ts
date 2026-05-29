import { defineType, defineField } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "string",
      description: "e.g. 'Recital · 2026'",
    }),
    defineField({
      name: "embedUrl",
      title: "Video URL",
      type: "url",
      description: "Paste a YouTube or Vimeo link",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customPoster",
      title: "Custom Poster Image (optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Leave blank to use YouTube/Vimeo's default thumbnail",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured?",
      type: "boolean",
      description: "Show this as the large featured video at the top",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "detail", media: "customPoster" },
  },
});
