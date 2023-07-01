import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/hooks';

import Swal from 'sweetalert2';

import { useDeleteDoctorMutation } from '../store/api/doctors/doctorsApi';

import { Doctor as DoctorType } from '../types/doctors.types';

import { AlertDelete } from '../helpers/AlertDelete';

interface Props {
  doctor: DoctorType;
}

export const Doctor = ({ doctor }: Props) => {
  const navigate = useNavigate();

  const [deleteDoctor] = useDeleteDoctorMutation();

  const { patients: specialities } = useAppSelector(
    (state) => state.specialities
  );

  const { firstName, lastName, specialtyId, office, contactEmail, _id } =
    doctor;

  const specialty = specialities.find(
    (speciality) => speciality._id === specialtyId
  );

  const alertModal = async () => {
    AlertDelete(`${firstName} ${lastName}`, 'Doctor', async () => {
      try {
        await deleteDoctor(_id).unwrap();
        Swal.fire('Deleted!', 'El doctor ha sido eliminado.', 'success');
        navigate('/patients');
      } catch (error) {
        Swal.fire('Error!', 'Error al eliminar el doctor.', 'error');
      }
    });
  };
  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <p className='text-2xl text-gray-800'>
          {firstName} {lastName}
          <span className='text-gray-600 text-xs'> Oficina: {office}</span>
        </p>
        <p>Especialidad: {specialty?.title}</p>
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
          onClick={() => navigate(`/doctors/edit/${_id}`)}
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
