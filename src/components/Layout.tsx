import { Outlet } from 'react-router-dom';

import { SideBar } from './SideBar';

export const Layout = () => {
  return (
    <div className='md:flex md:min-h-screen'>
      <SideBar />
      <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
