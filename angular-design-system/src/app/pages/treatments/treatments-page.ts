import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import {
  Button,
  Card,
  DashList,
  Eyebrow,
  FaqAccordion,
  JumpMenu,
  PriceItem,
  SectionHeading,
  StepFlow,
  TestimonialCarousel,
  TherapyCard,
} from '../../ui';
import { ContentService } from '../../core/content.service';
import { ScrollService } from '../../core/scroll.service';
import { SeoService } from '../../core/seo.service';
import { SALONIC_URL } from '../../ui/header/header';

interface PolicyBlock {
  title: string;
  paragraphs: string[];
}

const JUMP = [
  { id: 'foglalas', label: 'Időpont foglalás' },
  { id: 'elso-alkalom', label: 'Az első alkalom' },
  { id: 'segitseg', label: 'Miben tudok segíteni?' },
  { id: 'terapiak', label: 'Terápiák' },
  { id: 'arak', label: 'Árak' },
  { id: 'visszajelzesek', label: 'Visszajelzések a pácienseimtől' },
  { id: 'faq', label: 'Gyakori kérdések' },
  { id: 'szabalyzat', label: 'Szabályzat' },
];

const FIRST_VISIT = [
  {
    title: 'Beszélgetünk',
    description:
      'Végigkérdezem a panaszod történetét, a korábbi sérüléseket, a munkád és a mozgásod jellemzőit. Ha van orvosi dokumentációd, azt is átnézem.',
    meta: 'kb. 15 perc',
  },
  {
    title: 'Megvizsgállak',
    description:
      'Testtartás- és mozgásvizsgálat, majd célzott tesztek. Kényelmes, mozgásra alkalmas ruhában gyere, sportmelltartó vagy top praktikus.',
    meta: 'kb. 20 perc',
  },
  {
    title: 'Kezelek és tervet adok',
    description:
      'Az első kezelést is elvégzem, elmondom, mit találtam, és mit tehetünk ellene. Otthonra kapsz gyakorlatokat.',
    meta: 'kb. 25 perc',
  },
];

const COMPLAINTS = [
  'derékfájás, nyakfájás, hátfájás (porckorongsérv/becsípődés, instabilitás, csigolyaelcsúszás, izom túlfeszülés, ízületi blokk)',
  'végtagba sugárzó fájdalom, zsibbadás, és izomerő csökkenés',
  'ízületi fájdalmak és mozgástartomány beszűkülés (gerinc, váll, könyök, csukló, kéz, csípő, térd, boka, láb)',
  'helytelen testtartás',
  'belsőszervi panaszok (pl. puffadás, székrekedés, IBS, folyadékkal telt ciszták, fájdalmas menstruáció)',
  'sérülések (pl. bokaficam, húzódások)',
  'műtétek után (pl. térd, kéz, hasi műtétek)',
  'stressz, fejfájás, állkapocs ízületi panaszok',
];

const POLICY: PolicyBlock[] = [
  {
    title: 'Lemondási feltételek',
    paragraphs: [
      'Az időpontod lemondását, vagy másik napra módosítását legkésőbb az eredeti időpont előtt 24 órával tudom elfogadni. Kérlek minél hamarabb szólj, hogy legyen lehetőségem másnak átadni a helyed! (Itt tudsz szólni: e-mailben kirillaphysio@gmail.com)',
      '24 órán belüli időpont lemondás (vagy másik napra módosítás) esetén a kezelés díját 3 napon belül szükséges megtéríteni. (Ez akkor is érvenyes, ha egyáltalán nem szólsz, de nem jelensz meg az időpontodon.)',
      'Köszönöm szépen, hogy tiszteletben tartod a munkámat és az időmet!',
    ],
  },
  {
    title: 'Időpont foglalás',
    paragraphs: [
      'Ha még nem jártál nálam, vagy több mint 1 éve jártál, akkor először egy állapotfelméréssel kezdünk, kérlek arra foglalj időpontot!',
      'A célom, hogy minél hatékonyabban és precízebben kezeljem a problémádat, és felderítsem a kialakulásának a valódi okát - egy alapos állapotfelmérés nélkül viszont nem lehetséges célzott kezelési tervet felállítani.',
      'Ha vannak orvosi dokumentációid, kérlek hozd el őket magaddal (ha nincs, semmi gond).',
    ],
  },
  {
    title: 'Késés',
    paragraphs: [
      'Amennyit késel az időpontodról, annyival kevesebb időt tudok rádszánni.',
      'Ha miattam kezdünk késve (pl. ha megcsúsztam az előző páciensemmel), az természetesen nem a te idődből megy, annál tovább tartom a kezelésed.',
      'Nagyon igyekszem tartani a menetrendet, hogy ez minél kisebb eséllyel történjen meg.',
    ],
  },
];

const SEO_DESCRIPTION =
  'Kirilla Réka gyógytornász-fizioterapeuta honlapjának egyéni kezeléseket bemutató oldala, ahol tájékozódhatsz a kezelések menetéről, az alkalmazott terápiákról, árakról.';

/**
 * /egyeni-kezelesek — Treatments. Hero + sticky-feel jump menu with scroll-spy, booking card,
 * first-visit StepFlow, complaints DashList, the full 13-therapy grid, prices, testimonials, FAQ
 * and policy cards. Section ids match the jump menu; the in-view section drives the active pill.
 */
@Component({
  selector: 'app-treatments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Button,
    Card,
    DashList,
    Eyebrow,
    FaqAccordion,
    JumpMenu,
    PriceItem,
    SectionHeading,
    StepFlow,
    TestimonialCarousel,
    TherapyCard,
  ],
  templateUrl: './treatments-page.html',
  styleUrl: './treatments-page.scss',
})
export class TreatmentsPage {
  private readonly doc = inject(DOCUMENT);
  private readonly content = inject(ContentService);
  private readonly scroll = inject(ScrollService);
  private readonly seo = inject(SeoService);

  readonly salonic = SALONIC_URL;
  readonly jump = JUMP;
  readonly firstVisit = FIRST_VISIT;
  readonly complaints = COMPLAINTS;
  readonly policy = POLICY;
  readonly therapies = this.content.therapies();
  readonly opinions = this.content.treatmentsOpinions();
  readonly faqs = this.content.faqs();

  readonly active = signal(JUMP[0].id);

  private observer?: IntersectionObserver;
  private readonly visible = new Set<string>();

  constructor() {
    this.seo.apply({
      title: 'Egyéni kezelések - Kirilla Réka gyógytornász-fizioterapeuta',
      description: SEO_DESCRIPTION,
      canonical: 'https://www.kirillareka.hu/egyeni-kezelesek',
      ogUrl: 'https://www.kirillareka.hu/egyeni-kezelesek',
      ogType: 'product',
    });

    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());
    afterNextRender(() => this.initScrollSpy());
  }

  /** Browser-only scroll-spy: a thin band ~45% down the viewport picks the topmost in-view section. */
  private initScrollSpy(): void {
    const win = this.doc.defaultView;
    if (!win || !('IntersectionObserver' in win)) return;
    const ids = JUMP.map((j) => j.id);
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting) this.visible.add(id);
          else this.visible.delete(id);
        }
        const first = ids.find((id) => this.visible.has(id));
        if (first) this.active.set(first);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    for (const id of ids) {
      const el = this.doc.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }

  onSelect(id: string): void {
    this.active.set(id);
    this.scroll.scrollToAnchor(id);
  }
}
