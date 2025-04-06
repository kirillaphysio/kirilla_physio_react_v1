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
import Faq from "../components/faq/Faq";

import {opinions} from "../components/opinions/opinions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

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
        <label>Időpont foglalás</label>

        <p>Állapotfelmérésre és az ezt követő komplex egyéni kezelésre itt tudsz bejelentkezni hozzám</p>
        <button className="cta-button">Bejelentkezés</button>
      </section>

      <section ref={helpRef} className="hero-section">
        <label>Miben tudok segíteni?</label>

        <p>A leggyakorib panaszok, amikkel foglalkozom:</p>
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
        <label>Terápiák</label>

      </section>

      <section ref={pricesRef} className="hero-section">
        <label>Árak</label>

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
        <label>Visszajelzések a pácienseimtől</label>

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
          style={{
            "--swiper-navigation-size": "22px",
            "--swiper-navigation-color": "#F8EFF1",
            "--swiper-pagination-color": "#F8EFF1",
            "--swiper-pagination-bullet-inactive-color": "#F8EFF1"
          }}
        >
          {opinions.map((opinion: any) => (<SwiperSlide key={nanoid()} className={`opinion ${isMobile ? "mobile" : "desktop"}`}>
            <p className="message">{opinion.description}</p>
            <div className="author">{opinion.author}</div>
          </SwiperSlide>))}
        </Swiper>
      </section>

      <section ref={faqRef} className="hero-section">
        <label>Gyakori kérdések</label>

        <Faq />

      </section>

      <section ref={policyRef} className="hero-section">
        <label>Szabályzat</label>

        <h5>Késés</h5>
        <p>Amennyit késel az időpontodról, annyival kevesebb időt tudok rádszánni.
          Ha miattam kezdünk késve (pl. ha megcsúsztam az előző páciensemmel), az természetesen nem a te idődből megy, annál tovább tartom a kezelésed.
          Nagyon igyekszem tartani a menetrendet, hogy ez minél kisebb eséllyel történjen meg.</p>

        <h5>Lemondási feltételek</h5>
        <p>Az időpontod lemondását, vagy másik napra módosítását legkésőbb az eredeti időpont előtt 24 órával tudom elfogadni. Kérlek minél hamarabb szólj, hogy legyen lehetőségem másnak átadni a helyed! (Itt tudsz szólni: e-mailben kirillaphysio@gmail.com, vagy telefonon: +26202668447)
          24 órán belüli időpont lemondás (vagy másik napra módosítás) esetén a kezelés díját 3 napon belül szükséges megtéríteni. (Ez akkor is érvenyes, ha egyáltalán nem szólsz, de nem jelensz meg az időpontodon.)</p>

        <h5>Köszönöm szépen, hogy tiszteletben tartod a munkámat és az időmet!</h5>
      </section>
    </div>
  );
};

export default Treatments;