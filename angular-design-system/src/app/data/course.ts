// Online course catalogue, ported from ProgramsScreen.jsx. `weeks`/`lessons` stay null until
// Réka supplies them (cards render an em-dash). The two `live` covers do not exist yet —
// render a neutral placeholder, never stock imagery (see README §4).

export type CourseStatus = 'live' | 'soon';

export interface Course {
  slot: string;
  title: string;
  description: string;
  weeks: number | null;
  lessons: number | null;
  status: CourseStatus;
}

export const COURSE_PLATFORM = 'https://oktatas.kirillareka.hu/';

export const COURSES: Course[] = [
  { slot: 'course-csipo', title: 'Csípő Program', description: '', weeks: null, lessons: null, status: 'soon' },
  { slot: 'course-henger', title: 'Hengerezz okosan', description: 'Az SMR henger és trigger labda használata', weeks: null, lessons: null, status: 'live' },
  { slot: 'course-gerinc', title: 'Stabil Gerinc Program', description: 'A gerincstabilizáló izmok fejlesztése az alapoktól a haladó szintig', weeks: null, lessons: null, status: 'live' },
];

export function liveCourses(limit = 2): Course[] {
  return COURSES.filter((c) => c.status === 'live').slice(0, limit);
}
