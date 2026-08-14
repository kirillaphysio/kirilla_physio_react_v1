import { Injectable } from '@angular/core';
import { THERAPIES, Therapy, therapyById } from '../data/therapy';
import { COURSES, COURSE_PLATFORM, Course, liveCourses } from '../data/course';
import { REGIONS, REGION_DETAIL, DEFAULT_REGION, BodyRegion, RegionDetail } from '../data/region';
import { CASES, CaseStory } from '../data/case';
import { LANDING_OPINIONS, TREATMENTS_OPINIONS, Testimonial } from '../data/testimonial';
import { FAQS, Faq } from '../data/faq';
import { QUALIFICATIONS, Qualification } from '../data/qualification';

/**
 * Static content, read straight from the typed `data/` modules — no HTTP, no state library.
 * The single access point the landing page and its sections resolve their copy through.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly coursePlatform = COURSE_PLATFORM;
  readonly defaultRegion = DEFAULT_REGION;

  therapies(): Therapy[] {
    return THERAPIES;
  }
  therapy(id: string): Therapy | undefined {
    return therapyById(id);
  }

  courses(): Course[] {
    return COURSES;
  }
  liveCourses(limit = 2): Course[] {
    return liveCourses(limit);
  }

  regions(): BodyRegion[] {
    return REGIONS;
  }
  regionDetail(id: string): RegionDetail | undefined {
    return REGION_DETAIL[id];
  }
  /** The therapies (resolved to full records) that a region routes to. */
  regionTherapies(id: string): Therapy[] {
    const detail = REGION_DETAIL[id];
    if (!detail) return [];
    return detail.therapies
      .map((tid) => therapyById(tid))
      .filter((t): t is Therapy => !!t);
  }

  cases(): CaseStory[] {
    return CASES;
  }

  landingOpinions(): Testimonial[] {
    return LANDING_OPINIONS;
  }
  treatmentsOpinions(): Testimonial[] {
    return TREATMENTS_OPINIONS;
  }

  faqs(): Faq[] {
    return FAQS;
  }
  qualifications(): Qualification[] {
    return QUALIFICATIONS;
  }
}
