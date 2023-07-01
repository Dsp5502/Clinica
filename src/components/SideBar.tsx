import { Link, useLocation, useNavigate } from 'react-router-dom';

export const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
      <h2 className='text-4xl font-black text-center text-white'>
        {' '}
        CRM - Clinica{' '}
      </h2>
      <nav className='mt-10'>
        <Link
          className={`${
            pathname === '/' ? 'text-blue-300' : 'text-white'
          } text-2xl  mt-2 hover:text-blue-300 flex items-center gap-3`}
          to={'/'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>{' '}
          Home{' '}
        </Link>
        <Link
          className={`${
            pathname.includes('/patients') ? 'text-blue-300' : 'text-white'
          } text-2xl  mt-2 hover:text-blue-300 flex items-center gap-3`}
          to={'/patients'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
            />
          </svg>
          Pacientes
        </Link>
        {pathname.includes('/patient') && (
          <Link
            className={`${
              pathname === '/patients/create' ? 'text-sky-300' : 'text-white'
            } text-white text-xl flex items-center gap-3 mt-2 ml-10 hover:text-blue-300 transition duration-1000 ease-linear `}
            to={'/patients/create'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
              />
            </svg>
            Nuevo Paciente
          </Link>
        )}
        <Link
          className={`${
            pathname.includes('/doctors') ? 'text-blue-300' : 'text-white'
          } text-2xl flex items-center gap-3 mt-2 hover:text-blue-300 `}
          to={'/doctors'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
            />
          </svg>
          Doctores
        </Link>
        {pathname.includes('/doctors') && (
          <Link
            className={`${
              pathname === '/doctors/create' ? 'text-sky-300' : 'text-white'
            } text-white text-xl flex items-center gap-3 mt-2 ml-10 hover:text-blue-300 transition duration-1000 ease-linear `}
            to={'/doctors/create'}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
              />
            </svg>
            Nuevo Doctor
          </Link>
        )}
      </nav>

      <button
        type='button'
        onClick={logout}
        className='bg-red-600 w-full mt-36  p-2 text-white uppercase font-bold hover:bg-red-800'
      >
        Cerrar Sesion
      </button>
    </aside>
  );
};
