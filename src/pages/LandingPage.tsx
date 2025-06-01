import React from 'react';
import './LandingPage.scss';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import CloudinaryImage from "../components/CloudinaryImage/CloudinaryImage";
import {faCheck, faHouse, faHouseMedicalFlag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {isMobile} from "react-device-detect";
import {opinions} from "../components/opinions/aboutMe";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import {getSwiperStyle} from "../components/swiper/Swiper";
import {nanoid} from "nanoid";
import {NavLink} from "react-router";
import {qualifications, Qualifications} from "./qualifications";

const LandingPage: React.FC = () => {
  return (
    <>
      <title>Kirilla Réka gyógytornász-fizioterapeuta</title>
      <link rel="canonical" href="https://www.kirillareka.hu"/>
      <meta name="description" content="Kirilla Réka gyógytornász-fizioterapeuta honlapjának kezdőoldala, ahol többek közt tájékozódhatsz Réka szakmai múltjáról, végzettségeiről és betekintést kaphatsz a honlap további tartalmába.
      Gyógytornász, gyógytorna, manuálterápia, manuális terápia, derékfájás, derékfájdalom, nyakfájás, nyakfájdalom, vállfájdalom, könyökfájdalom, teniszkönyök, golfkönyök, csuklófájdalom, csípőfájdalom, térdfájás, sarkanytú, bokaficam,
      rehabilitáció, mozgásterápia, holisztikus szemléletmód, porckorongsérv, gerincsérv, becsípődés, húzódás, sérülés, baba projekt, sibo, petefészek ciszta, alternatív terápia, sibo, puffadás,
      tartásjavító torna, tartásjavítás, gerincferdülés, stresszkezelés, bolygóideg"/>

      <meta property="og:title" content="Kirilla Réka gyógytornász-fizioterapeuta"/>
      <meta property="og:description" content="Kirilla Réka gyógytornász-fizioterapeuta honlapjának kezdőoldala, ahol többek közt tájékozódhatsz Réka szakmai múltjáról, végzettségeiről és betekintést kaphatsz a honlap további tartalmába."/>
      <meta property="og:image" content="https://res.cloudinary.com/dcwv2corw/image/upload/v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg"/>
      <meta property="og:url" content="https://www.kirillareka.hu"/>
      <meta property="og:type" content="website"/>

      <div className="landing-page">
        <section className="hero-section">
          <h1>Üdvözöllek a weboldalamon!</h1>
          <p>Kirilla Réka vagyok, elhivatott gyógytornász-fizioterapeuta.</p>
          <CloudinaryImage imageId="kezdőlap__u1ybav" width={300} height={450} className="profile-image"/>
          <p>Küldetésem, hogy segítsek neked megszabadulni a fájdalmaktól, helyreállítani a mozgásképességed, és
            visszanyerni életminőséged.<br/> Módszereim között a gyógytorna, manuálterápia, valamint egyéb kiegészítő
            kezelések állnak, melyek egyaránt támogatják a fájdalomcsillapítást, a regenerálódást és a prevenciót. </p>
          <h3>Miért válassz engem?</h3>
          <ul className={`whyme ${isMobile ? "mobile" : ""}`}>
            <li><FontAwesomeIcon icon={faCheck}/><span>Szakértői tapasztalat és folyamatosan frissített tudás</span>
            </li>
            <li><FontAwesomeIcon
              icon={faCheck}/><span>Személyre szabott, hatékony kezelések holisztikus szemléletmóddal</span></li>
            <li><FontAwesomeIcon icon={faCheck}/><span>Empatikus és figyelmes megközelítés</span></li>
          </ul>
        </section>
        <section className="hero-section">
          <h1>Hogyan tudok segíteni? </h1>
          <div className={`cards ${isMobile ? "mobile" : ""}`}>
            <NavLink className={`card ${isMobile ? "mobile" : ""}`} to={'/individual-treatments'}>
              <FontAwesomeIcon icon={faHouseMedicalFlag}/>
              <h3>Egyéni kezelés</h3>
              <div className="card-content">Személyes állapotfelmérés alapján kialakított komplex terápia Budapesten
              </div>
              <span className="link">Tovább az egyéni kezelésekhez</span>
            </NavLink>
            <NavLink className="card" to={'/online-programs'}>
              <FontAwesomeIcon icon={faHouse}/>
              <h3>Online programok</h3>
              <div>Az otthonodból is könnyedén elvégezhető, szakszerűen felépített programok</div>
              <span className="link">Tovább az online programokhoz</span>
            </NavLink>
          </div>
        </section>
        <section className="hero-section">
          <h1>Rólam:</h1>
          <p className="justified">A mozgás és az egészségtudatosság már kislány koromtól kezdve központi eleme volt az
            életemnek. Sok sportágban kipróbáltam magam, kezdve az akrobatikával, az aerobikkal, a zumbával, majd később
            a futás, TRX és funkcionális edzés irányába mentem el, valamint egy ideig az erőemelésben is kipróbáltam
            magam. Jelenleg pedig a testépítés, és a tánc, amit rendszeresen végzek.</p>
          <p className="justified">A mozgás szeretete, és a vágy, hogy segítsek más embereken egyértelművé tette
            számomra, hogy gyógytornász szeretnék lenni. A 4 éves gyógytornász-fizioterapeuta képzést a Pécsi
            Tudományegyetemen végeztem el.</p>
          <p className="justified">Diplomám megszerzése után egy gerincambulancián kezdtem el dolgozni, ahol egyéni
            gyógytornával kezeltem gerinc eredetű panasszal rendelkező pácienseket, és hamar elkezdtem tanfolyamokra
            járni, hogy a gyógytornán túl egyéb eszközökkel is tudjam segíteni a pácienseim gyógyulását. Emellett
            dolgoztam egy mozgásközpontban, ahol csoportos gerinctornákat tartottam. Egy másik jógaközpontban pedig
            anatómiát oktattam leendő jógaoktatók számára. </p>
          <p className="justified">A kellő mennyiségű szakmai tapasztalat, és 25+ elvégzett tanfolyam után 2023-ban
            elindítottam a saját vállalkozásomat, mely során egyre több kiegészítő terápiás eszközt (manuálterápia,
            köpöly, visceralis terápia stb.) alkalmaztam, és a mai napig is folyamatosan bővítem a terápiás
            eszköztáramat. </p>
          <p className="justified">A mozgás mellett elengedhetetlennek tartom, hogy odafigyeljünk az étkezésünkre, és a
            mentális egészségünkkel is aktívan foglalkozzunk. </p>
          <p className="justified">A kompetenciahatáraimat betartva ebben is segítem a pácienseimet, illetve igyekszem
            jó példát mutatni a saját életstílusommal: tisztán étkezem, rendszeresen meditálok, és sok önfejlesztő
            tartalmat fogyasztok.</p>
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
            pagination={{dynamicBullets: true}}
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={32}
            // @ts-ignore
            style={getSwiperStyle()}
          >
            {opinions.map((opinion: any) => (
              <SwiperSlide key={nanoid()} className={`opinion ${isMobile ? "mobile" : "desktop"}`}>
                <p className="message">{opinion.description}</p>
                <div className="author">{opinion.author}</div>
              </SwiperSlide>))}
          </Swiper>
        </section>
        <section className="hero-section">
          <h1>Végzettségeim</h1>
          <ul className={`qualifications ${isMobile ? "mobile" : ""}`}>
            {qualifications.map((qualification: Qualifications) => (<li key={nanoid()}>
              <span>{qualification.date}: {qualification.description}</span>
            </li>))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default LandingPage;