import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import {MenuIcon} from "./MenuIcon";

export interface MenuItem {
  id: number;
  label: string;
  href: string;
}

interface MenuProps {
  items: MenuItem[];
}

export function Menu({ items }: MenuProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav ref={menuRef}>
      {isMobile ? (
        <>
          <button
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: '10px',
            }}
          >
            <MenuIcon />
          </button>
          {isMenuOpen && (
            <ul
              style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                width: '100%',
                background: 'white',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
              }}
            >
              {items.map((item) => (
                <li key={item.id} style={{ padding: '10px 20px' }}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            padding: 0,
            margin: 0,
          }}
        >
          {items.map((item) => (
            <li key={item.id} style={{ padding: '10px 20px' }}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}