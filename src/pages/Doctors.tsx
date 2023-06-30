import { Doctor } from '../components/Doctor';
import { Spinner } from '../components/Spinner';
import { useGetAllDoctorsQuery } from '../store/api/doctors/doctorsApi';
import { Doctor as DoctorType } from '../types/doctors.types';

export const Doctors = () => {
  const { data, isLoading, isError, error, isFetching } =
    useGetAllDoctorsQuery();

  if (isFetching) return <Spinner data={'Doctores'} />;
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Doctores</h1>
      <p>Administra tus Doctores</p>

      {data?.doctors.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white '>
            <tr>
              <th className='p-2'>Paciente</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.doctors.map((doctor: DoctorType) => (
              <Doctor key={doctor._id} doctor={doctor} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'> No Hay Pacientes aún</p>
      )}
    </>
  );
};
