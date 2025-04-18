import React from 'react';
import "./App.scss"
import LandingPage from './pages/LandingPage';
import Contacts from './pages/Contacts';
import Programs from './pages/Programs';
import Treatments from './pages/Treatments';
import Therapy from './pages/Therapy';
import { HashRouter, Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTopButton from "./components/backToTopButton/BackToTopButton";

// TODO add fallback route and page

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/online-programs" element={<Programs />} />
          <Route path="/individual-treatments" element={<Treatments />} />
          <Route path="/therapy/:therapyId" element={<Therapy />} />

          <Route element={<div className="other-page">Ez az oldal nem található</div>} />
        </Routes>
        <BackToTopButton />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
