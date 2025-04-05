import React from 'react';
import './LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Üdvözlünk a weboldalunkon!</h1>
        <p>Fedezd fel, amit kínálunk.</p>
        <button className="cta-button">Ismerd meg most!</button>
      </section>
      <section className="hero-section">
        <h1>Üdvözlünk a weboldalunkon!</h1>
        <p>Fedezd fel, amit kínálunk.</p>
      </section>
      <section className="hero-section">
        <h1>Üdvözlünk a weboldalunkon!</h1>
        <p>Fedezd fel, amit kínálunk.</p>
      </section>
      <section className="hero-section">
        <h1>Üdvözlünk a weboldalunkon!</h1>
        <p>Fedezd fel, amit kínálunk.</p>
      </section>
    </div>
  );
};

export default LandingPage;