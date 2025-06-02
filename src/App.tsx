import React from 'react';
import "./App.scss"
import "./privacy.scss"

import LandingPage from './pages/LandingPage';
import Contacts from './pages/Contacts';
import Programs from './pages/Programs';
import Treatments from './pages/Treatments';
import Therapy from './pages/Therapy';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookie from './pages/Cookie';
import { HashRouter, Routes, Route } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTopButton from "./components/backToTopButton/BackToTopButton";

import {ScrollToTopWrapper} from "./components/wrappers/ScrollToWrapper";
import {CookieManagerWrapper} from "./components/wrappers/CookieManagerWrapper";
import {AnalyticsTracker} from "./components/wrappers/AnalyticsWrapper";

// TODO add fallback route and page

function App() {
  return (
    <div className="app">
      <HashRouter>
        <AnalyticsTracker />
        <CookieManagerWrapper>
          <ScrollToTopWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/online-programs" element={<Programs />} />
              <Route path="/individual-treatments" element={<Treatments />} />
              <Route path="/therapy/:therapyId" element={<Therapy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookie" element={<Cookie />} />

              <Route element={<div className="other-page">Ez az oldal nem található</div>} />
            </Routes>
            <BackToTopButton />
            <Footer />
          </ScrollToTopWrapper>
        </CookieManagerWrapper>
      </HashRouter>
    </div>
  );
}

export default App;
