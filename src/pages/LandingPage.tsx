import React from 'react';
import './LandingPage.scss';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import CloudinaryImage from "../components/CloudinaryImage/CloudinaryImage";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {isMobile} from "react-device-detect";
import {opinions} from "../components/opinions/aboutMe";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import {nanoid} from "nanoid";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Üdvözöllek a weboldalamon! </h1>
        <p>Kirilla Réka vagyok, elhivatott gyógytornász-fizioterapeuta.</p>
        <CloudinaryImage imageId="kezdőlap__u1ybav" />
        <p>Küldetésem, hogy segítsek neked megszabadulni a fájdalmaktól, helyreállítani a mozgásképességed, és visszanyerni életminőséged. Módszereim között a gyógytorna, manuálterápia, valamint egyéb kiegészítő kezelések állnak, melyek egyaránt támogatják a fájdalomcsillapítást, a regenerálódást és a prevenciót. </p>
        <h3>Miért válassz engem?</h3>
        <ul>
          <li><FontAwesomeIcon icon={faCheck} />Szakértői tapasztalat és folyamatosan frissített tudás</li>
          <li><FontAwesomeIcon icon={faCheck} />Személyre szabott, hatékony kezelések holisztikus szemléletmóddal</li>
          <li><FontAwesomeIcon icon={faCheck} />Empatikus és figyelmes megközelítés</li>
        </ul>
      </section>
      <section className="hero-section">
        <h1>Hogyan tudok segíteni? </h1>
        <button className="cta-button">Online programok</button>{/* TODO kartya gomb + description*/}
        <button className="cta-button">Egyéni kezelés</button>
      </section>
      <section className="hero-section">
        <h1>Rólam:</h1>
        <p>A mozgás és az egészségtudatosság már kislány koromtól kezdve központi eleme volt az életemnek. Sok sportágban kipróbáltam magam, kezdve az akrobatikával, az aerobikkal, a zumbával, majd később a futás, TRX és funkcionális edzés irányába mentem el, valamint egy ideig az erőemelésben is kipróbáltam magam. Jelenleg pedig a testépítés, és a tánc, amit rendszeresen végzek.</p>
        <p>A mozgás szeretete, és a vágy, hogy segítsek más embereken egyértelművé tette számomra, hogy gyógytornász szeretnék lenni. A 4 éves gyógytornász-fizioterapeuta képzést a Pécsi Tudományegyetemen végeztem el.</p>
        <p>Diplomám megszerzése után egy gerincambulancián kezdtem el dolgozni, ahol egyéni gyógytornával kezeltem gerinc eredetű panasszal rendelkező pácienseket, és hamar elkezdtem tanfolyamokra járni, hogy a gyógytornán túl egyéb eszközökkel is tudjam segíteni a pácienseim gyógyulását. Emellett dolgoztam egy mozgásközpontban, ahol csoportos gerinctornákat tartottam. Egy másik jógaközpontban pedig anatómiát oktattam leendő jógaoktatók számára. </p>
        <p>A kellő mennyiségű szakmai tapasztalat, és 25+ elvégzett tanfolyam után 2023-ban elindítottam a saját vállalkozásomat, mely során egyre több kiegészítő terápiás eszközt (manuálterápia, köpöly, visceralis terápia stb.) alkalmaztam, és a mai napig is folyamatosan bővítem a terápiás eszköztáramat. </p>
        <p>A mozgás mellett elengedhetetlennek tartom, hogy odafigyeljünk az étkezésünkre, és a mentális egészségünkkel is aktívan foglalkozzunk. </p>
        <p>A kompetenciahatáraimat betartva ebben is segítem a pácienseimet, illetve igyekszem jó példát mutatni a saját életstílusommal: tisztán étkezem, rendszeresen meditálok, és sok önfejlesztő tartalmat fogyasztok.</p>
      </section>
      <section className="hero-section">
        <h1>Rólam mondták</h1>

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
      <section className="hero-section">
        <h1>Általam elvégzett képzések</h1>
      </section>
    </div>
  );
};

export default LandingPage;