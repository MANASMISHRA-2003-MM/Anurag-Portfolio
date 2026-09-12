export type Project = {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  description?: string;
  driveId: string;
  aspectRatio: 'vertical' | 'horizontal';
  featured?: boolean;
};

export function parseGoogleDriveUrl(input?: string) {
  if (!input) return { id: '', embedUrl: '', streamUrl: '', thumbnailUrl: '' };
  const match = input.match(/[-\w]{25,}/);
  const id = match ? match[0] : input;
  return {
    id,
    embedUrl: `https://drive.google.com/file/d/${id}/preview`,
    streamUrl: `https://drive.google.com/uc?export=download&id=${id}`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
  };
}

export const WORK_CATEGORIES = [
  "All",
  "Creator & YouTube Edit",
  "Sports & NBA",
  "Social Media & Shorts",
  "Motion Graphics & Animations",
  "Documentary & Films",
  "Gharology & Lifestyle",
  "Wedding Teasers",
  "Music Composing",
  "Commercial & Brand Edit",
] as const;

export const allProjects: Project[] = [
  // --- Homepage Featured 4 ---
  {
    id: "proj-nba-sizzle-2",
    title: "NBA Sizzle Reel — Highlight Edit",
    category: "Sports & NBA",
    subCategory: "Sizzle",
    description: "High-octane NBA hype edit showcasing rhythmic pacing, impact sound design, and player movements.",
    driveId: "1a3_l7NHTBQo0mMzhPxjYjwCDVHKYFJqS",
    aspectRatio: "horizontal",
    featured: true,
  },
  {
    id: "proj-music-comp-1",
    title: "Commercial & Brand Film Edit",
    category: "Commercial & Brand Edit",
    description: "Commercial brand film edit with custom music composition and audio finishing.",
    driveId: "1Wz-UPLf_MOZGMzmDwPsBtVHoe7stwM81",
    aspectRatio: "horizontal",
    featured: true,
  },
  {
    id: "proj-nba-reel-2",
    title: "NBA Action Reels",
    category: "Sports & NBA",
    description: "Vertical high-energy sports reel cut for mobile social engagement.",
    driveId: "14cCR9kLXZo8MTPsLGulE4_Hpy9PELieW",
    aspectRatio: "vertical",
    featured: true,
  },
  {
    id: "proj-creative-shorts-1",
    title: "Informative Short Storytelling",
    category: "Social Media & Shorts",
    description: "Fast-paced social media short formatted for retention and clarity.",
    driveId: "1HjhwqdkHd7zgm5IdYO2j4Cv5cu65jgse",
    aspectRatio: "vertical",
    featured: true,
  },

  // --- Animations ---
  {
    id: "anim-1",
    title: "Character & Story Animation Reel",
    category: "Motion Graphics & Animations",
    description: "2D/3D animated motion sequence with custom sound design.",
    driveId: "1SR50Pok7K4Jqj7RWxpQ0NWxnrOnbNOaM",
    aspectRatio: "vertical",
  },
  {
    id: "anim-2",
    title: "Creative Motion Graphics Reel",
    category: "Motion Graphics & Animations",
    description: "Dynamic typographic and visual animation cut.",
    driveId: "1UBUZWKE5cxz4oU65EOjQ0QIoB4VDLjs0",
    aspectRatio: "vertical",
  },

  // --- Creative Reels ---
  {
    id: "creative-1",
    title: "Aesthetic Creative Social Reel",
    category: "Creator & YouTube Edit",
    description: "Stylized social reel with rhythm matching and seamless cuts.",
    driveId: "1jiIOLESJi-25GKlS7CLaTriFsk2qcafh",
    aspectRatio: "vertical",
  },

  // --- Documentaries ---
  {
    id: "doc-1",
    title: "Documentary Film — Act I",
    category: "Documentary & Films",
    description: "Narrative documentary edit exploring human stories and emotion.",
    driveId: "1EskgZACyhmvq2qwF1zt8KXKzE7tO7Dk0",
    aspectRatio: "horizontal",
  },
  {
    id: "doc-2",
    title: "Documentary Film — Act II",
    category: "Documentary & Films",
    description: "Long-form documentary cut focusing on narrative pacing.",
    driveId: "1hF8DlyIPtnmXgySJDfc-s4IUJ-5k0JM2",
    aspectRatio: "horizontal",
  },
  {
    id: "doc-3",
    title: "Documentary Film — Act III",
    category: "Documentary & Films",
    description: "In-depth editorial storytelling with organic soundscapes.",
    driveId: "1yOWIr_qc9_oh5a4tKe5dGbfZyLO3MhSb",
    aspectRatio: "horizontal",
  },
  {
    id: "doc-4",
    title: "Documentary Story Cut",
    category: "Documentary & Films",
    description: "Cinematic real-world story edit with color grading and sound polish.",
    driveId: "1CrSLovXJyFYvlOHf-Q5GX1ai0cBZmSVM",
    aspectRatio: "horizontal",
  },

  // --- Films ---
  {
    id: "film-1",
    title: "Short Film Cut — Narrative",
    category: "Documentary & Films",
    description: "Dramatic cinematic narrative sequence.",
    driveId: "1MSL4Lz6gOpUT-S6bKS4VFgC93zuclx0_",
    aspectRatio: "horizontal",
  },
  {
    id: "film-2",
    title: "Cinematic Film Chapter II",
    category: "Documentary & Films",
    description: "Atmospheric narrative edit with rich soundscapes.",
    driveId: "1yNTwhxQCdDfcApb5L4szR6l1u6sfF-rg",
    aspectRatio: "horizontal",
  },
  {
    id: "film-3",
    title: "Cinematic Film Chapter III",
    category: "Documentary & Films",
    description: "High-contrast visual story and color master.",
    driveId: "1MkLtOnl5A4Yi2YnGRVzHgvLMtIckHhbX",
    aspectRatio: "horizontal",
  },

  // --- Gharology ---
  {
    id: "gharology-1",
    title: "Gharology Series — Episode 1",
    category: "Gharology & Lifestyle",
    description: "Lifestyle and architectural aesthetic short-form edit.",
    driveId: "1fJeFZMu46pPQzpJzsQB0BCx4TG4nijuo",
    aspectRatio: "vertical",
  },
  {
    id: "gharology-2",
    title: "Gharology Series — Episode 2",
    category: "Gharology & Lifestyle",
    description: "Modern interior and living space social reel.",
    driveId: "1BzuRPrX1jQj5TKWC6HrexdfNFQZxdpl5",
    aspectRatio: "vertical",
  },

  // --- Motion Graphics ---
  {
    id: "mgraph-1",
    title: "Motion Graphics & Compositing I",
    category: "Motion Graphics & Animations",
    description: "Title sequences, visual effects, and graphic overlays.",
    driveId: "1VTlh5zUQgaRjApI07ugeiBNK_r2-a3zI",
    aspectRatio: "vertical",
  },
  {
    id: "mgraph-2",
    title: "Motion Graphics & Compositing II",
    category: "Motion Graphics & Animations",
    description: "Widescreen motion graphics showpiece.",
    driveId: "1ySs1kGwHk_nzgDAP9KWKbBI2m5MWoU7V",
    aspectRatio: "horizontal",
  },

  // --- Music Composing ---
  {
    id: "music-2",
    title: "Original Score & Audio Production",
    category: "Music Composing",
    description: "Custom soundtrack scoring integrated into video edit.",
    driveId: "1Q6R-xfrZ6j71zCnQCFAT4cQYsM1dgg7w",
    aspectRatio: "horizontal",
  },
  {
    id: "comm-brand-1",
    title: "Commercial & Brand Edit Showcase",
    category: "Commercial & Brand Edit",
    description: "High-impact brand commercial edit with precise pacing, sound design, and color finishing.",
    driveId: "11LAuahoUO0HQUtdV4MkbbpFF3uacCgp3",
    aspectRatio: "horizontal",
  },

  // --- NBA Reels & Sizzle ---
  {
    id: "nba-reel-1",
    title: "NBA Courtside Edit",
    category: "Sports & NBA",
    description: "Fast-cut basketball action reel with speed ramping.",
    driveId: "1-E9N0BOctMLXBIROXCHk7fmICnddO7y2",
    aspectRatio: "vertical",
  },
  {
    id: "nba-sizzle-1",
    title: "NBA Championship Hype Reel",
    category: "Sports & NBA",
    description: "Widescreen promotional sizzle reel.",
    driveId: "1CK0kUoM_F-PmbJCNPpVhZkfQtcW5BMhm",
    aspectRatio: "horizontal",
  },

  // --- Wedding Teasers ---
  {
    id: "wedding-1",
    title: "Cinematic Wedding Teaser I",
    category: "Wedding Teasers",
    description: "Romantic story cut with emotional music sync and slow motion.",
    driveId: "1Z1Y-DUzUjLVoMN54mvR-th-f8NdOQUll",
    aspectRatio: "vertical",
  },
  {
    id: "wedding-2",
    title: "Cinematic Wedding Teaser II",
    category: "Wedding Teasers",
    description: "High-end wedding highlight edit for mobile social sharing.",
    driveId: "1wYFqnd4i6eQl2W5gcbtxG0h71r5UFIfW",
    aspectRatio: "vertical",
  },
  {
    id: "wedding-3",
    title: "Cinematic Wedding Teaser III",
    category: "Wedding Teasers",
    description: "Celebration highlights with rich color grading and audio mix.",
    driveId: "1C3vIyEHfP9wQm4fodMNSigrQVFtY-Haw",
    aspectRatio: "vertical",
  },
];

export const portfolio = {
  site: {
    name: "Anurag Shakya",
    role: "Video Editor & Creative Professional",
    phone: "8750886964",
    email: "Anuragshakya922@gmail.com",
    instagram: "https://www.instagram.com/annrag191",
    linkedin: "https://www.linkedin.com/in/anurag-shakya-589616245",
  },
  showreel: {
    title: "A glimpse into the worlds, stories and styles.",
    driveId: "1a3_l7NHTBQo0mMzhPxjYjwCDVHKYFJqS",
    driveUrl: "https://drive.google.com/file/d/1a3_l7NHTBQo0mMzhPxjYjwCDVHKYFJqS/view?usp=drivesdk",
  },
  navigation: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Showreel", href: "/work" },
    { label: "Contact", href: "/#contact" },
  ],
  hero: {
    eyebrow: "Anurag Shakya",
    title: "Stories come alive in the edit.",
    description:
      "Video Editor & Creative Professional with 6+ years shaping footage across sports, brands, YouTube, advertising and social media.",
    primaryCta: { label: "View My Work", href: "/work" },
    secondaryCta: { label: "Let's Talk", href: "/#contact" },
    videoSrc: "/hero-plants-desktop.webm",
  },
  stats: [
    { value: "6+", label: "Years of experience" },
    { value: "SPORTS", label: "Editing specialty" },
    { value: "BRANDS", label: "Creators & teams" },
    { value: "VIDEO", label: "Editing · Motion · Sound" },
  ],
  services: [
    { title: "Short Form", desc: "Fast, engaging edits for Reels, Shorts and social-first storytelling." },
    { title: "Long Form", desc: "YouTube, interviews and narrative-led edits built for clarity and retention." },
    { title: "Commercials", desc: "Brand films and advertising edits with pace, polish and visual storytelling." },
    { title: "Sports", desc: "High-energy edits built around movement, emotion, timing and impact." },
    { title: "Motion Graphics", desc: "Titles, animated graphics, transitions and compositing that sharpen the story." },
    { title: "Sound Design", desc: "Music, ambience, effects and audio finishing for a complete final cut." },
    { title: "Creative Reels", desc: "Stylized social edits for creators, campaigns and creative storytelling." },
    { title: "AI Workflows", desc: "AI-assisted ideation and production workflows where they genuinely help." },
    { title: "Video Production", desc: "Shooting, production support, creative planning and post-production." },
    { title: "Script Writing", desc: "Story structure, scripting and narrative development when the project needs it." },
  ],
  capabilities: [
    "Editing", "Storytelling", "Video Production", "Shooting",
    "Script Writing", "Motion Graphics", "Compositing", "Sound Design", "AI Creative Workflows",
  ],
  projects: allProjects.slice(0, 4),
  creators: ["Loveena Kamath", "Varun Mayya's Bengaluru team", "Anurag Bansal"],
  experience: [
    { company: "Lit Creative Studio", role: "Editor in Chief", period: "Aug 2025 – Present", location: "Noida" },
    { company: "Yaas Media", role: "Video Editor", period: "Sep 2024 – Aug 2025", location: "" },
    { company: "ScaleAcres", role: "Video Editor", period: "Apr 2024 – Jul 2026", location: "Delhi" },
    { company: "Home Sparkle Sourcing India", role: "Graphic Designer & Video Editor", period: "Apr 2023 – May 2023", location: "" },
    { company: "Sports Media Solution", role: "Video Editor", period: "2022 – 2023", location: "" },
  ],
  education: [
    { institution: "Vishwavidhyalya", detail: "12th Passed — VFX · 2020" },
    { institution: "MAAC", detail: "Diploma in Compositing & Editing" },
    { institution: "CBSE", detail: "12th Passed / High School Diploma" },
  ],
  process: [
    { no: "01", title: "Understand", desc: "Brief, audience, footage and goal." },
    { no: "02", title: "Structure", desc: "Find the story and strongest narrative flow." },
    { no: "03", title: "Edit", desc: "Shape footage through pacing and rhythm." },
    { no: "04", title: "Enhance", desc: "Motion, graphics, compositing and sound." },
    { no: "05", title: "Refine", desc: "Polish every detail and strengthen every frame." },
    { no: "06", title: "Deliver", desc: "A finished piece ready for its platform and audience." },
  ],
  faq: [
    { q: "What type of videos do you edit?", a: "Short-form, long-form, commercials, sports, YouTube, social media, documentaries, creative reels and more." },
    { q: "Do you work with brands and creators?", a: "Yes. My experience includes creator teams, media teams, brands and freelance projects." },
    { q: "Do you provide motion graphics and compositing?", a: "Yes. Motion graphics, animation, compositing and visual enhancements can be part of the edit." },
    { q: "Do you also work on sound design?", a: "Yes. Music, ambience, sound effects and audio finishing can be included in the edit." },
    { q: "Can you help with shooting or production?", a: "Yes. I also work across video production, shooting and production support." },
    { q: "Do you use AI in your workflow?", a: "Yes. I use AI-assisted workflows where they improve ideation, experimentation or post-production." },
    { q: "How can I contact you?", a: "Call 8750886964, mail: Anuragshakya922@gmail.com or reach out on Instagram or LinkedIn." },
  ],
};
