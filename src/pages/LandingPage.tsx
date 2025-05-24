import React from 'react';
import './LandingPage.scss';
import CloudinaryImage from "../components/CloudinaryImage/CloudinaryImage";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1>Üdvözlünk a weboldalunkon!</h1>
        <CloudinaryImage imageId="kezdőlap__u1ybav" />
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