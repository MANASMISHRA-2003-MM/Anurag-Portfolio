
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  driveId?: string;
  videoUrl?: string;
  embedUrl?: string;
  thumbnail?: string;
  href?: string;
};

export function parseGoogleDriveUrl(input?: string) {
  if (!input) return { id: '', embedUrl: '', streamUrl: '' };
  const match = input.match(/[-\w]{25,}/);
  const id = match ? match[0] : input;
  return {
    id,
    embedUrl: `https://drive.google.com/file/d/${id}/preview`,
    streamUrl: `https://drive.google.com/uc?export=download&id=${id}`,
  };
}

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
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Showreel", href: "#showreel" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Anurag Shakya",
    title: "Stories come alive in the edit.",
    description:
      "Video Editor & Creative Professional with 6+ years shaping footage across sports, brands, YouTube, advertising and social media.",
    primaryCta: { label: "View My Work", href: "#work" },
    secondaryCta: { label: "Let's Talk", href: "#contact" },
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
  projects: [
    {
      id: "project-01",
      title: "Commercial & Brand Edit",
      category: "Commercials",
      description: "High-impact commercial edit.",
      thumbnail: "/logo.svg",
      driveId: "1Wz-UPLf_MOZGMzmDwPsBtVHoe7stwM81",
    },
    {
      id: "project-02",
      title: "Creator & YouTube Edit",
      category: "Long Form",
      description: "Narrative-driven creator video edit.",
      thumbnail: "/logo.svg",
      driveId: "1MSL4Lz6gOpUT-S6bKS4VFgC93zuclx0_",
    },
    {
      id: "project-03",
      title: "Sports & High-Energy Edit",
      category: "Sports",
      description: "Fast-paced sports and motion edit.",
      thumbnail: "/logo.svg",
      driveId: "14cCR9kLXZo8MTPsLGulE4_Hpy9PELieW",
    },
    {
      id: "project-04",
      title: "Creative Social Reel",
      category: "Short Form",
      description: "Stylized social-first video edit.",
      thumbnail: "/logo.svg",
      driveId: "1HjhwqdkHd7zgm5IdYO2j4Cv5cu65jgse",
    },
  ] as Project[],
  creators: ["Loveena Kamath", "Varun Mayya's Bengaluru team", "Anurag Bansal"],
  experience: [
    { company: "Lit Creative Studio", role: "Editor in Chief", period: "Aug 2025 – Present", location: "Noida" },
    { company: "Yaas See Media", role: "Video Editor", period: "Sep 2024 – Aug 2025", location: "" },
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
