import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { Appointment as AppointmentType } from '../types/medicalAppointment.types';

import { AlertDelete } from '../helpers/AlertDelete';

import { useDeleteMedicalAppointmentMutation } from '../store/api/medicalAppointment/medicalAppointmentApi';

interface Props {
  appointment: AppointmentType;
}

export const MedicalsAppointment = ({ appointment }: Props) => {
  const navigate = useNavigate();
  const [deleteAppointment] = useDeleteMedicalAppointmentMutation();

  const { _id, documentPatient, specialtyId, appointmentDate, doctorId } =
    appointment;

  const alertModal = async () => {
    AlertDelete(
      `del paciente Doc. ${documentPatient} `,
      'Cita Medica',
      async () => {
        try {
          await deleteAppointment(_id).unwrap();
          Swal.fire(
            'Deleted!',
            `La cita con ${_id} ha sido eliminado.`,
            'success'
          );
          navigate('/medicalAppointment');
        } catch (error) {
          Swal.fire('Error!', 'Error al eliminar la cita medica.', 'error');
        }
      }
    );
  };

  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <p className='text-2xl text-gray-800'>Paciente No: {documentPatient}</p>
        <span className='text-gray-600 text-xs block'>
          {' '}
          Doctor: {doctorId.firstName} {doctorId.lastName}
        </span>
        <span className='text-gray-600 text-xs'>
          {' '}
          Especialidad: {specialtyId.title}
        </span>
      </td>
      <td className='p-6'>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Fecha: </span>
          {new Date(appointmentDate).toLocaleDateString()}
        </p>
        <p className='text-gray-600'>
          <span className='text-gray-800 uppercase font-bold'>Hora: </span>
          {new Date(appointmentDate).toLocaleTimeString()}
        </p>
      </td>
      <td className='p-6  flex gap-3'>
        {/* <button
          type='button'
          className='text-blue-600 hover:text-blue-600 font-bold text-xs'
          onClick={() => navigate(`/doctors/edit/${_id}`)}
        >
          Editar
        </button> */}
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
