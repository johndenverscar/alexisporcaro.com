import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryPage",
  title: "Gallery Page",
  type: "document",
  fields: [
    defineField({
      name: "bannerEyebrow",
      title: "Banner Eyebrow",
      type: "string",
    }),
    defineField({
      name: "bannerTitle",
      title: "Banner Title",
      type: "string",
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Gallery Page" }) },
});
