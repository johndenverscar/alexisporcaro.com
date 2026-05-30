import { defineType, defineField } from "sanity";

export default defineType({
  name: "audio",
  title: "Audio Recording",
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
      description: "e.g. 'Studio recording · 2026'",
    }),
    defineField({
      name: "embedUrl",
      title: "Embed URL",
      type: "url",
      description: "Spotify or SoundCloud track URL",
      validation: (r) => r.required(),
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
    select: { title: "title", subtitle: "detail" },
  },
});
