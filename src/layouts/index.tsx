import clsx from 'clsx';
import { Outlet, useParams } from 'react-router-dom';
import { Card, Navbar } from '../components';
import Pokedex from '../pages/pokedex';

export function NavbarLayout() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl m-auto p-4">
      <Navbar />
      <div className="flex-1 flex pt-4">
        <Outlet />
      </div>
    </div>
  );
}

export function PokedexLayout() {
  const { id } = useParams();

  return (
    <div className="flex max-w-7xl flex-1">
      <div className={clsx('flex flex-1 w-0 lg:w-full transition-[width] duration-200 ease')}>
        <div className={clsx('w-full min-w-[50vw] lg:min-w-max', !!id && 'lg:pr-4')}>
          <Pokedex />
        </div>
      </div>
      <Card
        className={clsx(
          'bg-white rounded-2xl overflow-hidden transition-[width] duration-200 ease lg:max-w-lg float-right',
          !id ? 'w-0' : 'lg:w-[40%] w-full',
        )}
      >
        <Outlet />
      </Card>
    </div>
  );
}
