/**
 * Type definitions for all résumé content.
 * The content itself lives in `resume.ts` — you should rarely need to edit this file.
 */

/**
 * The image that represents a journey stage. Any SVG, PNG or WebP works —
 * put the file in /public/images and reference it as "images/…".
 */
export interface StageVisual {
  /** The main image, shown large in the centre of the stage. */
  src: string;
  /** What the image shows, for screen readers and when images fail to load. */
  alt: string;
  /** Optional smaller images that float around the main one (up to four). Decorative. */
  extras?: string[];
}

export interface Media {
  /** Path to a file in /public (e.g. "images/university-certificate.webp") or a full URL. */
  src: string;
  /** Describe what the image shows. Leave "" only for purely decorative images. */
  alt: string;
  kind: 'image' | 'logo' | 'certificate' | 'icon';
  /** Intrinsic size — prevents layout shift while the image loads. */
  width: number;
  height: number;
}

export interface PersonalDetails {
  fullName: string;
  /** Short version for the header monogram, e.g. "JD". */
  initials: string;
  currentTitle: string;
  location: string;
  positioningStatement: string;
  summary: string;
  /** Path under /public (e.g. "cv/your-name-cv.pdf"). Leave "" until you add the file. */
  cvFile: string;
  photo?: Media;
}

export interface ContactLinks {
  email: string;
  linkedIn: string;
  /** Optional — leave "" to hide it everywhere. */
  phone: string;
  /**
   * Optional form endpoint (e.g. Formspree, Basin, Getform). When "", the contact
   * form opens the visitor's email app with the message pre-filled instead.
   */
  formEndpoint: string;
}

export interface JourneyStage {
  /** Unique, URL-safe id. Used by `journeyOrder` and by `skillGroups[].developedIn`. */
  id: string;
  kind: 'education' | 'experience' | 'goal';
  /** The image for this stage, and the floating extras around it. */
  visual: StageVisual;
  /** Role or qualification. */
  title: string;
  /** Short label for the progress indicator (defaults to title). */
  shortTitle?: string;
  organization: string;
  location: string;
  start: string;
  /** Use "Present" for ongoing stages. */
  end: string;
  ongoing?: boolean;
  description: string;
  /** Two to four items. */
  achievements: string[];
  skills: string[];
  /** Optional measurable results, shown as highlighted figures. */
  results?: { value: string; label: string }[];
  media?: Media;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  challenge: string;
  actions: string[];
  tools: string[];
  result: string;
  /** Which journey stage it belongs to — also used to draw the fallback illustration. */
  stageId: string;
  image?: Media;
  caseStudyUrl?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
  /** Journey stage ids where these skills were developed or applied. */
  developedIn: string[];
}

export interface CurrentFocus {
  heading: string;
  /** Ids of the ongoing stages. */
  stageIds: string[];
  focusAreas: string[];
}

export interface FutureGoal {
  aim: string;
  longTermGoal: string;
  impact: string;
  opportunities: string[];
  closingLine: string;
}

export interface SiteMeta {
  /** Public URL once deployed, e.g. "https://yourname.com/". Used for social sharing tags. */
  siteUrl: string;
  /** Visually mark [placeholder] text so it is easy to find. Set false before launch. */
  highlightPlaceholders: boolean;
}
