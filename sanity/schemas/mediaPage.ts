import { defineType, defineField } from "sanity";

export default defineType({
  name: "mediaPage",
  title: "Media Page",
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
  preview: { prepare: () => ({ title: "Media Page" }) },
});
