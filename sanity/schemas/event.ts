import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
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
      description: "Ensemble, program, collaborators, venue",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
      description: "Leave blank if no ticket link yet",
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, oldest first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", city: "city" },
    prepare: ({ title, date, city }) => ({
      title,
      subtitle: [date, city].filter(Boolean).join(" · "),
    }),
  },
});
