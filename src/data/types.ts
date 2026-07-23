export interface Brand {
  name: string;
  logoImage: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Hero {
  eyebrow: string;
  title: string;
  highlight: string;
  lead: string;
  badge: string;
  ctaPrimary: string;
  ctaSecondary: string;
  floatTitle: string;
  floatSub: string;
  portraitImage: string;
  /** Google Drive file ID cho video showreel mở khi bấm nút play trên khung chân dung. Để trống ("") nếu chưa có. */
  showreelDriveFileId: string;
}

export interface WorkFilter {
  key: string;
  label: string;
}

export interface WorkItem {
  id: number;
  title: string;
  cat: string;
  catLabel: string;
  dur: string;
  role: string;
  desc: string;
  driveFileId: string;
  thumb: string;
  hue: string;
}

export interface WorksSection {
  title: string;
  subtitle: string;
  filters: WorkFilter[];
  items: WorkItem[];
}

export interface StatCard {
  value: string;
  label: string;
}

export interface AboutSection {
  eyebrow: string;
  title: string;
  highlight: string;
  bio: string[];
  photo: string;
  ringValue: string;
  ringLabel: string;
  skillsTitle: string;
  skills: string[];
  statCards: StatCard[];
}

// Không dùng union cố định: nội dung này đến từ content.json do admin chỉnh tự do,
// SocialIcon.tsx đã có fallback icon chung (Link2) cho type lạ.
export type SocialType = string;

export interface Social {
  type: SocialType;
  url: string;
}

export interface ContactSection {
  eyebrow: string;
  heading: string;
  text: string;
  email: string;
  socials: Social[];
}

export interface SiteProfile {
  brand: Brand;
  hero: Hero;
  stats: Stat[];
  marquee: string[];
  about: AboutSection;
  contact: ContactSection;
  footer: string;
  soundDefault: boolean;
}
