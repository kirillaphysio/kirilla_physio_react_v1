import React from 'react';
import "./App.scss"
import LandingPage from './components/LandingPage';
import Contacts from './components/Contacts';
import Programs from './components/Programs';
import Treatments from './components/Treatments';
import { BrowserRouter, Routes, Route } from "react-router";
import {Menu, MenuItem} from "./components/Menu";

const menuItems: MenuItem[] = [
  { id: 1, label: 'Kezdőlap', href: '/' },
  { id: 3, label: 'Online programok', href: '/online-programs' },
  { id: 4, label: 'Egyéni kezelések', href: '/individual-treatments' },
  { id: 2, label: 'Kapcsolat', href: '/contacts' },
];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu items={menuItems} />
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
