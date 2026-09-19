// Shared patient case-story shape. The actual stories live in data/blog.ts (BLOG_STORIES); the
// landing page shows the first two via ContentService.cases(). Block text carries <strong>
// emphasis (and, where relevant, an <a> link), rendered via [innerHTML] on `.kp-rich`.

export interface CaseStoryBlock {
  label: string;
  text: string;
}

/** Optional "this case became an online course" call-out shown at the end of a story. */
export interface CaseCourse {
  /** Lead-in describing how the case grew into a course. */
  text: string;
  /** Course name, used as the CTA label. */
  name: string;
  /** Course link (platform URL or internal /online-programok). */
  href: string;
}

export interface CaseStory {
  meta: string;
  title: string;
  blocks: CaseStoryBlock[];
  outcome: string;
  therapies: string[];
  /** Optional program CTA (only the stories that led to a course carry it). */
  course?: CaseCourse;
}
