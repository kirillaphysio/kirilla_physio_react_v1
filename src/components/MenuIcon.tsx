import React, {useCallback} from 'react';
import './MenuIcon.scss';

export const MenuIcon: React.FC = () => {
  const toggleMenu = useCallback(() => {
    // @ts-ignore
    document.querySelector('.menu-toggle').classList.toggle('toggle-active');
  }, [])

  return (
    <div className="menu-toggle" onClick={toggleMenu}>
      <div className="hamburger"></div>
    </div>
  );
};