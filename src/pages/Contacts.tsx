import React from 'react';
import "./ContactsPage.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMapLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import {isMobile} from "react-device-detect";

const Contacts: React.FC = () => {
  return (
    <>
      <title>Kapcsolat - Kirilla Réka gyógytornász-fizioterapeuta</title>
      <link rel="canonical" href="https://www.kirillareka.hu/#/contacts"/>
      <meta name="description" content="Kirilla Réka gyógytornász-fizioterapeuta honlapjának kapcsolat oldala, ahol tájékozódhatsz Réka elérhetőségeiről.
      Gyógytornász, gyógytorna, manuálterápia, manuális terápia, derékfájás, derékfájdalom, nyakfájás, nyakfájdalom, vállfájdalom, könyökfájdalom, teniszkönyök, golfkönyök, csuklófájdalom, csípőfájdalom, térdfájás, sarkanytú, bokaficam,
      rehabilitáció, mozgásterápia, holisztikus szemléletmód, porckorongsérv, gerincsérv, becsípődés, húzódás, sérülés, baba projekt, sibo, petefészek ciszta, alternatív terápia, sibo, puffadás,
      tartásjavító torna, tartásjavítás, gerincferdülés, stresszkezelés, bolygóideg"/>

      <meta property="og:title" content="Kapcsolat - Kirilla Réka gyógytornász-fizioterapeuta"/>
      <meta property="og:description" content="Kirilla Réka gyógytornász-fizioterapeuta honlapjának honlapjának kapcsolat oldala, ahol tájékozódhatsz Réka elérhetőségeiről."/>
      <meta property="og:image" content="https://res.cloudinary.com/dcwv2corw/image/upload/v1744007836/egye%CC%81ni_kezele%CC%81s_wkmddy.jpg"/>
      <meta property="og:url" content="https://www.kirillareka.hu/#/contacts"/>
      <meta property="og:type" content="place"/>

      <div className="contacts-page">
        <h1>Ha szükséged van a segítségemre, itt megtalálsz!</h1>

        <div className="contacts-wrapper">
          <div className="link-container">
            <a href={"https://maps.app.goo.gl/MFLgSvpn8ttvUxos6"}><FontAwesomeIcon icon={faMapLocationDot}/>
              Kezelési helyszín Budapest, XII. kerület, Nagyenyed utca 15/A</a>
            {!isMobile && <iframe title="Google maps"
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.5671552762215!2d19.019068076417017!3d47.498344995446736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc2759855e45%3A0x2b036953b04e80d2!2sBudapest%2C%20Nagyenyed%20u.%2015%2Fa%2C%201123!5e0!3m2!1sen!2shu!4v1748095089521!5m2!1sen!2shu"
                                  width="100%" height="450" style={{border: 0}} allowFullScreen={true} loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"></iframe>}
          </div>
          <div className="link-container"><a href={"mailto: kirillaphysio@gmail.com"}><FontAwesomeIcon icon={faEnvelope}/>Ha
            bármi kérdésed van, írj egy emailt nekem! (kirillaphysio@gmail.com)</a></div>
          <div className="link-container"><a href={"tel: +36202668447"}><FontAwesomeIcon icon={faPhone}/>Vagy hívj fel!
            (Ha nem tudom felvenni, visszahívlak.) (+36202668447)</a></div>
        </div>
      </div>
    </>
  );
};

export default Contacts;