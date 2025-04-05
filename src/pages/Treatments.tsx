import React, {RefObject, useCallback, useRef} from 'react';
import {isMobile} from 'react-device-detect';
import { nanoid } from 'nanoid'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import {opinions} from "../components/opinions/opinions";
import "../components/opinions/opinions.scss"

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
    <div className="landing-page">
      <title>Egyéni kezelések</title>

      <ul>
        <li onClick={() => scrollToSection(bookingRef)}>Időpont foglalás</li>
        <li onClick={() => scrollToSection(helpRef)}>Miben tudok segíteni?</li>
        <li onClick={() => scrollToSection(therapiesRef)}>Terápiák</li>
        <li onClick={() => scrollToSection(pricesRef)}>Árak</li>
        <li onClick={() => scrollToSection(feedbackRef)}>Visszajelzések a pácienseimtől</li>
        <li onClick={() => scrollToSection(faqRef)}>Gyakori kérdések</li>
        <li onClick={() => scrollToSection(policyRef)}>Szabályzat</li>
      </ul>

      <section ref={bookingRef}>
        <label>Időpont foglalás</label>

        <div>Állapotfelmérésre és az ezt követő komplex egyéni kezelésre itt tudsz bejelentkezni hozzám</div>
        <button>Bejelentkezés</button>
      </section>

      <section ref={helpRef}>
        <label>Miben tudok segíteni?</label>

        <div>A leggyakorib panaszok, amikkel foglalkozom:</div>
        <ul>
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

      <section ref={therapiesRef}>
        <label>Terápiák</label>

      </section>

      <section ref={pricesRef}>
        <label>Árak</label>

      </section>

      <section ref={feedbackRef}>
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
            "--swiper-navigation-size": "22px"
          }}
        >
          {opinions.map((opinion: any) => (<SwiperSlide key={nanoid()} className={`opinion ${isMobile ? "mobile" : "desktop"}`}>
            <p className="message">{opinion.description}</p>
            <div className="author">{opinion.author}</div>
          </SwiperSlide>))}
        </Swiper>
      </section>

      <section ref={faqRef}>
        <label>Gyakori kérdések</label>

      </section>

      <section ref={policyRef}>
        <label>Szabályzat</label>

      </section>
    </div>
  );
};

export default Treatments;