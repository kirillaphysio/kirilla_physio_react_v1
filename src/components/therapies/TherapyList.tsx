import "./therapy-list.scss";
import {isMobile} from "react-device-detect";
import {therapies, Therapy} from "./therapies";
import TherapyCard from "./TherapyCard";
import {nanoid} from "nanoid";

const TherapyList = () => {
  return <div className={`therapy-list ${isMobile ? 'mobile' : ''}`}>
    {therapies.map((therapy: Therapy) => <TherapyCard key={nanoid()} {...therapy} />)}
  </div>
}

export default TherapyList;