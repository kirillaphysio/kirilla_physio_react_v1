import React from 'react';
import './LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Üdvözlünk a weboldalunkon!</h1>
        <p>Fedezd fel, amit kínálunk.</p>
        <button className="cta-button">Ismerd meg most!</button>
      </div>
    </div>
  );
};

export default LandingPage;