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
          } text-2xl block mt-2 hover:text-blue-300`}
          to={'/'}
        >
          Home{' '}
        </Link>
        <Link
          className={`${
            pathname.includes('/patients') ? 'text-blue-300' : 'text-white'
          } text-2xl block mt-2 hover:text-blue-300  `}
          to={'/patients'}
        >
          Pacientes
        </Link>
        {pathname.includes('/patient') && (
          <Link
            className={`${
              pathname === '/patients/create' ? 'text-sky-300' : 'text-white'
            } text-white text-xl block mt-2 ml-10 hover:text-blue-300 transition duration-1000 ease-linear `}
            to={'/patients/create'}
          >
            - Nuevo Paciente
          </Link>
        )}
        <Link
          className={`${
            pathname === '/doctors' ? 'text-blue-300' : 'text-white'
          } text-2xl block mt-2 hover:text-blue-300 `}
          to={'/doctors'}
        >
          Doctores
        </Link>
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
