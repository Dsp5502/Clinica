import { useNavigate } from 'react-router-dom';

import { FormPatient } from '../components/FormPatient';

export const NewPatient = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Nuevo Pacientes</h1>
      <p>llena todos los campos para registrar un nuevo cliente</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={(): void => navigate('/patients')}
        >
          Volver
        </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        <FormPatient />
      </div>
    </>
  );
};
