import React from 'react';
import LandingPage from './components/LandingPage';
import Contacts from './components/Contacts';
import Programs from './components/Programs';
import Treatments from './components/Treatments';
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/online-programs" element={<Programs />} />
          <Route path="/individual-treatments" element={<Treatments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
