import { defineType, defineField } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
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
    defineField({
      name: "introHeading",
      title: "Intro Heading",
      type: "string",
    }),
    defineField({
      name: "introBody",
      title: "Intro Body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
