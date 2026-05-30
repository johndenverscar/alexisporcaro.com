import { defineType, defineField } from "sanity";

export default defineType({
  name: "lessons",
  title: "Lessons Page",
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
      rows: 5,
    }),
    defineField({
      name: "offerings",
      title: "Offerings",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "body", title: "Body", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
    defineField({
      name: "expectations",
      title: "What to Expect",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "studioImage",
      title: "Studio Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tuitionLabel",
      title: "Tuition Label",
      type: "string",
    }),
    defineField({
      name: "tuitionHeadline",
      title: "Tuition Headline",
      type: "string",
    }),
    defineField({
      name: "tuitionBody",
      title: "Tuition Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tuitionButtonLabel",
      title: "Tuition Button Label",
      type: "string",
    }),
    defineField({
      name: "tuitionButtonHref",
      title: "Tuition Button Link",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "Lessons Page" }) },
});
