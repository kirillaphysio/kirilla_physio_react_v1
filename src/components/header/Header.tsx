import {Menu, MenuItem} from "../Menu";
import "./header.scss"

const menuItems: MenuItem[] = [
  { id: 1, label: 'Kezdőlap', href: '/' },
  { id: 3, label: 'Online programok', href: '/online-programs' },
  { id: 4, label: 'Egyéni kezelések', href: '/individual-treatments' },
  { id: 2, label: 'Kapcsolat', href: '/contacts' },
];

const Header = () => {
  return (
    <header className="app-header">
      <Menu items={menuItems} />
    </header>
  );
};

export default Header;