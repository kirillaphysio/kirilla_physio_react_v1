import React, {useMemo} from 'react';
import {useParams} from "react-router";
import {therapies, Therapy} from "../components/therapies/therapies";
import "./therapy.scss"
import {useMeasure} from "react-use";
import {isMobile} from "react-device-detect";
import CloudinaryImage from "../components/CloudinaryImage/CloudinaryImage";
import TherapyList from "../components/therapies/TherapyList";

const MAX_IMAGE_SIZE = 500;

const TherapyPage: React.FC = () => {
  let { therapyId } = useParams();
  let therapy = useMemo(() => {
    return therapies.find((t: Therapy) => t.id === therapyId);
  }, [therapyId]);

  const [ref, { width }] = useMeasure();

  const maxWidth = useMemo(() => {
    return isMobile ? Math.floor(width) : Math.min(Math.floor(width), MAX_IMAGE_SIZE)
  }, [width]);

  return (
    // @ts-ignore
    <div ref={ref} className="therapy-page">
      {therapy === undefined && <div>Sajnálom, ez a terápia valamiért nem található, válaszd ki az általad keresettet a lentebbi listából!</div>}

      {therapy !== undefined && <div className={`therapy`}>
        <h1>{therapy?.title}</h1>
        <h4>{therapy.short}</h4>
        {width > 0 && <CloudinaryImage imageId={therapy.imageId} width={maxWidth} height={maxWidth}/>}
        <p>{therapy.long}</p>
      </div>}

      <TherapyList selectedTherapyId={therapy?.id} />
    </div>
  );
};

export default TherapyPage;