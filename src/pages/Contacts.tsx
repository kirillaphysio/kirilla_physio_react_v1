import React from 'react';
import "./ContactsPage.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

const Contacts: React.FC = () => {
  return (
    <div className="contacts-page">
      <h1>Ha szükséged van a segítségemre, itt megtalálsz!</h1>

      <div className="contacts-wrapper">
        <span className="link-container"><a href={"mailto: kirillaphysio@gmail.com"}><FontAwesomeIcon icon={faEnvelope} />Ha bármi kérdésed van, írj egy emailt nekem! (kirillaphysio@gmail.com)</a></span>
        <span className="link-container"><a href={"tel: +36202668447"}><FontAwesomeIcon icon={faPhone} />Vagy csörögj rám munkaidöben (+36202668447)</a></span>
      </div>
    </div>
  );
};

export default Contacts;