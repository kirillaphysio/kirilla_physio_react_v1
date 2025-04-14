import React from 'react';
import {useParams} from "react-router";

const Therapy: React.FC = () => {
  let { therapyId } = useParams();

  return (
    <div className="landing-page">
      Terapia: {therapyId}
    </div>
  );
};

export default Therapy;