import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { useDeletePatientMutation } from '../store/api/patients/patientsApi';

import { Patient as PatientType } from '../types/patient.types';
import { AlertDelete } from '../helpers/AlertDelete';

interface Props {
  patient: PatientType;
}

export const Patient = ({ patient }: Props) => {
  const navigate = useNavigate();
  const [deletePatient] = useDeletePatientMutation();

  const { name, _id, age, last_name, identification, phone } = patient;

  const alertModal = async () => {
    AlertDelete(`${name} ${last_name}`, 'Paciente', async () => {
      try {
        await deletePatient(_id).unwrap();
        Swal.fire('Deleted!', 'El paciente ha sido eliminado.', 'success');
        navigate('/patients');
      } catch (error) {
        Swal.fire('Error!', 'Error al eliminar el paciente.', 'error');
      }
    });
  };

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
          onClick={() => navigate(`/patients/edit/${_id}`)}
        >
          Editar
        </button>
        <button
          type='button'
          className='text-red-600 hover:text-red-600 font-bold text-xs'
          onClick={alertModal}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
