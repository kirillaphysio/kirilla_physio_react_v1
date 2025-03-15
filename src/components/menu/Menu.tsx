import "./menu.scss"
import React, { useEffect, useState, useRef } from 'react';
import Hamburger from 'hamburger-react'
import {isMobile} from "react-device-detect";
import {NavLink, useLocation} from "react-router";
// import {useClickAway} from "react-use";

const items= [
  { id: 1, label: 'Kezdőlap', href: '/' },
  { id: 3, label: 'Online programok', href: '/online-programs' },
  { id: 4, label: 'Egyéni kezelések', href: '/individual-treatments' },
  { id: 2, label: 'Kapcsolat', href: '/contacts' },
];

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<any>(null);
  const hamburgerRef = useRef<any>(null);
  const location = useLocation();

  console.log(location);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location])

  // TODO handle click outside
  // useClickAway(menuRef, (event) => {
  //   if(hamburgerRef.current.children[0] !== event.target) setIsOpen(false);
  // });

  return (
    <div className={`menu ${isMobile ? 'mobile' : ''}`}>
      {isMobile && <span ref={hamburgerRef} ><Hamburger rounded toggled={isOpen} toggle={setIsOpen} /></span>}

      <nav className={`menu-nav ${isMobile ? 'mobile' : ''} ${isOpen ? 'open' : ''}`}>
        <ul ref={menuRef} className={`menu-list ${isMobile ? 'mobile' : ''}`}>
          {items.map((item) => (
            <li key={item.id}>
              <NavLink to={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}