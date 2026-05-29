import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Tagline",
      type: "string",
      description: "Used in the site header and metadata, e.g. 'Oboist'",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare: ({ title }) => ({ title: title || "Site Settings" }),
  },
});
