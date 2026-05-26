import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, "../src/assets/images");

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN env var. Create a token in sanity.io/manage → API → Tokens (Editor permission) and run:\n\n  SANITY_WRITE_TOKEN=<token> node scripts/seed.mjs\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId: "djstmfxx",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const uploaded = new Map();
async function uploadImage(filename) {
  if (uploaded.has(filename)) return uploaded.get(filename);
  const filePath = path.join(imagesDir, filename);
  console.log(`  ↑ ${filename}`);
  const buf = readFileSync(filePath);
  const asset = await client.assets.upload("image", buf, { filename });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  uploaded.set(filename, ref);
  return ref;
}

// --- Plain text → portable text block helper ---
const block = (text, marks = {}) => ({
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [
    {
      _type: "span",
      text,
      marks: marks.strong ? ["strong"] : [],
    },
  ],
});

// --- Portable text with inline bold spans ---
const blockMixed = (segments) => ({
  _type: "block",
  style: "normal",
  markDefs: [],
  children: segments.map((s) =>
    typeof s === "string"
      ? { _type: "span", text: s, marks: [] }
      : { _type: "span", text: s.text, marks: s.bold ? ["strong"] : [] },
  ),
});

async function run() {
  console.log("\nUploading images…");
  const heroImg = await uploadImage("hero.jpg");
  const introImg = await uploadImage("intro-portrait.jpg");
  const hAbout = await uploadImage("highlight-about.jpg");
  const hEvents = await uploadImage("highlight-events.jpg");
  const hLessons = await uploadImage("highlight-lessons.jpg");
  const aboutBanner = await uploadImage("about-banner.jpg");
  const aboutPortrait = await uploadImage("about-portrait.jpg");
  const eventsBanner = await uploadImage("events-banner.jpg");
  const mediaBanner = await uploadImage("media-banner.jpg");
  const lessonsBanner = await uploadImage("lessons-banner.jpg");
  const lessonsStudio = await uploadImage("lessons-studio.jpg");
  const contactBanner = await uploadImage("contact-banner.jpg");
  const videoFeatured = await uploadImage("video-featured.jpg");
  const video1 = await uploadImage("video-1.jpg");
  const video2 = await uploadImage("video-2.jpg");
  const video3 = await uploadImage("video-3.jpg");

  console.log("\nWriting documents…");
  const tx = client.transaction();

  // Site settings
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: "Alexis Porcaro",
    role: "Oboist",
    email: "alexis.porcaro@gmail.com",
  });

  // Home
  tx.createOrReplace({
    _id: "home",
    _type: "home",
    heroEyebrow: "Oboist · Teaching Artist",
    heroSubtitle:
      "A singing, deeply expressive voice on the oboe — at home on the recital stage, in the concerto spotlight, and among chamber colleagues.",
    heroImage: heroImg,
    heroPrimaryCtaLabel: "Upcoming Events",
    heroPrimaryCtaHref: "/events",
    heroSecondaryCtaLabel: "Get in Touch",
    heroSecondaryCtaHref: "/contact",
    quotes: [
      {
        _key: "q1",
        quote:
          "A tone of uncommon warmth and an unerring sense of line — Porcaro plays as if speaking directly to you.",
        source: "The Strand Review",
      },
      {
        _key: "q2",
        quote:
          "Phrasing of real intelligence and a fearless, singing upper register.",
        source: "Classical Notebook",
      },
      {
        _key: "q3",
        quote:
          "One of the most compelling young woodwind voices of her generation.",
        source: "Reed & Bow Magazine",
      },
    ],
    introEyebrow: "Welcome",
    introHeading: "Music that breathes.",
    introBody: [
      block(
        "Alexis Porcaro is an oboist whose playing pairs old-world lyricism with a fresh, fearless musical instinct. From Baroque obbligatos to newly commissioned works, she brings an unmistakable warmth and clarity to every program.",
      ),
      block(
        "Alongside an active performing life, she maintains a select private studio for advanced players preparing for auditions and the professional stage.",
      ),
    ],
    introImage: introImg,
    introLinkLabel: "Read the full bio",
    introLinkHref: "/about",
    highlights: [
      {
        _key: "h1",
        title: "About",
        href: "/about",
        blurb: "Biography, repertoire, and the story behind the sound.",
        image: hAbout,
      },
      {
        _key: "h2",
        title: "Events",
        href: "/events",
        blurb: "Upcoming recitals, concerto appearances, and chamber dates.",
        image: hEvents,
      },
      {
        _key: "h3",
        title: "Lessons",
        href: "/lessons",
        blurb: "Private study for advanced and pre-professional oboists.",
        image: hLessons,
      },
    ],
    ctaHeading: "Bring Alexis to your stage or studio.",
    ctaBody:
      "Booking inquiries, collaborations, and lesson requests are always welcome.",
    ctaButtonLabel: "Contact Alexis",
    ctaButtonHref: "/contact",
  });

  // About
  tx.createOrReplace({
    _id: "about",
    _type: "about",
    bannerEyebrow: "The Artist",
    bannerTitle: "About",
    bannerImage: aboutBanner,
    bio: [
      blockMixed([
        "Oboist ",
        { text: "Alexis Porcaro", bold: true },
        " has been praised for the warmth of her sound and the intelligence of her phrasing. Equally at home as soloist, chamber musician, and orchestral principal, she brings a vocal, deeply communicative sensibility to repertoire spanning the Baroque to the present day.",
      ]),
      block(
        "A dedicated advocate for new music, she has premiered works written expressly for her and regularly collaborates with living composers. Her recital programs are known for their thoughtful pairings of familiar masterworks with rarely heard gems.",
      ),
      block(
        "She has appeared with regional orchestras and festivals across the country, and her playing has been featured on broadcast and in live streamed performances. Recent seasons include concerto appearances, chamber residencies, and a growing body of commissioned solo work.",
      ),
      block(
        "Beyond the stage, Alexis is a sought-after teacher whose students have gone on to leading conservatories and professional ensembles. She maintains a private studio for advanced and pre-professional oboists.",
      ),
    ],
    portrait: aboutPortrait,
    facts: [
      { _key: "f1", label: "Instrument", value: "Oboe & English Horn" },
      { _key: "f2", label: "Based in", value: "New York, NY" },
      {
        _key: "f3",
        label: "Education",
        value: "M.M., Manhattan School of Music",
      },
      { _key: "f4", label: "Reeds", value: "Handmade, American scrape" },
    ],
    repertoireHeading: "Concertos & solo works",
    repertoire: [
      "Strauss — Oboe Concerto in D",
      "Mozart — Oboe Concerto in C, K. 314",
      "Marcello — Concerto in D minor",
      "Britten — Six Metamorphoses after Ovid",
      "Poulenc — Sonata for Oboe and Piano",
      "Vaughan Williams — Concerto for Oboe and Strings",
    ],
  });

  // Lessons
  tx.createOrReplace({
    _id: "lessons",
    _type: "lessons",
    bannerEyebrow: "Studio",
    bannerTitle: "Private Lessons",
    bannerImage: lessonsBanner,
    introHeading: "For serious, advanced oboists.",
    introBody:
      "Alexis maintains a small private studio dedicated to high-level players — pre-professional students, conservatory candidates, and committed adult musicians preparing for the next stage of their playing. Lessons are rigorous, individualized, and rooted in producing a free, singing sound.",
    offerings: [
      {
        _key: "o1",
        title: "Audition Preparation",
        body: "Repertoire selection, excerpt drilling, and mock-audition runs for conservatory and orchestral auditions.",
      },
      {
        _key: "o2",
        title: "Solo & Concerto Coaching",
        body: "Deep work on the standard concertos and recital literature — sound, line, color, and stage presence.",
      },
      {
        _key: "o3",
        title: "Reed Making",
        body: "Hands-on guidance through scrape, balance, and consistency, tailored to your equipment and climate.",
      },
    ],
    expectations: [
      "Weekly or biweekly 60–90 minute sessions",
      "In-person (NYC) or online via high-quality audio",
      "Detailed written notes after each lesson",
      "Honest, demanding, and supportive feedback",
    ],
    studioImage: lessonsStudio,
    tuitionLabel: "Tuition",
    tuitionHeadline: "Inquire for current rates",
    tuitionBody:
      "A short conversation helps determine fit before we begin. Limited studio openings each season.",
    tuitionButtonLabel: "Request a Lesson",
    tuitionButtonHref: "/contact",
  });

  // Contact
  tx.createOrReplace({
    _id: "contact",
    _type: "contact",
    bannerEyebrow: "Get in Touch",
    bannerTitle: "Contact",
    bannerImage: contactBanner,
    introHeading: "Let's talk.",
    introBody:
      "For booking, collaborations, lesson inquiries, or press, send a note using the form — or reach out directly.",
  });

  // Events page banner
  tx.createOrReplace({
    _id: "eventsPage",
    _type: "eventsPage",
    bannerEyebrow: "Calendar",
    bannerTitle: "Events",
    bannerImage: eventsBanner,
  });

  // Media page banner
  tx.createOrReplace({
    _id: "mediaPage",
    _type: "mediaPage",
    bannerEyebrow: "Watch & Listen",
    bannerTitle: "Media",
    bannerImage: mediaBanner,
  });

  // Events
  const events = [
    {
      date: "2026-06-12",
      title: "Strauss Oboe Concerto",
      detail: "with the Hudson Valley Sinfonia · Bard Hall",
      city: "Annandale-on-Hudson, NY",
    },
    {
      date: "2026-07-03",
      title: "Solo Recital: French Reflections",
      detail: "Poulenc, Saint-Saëns & Dutilleux · with pianist Mara Lin",
      city: "New York, NY",
    },
    {
      date: "2026-08-20",
      title: "Summer Chamber Festival",
      detail: "Mozart Quartet for Oboe & Strings, K. 370",
      city: "Lenox, MA",
    },
    {
      date: "2026-03-08",
      title: "Marcello Concerto in D minor",
      detail: "Metro Baroque Collective",
      city: "Brooklyn, NY",
    },
    {
      date: "2026-01-19",
      title: "Six Metamorphoses after Ovid",
      detail: "Solo — New Music Salon Series",
      city: "Philadelphia, PA",
    },
    {
      date: "2025-11-22",
      title: "Bach Christmas Oratorio",
      detail: "Principal Oboe · Cathedral Festival Orchestra",
      city: "Washington, DC",
    },
  ];
  events.forEach((e, i) => {
    tx.createOrReplace({
      _id: `event-seed-${i + 1}`,
      _type: "event",
      ...e,
    });
  });

  // Videos (placeholder embed URLs — Alexis will replace with real YouTube/Vimeo URLs)
  const videos = [
    {
      title: "Strauss — Oboe Concerto in D, I. Allegro moderato",
      detail: "with the Hudson Valley Sinfonia · live, 2026",
      embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      customPoster: videoFeatured,
      isFeatured: true,
      order: 0,
    },
    {
      title: "Poulenc — Oboe Sonata, II. Scherzo",
      detail: "Recital · 2026",
      embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      customPoster: video1,
      isFeatured: false,
      order: 1,
    },
    {
      title: "Britten — Pan (from Six Metamorphoses)",
      detail: "Solo · 2026",
      embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      customPoster: video2,
      isFeatured: false,
      order: 2,
    },
    {
      title: "Marcello — Concerto in D minor, Adagio",
      detail: "with Metro Baroque Collective · 2026",
      embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      customPoster: video3,
      isFeatured: false,
      order: 3,
    },
  ];
  videos.forEach((v, i) => {
    tx.createOrReplace({ _id: `video-seed-${i + 1}`, _type: "video", ...v });
  });

  // Audio (placeholder — Alexis will replace embed URLs with Spotify/SoundCloud)
  const audio = [
    {
      title: "Mozart — Oboe Concerto in C, K. 314",
      detail: "Studio recording · 2026",
      embedUrl: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
      order: 0,
    },
    {
      title: "Vaughan Williams — Oboe Concerto, Minuet & Musette",
      detail: "Live · 2025",
      embedUrl: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
      order: 1,
    },
    {
      title: "Saint-Saëns — Oboe Sonata, I. Andantino",
      detail: "Studio recording · 2025",
      embedUrl: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
      order: 2,
    },
  ];
  audio.forEach((a, i) => {
    tx.createOrReplace({ _id: `audio-seed-${i + 1}`, _type: "audio", ...a });
  });

  const result = await tx.commit();
  console.log(`\n✓ Wrote ${result.results.length} documents`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
