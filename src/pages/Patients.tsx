import { Patient } from '../components/Patient';
import { Spinner } from '../components/Spinner';
import { useGetAllPatientsQuery } from '../store/api/patients/patientsApi';
import { Patient as PatientType } from '../types/patient.types';

export const Patients = () => {
  const { data, isLoading, isError, error } = useGetAllPatientsQuery();

  console.log(data, isLoading, isError, error);
  if (isLoading) return <Spinner data={'Pacientes'} />;
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'> Pacientes</h1>
      <p>Administra tus Clientes</p>

      {data?.patients.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white '>
            <tr>
              <th className='p-2'>Paciente</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.patients.map((patient: PatientType) => (
              <Patient key={patient._id} patient={patient} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'> No Hay Pacientes aún</p>
      )}
    </>
  );
};
