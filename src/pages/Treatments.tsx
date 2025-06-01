import "../components/opinions/opinions.scss";
import "./Treatments.scss";
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import React, {RefObject, useCallback, useRef} from 'react';
import {isMobile} from 'react-device-detect';
import { nanoid } from 'nanoid'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import {getSwiperStyle} from "../components/swiper/Swiper";
import Faq from "../components/faq/Faq";

import {opinions} from "../components/opinions/opinions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import TherapyList from "../components/therapies/TherapyList";
import {therapies, Therapy} from "../components/therapies/therapies";

const Treatments: React.FC = () => {
  const bookingRef = useRef<HTMLElement>(null);
  const helpRef = useRef<HTMLElement>(null);
  const therapiesRef = useRef<HTMLElement>(null);
  const pricesRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const policyRef = useRef<HTMLElement>(null);

  const scrollToSection = useCallback((ref: RefObject<HTMLElement | null>) => {
    if (ref.current !== null) ref.current.scrollIntoView({behavior: 'smooth'});
  }, []);

  return (
    <>
      <title>Egyéni kezelések - Kirilla Réka gyógytornász-fizioterapeuta</title>
      <link rel="canonical" href="https://www.kirillareka.hu/#/individual-treatments"/>
      <meta name="description" content={`Kirilla Réka gyógytornász-fizioterapeuta honlapjának egyéni kezeléseket bemutató oldala, ahol tájékozódhatsz a kezelések menetéről, az alkalmazott terápiákról, árakról.
      Gyógytornász, gyógytorna, manuálterápia, manuális terápia, derékfájás, derékfájdalom, nyakfájás, nyakfájdalom, vállfájdalom, könyökfájdalom, teniszkönyök, golfkönyök, csuklófájdalom, csípőfájdalom, térdfájás, sarkanytú, bokaficam,
      rehabilitáció, mozgásterápia, holisztikus szemléletmód, porckorongsérv, gerincsérv, becsípődés, húzódás, sérülés, baba projekt, sibo, petefészek ciszta, alternatív terápia, sibo, puffadás,
      tartásjavító torna, tartásjavítás, gerincferdülés, stresszkezelés, bolygóideg
      ${therapies.map((therapy: Therapy) => therapy.title).join(", ")}`}/>

      <meta property="og:title" content="Egyéni kezelések - Kirilla Réka gyógytornász-fizioterapeuta"/>
      <meta property="og:description" content="Kirilla Réka gyógytornász-fizioterapeuta honlapjának egyéni kezeléseket bemutató oldala, ahol tájékozódhatsz a kezelések menetéről, az alkalmazott terápiákról, árakról."/>
      <meta property="og:image" content="https://res.cloudinary.com/dcwv2corw/image/upload/v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg"/>
      <meta property="og:url" content="https://www.kirillareka.hu/#/individual-treatments"/>
      <meta property="og:type" content="product"/>

      <div className="treatment-page">
        <h1>Egyéni kezelések</h1>

        <ul className={`local-menu ${isMobile && "mobile"}`}>
          <li onClick={() => scrollToSection(bookingRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} />Időpont foglalás</li>
          <li onClick={() => scrollToSection(helpRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Miben tudok segíteni?</li>
          <li onClick={() => scrollToSection(therapiesRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Terápiák</li>
          <li onClick={() => scrollToSection(pricesRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Árak</li>
          <li onClick={() => scrollToSection(feedbackRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Visszajelzések a pácienseimtől</li>
          <li onClick={() => scrollToSection(faqRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Gyakori kérdések</li>
          <li onClick={() => scrollToSection(policyRef)}><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Szabályzat</li>
        </ul>

        <section ref={bookingRef} className="hero-section">
          <h4>Időpont foglalás</h4>

          <p className="with-gap">Állapotfelmérésre és az ezt követő komplex egyéni kezelésre itt tudsz bejelentkezni hozzám</p>
          <a href="https://kirillareka.salonic.hu/" target="_blank" rel="noreferrer" className="cta-button">Bejelentkezés</a>
        </section>

        <section ref={helpRef} className="hero-section">
          <h4>Miben tudok segíteni?</h4>

          <p>A leggyakoribb panaszok, amikkel foglalkozom:</p>
          <ul className="help-list">
            <li>derékfájás, nyakfájás, hátfájás (porckorongsérv/becsípődés, instabilitás, csigolyaelcsúszás, izom túlfeszülés, ízületi blokk)</li>
            <li>végtagba sugárzó fájdalom, zsibbadás, és izomerő csökkenés</li>
            <li>ízületi fájdalmak és mozgástartomány beszűkülés (gerinc, váll, könyök, csukló, kéz, csípő, térd, boka, láb)</li>
            <li>helytelen testtartás</li>
            <li>belsőszervi panaszok (pl. puffadás, székrekedés, IBS, folyadékkal telt ciszták, fájdalmas menstruáció)</li>
            <li>sérülések (pl. bokaficam, húzódások)</li>
            <li>műtétek után (pl. térd, kéz, hasi műtétek)</li>
            <li>stressz, fejfájás, állkapocs ízületi panaszok</li>
          </ul>
        </section>

        <section ref={therapiesRef} className="hero-section">
          <h4>Terápiák</h4>

          <p className="justified">A hagyományos gyógytornán túl számos egyéb terápiás irányt elsajátítottam és folyamatosan bővítem a tudásom, hogy a lehető legtöbb irányból tudjam megközelíteni a problémád, ezáltal méggyorsabban, és méghatékonyabban tudjam segíteni a gyógyulásod.</p>
          <div>Alkalmazott terápiáim:</div>

          <TherapyList />
        </section>

        <section ref={pricesRef} className="hero-section">
          <h4>Árak</h4>

          <ul className="price-list">
            <li>
              <h4>Állapofelmérés 20.000 Ft (60 perc)</h4>
              <p>
                (Az ár tartalmazza: személyes konzultáció, leletelemzés, testtartás elemzés, speciális tesztek, egyénre szabott kezelési terv felállítása, kezelés megkezdése)
              </p>
            </li>
            <li>
              <h4>Kombinált kezelés 18.000 Ft (50 perc)</h4>
              <p>
                (Az ár tartalmazza: az összes általam tanult terápiás irányzatot ami szükséges az egyéni állapotra szabottan - manuális terápiák, gyógytorna, köpöly, kinezio tape felhelyezés)
              </p>
            </li>
          </ul>

          <span className="price-info">Fizetés készpénzzel vagy azonnali átutalással a kezelés végén.</span>
        </section>

        <section ref={feedbackRef} className="hero-section">
          <h4>Visszajelzések a pácienseimtől</h4>

          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            grabCursor={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination, A11y]}
            navigation
            pagination={{ dynamicBullets: true }}
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={32}
            // @ts-ignore
            style={getSwiperStyle()}
          >
            {opinions.map((opinion: any) => (<SwiperSlide key={nanoid()} className={`opinion ${isMobile ? "mobile" : "desktop"}`}>
              <p className="message">{opinion.description}</p>
              <div className="author">{opinion.author}</div>
            </SwiperSlide>))}
          </Swiper>
        </section>

        <section ref={faqRef} className="hero-section">
          <h4>Gyakori kérdések</h4>

          <Faq />

        </section>

        <section ref={policyRef} className="hero-section">
          <h4>Szabályzat</h4>

          <h5>Lemondási feltételek</h5>
          <p className="justified">Az időpontod lemondását, vagy másik napra módosítását legkésőbb az eredeti időpont előtt 24 órával tudom elfogadni. Kérlek minél hamarabb szólj, hogy legyen lehetőségem másnak átadni a helyed! (Itt tudsz szólni: e-mailben kirillaphysio@gmail.com, vagy telefonon +26202668447)</p>
          <p className="justified">24 órán belüli időpont lemondás (vagy másik napra módosítás) esetén a kezelés díját 3 napon belül szükséges megtéríteni. (Ez akkor is érvenyes, ha egyáltalán nem szólsz, de nem jelensz meg az időpontodon.)</p>
          <p className="justified">Köszönöm szépen, hogy tiszteletben tartod a munkámat és az időmet!</p>

          <h5>Időpont foglalás</h5>
          <p className="justified">Ha még nem jártál nálam, vagy több mint 1 éve jártál, akkor először egy állapotfelméréssel kezdünk, kérlek arra foglalj időpontot!</p>
          <p className="justified">A célom, hogy minél hatékonyabban és precízebben kezeljem a problémádat, és felderítsem a kialakulásának a valódi okát - egy alapos állapotfelmérés nélkül viszont nem lehetséges célzott kezelési tervet felállítani.</p>
          <p className="justified">Ha vannak orvosi dokumentációid, kérlek hozd el őket magaddal (ha nincs, semmi gond).</p>

          <h5>Késés</h5>
          <p className="justified">Amennyit késel az időpontodról, annyival kevesebb időt tudok rádszánni.</p>
          <p className="justified">Ha miattam kezdünk késve (pl. ha megcsúsztam az előző páciensemmel), az természetesen nem a te idődből megy, annál tovább tartom a kezelésed.</p>
          <p className="justified">Nagyon igyekszem tartani a menetrendet, hogy ez minél kisebb eséllyel történjen meg. </p>
        </section>
      </div>
    </>
  );
};

export default Treatments;