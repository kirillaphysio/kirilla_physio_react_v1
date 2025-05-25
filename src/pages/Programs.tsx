import React from 'react';
import pic from "../assets/under_construction.jpg";
import "./programs.scss";

const Programs: React.FC = () => {
  return (
    <div className="programs-page">
      <h2>Hamarosan érkeznek az online programok is!</h2>
      <img className="under-construction" src={pic} alt="Under construction" />
    </div>
  );
};

export default Programs;