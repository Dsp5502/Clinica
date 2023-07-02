import { useState } from 'react';

import { useGetAllMedicalAppointmentsQuery } from '../store/api/medicalAppointment/medicalAppointmentApi';

import { Spinner } from '../components/Spinner';

import { Appointment as AppointmentType } from '../types/medicalAppointment.types';

import { MedicalsAppointment } from '../components/MedicalsAppointment';

import { alertToast } from '../helpers/AlertsToast';

const MedicalAppointment = () => {
  const [limit, setLimit] = useState<number>(5);
  const { data, isFetching, isLoading, error, isError } =
    useGetAllMedicalAppointmentsQuery({
      limit: limit,
      skip: 0,
    });

  if (isLoading) return <Spinner data={'Citas'} />;

  if (isError && error) {
    alertToast(error, 'error');
    return <p className='text-center mt-10'> No se pudo cargar las citas</p>;
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Citas Medicas</h1>
      <p>Administra tus Citas</p>

      {data?.appointments.length ? (
        <>
          <table className='w-full bg-white shadow mt-5 table-auto'>
            <thead className='bg-blue-800 text-white '>
              <tr>
                <th className='p-2 text-center'>Cita</th>
                <th className='p-2  text-start'>Información</th>
                <th className='p-2  text-start'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.appointments.map((appointment: AppointmentType) => (
                <MedicalsAppointment
                  key={appointment._id}
                  appointment={appointment}
                />
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
        <p className='text-center mt-10'> No Hay Citas aún</p>
      )}
    </>
  );
};

export default MedicalAppointment;
