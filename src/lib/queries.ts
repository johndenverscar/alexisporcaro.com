import { sanity } from "./sanity";

const siteFields = `
  name,
  role,
  email
`;

export async function getSite() {
  return sanity.fetch<{ name: string; role: string; email: string } | null>(
    `*[_type == "siteSettings"][0]{${siteFields}}`,
  );
}

export async function getHome() {
  return sanity.fetch(`*[_type == "home"][0]{
    heroEyebrow,
    heroSubtitle,
    heroImage,
    heroPrimaryCtaLabel, heroPrimaryCtaHref,
    heroSecondaryCtaLabel, heroSecondaryCtaHref,
    quotes,
    introEyebrow, introHeading, introBody, introImage,
    introLinkLabel, introLinkHref,
    highlights,
    ctaHeading, ctaBody, ctaButtonLabel, ctaButtonHref
  }`);
}

export async function getAbout() {
  return sanity.fetch(`*[_type == "about"][0]{
    bannerEyebrow, bannerTitle, bannerImage,
    bio,
    portrait,
    "resumeUrl": resume.asset->url,
    facts,
    repertoireHeading,
    repertoire
  }`);
}

export async function getLessons() {
  return sanity.fetch(`*[_type == "lessons"][0]{
    bannerEyebrow, bannerTitle, bannerImage,
    introHeading, introBody,
    offerings,
    expectations,
    studioImage,
    tuitionLabel, tuitionHeadline, tuitionBody,
    tuitionButtonLabel, tuitionButtonHref
  }`);
}

export async function getContact() {
  return sanity.fetch(`*[_type == "contact"][0]{
    bannerEyebrow, bannerTitle, bannerImage,
    introHeading, introBody
  }`);
}

export async function getEventsPage() {
  return sanity.fetch(`*[_type == "eventsPage"][0]{
    bannerEyebrow, bannerTitle, bannerImage
  }`);
}

export async function getMediaPage() {
  return sanity.fetch(`*[_type == "mediaPage"][0]{
    bannerEyebrow, bannerTitle, bannerImage
  }`);
}

export async function getEvents() {
  return sanity.fetch(`*[_type == "event"] | order(date desc){
    _id, date, title, detail, city, ticketUrl
  }`);
}

export async function getVideos() {
  return sanity.fetch(`*[_type == "video"] | order(isFeatured desc, order asc){
    _id, title, detail, embedUrl, customPoster, isFeatured
  }`);
}

export async function getAudio() {
  return sanity.fetch(`*[_type == "audio"] | order(order asc){
    _id, title, detail, embedUrl
  }`);
}

export async function getGalleryPage() {
  return sanity.fetch(`*[_type == "galleryPage"][0]{
    bannerEyebrow, bannerTitle, bannerImage
  }`);
}

export async function getPhotos() {
  return sanity.fetch(`*[_type == "photo"] | order(_createdAt asc){
    _id, image, caption, alt
  }`);
}
