import "./therapy-card.scss";

import React, {useCallback, useState, useMemo} from "react";
import {isMobile} from "react-device-detect";
import {Therapy} from "./therapies";
import CloudinaryImage from "../CloudinaryImage/CloudinaryImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import { useMeasure } from "react-use";
import {Link} from "react-router";

const MAX_IMAGE_SIZE = 300;

const TherapyCard = (props: Therapy) => {
  const [ref, { width }] = useMeasure();
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  const maxWidth = useMemo(() => {
    return isMobile ? Math.floor(width) : Math.min(Math.floor(width), MAX_IMAGE_SIZE)
  }, [width]);

  const onCardClick = useCallback(() => {
    if(isMobile) setDescriptionVisible(!descriptionVisible)
  }, [descriptionVisible, isMobile])

  const onMoreClick = useCallback((e: Event) => {
    e.stopPropagation();
  }, [])

  // @ts-ignore
  return <div ref={ref} className={`therapy-card ${isMobile ? 'mobile' : ''}`} onClick={onCardClick}>
    <div className="title">{props.title}</div>
    <div className={`content ${isMobile ? 'mobile' : ''}`}>
      <FontAwesomeIcon className={`info-icon ${isMobile ? '' : 'hidden'}`} icon={faCircleInfo} />
      {width > 0 && <CloudinaryImage imageId={props.imageId} width={maxWidth} height={maxWidth}/>}
      <div className={`description ${isMobile ? 'mobile' : ''} ${descriptionVisible && "visible"}`}>
        <label>{props.short}</label>
        <Link to={`/therapy/${props.id}`} className="more-btn">Részletek</Link>
        {/*<div className="more-btn">Részletek</div>*/}
      </div>
    </div>
  </div>
}

export default TherapyCard;