import siteSettings from "./siteSettings";
import home from "./home";
import about from "./about";
import lessons from "./lessons";
import contact from "./contact";
import eventsPage from "./eventsPage";
import mediaPage from "./mediaPage";
import event from "./event";
import video from "./video";
import audio from "./audio";

export const schemaTypes = [
  siteSettings,
  home,
  about,
  lessons,
  contact,
  eventsPage,
  mediaPage,
  event,
  video,
  audio,
];

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "home",
  "about",
  "lessons",
  "contact",
  "eventsPage",
  "mediaPage",
]);
