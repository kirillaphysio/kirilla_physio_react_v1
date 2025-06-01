import React, {useLayoutEffect} from 'react';
import "./App.scss"
import LandingPage from './pages/LandingPage';
import Contacts from './pages/Contacts';
import Programs from './pages/Programs';
import Treatments from './pages/Treatments';
import Therapy from './pages/Therapy';
import Terms from './pages/Terms';
import DPN from './pages/DPN';
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

function App() {
  return (
    <div className="app">
      <HashRouter>
        <ScrollToTopWrapper>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/online-programs" element={<Programs />} />
            <Route path="/individual-treatments" element={<Treatments />} />
            <Route path="/therapy/:therapyId" element={<Therapy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/dpn" element={<DPN />} />

            <Route element={<div className="other-page">Ez az oldal nem található</div>} />
          </Routes>
          <BackToTopButton />
          <Footer />
        </ScrollToTopWrapper>
      </HashRouter>
    </div>
  );
}

export default App;
