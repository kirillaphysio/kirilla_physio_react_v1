import "./therapy-card.scss";

import React, {useState, useMemo} from "react";
import {isMobile} from "react-device-detect";
import {Therapy} from "./therapies";
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import { useMeasure } from "react-use";

const MAX_IMAGE_SIZE = 300;

const TherapyCard = (props: Therapy) => {
  const [ref, { width }] = useMeasure();
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const maxWidth = useMemo(() => {
    return isMobile ? width : Math.min(width, MAX_IMAGE_SIZE)
  }, [width]);

  // @ts-ignore
  return <div ref={ref} className={`therapy-card ${isMobile ? 'mobile' : ''}`}>
    <div className="title">{props.title}</div>
    <div className={`content ${isMobile ? 'mobile' : ''}`}>
      <FontAwesomeIcon className={`info-icon ${isMobile ? '' : 'hidden'}`} icon={faCircleInfo} onClick={() => setDescriptionVisible(!descriptionVisible)} />
      {width > 0 && <CloudinaryImage imageId={props.imageId} width={maxWidth} height={maxWidth}/>}
      <div className={`description ${isMobile ? 'mobile' : ''} ${descriptionVisible && "visible"}`}>{props.short}</div>
    </div>
  </div>
}

export default TherapyCard;