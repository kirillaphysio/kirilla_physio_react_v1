import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {isMobile} from "react-device-detect";
import "./backToTopButton.scss";

import {useWindowScroll, useWindowSize} from 'react-use';

const BackToTopButton = () => {
  const {y} = useWindowScroll();
  const {height} = useWindowSize();

  return <div className={`back-to-top-button ${(isMobile && y > height) ? "visible" : "hidden"}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
    <FontAwesomeIcon icon={faArrowUp} />
  </div>
}

export default BackToTopButton;