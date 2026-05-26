import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanity = createClient({
  projectId: "djstmfxx",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = createImageUrlBuilder(sanity);

export const urlFor = (source: unknown) => builder.image(source as never);
