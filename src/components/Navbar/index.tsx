import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Card } from '../';

// TODO: add Icon
const menuItems = [
  { label: 'Pokédex', path: 'pokedex' },
  { label: 'Items', path: 'games' },
  { label: 'News', path: 'news' },
];

const NavbarItem = ({ path, label }: { label: string; path: string }) => (
  <li className="inline">
    <NavLink className="font-bold mx-3" to={path}>
      {({ isActive }) => (
        <div
          className="inline-flex flex-col text-gray-600 font-mono uppercase"
          style={{ fontSize: '1.2rem' }}
        >
          {label}
          <div
            className={clsx(
              'h-[0.2rem] bg-red-500 transition-[width] duration-200 mt-2',
              isActive ? 'w-full' : 'w-0',
            )}
          />
        </div>
      )}
    </NavLink>
  </li>
);

const Navbar = () => {
  return (
    <nav className="sticky top-4 z-30">
      <Card className="p-4 pb-0 border !rounded-">
        <ul>
          {menuItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </ul>
      </Card>
    </nav>
  );
};

export default Navbar;
