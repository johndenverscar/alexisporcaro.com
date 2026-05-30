import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .id("home")
        .child(S.document().schemaType("home").documentId("home")),
      S.listItem()
        .title("About Page")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Events Page (banner)")
        .id("eventsPage")
        .child(
          S.document().schemaType("eventsPage").documentId("eventsPage"),
        ),
      S.listItem()
        .title("Media Page (banner)")
        .id("mediaPage")
        .child(S.document().schemaType("mediaPage").documentId("mediaPage")),
      S.listItem()
        .title("Gallery Page (banner)")
        .id("galleryPage")
        .child(
          S.document().schemaType("galleryPage").documentId("galleryPage"),
        ),
      S.listItem()
        .title("Lessons Page")
        .id("lessons")
        .child(S.document().schemaType("lessons").documentId("lessons")),
      S.listItem()
        .title("Contact Page")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),
      S.divider(),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("video").title("Videos"),
      S.documentTypeListItem("audio").title("Audio Recordings"),
      S.documentTypeListItem("photo").title("Photos"),
    ]);
