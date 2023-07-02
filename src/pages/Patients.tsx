import { useState } from 'react';

import { useGetAllPatientsQuery } from '../store/api/patients/patientsApi';

import { Patient } from '../components/Patient';
import { Spinner } from '../components/Spinner';

import { Patient as PatientType } from '../types/patient.types';

import { alertToast } from '../helpers/AlertsToast';

export const Patients = () => {
  const [limit, setLimit] = useState<number>(5);

  const { data, isLoading, isFetching, error, isError } =
    useGetAllPatientsQuery({
      limit: limit,
      skip: 0,
    });

  if (isLoading) return <Spinner data={'Pacientes'} />;

  if (isError && error) {
    alertToast(error, 'error');
    return (
      <p className='text-center mt-10'> No se pudo cargar los pacientes</p>
    );
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Pacientes</h1>
      <p>Administra tus Clientes</p>

      {data?.patients.length ? (
        <>
          <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className='bg-blue-800 text-white '>
              <tr>
                <th className='p-2 '>Paciente</th>
                <th className='p-2 text-start'>Contacto</th>
                <th className='p-2 text-start'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.patients.map((patient: PatientType) => (
                <Patient key={patient._id} patient={patient} />
              ))}
            </tbody>
          </table>
          {data.total > limit && !isFetching && (
            <button
              className='bg-blue-800 w-full p-2 mt-5 text-white uppercase font-bold hover:bg-blue-700'
              onClick={() => {
                setLimit(limit + 5);
              }}
            >
              Cargar más...
            </button>
          )}
          {isFetching && <Spinner data={'Pacientes'} />}
        </>
      ) : (
        <p className='text-center mt-10'> No Hay Pacientes aún</p>
      )}
    </>
  );
};
