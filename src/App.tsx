import React, {useLayoutEffect} from 'react';
import "./App.scss"
import "./privacy.scss"

import { CookieManager } from "react-cookie-manager";
import "react-cookie-manager/style.css";

import LandingPage from './pages/LandingPage';
import Contacts from './pages/Contacts';
import Programs from './pages/Programs';
import Treatments from './pages/Treatments';
import Therapy from './pages/Therapy';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookie from './pages/Cookie';
import { HashRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import BackToTopButton from "./components/backToTopButton/BackToTopButton";

// TODO add fallback route and page

const ScrollToTopWrapper = ({children}: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

const CookieManagerWrapper = ({children}: any) => {
  const location = useLocation();

  console.log(location);

  return <CookieManager
    cookieKitId="683c788de26dc89719dacf67"
    privacyPolicyUrl="https://kirillareka.hu/privacy"
    displayType="banner"
    showManageButton={false}
    enableFloatingButton={location.pathname === "/privacy"}

    translations={{
      title: "Ez a weboldal sütiket használ",
      message:
        "Kedves látogató! Szeretném felhívni a figyelmedet, hogy a honlap a felhasználói élmény fokozásának érdekében sütiket használ. További információkért kérlek olvasd el a Adatvédelmi Nyilatkozatot.",
      buttonText: "Elfogadom",
      declineButtonText: "Elutasítom",
      privacyPolicyText: "Adatvédelmi Nyilatkozat",
    }}

    classNames={{
      acceptButton: "px-3 py-1.5 text-xs font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105 focus-visible:outline-none focus:outline-none focus-visible:outline-transparent focus:outline-transparent privacy-accept-button"
    }}
  >
    {children}
  </CookieManager>
}

function App() {
  return (
    <div className="app">
      <HashRouter>
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
