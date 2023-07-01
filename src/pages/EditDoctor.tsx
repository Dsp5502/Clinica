import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { EditFormDoctor } from '../components/EditFormDoctor';
import { useGetDoctorQuery } from '../store/api/doctors/doctorsApi';

export const EditDoctor = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [doctorId, setDoctorId] = useState<string | undefined>(id);

  useEffect(() => {
    setDoctorId(id);
  }, [id]);

  const { data: doctor, isFetching } = useGetDoctorQuery(doctorId ?? '');

  if (isFetching) return <Spinner data={'Paciente'} />;
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Editar Doctor</h1>
      <p>A continuación podrás moodificar loos datos de un doctor</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={(): void => navigate('/doctors')}
        >
          Volver
        </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        <EditFormDoctor doctor={doctor} />
      </div>
    </>
  );
};
