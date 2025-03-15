import "./social.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTiktok, faYoutube} from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Social = () => {
  return (
    <div className={"social"}>
      <label className="social-label">Vedd fel velem a kapcsolatot a közösségi média oldalaimon!</label>
      <div className="social-wrapper">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faTiktok} />
        <FontAwesomeIcon icon={faYoutube} />
      </div>
    </div>
  );
};

export default Social;