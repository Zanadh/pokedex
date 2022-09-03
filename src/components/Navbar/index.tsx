import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Card } from '../';

const menuItems = [
  { label: 'Pokédex', path: 'pokedex' },
  { label: 'Items', path: 'games' },
  { label: 'News', path: 'news' },
];

const NavbarItem = ({ path, label }: { label: string; path: string }) => (
  <li className="inline">
    <NavLink className="font-bold mx-3" to={path}>
      {({ isActive }) => (
        <div className="inline-flex flex-col text-gray-600">
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
    <nav>
      <Card className="p-4 pb-0">
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
