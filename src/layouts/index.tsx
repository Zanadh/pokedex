import { useAutoAnimate } from '@formkit/auto-animate/react';
import clsx from 'clsx';
import { Outlet, useParams } from 'react-router-dom';
import { Navbar } from '../components';
import Pokedex from '../pages/pokedex';

export function NavbarLayout() {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 100 });
  return (
    <div className="flex flex-col max-w-7xl m-auto p-4 min-h-screen">
      <Navbar />
      <div className="flex-1 flex pt-5" ref={parent}>
        <Outlet />
      </div>
    </div>
  );
}

export function PokedexLayout() {
  const { id } = useParams();

  // TODO: prevent scroll when pokemon detail shown in fullscreen

  return (
    <div className="flex max-w-7xl flex-1">
      <div className={clsx('flex flex-1 w-0 lg:w-full transition-all overflow-hidden')}>
        <div className={clsx('w-full min-w-content lg:!min-w-full', !!id && 'lg:pr-4 ')}>
          <Pokedex />
        </div>
      </div>
      <div
        className={clsx(
          'sticky max-h-content  top-[94px] rounded-2xl transition-all lg:max-w-lg',
          !id ? 'w-0' : 'lg:w-[40%] w-full',
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
