import "./therapy-list.scss";
import {isMobile} from "react-device-detect";
import {therapies, Therapy} from "./therapies";
import TherapyCard from "./TherapyCard";

type Props = {
  selectedTherapyId?: string
}

const TherapyList = (props: Props) => {
  return <div className={`therapy-list ${isMobile ? 'mobile' : ''}`}>
    {therapies.filter((therapy: Therapy) => therapy.id !== props.selectedTherapyId).map((therapy: Therapy) => <TherapyCard key={therapy.id} {...therapy} />)}
  </div>
}

export default TherapyList;