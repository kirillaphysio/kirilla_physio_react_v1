import React from 'react';
import "./ContactsPage.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMapLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import {isMobile} from "react-device-detect";

const Contacts: React.FC = () => {
  return (
    <div className="contacts-page">
      <h1>Ha szükséged van a segítségemre, itt megtalálsz!</h1>

      <div className="contacts-wrapper">
        <div className="link-container">
          <a href={"https://maps.app.goo.gl/xPYxjWL8BTMPRfZb9"}><FontAwesomeIcon icon={faMapLocationDot}/>
            A kezelés helyszíne: For Your Move and Health Centrum (Budapest, I. kerület, Ostrom utca 31.)</a>
          {!isMobile && <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.6281264758042!2d19.026790260569324!3d47.50712550111642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741df1260bb4987%3A0x989f504579199ed!2sFor%20Your%20Move%20and%20Health%20Centrum!5e0!3m2!1sen!2shu!4v1742048603716!5m2!1sen!2shu"
            width="100%" height="450" style={{border: 0}} allowFullScreen={true} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>}
        </div>
        <div className="link-container"><a href={"mailto: kirillaphysio@gmail.com"}><FontAwesomeIcon icon={faEnvelope}/>Ha
          bármi kérdésed van, írj egy emailt nekem! (kirillaphysio@gmail.com)</a></div>
        <div className="link-container"><a href={"tel: +36202668447"}><FontAwesomeIcon icon={faPhone}/>Vagy csörögj rám
          munkaidöben (+36202668447)</a></div>
      </div>
    </div>
  );
};

export default Contacts;