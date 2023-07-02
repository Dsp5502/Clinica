import { useNavigate } from 'react-router-dom';

import { FormMedicalAppointment } from '../components/FormMedicalAppointment';

export const NewMedicalAppointment = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Nueva Cita Medica</h1>
      <p>llena todos los campos para registrar un nueva cita</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={(): void => navigate('/medicalAppointment')}
        >
          Volver
        </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        <FormMedicalAppointment />
      </div>
    </>
  );
};
