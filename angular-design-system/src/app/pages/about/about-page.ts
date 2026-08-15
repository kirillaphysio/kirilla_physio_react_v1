import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Card,
  CloudinaryImage,
  GradientText,
  Icon,
  QualificationList,
  SectionHeading,
} from '../../ui';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';

const ABOUT = [
  'A mozgás és az egészségtudatosság már kislány koromtól kezdve központi eleme volt az életemnek. Sok sportágban kipróbáltam magam, kezdve az akrobatikával, az aerobikkal, a zumbával, majd később a futás, TRX és funkcionális edzés irányába mentem el, valamint egy ideig az erőemelésben is kipróbáltam magam. Jelenleg pedig a testépítés, és a tánc, amit rendszeresen végzek.',
  'A mozgás szeretete, és a vágy, hogy segítsek más embereken egyértelművé tette számomra, hogy gyógytornász szeretnék lenni. A 4 éves gyógytornász-fizioterapeuta képzést a Pécsi Tudományegyetemen végeztem el.',
  'Diplomám megszerzése után egy gerincambulancián kezdtem el dolgozni, ahol egyéni gyógytornával kezeltem gerinc eredetű panasszal rendelkező pácienseket, és hamar elkezdtem tanfolyamokra járni, hogy a gyógytornán túl egyéb eszközökkel is tudjam segíteni a pácienseim gyógyulását. Emellett dolgoztam egy mozgásközpontban, ahol csoportos gerinctornákat tartottam. Egy másik jógaközpontban pedig anatómiát oktattam leendő jógaoktatók számára.',
  'A kellő mennyiségű szakmai tapasztalat, és 25+ elvégzett tanfolyam után 2023-ban elindítottam a saját vállalkozásomat, mely során egyre több kiegészítő terápiás eszközt (manuálterápia, köpöly, visceralis terápia stb.) alkalmaztam, és a mai napig is folyamatosan bővítem a terápiás eszköztáramat.',
  'A mozgás mellett elengedhetetlennek tartom, hogy odafigyeljünk az étkezésünkre, és a mentális egészségünkkel is aktívan foglalkozzunk.',
  'A kompetenciahatáraimat betartva ebben is segítem a pácienseimet, illetve igyekszem jó példát mutatni a saját életstílusommal: tisztán étkezem, rendszeresen meditálok, és sok önfejlesztő tartalmat fogyasztok.',
];

const TRIAD = [
  { icon: 'person-walking', label: 'Mozgás', x: '16%', y: '20%' },
  { icon: 'apple-whole', label: 'Étkezés', x: '84%', y: '20%' },
  { icon: 'brain', label: 'Mentálhigiéné', x: '50%', y: '84%' },
];

const SEO_DESCRIPTION =
  'Ismerd meg Kirilla Réka gyógytornász-fizioterapeuta szakmai útját: honnan indult, milyen szemlélettel dolgozik, és milyen végzettségek állnak a munkája mögött.';

/**
 * /rolam — About. Hero (heading + portrait), then a two-column block with a sticky bio aside
 * (PTE card, "25+ tanfolyam" gradient stat, a small Mozgás/Étkezés/Mentálhigiéné triad diagram)
 * beside the long ABOUT copy, and the "Végzettségeim" QualificationList.
 */
@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    CloudinaryImage,
    GradientText,
    Icon,
    QualificationList,
    SectionHeading,
  ],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly about = ABOUT;
  readonly triad = TRIAD;
  readonly qualifications = this.content.qualifications();
  /** Stable reference for CloudinaryImage's ratio input. */
  readonly squareRatio: [number, number] = [1, 1];

  constructor() {
    this.seo.apply({
      title: 'Rólam - Kirilla Réka gyógytornász-fizioterapeuta',
      description: SEO_DESCRIPTION,
      canonical: 'https://www.kirillareka.hu/rolam',
      ogUrl: 'https://www.kirillareka.hu/rolam',
    });
  }
}
