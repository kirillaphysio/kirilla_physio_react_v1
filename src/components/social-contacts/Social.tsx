import "./social.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTiktok, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {isMobile} from 'react-device-detect';

const Social = () => {
  return (
    <div className={"social"}>
      {!isMobile && <label className="social-label">Vedd fel velem a kapcsolatot a közösségi média oldalaimon!</label>}
      <div className="social-wrapper">
        <a className="social-link" href="https://www.facebook.com/kirillaphysio/" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
        <a className="social-link" href="https://www.instagram.com/kirilla_physio/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
        <a className="social-link" href="https://www.tiktok.com/@kirilla_physio" target="_blank"><FontAwesomeIcon icon={faTiktok} /></a>
        <a className="social-link" href="https://www.youtube.com/channel/UCN9ZM4g1KHw_8GTmYq9cG2g" target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
      </div>
    </div>
  );
};

export default Social;