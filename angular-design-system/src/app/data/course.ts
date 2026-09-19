// Online course catalogue. Live courses mirror the TudásPiac platform at
// oktatas.kirillareka.hu (title, description, week/video counts, cover, deep-link URL);
// covers are self-hosted snapshots under public/assets/images/courses/ (the platform only
// serves rotating PageSpeed-hashed URLs, so we don't hotlink). A course with no `image`
// (e.g. the not-yet-published Csípő Program) renders the neutral placeholder slot.

export type CourseStatus = 'live' | 'soon';

export interface Course {
  slot: string;
  title: string;
  description: string;
  weeks: number | null;
  lessons: number | null;
  status: CourseStatus;
  /** Self-hosted cover, e.g. `assets/images/courses/stabil-gerinc.jpg`. Absent → placeholder. */
  image?: string;
  /** Direct course page on the platform; falls back to COURSE_PLATFORM when absent. */
  url?: string;
}

export const COURSE_PLATFORM = 'https://oktatas.kirillareka.hu/';

export const COURSES: Course[] = [
  {
    slot: 'course-torna',
    title: 'Teljes Test Torna',
    description: 'Teljes testet átmozgató gyakorlatsor (30 perc)',
    weeks: null,
    lessons: 2,
    status: 'live',
    image: 'assets/images/courses/teljes-test-torna.jpg',
    url: 'https://oktatas.kirillareka.hu/products/course/teljes-test-torna',
  },
  {
    slot: 'course-gerinc',
    title: 'Stabil Gerinc Program',
    description: 'A gerincstabilizáló izmok fejlesztése az alapoktól a haladó szintig',
    weeks: 12,
    lessons: 19,
    status: 'live',
    image: 'assets/images/courses/stabil-gerinc.jpg',
    url: 'https://oktatas.kirillareka.hu/products/course/stabil-gerinc-program-12-het',
  },
  {
    slot: 'course-henger',
    title: 'Hengerezz okosan',
    description: 'Az SMR henger és trigger labda használata',
    weeks: null,
    lessons: 10,
    status: 'live',
    image: 'assets/images/courses/hengerezz-okosan.jpg',
    url: 'https://oktatas.kirillareka.hu/products/course/hengerezz-okosan',
  },
  {
    slot: 'course-csipo',
    title: 'Csípő Program',
    description: '',
    weeks: null,
    lessons: null,
    status: 'soon',
  },
];

export function liveCourses(limit = 2): Course[] {
  return COURSES.filter((c) => c.status === 'live').slice(0, limit);
}
