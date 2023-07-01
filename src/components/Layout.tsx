import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAppDispatch } from '../hooks/hooks';

import { useGetAllSpecialitiesQuery } from '../store/api/specialities/specialitiesApi';

import { setSpecialities } from '../store/slices/specilities/specialitiesSlice';

import { SideBar } from './SideBar';

export const Layout = () => {
  const { data: specialities } = useGetAllSpecialitiesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (specialities) dispatch(setSpecialities(specialities.patients));
  }, [specialities, dispatch]);

  return (
    <div className='md:flex md:min-h-screen'>
      <SideBar />
      <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </main>
    </div>
  );
};
