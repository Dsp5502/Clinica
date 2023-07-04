import { useState } from 'react';

import { useGetAllDoctorsQuery } from '../store/api/doctors/doctorsApi';

import { Doctor } from '../components/Doctor';
import { Spinner } from '../components/Spinner';

import { Doctor as DoctorType } from '../types/doctors.types';
import { alertToast } from '../helpers/AlertsToast';

export const Doctors = () => {
  const [searchText, setSearchText] = useState('');

  const [limit, setLimit] = useState<number>(5);
  const { data, isFetching, isLoading, error, isError } = useGetAllDoctorsQuery(
    {
      limit: limit,
      skip: 0,
      searchTerm: searchText,
    }
  );

  if (isLoading) return <Spinner data={'Doctores'} />;

  if (isError && error) {
    alertToast(error, 'error');
    return <p className='text-center mt-10'> No se pudo cargar los doctores</p>;
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Doctores</h1>
      <p>Administra tus Doctores</p>

      <div className='flex justify-between items-center mt-5 '>
        <div className='flex items-center w-full '>
          <input
            type='text'
            className='rounded-md border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 w-2/4 '
            placeholder='Buscar'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      {data?.doctors.length ? (
        <>
          <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className='bg-blue-800 text-white '>
              <tr>
                <th className='p-2 text-center'>Doctor</th>
                <th className='p-2  text-start'>Contacto</th>
                <th className='p-2  text-start'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.doctors.map((doctor: DoctorType) => (
                <Doctor key={doctor._id} doctor={doctor} />
              ))}
            </tbody>
          </table>
          {data?.total > limit && !isFetching && (
            <button
              className='bg-blue-800 w-full p-2 mt-5 text-white uppercase font-bold hover:bg-blue-700'
              onClick={() => {
                setLimit(limit + 5);
              }}
            >
              Cargar más...
            </button>
          )}
          {isFetching && <Spinner data={'Doctores'} />}
        </>
      ) : (
        <p className='text-center mt-10'> No Hay Pacientes aún</p>
      )}
    </>
  );
};
