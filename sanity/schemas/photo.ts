import { defineType, defineField } from "sanity";

export default defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for screen readers",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare({ title, media }) {
      return { title: title ?? "Untitled photo", media };
    },
  },
});
