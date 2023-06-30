import { Patient as PatientType } from '../types/patient.types';

interface Props {
  patient: PatientType;
}

export const Patient = ({ patient }: Props) => {
  const { name, _id, age, last_name, identification, phone } = patient;

  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <span className='text-xs'>Id: {_id}</span>
        <p className='text-2xl text-gray-800'>
          {name} {last_name}
          <span className='text-gray-600 text-xs'> {age} años</span>
        </p>
        <p>No. Documento: {identification}</p>
      </td>
      <td className='p-6'>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
          {phone}
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
