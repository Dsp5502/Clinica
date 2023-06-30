import { Doctor as DoctorType } from '../types/doctors.types';

interface Props {
  doctor: DoctorType;
}

export const Doctor = ({ doctor }: Props) => {
  const { firstName, lastName, specialtyId, office, contactEmail, _id } =
    doctor;
  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <span className='text-xs'>Id: {_id}</span>
        <p className='text-2xl text-gray-800'>
          {firstName} {lastName}
          <span className='text-gray-600 text-xs'>
            {' '}
            Especialidad{specialtyId}{' '}
          </span>
        </p>
        <p>No. Documento: {office}</p>
      </td>
      <td className='p-6'>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Email: </span>
          {contactEmail}
        </p>
      </td>
      <td className='p-6  flex gap-3'>
        <button
          type='button'
          className='text-blue-600 hover:text-blue-600 font-bold text-xs'
        >
          Editar
        </button>
        <button
          type='button'
          className='text-red-600 hover:text-red-600 font-bold text-xs'
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
