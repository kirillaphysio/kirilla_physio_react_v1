import React from 'react';
import pic from "../assets/under_construction.jpg";
import "./programs.scss";

const Programs: React.FC = () => {
  return (
    <>
      <title>Online programok - Kirilla Réka gyógytornász-fizioterapeuta</title>
      <link rel="canonical" href="https://www.kirillareka.hu/#/online-programs"/>
      <meta name="description" content="Kirilla Réka gyógytornász-fizioterapeuta otthonrol végezhető, online programjai.
      Gyógytornász, gyógytorna, manuálterápia, manuális terápia, derékfájás, derékfájdalom, nyakfájás, nyakfájdalom, vállfájdalom, könyökfájdalom, teniszkönyök, golfkönyök, csuklófájdalom, csípőfájdalom, térdfájás, sarkanytú, bokaficam,
      rehabilitáció, mozgásterápia, holisztikus szemléletmód, porckorongsérv, gerincsérv, becsípődés, húzódás, sérülés, baba projekt, sibo, petefészek ciszta, alternatív terápia, sibo, puffadás,
      tartásjavító torna, tartásjavítás, gerincferdülés, stresszkezelés, bolygóideg"/>

      <meta property="og:title" content="Online programok - Kirilla Réka gyógytornász-fizioterapeuta"/>
      <meta property="og:description" content="Kirilla Réka gyógytornász-fizioterapeuta otthonrol végezhető, online programjai."/>
      <meta property="og:image" content="https://res.cloudinary.com/dcwv2corw/image/upload/v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg"/>
      <meta property="og:url" content="https://www.kirillareka.hu/#/online-programs"/>
      <meta property="og:type" content="product"/>

      <div className="programs-page">
        <h2>Hamarosan érkeznek az online programok is!</h2>
        <img className="under-construction" src={pic} alt="Under construction" />
      </div>
    </>
  );
};

export default Programs;