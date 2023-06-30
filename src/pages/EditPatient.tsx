import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useGetPatientQuery } from '../store/api/patients/patientsApi';

import { EditFormPatient } from '../components/EditFormPatient';
import { Spinner } from '../components/Spinner';

export const EditPatient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState<string | undefined>(id);

  useEffect(() => {
    setPatientId(id);
  }, [id]);

  const { data: patient, isFetching } = useGetPatientQuery(patientId ?? '');

  if (isFetching) return <Spinner data={'Paciente'} />;

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Editar Paciente</h1>
      <p>A continuación podrás moodificar loos datos de un paciente</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={(): void => navigate('/patients')}
        >
          Volver
        </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        <EditFormPatient patient={patient} />
      </div>
    </>
  );
};
